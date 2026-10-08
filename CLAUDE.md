# Mokalibo (ex-KidRoots, ex-Mokalibo) — Guide pour Claude Code

Nom de l'app : **Mokalibo** (prononcé mo-ka-li-bo, choisi pour se dire pareil dans les 6 langues ; mokalibo.com non enregistré au 08/10/2026). Les cles localStorage et les identifiants Firebase gardent le prefixe `kidroots` volontairement (ne pas renommer : perte des donnees deja sauvegardees).

## Contexte du projet
Application educative pour enfants de 4-7 ans permettant de decouvrir l'histoire des pays du monde.
Developpe par Walid "Chino" Azar (Wittlich, Allemagne) — inspire par la question de son fils :
"Papa, c'est ou le Mali ?"

## Stack technique
- React 18 + Vite
- Tailwind CSS
- Pas de TypeScript (JS pur)
- localStorage pour la persistance
- Deploye sur Netlify (via GitHub)

## Architecture
```
src/
  App.jsx              # Navigation principale (screen-based)
  i18n.js              # Systeme de traduction (6 langues)
  data/
    countries.js       # 11 pays x 5 chapitres = 55 chapitres historiques
  components/
    HomeScreen.jsx      # Ecran d'accueil
    RegionScreen.jsx    # Selection continent + pays
    CountryScreen.jsx   # Timeline historique du pays
    ChapterIntro.jsx    # Introduction d'un chapitre
    CardLevel.jsx       # Cartes historiques a retourner
    QuizLevel.jsx       # Quiz 3 choix
    ResultScreen.jsx    # Resultats + XP
    LangPicker.jsx      # Selecteur de langue
```

## Systeme de navigation
screens : home → regions → country → chapter (intro→cards→quiz) → result

## Systeme de progression
- XP : cards × 20 + quiz_questions × 30 par chapitre
- Chapitres deverrouilles sequentiellement (doit finir N pour debloquer N+1)
- Sauvegarde : localStorage key 'kidroots_v3_progress'
- Structure : { xp: number, level: number, done: { [chapterId]: true } }

## Langues supportees
fr, en, de, bm (bambara), ar, pt — voir src/i18n.js

## Structure donnees (countries.js)
```js
COUNTRIES = {
  ML: {
    name, flag, region, color, dark, bg,
    hero: { emoji, name, age },
    tagline,
    chapters: [{
      id, era, title, subtitle, emoji, color, light,
      intro, // texte narratif
      figure: { name, emoji, desc }, // personnage historique
      cards: [{ emoji, title, text, fact }],
      quiz: [{ q, correct, wrong1, wrong2, emoji }]
    }]
  }
}
```

## 11 pays disponibles
Afrique : ML (Mali), SN (Senegal), MA (Maroc), NG (Nigeria)
Europe : FR (France), DE (Allemagne)
Asie : JP (Japon), CN (Chine), IN (Inde)
Ameriques : BR (Bresil), MX (Mexique)

## Prochaines fonctionnalites a developper
1. Voix off TTS (Web Speech API) — lire le texte des cartes a voix haute
2. Mode hors-ligne (PWA service worker)
3. Profils multiples (plusieurs enfants)
4. Ajouter plus de pays (USA, Turquie, Egypte, Cote d'Ivoire...)
5. Animations Framer Motion entre les ecrans
6. Partage des badges sur les reseaux sociaux
7. Statistiques parentales (temps passe, pays explores)

## Deploy
- GitHub repo : wldazarservice-ui/kidroots (a creer)
- Netlify : connecter le repo, build command: npm run build, publish: dist
- PWA : manifest.json deja configure dans public/

## Paiement (2 € a vie par compte parent)
- Gratuit : le Mali (`FREE_COUNTRIES` dans `src/premium.js`). Le reste se debloque avec un paiement unique Stripe.
- Interrupteur : `VITE_PAYWALL_ENABLED=true` dans Netlify (variable de build : redeployer apres changement). Desactive = tout gratuit.
- Fonctions Netlify : `netlify/functions/` (create-checkout, confirm-checkout, stripe-webhook), helper commun `netlify/lib/shared.mjs`.
- Le flag `premium` est sur `users/{uid}` et n'est modifiable QUE par le serveur (regles `firestore.rules`, deployees sur kidroots-cdaf0).
- Variables Netlify requises : voir `.env.example`. Garder `firebase-admin` en v13 (v14 plante sur Netlify : jose ESM).
- Stores natifs : Apple/Google imposent leur achat integre (ne pas utiliser Stripe dans l'app native).
- Limites par compte : 5 enfants (`users/{uid}/children/c1..c5`) et 5 appareils (`users/{uid}/devices/d1..d5`, id local `kidino_device_id`). Imposees par `firestore.rules` (emplacements fixes). Code : `src/devices.js`, `src/cloud.js` (createChild), `DevicesManager.jsx`.
