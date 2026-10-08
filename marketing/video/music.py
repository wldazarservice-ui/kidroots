# Musique originale pour la pub Mokalibo (60 s, 120 BPM, Do majeur).
# Composée par code : ukulélé (Karplus-Strong), basse, marimba, glockenspiel, sifflet, percussions.
# Usage : python3 music.py out/music.wav
import sys
import numpy as np
from scipy.io import wavfile
from scipy.signal import butter, lfilter

SR = 44100
BPM = 120
BEAT = 60 / BPM          # 0,5 s
BAR = 4 * BEAT           # 2 s
DUR = 60.0
N = int(SR * DUR)
L = np.zeros(N)
R = np.zeros(N)
rng = np.random.default_rng(7)

NOTE = {'C': 0, 'D': 2, 'E': 4, 'F': 5, 'G': 7, 'A': 9, 'B': 11}
def freq(name):
    n, octv = name[:-1], int(name[-1])
    semis = NOTE[n[0]] + (1 if '#' in n else 0) - (1 if n.endswith('b') and len(n) > 1 else 0)
    midi = 12 * (octv + 1) + semis
    return 440.0 * 2 ** ((midi - 69) / 12)

def add(sig, t, gain=1.0, pan=0.0):
    i = int(t * SR)
    if i >= N: return
    sig = sig[: N - i] * gain
    L[i:i + len(sig)] += sig * (1 - pan) / 2 * 2 ** 0.5
    R[i:i + len(sig)] += sig * (1 + pan) / 2 * 2 ** 0.5

def env(n, a=0.005, d=0.3):
    t = np.arange(n) / SR
    e = np.minimum(1, t / a) * np.exp(-t / d)
    return e

def pluck(f, dur=1.2, bright=0.5):
    n = int(SR * dur)
    p = max(2, int(SR / f))
    buf = rng.uniform(-1, 1, p)
    out = np.zeros(n)
    for i in range(n):
        out[i] = buf[i % p]
        buf[i % p] = 0.996 * 0.5 * (buf[i % p] + buf[(i + 1) % p])
    return out * env(n, 0.002, 0.6)

# cache des cordes pincées (lent en python)
_pl = {}
def uke(f):
    k = round(f, 2)
    if k not in _pl: _pl[k] = pluck(f, 0.9)
    return _pl[k]

def marimba(f, dur=0.6):
    n = int(SR * dur); t = np.arange(n) / SR
    s = np.sin(2 * np.pi * f * t) + 0.25 * np.sin(2 * np.pi * 4 * f * t) * np.exp(-t / 0.05)
    return s * env(n, 0.003, 0.22)

def glock(f, dur=1.2):
    n = int(SR * dur); t = np.arange(n) / SR
    s = np.sin(2 * np.pi * f * t) + 0.4 * np.sin(2 * np.pi * 2.76 * f * t) * np.exp(-t / 0.15) + 0.2 * np.sin(2 * np.pi * 5.4 * f * t) * np.exp(-t / 0.06)
    return s * env(n, 0.002, 0.45)

def whistle(f, dur):
    n = int(SR * dur); t = np.arange(n) / SR
    vib = 1 + 0.006 * np.sin(2 * np.pi * 5.5 * t) * np.minimum(1, t / 0.15)
    ph = 2 * np.cumsum(np.pi * f * vib) / SR
    s = np.sin(ph) + 0.08 * np.sin(2 * ph)
    a = np.minimum(1, t / 0.03) * np.minimum(1, (dur - t) / 0.05)
    return s * np.clip(a, 0, 1) + 0.02 * rng.normal(size=n) * a

def bass(f, dur=0.45):
    n = int(SR * dur); t = np.arange(n) / SR
    s = np.sin(2 * np.pi * f * t) + 0.3 * np.sin(2 * np.pi * 2 * f * t)
    return s * env(n, 0.004, 0.25)

def kick():
    n = int(SR * 0.3); t = np.arange(n) / SR
    f = 120 * np.exp(-t / 0.04) + 45
    return np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t / 0.12)

b, a = butter(2, [900 / (SR / 2), 4000 / (SR / 2)], 'band')
def clap():
    n = int(SR * 0.2)
    s = lfilter(b, a, rng.normal(size=n))
    t = np.arange(n) / SR
    e = np.exp(-t / 0.05) + 0.6 * np.exp(-np.maximum(0, t - 0.012) / 0.04) * (t > 0.012)
    return s * e

bh, ah = butter(2, 6000 / (SR / 2), 'high')
def shaker():
    n = int(SR * 0.06)
    return lfilter(bh, ah, rng.normal(size=n)) * env(n, 0.004, 0.02)

def sparkle(t0):
    for i, nm in enumerate(['C6', 'E6', 'G6', 'C7', 'E7']):
        add(glock(freq(nm)), t0 + i * 0.06, 0.12, pan=-0.6 + i * 0.3)

# Accords (une mesure chacun) : C G Am F
CHORDS = {
    'C': ['G4', 'C4', 'E4', 'C5'], 'G': ['G4', 'D4', 'G4', 'B4'],
    'Am': ['A4', 'C4', 'E4', 'A4'], 'F': ['A4', 'C4', 'F4', 'C5'],
}
ROOT = {'C': 'C2', 'G': 'G2', 'Am': 'A2', 'F': 'F2'}
PROG = ['C', 'G', 'Am', 'F']

# Mélodies (croches ; None = silence, '-' = prolonger)
VERSE = [
    ['E5', 'E5', 'G5', '-', 'A5', 'G5', 'E5', None],
    ['D5', 'D5', 'G5', '-', 'B4', 'D5', 'G4', None],
    ['C5', 'C5', 'E5', '-', 'A5', 'G5', 'E5', None],
    ['F5', 'E5', 'D5', '-', 'C5', 'D5', 'C5', None],
]
CHORUS = [
    ['G5', '-', 'A5', 'G5', 'E5', '-', 'C5', '-'],
    ['D5', '-', 'E5', 'D5', 'B4', '-', 'G4', '-'],
    ['A5', '-', 'C6', 'A5', 'G5', '-', 'E5', '-'],
    ['F5', '-', 'A5', 'F5', 'D5', 'E5', 'C5', '-'],
]

def play_line(bar_start, line, inst, gain, pan=0.0):
    e = BEAT / 2
    i = 0
    while i < len(line):
        nm = line[i]
        if nm and nm != '-':
            ln = 1
            while i + ln < len(line) and line[i + ln] == '-': ln += 1
            t0 = bar_start + i * e
            if inst == 'whistle': add(whistle(freq(nm), ln * e * 0.92), t0, gain, pan)
            elif inst == 'glock': add(glock(freq(nm)), t0, gain, pan)
            else: add(marimba(freq(nm)), t0, gain, pan)
            i += ln
        else:
            i += 1

STRUM = [(0, 'D'), (1, 'D'), (1.5, 'U'), (2.5, 'U'), (3, 'D'), (3.5, 'U')]  # en temps

NBARS = int(DUR / BAR)  # 30
for bar in range(NBARS):
    t0 = bar * BAR
    chord = PROG[bar % 4]
    intro = bar < 2
    chorus = 14 <= bar < 26
    outro = bar >= 26
    last = bar == NBARS - 1

    # Intro : arpège de glockenspiel
    if intro:
        for k, nm in enumerate(['C5', 'E5', 'G5', 'C6', 'G5', 'E5', 'G5', 'C6']):
            add(glock(freq(nm)), t0 + k * BEAT / 2, 0.16, pan=0.3)
        continue

    if last:
        for nm in ['C4', 'E4', 'G4', 'C5']:
            add(uke(freq(nm)), t0 + 0.02 * ['C4', 'E4', 'G4', 'C5'].index(nm), 0.35)
        add(bass(freq('C2'), 1.5), t0, 0.5)
        add(kick(), t0, 0.7)
        sparkle(t0 + 0.1)
        continue

    # Ukulélé (rythme)
    for beat_pos, d in STRUM:
        notes = CHORDS[chord] if d == 'D' else list(reversed(CHORDS[chord]))
        for j, nm in enumerate(notes):
            add(uke(freq(nm)), t0 + beat_pos * BEAT + j * 0.012, 0.16 if d == 'D' else 0.11, pan=-0.35)

    # Basse
    for bp in ([0, 2] if not chorus else [0, 1.5, 2, 3]):
        f = freq(ROOT[chord]) * (2 if bp == 1.5 else 1)
        add(bass(f), t0 + bp * BEAT, 0.42)

    # Percussions
    for bp in (0, 2):
        add(kick(), t0 + bp * BEAT, 0.55 if chorus else 0.4)
    if chorus or outro:
        for bp in (1, 3): add(clap(), t0 + bp * BEAT, 0.32, pan=0.15)
    for k in range(8):
        add(shaker(), t0 + k * BEAT / 2, 0.10 if k % 2 else 0.06, pan=0.45)

    # Mélodie
    if 2 <= bar < 14:
        play_line(t0, VERSE[bar % 4], 'marimba', 0.32, pan=0.2)
    elif chorus:
        play_line(t0, CHORUS[bar % 4], 'whistle', 0.22, pan=0.0)
        play_line(t0, CHORUS[bar % 4], 'glock', 0.07, pan=0.4)
    elif outro:
        play_line(t0, VERSE[bar % 4], 'marimba', 0.30, pan=0.2)

    # Paillettes sur les changements de scène
    if bar in (3, 6, 10, 15, 19, 23, 26):
        sparkle(t0)

mix = np.stack([L, R], axis=1)
# petite réverbération (échos)
for d, g in ((0.031, 0.25), (0.047, 0.18), (0.083, 0.12), (0.127, 0.08)):
    k = int(d * SR)
    mix[k:] += mix[:-k] * g * np.array([1, 0.85])
# fondu final et normalisation
fade = int(1.5 * SR)
mix[-fade:] *= np.linspace(1, 0, fade)[:, None]
mix /= np.max(np.abs(mix)) * 1.12
wavfile.write(sys.argv[1] if len(sys.argv) > 1 else 'music.wav', SR, (mix * 32767).astype(np.int16))
print('ok', mix.shape[0] / SR, 's')
