const INK = '#1A2A4F'

// Essai sans compte : apres le 1er chapitre (ou en voulant en ouvrir un 2e), on invite a creer le compte parent.
// La progression de l'essai (etoiles, chapitre fini) est recopiee sur le 1er profil enfant du compte.
const TXT = {
  fr: { done_t: 'Bravo, ta 1re aventure est finie !', more_t: 'La suite de l’aventure t’attend !', sub: 'Pour garder tes étoiles et continuer, demande à un parent de créer ton compte. C’est gratuit et ça prend 1 minute.', perks: ['⭐ Tes étoiles et ta progression sont gardées', '📖 30 chapitres offerts, 195 pays', '🎮 Les jeux en illimité'], cta: 'Créer le compte parent (gratuit)', later: 'Plus tard', login: 'J’ai déjà un compte' },
  en: { done_t: 'Well done, your 1st adventure is complete!', more_t: 'The rest of the adventure is waiting!', sub: 'To keep your stars and carry on, ask a parent to create your account. It’s free and takes 1 minute.', perks: ['⭐ Your stars and progress are kept', '📖 30 free chapters, 195 countries', '🎮 Unlimited games'], cta: 'Create the parent account (free)', later: 'Later', login: 'I already have an account' },
  de: { done_t: 'Bravo, dein 1. Abenteuer ist geschafft!', more_t: 'Das nächste Abenteuer wartet!', sub: 'Damit deine Sterne bleiben und es weitergeht, bitte einen Elternteil, dein Konto zu erstellen. Kostenlos, in 1 Minute.', perks: ['⭐ Deine Sterne und dein Fortschritt bleiben', '📖 30 Gratis-Kapitel, 195 Länder', '🎮 Spiele unbegrenzt'], cta: 'Elternkonto erstellen (gratis)', later: 'Später', login: 'Ich habe schon ein Konto' },
  pt: { done_t: 'Parabéns, a tua 1.ª aventura terminou!', more_t: 'O resto da aventura está à tua espera!', sub: 'Para guardar as tuas estrelas e continuar, pede a um pai ou mãe para criar a tua conta. É grátis e demora 1 minuto.', perks: ['⭐ As tuas estrelas e o teu progresso ficam guardados', '📖 30 capítulos grátis, 195 países', '🎮 Jogos ilimitados'], cta: 'Criar a conta de pais (grátis)', later: 'Mais tarde', login: 'Já tenho conta' },
  ar: { done_t: 'أحسنت، انتهت مغامرتك الأولى!', more_t: 'بقية المغامرة في انتظارك!', sub: 'لتحتفظ بنجومك وتكمل، اطلب من أحد والديك إنشاء حسابك. إنه مجاني ويستغرق دقيقة واحدة.', perks: ['⭐ نجومك وتقدمك محفوظان', '📖 30 فصلًا مجانيًا، 195 دولة', '🎮 ألعاب بلا حدود'], cta: 'إنشاء حساب الأولياء (مجانًا)', later: 'لاحقًا', login: 'لدي حساب بالفعل' },
}

export default function GuestWall({ lang, kind = 'more', stars = 0, onSignup, onLogin, onClose }) {
  const T = TXT[lang] || (lang === 'bm' ? TXT.fr : TXT.en)
  return (
    <div className="sheet-backdrop" onClick={onClose} dir={lang === 'ar' ? 'rtl' : 'ltr'}
      style={{ position: 'fixed', inset: 0, background: 'rgba(26,42,79,0.55)', zIndex: 600, display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
      <div onClick={(e) => e.stopPropagation()} className="anim-slide-up sheet"
        style={{ width: '100%', maxWidth: 440, background: 'linear-gradient(180deg,#FFFDF5,#FFF3D6)', borderRadius: '28px 28px 0 0', padding: '22px 18px 26px', fontFamily: 'Nunito, sans-serif', textAlign: 'center' }}>
        <div className="float" style={{ fontSize: 62 }}>{kind === 'done' ? '🏆' : '🌍'}</div>
        <div style={{ fontFamily: 'Fredoka, Nunito, sans-serif', fontSize: 25, fontWeight: 700, color: INK, lineHeight: 1.15, margin: '4px 0 8px' }}>{kind === 'done' ? T.done_t : T.more_t}</div>
        {stars > 0 && <div style={{ display: 'inline-block', background: 'white', borderRadius: 999, padding: '5px 14px', fontWeight: 900, color: '#E65100', marginBottom: 8 }}>⭐ {stars} XP</div>}
        <div style={{ fontSize: 15, fontWeight: 800, color: '#455A64', lineHeight: 1.5, marginBottom: 12 }}>{T.sub}</div>
        <div style={{ display: 'grid', gap: 6, textAlign: 'start', background: 'white', borderRadius: 18, padding: '10px 14px', marginBottom: 14, fontSize: 14.5, fontWeight: 800, color: INK }}>
          {T.perks.map((p) => <div key={p}>{p}</div>)}
        </div>
        <button className="btn-kid soft anim-glow" onClick={onSignup}
          style={{ width: '100%', background: 'linear-gradient(180deg,#FFE04D,#FFC400)', color: INK, padding: '16px', fontSize: 18, borderRadius: 22, boxShadow: '0 6px 0 #E6A100' }}>👨‍👩‍👧 {T.cta}</button>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 18, marginTop: 12 }}>
          <button onClick={onLogin} style={{ background: 'none', border: 'none', color: '#1565C0', fontWeight: 900, fontFamily: 'inherit', fontSize: 14, cursor: 'pointer', textDecoration: 'underline' }}>{T.login}</button>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#78909C', fontWeight: 900, fontFamily: 'inherit', fontSize: 14, cursor: 'pointer' }}>{T.later}</button>
        </div>
      </div>
    </div>
  )
}
