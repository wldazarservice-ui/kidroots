# Musique originale v2 + effets sonores calés sur promo.html (60 s, 120 BPM, Do majeur).
# Production plus riche : kick avec attaque, clap en couches, charleston, basse sub + saw filtrée,
# pluck saw avec enveloppe de filtre, nappe (pad) désaccordée avec sidechain, glockenspiel,
# whooshs aux transitions, pops, clic de toucher, ding, tampons, montée (riser) et impact final.
# Usage : python3 music2.py out/music2.wav
import sys
import numpy as np
from scipy.io import wavfile
from scipy.signal import butter, lfilter, sosfilt

SR = 44100
DUR = 60.5
N = int(SR * DUR)
BEAT = 0.5
BAR = 2.0
rng = np.random.default_rng(11)
MUS = np.zeros((N, 2))
SFX = np.zeros((N, 2))
KICKS = []

def note(name):
    names = {'C': 0, 'C#': 1, 'D': 2, 'D#': 3, 'E': 4, 'F': 5, 'F#': 6, 'G': 7, 'G#': 8, 'A': 9, 'A#': 10, 'B': 11}
    n, o = name[:-1], int(name[-1])
    return 440 * 2 ** ((12 * (o + 1) + names[n] - 69) / 12)

def put(buf, sig, t, gain=1.0, pan=0.0):
    i = int(t * SR)
    if i >= N or i < 0: return
    if sig.ndim == 1:
        sig = np.stack([sig * np.sqrt((1 - pan) / 2) * 1.414, sig * np.sqrt((1 + pan) / 2) * 1.414], 1)
    sig = sig[: N - i] * gain
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

# ── harmonie ──
PROG = [('C', ['C4', 'E4', 'G4'], 'C2'), ('G', ['B3', 'D4', 'G4'], 'G1'), ('Am', ['A3', 'C4', 'E4'], 'A1'), ('F', ['A3', 'C4', 'F4'], 'F1')]
ARP = [0, 1, 2, 1, 0, 2, 1, 2]
VERSE = [
    ['E5', 'G5', None, 'G5', 'A5', 'G5', 'E5', None],
    ['D5', 'G5', None, 'G5', 'B5', 'A5', 'G5', None],
    ['C5', 'E5', None, 'E5', 'A5', 'G5', 'E5', None],
    ['F5', 'E5', 'D5', 'C5', 'D5', None, 'C5', None],
]
HOOK = [
    ['G5', '-', 'E5', 'G5', 'C6', '-', 'B5', 'A5'],
    ['G5', '-', 'D5', 'G5', 'B5', '-', 'A5', 'G5'],
    ['A5', '-', 'E5', 'A5', 'C6', '-', 'D6', 'C6'],
    ['A5', 'G5', 'F5', 'E5', 'D5', '-', 'C5', '-'],
]

def melody(line, t0, inst, gain, pan=0.0, buf=None):
    e = BEAT / 2
    i = 0
    while i < 8:
        nm = line[i]
        if nm and nm != '-':
            ln = 1
            while i + ln < 8 and line[i + ln] == '-': ln += 1
            f = note(nm)
            if inst == 'pluck': put(MUS, pluck(f, ln * e * 0.9), t0 + i * e, gain, pan)
            elif inst == 'lead': put(MUS, lead(f, ln * e * 0.95), t0 + i * e, gain, pan)
            else: put(MUS, glock(f), t0 + i * e, gain, pan)
            i += ln
        else:
            i += 1

# Sections (en mesures de 2 s) — calées sur les scènes de promo.html
# 0-1 : intro (scène « Papa, c'est où le Mali ? ») | 2-11 : couplet | 12-21 : refrain | 22-25 : pause douce + montée | 26-29 : refrain final
for bar in range(30):
    t0 = bar * BAR
    chord, tri, root = PROG[bar % 4]
    intro = bar < 2
    verse = 2 <= bar < 12
    chorus = 12 <= bar < 22
    breakdown = 22 <= bar < 26
    final = bar >= 26
    last = bar == 29

    put(MUS, pad([note(n) for n in tri], BAR), t0, 0.22 if not intro else 0.3, 0)

    if intro:
        for k in range(8):
            put(MUS, glock(note(tri[ARP[k]]) * 2), t0 + k * 0.25, 0.10, 0.3 if k % 2 else -0.3)
        continue

    if last:
        put(MUS, kick(), t0, 0.9)
        put(MUS, bass(note(root), 1.6), t0, 0.5)
        for j, n in enumerate(['C5', 'E5', 'G5', 'C6']):
            put(MUS, glock(note(n), 2.0), t0 + j * 0.05, 0.18, -0.4 + j * 0.25)
        put(MUS, pad([note(n) for n in ['C4', 'E4', 'G4', 'C5']], 2.2), t0, 0.3)
        continue

    # batterie
    if not breakdown:
        for b in (0, 1, 2, 3) if (chorus or final) else (0, 2, 2.75):
            put(MUS, kick(), t0 + b * BEAT, 0.6); KICKS.append(t0 + b * BEAT)
        for b in (1, 3):
            put(MUS, clap(), t0 + b * BEAT, 0.55 if (chorus or final) else 0.4, 0.05)
        for k in range(8):
            put(MUS, hat(open_=(k % 4 == 2 and (chorus or final))), t0 + k * 0.25, 0.22 if k % 2 else 0.12, 0.35)
    for k in range(16):
        put(MUS, shaker(), t0 + k * 0.125, 0.10 if k % 2 else 0.05, -0.4)

    # basse (octaves syncopées)
    if not breakdown:
        for b, mult, d in ((0, 1, 0.4), (0.75, 2, 0.2), (1.5, 1, 0.4), (2.5, 2, 0.2), (3, 1, 0.4), (3.5, 2, 0.2)):
            put(MUS, bass(note(root) * mult, d), t0 + b * BEAT, 0.3)
    else:
        put(MUS, bass(note(root), 1.8), t0, 0.3)

    # mélodies
    if verse:
        melody(VERSE[bar % 4], t0, 'pluck', 0.30, 0.15)
        for k in range(8):
            put(MUS, pluck(note(tri[ARP[k]]) , 0.18), t0 + k * 0.25, 0.07, -0.35)
    elif chorus or final:
        melody(HOOK[bar % 4], t0, 'lead', 0.30, 0.0)
        melody(HOOK[bar % 4], t0, 'glock', 0.09, 0.4)
        melody([n if n in (None, '-') else n[:-1] + str(int(n[-1]) - 1) for n in HOOK[bar % 4]], t0, 'pluck', 0.10, -0.3)
    elif breakdown:
        for k in range(8):
            put(MUS, glock(note(tri[ARP[k]]) * 2), t0 + k * 0.25, 0.08, 0.3 if k % 2 else -0.3)

# sidechain (la musique « respire » sur chaque kick)
duck = np.ones(N)
tline = np.arange(N) / SR
for k in KICKS:
    i = int(k * SR); j = min(N, i + int(0.3 * SR))
    duck[i:j] = np.minimum(duck[i:j], 1 - 0.45 * np.exp(-(tline[i:j] - k) / 0.09))
# on ne duck pas le kick lui-même : approximation en appliquant le duck à tout sauf les basses fréquences
low = lp(MUS[:, 0], 120) , lp(MUS[:, 1], 120)
hiL, hiR = MUS[:, 0] - low[0], MUS[:, 1] - low[1]
MUS = np.stack([low[0] + hiL * duck, low[1] + hiR * duck], 1)

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

def sparkle(t0, g=0.12):
    for i, n in enumerate(['C6', 'E6', 'G6', 'C7', 'E7']):
        put(SFX, glock(note(n), 0.9), t0 + i * 0.045, g, -0.6 + i * 0.3)

# Transitions entre scènes
for b in (4, 9, 15, 24, 31, 38, 45, 52):
    put(SFX, whoosh(0.55), b - 0.38, 0.32, 0.0)
put(SFX, whoosh(0.4), 41.5 - 0.28, 0.22, 0.2)  # niveaux -> jeux
# Accroche : mots qui claquent
for k, tk in enumerate((0.15, 0.37, 0.59, 0.81, 1.03)):
    put(SFX, pop(700 + 120 * k), tk + 0.05, 0.22, -0.2 + 0.1 * k)
sparkle(1.7, 0.10)
# Glissements d'écrans dans le téléphone (histoires)
for tk in (17.0, 19.3, 21.6):
    put(SFX, whoosh(0.35), tk - 0.12, 0.16, 0.3)
# Quiz : toucher, bonne réponse, résultat
put(SFX, tapclick(), 26.5, 0.5)
put(SFX, ding(), 26.55, 0.35)
sparkle(26.6, 0.10)
put(SFX, whoosh(0.4), 28.25, 0.2)
put(SFX, pop(1200), 28.8, 0.25)
sparkle(28.9, 0.12)
# Passeport : tampons
for k in range(4):
    put(SFX, stamp(), 33.6 + k * 0.5, 0.55, 0.4)
# Niveaux : pops des 3 icônes ; jeux : pops
for k in range(3): put(SFX, pop(800 + 150 * k), 39.0 + k * 0.25, 0.2, 0.4)
for k in range(4): put(SFX, pop(900 + 100 * k), 42.2 + k * 0.18, 0.16, -0.3 + 0.2 * k)
# Parents : coches
for k in range(4):
    put(SFX, pop(1000), 45.95 + k * 0.4, 0.2, 0.2)
    put(SFX, glock(note('E6'), 0.5), 46.0 + k * 0.4, 0.06, 0.3)
# Final : montée puis impact
put(SFX, riser(2.2), 49.8, 0.28)
put(SFX, impact(), 52.0, 0.55)
sparkle(52.1, 0.14)
put(SFX, pop(700), 53.1, 0.28)
put(SFX, ding(), 53.65, 0.25)

mix = MUS * 0.9 + SFX
# compression douce + limiteur
mix = np.tanh(mix * 1.25) / np.tanh(1.25)
fade = int(0.9 * SR)
mix[-fade:] *= np.linspace(1, 0, fade)[:, None]
mix = mix[: int(60 * SR)]
mix /= np.max(np.abs(mix)) / 0.93
wavfile.write(sys.argv[1] if len(sys.argv) > 1 else 'music2.wav', SR, (mix * 32767).astype(np.int16))
print('ok', len(mix) / SR)
