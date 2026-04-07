// KidRoots — Donnees historiques completes
// 20 pays — 5 chapitres chacun — Histoire complete de l'Antiquite a aujourd'hui

export const COUNTRIES = {

  // ════════════════════════════════════════════════════════════════════
  // AFRIQUE
  // ════════════════════════════════════════════════════════════════════

  ML: {
    name: 'Mali', flag: '🇲🇱', region: 'africa',
    color: '#C8600A', dark: '#7A3500', bg: '#FFF3E0',
    hero: { emoji: '👦🏿', name: 'Moussa', age: 8 },
    tagline: "De l'Empire du Ghana a aujourd'hui",
    chapters: [
      {
        id: 'ml_origins', era: 'Avant 300 ap. J.-C.', title: 'Les Origines',
        subtitle: 'Les premiers peuples du Niger',
        emoji: '🌅', color: '#5D4037', light: '#EFEBE9',
        intro: "Il y a plus de 4000 ans, des peuples de chasseurs et pecheurs vivaient sur les rives du fleuve Niger. Ils cultivaient le mil, maitrisaient le fer, et formaient les premiers royaumes. Ce sont les ancetres des Maliens d'aujourd'hui.",
        figure: { name: "Le Forgeron Ancestral", emoji: '⚒️', desc: "Dans les societes anciennes du Mali, le forgeron etait le personnage le plus respecte. Il transformait le fer en outils et armes, changeant a jamais la vie des peuples." },
        cards: [
          { emoji: '🌊', title: 'Le Fleuve Niger', text: "Depuis 4000 ans, tout commence ici. Les premiers habitants peuplent ses rives, peches avec des pirogues, et echangent du poisson avec les villages voisins.", fact: "Le Niger est le 3e plus long fleuve d'Afrique. Sans lui, aucun empire malien n'aurait existe !" },
          { emoji: '🌾', title: "L'Agriculture", text: "Il y a 3000 ans, les peuples du Mali apprennent a cultiver le mil, le sorgho et le riz. Cela permet de construire des villages permanents.", fact: "Le Mali est l'un des premiers endroits au monde ou le riz sauvage a ete cultive par l'homme !" },
          { emoji: '⚒️', title: 'La Maitrise du Fer', text: "La decouverte du fer change tout. Avec des outils en fer, on cultive mieux. Les forgerons deviennent les personnages les plus puissants de la societe.", fact: "Dans la tradition malienne, le forgeron (numu) avait des pouvoirs magiques. Il etait craint et respecte." },
          { emoji: '🐫', title: 'Les Routes du Sahara', text: "Des caravanes de chameaux traversent le desert. Elles apportent du sel du nord et repartent avec l'or du sud. Ces routes fondent la richesse des empires maliens.", fact: "Une livre d'or valait une livre de sel. Le sel etait si precieux car sans lui, la viande pourrissait !" },
          { emoji: '👥', title: 'Les Soninkes', text: "Le peuple Soninke est le premier a s'organiser en royaume. Ils parlent une langue encore utilisee aujourd'hui et fondent le premier grand empire de la region.", fact: "Les descendants des Soninkes vivent encore au Mali, en Mauritanie et au Senegal. Leur culture a 4000 ans !" },
        ],
        quiz: [
          { q: "Sur quel fleuve sont nees les premieres civilisations du Mali ?", correct: "Le Niger", wrong1: "Le Nil", wrong2: "Le Congo", emoji: '🌊' },
          { q: "Quel peuple a fonde le premier royaume de la region ?", correct: "Les Soninkes", wrong1: "Les Dogons", wrong2: "Les Touaregs", emoji: '👥' },
          { q: "Qu'echangeait-on sur les routes du Sahara ?", correct: "L'or contre le sel", wrong1: "Le riz contre le mil", wrong2: "Des chevaux contre des chameaux", emoji: '🐫' },
        ]
      },
      {
        id: 'ml_ghana', era: '300 — 1200', title: "L'Empire du Ghana",
        subtitle: 'Le pays de l\'or',
        emoji: '👑', color: '#E65100', light: '#FFF3E0',
        intro: "Attention : l'Empire du Ghana n'est pas le pays Ghana d'aujourd'hui ! C'etait un empire situe au nord du Mali actuel, gouverne par les Soninkes. Il controlait tout le commerce de l'or entre l'Afrique noire et le monde arabe.",
        figure: { name: "Le Ghana (le Roi)", emoji: '👑', desc: '"Ghana" signifiait "roi guerrier" en soninke. Le roi de Ghana etait si puissant qu\'il recevait des ambassadeurs venus d\'Egypte, du Maroc et meme d\'Europe.' },
        cards: [
          { emoji: '🏙️', title: 'Kumbi Saleh', text: "La capitale de l'Empire du Ghana. Une metropole de dizaines de milliers d'habitants, avec un quartier musulman pour les marchands et un quartier royal pour le roi.", fact: "Des archeologues ont decouvert les ruines de Kumbi Saleh en Mauritanie. La ville avait des maisons a plusieurs etages !" },
          { emoji: '🥇', title: "Le Commerce de l'Or", text: "L'empire controlait les mines d'or du Bambouk. Chaque marchand payait une taxe en or pour traverser le territoire. Le roi possedait une nugget d'or si grande qu'il y attachait son cheval.", fact: "Les Arabes appelaient l'Empire du Ghana 'Bilad al-Sudan' — le pays des Hommes Noirs. Ils le consideraient comme la source de tout l'or du monde !" },
          { emoji: '🧂', title: 'Le Monopole du Sel', text: "Le sel venait des mines de Teghaza au Sahara. L'empire achetait le sel au nord et le vendait tres cher au sud. Ce monopole etait une source incroyable de richesse.", fact: "Des blocs de sel etaient utilises comme monnaie ! Plus pratique que de porter de l'or partout..." },
          { emoji: '⚔️', title: "La Chute en 1076", text: "Les guerriers Almoravides (des Berberes du Maroc) attaquent et prennent Kumbi Saleh. L'empire s'affaiblit. Mais de ses cendres va naitre quelque chose d'encore plus grand...", fact: "La secheresse et l'epuisement des mines d'or ont aussi contribue a la chute. Les empires tombent rarement pour une seule raison." },
        ],
        quiz: [
          { q: "Que signifiait le mot 'Ghana' ?", correct: "Roi guerrier", wrong1: "Pays de l'or", wrong2: "Grand fleuve", emoji: '👑' },
          { q: "Qui a mis fin a l'Empire du Ghana ?", correct: "Les guerriers Almoravides", wrong1: "Les Romains", wrong2: "L'Empire du Mali", emoji: '⚔️' },
          { q: "Comment le roi de Ghana s'enrichissait-il ?", correct: "En taxant les marchands d'or et de sel", wrong1: "En cultivant le riz", wrong2: "En construisant des pyramides", emoji: '🥇' },
        ]
      },
      {
        id: 'ml_mali', era: '1235 — 1600', title: "L'Empire du Mali",
        subtitle: 'Soundiata Keita et Mansa Musa',
        emoji: '⚔️', color: '#B71C1C', light: '#FFEBEE',
        intro: "En 1235, Soundiata Keita bat le terrible roi Soumaoro Kante a la bataille de Kirina et fonde l'Empire du Mali. Cet empire va devenir l'un des plus grands et riches de l'histoire humaine. Un siecle plus tard, Mansa Musa regnera sur un territoire grand comme l'Europe entiere.",
        figure: { name: "Soundiata Keita", emoji: '🦁', desc: "Prince du peuple Mandingue, il etait paralyse des jambes enfant. Exile par son ennemi, il revient et rassemble tous les peuples pour battre Soumaoro Kante. Son histoire est racontee par les griots depuis 800 ans." },
        cards: [
          { emoji: '🦁', title: 'Soundiata Keita', text: "Ne vers 1217, il ne pouvait pas marcher enfant. Son ennemi Soumaoro Kante l'exile. Mais il revient avec une grande armee et bat Soumaoro a la bataille de Kirina en 1235.", fact: "La legende dit que la seule faiblesse de Soumaoro etait un ergot de coq blanc. Soundiata lui a lance une fleche avec cet ergot et lui a retire ses pouvoirs magiques !" },
          { emoji: '💰', title: 'Mansa Musa (1312-1337)', text: "Le 10e Mansa (roi) de l'empire. Il regnait sur le Maroc, la Mauritanie, le Senegal, la Gambie et le Mali actuels. Il controlait la moitie de l'or mondial et etait probablement l'homme le plus riche qui ait jamais vecu.", fact: "Sa fortune est estimee a 400 milliards de dollars d'aujourd'hui. Bill Gates est pauvre a cote de lui !" },
          { emoji: '🕌', title: 'Le Pelerinage de 1324', text: "Mansa Musa part a La Mecque avec 60 000 personnes et 14 tonnes d'or. Il distribue tant d'or sur son chemin que le prix de l'or s'effondre.", fact: "Il a distribue tellement d'or en Egypte que le prix de l'or a chute pendant 12 ans dans tout le monde arabe !" },
          { emoji: '📚', title: 'Tombouctou, Capitale du Savoir', text: "Sous Mansa Musa, Tombouctou devient la capitale mondiale du savoir islamique. La mosquee Sankoree accueille 25 000 etudiants. Des savants viennent du monde entier.", fact: "On a retrouve plus de 700 000 manuscrits a Tombouctou ! Des textes de medecine, de philosophie et d'astronomie ecrits il y a 600 ans." },
        ],
        quiz: [
          { q: "En quelle annee Soundiata Keita fonde l'Empire du Mali ?", correct: "1235", wrong1: "1000", wrong2: "1492", emoji: '🦁' },
          { q: "Combien d'or Mansa Musa emmene-t-il a La Mecque ?", correct: "14 tonnes d'or", wrong1: "1 kilo d'or", wrong2: "100 grammes", emoji: '🕌' },
          { q: "Pourquoi Tombouctou etait-elle celebre ?", correct: "C'etait un grand centre du savoir", wrong1: "C'etait la plus grande ville d'Afrique", wrong2: "Elle avait les plus grandes mines d'or", emoji: '📚' },
        ]
      },
      {
        id: 'ml_songhai', era: '1464 — 1591', title: "L'Empire Songhai",
        subtitle: 'La derniere grande puissance',
        emoji: '🏰', color: '#1565C0', light: '#E3F2FD',
        intro: "Apres le declin de l'Empire du Mali, l'Empire Songhai s'eleve. Sous Askia Mohammed, il devient le plus grand empire que l'Afrique de l'Ouest ait jamais connu. Mais en 1591, des soldats marocains armes de canons le detruisent en une seule bataille.",
        figure: { name: "Askia Mohammed", emoji: '🎓', desc: "Roi de 1493 a 1528, il cree un gouvernement centralise, des provinces administrees, une monnaie stable. Il fait de Tombouctou la reference mondiale du savoir islamique." },
        cards: [
          { emoji: '🎓', title: 'Askia Mohammed', text: "Il prend le pouvoir en 1493 et transforme tout. Il cree un gouvernement moderne avec des provinces, des gouverneurs, et une monnaie stable. Tombouctou devient sous lui la capitale du savoir mondial.", fact: "Askia Mohammed a fait son pelerinage a La Mecque en 1496. Le Khalife lui a accorde le titre de 'Calife du Soudan' !" },
          { emoji: '🏙️', title: 'Djenne, la Cite Commerciale', text: "Sous l'Empire Songhai, Djenne devient le plus grand marche d'Afrique de l'Ouest. Des milliers de marchands s'y reunissent chaque semaine.", fact: "La Grande Mosquee de Djenne, construite en banco (argile), est le plus grand batiment en terre crue du monde. Elle est toujours debout aujourd'hui !" },
          { emoji: '💥', title: 'La Bataille de Tondibi 1591', text: "Le sultan du Maroc envoie 4000 hommes armes de canons a travers le Sahara. Les Songhai n'ont pas de canons. Malgre leur nombre superieur, ils sont ecrases. L'empire s'effondre.", fact: "C'est la premiere fois que des armes a feu sont utilisees dans une grande bataille en Afrique sub-saharienne." },
        ],
        quiz: [
          { q: "Quelle arme a permis au Maroc de battre l'Empire Songhai ?", correct: "Les canons", wrong1: "Les elephants de guerre", wrong2: "Les arcs empoisonnes", emoji: '💥' },
          { q: "Qui a reorganise l'Empire Songhai ?", correct: "Askia Mohammed", wrong1: "Mansa Musa", wrong2: "Soundiata Keita", emoji: '🎓' },
          { q: "En quelle annee l'Empire Songhai tombe-t-il ?", correct: "1591", wrong1: "1235", wrong2: "1800", emoji: '📅' },
        ]
      },
      {
        id: 'ml_independence', era: '1960 — aujourd\'hui', title: "L'Independance",
        subtitle: 'Le Mali libre',
        emoji: '🌟', color: '#1B5E20', light: '#E8F5E9',
        intro: "Le 22 septembre 1960, le Mali declare son independance apres 80 ans de colonisation francaise. Modibo Keita devient le premier president. Le pays choisit ses trois couleurs : vert pour l'esperance, jaune pour l'or, rouge pour le sang des martyrs.",
        figure: { name: "Modibo Keita", emoji: '🎖️', desc: "Premier president du Mali independant (1960-1968). Il choisit le socialisme africain, nationalise les entreprises, et cree une identite malienne forte. Renverse en 1968, il reste un hero national." },
        cards: [
          { emoji: '🌟', title: 'Le 22 Septembre 1960', text: "Le drapeau malien est hisse pour la premiere fois a Bamako. Modibo Keita prononce son discours historique. La France reconnait la souverainete du Mali.", fact: "Le 22 septembre est la Fete Nationale du Mali. On le celebre chaque annee avec des parades et des fetes dans tout le pays !" },
          { emoji: '🎵', title: 'La Culture Vivante', text: "Malgre les difficultes politiques, la culture malienne rayonne. Les griots perpetuent les histoires anciennes. Des artistes comme Salif Keita font connaitre la musique malienne dans le monde entier.", fact: "Salif Keita, 'La Voix d'Or de l'Afrique', est albinos. Il a transforme sa difference en force !" },
          { emoji: '🌍', title: 'Le Mali Aujourd\'hui', text: "Le Mali fait face a de grands defis : l'insecurite au nord, la pauvrete. Mais c'est aussi un pays de resilience extraordinaire, riche d'une culture millenaire.", fact: "La moitie des Maliens ont moins de 17 ans. L'avenir du pays est dans leurs mains !" },
        ],
        quiz: [
          { q: "Quand le Mali a-t-il declare son independance ?", correct: "22 septembre 1960", wrong1: "14 juillet 1789", wrong2: "1er janvier 1900", emoji: '🌟' },
          { q: "Qui etait le premier president du Mali ?", correct: "Modibo Keita", wrong1: "Moussa Traore", wrong2: "Amadou Toumani Toure", emoji: '🎖️' },
          { q: "Que representent les couleurs du drapeau malien ?", correct: "Esperance, or, sang des martyrs", wrong1: "Foret, soleil, mer", wrong2: "Paix, justice, liberte", emoji: '🇲🇱' },
        ]
      },
    ]
  },

  SN: {
    name: 'Senegal', flag: '🇸🇳', region: 'africa',
    color: '#1B5E20', dark: '#0d3510', bg: '#E8F5E9',
    hero: { emoji: '👧🏿', name: 'Fatou', age: 7 },
    tagline: "Du Royaume du Sine au Lion de Teranga",
    chapters: [
      {
        id: 'sn_origins', era: 'Avant 1000', title: 'Les Premiers Royaumes',
        subtitle: 'Toucouleurs, Wolofs et Serers',
        emoji: '🌴', color: '#1B5E20', light: '#E8F5E9',
        intro: "Bien avant l'arrivee des Europeens, le Senegal etait divise en plusieurs royaumes puissants. Les Wolofs, les Serers, les Toucouleurs et les Diolas construisaient des societes organisees, avec des rois, des lois et des traditions milleniaires.",
        figure: { name: "Le Buur (Roi Wolof)", emoji: '👑', desc: "Dans la societe wolof, le Buur etait le chef supreme. Il etait assiste par des conseillers, des guerriers et des griots — les gardiens de la memoire collective." },
        cards: [
          { emoji: '🌊', title: "L'Empire du Djolof", text: "Au 14e siecle, l'empire du Djolof unifica les royaumes wolofs sous un seul dirigeant. Il controlait tout le nord du Senegal actuel et commercait avec les caravanes du Sahara.", fact: "Le Djolof donna son nom au peuple Wolof, la plus grande ethnie du Senegal aujourd'hui !" },
          { emoji: '🎭', title: "Les Griots", text: "Les griots sont les historiens, musiciens et poetes de la societe. Ils memorisent l'histoire de chaque famille et la transmettent oralement de generation en generation.", fact: "Un griot peut reciter l'arbre genealogique d'une famille sur 30 generations ! C'est comme un disque dur humain." },
          { emoji: '🥁', title: "Le Sabar", text: "Le tambour sabar est au coeur de la culture senegalaise. Il sert a communiquer entre villages, a annoncer les ceremonies, et a faire danser lors des fetes.", fact: "Autrefois, les messages pouvaient se transmettre de village en village par le code des tambours, comme des SMS !" },
          { emoji: '🌾', title: "L'Agriculture", text: "Les Senegalais cultivaient le mil, le sorgho et l'arachide depuis des siecles. Chaque ethnie avait ses techniques agricoles adaptees au terroir.", fact: "Le Senegal est l'un des premiers pays a avoir cultive l'arachide (cacahuete). L'huile d'arachide y est encore produite en grande quantite." },
        ],
        quiz: [
          { q: "Quel empire unit les royaumes wolofs ?", correct: "L'Empire du Djolof", wrong1: "L'Empire du Mali", wrong2: "Le Royaume du Sine", emoji: '👑' },
          { q: "Quel est le role des griots ?", correct: "Garder et transmettre l'histoire", wrong1: "Combattre les ennemis", wrong2: "Cultiver les champs", emoji: '🎭' },
          { q: "A quoi servait le tambour sabar ?", correct: "Communiquer et faire la fete", wrong1: "Faire peur aux ennemis", wrong2: "Appeler la pluie", emoji: '🥁' },
        ]
      },
      {
        id: 'sn_islam', era: '1000 — 1800', title: "L'Islam et les Royaumes",
        subtitle: "La foi qui transforme tout",
        emoji: '🕌', color: '#00695C', light: '#E0F2F1',
        intro: "A partir du 11e siecle, l'Islam arrive progressivement au Senegal par les routes commerciales du Sahara. Des marabouts (saints musulmans) deviennent des figures enormement respectees. Leur influence transforme la politique, la culture et la vie quotidienne.",
        figure: { name: "Cheikh Ahmadou Bamba", emoji: '🕌', desc: "Fonde la confrerie Mouride en 1883. Il prechait la paix, le travail et la foi. Les Francais l'ont exile deux fois, mais son influence n'a fait que grandir. Toubka est aujourd'hui la capitale spirituelle du Senegal." },
        cards: [
          { emoji: '🕌', title: "L'Arrivee de l'Islam", text: "L'Islam arrive au Senegal par les marchands arabes et berberes vers le 11e siecle. Les rois adoptent d'abord la religion pour renforcer leurs liens commerciaux avec le monde arabe.", fact: "95% des Senegalais sont musulmans aujourd'hui. Mais l'Islam senegalais est unique : il melange foi islamique et traditions africaines." },
          { emoji: '📿', title: "Les Confreries", text: "Les confreries religieuses (Mourides, Tidianes, Layenes) structurent la societe senegalaise. Chaque croyant est lie a un marabout qui guide sa vie spirituelle.", fact: "Le Grand Magal de Touba attire 5 millions de pelerins chaque annee ! C'est l'un des plus grands rassemblements religieux au monde." },
          { emoji: '⚔️', title: "Les Guerres Saintes", text: "Au 19e siecle, El Hadj Oumar Tall mene une jihad (guerre sainte) pour unifier les peuples de la region sous l'Islam. Il combat aussi bien les peuples animistes que les Francais.", fact: "El Hadj Oumar Tall a fonde un empire qui couvrait le Senegal, la Guinee et le Mali d'aujourd'hui !" },
        ],
        quiz: [
          { q: "Quel pourcentage des Senegalais est musulman ?", correct: "95%", wrong1: "50%", wrong2: "20%", emoji: '🕌' },
          { q: "Qui a fonde la confrerie Mouride ?", correct: "Cheikh Ahmadou Bamba", wrong1: "El Hadj Oumar Tall", wrong2: "Lat Dior", emoji: '📿' },
          { q: "Comment appelle-t-on les guides spirituels au Senegal ?", correct: "Des marabouts", wrong1: "Des imams", wrong2: "Des griots", emoji: '🙏' },
        ]
      },
      {
        id: 'sn_colonial', era: '1850 — 1960', title: "La Colonisation",
        subtitle: "Resistance et adaptation",
        emoji: '🏳️', color: '#7B1FA2', light: '#F3E5F5',
        intro: "Les Francais s'installent a Saint-Louis et Dakar des le 17e siecle. Mais la conquete de l'interieur ne commence vraiment qu'au 19e siecle. Des guerriers comme Lat Dior resistent heroiquement avant d'etre vaincus.",
        figure: { name: "Lat Dior", emoji: '⚔️', desc: "Damel (roi) du Cayor, il resiste aux Francais pendant des annees. Il est mort le 26 octobre 1886 en combattant contre la construction du chemin de fer qui traversait son royaume. Il est un hero national." },
        cards: [
          { emoji: '🏙️', title: "Dakar, Capitale Coloniale", text: "Les Francais fondent Dakar en 1857 sur la presqu'ile du Cap-Vert. La ville devient rapidement la capitale de toute l'Afrique Occidentale Francaise (AOF) — un territoire de 4 millions de km2 !", fact: "De Dakar, les Francais administraient 8 pays d'Afrique de l'Ouest. C'etait comme la capitale d'un continent !" },
          { emoji: '⚔️', title: "Lat Dior", text: "Damel du Cayor, il refuse de laisser les Francais construire un chemin de fer a travers son royaume. Il meurt en combattant le 26 octobre 1886. Sa mort marque la fin de la resistance du Cayor.", fact: "Lat Dior est l'un des heros nationaux les plus aimes du Senegal. Son portrait orne les billets de banque !" },
          { emoji: '🎓', title: "L'Elite Africaine", text: "Les quatre communes de Dakar, Saint-Louis, Goree et Rufisque sont les seuls endroits en Afrique coloniale ou les Africains ont les memes droits que les Francais. Cela cree une elite africaine francophone unique.", fact: "Leopold Sedar Senghor, futur president du Senegal, est sorti de ce systeme. Il est meme devenu membre de l'Academie Francaise !" },
        ],
        quiz: [
          { q: "En quelle annee les Francais fondent-ils Dakar ?", correct: "1857", wrong1: "1960", wrong2: "1400", emoji: '🏙️' },
          { q: "Pourquoi Lat Dior s'est-il batu contre les Francais ?", correct: "Pour empecher la construction du chemin de fer", wrong1: "Pour proteger l'or de son royaume", wrong2: "Pour chasser les marchands arabes", emoji: '⚔️' },
          { q: "Dakar etait la capitale de quel territoire colonial ?", correct: "L'Afrique Occidentale Francaise", wrong1: "L'Empire du Mali", wrong2: "Le Royaume du Djolof", emoji: '🏛️' },
        ]
      },
      {
        id: 'sn_independence', era: '1960 — aujourd\'hui', title: "L'Independance",
        subtitle: "Leopold, la Teranga et le Lion",
        emoji: '🦁', color: '#C62828', light: '#FFEBEE',
        intro: "Le 4 avril 1960, le Senegal devient independant. Leopold Sedar Senghor, poete et intellectuel, devient le premier president. Il gouverne pendant 20 ans et passe le pouvoir pacifiquement — un exemple rare en Afrique.",
        figure: { name: "Leopold Sedar Senghor", emoji: '✍️', desc: "Premier president du Senegal (1960-1980), poete de renommee mondiale, il a cree le concept de 'Negritude' — la fierté de l'identite africaine. Il est le premier Africain elu a l'Academie Francaise." },
        cards: [
          { emoji: '✍️', title: "Leopold Sedar Senghor", text: "Poete, philosophe et homme d'etat, il gouverne avec sagesse pendant 20 ans. En 1980, il passe le pouvoir a Abdou Diouf — une transition rare et pacifique en Afrique.", fact: "Senghor a invente le mot 'Negritude' pour decrire la fierte de l'identite et de la culture africaines. Son oeuvre poetique est etudiee dans le monde entier !" },
          { emoji: '🦁', title: "La Teranga", text: "La Teranga est la philosophie senegalaise de l'hospitalite. Elle signifie accueillir l'etranger avec chaleur et generosity. C'est l'une des plus grandes richesses du Senegal.", fact: "Les Lions de la Teranga (equipe de foot) ont atteint la finale de la Coupe du Monde 2002. Ils ont battu la France championne du monde en poule !" },
          { emoji: '🎵', title: "La Musique Senegalaise", text: "Le mbalax est la musique nationale senegalaise, fusionnant les rythmes sabar traditionnels avec le jazz et la pop. Youssou N'Dour est l'artiste senegalais le plus connu dans le monde.", fact: "Youssou N'Dour a chante avec Peter Gabriel, Neneh Cherry et Paul Simon. Il est devenu ministre de la Culture du Senegal !" },
        ],
        quiz: [
          { q: "Quand le Senegal a-t-il pris son independance ?", correct: "4 avril 1960", wrong1: "22 septembre 1960", wrong2: "14 juillet 1960", emoji: '🦁' },
          { q: "Qu'est-ce que la Teranga ?", correct: "L'hospitalite senegalaise", wrong1: "Un plat traditionnel", wrong2: "Le nom d'une ville", emoji: '🫂' },
          { q: "Quel musicien senegalais est connu dans le monde entier ?", correct: "Youssou N'Dour", wrong1: "Salif Keita", wrong2: "Fela Kuti", emoji: '🎵' },
        ]
      },
      {
        id: 'sn_culture', era: 'Culture', title: "La Culture Vivante",
        subtitle: "Art, cuisine et sport",
        emoji: '🎨', color: '#F57F17', light: '#FFFDE7',
        intro: "La culture senegalaise est l'une des plus riches d'Afrique. Du thieboudienne (le plat national) aux combats de lutte traditionnelle, en passant par les tissus wax colores, chaque aspect de la vie quotidienne est une celebration de l'identite senegalaise.",
        figure: { name: "La Femme Senegalaise", emoji: '👘', desc: "La femme senegalaise est au coeur de la culture. Elle est l'gardienne des traditions culinaires, des chants rituels, et de l'art de s'habiller. Son boubou colore et son gele (turban) sont des oeuvres d'art." },
        cards: [
          { emoji: '🍛', title: "Le Thieboudienne", text: "Le plat national du Senegal : du riz cuit dans une sauce de tomate avec du poisson et des legumes. Il se prepare pendant des heures et rassemble toute la famille autour d'un grand plat commun.", fact: "Le thieboudienne a ete classe au Patrimoine Culturel Immateriel de l'UNESCO en 2021 !" },
          { emoji: '🤼', title: "La Lutte Senegalaise", text: "La lutte traditionnelle (laamb) est le sport numero 1 au Senegal, encore plus populaire que le foot ! Les lutteurs sont des stars nationales, couverts de talismans, qui combattent dans des stades pleins a craquer.", fact: "Les lutteurs peuvent gagner des millions de francs CFA pour un seul combat. Certains sont plus riches que des footballeurs !" },
          { emoji: '🎨', title: "Le Tissu Wax", text: "Les tissus wax aux motifs colores sont une signature de la mode africaine. Les femmes senegalaises les portent en boubou, en wrapper ou en tenue habilee. Chaque motif a une signification.", fact: "Le tissu wax a ete invente... aux Pays-Bas pour imiter les batiks indonesiens ! Mais les Africains se l'ont approprie et en ont fait leur propre art." },
        ],
        quiz: [
          { q: "Quel est le plat national du Senegal ?", correct: "Le thieboudienne", wrong1: "Le couscous", wrong2: "Le jollof rice", emoji: '🍛' },
          { q: "Quel est le sport le plus populaire au Senegal ?", correct: "La lutte traditionnelle", wrong1: "Le football", wrong2: "La course a pied", emoji: '🤼' },
          { q: "Le thieboudienne a ete classe par quelle organisation ?", correct: "L'UNESCO", wrong1: "La FIFA", wrong2: "L'ONU", emoji: '🏆' },
        ]
      },
    ]
  },

  MA: {
    name: 'Maroc', flag: '🇲🇦', region: 'africa',
    color: '#C62828', dark: '#7f1313', bg: '#FFEBEE',
    hero: { emoji: '👦🏽', name: 'Youssef', age: 8 },
    tagline: "Du Royaume Amazigh a la Monarchie moderne",
    chapters: [
      {
        id: 'ma_origins', era: 'Avant 700 ap. J.-C.', title: "Les Amazighs",
        subtitle: "Les hommes libres du Maghreb",
        emoji: '🏔️', color: '#5D4037', light: '#EFEBE9',
        intro: "Bien avant les Arabes, les Romains et les Pheniciens, le Maroc etait habite par les Amazighs (Berberes) — 'les hommes libres'. Ils vivaient dans les montagnes de l'Atlas, les plaines fertiles et les oasis du Sahara depuis plus de 10 000 ans.",
        figure: { name: "La Reine Dihya (Kahina)", emoji: '👑', desc: "Guerriere amazighe du 7e siecle qui a resist a l'invasion arabe pendant des annees. Elle est l'une des grandes heroines de l'Afrique du Nord." },
        cards: [
          { emoji: '🏔️', title: "Les Montagnes de l'Atlas", text: "L'Atlas est la colonne vertebrale du Maroc. Ces montagnes abritent les Berberes depuis 10 000 ans. Le plus haut sommet, le Toubkal (4167m), est couvert de neige en hiver.", fact: "Le mot 'Atlas' vient du geant mythologique Atlas qui soutenait le ciel sur ses epaules dans la mythologie grecque !" },
          { emoji: '🌵', title: "Le Sahara Marocain", text: "Le Maroc possede des dunes de sable spectaculaires dans sa partie sud. Les Touaregs et les Sahraouis vivaient de l'elevage de chameaux et du commerce caravanier.", fact: "Erg Chebbi, pres de Merzouga, est le plus grand erg (champ de dunes) du Maroc. Les dunes peuvent atteindre 150 metres de haut !" },
          { emoji: '🎨', title: "L'Art Amazigh", text: "Les Amazighs ont cree une langue, un alphabet, et un art unique. Les tapis berberes, les bijoux en argent et les tatouages au henné sont encore pratiques aujourd'hui.", fact: "L'alphabet tifinagh, utilise par les Amazighs depuis 3000 ans, est encore enseigne dans les ecoles marocaines !" },
          { emoji: '🫒', title: "L'Olivier", text: "Le Maroc est l'un des plus grands producteurs d'huile d'olive au monde. Les oliviers sont cultives depuis l'Antiquite dans les valles de l'Atlas.", fact: "Certains oliviers au Maroc ont plus de 2000 ans ! Ils etaient deja vieux quand Jesus est ne." },
        ],
        quiz: [
          { q: "Que signifie 'Amazigh' ?", correct: "Homme libre", wrong1: "Guerrier du desert", wrong2: "Roi des montagnes", emoji: '🏔️' },
          { q: "Quel est le plus haut sommet du Maroc ?", correct: "Le Toubkal", wrong1: "Le Mont Fuji", wrong2: "Le Kilimanjaro", emoji: '⛰️' },
          { q: "Quel est l'alphabet des Amazighs ?", correct: "Le tifinagh", wrong1: "L'alphabet latin", wrong2: "L'alphabet arabe", emoji: '✍️' },
        ]
      },
      {
        id: 'ma_islam', era: '700 — 1500', title: "L'Islam et les Dynasties",
        subtitle: "Idrisides, Almoravides et Almohades",
        emoji: '🕌', color: '#1565C0', light: '#E3F2FD',
        intro: "En 788, Idriss I, descendant du prophete Mohammed, fonde la premiere dynastie islamique du Maroc et cree la ville de Fes. Pendant des siecles, des dynasties berberes vont se succeder et construire certains des plus beaux monuments du monde islamique.",
        figure: { name: "Idriss I", emoji: '🕌', desc: "Descendant du prophete Mohammed, il fuit la persecution a La Mecque et trouve refuge au Maroc. Il fonde la premiere dynastie islamique et bat la ville de Fes en 789." },
        cards: [
          { emoji: '🏙️', title: "Fes, la Ville Sainte", text: "Fondee en 789 par Idriss I, Fes est la plus ancienne ville medievale du monde encore habitee. Sa medina (vieille ville) est classee au patrimoine mondial de l'UNESCO.", fact: "L'Universite al-Qarawiyyin a Fes, fondee en 859, est la plus vieille universite du monde encore en activite !" },
          { emoji: '⚔️', title: "Les Almoravides", text: "Au 11e siecle, les guerriers Almoravides (Berberes du Sahara) partent de Mauritanie, conquerent le Maroc, puis toute l'Andalousie. Leur empire s'etend du Senegal a Madrid !", fact: "Les Almoravides ont fonde la ville de Marrakech en 1062. Elle est devenue leur capitale et la capitale du Maroc aujourd'hui !" },
          { emoji: '🌍', title: "Ibn Battuta (1304-1368)", text: "Ce grand voyageur marocain a parcouru 120 000 km — de Tanger a la Chine, a l'Inde, et en Afrique subsaharienne. Il a tout ecrit dans son livre 'Les Voyages'.", fact: "Ibn Battuta a voyage 3 fois plus loin que Marco Polo ! Son livre est la plus grande source sur le monde medieval." },
          { emoji: '🎨', title: "L'Architecture Arabo-Andalouse", text: "Les artisans marocains creent un style architectural unique : zellige (carreaux de mosaique), stuc sculpte, bois de cedre sculpte. Ces arts sont toujours transmis aujourd'hui.", fact: "Les artisans de Fes sont les seuls au monde a fabriquer encore du zellige entierement a la main !" },
        ],
        quiz: [
          { q: "Qui a fonde la ville de Fes ?", correct: "Idriss I", wrong1: "Ibn Battuta", wrong2: "Les Almoravides", emoji: '🏙️' },
          { q: "Quelle est la plus vieille universite du monde encore en activite ?", correct: "Al-Qarawiyyin a Fes", wrong1: "Oxford en Angleterre", wrong2: "La Sorbonne a Paris", emoji: '🎓' },
          { q: "Combien de km Ibn Battuta a-t-il parcourus ?", correct: "120 000 km", wrong1: "10 000 km", wrong2: "1 000 km", emoji: '🌍' },
        ]
      },
      {
        id: 'ma_empire', era: '1500 — 1900', title: "L'Empire Cherifien",
        subtitle: "Sultans et corsaires",
        emoji: '⚓', color: '#1B5E20', light: '#E8F5E9',
        intro: "Aux 16e et 17e siecles, le Maroc est une grande puissance maritime. Ses corsaires (pirates) terrorisent la Mediterranee. Le Sultan Ahmad al-Mansour bat le Portugal a la bataille des Trois Rois et envoie une armee conquérir l'Empire Songhai.",
        figure: { name: "Ahmad al-Mansour", emoji: '⚔️', desc: "Sultan de 1578 a 1603, il bat le Portugal a la bataille des Trois Rois et etend l'empire jusqu'en Afrique subsaharienne. Son titre 'al-Mansour' signifie 'le Victorieux'." },
        cards: [
          { emoji: '⚔️', title: "La Bataille des Trois Rois", text: "En 1578, le roi du Portugal envahit le Maroc. Le sultan Ahmad al-Mansour le bat completement a Wadi al-Makhazin. Trois rois meurent dans cette bataille — d'ou le nom !", fact: "Avec l'or et les esclaves ramenes de l'empire Songhai, Ahmad al-Mansour se fit appeler 'al-Dhahabi' — le Dore !" },
          { emoji: '⚓', title: "Les Corsaires de Sale", text: "Les corsaires marocains de Sale terrorisaient toute la Mediterranee et meme l'Atlantique. Ils attaquaient des navires de toute l'Europe et vendaient les prisonniers comme esclaves.", fact: "En 1627, des corsaires marocains ont attaque l'Islande ! Ils ont emmene 400 islanders en esclavage au Maroc." },
          { emoji: '🫖', title: "Le The a la Menthe", text: "La tradition du the a la menthe arrive avec les Touaregs du Sahara. Elle devient le symbole de l'hospitalite marocaine. Servir le the est un art — il doit etre verse de haut pour creer la mousse.", fact: "Au Maroc, le the se sert en trois verres : 'le premier est amer comme la vie, le deuxieme est fort comme l'amour, le troisieme est doux comme la mort'." },
        ],
        quiz: [
          { q: "Combien de rois sont morts a la Bataille des Trois Rois ?", correct: "Trois rois", wrong1: "Un roi", wrong2: "Cinq rois", emoji: '⚔️' },
          { q: "Que signifie 'al-Mansour' ?", correct: "Le Victorieux", wrong1: "Le Grand", wrong2: "L'Or", emoji: '👑' },
          { q: "De quelle ville venaient les corsaires marocains ?", correct: "Sale", wrong1: "Casablanca", wrong2: "Marrakech", emoji: '⚓' },
        ]
      },
      {
        id: 'ma_colonial', era: '1912 — 1956', title: "Le Protectorat Francais",
        subtitle: "Resistance et Independance",
        emoji: '🦅', color: '#7B1FA2', light: '#F3E5F5',
        intro: "En 1912, la France impose un protectorat au Maroc. Le sultan Mohammed V refuse de cooperer et soutient le mouvement pour l'independance. En 1953, les Francais l'exilent a Madagascar — une erreur qui accelere la revolte. Il revient en triomphe en 1955 et le Maroc devient independant en 1956.",
        figure: { name: "Mohammed V", emoji: '🦅', desc: "Sultan puis roi du Maroc, il refuse de soutenir les Francais et defend son peuple. Exile par les Francais en 1953, il revient en 1955 et mene le Maroc a l'independance le 2 mars 1956." },
        cards: [
          { emoji: '🏳️', title: "Le Protectorat de 1912", text: "Le traite de Fes de 1912 fait du Maroc un 'protectorat' francais — en realite une colonie. La France garde le sultan mais controle tout : l'armee, les finances, les affaires etrangeres.", fact: "L'Espagne aussi avait sa partie du Maroc ! Le nord et le sud etaient espagnols pendant que la France controlait le centre." },
          { emoji: '✊', title: "L'Istiqlal", text: "En 1944, le parti de l'Independance (Istiqlal) est fonde. Il reclame l'independance du Maroc. Mohammed V le soutient en refusant de signer les decrets francais.", fact: "Mohammed V a declare publiquement : 'Nous ne pouvons pas separer notre sort de celui de notre peuple.' Les Francais l'ont exile le lendemain." },
          { emoji: '🦅', title: "Le Retour du Roi", text: "L'exil de Mohammed V declenche une revolte generale au Maroc. Les Francais comprennent qu'ils ne peuvent pas maintenir leur pouvoir et le font revenir en novembre 1955. Le 2 mars 1956, le Maroc est independant.", fact: "Le 18 novembre, jour du retour de Mohammed V, est celebrate comme la Fete de l'Independance au Maroc !" },
        ],
        quiz: [
          { q: "En quelle annee le Maroc obtient-il son independance ?", correct: "1956", wrong1: "1960", wrong2: "1948", emoji: '🦅' },
          { q: "Ou Mohammed V a-t-il ete exile ?", correct: "A Madagascar", wrong1: "En France", wrong2: "En Angleterre", emoji: '✈️' },
          { q: "Qu'est-ce que l'Istiqlal ?", correct: "Le parti de l'independance", wrong1: "La capitale du Maroc", wrong2: "Un plat marocain", emoji: '✊' },
        ]
      },
      {
        id: 'ma_today', era: "Aujourd'hui", title: "Le Maroc Moderne",
        subtitle: "Entre tradition et modernite",
        emoji: '🌟', color: '#C62828', light: '#FFEBEE',
        intro: "Aujourd'hui, le Maroc est une monarchie constitutionnelle gouvernee par le roi Mohammed VI depuis 1999. Le pays est en plein essor economique, avec ses medinas medievales, ses deserts de sable, ses plages de l'Atlantique et ses villes modernes.",
        figure: { name: "Mohammed VI", emoji: '👑', desc: "Roi du Maroc depuis 1999, il a lance de grands projets de modernisation tout en preservant la culture et les traditions. Sous son regne, le Maroc est devenu la premiere destination touristique d'Afrique." },
        cards: [
          { emoji: '🏙️', title: "Casablanca", text: "La plus grande ville du Maroc et son poumon economique. La Mosquee Hassan II, construite sur la mer, est l'une des plus grandes mosquees du monde avec son minaret de 210 metres.", fact: "Le film 'Casablanca' (1942) avec Humphrey Bogart n'a pas ete tourne au Maroc mais a Hollywood !" },
          { emoji: '🍲', title: "Le Tajine", text: "Le tajine est le plat emblematique du Maroc. Viande ou legumes mijoter lentement dans un recipient conique en terre cuite. L'arganier, unique au Maroc, donne son huile prisee dans le monde entier.", fact: "L'huile d'argan est appelee 'l'or liquide du Maroc'. Elle est produite dans le sud du Maroc et vendue plus cher que l'huile d'olive !" },
          { emoji: '⚽', title: "Les Lions de l'Atlas", text: "L'equipe nationale de football du Maroc a atteint les demi-finales de la Coupe du Monde 2022 au Qatar — la meilleure performance d'une equipe africaine dans l'histoire !", fact: "Le Maroc a battu l'Espagne, le Portugal et la Belgique avant de perdre contre la France en demi-finale. Tout le continent africain les soutenait !" },
        ],
        quiz: [
          { q: "Quelle est la plus grande mosquee du Maroc ?", correct: "La Mosquee Hassan II", wrong1: "La Mosquee Al-Qarawiyyin", wrong2: "La Mosquee de Marrakech", emoji: '🕌' },
          { q: "Jusqu'ou les Lions de l'Atlas sont-ils alles en 2022 ?", correct: "En demi-finale", wrong1: "En finale", wrong2: "En quart de finale", emoji: '⚽' },
          { q: "Comment appelle-t-on l'huile d'argan ?", correct: "L'or liquide du Maroc", wrong1: "Le the du desert", wrong2: "Le miel du Sahara", emoji: '🫒' },
        ]
      },
    ]
  },

  NG: {
    name: 'Nigeria', flag: '🇳🇬', region: 'africa',
    color: '#1B5E20', dark: '#0d3510', bg: '#E8F5E9',
    hero: { emoji: '👦🏿', name: 'Emeka', age: 9 },
    tagline: "Le Geant de l'Afrique",
    chapters: [
      {
        id: 'ng_nok', era: '500 av. J.-C. — 200 ap. J.-C.', title: "La Civilisation Nok",
        subtitle: "Les premiers artistes de l'Afrique",
        emoji: '🏺', color: '#E65100', light: '#FFF3E0',
        intro: "Il y a 2500 ans, la civilisation Nok florissait dans le centre du Nigeria. Ces peuples fabriquaient des sculptures en terre cuite d'une sophistication incroyable — les plus anciennes sculptures figuratives sub-sahariennes connues. Ils maitrisaient aussi le travail du fer.",
        figure: { name: "L'Artiste Nok", emoji: '🏺', desc: "Les artisans Nok creaient des tetes en terre cuite avec des yeux triangulaires caracteristiques. On ne sait pas encore exactement pourquoi. Etaient-ce des portraits de rois ? Des objets rituels ?" },
        cards: [
          { emoji: '🏺', title: "Les Sculptures Nok", text: "Les sculptures en terre cuite Nok sont les plus vieilles sculptures figuratives d'Afrique sub-saharienne. Leurs yeux triangulaires percés sont immediatement reconnaissables.", fact: "On a retrouve des sculptures Nok dans une region grande comme la France ! Elles ont ete datees entre 500 av. J.-C. et 200 ap. J.-C." },
          { emoji: '🔥', title: "La Maitrise du Fer", text: "Les Nok etaient parmi les premiers peuples sub-sahariens a fondre le fer. Cette technique transforme leur agriculture et leur capacite de guerre.", fact: "La technologie du fer des Nok etait aussi avancee que celle de l'Europe a la meme epoque !" },
          { emoji: '🌾', title: "L'Agriculture Avancee", text: "Les Nok cultivaient l'igname, le millet et le sorgho. Avec leurs outils en fer, ils pouvaient travailler des terres plus difficiles et nourrir de plus grandes populations.", fact: "L'igname est encore aujourd'hui l'aliment de base du Nigeria. Le pays produit 70% des ignames du monde entier !" },
        ],
        quiz: [
          { q: "Que fabriquaient les artisans Nok ?", correct: "Des sculptures en terre cuite", wrong1: "Des bijoux en or", wrong2: "Des tapisseries", emoji: '🏺' },
          { q: "Quelle technologie les Nok maitrisaient-ils ?", correct: "Le travail du fer", wrong1: "La construction de pyramides", wrong2: "La navigation", emoji: '⚒️' },
          { q: "Quel aliment est originaire du Nigeria ?", correct: "L'igname", wrong1: "La pomme de terre", wrong2: "Le riz", emoji: '🌾' },
        ]
      },
      {
        id: 'ng_empires', era: '1000 — 1800', title: "Les Grands Royaumes",
        subtitle: "Bénin, Yoruba et Haoussa",
        emoji: '👑', color: '#B71C1C', light: '#FFEBEE',
        intro: "Le Nigeria medieval est une mosaique de royaumes puissants. Le Royaume du Benin avec ses bronzes extraordinaires, les cites-etats Yoruba avec leurs philosophies complexes, et les royaumes Haoussa musulmans du nord. Chacun a laisse une empreinte profonde.",
        figure: { name: "L'Oba du Benin", emoji: '🦁', desc: "L'Oba (roi) du Royaume du Benin etait considere comme divin. Ses artisans creaient des bronzes et des ivoires d'une beaute extraordinaire, parmi les plus grands chefs-d'oeuvre de l'art mondial." },
        cards: [
          { emoji: '🦁', title: "Le Royaume du Benin", text: "Fonde vers 900, il est connu pour ses bronzes exceptionnels qui ornaient le palais royal. Ses guerriers et ses marchands commercaient avec les Portugais des le 15e siecle.", fact: "En 1897, les Anglais ont saisi et emmene 3000 bronzes du Benin. La lutte pour leur retour dure encore aujourd'hui !" },
          { emoji: '🏛️', title: "Ile-Ife, la Cité Sainte", text: "Pour les Yoruba, Ile-Ife est le centre spirituel du monde — la ou les dieux ont cree l'humanite. La ville est un centre artistique majeur depuis 1000 ans.", fact: "Les Yoruba ont un systeme de religion tres complexe avec 401 dieux (orishas). Ces dieux se retrouvent aussi au Bresil et aux Caraibes apportes par les esclaves !" },
          { emoji: '📚', title: "Les Royaumes Haoussa", text: "Dans le nord du Nigeria, sept cites-etats Haoussa (Kano, Katsina, Zaria...) deviennent des centres du commerce islamique et du savoir. Kano est fondee au 9e siecle.", fact: "Kano est l'une des plus vieilles villes continues de l'Afrique de l'Ouest. Elle existe depuis plus de 1000 ans !" },
          { emoji: '🫙', title: "L'Industrie du Cuivre", text: "Les artisans du Benin fondaient le cuivre (laiton) en des plaques et des sculptures d'une precision incroyable. Ces bronzes enregistraient l'histoire du royaume.", fact: "La technique de la cire perdue utilisee par les artisans du Benin est identique a celle utilisee dans la Grece antique — peut-etre une decouverte independante !" },
        ],
        quiz: [
          { q: "Pourquoi le Royaume du Benin est-il celebre ?", correct: "Ses bronzes extraordinaires", wrong1: "Ses pyramides", wrong2: "Ses mines d'or", emoji: '🦁' },
          { q: "Quelle est la ville sainte des Yoruba ?", correct: "Ile-Ife", wrong1: "Lagos", wrong2: "Abuja", emoji: '🏛️' },
          { q: "Combien de bronzes les Anglais ont-ils pris en 1897 ?", correct: "3000 bronzes", wrong1: "100 bronzes", wrong2: "10 000 bronzes", emoji: '🫙' },
        ]
      },
      {
        id: 'ng_colonial', era: '1800 — 1960', title: "La Colonisation Britannique",
        subtitle: "La creation du Nigeria",
        emoji: '🏳️', color: '#1565C0', light: '#E3F2FD',
        intro: "Les Britanniques colonisent progressivement le Nigeria entre 1861 et 1914. En 1914, ils fusionnent arbitrairement des centaines de peuples differents en un seul pays qu'ils appellent 'Nigeria'. Cette union forcee aura des consequences durables.",
        figure: { name: "Funmilayo Ransome-Kuti", emoji: '✊', desc: "Activiste et feministe nigeriane, elle a dirige des manifestations contre les taxes coloniales en 1947. Sa lutte a inspire une generation entiere de Nigerians." },
        cards: [
          { emoji: '🏳️', title: "La Creation du Nigeria", text: "En 1914, le Gouverneur Frederick Lugard fusionne le Protectorat du Nord et le Protectorat du Sud pour creer le Nigeria. Le nom vient de 'River Niger Area'.", fact: "On dit que le nom 'Nigeria' a ete invente par la petite amie de Lugard, la journaliste Flora Shaw !" },
          { emoji: '⚫', title: "La Traite des Esclaves", text: "Le Nigeria a ete l'une des regions les plus touchees par la traite transatlantique. Des millions de Nigerians ont ete vendus comme esclaves aux Ameriques entre le 16e et le 19e siecle.", fact: "On estime que 3,5 millions de Nigerians ont ete vendus comme esclaves. La plupart sont alles au Bresil, aux Caraibes et aux USA." },
          { emoji: '🎓', title: "L'Education Coloniale", text: "Les missionnaires britanniques creent des ecoles. Une nouvelle elite nigeriane emerge — instruite en anglais, elle va mener le combat pour l'independance.", fact: "Nnamdi Azikiwe, futur premier president du Nigeria, a fait ses etudes aux Etats-Unis. Il est revenu au Nigeria avec des idees de liberte !" },
        ],
        quiz: [
          { q: "En quelle annee le Nigeria a-t-il ete cree ?", correct: "1914", wrong1: "1960", wrong2: "1800", emoji: '🏳️' },
          { q: "Que signifie 'Nigeria' ?", correct: "La zone du fleuve Niger", wrong1: "Le pays noir", wrong2: "La terre des orishas", emoji: '🌊' },
          { q: "Combien de Nigerians ont ete vendus comme esclaves ?", correct: "3,5 millions", wrong1: "100 personnes", wrong2: "10 millions", emoji: '⚫' },
        ]
      },
      {
        id: 'ng_independence', era: '1960 — 2000', title: "L'Independance et ses defis",
        subtitle: "Liberte, guerre civile et petrole",
        emoji: '🌟', color: '#E65100', light: '#FFF3E0',
        intro: "Le 1er octobre 1960, le Nigeria devient independant. Mais la jeune nation fait face a des defis enormes : la guerre civile du Biafra (1967-1970), des coups d'etat militaires a repetition, et la malédiction du petrole qui enrichit quelques-uns mais appauvrit beaucoup.",
        figure: { name: "Wole Soyinka", emoji: '📚', desc: "Ecrivain et poete nigerian, il est le premier Africain a avoir recu le Prix Nobel de Litterature en 1986. Il a ete emprisonne par la dictature militaire." },
        cards: [
          { emoji: '🌟', title: "L'Independance du 1er Octobre 1960", text: "Le Nigeria accede a l'independance le 1er octobre 1960, fete nationale. Nnamdi Azikiwe devient le premier president, Abubakar Tafawa Balewa le premier ministre.", fact: "Avec 45 millions d'habitants en 1960, le Nigeria etait deja le pays le plus peuple d'Afrique !" },
          { emoji: '⚔️', title: "La Guerre du Biafra", text: "En 1967, la region orientale du Nigeria, peuplee d'Igbo, proclame son independance sous le nom de Biafra. S'ensuit une guerre terrible de 3 ans. Un million de personnes meurent de famine.", fact: "Les images d'enfants affames du Biafra ont choque le monde et cree les premieres grandes campagnes humanitaires internationales." },
          { emoji: '🛢️', title: "La Malédiction du Petrole", text: "Le Nigeria est un des plus grands producteurs de petrole en Afrique. Mais cet argent profite peu aux citoyens ordinaires. Le delta du Niger, region petrolifere, est l'une des zones les plus polluees du monde.", fact: "Le Nigeria gagne des milliards de dollars de petrole chaque annee, mais 40% de la population vit avec moins de 1,90 dollar par jour." },
        ],
        quiz: [
          { q: "Quand le Nigeria a-t-il declare son independance ?", correct: "1er octobre 1960", wrong1: "4 juillet 1776", wrong2: "22 septembre 1960", emoji: '🌟' },
          { q: "Comment s'appelait la region separatiste du Nigeria en 1967 ?", correct: "Le Biafra", wrong1: "Le Lagos", wrong2: "Le Benin", emoji: '⚔️' },
          { q: "Wole Soyinka a recu quel prix en 1986 ?", correct: "Le Prix Nobel de Litterature", wrong1: "Le Prix Nobel de la Paix", wrong2: "Le Ballon d'Or", emoji: '📚' },
        ]
      },
      {
        id: 'ng_today', era: "Aujourd'hui", title: "Le Nigeria d'Aujourd'hui",
        subtitle: "Le Geant qui s'eveille",
        emoji: '🦅', color: '#1B5E20', light: '#E8F5E9',
        intro: "Aujourd'hui le Nigeria est la 1ere economie d'Afrique avec 220 millions d'habitants. Nollywood (son cinema) est le 2e plus productif au monde. L'Afrobeats conquiert la planete. Et des entrepreneurs nigerians creent des start-ups qui changent l'Afrique.",
        figure: { name: "Burna Boy", emoji: '🎵', desc: "Artiste Afrobeats, il a remporte un Grammy Award en 2021. Il incarne la nouvelle generation nigeriane qui conquiert le monde avec sa musique." },
        cards: [
          { emoji: '🎬', title: "Nollywood", text: "L'industrie cinematographique nigeriane est la 2e plus productive au monde apres Bollywood (Inde), avant Hollywood (USA). Elle produit plus de 2000 films par an !", fact: "Les films Nollywood sont regardes dans toute l'Afrique et dans la diaspora. Les acteurs nigerians sont des stars dans toute l'Afrique !" },
          { emoji: '🎵', title: "L'Afrobeats", text: "La musique nigeriane est devenue un phenomene mondial. Des artistes comme Burna Boy, Wizkid et Davido jouent dans les plus grands stades du monde et collaborent avec les plus grandes stars americaines.", fact: "Wizkid a chante avec Beyonce sur le film 'Black is King'. L'Afrobeats est maintenant ecoute dans 150 pays !" },
          { emoji: '💻', title: "Les Entrepreneurs", text: "Lagos est devenu l'un des plus grands hubs de start-ups d'Afrique. Des entreprises tech nigerianes comme Paystack et Flutterwave changent les systemes de paiement de tout le continent.", fact: "Paystack a ete rachetee par Stripe pour 200 millions de dollars — la plus grande acquisition tech en Afrique de l'histoire !" },
        ],
        quiz: [
          { q: "Quelle est la position de Nollywood dans le monde ?", correct: "2e apres Bollywood", wrong1: "1er devant Hollywood", wrong2: "10e dans le monde", emoji: '🎬' },
          { q: "Quelle musique nigeriane conquiert le monde ?", correct: "L'Afrobeats", wrong1: "Le jazz", wrong2: "Le reggae", emoji: '🎵' },
          { q: "Quelle est la population du Nigeria aujourd'hui ?", correct: "220 millions d'habitants", wrong1: "10 millions", wrong2: "1 milliard", emoji: '🌍' },
        ]
      },
    ]
  },

  // ════════════════════════════════════════════════════════════════════
  // EUROPE
  // ════════════════════════════════════════════════════════════════════

  FR: {
    name: 'France', flag: '🇫🇷', region: 'europe',
    color: '#0D47A1', dark: '#082a6b', bg: '#E3F2FD',
    hero: { emoji: '👧🏻', name: 'Camille', age: 8 },
    tagline: "Des Gaulois a la Republique",
    chapters: [
      {
        id: 'fr_gaul', era: 'Avant 52 av. J.-C.', title: "La Gaule et les Gaulois",
        subtitle: "Nos ancetres les Gaulois",
        emoji: '⚔️', color: '#5D4037', light: '#EFEBE9',
        intro: "Bien avant la France, le territoire etait habite par les Gaulois — des peuples celtes arrive vers 600 av. J.-C. Ils vivaient dans des villages fortifies, maitrisaient le fer et l'agriculture, et avaient leur propre religion avec les druides.",
        figure: { name: "Vercingetorix", emoji: '⚔️', desc: "Chef gaulois arverne, il unit les tribus gauloises contre Jules Cesar en 52 av. J.-C. Il remporte la bataille de Gergovie mais est finalement vaincu a Alesia. Il est le premier heros national francais." },
        cards: [
          { emoji: '🐗', title: "Les Gaulois", text: "Les Gaulois etaient divises en plus de 60 tribus differentes. Ils cultivaient le ble, elevaient des cochons, et etaient d'excellents metalurgistes. Leurs bijoux en or sont dans les musees du monde entier.", fact: "C'est vrai que les Gaulois portaient des moustaches, mais pas de casques avec des ailes ! C'est une invention des dessinateurs du 19e siecle." },
          { emoji: '🌿', title: "Les Druides", text: "Les druides etaient les prêtres gaulois. Ils connaissaient les plantes medicinales, rendaient la justice et gardaient le savoir. Leur formation durait 20 ans ! Ils n'ecrivaient rien — tout etait memorise.", fact: "Les druides faisaient leurs ceremonies dans des forets de chenes sacres. Le gui du chene etait leur plante la plus precieuse." },
          { emoji: '⚔️', title: "Vercingetorix", text: "En 52 av. J.-C., Vercingetorix unit les tribus contre Jules Cesar. Apres sa defaite a Alesia, il se rend a Cesar et est emmene a Rome. Il y sera emprisonne 6 ans avant d'etre execute.", fact: "Jules Cesar a ecrit lui-meme le recit de la conquete de la Gaule dans 'La Guerre des Gaules'. C'est l'un des premiers best-sellers de l'histoire !" },
          { emoji: '🏛️', title: "La Gaule Romaine", text: "Apres leur conquete, les Romains construisent des routes, des aqueducs, des amphitheatres dans toute la Gaule. La langue latine (ancetre du francais), le droit romain, et l'architecture transforment le territoire.", fact: "La ville de Lyon (Lugdunum) etait la capitale de la Gaule romaine, plus importante que Paris a l'epoque !" },
        ],
        quiz: [
          { q: "Comment s'appellent les peuples qui habitaient la France avant les Romains ?", correct: "Les Gaulois", wrong1: "Les Vikings", wrong2: "Les Francs", emoji: '⚔️' },
          { q: "Quel etait le role des druides ?", correct: "Pretres et gardiens du savoir", wrong1: "Guerriers d'elite", wrong2: "Marchands", emoji: '🌿' },
          { q: "Qui a ecrit le recit de la conquete de la Gaule ?", correct: "Jules Cesar", wrong1: "Vercingetorix", wrong2: "Napoleon", emoji: '📚' },
        ]
      },
      {
        id: 'fr_medieval', era: '500 — 1400', title: "Le Moyen Age",
        subtitle: "Francs, Chevaliers et Cathedrales",
        emoji: '🏰', color: '#7B1FA2', light: '#F3E5F5',
        intro: "Apres la chute de Rome, les Francs dominent la Gaule. Charlemagne fonde le premier Empire d'Occident en 800. Au Moyen Age, la France construit ses plus belles cathedrales gothiques et produit ses premieres grandes figures historiques.",
        figure: { name: "Jeanne d'Arc", emoji: '⚔️', desc: "Jeune paysanne de 17 ans qui affirme entendre des voix de saints lui ordonnant de delivrer la France des Anglais. Elle est brûlee a Rouen en 1431. Elle est aujourd'hui la sainte patronne de la France." },
        cards: [
          { emoji: '👑', title: "Charlemagne", text: "En 800, le pape couronne Charlemagne 'Empereur des Romains' a Rome. Il fait de l'education une priorite, impose l'ecriture carolingienne, et fonde l'Empire qui deviendra la France, l'Allemagne et l'Italie.", fact: "Charlemagne ne savait pas lire ! Il a appris tres tard et dormait avec une ardoise sous son oreiller pour s'exercer." },
          { emoji: '⚔️', title: "Jeanne d'Arc", text: "En 1429, Jeanne d'Arc convainc le roi Charles VII de la laisser mener l'armee. Elle delivre Orleans et fait couronner le roi. Capturee par les Anglais, elle est jugee pour heresie et brûlee a 19 ans.", fact: "Jeanne d'Arc a ete rehabilitee 25 ans apres sa mort. En 1920, elle est declaree sainte par l'Eglise catholique." },
          { emoji: '⛪', title: "Les Cathedrales", text: "Au 12e et 13e siecles, les Francais construisent les plus belles cathedrales gothiques du monde : Notre-Dame de Paris, Chartres, Reims. Ces edifices etaient la plus haute technologie de l'epoque.", fact: "Notre-Dame de Paris a pris 182 ans a construire (1163-1345). Les ouvriers qui ont pose les premieres pierres ne l'ont jamais vue terminee." },
        ],
        quiz: [
          { q: "Quand Charlemagne a-t-il ete couronne Empereur ?", correct: "En 800", wrong1: "En 1066", wrong2: "En 1200", emoji: '👑' },
          { q: "Quelle ville Jeanne d'Arc a-t-elle delivree ?", correct: "Orleans", wrong1: "Paris", wrong2: "Lyon", emoji: '⚔️' },
          { q: "Combien d'annees a-t-il fallu pour construire Notre-Dame ?", correct: "182 ans", wrong1: "10 ans", wrong2: "500 ans", emoji: '⛪' },
        ]
      },
      {
        id: 'fr_revolution', era: '1789 — 1815', title: "La Revolution",
        subtitle: "Liberte, Egalite, Fraternite",
        emoji: '🔥', color: '#B71C1C', light: '#FFEBEE',
        intro: "En 1789, le peuple francais se revolte contre la monarchie et les inegalites. La Revolution francaise change la France et le monde. Pour la premiere fois, un pays declare que tous les hommes sont egaux. Mais la revolution tourne au bain de sang avant que Napoleon n'emerge.",
        figure: { name: "Napoleon Bonaparte", emoji: '🎖️', desc: "General corse, il profite du chaos de la Revolution pour prendre le pouvoir en 1799. Il reforme la France (Code Napoleon, lycees, prefectures) et conquerit presque toute l'Europe avant d'etre exile." },
        cards: [
          { emoji: '🔥', title: "La Prise de la Bastille", text: "Le 14 juillet 1789, le peuple de Paris prend d'assaut la prison de la Bastille, symbole du pouvoir royal. C'est le debut de la Revolution. Le 14 juillet est aujourd'hui la fete nationale francaise.", fact: "Il n'y avait que 7 prisonniers dans la Bastille quand le peuple l'a prise ! Mais c'etait le symbole de l'oppression royale." },
          { emoji: '✂️', title: "La Guillotine", text: "La guillotine est inventee pour executer de maniere 'egalitaire' — nobles et pauvres auraient la meme mort. Le roi Louis XVI et la reine Marie-Antoinette sont guillotines en 1793.", fact: "La guillotine a ete utilisee en France jusqu'en 1977 ! La derniere execution a eu lieu deux ans avant l'abolition de la peine de mort en 1981." },
          { emoji: '🎖️', title: "Napoleon Bonaparte", text: "General de genie, il devient Consul puis Empereur. Il reforme completement la France : le Code civil, le baccalaureat, la Banque de France, les prefectures. Son Code Napoleon inspire encore les lois de 40 pays.", fact: "Napoleon mesurait 1m68 — la taille moyenne en France a l'epoque. Sa petite taille est une legende inventee par les Anglais pour se moquer de lui !" },
        ],
        quiz: [
          { q: "Quand a eu lieu la prise de la Bastille ?", correct: "14 juillet 1789", wrong1: "1er janvier 1800", wrong2: "22 septembre 1792", emoji: '🔥' },
          { q: "Combien de prisonniers y avait-il dans la Bastille ?", correct: "7 prisonniers", wrong1: "1000 prisonniers", wrong2: "100 prisonniers", emoji: '✂️' },
          { q: "Qu'est-ce que le Code Napoleon ?", correct: "Un code de lois qui inspire 40 pays", wrong1: "Un livre de strategies militaires", wrong2: "Un code secret de l'armee", emoji: '📚' },
        ]
      },
      {
        id: 'fr_colonial', era: '1830 — 1962', title: "L'Empire Colonial",
        subtitle: "Le second empire le plus grand",
        emoji: '🌍', color: '#1565C0', light: '#E3F2FD',
        intro: "Entre 1830 et 1930, la France construit le deuxieme plus grand empire colonial de l'histoire, apres la Grande-Bretagne. Elle colonise l'Algerie, le Maroc, la Tunisie, le Senegal, le Mali, la Cote d'Ivoire, le Vietnam, le Cambodge et bien d'autres territoires.",
        figure: { name: "Toussaint Louverture", emoji: '✊', desc: "Leader de la Revolution haitienne (1791-1804), il a mene les esclaves de Saint-Domingue (Haiti) a la liberte contre la France. Haiti devient la premiere republique noire libre du monde." },
        cards: [
          { emoji: '🌍', title: "L'Empire Francais", text: "A son apogee en 1920, l'empire francais couvrait 12 millions de km2 et comptait 100 millions d'habitants. La France gouvernait des peuples en Afrique, en Asie, dans le Pacifique et aux Ameriques.", fact: "L'empire francais etait 20 fois plus grand que la France metropolitaine !" },
          { emoji: '✊', title: "Les Resistances", text: "Partout dans l'empire, les peuples colonises ont resiste. En Algerie, Abd el-Kader a combattu 15 ans. A Madagascar, les Malgaches se sont revoltes en 1947. Au Vietnam, Ho Chi Minh a finalement battu la France en 1954.", fact: "La Bataille de Dien Bien Phu en 1954 est la premiere fois dans l'histoire qu'une puissance coloniale asiatique bat militairement une puissance europeenne." },
          { emoji: '🤝', title: "La Decolonisation", text: "Entre 1956 et 1962, presque tous les pays africains colonises par la France obtiennent leur independance. Les Francais parlent de 'decolonisation'. Les Africains parlent de liberation.", fact: "Le General de Gaulle a accorde l'independance a 14 pays africains en une seule annee (1960). C'est pourquoi 1960 est appelee 'l'annee de l'Afrique'." },
        ],
        quiz: [
          { q: "Quelle etait la superficie de l'empire francais au maximum ?", correct: "12 millions de km2", wrong1: "1 million de km2", wrong2: "50 millions de km2", emoji: '🌍' },
          { q: "Qui etait le leader de la Revolution haitienne ?", correct: "Toussaint Louverture", wrong1: "Napoleon Bonaparte", wrong2: "Simon Bolivar", emoji: '✊' },
          { q: "Comment appelle-t-on l'annee 1960 pour l'Afrique ?", correct: "L'annee de l'Afrique", wrong1: "L'annee de la Liberation", wrong2: "L'annee de la Paix", emoji: '🌍' },
        ]
      },
      {
        id: 'fr_today', era: "Aujourd'hui", title: "La France Moderne",
        subtitle: "Republique, culture et diversite",
        emoji: '🗼', color: '#0D47A1', light: '#E3F2FD',
        intro: "Aujourd'hui la France est la 7e puissance economique mondiale, membre fondateur de l'Union Europeenne, et membre permanent du Conseil de Securite de l'ONU. Sa culture — gastronomie, mode, art, cinema — rayonne dans le monde entier.",
        figure: { name: "Simone Veil", emoji: '⚖️', desc: "Survivante de la Shoah, elle est devenue ministre de la Sante et a fait voter en 1975 la loi sur l'IVG. Symbol de courage, elle a ete la premiere femme elue au Pantheon pour ses propres actions." },
        cards: [
          { emoji: '🗼', title: "Paris, Ville Lumiere", text: "Paris est la ville la plus visitee au monde avec 30 millions de touristes par an. La Tour Eiffel, le Louvre, Versailles, les Champs-Elysees... chaque monument est connu dans le monde entier.", fact: "La Tour Eiffel est repeinte toutes les 7 ans. Il faut 60 tonnes de peinture et 25 peintres alpinistes pendant 18 mois !" },
          { emoji: '🧀', title: "La Gastronomie", text: "La cuisine francaise est inscrite au Patrimoine Culturel de l'UNESCO. La France a le plus grand nombre d'etoiles Michelin au monde. Croissants, baguettes, fromages, vins... l'alimentation francaise est un art.", fact: "La France est le pays qui consomme le plus de fromage par habitant au monde. Chaque Francais en mange 28 kg par an !" },
          { emoji: '⚽', title: "Les Bleus", text: "L'equipe de France a remporte la Coupe du Monde en 1998 et 2018. En 2018, avec Mbappe, Pogba et Griezmann, les Bleus ont bat la Croatie 4-2 en finale.", fact: "Lors de la finale 2018, les Bleus etaient representes par des joueurs dont les parents venaient de 20 pays differents. C'est la force de la France !" },
        ],
        quiz: [
          { q: "Combien de touristes Paris accueille-t-elle chaque annee ?", correct: "30 millions", wrong1: "1 million", wrong2: "100 millions", emoji: '🗼' },
          { q: "Combien de kg de fromage chaque Francais mange-t-il par an ?", correct: "28 kg", wrong1: "1 kg", wrong2: "100 kg", emoji: '🧀' },
          { q: "En quelles annees la France a-t-elle gagne la Coupe du Monde ?", correct: "1998 et 2018", wrong1: "1966 et 1990", wrong2: "2002 et 2010", emoji: '⚽' },
        ]
      },
    ]
  },

  DE: {
    name: 'Allemagne', flag: '🇩🇪', region: 'europe',
    color: '#B71C1C', dark: '#7f1313', bg: '#FFEBEE',
    hero: { emoji: '👦🏼', name: 'Max', age: 8 },
    tagline: "Des tribus germaniques a la reunion",
    chapters: [
      {
        id: 'de_germanic', era: 'Avant 800', title: "Les Tribus Germaniques",
        subtitle: "Les peuples de la foret",
        emoji: '🌲', color: '#2E7D32', light: '#E8F5E9',
        intro: "Avant l'Allemagne, le territoire etait habite par des tribus germaniques : les Francs, les Saxons, les Visigoths, les Lombards... Ces peuples vivaient dans les grandes forets d'Europe centrale et resistaient avec succes a l'Empire Romain.",
        figure: { name: "Arminius (Hermann)", emoji: '🌲', desc: "Chef de la tribu des Cherusques, il tend une embuscade aux legions romaines dans la Foret de Teutoburg en 9 ap. J.-C. Il detruit 3 legions et arrete l'expansion romaine en Germanie." },
        cards: [
          { emoji: '🌲', title: "La Foret de Teutoburg", text: "En 9 ap. J.-C., le chef germain Arminius attire 3 legions romaines dans une embuscade dans la foret. Les Romains sont massacres. Auguste pleure : 'Varus, rends-moi mes legions !'", fact: "Cette bataille a change l'histoire ! Sans cette victoire, toute l'Allemagne serait devenue romaine et parlerait peut-etre latin aujourd'hui." },
          { emoji: '⚒️', title: "La Maitrise du Fer", text: "Les Germaniques etaient d'excellents forgeons. Leurs epees etaient souvent meilleures que les epees romaines. Ils exportaient des armes a travers toute l'Europe.", fact: "Le mot 'epee' vient du vieux germanique 'swerd'. Les Germaniques ont donne beaucoup de mots aux langues europeennes !" },
          { emoji: '🏰', title: "Le Saint-Empire Romain", text: "En 800, Charlemagne fonde l'Empire carolingien. Ses successeurs creent le Saint-Empire Romain Germanique (962-1806) — une confederation de centaines de principautes qui couvrait l'Europe centrale.", fact: "Le Saint-Empire n'etait ni saint, ni romain, ni germanique selon le philosophe Voltaire — il etait trop divise pour etre vraiment unifie !" },
        ],
        quiz: [
          { q: "Qu'a fait Arminius en 9 ap. J.-C. ?", correct: "Detruit 3 legions romaines dans une embuscade", wrong1: "Fonde la ville de Berlin", wrong2: "Battu les Francs", emoji: '🌲' },
          { q: "Qui a fonde l'Empire carolingien en 800 ?", correct: "Charlemagne", wrong1: "Arminius", wrong2: "Guillaume Ier", emoji: '👑' },
          { q: "Comment s'appelait l'empire allemand medieval ?", correct: "Le Saint-Empire Romain Germanique", wrong1: "Le Royaume de Prusse", wrong2: "L'Empire Germain", emoji: '🏰' },
        ]
      },
      {
        id: 'de_reformation', era: '1517 — 1648', title: "La Reformation",
        subtitle: "Luther et la division du christianisme",
        emoji: '📖', color: '#7B1FA2', light: '#F3E5F5',
        intro: "En 1517, un moine allemand nomme Martin Luther afficha 95 theses sur la porte d'une eglise a Wittenberg, remettant en cause l'autorite du pape. Cette protestation declenche la Reformation protestante et divise le christianisme en deux, changeant pour toujours l'Europe.",
        figure: { name: "Martin Luther", emoji: '📖', desc: "Moine et theologien, il affiche ses 95 theses en 1517 pour contester les abus de l'Eglise catholique. Excommunié, il traduit la Bible en allemand, creant une langue allemande standardisee." },
        cards: [
          { emoji: '📖', title: "Martin Luther", text: "En 1517, Luther affiche ses 95 theses a Wittenberg. Il refuse de les retirer et est excommunié par le pape. Il traduit la Bible en allemand afin que tous puissent la lire — pas seulement les prêtres.", fact: "La traduction de la Bible par Luther a standardise la langue allemande. Avant lui, il y avait des dizaines de dialectes tres differents !" },
          { emoji: '📰', title: "L'Invention de l'Imprimerie", text: "Quelques decennies avant Luther, Gutenberg (Mayence, 1450) invente l'imprimerie a caracteres mobiles. Les idees de Luther se repandent a une vitesse incroyable grace a la presse.", fact: "En 1500, il y avait 20 millions de livres en Europe. En 1600, il y en avait 200 millions ! L'imprimerie c'est comme internet au 15e siecle." },
          { emoji: '⚔️', title: "La Guerre de Trente Ans", text: "De 1618 a 1648, l'Europe est ravagee par une guerre de religion entre catholiques et protestants. L'Allemagne perd le tiers de sa population. La Paix de Westphalie cree le systeme moderne des Etats-nations.", fact: "La Guerre de Trente Ans est la plus meurtriere de l'histoire europeenne avant la 1ere Guerre Mondiale. L'Allemagne met 150 ans a se repeupler." },
        ],
        quiz: [
          { q: "Ou Martin Luther a-t-il affiche ses 95 theses ?", correct: "A Wittenberg", wrong1: "A Berlin", wrong2: "A Rome", emoji: '📖' },
          { q: "Qui a invente l'imprimerie ?", correct: "Gutenberg", wrong1: "Luther", wrong2: "Charlemagne", emoji: '📰' },
          { q: "Combien d'annees a dure la Guerre de Trente Ans ?", correct: "30 ans (1618-1648)", wrong1: "100 ans", wrong2: "10 ans", emoji: '⚔️' },
        ]
      },
      {
        id: 'de_unification', era: '1800 — 1918', title: "L'Unification et la Guerre",
        subtitle: "Bismarck, Kaiser et la Grande Guerre",
        emoji: '🦅', color: '#1565C0', light: '#E3F2FD',
        intro: "En 1871, Bismarck unifie les states germaniques en un seul Empire Allemand sous le Kaiser Guillaume Ier. L'Allemagne devient la premiere puissance industrielle d'Europe. Mais le nationalisme et les rivalites entre empires menent a la catastrophe de la Premiere Guerre Mondiale.",
        figure: { name: "Otto von Bismarck", emoji: '🦅', desc: "Premier ministre de Prusse, il unifie les etats germaniques par la diplomatie et la guerre ('fer et sang'). En 1871, il cree l'Empire Allemand et devient son premier chancelier." },
        cards: [
          { emoji: '🦅', title: "L'Unification en 1871", text: "Otto von Bismarck unifie 39 etats germaniques en un seul Empire. La proclamation a lieu dans le palais de Versailles, en France, apres la victoire sur Napoleon III. L'Allemagne est la nouvelle grande puissance d'Europe.", fact: "La proclamation de l'Empire allemand dans la Galerie des Glaces de Versailles (chez les Francais !) etait intentionnellement humiliante pour la France !" },
          { emoji: '🏭', title: "La Revolution Industrielle", text: "L'Allemagne du 19e siecle devient la premiere puissance industrielle d'Europe. Krupp produit des aciers, Bayer invente l'aspirine, Mercedes et Benz inventent l'automobile.", fact: "L'inventeur de la voiture a moteur (Karl Benz, 1885) etait Allemand ! Sans lui, pas de voitures aujourd'hui." },
          { emoji: '💥', title: "La Premiere Guerre Mondiale", text: "En 1914, l'assassinat d'un prince autrichien declenche une guerre mondiale qui dure 4 ans. 20 millions de morts. L'Allemagne est vaincue en 1918. Le traite de Versailles lui impose des conditions humiliantes.", fact: "Les tranchees de la Premiere Guerre Mondiale s'etendaient sur 750 km de la Belgique a la Suisse. Les soldats y vivaient dans des conditions terribles." },
        ],
        quiz: [
          { q: "Qui a unifie l'Allemagne en 1871 ?", correct: "Otto von Bismarck", wrong1: "Kaiser Wilhelm", wrong2: "Martin Luther", emoji: '🦅' },
          { q: "Ou a ete proclame l'Empire allemand ?", correct: "Dans le palais de Versailles en France", wrong1: "A Berlin", wrong2: "A Munich", emoji: '🏰' },
          { q: "Qui a invente la voiture a moteur en 1885 ?", correct: "Karl Benz", wrong1: "Henry Ford", wrong2: "Napoleon", emoji: '🚗' },
        ]
      },
      {
        id: 'de_ww2', era: '1933 — 1945', title: "La Seconde Guerre Mondiale",
        subtitle: "Hitler, la Shoah et la defaite",
        emoji: '💔', color: '#37474F', light: '#ECEFF1',
        intro: "En 1933, Adolf Hitler prend le pouvoir. Son regime nazi persecute les Juifs, les Roms, les handicapes et ses opposants. Il declenche la Seconde Guerre Mondiale en 1939. Pendant la guerre, 6 millions de Juifs sont extermines — la Shoah. En 1945, l'Allemagne est vaincue et divisee.",
        figure: { name: "Sophie Scholl", emoji: '🌹', desc: "Etudiante de 21 ans, elle distribuait des tracts contre le regime nazi avec son frere Hans. Arretee en 1943, elle est executee. Elle est le symbole de la resistance allemande contre Hitler." },
        cards: [
          { emoji: '🌹', title: "La Resistance", text: "Meme sous la dictature nazie, certains Allemands ont risque leur vie pour resister. Sophie Scholl, Claus von Stauffenberg (qui a tente de tuer Hitler) et des milliers d'autres sont morts pour leurs convictions.", fact: "Sophie Scholl avait 21 ans quand elle a ete executee. Sa derniere phrase etait : 'Le soleil brille encore'." },
          { emoji: '💔', title: "La Shoah", text: "Le regime nazi a systematiquement extermime 6 millions de Juifs europeens dans des camps de concentration et d'extermination. C'est l'un des crimes les plus terribles de l'histoire humaine.", fact: "Le mot 'Shoah' signifie 'catastrophe' en hebreu. Il y avait 9 millions de Juifs en Europe en 1933. Les deux tiers ont ete tues." },
          { emoji: '🧱', title: "La Chute du Mur de Berlin", text: "Apres 1945, l'Allemagne est divisee en deux : l'Ouest (democratie) et l'Est (communisme). En 1961, un mur est construit a Berlin pour empecher les Allemands de l'Est de fuir. Il tombe enfin le 9 novembre 1989.", fact: "Des milliers de personnes ont essaye de traverser le Mur de Berlin. 140 ont ete tuees. Le mur est tombe sans un seul coup de feu !" },
        ],
        quiz: [
          { q: "Combien de Juifs ont ete tues pendant la Shoah ?", correct: "6 millions", wrong1: "1000 personnes", wrong2: "100 000", emoji: '💔' },
          { q: "Quel age avait Sophie Scholl quand elle a ete executee ?", correct: "21 ans", wrong1: "50 ans", wrong2: "15 ans", emoji: '🌹' },
          { q: "Quand le Mur de Berlin est-il tombe ?", correct: "9 novembre 1989", wrong1: "9 novembre 1961", wrong2: "1er janvier 2000", emoji: '🧱' },
        ]
      },
      {
        id: 'de_today', era: "Aujourd'hui", title: "L'Allemagne Reunifiee",
        subtitle: "Premiere puissance d'Europe",
        emoji: '🌟', color: '#1B5E20', light: '#E8F5E9',
        intro: "Depuis la reunion en 1990, l'Allemagne est devenue la premiere puissance economique d'Europe et la quatrieme mondiale. Berlin est l'une des capitales culturelles les plus dynamiques du monde. L'Allemagne accueille des millions d'immigres qui contribuent a sa richesse.",
        figure: { name: "Angela Merkel", emoji: '🌟', desc: "Chanceliere de 2005 a 2021, elle est la femme la plus puissante du monde selon Forbes pendant 16 ans. Physicienne de formation, elle a gouverne l'Allemagne et l'Europe avec calme et methode." },
        cards: [
          { emoji: '🚗', title: "L'Industrie Allemande", text: "L'Allemagne est le 3e exportateur mondial. Ses voitures (BMW, Mercedes, Volkswagen, Porsche), ses machines et ses produits chimiques sont vendus dans le monde entier. 'Made in Germany' est un gage de qualite.", fact: "1 voiture sur 5 vendue dans le monde est une marque allemande ! L'industrie automobile emploie 800 000 personnes en Allemagne." },
          { emoji: '⚽', title: "Le Football Allemand", text: "L'Allemagne est l'une des nations les plus titrees en football : 4 fois championne du monde (1954, 1974, 1990, 2014). La Bundesliga est l'une des meilleures ligues du monde.", fact: "L'Allemagne est le seul pays a avoir gagne la Coupe du Monde en Europe et en Amerique du Sud !" },
          { emoji: '🌍', title: "L'Allemagne et les Immigres", text: "L'Allemagne accueille la plus grande communaute turque hors de Turquie. Des millions de familles africaines, arabes et europeennes y vivent. Mesut Ozil, Sami Khedira... la diversite fait la force de l'Allemagne.", fact: "En 2015, l'Allemagne a accueilli 1 million de refugies syriens. Angela Merkel a dit : 'Wir schaffen das' (On va y arriver) !" },
        ],
        quiz: [
          { q: "Combien de fois l'Allemagne a-t-elle gagne la Coupe du Monde ?", correct: "4 fois", wrong1: "2 fois", wrong2: "7 fois", emoji: '⚽' },
          { q: "Que signifie 'Made in Germany' ?", correct: "Fabrique en Allemagne avec qualite", wrong1: "Fabrique dans l'armee", wrong2: "Produit chimique", emoji: '🏭' },
          { q: "Que disait Angela Merkel sur les refugies ?", correct: "Wir schaffen das — On va y arriver", wrong1: "Nein — Non", wrong2: "Deutschland uber alles", emoji: '🌍' },
        ]
      },
    ]
  },

  // ════════════════════════════════════════════════════════════════════
  // ASIE
  // ════════════════════════════════════════════════════════════════════

  JP: {
    name: 'Japon', flag: '🇯🇵', region: 'asia',
    color: '#B71C1C', dark: '#7f1313', bg: '#FFF0F0',
    hero: { emoji: '👧🏻', name: 'Yuki', age: 7 },
    tagline: "Des samourai a la technologie",
    chapters: [
      {
        id: 'jp_ancient', era: 'Avant 600', title: "Le Japon Ancien",
        subtitle: "Les Jomon, les Yayoi et les premiers clans",
        emoji: '⛩️', color: '#5D4037', light: '#EFEBE9',
        intro: "Le Japon est habite depuis 30 000 ans. Les premiers Japonais (Jomon) etaient des chasseurs-cueilleurs. Vers 300 av. J.-C., un nouveau peuple (Yayoi) arrive et apporte la riziculture. Ces peuples melangent leurs cultures pour creer la civilisation japonaise.",
        figure: { name: "La Deesse Amaterasu", emoji: '☀️', desc: "Dans la mythologie japonaise, Amaterasu est la deesse du soleil et l'ancetre de la famille imperiale. Les Japonais considerent leur empereur comme son descendant." },
        cards: [
          { emoji: '🍶', title: "Le Riz et la Riziculture", text: "Vers 300 av. J.-C., les Yayoi apportent la culture du riz en paddies (champs inondés). Cette revolution agricole permet de nourrir des populations bien plus grandes.", fact: "Le Japon mange du riz depuis 2300 ans ! Le mot japonais pour 'repas' (gohan) signifie aussi 'riz cuit'." },
          { emoji: '⛩️', title: "Le Shinto", text: "Le Shinto est la religion originale du Japon. Elle voit des esprits (kami) dans tous les elements de la nature : les arbres, les montagnes, les rivieres. Les sanctuaires shinto sont encore visites par des millions de Japonais.", fact: "Il y a 80 000 sanctuaires shinto au Japon ! Plus que de supermarchés dans beaucoup de pays." },
          { emoji: '🏯', title: "Les Premiers Clans", text: "Le Japon est d'abord divise en clans qui se font la guerre. Le clan Yamato s'impose progressivement et fonde la dynastie imperiale qui existe encore aujourd'hui — la plus ancienne famille royale du monde.", fact: "La famille imperiale japonaise gouverne depuis 2600 ans sans interruption. L'actuel empereur Naruhito est monte sur le Trone du Chrysantheme en 2019." },
        ],
        quiz: [
          { q: "Quel peuple a apporte la riziculture au Japon ?", correct: "Les Yayoi", wrong1: "Les Jomon", wrong2: "Les Samourai", emoji: '🍶' },
          { q: "Comment appelle-t-on les esprits de la nature dans le Shinto ?", correct: "Les kami", wrong1: "Les ninja", wrong2: "Les shogun", emoji: '⛩️' },
          { q: "Depuis combien d'ans la famille imperiale japonaise gouverne-t-elle ?", correct: "2600 ans", wrong1: "100 ans", wrong2: "500 ans", emoji: '👑' },
        ]
      },
      {
        id: 'jp_samurai', era: '1185 — 1868', title: "L'Ere des Samourai",
        subtitle: "Bushido, Shogun et Katana",
        emoji: '⚔️', color: '#B71C1C', light: '#FFEBEE',
        intro: "A partir de 1185, le Japon est gouverne non par l'Empereur mais par les Shogun — des militaires qui detiennent le vrai pouvoir. L'ere des samourai dure 700 ans. Ces guerriers suivent un code d'honneur strict (Bushido) et sont les maitres du combat.",
        figure: { name: "Miyamoto Musashi", emoji: '⚔️', desc: "Le plus grand samourai de l'histoire, il n'a jamais perdu un duel. Il a ecrit 'Le Livre des Cinq Anneaux', un traite de strategie encore enseigne dans les ecoles de gestion aujourd'hui." },
        cards: [
          { emoji: '⚔️', title: "Les Samourai", text: "Les samourai sont les guerriers nobles du Japon. Ils servent leur seigneur (daimyo) avec une fidelite absolue. Leur arme principale, le katana (sabre), est consideree comme une oeuvre d'art.", fact: "Un bon katana etait forge pendant 15 jours et pouvait couper une balle en deux ! Les meilleures lames japonaises sont considerees comme les meilleures au monde." },
          { emoji: '📜', title: "Le Bushido", text: "Le Bushido est le 'code du guerrier' samourai. Il valorise l'honneur, le courage, la loyaute, la droiture et la maitrise de soi. Plutot que de se rendre ou d'etre capture, un samourai preferait se suicider (seppuku).", fact: "Le Bushido influence encore la culture d'entreprise japonaise aujourd'hui ! L'honneur et la loyaute a son employeur sont des valeurs tres respectees." },
          { emoji: '🏯', title: "Les Chateaux", text: "Les seigneurs japonais construisent des chateaux spectaculaires : Himeji, Matsumoto, Osaka. Ces forteresses etaient a la fois des centres militaires et des symboles de puissance.", fact: "Le Chateau de Himeji est surnomme 'le Chateau du Heron Blanc' a cause de sa couleur blanche immaculee. Il date de 1346 et est intact !" },
          { emoji: '🌸', title: "La Philosophie Zen", text: "Le bouddhisme Zen arrive de Chine et devient la philosophie des samourai. La meditation, le jardin de pierres, la ceremonie du the, le haiku (poesie) — le Zen influence toute la culture japonaise.", fact: "La ceremonie du the japonaise (chado) peut durer 4 heures ! Chaque geste est precise et symbolique." },
        ],
        quiz: [
          { q: "Qu'est-ce que le Bushido ?", correct: "Le code d'honneur des samourai", wrong1: "Une danse traditionnelle", wrong2: "Un type de riz japonais", emoji: '📜' },
          { q: "Comment s'appelle le sabre des samourai ?", correct: "Le katana", wrong1: "Le ninja", wrong2: "Le dojo", emoji: '⚔️' },
          { q: "Que signifie le mot 'Shogun' ?", correct: "Grand general", wrong1: "Roi du peuple", wrong2: "Maitre du sabre", emoji: '👑' },
        ]
      },
      {
        id: 'jp_meiji', era: '1868 — 1945', title: "La Modernisation",
        subtitle: "De la renovation Meiji a la guerre",
        emoji: '🏭', color: '#1565C0', light: '#E3F2FD',
        intro: "En 1853, des navires de guerre americains arrivent au Japon et forcent le pays a s'ouvrir au monde. Le Japon comprend qu'il doit se moderniser ou etre colonise. La revolution Meiji (1868) transforme le pays en quelques decennies, et le Japon devient la premiere puissance asiatique moderne.",
        figure: { name: "L'Empereur Meiji", emoji: '🏭', desc: "Sous son regne (1868-1912), le Japon se transforme en une puissance industrielle et militaire moderne. Il adopte les technologies occidentales tout en preservant la culture japonaise." },
        cards: [
          { emoji: '🏭', title: "La Revolution Meiji", text: "En 1868, le pouvoir des shogun est aboli et l'Empereur reprend le pouvoir. Le Japon envoie des milliers de jeunes etudier en Europe et aux USA. En 30 ans, il se dote d'une industrie, d'une armee et d'une marine modernes.", fact: "Le Japon est le seul pays au monde a avoir reussi une modernisation industrielle complete en quelques decennies, sans etre colonise !" },
          { emoji: '⚔️', title: "La Victoire contre la Russie", text: "En 1905, le Japon bat la Russie — une puissance europeenne — dans la guerre russo-japonaise. C'est la premiere fois depuis l'Empire mongol qu'une puissance asiatique bat une europeenne.", fact: "La victoire du Japon contre la Russie a inspire les mouvements nationalistes dans toute l'Asie et l'Afrique — si le Japon peut battre l'Europe, nous aussi !" },
          { emoji: '💥', title: "La Seconde Guerre Mondiale", text: "En 1941, le Japon attaque Pearl Harbor (USA) et entre dans la guerre. En 1945, les Etats-Unis larguent deux bombes atomiques sur Hiroshima et Nagasaki. Le Japon se rend le 15 aout 1945.", fact: "Les bombes d'Hiroshima et Nagasaki ont tue 200 000 personnes en quelques secondes. Ce sont les seules bombes atomiques jamais utilisees en guerre." },
        ],
        quiz: [
          { q: "Qu'est-ce que la revolution Meiji ?", correct: "La modernisation rapide du Japon", wrong1: "Une guerre civile japonaise", wrong2: "L'invasion du Japon par l'Europe", emoji: '🏭' },
          { q: "Contre quelle puissance le Japon a-t-il gagne en 1905 ?", correct: "La Russie", wrong1: "La Chine", wrong2: "Les Etats-Unis", emoji: '⚔️' },
          { q: "Combien de personnes ont ete tuees par les bombes atomiques ?", correct: "200 000 personnes", wrong1: "1000 personnes", wrong2: "1 million", emoji: '💥' },
        ]
      },
      {
        id: 'jp_postwar', era: '1945 — 1990', title: "Le Miracle Economique",
        subtitle: "De la defaite a la puissance",
        emoji: '📺', color: '#1B5E20', light: '#E8F5E9',
        intro: "Apres leur defaite en 1945, les Japonais reconstruisent leur pays avec une energie incroyable. En 30 ans, le Japon passe d'un pays en ruines a la deuxieme economie mondiale. Toyota, Sony, Honda, Panasonic... le Japon invente l'ere de l'electronique.",
        figure: { name: "Akio Morita (Sony)", emoji: '📺', desc: "Co-fondateur de Sony en 1946, il a revolutionne le monde avec le transistor radio, la cassette audio, le Walkman, le CD et le Playstation. Sony vient de 'Sonny' et du latin 'sonus' (son)." },
        cards: [
          { emoji: '🚗', title: "Toyota et l'Industrie", text: "Toyota invente le 'toyotisme' — un systeme de production revolutionnaire qui elimine le gaspillage et ameliore la qualite. Ce systeme est copie par toutes les usines du monde.", fact: "Toyota est aujourd'hui le plus grand constructeur automobile du monde. Sa methode 'juste-a-temps' est enseignee dans toutes les ecoles de gestion !" },
          { emoji: '🎮', title: "Les Jeux Video", text: "Nintendo (Mario, Zelda), Sega (Sonic), Sony (PlayStation)... le Japon a invente l'industrie du jeu video. En 1985, Super Mario Bros sauve l'industrie mondiale du jeu video apres son effondrement.", fact: "Shigeru Miyamoto, le createur de Mario, a ete inspire par les promenades dans les collines autour de Kyoto ! Il voulait creer une experience d'exploration." },
          { emoji: '📺', title: "La Culture Pop Japonaise", text: "Les mangas (BD), les animes (dessins animes), les jeux video et la J-Pop japonaises ont conquis le monde entier. Dragon Ball Z, Naruto, One Piece, Studio Ghibli... la culture japonaise est partout.", fact: "Le film 'Voyage de Chihiro' de Studio Ghibli (2001) a ete le plus vu au monde en 2021, battant Avengers et tous les films Marvel !" },
        ],
        quiz: [
          { q: "Qu'a invente Toyota comme methode de production ?", correct: "Le 'juste-a-temps' sans gaspillage", wrong1: "La chaine d'assemblage", wrong2: "Le robot industriel", emoji: '🚗' },
          { q: "Quel jeu video a sauve l'industrie en 1985 ?", correct: "Super Mario Bros", wrong1: "Pac-Man", wrong2: "Tetris", emoji: '🎮' },
          { q: "Quel est le film de Studio Ghibli le plus connu ?", correct: "Le Voyage de Chihiro", wrong1: "Akira", wrong2: "Dragon Ball", emoji: '🎬' },
        ]
      },
      {
        id: 'jp_today', era: "Aujourd'hui", title: "Le Japon Moderne",
        subtitle: "Tradition et futur",
        emoji: '🗼', color: '#B71C1C', light: '#FFF0F0',
        intro: "Aujourd'hui le Japon est la 3e economie mondiale. Tokyo est la plus grande metropole de la planete avec 37 millions d'habitants. Le Japon allie comme aucun autre pays la tradition la plus ancienne et la technologie la plus avancee.",
        figure: { name: "Hayao Miyazaki", emoji: '🌸', desc: "Realisateur de Studio Ghibli, il a cree des chefs-d'oeuvre comme 'Mon Voisin Totoro', 'Princesse Mononoke' et 'Le Voyage de Chihiro'. Ses films sont aimes dans le monde entier." },
        cards: [
          { emoji: '🚅', title: "Le Shinkansen", text: "Le train a grande vitesse japonais (Shinkansen) circule depuis 1964 a 320 km/h. En 60 ans, il n'a jamais eu un seul mort ! Sa ponctualite moyenne : 1 minute de retard.", fact: "Si le Shinkansen arrive avec plus de 60 secondes de retard, le conducteur s'excuse publiquement ! En France, un train est 'en retard' apres 5 minutes..." },
          { emoji: '🌸', title: "Le Sakura et les Traditions", text: "Chaque printemps, les Japonais font des pique-niques sous les cerisiers en fleur (hanami). Cette tradition de 1000 ans rassemble familles et amis pour celebrer la beaute ephemere.", fact: "La saison des cerisiers ne dure que 2 semaines ! Les Japonais suivent la 'frontiere de la floraison' qui remonte lentement du sud vers le nord chaque annee." },
          { emoji: '🤖', title: "La Robotique", text: "Le Japon a le plus grand nombre de robots industriels au monde. Des robots soignent les personnes agees, des robots servent dans les restaurants, et Honda developpe des robots humanoïdes depuis 30 ans.", fact: "Le Japon a 300 robots pour 10 000 ouvriers — le ratio le plus eleve du monde. Certains usines Toyota travaillent presque sans humains !" },
        ],
        quiz: [
          { q: "Quel est le retard moyen du Shinkansen ?", correct: "1 minute", wrong1: "30 minutes", wrong2: "Il n'est jamais en retard", emoji: '🚅' },
          { q: "Comment appelle-t-on les pique-niques sous les cerisiers ?", correct: "Hanami", wrong1: "Sushi", wrong2: "Haiku", emoji: '🌸' },
          { q: "Combien de robots industriels y a-t-il pour 10 000 ouvriers au Japon ?", correct: "300 robots", wrong1: "10 robots", wrong2: "1000 robots", emoji: '🤖' },
        ]
      },
    ]
  },

  CN: {
    name: 'Chine', flag: '🇨🇳', region: 'asia',
    color: '#B71C1C', dark: '#7f1313', bg: '#FFF0F0',
    hero: { emoji: '👦🏻', name: 'Wei', age: 8 },
    tagline: "5000 ans de civilisation",
    chapters: [
      {
        id: 'cn_ancient', era: '3000 — 221 av. J.-C.', title: "Les Dynasties Anciennes",
        subtitle: "Xia, Shang et Zhou",
        emoji: '🏯', color: '#E65100', light: '#FFF3E0',
        intro: "La Chine est l'une des civilisations les plus anciennes du monde. Il y a 5000 ans, les premiers empereurs fondent les bases de la civilisation chinoise : l'ecriture, le bronze, le jade, les rituels. Pendant 3000 ans, des dynasties se succedent, creant peu a peu la grande culture chinoise.",
        figure: { name: "Confucius (551-479 av. J.-C.)", emoji: '📚', desc: "Philosophe et penseur, ses enseignements sur la famille, le respect et la societe influencent encore 2 milliards de personnes aujourd'hui. Ses Analectes sont lus dans le monde entier." },
        cards: [
          { emoji: '📝', title: "L'Invention de l'Ecriture", text: "Vers 1200 av. J.-C., les Chinois de la Dynaste Shang gravent des caracteres sur des os pour pratiquer la divination. Ces 'os oraculaires' sont les premiers exemples de l'ecriture chinoise.", fact: "L'ecriture chinoise est la seule ecriture ancienne encore utilisee de facon continue depuis 3000 ans ! Les Chinois peuvent encore lire des textes de 2000 ans sans trop de difficulte." },
          { emoji: '📚', title: "Confucius et ses Enseignements", text: "Confucius enseigne que la societe est harmoniuese quand chacun respecte son role : le fils respecte son pere, l'eleve son maitre, le sujet son roi. Cette philosophie structure la societe chinoise depuis 2500 ans.", fact: "Confucius disait : 'Ne fais pas aux autres ce que tu ne voudrais pas qu'on te fasse.' Cette 'Regle d'Or' est presente dans toutes les religions du monde !" },
          { emoji: '🐉', title: "Le Dragon Chinois", text: "Le dragon chinois est le symbole de l'empire. Contrairement aux dragons occidentaux (mauvais), le dragon chinois est bienveillant — il apporte la pluie, la fertilite et la chance.", fact: "L'Empereur de Chine etait appele 'le Fils du Dragon'. Son trone etait le 'Trone du Dragon'. Ses vetements etaient brodes de dragons !" },
        ],
        quiz: [
          { q: "Quand l'ecriture chinoise a-t-elle ete inventee ?", correct: "Vers 1200 av. J.-C.", wrong1: "En 2000 ap. J.-C.", wrong2: "Il y a 100 ans", emoji: '📝' },
          { q: "Que signifie la 'Regle d'Or' de Confucius ?", correct: "Ne fais pas aux autres ce que tu ne voudrais pas", wrong1: "L'or est plus important que tout", wrong2: "L'Empereur a toujours raison", emoji: '📚' },
          { q: "Que symbolise le dragon en Chine ?", correct: "La chance et la prosperite", wrong1: "Le danger et le mal", wrong2: "La guerre", emoji: '🐉' },
        ]
      },
      {
        id: 'cn_empire', era: '221 av. J.-C. — 907 ap. J.-C.', title: "Le Premier Empire",
        subtitle: "Qin Shi Huang et la Grande Muraille",
        emoji: '🏯', color: '#1565C0', light: '#E3F2FD',
        intro: "En 221 av. J.-C., Qin Shi Huang unifie pour la premiere fois tous les royaumes chinois en un seul empire. Il est le premier 'Fils du Ciel' — le premier vrai Empereur de Chine. Il construit la Grande Muraille, standardise les poids, les mesures et l'ecriture.",
        figure: { name: "Qin Shi Huang", emoji: '👑', desc: "Premier Empereur de Chine (221-210 av. J.-C.), il unifie le pays, construit la Grande Muraille et se fait enterrer avec 8000 soldats en terre cuite pour le proteger dans l'au-dela." },
        cards: [
          { emoji: '🧱', title: "La Grande Muraille", text: "La Grande Muraille de Chine est construite sur 2000 ans par plusieurs dynasties. Elle s'etend sur 21 196 km — plus que la distance de Paris a New York et retour !", fact: "On dit qu'on peut voir la Grande Muraille depuis l'espace — c'est faux ! Elle est trop etroite. Mais elle reste la plus grande construction humaine de l'histoire." },
          { emoji: '🪆', title: "L'Armee de Terre Cuite", text: "En 1974, des paysans chinois decouvrent par hasard 8000 soldats en terre cuite enterres avec le premier Empereur Qin Shi Huang. Chaque soldat a un visage unique — c'est peut-etre des portraits reels.", fact: "On a ouvert que 3 des 4 fosses de l'armee de terre cuite. La 4e fosse n'est pas encore fouilee — les archeologists attendent des technologies meilleures pour ne pas l'abimer !" },
          { emoji: '🧭', title: "Les Grandes Inventions", text: "La Chine invente la boussole (9e siecle), la poudre a canon, l'imprimerie (440 ans avant Gutenberg !), le papier, la soie, la porcelaine. Ces inventions changent l'histoire du monde.", fact: "La poudre a canon a ete inventee par des alchimistes chinois qui cherchaient la formule de l'immortalite. Ils ont trouve quelque chose de tres different !" },
        ],
        quiz: [
          { q: "Quelle est la longueur de la Grande Muraille de Chine ?", correct: "21 196 km", wrong1: "1 km", wrong2: "100 km", emoji: '🧱' },
          { q: "Combien de soldats en terre cuite ont ete trouves ?", correct: "8000 soldats", wrong1: "10 soldats", wrong2: "1 million", emoji: '🪆' },
          { q: "Quelle invention chinoise a 440 ans d'avance sur Gutenberg ?", correct: "L'imprimerie", wrong1: "La boussole", wrong2: "La soie", emoji: '📰' },
        ]
      },
      {
        id: 'cn_silk', era: '600 — 1400', title: "La Route de la Soie",
        subtitle: "Tang, Song et les echanges mondiaux",
        emoji: '🐫', color: '#1B5E20', light: '#E8F5E9',
        intro: "Pendant les dynasties Tang et Song, la Chine est la premiere puissance mondiale. La Route de la Soie relie la Chine a l'Europe et permet des echanges commerciaux et culturels fantastiques. Les marchands arabes, persans, indiens et europeens convergent vers les villes chinoises.",
        figure: { name: "Marco Polo", emoji: '🗺️', desc: "Marchand venitien, il voyage de 1271 a 1295 jusqu'en Chine a la cour de Kublai Khan (petit-fils de Gengis Khan). Son livre 'Le Devisement du Monde' fait decouvrir la Chine aux Europeens." },
        cards: [
          { emoji: '🐫', title: "La Route de la Soie", text: "La Route de la Soie est un reseau de routes commerciales qui relient la Chine a Rome, en passant par la Perse et l'Inde. La soie, les epices, le papier, la porcelaine voyagent d'est en ouest. Les idees aussi.", fact: "Ce n'est pas qu'une seule route ! C'est un reseau de routes terrestres et maritimes de 6 400 km. La plus grande infrastructure commerciale de l'histoire ancienne." },
          { emoji: '🎆', title: "La Poudre a Canon", text: "La poudre a canon est inventee en Chine vers le 9e siecle. D'abord utilisee pour des feux d'artifice lors des celebrations, elle devient une arme revolutionnaire qui change les guerres du monde entier.", fact: "Le premier feu d'artifice etait fait pour effrayer les mauvais esprits ! Les Chinois pensaient que le bruit fort chassait les esprits malefiques." },
          { emoji: '🗺️', title: "Marco Polo en Chine", text: "Marco Polo passe 17 ans en Chine a la cour de Kublai Khan. Il decouvre la grandeur des villes chinoises, le papier-monnaie, les nouilles (ancetre des pates !), la poudre a canon.", fact: "Les pates italiennes viennent-elles de Chine ? Peut-etre ! Des nouilles chinoises existaient 4000 ans avant les pates italiennes. Marco Polo les a peut-etre rapportees !" },
        ],
        quiz: [
          { q: "Qu'est-ce que la Route de la Soie ?", correct: "Un reseau commercial entre la Chine et l'Europe", wrong1: "Une route faite en soie", wrong2: "Un chemin de fer ancien", emoji: '🐫' },
          { q: "Pour quoi utilisait-on la poudre a canon au debut en Chine ?", correct: "Pour les feux d'artifice", wrong1: "Pour la guerre", wrong2: "Pour la cuisine", emoji: '🎆' },
          { q: "Combien d'annees Marco Polo a-t-il passe en Chine ?", correct: "17 ans", wrong1: "1 an", wrong2: "50 ans", emoji: '🗺️' },
        ]
      },
      {
        id: 'cn_modern', era: '1839 — 1949', title: "La Chine Moderne",
        subtitle: "Des guerres de l'opium a Mao",
        emoji: '⚔️', color: '#7B1FA2', light: '#F3E5F5',
        intro: "Au 19e siecle, la Chine s'affaiblit et subit l'humiliation des puissances etrangeres : l'Angleterre lui impose l'opium, le Japon lui vole la Coree et Taiwan. En 1911, l'Empire tombe. Des decennies de guerre civile et d'invasion japonaise suivent avant que Mao Zedong fonde la Republique Populaire en 1949.",
        figure: { name: "Sun Yat-sen", emoji: '🌹', desc: "Medecin et revolutionnaire, il renverse la dynastye Qing en 1911 et fonde la Republique de Chine. Il est venere comme le 'Pere de la Nation' aussi bien en Chine communiste qu'a Taiwan." },
        cards: [
          { emoji: '😷', title: "Les Guerres de l'Opium", text: "L'Angleterre vendait de l'opium (une drogue) aux Chinois pour equilibrer son commerce. L'Empereur interdit l'opium. Les Anglais declarent la guerre (1839). La Chine perd et doit ceder Hong Kong.", fact: "Hong Kong est reste britannique de 1842 a 1997 — 155 ans ! Il est revenu a la Chine en 1997 lors d'une ceremonie historique devant le monde entier." },
          { emoji: '🌹', title: "La Chute de l'Empire", text: "En 1911, la revolution dirigee par Sun Yat-sen renverse le dernier Empereur, Puyi, qui n'avait que 5 ans. La Republique de Chine est fondee. Puyi continuera de vivre dans la Cite Interdite jusqu'en 1924.", fact: "Le dernier Empereur Puyi a eu une vie incroyable : Empereur a 2 ans, detrone a 5 ans, collaborateur des Japonais, prisonnier des communistes, puis guide touristique. Le film 'Le Dernier Empereur' raconte son histoire." },
          { emoji: '🔴', title: "La Revolution Communiste", text: "Apres des annees de guerre civile et d'occupation japonaise, Mao Zedong et les communistes battent les nationalistes en 1949. Le 1er octobre 1949, Mao proclame la Republique Populaire de Chine depuis Pekin.", fact: "Mao a dit : 'La revolution n'est pas un diner de gala.' Sa revolution a tue entre 15 et 55 millions de personnes — les historiens discutent encore du chiffre." },
        ],
        quiz: [
          { q: "Pourquoi l'Angleterre a-t-elle fait la guerre a la Chine ?", correct: "Pour imposer la vente d'opium", wrong1: "Pour prendre Hong Kong", wrong2: "Pour voler la soie chinoise", emoji: '😷' },
          { q: "Quel age avait le dernier Empereur Puyi quand il est monte sur le trone ?", correct: "2 ans", wrong1: "18 ans", wrong2: "30 ans", emoji: '👑' },
          { q: "Quand Mao Zedong a-t-il fonde la Republique Populaire ?", correct: "1er octobre 1949", wrong1: "1er octobre 1911", wrong2: "1er mai 1945", emoji: '🔴' },
        ]
      },
      {
        id: 'cn_today', era: "Aujourd'hui", title: "La Chine d'Aujourd'hui",
        subtitle: "L'Atelier du Monde",
        emoji: '🌟', color: '#B71C1C', light: '#FFF0F0',
        intro: "Aujourd'hui la Chine est la deuxieme economie mondiale et va bientot devenir la premiere. En 40 ans, elle a tire 800 millions de personnes hors de la pauvrete — un miracle sans precedent dans l'histoire. Elle investit massivement en Afrique, en Asie et partout dans le monde.",
        figure: { name: "Jack Ma", emoji: '💻', desc: "Fondateur d'Alibaba, le plus grand site de commerce electronique du monde. Ancien professeur d'anglais, il a ete refuse 30 fois avant de fonder sa premiere entreprise." },
        cards: [
          { emoji: '🏗️', title: "Le Miracle Economique", text: "En 1980, la Chine etait un pays pauvre. En 2020, elle est la deuxieme economie mondiale. Elle a construit en 40 ans plus de routes, de trains, d'aeroports et de villes que n'importe quel autre pays dans l'histoire.", fact: "La Chine a consomme plus de ciment entre 2011 et 2013 qu'en les Etats-Unis en tout le 20e siecle !" },
          { emoji: '🚅', title: "Les Trains a Grande Vitesse", text: "La Chine a le plus grand reseau de trains a grande vitesse du monde — 40 000 km ! Plus que tous les autres pays reunis. Des villes de 10 millions d'habitants sont reliees en 2 heures.", fact: "La Chine a construit son premier train a grande vitesse en 2008 et en 2023 avait 40 000 km de reseau. Il a fallu 50 ans a l'Europe pour en construire 10 000 km !" },
          { emoji: '🌍', title: "La Chine en Afrique", text: "La Chine investit enormement en Afrique : routes, ports, chemins de fer, stades, universites. Des centaines de milliers de Chinois vivent en Afrique. Les rapports entre la Chine et l'Afrique changent le continent.", fact: "La Chine a finance et construit la ligne de chemin de fer reliant Djibouti a Addis-Abeba (Ethiopie) — la premiere d'Afrique de l'Est moderne !" },
        ],
        quiz: [
          { q: "Combien de personnes la Chine a-t-elle sorties de la pauvrete en 40 ans ?", correct: "800 millions de personnes", wrong1: "1000 personnes", wrong2: "10 millions", emoji: '🏗️' },
          { q: "Quelle est la longueur du reseau ferroviaire a grande vitesse chinois ?", correct: "40 000 km", wrong1: "100 km", wrong2: "5 000 km", emoji: '🚅' },
          { q: "Qu'est-ce qu'Alibaba ?", correct: "Le plus grand site de commerce electronique", wrong1: "Un conte des Mille et Une Nuits", wrong2: "Une marque de voitures chinoises", emoji: '💻' },
        ]
      },
    ]
  },

  IN: {
    name: 'Inde', flag: '🇮🇳', region: 'asia',
    color: '#E65100', dark: '#b74200', bg: '#FFF3E0',
    hero: { emoji: '👧🏽', name: 'Priya', age: 8 },
    tagline: "De la Civilisation de l'Indus a la plus grande democratie",
    chapters: [
      {
        id: 'in_indus', era: '3300 — 1300 av. J.-C.', title: "La Civilisation de l'Indus",
        subtitle: "Les premieres grandes villes du monde",
        emoji: '🏛️', color: '#5D4037', light: '#EFEBE9',
        intro: "Il y a 5000 ans, sur les rives du fleuve Indus (Pakistan et Inde actuels), nait l'une des premieres grandes civilisations du monde. Les villes de Mohenjo-Daro et Harappa ont des rues quadrillees, des egouts, des bains publics — plus avancees que Rome 2000 ans plus tard !",
        figure: { name: "Les Batisseurs de l'Indus", emoji: '🏛️', desc: "On ne sait toujours pas qui gouvernait ces villes ! Pas de palais de roi trouve, pas de temple central. Peut-etre une republique ? Le mystere de la civilisation de l'Indus fascine encore les archeologues." },
        cards: [
          { emoji: '🏛️', title: "Mohenjo-Daro", text: "Il y a 4500 ans, Mohenjo-Daro avait 40 000 habitants, des rues droites, des maisons en briques cuites, des egouts souterrains et un grand bain public central. Aucune ville europeenne n'etait aussi avancee a cette epoque.", fact: "Les briques de Mohenjo-Daro ont toutes exactement les memes dimensions — une standardisation incroyable pour il y a 4500 ans !" },
          { emoji: '🐄', title: "La Sacralisation de la Vache", text: "Dans la civilisation de l'Indus, on trouve des sceaux montrant des tauraux. La vache est sacree dans l'hindouisme depuis des millenaires. Le zebo (bovin a bosse) est l'ancetre de toutes les races bovines d'Afrique et d'Asie.", fact: "L'Inde a la plus grande population bovine au monde : 300 millions de vaches ! Elles se promment librement dans les rues des villes." },
          { emoji: '🧘', title: "Le Yoga", text: "Des sceaux de la civilisation de l'Indus montrent des figures en position de meditation — les premières representations connues du yoga. Cette pratique a 5000 ans !", fact: "Le yoga est pratique par 300 millions de personnes dans le monde aujourd'hui. Il est parti d'un petit village de l'Indus il y a 5000 ans !" },
        ],
        quiz: [
          { q: "Il y a combien d'habitants avait Mohenjo-Daro ?", correct: "40 000 habitants", wrong1: "100 personnes", wrong2: "1 million", emoji: '🏛️' },
          { q: "Depuis combien d'annees le yoga est-il pratique ?", correct: "5000 ans", wrong1: "100 ans", wrong2: "200 ans", emoji: '🧘' },
          { q: "Combien de vaches y a-t-il en Inde ?", correct: "300 millions", wrong1: "10 vaches", wrong2: "1 milliard", emoji: '🐄' },
        ]
      },
      {
        id: 'in_vedic', era: '1500 — 300 av. J.-C.', title: "La Periode Vedique",
        subtitle: "Hindouisme, Bouddhisme et l'Empire Maurya",
        emoji: '🕉️', color: '#7B1FA2', light: '#F3E5F5',
        intro: "Apres la civilisation de l'Indus, des peuples indo-europeens (Aryens) arrivent en Inde et apportent le sanscrit et les premiers textes sacres (Vedas). Ces textes fondent l'hindouisme. Puis Siddhartha Gautama fonde le bouddhisme. L'Empire Maurya (322-185 av. J.-C.) unifie l'Inde sous Ashoka.",
        figure: { name: "Ashoka le Grand", emoji: '☮️', desc: "Roi de l'Empire Maurya, apres une bataille terrible ou 100 000 personnes meurent, il se convertit au bouddhisme et gouverne avec la non-violence. Il envoie des missionnaires bouddhistes dans tout l'Asie." },
        cards: [
          { emoji: '🕉️', title: "L'Hindouisme", text: "L'hindouisme est la religion la plus ancienne du monde encore pratiquee activement. Elle n'a pas un seul fondateur mais s'est developpee sur 5000 ans. Elle croit en la reincarnation, le karma et des millions de dieux.", fact: "L'hindouisme a 330 millions de dieux ! Mais la plupart des hindous en venerent surtout 3 : Brahma (createur), Vishnu (protecteur), Shiva (destructeur)." },
          { emoji: '☯️', title: "Siddhartha Gautama (le Bouddha)", text: "Vers 500 av. J.-C., un prince indien nomme Siddhartha quitte son palais, voit la souffrance du monde, et cherche l'illumination. Il la trouve sous un arbre Bodhi. Il enseigne la fin de la souffrance par la meditation.", fact: "Le bouddhisme est la 4e religion du monde avec 500 millions de pratiquants. Il n'est plus majoritaire en Inde (son pays d'origine !) mais est la premiere religion en Asie du Sud-Est." },
          { emoji: '☮️', title: "Ashoka le Grand", text: "Apres avoir conquis un territoire immense, Ashoka est horrifie par les massacres de guerre. Il se convertit au bouddhisme et devient un roi de la paix et de la non-violence. Ses edits sont graves dans des piliers de pierre.", fact: "Le symbole sur le drapeau indien — la Roue d'Ashoka — vient des piliers d'Ashoka. Elle symbolise le dharma (la loi morale) !" },
        ],
        quiz: [
          { q: "Combien de dieux l'hindouisme a-t-il ?", correct: "330 millions", wrong1: "1 seul", wrong2: "12", emoji: '🕉️' },
          { q: "Sous quel arbre Siddhartha a-t-il trouve l'illumination ?", correct: "Un arbre Bodhi", wrong1: "Un bananier", wrong2: "Un manguier", emoji: '☯️' },
          { q: "Que symbolise la Roue d'Ashoka sur le drapeau indien ?", correct: "La loi morale (dharma)", wrong1: "La force de l'armee", wrong2: "Le soleil", emoji: '☮️' },
        ]
      },
      {
        id: 'in_mogul', era: '1526 — 1857', title: "L'Empire Moghol",
        subtitle: "Akbar, Shah Jahan et le Taj Mahal",
        emoji: '🕌', color: '#1565C0', light: '#E3F2FD',
        intro: "En 1526, Babur, descendant de Tamerlan et Gengis Khan, fonde l'Empire Moghol en Inde. Pendant 300 ans, les Empereurs Moghols governent une grande partie de l'Inde. Akbar le Grand cree un empire de tolerance religieuse. Shah Jahan construit le Taj Mahal pour sa femme decedee.",
        figure: { name: "Shah Jahan", emoji: '🕌', desc: "Empereur Moghol (1628-1658), il a construit le Taj Mahal en memoire de sa femme bien-aimee Mumtaz Mahal, morte en accouchant de leur 14e enfant. Il a ete emprisonne par son propre fils." },
        cards: [
          { emoji: '🕌', title: "Le Taj Mahal", text: "Construit entre 1631 et 1653 par 20 000 ouvriers, c'est un mausolee en marbre blanc pour la femme de Shah Jahan. Le Taj Mahal change de couleur selon l'heure — rose a l'aube, blanc le jour, dore au coucher du soleil.", fact: "La legende dit que Shah Jahan a voulu construire un Taj Mahal noir de l'autre cote de la riviere pour lui-meme. Mais il a ete depose avant de pouvoir le faire." },
          { emoji: '👑', title: "Akbar le Grand", text: "Akbar (1556-1605) est le plus grand des Empereurs Moghols. Il cree un empire de tolerance : les hindous ont les memes droits que les musulmans, il invite des savants de toutes religions a sa cour.", fact: "Akbar etait analphabete ! Il ne savait pas lire ni ecrire. Mais il memorisait tout ce qu'on lui lisait et etait consideré comme l'un des esprits les plus brillants de son epoque." },
          { emoji: '🌶️', title: "La Cuisine Moghole", text: "La cuisine moghol est un melange de cuisine persane et indienne. Le biryani, le korma, les samosas, le tandoor — ces plats que le monde entier aime aujourd'hui ont ete crees ou perfectionnes dans les cuisines imperiales mogholes.", fact: "Le poulet tikka masala, plat le plus commande dans les restaurants indiens du monde, a ete invente en Ecosse par des immigres indiens dans les annees 1970 !" },
        ],
        quiz: [
          { q: "Pour qui Shah Jahan a-t-il construit le Taj Mahal ?", correct: "Pour sa femme Mumtaz Mahal", wrong1: "Pour lui-meme", wrong2: "Pour Allah", emoji: '🕌' },
          { q: "Combien d'ouvriers ont construit le Taj Mahal ?", correct: "20 000 ouvriers", wrong1: "100 ouvriers", wrong2: "1 million", emoji: '🏗️' },
          { q: "Qu'est-ce qui rendait Akbar le Grand extraordinaire ?", correct: "Sa tolerance religieuse et son intelligence", wrong1: "Sa grande taille", wrong2: "Ses conquetes militaires", emoji: '👑' },
        ]
      },
      {
        id: 'in_gandhi', era: '1857 — 1947', title: "La Lutte pour l'Independance",
        subtitle: "Gandhi et la non-violence",
        emoji: '✊', color: '#1B5E20', light: '#E8F5E9',
        intro: "Apres 300 ans de commerce, la Compagnie Britannique des Indes Orientales prend le controle politique de l'Inde au 19e siecle. En 1857, une grande revolte est ecrasee dans le sang. Mais le mouvement pour l'independance grandit, dirige par Mahatma Gandhi avec sa methode revolutionnaire : la non-violence.",
        figure: { name: "Mahatma Gandhi", emoji: '✊', desc: "Avocat, il developpe la 'satyagraha' — la resistance par la non-violence. Il mene des millions d'Indiens contre la domination britannique. Independance acquise en 1947. Assassine en 1948." },
        cards: [
          { emoji: '✊', title: "Mahatma Gandhi", text: "Gandhi invente la resistance non-violente comme arme politique. Boycot des produits britanniques, greves de la faim, marche du sel (1930) — il montre qu'on peut battre l'oppression sans armes.", fact: "La Marche du Sel de Gandhi est l'une des plus belles actions politiques de l'histoire. Il marche 380 km pour aller ramasser du sel de la mer en defi de la loi britannique !" },
          { emoji: '🧵', title: "Le Rouet (Charkha)", text: "Gandhi porte un rouet comme symbole de resistance. Il encourage les Indiens a filer leur propre coton et a porter des vetements indiens (khadi) plutot que les textiles britanniques.", fact: "Le rouet de Gandhi est au centre du premier drapeau indien ! Il a ete remplace par la Roue d'Ashoka mais l'hommage a Gandhi reste." },
          { emoji: '🕊️', title: "L'Independance de 1947", text: "Le 15 aout 1947, l'Inde devient independante. Jawaharlal Nehru prononce son discours historique 'Rencontre avec le Destin'. Mais la partition avec le Pakistan (pour les musulmans) cause des millions de morts.", fact: "La partition de l'Inde en 1947 provoque la plus grande migration humaine de l'histoire : 15 millions de personnes changent de pays en quelques mois !" },
        ],
        quiz: [
          { q: "Quelle methode Gandhi utilisait-il pour lutter ?", correct: "La non-violence", wrong1: "Les armes a feu", wrong2: "La diplomatie secrete", emoji: '✊' },
          { q: "Qu'est-ce que la Marche du Sel ?", correct: "Une marche de 380 km pour desobir a une loi britannique", wrong1: "Une recette de cuisine indienne", wrong2: "Une fete religieuse", emoji: '🧵' },
          { q: "Quand l'Inde a-t-elle obtenu son independance ?", correct: "15 aout 1947", wrong1: "1er octobre 1960", wrong2: "4 juillet 1776", emoji: '🕊️' },
        ]
      },
      {
        id: 'in_today', era: "Aujourd'hui", title: "L'Inde Moderne",
        subtitle: "La plus grande democratie du monde",
        emoji: '🇮🇳', color: '#E65100', light: '#FFF3E0',
        intro: "Aujourd'hui l'Inde est la plus grande democratie du monde avec 1,4 milliard d'habitants — et la premiere puissance demographique ayant depasse la Chine en 2023. Son economie est la 5e mondiale. Bollywood, la technologie de l'information et sa culture diverse rayonnent dans le monde.",
        figure: { name: "APJ Abdul Kalam", emoji: '🚀', desc: "Scientifique et 11e President de l'Inde (2002-2007), il a dirige le programme spatial indien. Fils pauvre d'un pecheur, il est devenu le 'Missile Man of India'. Adore par les enfants indiens." },
        cards: [
          { emoji: '💻', title: "La Silicon Valley Indienne", text: "Bangalore est la capitale technologique de l'Inde. Des millions d'ingenieurs indiens travaillent pour les plus grandes entreprises tech mondiales. Le PDG de Google (Sundar Pichai) et de Microsoft (Satya Nadella) sont indiens !", fact: "1 PDG de Fortune 500 sur 3 est d'origine indienne ! L'Inde exporte ses talents technologiques dans le monde entier." },
          { emoji: '🎬', title: "Bollywood", text: "Bollywood (Mumbai + Hollywood) produit 1500 films par an — plus que Hollywood ! Les films indiens sont regardes par 3 milliards de personnes dans le monde. La danse, la musique et les couleurs de Bollywood sont uniques.", fact: "Le terme 'Bollywood' est recent mais le cinema indien a commence en 1913 — seulement 18 ans apres les freres Lumiere !" },
          { emoji: '🚀', title: "ISRO et l'Espace", text: "En 2023, l'Inde est devenue le 4e pays a alunir sur la Lune avec la mission Chandrayaan-3. Et le premier a atteindre le pole sud lunaire ! L'agence spatiale indienne (ISRO) fait cela avec 10 fois moins de budget que la NASA.", fact: "Le budget de la mission lunaire Chandrayaan-3 etait de 75 millions de dollars. Le film 'Interstellar' a coute 165 millions de dollars a produire !" },
        ],
        quiz: [
          { q: "Quelle est la position de l'Inde parmi les democraties du monde ?", correct: "La plus grande democratie", wrong1: "La plus petite", wrong2: "La seule democratie d'Asie", emoji: '🇮🇳' },
          { q: "Que produit Bollywood par an ?", correct: "1500 films", wrong1: "10 films", wrong2: "100 films", emoji: '🎬' },
          { q: "Quel exploit l'Inde a-t-elle realise en 2023 ?", correct: "Atteindre le pole sud de la Lune", wrong1: "Aller sur Mars", wrong2: "Envoyer un homme dans l'espace", emoji: '🚀' },
        ]
      },
    ]
  },

  // ════════════════════════════════════════════════════════════════════
  // AMERIQUES
  // ════════════════════════════════════════════════════════════════════

  BR: {
    name: 'Bresil', flag: '🇧🇷', region: 'americas',
    color: '#1B5E20', dark: '#0d3510', bg: '#E8F5E9',
    hero: { emoji: '👦🏽', name: 'Gabriel', age: 8 },
    tagline: "Des Tupi a l'Amazonie moderne",
    chapters: [
      {
        id: 'br_indigenous', era: 'Avant 1500', title: "Les Peuples Indigenes",
        subtitle: "Tupi, Guarani et les gardiens de la foret",
        emoji: '🌴', color: '#2E7D32', light: '#E8F5E9',
        intro: "Avant l'arrivee des Europeens, le Bresil etait habite par entre 2 et 5 millions d'indigenes appartenant a des centaines de tribus differentes. Les Tupi vivaient sur la cote, les Guarani dans les forets, les Yanomami en Amazonie. Ces peuples avaient une connaissance profonde de la foret.",
        figure: { name: "Les Tupi-Guarani", emoji: '🌴', desc: "Les peuples Tupi-Guarani habitaient toute la cote bresilienne. Ils etaient agriculteurs, pechers et guerriers. La langue tupi est encore parlee et a donne au portugais des mots comme 'ananas', 'jaguar', 'piranha'." },
        cards: [
          { emoji: '🌴', title: "L'Amazonie", text: "L'Amazonie est la plus grande foret tropicale du monde — 5,5 millions de km2, soit presque la taille de l'Europe. Elle abrite 10% de toutes les especes vivantes de la planete.", fact: "L'Amazonie produit 20% de l'oxygene de la planete. On l'appelle 'le Poumon de la Terre'. Sans elle, la vie sur Terre ne serait pas la meme !" },
          { emoji: '🦜', title: "La Biodiversite", text: "Le Bresil est le pays le plus biodivers du monde. Il possede 10% de toutes les especes animales : jaguars, anacondas, aras, toucans, capybaras... et des milliers d'especes encore inconnues des scientifiques.", fact: "On decouvre encore une nouvelle espece en Amazonie toutes les 2 jours ! La foret est si riche qu'on ne l'a pas encore entierement etudiee." },
          { emoji: '🌿', title: "La Pharmacie Verte", text: "Les peuples indigenes connaissent des centaines de plantes medicinales. Plus de 25% de nos medicaments modernes viennent de plantes decouvertes par les indigenes d'Amazonie, dont la quinine contre le paludisme.", fact: "L'acide acetylsalicylique (aspirine) vient d'une plante utilisee par les indigenes pour les maux de tete ! La pharmacie a mis 50 ans a comprendre comment ca marchait." },
        ],
        quiz: [
          { q: "Quel pourcentage de l'oxygene l'Amazonie produit-elle ?", correct: "20%", wrong1: "1%", wrong2: "100%", emoji: '🌴' },
          { q: "Combien de nouvelles especes decouvre-t-on en Amazonie ?", correct: "Une toutes les 2 jours", wrong1: "Une par an", wrong2: "Aucune, tout est connu", emoji: '🦜' },
          { q: "Quel medicament vient de plantes indigenes d'Amazonie ?", correct: "La quinine contre le paludisme", wrong1: "Les antibiotiques", wrong2: "Le vaccin contre la grippe", emoji: '🌿' },
        ]
      },
      {
        id: 'br_colonial', era: '1500 — 1822', title: "La Colonisation Portugaise",
        subtitle: "L'arrivee de Cabral et l'esclavage",
        emoji: '⛵', color: '#7B1FA2', light: '#F3E5F5',
        intro: "En 1500, le navigateur portugais Pedro Alvares Cabral debarque au Bresil par hasard en voulant contourner l'Afrique. Les Portugais colonisent le pays et commencent a couper le bois bresil (qui donne son nom au pays) puis a cultiver la canne a sucre avec des esclaves africains.",
        figure: { name: "Zumbi dos Palmares", emoji: '✊', desc: "Leader du Quilombo dos Palmares — une communaute d'esclaves en fuite qui a vecu libre dans la foret pendant 100 ans ! Zumbi a refuse de se rendre et est mort en combattant en 1695. Il est un hero national bresilien." },
        cards: [
          { emoji: '⛵', title: "L'Arrivee de Cabral", text: "Le 22 avril 1500, Pedro Alvares Cabral debarque sur la cote bresilienne en voulant contourner l'Afrique pour aller aux Indes. Il plante une croix et revendique la terre au nom du Portugal.", fact: "Cabral a nomme le pays 'Terra da Santa Cruz' (Terre de la Sainte Croix). Ce nom a ete remplace par 'Brasil' a cause du bois braise (bois de Bresil) tres recherche !" },
          { emoji: '⚫', title: "L'Esclavage Africain", text: "Pour cultiver la canne a sucre, les Portugais importent 4 millions d'esclaves africains — le plus grand nombre de toute l'histoire des Ameriques. Les esclaves venaient du Nigeria, du Benin, de l'Angola, du Mozambique.", fact: "Le Bresil est le dernier pays des Ameriques a abolir l'esclavage — en 1888 ! La princesse Isabel signe la 'Lei Aurea' (Loi d'Or) qui libere tous les esclaves." },
          { emoji: '✊', title: "Zumbi et les Quilombos", text: "Des esclaves en fuite creaient des communautes cachees dans la foret (quilombos). Le plus grand, Palmares, avait 30 000 habitants et a survecu 100 ans avant d'etre detruit. Son leader Zumbi est mort en combattant.", fact: "Il existe encore 3000 quilombos au Bresil aujourd'hui ! Les descendants d'esclaves qui les habitent ont des droits speciaux sur leurs terres." },
        ],
        quiz: [
          { q: "En quelle annee Cabral arrive-t-il au Bresil ?", correct: "1500", wrong1: "1492", wrong2: "1600", emoji: '⛵' },
          { q: "Combien d'esclaves africains ont ete amenes au Bresil ?", correct: "4 millions", wrong1: "100 personnes", wrong2: "100 millions", emoji: '⚫' },
          { q: "Quand le Bresil a-t-il aboli l'esclavage ?", correct: "1888", wrong1: "1776", wrong2: "1945", emoji: '✊' },
        ]
      },
      {
        id: 'br_empire', era: '1822 — 1945', title: "L'Independance et la Republique",
        subtitle: "Pedro I, le caoutchouc et le cafe",
        emoji: '🌿', color: '#1B5E20', light: '#E8F5E9',
        intro: "En 1822, le prince heritier du Portugal Pedro I proclame l'independance du Bresil — et devient le premier Empereur ! Le Bresil est le seul pays d'Amerique du Sud a avoir ete un empire. Au 19e siecle, le boom du caoutchouc et du cafe font la richesse du pays.",
        figure: { name: "Dom Pedro I", emoji: '👑', desc: "Prince du Portugal exile au Bresil avec sa famille, il est pousse a rentrer au Portugal mais refuse. Le 7 septembre 1822, il crie 'Independance ou Mort !' et fonde l'Empire du Bresil." },
        cards: [
          { emoji: '👑', title: "L'Independance de 1822", text: "Le 7 septembre 1822, Pedro I crie 'Independencia ou Morte !' (Independance ou Mort) sur les rives de l'Ipiranga. Le Bresil est independant. Le 7 septembre est aujourd'hui la fete nationale.", fact: "Pedro I a abdique en faveur de son fils Pedro II en 1831. Pedro II a gouverne pendant 58 ans — le plus long regne de l'histoire bresilienne !" },
          { emoji: '🌿', title: "Le Boom du Caoutchouc", text: "A la fin du 19e siecle, l'invention du pneu rend le caoutchouc d'Amazonie vital pour le monde entier. Manaus, au milieu de la foret, devient une ville aussi riche que Paris — elle a meme un opera !", fact: "L'Opera de Manaus (1896) est construits au milieu de la jungle. Les pierres venaient d'Europe en bateau. Les riches encommerciants de caoutchouc envoyaient leur linge a laver a Paris !" },
          { emoji: '☕', title: "Le Cafe", text: "Le Bresil est le plus grand producteur de cafe au monde depuis 1840. Le cafe bresilien a transforme l'economie et finance la construction de Sao Paulo. Aujourd'hui, 40% du cafe mondial vient du Bresil.", fact: "La plante cafe vient d'Ethiopie ! Elle a voyage en Arabie, puis en Europe, puis les Portugais l'ont apportee au Bresil. Un voyage de 10 000 km pour finir dans votre tasse." },
        ],
        quiz: [
          { q: "Quelle phrase Pedro I a-t-il criee pour l'independance ?", correct: "Independance ou Mort !", wrong1: "Vive le Bresil !", wrong2: "A bas le Portugal !", emoji: '👑' },
          { q: "D'ou vient la plante cafe originellement ?", correct: "D'Ethiopie", wrong1: "Du Bresil", wrong2: "De Colombie", emoji: '☕' },
          { q: "Quelle ville au coeur de l'Amazonie a un grand opera ?", correct: "Manaus", wrong1: "Brasilia", wrong2: "Salvador", emoji: '🌿' },
        ]
      },
      {
        id: 'br_modern', era: '1945 — aujourd\'hui', title: "Le Bresil Moderne",
        subtitle: "Pelé, Carnaval et Amazonie",
        emoji: '⚽', color: '#C8600A', light: '#FFF3E0',
        intro: "Le Bresil d'aujourd'hui est la 9e economie mondiale avec 215 millions d'habitants. C'est le pays de Pelé (le plus grand footballeur de tous les temps), du Carnaval de Rio, de la samba, et de la lutte pour sauver l'Amazonie.",
        figure: { name: "Pelé", emoji: '⚽', desc: "Edson Arantes do Nascimento, dit Pelé, est le seul footballeur a avoir gagne 3 Coupes du Monde (1958, 1962, 1970). Il a marque 1283 buts dans sa carriere. Il est mort le 29 decembre 2022." },
        cards: [
          { emoji: '⚽', title: "Pelé et le Football Bresilien", text: "Le Bresil est 5 fois champion du monde (1958, 1962, 1970, 1994, 2002). Pelé, Garrincha, Zico, Ronaldo, Ronaldinho... le Bresil a produit les plus grands joueurs de l'histoire.", fact: "Pelé a marque son 1000e but en direct a la television en 1969. Il a dedié ce but 'aux enfants pauvres du Bresil' — il venait lui-meme d'une famille tres pauvre !" },
          { emoji: '🎭', title: "Le Carnaval de Rio", text: "Le Carnaval de Rio est la plus grande fete du monde. Pendant 4 jours, 6 millions de personnes dansent dans les rues. Les ecoles de samba preparent leurs costumes et choreographies pendant toute une annee.", fact: "Le costume d'une danseuse de samba peut peser 30 kg et prendre 6 mois a confectionner ! Et elle doit danser avec pendant 90 minutes !" },
          { emoji: '🌿', title: "La Lutte pour l'Amazonie", text: "Chaque annee, des milliers de km2 de foret sont brules pour creer des champs d'elevage. Des activistes comme Chico Mendes (assassine en 1988) et des peuples indigenes se battent pour proteger la foret.", fact: "La deforestation de l'Amazonie a ralenti sous certains presidents et accelere sous d'autres. La foret resiste mais son avenir depend des choix que les Bresiliens feront." },
        ],
        quiz: [
          { q: "Combien de Coupes du Monde le Bresil a-t-il gagnees ?", correct: "5 fois", wrong1: "2 fois", wrong2: "7 fois", emoji: '⚽' },
          { q: "Combien de personnes participent au Carnaval de Rio ?", correct: "6 millions de personnes", wrong1: "1000 personnes", wrong2: "1 milliard", emoji: '🎭' },
          { q: "Qui etait Chico Mendes ?", correct: "Un activiste pour la foret amazonienne", wrong1: "Un footballeur bresilien", wrong2: "Le fondateur du Carnaval", emoji: '🌿' },
        ]
      },
      {
        id: 'br_culture', era: 'Culture', title: "La Culture Bresilienne",
        subtitle: "Samba, architecture et diversite",
        emoji: '🎵', color: '#1B5E20', light: '#E8F5E9',
        intro: "La culture bresilienne est un melange unique d'influences indigènes, portugaises, africaines, japonaises, italiennes et allemandes. Cette diversite a cree une des cultures les plus riches et joyeuses du monde : la samba, la bossa-nova, l'architecture de Brasilia, les arts martiaux du capoeira.",
        figure: { name: "Oscar Niemeyer", emoji: '🏛️', desc: "Architecte bresilien, il a concu les batiments de la capitale Brasilia avec Lucio Costa. Ses formes courbes comme des sculptures blanches sont reconnaissables entre tous. Il a travaille jusqu'a 104 ans !" },
        cards: [
          { emoji: '🎵', title: "La Samba et la Bossa Nova", text: "La samba est nee dans les favelas de Rio, apportee par les esclaves africains. La bossa-nova (samba plus jazz) a ete inventee dans les annees 50. 'La Garota de Ipanema' est l'une des chansons les plus enregistrees du monde.", fact: "La Bossa Nova a ete creee par une chanteuse, Nara Leao, et un compositeur, Tom Jobim, qui se retrouvaient dans les appartements de Copacabana. Une revolution musicale nee dans un salon !" },
          { emoji: '🤸', title: "La Capoeira", text: "La capoeira est un art martial bresilien cree par les esclaves africains. Deguise en danse pour tromper les maitres, elle combine la lutte, la danse et la musique. Elle est pratiquee dans 160 pays.", fact: "Les esclaves cachaient leurs techniques de combat dans les mouvements de danse de la capoeira. Les maitres ne voyaient qu'une danse innocente !" },
          { emoji: '🏛️', title: "Brasilia", text: "Brasilia a ete construite en 41 mois (1956-1960) au milieu de nulle part, pour etre la nouvelle capitale du Bresil. Conçue par Oscar Niemeyer, ses formes futuristes en font une oeuvre d'art urbain.", fact: "Quand on regarde Brasilia depuis un avion, le plan de la ville a la forme d'un avion ou d'un oiseau ! Ce n'est pas un hasard — c'etait voulu par les architectes." },
        ],
        quiz: [
          { q: "Ou la samba est-elle nee ?", correct: "Dans les favelas de Rio", wrong1: "A Sao Paulo", wrong2: "En Afrique", emoji: '🎵' },
          { q: "Pourquoi les esclaves cachaient-ils la capoeira dans la danse ?", correct: "Pour tromper les maitres sur ses techniques de combat", wrong1: "Parce qu'ils aimaient danser", wrong2: "Parce que c'est plus facile", emoji: '🤸' },
          { q: "En combien de mois Brasilia a-t-elle ete construite ?", correct: "41 mois", wrong1: "100 ans", wrong2: "5 ans", emoji: '🏛️' },
        ]
      },
    ]
  },

  MX: {
    name: 'Mexique', flag: '🇲🇽', region: 'americas',
    color: '#1B5E20', dark: '#0d3510', bg: '#E8F5E9',
    hero: { emoji: '👧🏽', name: 'Sofia', age: 7 },
    tagline: "Des Mayas aux Azteques et au Mexique moderne",
    chapters: [
      {
        id: 'mx_maya', era: '2000 av. J.-C. — 900 ap. J.-C.', title: "Les Mayas",
        subtitle: "Astronomes, mathematiciens et batisseurs",
        emoji: '🏛️', color: '#E65100', light: '#FFF3E0',
        intro: "Les Mayas sont l'une des civilisations les plus avancees de l'histoire. Ils inventent un systeme d'ecriture complexe, un calendrier plus precis que celui utilise en Europe, les concepts du zero en mathematiques, et construisent des pyramides et des observatoires astronomiques extraordinaires.",
        figure: { name: "Les Astronomes Mayas", emoji: '🌟', desc: "Les Mayas calculaient les eclipses avec une precision incroyable, sans telescope. Leurs tables astronomiques etaient si precises qu'elles correspondent aux calculs modernes par ordinateur !" },
        cards: [
          { emoji: '🏛️', title: "Chichen Itza", text: "La pyramide de Chichen Itza est l'un des Merveilles du Monde Moderne. Au solstice d'ete et d'hiver, l'ombre de la pyramide cree l'image d'un serpent qui descend les marches. Un calcul astronomique parfait.", fact: "Chichen Itza a 365 marches en tout — une pour chaque jour de l'annee ! Les Mayas utilisaient leur architecture comme calendrier geant." },
          { emoji: '🔢', title: "Le Zero Maya", text: "Les Mayas ont invente le concept du zero vers 400 av. J.-C. — bien avant l'Europe ! Sans le zero, on ne peut pas faire les calculs qui ont permis les ordinateurs, les telephones et toute la technologie moderne.", fact: "Les mathematiciens europeens n'utilisaient pas le zero jusqu'au 13e siecle. Les Mayas l'avaient invente 1500 ans avant ! Le zero est peut-etre l'invention la plus importante de l'humanite." },
          { emoji: '📅', title: "Le Calendrier Maya", text: "Les Mayas avaient en fait plusieurs calendriers simultanement. Le plus fameux, le Compte Long, comptait les jours depuis la creation du monde. Il est plus precis que le calendrier gregorien europeen.", fact: "Le 21 decembre 2012 etait la fin d'un grand cycle dans le calendrier maya. Certains croyaient que c'etait la fin du monde — mais les Mayas eux-memes avaient prevu des evenements apres cette date !" },
          { emoji: '🎭', title: "Le Jeu de Balle", text: "Les Mayas jouaient au jeu de balle (pok-ta-pok) — une sorte de basket medieval ou on ne peut toucher la balle qu'avec les hanches et les coudes ! Les terrains de jeu se trouvent dans toutes les villes mayas.", fact: "La balle du jeu de balle pesait 4 kg en caoutchouc solide ! Se prendre un coup de cette balle devait faire tres mal." },
        ],
        quiz: [
          { q: "Combien de marches a la pyramide de Chichen Itza ?", correct: "365 marches", wrong1: "100 marches", wrong2: "1000 marches", emoji: '🏛️' },
          { q: "Quelle invention mathematique les Mayas ont-ils faite 1500 ans avant l'Europe ?", correct: "Le concept du zero", wrong1: "La multiplication", wrong2: "La racine carree", emoji: '🔢' },
          { q: "Avec quelle partie du corps jouait-on au jeu de balle maya ?", correct: "Les hanches et les coudes", wrong1: "Les mains", wrong2: "Les pieds", emoji: '🎭' },
        ]
      },
      {
        id: 'mx_aztec', era: '1300 — 1521', title: "L'Empire Azteque",
        subtitle: "Tenochtitlan, la Venise du Mexique",
        emoji: '🦅', color: '#B71C1C', light: '#FFEBEE',
        intro: "En 1325, les Azteques fondent Tenochtitlan sur une ile au milieu d'un lac. Cette ville grandit pour devenir la plus grande du monde avec 300 000 habitants — plus grande que toute ville europeenne de l'epoque. En 1519, le conquistador espagnol Hernan Cortes arrive et detruit tout.",
        figure: { name: "Moctezuma II", emoji: '🦅', desc: "Dernier grand Empereur Azteque. Il regit avec Cortes pensant que c'etait un dieu. Erreur fatale — Cortes le fait prisonnier et conquerit l'empire. Moctezuma meurt en 1520 dans des circonstances mysterieuses." },
        cards: [
          { emoji: '🏙️', title: "Tenochtitlan", text: "Fondee en 1325 sur une ile du lac Texcoco, Tenochtitlan avait des pyramides, des palais, des jardins flottants et des marches ou l'on vendait tout. Des causeways (ponts-routes) la reliaient a la terre ferme.", fact: "Mexico City est construite sur les ruines de Tenochtitlan. On retrouve encore des artefacts azteques quand on creuse le metro !" },
          { emoji: '🌽', title: "Le Mais", text: "Les Azteques cultivent le mais (maiz) depuis des millenaires. Pour eux, les humains sont faits de pate de mais ! Le mais d'Amerique centrale a nourri l'Europe apres la conquete et change l'alimentation mondiale.", fact: "Avant Colomb, il n'y avait ni mais, ni tomates, ni chocolat en Europe ! Tous viennent du Mexique et des Ameriques." },
          { emoji: '⚔️', title: "La Conquete de Cortes", text: "Hernan Cortes arrive en 1519 avec 500 soldats et des allies indigenes ennemis des Azteques. Il capture Moctezuma et detruit Tenochtitlan en 1521. Une civilisation entiere s'effondre en 2 ans.", fact: "Cortes avait 500 hommes. Les Azteques avaient 300 000 guerriers. Comment Cortes a-t-il gagne ? Grace aux maladies europeennes (variole) et aux allies indigenes qui detestaient les Azteques !" },
        ],
        quiz: [
          { q: "Combien d'habitants avait Tenochtitlan ?", correct: "300 000 habitants", wrong1: "1000 habitants", wrong2: "1 million", emoji: '🏙️' },
          { q: "Quel aliment les Azteques ont-ils donne au monde ?", correct: "Le mais (et le chocolat)", wrong1: "Le ble", wrong2: "Le riz", emoji: '🌽' },
          { q: "Combien de soldats avait Hernan Cortes ?", correct: "500 soldats", wrong1: "100 000 soldats", wrong2: "10 soldats", emoji: '⚔️' },
        ]
      },
      {
        id: 'mx_colonial', era: '1521 — 1821', title: "La Nouvelle Espagne",
        subtitle: "300 ans de colonisation",
        emoji: '🏰', color: '#7B1FA2', light: '#F3E5F5',
        intro: "Pendant 300 ans, le Mexique est la 'Nouvelle Espagne'. Les Espagnols construisent des eglises sur les pyramides, importent des esclaves africains, et creent une societe hierarchique basee sur la race. Un metissage intense entre Espagnols, indigenes et Africains cree le peuple mexicain actuel.",
        figure: { name: "La Malinche", emoji: '🌺', desc: "Indigene Nahua, elle servait d'interpretre et de conseillere a Hernan Cortes. Haie par certains comme traitresse, reveree par d'autres comme une femme intelligente en situation impossible. Sa figure incarne la complexite de la conquete." },
        cards: [
          { emoji: '🌺', title: "Le Metissage", text: "En 300 ans de colonisation, les Espagnols, les indigenes et les Africains se melangent. Le Mexique actuel est l'un des pays les plus metisses du monde. 60% des Mexicains sont 'mestizos' — ni europeens ni indigenes mais les deux.", fact: "Le mot 'creole' designe quelqu'un de descendance europeenne ne aux Ameriques. Le mot 'metis' designe quelqu'un de parents europeen et indigene. Ces distinctions etaient cruciales dans la societe coloniale." },
          { emoji: '💀', title: "Le Jour des Morts", text: "La fete mexicaine du Jour des Morts (Dia de los Muertos) melange la celebration catholique de la Toussaint avec les rituels azteques pour honorer les ancetres. Les familles installent des autels colores avec les photos et les plats preferes des defunts.", fact: "Le Jour des Morts est classe au Patrimoine Culturel de l'UNESCO depuis 2008. Le film 'Coco' de Pixar s'en inspire !" },
          { emoji: '🌶️', title: "La Cuisine Mexicaine", text: "La cuisine mexicaine est la fusion des saveurs indigenes (piments, mais, tomates, chocolat) et espagnoles (viande, fromage, huile d'olive). Tacos, tamales, mole... chaque region a ses specialites.", fact: "Il existe 64 varietes de piment au Mexique ! Le piment le plus fort du monde (le Carolina Reaper) est 300 fois plus fort qu'un jalapeno ordinaire." },
        ],
        quiz: [
          { q: "Que signifie 'mestizo' ?", correct: "Quelqu'un de parents europeen et indigene", wrong1: "Un Espagnol du Mexique", wrong2: "Un indigene pur", emoji: '🌺' },
          { q: "Quel film de Pixar s'inspire du Jour des Morts ?", correct: "Coco", wrong1: "Encanto", wrong2: "Ratatouille", emoji: '💀' },
          { q: "Combien de varietes de piment y a-t-il au Mexique ?", correct: "64 varietes", wrong1: "3 varietes", wrong2: "1000 varietes", emoji: '🌶️' },
        ]
      },
      {
        id: 'mx_independence', era: '1810 — 1920', title: "L'Independance et la Revolution",
        subtitle: "Hidalgo, Juarez et Zapata",
        emoji: '🌵', color: '#1B5E20', light: '#E8F5E9',
        intro: "Le 16 septembre 1810, le pretre Hidalgo sonne la cloche et appelle le peuple a la rebellion contre l'Espagne. L'independance est proclamee en 1821. Mais la vraie revolution pour les pauvres vient en 1910 avec Emiliano Zapata et Pancho Villa qui se battent pour les terres des paysans.",
        figure: { name: "Emiliano Zapata", emoji: '🌵', desc: "Leader paysan de la Revolution mexicaine (1910-1919), son cri de guerre etait 'Tierra y Libertad' (Terre et Liberte). Il voulait rendre les terres aux paysans indigenes volees par les riches proprietaires. Assassine en 1919." },
        cards: [
          { emoji: '🔔', title: "Le Cri de Hidalgo", text: "Le 16 septembre 1810, le pretre Miguel Hidalgo sonne la cloche de son eglise a Dolores et appelle le peuple a se revolter contre l'Espagne. C'est le debut de la guerre d'independance. Le 16 septembre est la fete nationale mexicaine.", fact: "Le Cri d'Independance est rejoue chaque annee par le President du Mexique depuis le balcon du Palais National a Mexico. Des millions de Mexicains l'ecoutent !" },
          { emoji: '👨‍⚖️', title: "Benito Juarez", text: "Premier president indigene du Mexique (Zapoteque de Oaxaca), il separe l'Eglise de l'Etat et modernise le pays. Napoleon III envoie l'Archiduc Maximilien prendre le pouvoir — Juarez le fait executer.", fact: "Juarez est considere comme le plus grand president mexicain. Lincoln (president US) et lui s'ecrivaient des lettres ! Deux presidents d'origine modeste qui changeaient leur pays en meme temps." },
          { emoji: '🌵', title: "Emiliano Zapata", text: "En 1910, la Revolution mexicaine eclate. Zapata mene les paysans du Chiapas et Morelos avec son cri 'Tierra y Libertad'. Il veut rendre les terres aux indigenes volees par les hacendados (grands proprietaires).", fact: "Le mouvement zapatiste existe encore aujourd'hui au Chiapas ! En 1994, des indigenes se sont revoltes sous le nom EZLN en hommage a Zapata." },
        ],
        quiz: [
          { q: "Quand est la fete nationale mexicaine ?", correct: "16 septembre", wrong1: "5 mai", wrong2: "1er janvier", emoji: '🔔' },
          { q: "Que signifie le cri de Zapata ?", correct: "Terre et Liberte", wrong1: "Independance ou Mort", wrong2: "Vive le Mexique", emoji: '🌵' },
          { q: "Benito Juarez etait de quelle origine ?", correct: "Zapoteque (indigene)", wrong1: "Espagnol", wrong2: "Francais", emoji: '👨‍⚖️' },
        ]
      },
      {
        id: 'mx_today', era: "Aujourd'hui", title: "Le Mexique Moderne",
        subtitle: "La 12e economie mondiale",
        emoji: '🌮', color: '#C8600A', light: '#FFF3E0',
        intro: "Le Mexique d'aujourd'hui est la 12e economie mondiale, un pays de 130 millions d'habitants qui partage une frontiere de 3000 km avec les Etats-Unis. Sa culture — cuisine, musique, cinema — rayonne dans le monde entier. Les Mexicains forment la plus grande diaspora hispanique aux USA.",
        figure: { name: "Frida Kahlo", emoji: '🌺', desc: "Peintre mexicaine (1907-1954), ses autoportraits colores et douloureux sont parmi les plus reconnaissables au monde. Survivante d'un terrible accident de bus, elle a transforme sa douleur en art." },
        cards: [
          { emoji: '🌺', title: "Frida Kahlo", text: "Frida Kahlo est l'artiste mexicaine la plus connue au monde. Ses peintures autobiographiques, pleines de couleurs et de douleur, s'arrachent pour des dizaines de millions de dollars dans les ventes aux encheres.", fact: "Une peinture de Frida Kahlo a ete vendue 35 millions de dollars en 2021 — un record pour un artiste latinoamericain !" },
          { emoji: '🌮', title: "La Cuisine Mexicaine", text: "La cuisine mexicaine est inscrite au Patrimoine Culturel de l'UNESCO. Tacos, tamales, enchiladas, mole, guacamole... elle est la deuxieme cuisine la plus populaire au monde apres la cuisine italienne.", fact: "Le guacamole existait deja chez les Azteques ! Le mot vient du nahuatl 'ahuacamolli' — sauce d'avocat. Les Azteques mangeaient de l'avocat depuis 5000 ans." },
          { emoji: '🏺', title: "Les Pyramides Vivantes", text: "Le Mexique compte des dizaines de sites archaeologiques majeurs : Teotihuacan, Palenque, Monte Alban, Tulum... Ces civilisations ne sont pas mortes — leurs descendants vivent encore au Mexique et parlent leurs langues.", fact: "Il y a 65 langues indigenes encore parlees au Mexique aujourd'hui ! Le nahuatl (langue azteque) est parle par 1,7 million de personnes." },
        ],
        quiz: [
          { q: "Pour combien a ete vendue une peinture de Frida Kahlo ?", correct: "35 millions de dollars", wrong1: "100 euros", wrong2: "1 milliard", emoji: '🌺' },
          { q: "La cuisine mexicaine est inscrite dans quelle liste ?", correct: "Le Patrimoine Culturel de l'UNESCO", wrong1: "Le Livre Guinness des Records", wrong2: "La Liste Rouge", emoji: '🌮' },
          { q: "Combien de langues indigenes sont parlees au Mexique ?", correct: "65 langues", wrong1: "1 langue", wrong2: "2 langues", emoji: '🏺' },
        ]
      },
    ]
  },

};

export const REGIONS = {
  africa: {
    name: 'Afrique', emoji: '🌍',
    color: '#FF6F00', bg: '#FFF8E1',
    countries: ['ML', 'SN', 'MA', 'NG']
  },
  europe: {
    name: 'Europe', emoji: '🌍',
    color: '#1565C0', bg: '#E3F2FD',
    countries: ['FR', 'DE']
  },
  asia: {
    name: 'Asie', emoji: '🌏',
    color: '#00695C', bg: '#E0F2F1',
    countries: ['JP', 'CN', 'IN']
  },
  americas: {
    name: 'Ameriques', emoji: '🌎',
    color: '#6A1B9A', bg: '#F3E5F5',
    countries: ['BR', 'MX']
  },
};
