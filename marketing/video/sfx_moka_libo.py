"""Bande son d'un episode de Moka & Libo : musique Mokalibo (basse) + petits sons des personnages.
Les heros ne parlent pas : Libo gazouille, Moka « babille » (syllabes musicales, comme dans les jeux video).
Usage : python3 sfx_moka_libo.py ep01  ->  out/moka_libo/moka_libo_ep01_audio.wav
"""
import sys, wave
import numpy as np

SR = 44100
DUR = 40.0
rng = np.random.default_rng(7)
out = np.zeros(int(SR * DUR))


def env(n, a=0.005, r=0.05):
    e = np.ones(n)
    na, nr = max(1, int(a * SR)), max(1, int(r * SR))
    e[:na] = np.linspace(0, 1, na)
    e[-nr:] *= np.linspace(1, 0, nr)
    return e


def add(t, sig, vol=1.0):
    i = int(t * SR)
    j = min(len(out), i + len(sig))
    out[i:j] += sig[: j - i] * vol


def tone(f0, f1, d, harm=(1, .35, .15), vib=0.0):
    n = int(d * SR)
    tt = np.arange(n) / SR
    f = np.linspace(f0, f1, n) * (1 + vib * np.sin(2 * np.pi * 9 * tt))
    ph = 2 * np.pi * np.cumsum(f) / SR
    return sum(a * np.sin(ph * (k + 1)) for k, a in enumerate(harm))


def chirp(t, n=3, base=2200, vol=.35, up=True):
    """Gazouillis de Libo : petites glissades aigues."""
    for k in range(n):
        f0 = base * (0.9 + 0.2 * rng.random())
        f1 = f0 * (1.5 if up else 0.7)
        s = tone(f0, f1, 0.07, harm=(1, .2)) * env(int(.07 * SR), .003, .03)
        add(t + k * 0.09, s, vol)


def trill(t, d=0.6, vol=.3):
    n = int(d * SR)
    tt = np.arange(n) / SR
    f = 2600 + 500 * np.sin(2 * np.pi * 18 * tt)
    s = np.sin(2 * np.pi * np.cumsum(f) / SR) * env(n, .01, .15)
    add(t, s, vol)


def babble(t, pitches, vol=.32, syl=0.085):
    """Babillage de Moka : une syllabe chantee par note (voix douce d'enfant)."""
    for k, p in enumerate(pitches):
        f = 420 * 2 ** (p / 12)
        n = int(syl * SR)
        s = tone(f, f * 1.02, syl, harm=(1, .5, .25, .12), vib=.01) * env(n, .008, .035)
        add(t + k * (syl + 0.018), s, vol)


def oh(t, vol=.35):
    n = int(.22 * SR)
    add(t, tone(700, 430, .22, harm=(1, .5, .2)) * env(n, .01, .08), vol)


def pop(t, vol=.3):
    n = int(.06 * SR)
    add(t, tone(950, 280, .06, harm=(1,)) * env(n, .002, .03), vol)


def ding(t, vol=.3):
    n = int(1.2 * SR)
    tt = np.arange(n) / SR
    s = sum(a * np.sin(2 * np.pi * f * tt) for f, a in ((1320, 1), (2640, .4), (3960, .15))) * np.exp(-tt * 4)
    add(t, s, vol)


def sparkle(t, vol=.18):
    for k, p in enumerate((0, 4, 7, 12, 16)):
        f = 1568 * 2 ** (p / 12)
        n = int(.25 * SR)
        tt = np.arange(n) / SR
        add(t + k * .06, np.sin(2 * np.pi * f * tt) * np.exp(-tt * 12), vol)


def noise(d):
    return rng.standard_normal(int(d * SR))


def bandsweep(t, d, f0, f1, vol=.25):
    """Souffle filtre (whoosh) : bruit passe dans un filtre qui glisse."""
    x = noise(d)
    n = len(x)
    y = np.zeros(n)
    f = np.linspace(f0, f1, n)
    lp = 0.0
    bp = 0.0
    for i in range(n):  # filtre d'etat simple
        g = 2 * np.sin(np.pi * f[i] / SR)
        hp = x[i] - lp - 0.5 * bp
        bp += g * hp
        lp += g * bp
        y[i] = bp
    y /= (np.abs(y).max() + 1e-9)
    add(t, y * env(n, d * .4, d * .5), vol)


def snore(t, d=1.6, vol=.12):
    n = int(d * SR)
    tt = np.arange(n) / SR
    s = np.sin(2 * np.pi * 110 * tt) * (0.5 + 0.5 * np.sin(2 * np.pi * 0.9 * tt - 1.5)) ** 2
    add(t, s * env(n, .1, .3), vol)


def ratchet(t0, t1, vol=.22):
    """Globe qui tourne : clics de plus en plus espaces."""
    t = t0
    gap = 0.03
    while t < t1:
        n = int(.012 * SR)
        add(t, noise(.012) * env(n, .001, .008), vol)
        t += gap
        gap *= 1.07


def boing(t, vol=.25):
    n = int(.3 * SR)
    add(t, tone(180, 520, .3, harm=(1, .3), vib=.06) * env(n, .005, .12), vol)


def munch(t0, t1, vol=.2, pitch=1.0):
    t = t0
    while t < t1:
        n = int(.05 * SR)
        x = noise(.05)
        x = np.convolve(x, np.ones(int(6 / pitch)) / 6, mode='same')
        add(t, x * env(n, .002, .03), vol)
        t += 0.13


def thud(t, vol=.6):
    n = int(.35 * SR)
    tt = np.arange(n) / SR
    s = np.sin(2 * np.pi * (90 - 40 * tt) * tt) * np.exp(-tt * 12) + 0.3 * noise(.35) * np.exp(-tt * 40)
    add(t, s, vol)


def mystery(t, d=2.2, vol=.14):
    n = int(d * SR)
    tt = np.arange(n) / SR
    s = sum(np.sin(2 * np.pi * f * tt) for f in (220, 261.6, 311.1)) / 3
    add(t, s * env(n, .4, .8), vol)


def rustle(t, d=0.5, vol=.15):
    """Papyrus qui se deroule : petits froissements."""
    k = t
    while k < t + d:
        n = int(.03 * SR)
        x = noise(.03)
        x = x - np.convolve(x, np.ones(4) / 4, mode='same')
        add(k, x * env(n, .002, .02), vol)
        k += 0.045 + 0.03 * rng.random()


def grunt(t, vol=.35):
    """Le chameau : un « blrrr » grave et drole."""
    n = int(.6 * SR)
    tt = np.arange(n) / SR
    s = np.sin(2 * np.pi * (140 - 50 * tt) * tt) * (0.6 + 0.4 * np.sign(np.sin(2 * np.pi * 28 * tt)))
    add(t, s * env(n, .02, .2), vol)


def steps(t0, t1, vol=.25):
    k = t0
    while k < t1:
        n = int(.12 * SR)
        tt = np.arange(n) / SR
        add(k, np.sin(2 * np.pi * 70 * tt) * np.exp(-tt * 30), vol)
        k += 0.3


# ── Partition de l'episode 1 (memes instants que moka_libo_ep01.html) ──
def ep01():
    pop(.25)
    snore(1.0)
    chirp(2.85, 2, 2000)
    bandsweep(3.6, .5, 600, 2500, .12); chirp(3.7, 3)
    ratchet(4.6, 6.4)
    ding(6.42)
    pop(6.7); oh(6.75)
    pop(7.6); chirp(7.65, 4, 2400)
    babble(7.85, [0, 4, 7, 12], .3)
    boing(7.9); boing(8.45)
    bandsweep(8.6, 1.0, 300, 4000, .3)
    chirp(9.9, 3, 2500); babble(10.4, [7, 9, 12, 9, 12], .26)
    chirp(12.6, 2, 2100)
    bandsweep(14.5, .9, 4000, 400, .26)
    babble(15.7, [0, 2, 4, 7], .26); chirp(16.1, 3)
    pop(16.9); chirp(16.95, 2, 2800)
    pop(18.0); babble(18.05, [4, 2, 7], .3, .11)
    munch(19.0, 20.4, .22)
    munch(20.5, 21.4, .16, 2.0); chirp(21.45, 3, 2600)
    sparkle(20.8)
    bandsweep(23.15, .45, 2500, 500, .14); pop(23.65, .35)
    babble(23.85, [0, 7, 12], .32, .1)
    pop(24.0); chirp(24.05, 2, 1800, .35, up=False)
    pop(28.0); babble(28.05, [7, 4, 0], .3); chirp(28.6, 2)
    bandsweep(29.85, .7, 400, 3500, .2)
    bandsweep(30.35, .4, 1200, 300, .1)
    thud(31.6)
    sparkle(31.7, .22)
    babble(31.95, [0, 4, 7, 12, 16], .3); trill(32.0)
    bandsweep(34.45, .8, 400, 3500, .2)
    mystery(35.0)
    pop(36.2); babble(36.25, [0, 3, 7, 10], .3)  # question qui monte
    sparkle(37.6); chirp(37.7, 3, 2500)
    babble(38.4, [12, 7, 12], .28)



# ── Episode 2 : l'Egypte (meme deroule ; papyrus et chameau a la place de l'onigiri et du casque) ──
def ep02():
    pop(.25)
    snore(1.0)
    chirp(2.85, 2, 2000)
    bandsweep(3.6, .5, 600, 2500, .12); chirp(3.7, 3)
    ratchet(4.6, 6.4)
    ding(6.42)
    pop(6.7); oh(6.75)
    pop(7.6); chirp(7.65, 4, 2400)
    babble(7.85, [0, 4, 7, 12], .3)
    boing(7.9); boing(8.45)
    bandsweep(8.6, 1.0, 300, 4000, .3)
    chirp(9.9, 3, 2500); babble(10.4, [7, 9, 12, 9, 12], .26)
    chirp(12.6, 2, 2100)
    bandsweep(14.5, .9, 4000, 400, .26)
    babble(15.7, [0, 2, 4, 7], .26); chirp(17.0, 3)
    pop(16.9); chirp(16.95, 2, 1900, .3, up=False)
    pop(18.0); rustle(18.1, .6)
    oh(19.05); babble(19.5, [4, 7, 11], .28)
    pop(21.0); trill(21.05, .5, .28)
    sparkle(20.8)
    steps(23.0, 24.6)
    grunt(24.7)
    pop(24.9); chirp(24.95, 4, 2600)
    babble(25.3, [0, 4, 7, 4, 12], .28)
    pop(28.0); babble(28.05, [7, 4, 0], .3); chirp(28.6, 2)
    bandsweep(29.85, .7, 400, 3500, .2)
    bandsweep(30.35, .4, 1200, 300, .1)
    thud(31.6)
    sparkle(31.7, .22)
    babble(31.95, [0, 4, 7, 12, 16], .3); trill(32.0)
    bandsweep(34.45, .8, 400, 3500, .2)
    mystery(35.0)
    pop(36.2); babble(36.25, [0, 3, 7, 10], .3)
    pop(36.6); trill(36.65, .8, .32)
    sparkle(37.6); chirp(37.7, 3, 2500)
    babble(38.4, [12, 7, 12], .28)


EP = sys.argv[1] if len(sys.argv) > 1 else 'ep01'
{'ep01': ep01, 'ep02': ep02}[EP]()

# ── Musique (basse) + mixage ──
with wave.open('out/mokalibo_theme.wav') as w:
    raw = np.frombuffer(w.readframes(w.getnframes()), dtype=np.int16).astype(np.float64) / 32768
    ch = w.getnchannels()
music = raw.reshape(-1, ch).mean(axis=1)
reps = int(np.ceil(len(out) / len(music)))
music = np.tile(music, reps)[: len(out)]
fade = np.ones(len(out))
nf = int(2.5 * SR)
fade[-nf:] = np.linspace(1, 0, nf)
fade[: int(.6 * SR)] = np.linspace(0, 1, int(.6 * SR))
mix = music * 0.32 * fade + out
mix = np.tanh(mix * 1.1) * 0.9
pcm = (np.clip(mix, -1, 1) * 32767).astype(np.int16)
stereo = np.repeat(pcm[:, None], 2, axis=1)
with wave.open(f'out/moka_libo/moka_libo_{EP}_audio.wav', 'wb') as w:
    w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR)
    w.writeframes(stereo.tobytes())
print('OK', len(pcm) / SR, 's')
