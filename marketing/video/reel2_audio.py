# Bande-son des Reels « Devine ! » (reel2.html) : musique 120 BPM + effets places exactement
# sur les animations (memes temps que la chronologie T de reel2.html). Usage : python3 reel2_audio.py out/reel2_audio.wav
import sys
import numpy as np
from scipy.io import wavfile
from synth import *

DUR = 18.0
N = int(SR * DUR)
MUS = np.zeros((N, 2)); SFX = np.zeros((N, 2)); KICKS = []
PROG = [('C', ['C4', 'E4', 'G4'], 'C2'), ('G', ['B3', 'D4', 'G4'], 'G1'), ('Am', ['A3', 'C4', 'E4'], 'A1'), ('F', ['A3', 'C4', 'F4'], 'F1')]
ARP = [0, 1, 2, 1, 0, 2, 1, 2]
HOOK = [['G5', '-', 'E5', 'G5', 'C6', '-', 'B5', 'A5'], ['G5', '-', 'D5', 'G5', 'B5', '-', 'A5', 'G5'],
        ['A5', '-', 'E5', 'A5', 'C6', '-', 'D6', 'C6'], ['A5', 'G5', 'F5', 'E5', 'D5', '-', 'C5', '-']]
VERSE = [['E5', 'G5', None, 'G5', 'A5', 'G5', 'E5', None], ['D5', 'G5', None, 'G5', 'B5', 'A5', 'G5', None],
         ['C5', 'E5', None, 'E5', 'A5', 'G5', 'E5', None], ['F5', 'E5', 'D5', 'C5', 'D5', None, 'C5', None]]

def melody(line, t0, inst, gain, pan=0.0):
    e = BEAT / 2; i = 0
    while i < 8:
        nm = line[i]
        if nm and nm != '-':
            ln = 1
            while i + ln < 8 and line[i + ln] == '-': ln += 1
            f = note(nm)
            put(MUS, (pluck(f, ln * e * 0.9) if inst == 'pluck' else lead(f, ln * e * 0.95) if inst == 'lead' else glock(f)), t0 + i * e, gain, pan)
            i += ln
        else: i += 1

# Mesures de 2 s : 0 intro | 1-2 couplet (question) | 3 tension (compte a rebours) | 4-5 refrain (revelation) | 6 couplet leger | 7-8 fin
for bar in range(9):
    t0 = bar * BAR
    chord, tri, root = PROG[bar % 4]
    put(MUS, pad([note(n) for n in tri], BAR), t0, 0.2)
    if bar == 0:
        for k in range(8): put(MUS, glock(note(tri[ARP[k]]) * 2), t0 + k * 0.25, 0.10, 0.3 if k % 2 else -0.3)
        put(MUS, kick(), t0 + 1.5, 0.5); KICKS.append(t0 + 1.5)
        continue
    if bar >= 7:
        if bar == 7:
            put(MUS, kick(), t0, 0.9)
            put(MUS, bass(note('C2'), 1.8), t0, 0.45)
            for j, n in enumerate(['C5', 'E5', 'G5', 'C6']): put(MUS, glock(note(n), 2.0), t0 + j * 0.06, 0.16, -0.4 + j * 0.25)
            put(MUS, pad([note(n) for n in ['C4', 'E4', 'G4', 'C5']], 4.0), t0, 0.28)
        for k in range(8): put(MUS, glock(note(['C', 'E', 'G', 'E'][k % 4] + '6'), 0.8), t0 + 0.5 + k * 0.25 if bar == 8 else t0 + 1.0 + k * 0.125, 0.04, 0.3 if k % 2 else -0.3)
        continue
    tension = bar == 3
    chorus = bar in (4, 5)
    if tension:
        for b in range(4): put(MUS, kick(), t0 + b * BEAT, 0.45); KICKS.append(t0 + b * BEAT)
        for k in range(8): put(MUS, hat(), t0 + k * 0.25, 0.18, 0.35)
        put(MUS, bass(note(root), 1.8), t0, 0.28)
        continue
    for b in ((0, 1, 2, 3) if chorus else (0, 2, 2.75)):
        put(MUS, kick(), t0 + b * BEAT, 0.6); KICKS.append(t0 + b * BEAT)
    for b in (1, 3): put(MUS, clap(), t0 + b * BEAT, 0.5 if chorus else 0.38, 0.05)
    for k in range(8): put(MUS, hat(open_=(k % 4 == 2 and chorus)), t0 + k * 0.25, 0.2 if k % 2 else 0.1, 0.35)
    for b, mult, d in ((0, 1, 0.4), (0.75, 2, 0.2), (1.5, 1, 0.4), (2.5, 2, 0.2), (3, 1, 0.4), (3.5, 2, 0.2)):
        put(MUS, bass(note(root) * mult, d), t0 + b * BEAT, 0.28)
    if chorus:
        melody(HOOK[bar % 4], t0, 'lead', 0.26, 0.0); melody(HOOK[bar % 4], t0, 'glock', 0.08, 0.4)
    else:
        melody(VERSE[bar % 4], t0, 'pluck', 0.22, 0.15)

# sidechain
duck = np.ones(N); tl = np.arange(N) / SR
for k in KICKS:
    i = int(k * SR); j = min(N, i + int(0.3 * SR))
    duck[i:j] = np.minimum(duck[i:j], 1 - 0.4 * np.exp(-(tl[i:j] - k) / 0.09))
low = lp(MUS[:, 0], 120), lp(MUS[:, 1], 120)
MUS = np.stack([low[0] + (MUS[:, 0] - low[0]) * duck, low[1] + (MUS[:, 1] - low[1]) * duck], 1)

def sparkle(t0, g=0.12):
    for i, n in enumerate(['C6', 'E6', 'G6', 'C7', 'E7']): put(SFX, glock(note(n), 0.9), t0 + i * 0.045, g, -0.6 + i * 0.3)
def whoosh_at(peak, dur=0.5, g=0.3):  # le pic du souffle tombe pile sur la transition
    put(SFX, whoosh(dur), peak - dur / 2, g)

# ── effets, aux memes temps que reel2.html ──
put(SFX, pop(760), 0.05 + 0.06, 0.24)            # badge
put(SFX, pop(560), 0.45 + 0.07, 0.30)            # drapeau
sparkle(0.55, 0.06)
put(SFX, pop(900), 0.95 + 0.06, 0.22)            # nom du pays
whoosh_at(2.0)                                   # -> question
put(SFX, pop(700), 2.1 + 0.06, 0.2)              # mascotte
put(SFX, pop(1000), 2.25 + 0.08, 0.16)           # carte question
for i in range(3): put(SFX, pop(800 + 140 * i), 4.0 + i * 0.5 + 0.07, 0.24, -0.3 + 0.3 * i)   # A B C
for k, tk in enumerate((6.0, 6.5, 7.0)): put(SFX, tapclick(), tk, 0.5); put(SFX, glock(note(['G5', 'A5', 'B5'][k]), 0.4), tk, 0.10)  # 3-2-1
put(SFX, riser(1.0), 7.0, 0.16)
put(SFX, ding(), 8.0, 0.4); sparkle(8.03, 0.14)  # revelation
put(SFX, pop(1300), 8.02, 0.18)
whoosh_at(9.05, 0.4, 0.18)                       # explication
put(SFX, pop(650), 9.1 + 0.08, 0.2)
whoosh_at(12.0)                                  # -> l'app
put(SFX, pop(900), 12.15 + 0.06, 0.18)
put(SFX, riser(1.6), 12.4, 0.2)
put(SFX, impact(), 14.0, 0.5)                    # -> fin
sparkle(14.05, 0.12)
put(SFX, pop(800), 14.5 + 0.06, 0.18)
put(SFX, pop(600), 15.0 + 0.07, 0.28); put(SFX, ding(), 15.05, 0.22)   # 3 jours gratuits
put(SFX, pop(1000), 15.5 + 0.06, 0.18)

mix = MUS * 0.85 + SFX
mix = np.tanh(mix * 1.2) / np.tanh(1.2)
fi = int(0.05 * SR); mix[:fi] *= np.linspace(0, 1, fi)[:, None]
fo = int(1.2 * SR); mix[-fo:] *= np.linspace(1, 0, fo)[:, None]
mix /= np.max(np.abs(mix)) / 0.92
wavfile.write(sys.argv[1] if len(sys.argv) > 1 else 'reel2_audio.wav', SR, (mix * 32767).astype(np.int16))
print('ok', len(mix) / SR)
