# Instruments et effets sonores (extraits de music2.py) pour fabriquer des bandes-son calees image par image.
import numpy as np
from scipy.signal import butter, sosfilt

SR = 44100
BEAT = 0.5
BAR = 2.0
rng = np.random.default_rng(11)

def note(name):
    names = {'C': 0, 'C#': 1, 'D': 2, 'D#': 3, 'E': 4, 'F': 5, 'F#': 6, 'G': 7, 'G#': 8, 'A': 9, 'A#': 10, 'B': 11}
    n, o = name[:-1], int(name[-1])
    return 440 * 2 ** ((12 * (o + 1) + names[n] - 69) / 12)

def put(buf, sig, t, gain=1.0, pan=0.0):
    n = len(buf)
    i = int(round(t * SR))
    if i >= n or i < 0: return
    if sig.ndim == 1:
        sig = np.stack([sig * np.sqrt((1 - pan) / 2) * 1.414, sig * np.sqrt((1 + pan) / 2) * 1.414], 1)
    sig = sig[: n - i] * gain
    buf[i:i + len(sig)] += sig

def tt(dur):
    return np.arange(int(dur * SR)) / SR

def adsr(n, a, d, s, r, sustain_time):
    t = np.arange(n) / SR
    e = np.where(t < a, t / max(a, 1e-4), np.where(t < a + d, 1 - (1 - s) * (t - a) / d, s))
    rel = t > a + d + sustain_time
    e = np.where(rel, s * np.exp(-(t - a - d - sustain_time) / max(r, 1e-4)), e)
    return e

def saw(f, t, detune=0.0):
    ph = (f * (1 + detune) * t) % 1.0
    return 2 * ph - 1

def lp(x, fc, order=2):
    fc = min(fc, SR / 2 * 0.95)
    sos = butter(order, fc / (SR / 2), 'low', output='sos')
    return sosfilt(sos, x)

def hp(x, fc, order=2):
    sos = butter(order, fc / (SR / 2), 'high', output='sos')
    return sosfilt(sos, x)

def bp(x, lo, hi, order=2):
    sos = butter(order, [lo / (SR / 2), hi / (SR / 2)], 'band', output='sos')
    return sosfilt(sos, x)

# ── instruments ──
def kick():
    t = tt(0.45)
    f = 50 + 110 * np.exp(-t / 0.035)
    body = np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t / 0.16)
    click = hp(rng.normal(size=len(t)), 2000) * np.exp(-t / 0.004) * 0.4
    return np.tanh((body + click) * 1.6) * 0.9

def clap():
    t = tt(0.35)
    n = bp(rng.normal(size=len(t)), 800, 5000)
    e = np.zeros_like(t)
    for d in (0, 0.011, 0.022):
        e += (t >= d) * np.exp(-np.maximum(t - d, 0) / 0.012) * 0.6
    e += (t >= 0.03) * np.exp(-np.maximum(t - 0.03, 0) / 0.09)
    snare = np.sin(2 * np.pi * 190 * t) * np.exp(-t / 0.05) * 0.4
    return (n * e + snare) * 0.7

def hat(open_=False):
    t = tt(0.25 if open_ else 0.06)
    return hp(rng.normal(size=len(t)), 7000) * np.exp(-t / (0.08 if open_ else 0.018)) * 0.5

def shaker():
    t = tt(0.08)
    return bp(rng.normal(size=len(t)), 4000, 11000) * np.sin(np.pi * np.minimum(t / 0.08, 1)) * 0.3

def bass(f, dur):
    t = tt(dur + 0.05)
    sub = np.sin(2 * np.pi * f * t)
    top = lp(saw(f, t), 600 + 900 * 1)
    e = adsr(len(t), 0.005, 0.08, 0.7, 0.04, dur - 0.09)
    return (sub * 0.6 + top * 0.45) * e

def pluck(f, dur=0.35):
    t = tt(dur + 0.3)
    raw = saw(f, t) * 0.6 + saw(f, t, 0.006) * 0.4
    bright = lp(raw, 5000); dark = lp(raw, 900)
    k = np.exp(-t / 0.07)
    x = bright * k + dark * (1 - k)
    return x * adsr(len(t), 0.003, 0.12, 0.35, 0.12, dur)

def pad(freqs, dur):
    t = tt(dur + 0.6)
    x = np.zeros_like(t)
    for f in freqs:
        for d in (-0.007, 0, 0.007):
            x += saw(f, t, d)
    x = lp(x / (len(freqs) * 3), 1400)
    return x * adsr(len(t), 0.35, 0.3, 0.8, 0.5, dur - 0.65)

def glock(f, dur=1.2):
    t = tt(dur)
    s = np.sin(2 * np.pi * f * t) + 0.35 * np.sin(2 * np.pi * 2.76 * f * t) * np.exp(-t / 0.12) + 0.15 * np.sin(2 * np.pi * 5.4 * f * t) * np.exp(-t / 0.05)
    return s * np.exp(-t / 0.5) * np.minimum(1, t / 0.002)

def lead(f, dur):
    # « sifflet » doux : sinus + un peu de triangle, vibrato retardé
    t = tt(dur)
    vib = 1 + 0.005 * np.sin(2 * np.pi * 5.8 * t) * np.clip((t - 0.12) / 0.2, 0, 1)
    ph = 2 * np.pi * np.cumsum(f * vib) / SR
    x = np.sin(ph) + 0.12 * np.sin(3 * ph) + 0.05 * np.sin(2 * ph)
    return x * np.clip(np.minimum(t / 0.02, (dur - t) / 0.06), 0, 1)

# ── effets sonores ──
def whoosh(dur=0.6, up=True):
    t = tt(dur)
    n = rng.normal(size=len(t))
    out = np.zeros_like(t)
    seg = 512
    for s in range(0, len(t), seg):
        x = s / len(t)
        fc = 300 + (6000 if up else 4000) * (np.sin(np.pi * x) ** 2)
        out[s:s + seg] = lp(n[s:s + seg], fc, 1)
    env = np.sin(np.pi * np.clip(t / dur, 0, 1)) ** 2
    return hp(out, 150) * env * 1.4

def pop(f=900):
    t = tt(0.12)
    fr = f * (1 + 1.2 * np.exp(-t / 0.01))
    return np.sin(2 * np.pi * np.cumsum(fr) / SR) * np.exp(-t / 0.035)

def tapclick():
    t = tt(0.05)
    return (bp(rng.normal(size=len(t)), 2000, 8000) * np.exp(-t / 0.006) + np.sin(2 * np.pi * 1800 * t) * np.exp(-t / 0.01) * 0.5)

def ding():
    return glock(note('C6'), 1.4) * 0.8 + glock(note('G6'), 1.4) * 0.5 * np.concatenate([np.zeros(int(0.07 * SR)), np.ones(int(1.4 * SR) - int(0.07 * SR))])

def stamp():
    t = tt(0.4)
    body = np.sin(2 * np.pi * (70 + 80 * np.exp(-t / 0.02)) * t) * np.exp(-t / 0.09)
    thwack = bp(rng.normal(size=len(t)), 300, 3000) * np.exp(-t / 0.03)
    return np.tanh((body + thwack * 0.8) * 1.5)

def riser(dur=2.0):
    t = tt(dur)
    n = rng.normal(size=len(t))
    out = np.zeros_like(t)
    for s in range(0, len(t), 512):
        out[s:s + 512] = lp(n[s:s + 512], 200 + 9000 * (s / len(t)) ** 2, 1)
    tone = np.sin(2 * np.pi * np.cumsum(200 + 800 * (t / dur) ** 2) / SR) * 0.15
    return (out * 0.8 + tone) * (t / dur) ** 1.5

def impact():
    t = tt(1.6)
    boom = np.sin(2 * np.pi * (40 + 60 * np.exp(-t / 0.05)) * t) * np.exp(-t / 0.5)
    noise = lp(rng.normal(size=len(t)), 2500) * np.exp(-t / 0.25) * 0.5
    return np.tanh((boom + noise) * 1.4)

