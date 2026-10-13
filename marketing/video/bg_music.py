# Musique de fond de l'app : le theme Mokalibo en version douce (sans batterie), en boucle parfaite.
# 100 BPM, Do majeur, 24 mesures (~58 s). Sortie : public/audio/mokalibo_theme.mp3 (+ .ogg)
import numpy as np, subprocess, os
import synth as S
from synth import note, pluck, pad, glock, lead, bass, shaker, lp

SR = S.SR
BEAT = 0.6            # 100 BPM : plus calme que le jingle des Reels (120 BPM)
BAR = BEAT * 4
BARS = 24
L = int(BARS * BAR * SR)
MUS = np.zeros((L + SR * 3, 2))   # marge pour les queues de notes, recollees au debut (boucle sans coupure)

PROG = [(['C4', 'E4', 'G4'], 'C2'), (['B3', 'D4', 'G4'], 'G1'), (['A3', 'C4', 'E4'], 'A1'), (['A3', 'C4', 'F4'], 'F1')]
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
def put(sig, t, g, pan=0.0): S.put(MUS, sig, t, g, pan)
def melody(line, t0, inst, gain, pan=0.0):
    e = BEAT / 2; i = 0
    while i < 8:
        nm = line[i]
        if nm and nm != '-':
            ln = 1
            while i + ln < 8 and line[i + ln] == '-': ln += 1
            f = note(nm)
            sig = pluck(f, ln * e * 0.9) if inst == 'pluck' else lead(f, ln * e * 0.95) if inst == 'lead' else glock(f, 1.4)
            put(sig, t0 + i * e, gain, pan); i += ln
        else: i += 1

# 0-3 : arpeges de glockenspiel | 4-11 : couplet au pluck | 12-19 : refrain doux (sifflet + glock) | 20-23 : arpeges
for bar in range(BARS):
    t0 = bar * BAR
    tri, root = PROG[bar % 4]
    put(pad([note(n) for n in tri], BAR), t0, 0.16)
    put(bass(note(root), BAR * 0.9), t0, 0.16)
    for k in range(8):
        put(glock(note(tri[ARP[k]]) * 2, 1.0), t0 + k * BEAT / 2, 0.055, 0.35 if k % 2 else -0.35)
    if 4 <= bar < 20:
        for k in range(8): put(shaker(), t0 + k * BEAT / 2, 0.035 if k % 2 else 0.02, -0.3)
    if 4 <= bar < 12: melody(VERSE[bar % 4], t0, 'pluck', 0.20, 0.1)
    if 12 <= bar < 20:
        melody(HOOK[bar % 4], t0, 'lead', 0.16)
        melody(HOOK[bar % 4], t0, 'glock', 0.06, 0.3)

# boucle parfaite : les queues qui depassent la fin sont rejouees au debut
tail = MUS[L:]
MUS[:len(tail)] += tail
MUS = MUS[:L]
MUS = np.stack([lp(MUS[:, 0], 9000), lp(MUS[:, 1], 9000)], 1)
MUS = MUS / np.max(np.abs(MUS)) * 0.8
os.makedirs('out', exist_ok=True)
import wave
pcm = (MUS * 32767).astype('<i2')
with wave.open('out/mokalibo_theme.wav', 'wb') as w:
    w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes(pcm.tobytes())
dst = os.path.join('..', '..', 'public', 'audio'); os.makedirs(dst, exist_ok=True)
subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-i', 'out/mokalibo_theme.wav', '-ac', '2', '-b:a', '96k', os.path.join(dst, 'mokalibo_theme.mp3')], check=True)
print('ok', L / SR, 's')
