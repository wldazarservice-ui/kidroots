// Mokalibo — Donnees historiques completes
// 20 pays « riches » (3 niveaux) definis ici + les pays « monde » de src/data/world/ (charges a la demande)
import { WORLD_META } from './world/meta.gen.js'

export const COUNTRIES = {

  // ════════════════════════════════════════════════════════════════════
  // AFRIQUE
  // ════════════════════════════════════════════════════════════════════

  ML: {
    name: 'Mali', flag: '🇲🇱', region: 'africa',
    color: '#C8600A', dark: '#7A3500', bg: '#FFF3E0',
    hero: { emoji: '👦🏿', name: 'Moussa', age: 8 },
    tagline: "De l'Empire du Ghana à aujourd'hui",
    chapters: [
      {
        id: 'ml_origins', era: 'Avant 300 ap. J.-C.', title: 'Les Origines',
        subtitle: 'Les premiers peuples du Niger',
        emoji: '🌅', color: '#5D4037', light: '#EFEBE9',
        intro: "Il y a plus de 4000 ans, des peuples de chasseurs et de pêcheurs vivaient sur les rives du fleuve Niger. Ils cultivaient le mil, maîtrisaient le fer et formaient les premiers royaumes. Ce sont les ancêtres des Maliens d'aujourd'hui.",
        figure: { name: "Le Forgeron Ancestral", emoji: '⚒️', desc: "Dans les sociétés anciennes du Mali, le forgeron était le personnage le plus respecté. Il transformait le fer en outils et en armes, changeant à jamais la vie des peuples." },
        cards: [
          { emoji: '🌊', title: 'Le Fleuve Niger', text: "Depuis 4000 ans, tout commence ici. Les premiers habitants s'installent sur ses rives, pêchent en pirogue et échangent du poisson avec les villages voisins.", fact: "Le Niger est le 3e plus long fleuve d'Afrique. Sans lui, aucun empire malien n'aurait existé !" },
          { emoji: '🌾', title: "L'Agriculture", text: "Il y a 3000 ans, les peuples du Mali apprennent à cultiver le mil, le sorgho et le riz. Cela permet de construire des villages permanents.", fact: "Le Mali est l'un des premiers endroits au monde où le riz sauvage a été cultivé par l'homme !" },
          { emoji: '⚒️', title: 'La Maîtrise du Fer', text: "La découverte du fer change tout. Avec des outils en fer, on cultive mieux. Les forgerons deviennent les personnages les plus puissants de la société.", fact: "Dans la tradition malienne, on disait que le forgeron (numu) avait des pouvoirs magiques. Il était craint et respecté." },
          { emoji: '🐫', title: 'Les Routes du Sahara', text: "Des caravanes de chameaux traversent le désert. Elles apportent du sel du nord et repartent avec l'or du sud. Ces routes font la richesse des empires maliens.", fact: "On raconte qu'une livre de sel pouvait valoir une livre d'or. Le sel était précieux car il permettait de conserver la viande !" },
          { emoji: '👥', title: 'Les Soninkés', text: "Le peuple soninké est le premier à s'organiser en royaume. Il parle une langue encore utilisée aujourd'hui et fonde le premier grand empire de la région.", fact: "Les descendants des Soninkés vivent encore au Mali, en Mauritanie et au Sénégal. Leur culture est très ancienne !" },
        ],
        quiz: [
          { q: "Sur quel fleuve sont nées les premières civilisations du Mali ?", correct: "Le Niger", wrong1: "Le Nil", wrong2: "Le Congo", emoji: '🌊' },
          { q: "Quel peuple a fondé le premier royaume de la région ?", correct: "Les Soninkés", wrong1: "Les Dogons", wrong2: "Les Touaregs", emoji: '👥' },
          { q: "Qu'échangeait-on sur les routes du Sahara ?", correct: "L'or contre le sel", wrong1: "Le riz contre le mil", wrong2: "Des chevaux contre des chameaux", emoji: '🐫' },
        ]
      },
      {
        id: 'ml_ghana', era: '300 — 1200', title: "L'Empire du Ghana",
        subtitle: 'Le pays de l\'or',
        emoji: '👑', color: '#E65100', light: '#FFF3E0',
        intro: "Attention : l'Empire du Ghana n'est pas le pays Ghana d'aujourd'hui ! C'était un empire situé au nord du Mali actuel, gouverné par les Soninkés. Il contrôlait tout le commerce de l'or entre l'Afrique noire et le monde arabe.",
        figure: { name: "Le Ghana (le Roi)", emoji: '👑', desc: '"Ghana" signifiait "roi guerrier" en soninké. Le roi de Ghana était si puissant qu\'il recevait des ambassadeurs venus d\'Égypte, du Maroc et même d\'Europe.' },
        cards: [
          { emoji: '🏙️', title: 'Kumbi Saleh', text: "La capitale de l'Empire du Ghana. Une métropole de dizaines de milliers d'habitants, avec un quartier musulman pour les marchands et un quartier royal pour le roi.", fact: "Des archéologues ont découvert les ruines de Kumbi Saleh en Mauritanie. La ville avait des maisons à plusieurs étages !" },
          { emoji: '🥇', title: "Le Commerce de l'Or", text: "L'empire contrôlait les mines d'or du Bambouk. Chaque marchand payait une taxe en or pour traverser le territoire. Le roi possédait une nugget d'or si grande qu'il y attachait son cheval.", fact: "Les Arabes appelaient l'Empire du Ghana 'Bilad al-Sudan' — le pays des Hommes Noirs. Ils le considéraient comme la source de tout l'or du monde !" },
          { emoji: '🧂', title: 'Le Monopole du Sel', text: "Le sel venait des mines de Teghaza au Sahara. L'empire achetait le sel au nord et le vendait très cher au sud. Ce monopole était une source incroyable de richesse.", fact: "Des blocs de sel étaient utilisés comme monnaie ! Plus pratique que de porter de l'or partout..." },
          { emoji: '⚔️', title: "La Chute en 1076", text: "Les guerriers Almoravides (des Berbères du Maroc) attaquent et prennent Kumbi Saleh. L'empire s'affaiblit. Mais de ses cendres va naître quelque chose d'encore plus grand...", fact: "La sécheresse et l'épuisement des mines d'or ont aussi contribué à la chute. Les empires tombent rarement pour une seule raison." },
        ],
        quiz: [
          { q: "Que signifiait le mot 'Ghana' ?", correct: "Roi guerrier", wrong1: "Pays de l'or", wrong2: "Grand fleuve", emoji: '👑' },
          { q: "Qui a mis fin à l'Empire du Ghana ?", correct: "Les guerriers Almoravides", wrong1: "Les Romains", wrong2: "L'Empire du Mali", emoji: '⚔️' },
          { q: "Comment le roi de Ghana s'enrichissait-il ?", correct: "En taxant les marchands d'or et de sel", wrong1: "En cultivant le riz", wrong2: "En construisant des pyramides", emoji: '🥇' },
        ]
      },
      {
        id: 'ml_mali', era: '1235 — 1600', title: "L'Empire du Mali",
        subtitle: 'Soundiata Keita et Mansa Musa',
        emoji: '⚔️', color: '#B71C1C', light: '#FFEBEE',
        intro: "En 1235, Soundiata Keita bat le terrible roi Soumaoro Kanté à la bataille de Kirina et fonde l'Empire du Mali. Cet empire va devenir l'un des plus grands et riches de l'histoire humaine. Un siècle plus tard, Mansa Musa régnera sur un territoire grand comme l'Europe entière.",
        figure: { name: "Soundiata Keita", emoji: '🦁', desc: "Prince du peuple Mandingue, il était paralysé des jambes enfant. Exilé par son ennemi, il revient et rassemble tous les peuples pour battre Soumaoro Kanté. Son histoire est racontée par les griots depuis 800 ans." },
        cards: [
          { emoji: '🦁', title: 'Soundiata Keita', text: "Ne vers 1217, il ne pouvait pas marcher enfant. Son ennemi Soumaoro Kanté l'exilé. Mais il revient avec une grande armée et bat Soumaoro à la bataille de Kirina en 1235.", fact: "La légende dit que la seule faiblesse de Soumaoro était un ergot de coq blanc. Soundiata lui a lancé une flèche avec cet ergot et lui a retiré ses pouvoirs magiques !" },
          { emoji: '💰', title: 'Mansa Musa (1312-1337)', text: "Le 10e Mansa (roi) de l'empire. Il régnait sur le Maroc, la Mauritanie, le Sénégal, la Gambie et le Mali actuels. Il contrôlait la moitié de l'or mondial et était probablement l'homme le plus riche qui ait jamais vécu.", fact: "Sa fortune est estimée à 400 milliards de dollars d'aujourd'hui. Bill Gates est pauvre à côté de lui !" },
          { emoji: '🕌', title: 'Le Pèlerinage de 1324', text: "Mansa Musa part à La Mecque avec 60 000 personnes et 14 tonnes d'or. Il distribue tant d'or sur son chemin que le prix de l'or s'effondre.", fact: "Il a distribue tellement d'or en Égypte que le prix de l'or a chute pendant 12 ans dans tout le monde arabe !" },
          { emoji: '📚', title: 'Tombouctou, Capitale du Savoir', text: "Sous Mansa Musa, Tombouctou devient la capitale mondiale du savoir islamique. La mosquée de Sankoré accueille 25 000 étudiants. Des savants viennent du monde entier.", fact: "On a retrouvé plus de 700 000 manuscrits à Tombouctou ! Des textes de médecine, de philosophie et d'astronomie écrits il y a 600 ans." },
        ],
        quiz: [
          { q: "En quelle année Soundiata Keita fonde l'Empire du Mali ?", correct: "1235", wrong1: "1000", wrong2: "1492", emoji: '🦁' },
          { q: "Combien d'or Mansa Musa emmène-t-il a La Mecque ?", correct: "14 tonnes d'or", wrong1: "1 kilo d'or", wrong2: "100 grammes", emoji: '🕌' },
          { q: "Pourquoi Tombouctou était-elle célèbre ?", correct: "C'était un grand centre du savoir", wrong1: "C'était la plus grande ville d'Afrique", wrong2: "Elle avait les plus grandes mines d'or", emoji: '📚' },
        ]
      },
      {
        id: 'ml_songhai', era: '1464 — 1591', title: "L'Empire Songhaï",
        subtitle: 'La dernière grande puissance',
        emoji: '🏰', color: '#1565C0', light: '#E3F2FD',
        intro: "Après le déclin de l'Empire du Mali, l'Empire Songhaï s'élève. Sous Askia Mohammed, il devient le plus grand empire que l'Afrique de l'Ouest ait jamais connu. Mais en 1591, des soldats marocains armes de canons le détruisent en une seule bataille.",
        figure: { name: "Askia Mohammed", emoji: '🎓', desc: "Roi de 1493 à 1528, il crée un gouvernement centralisé, des provinces administrées, une monnaie stable. Il fait de Tombouctou la référence mondiale du savoir islamique." },
        cards: [
          { emoji: '🎓', title: 'Askia Mohammed', text: "Il prend le pouvoir en 1493 et transforme tout. Il crée un gouvernement moderne avec des provinces, des gouverneurs, et une monnaie stable. Tombouctou devient sous lui la capitale du savoir mondial.", fact: "Askia Mohammed a fait son pèlerinage à La Mecque en 1496. Le Khalife lui a accordé le titre de 'Calife du Soudan' !" },
          { emoji: '🏙️', title: 'Djenné, la Cité Commerciale', text: "Sous l'Empire Songhaï, Djenné devient le plus grand marché d'Afrique de l'Ouest. Des milliers de marchands s'y réunissent chaque semaine.", fact: "La Grande Mosquée de Djenné, construite en banco (argile), est le plus grand bâtiment en terre crue du monde. Elle est toujours debout aujourd'hui !" },
          { emoji: '💥', title: 'La Bataille de Tondibi 1591', text: "Le sultan du Maroc envoie 4000 hommes armes de canons à travers le Sahara. Les Songhaï n'ont pas de canons. Malgré leur nombre supérieur, ils sont écrasés. L'empire s'effondre.", fact: "C'est la première fois que des armes à feu sont utilisées dans une grande bataille en Afrique sub-saharienne." },
        ],
        quiz: [
          { q: "Quelle arme a permis au Maroc de battre l'Empire Songhaï ?", correct: "Les canons", wrong1: "Les éléphants de guerre", wrong2: "Les arcs empoisonnés", emoji: '💥' },
          { q: "Qui a réorganise l'Empire Songhaï ?", correct: "Askia Mohammed", wrong1: "Mansa Musa", wrong2: "Soundiata Keita", emoji: '🎓' },
          { q: "En quelle année l'Empire Songhaï tombe-t-il ?", correct: "1591", wrong1: "1235", wrong2: "1800", emoji: '📅' },
        ]
      },
      {
        id: 'ml_independence', era: '1960 — aujourd\'hui', title: "L'Indépendance",
        subtitle: 'Le Mali libre',
        emoji: '🌟', color: '#1B5E20', light: '#E8F5E9',
        intro: "Le 22 septembre 1960, le Mali déclare son indépendance après 80 ans de colonisation française. Modibo Keita devient le premier président. Le pays choisit ses trois couleurs : vert pour l'espérance, jaune pour l'or, rouge pour le sang des martyrs.",
        figure: { name: "Modibo Keita", emoji: '🎖️', desc: "Premier président du Mali indépendant (1960-1968). Il choisit le socialisme africain, nationalise les entreprises, et crée une identité malienne forte. Renversé en 1968, il reste un hero national." },
        cards: [
          { emoji: '🌟', title: 'Le 22 Septembre 1960', text: "Le drapeau malien est hissé pour la première fois à Bamako. Modibo Keita prononce son discours historique. La France reconnaît la souveraineté du Mali.", fact: "Le 22 septembre est la Fête Nationale du Mali. On le célèbre chaque année avec des parades et des fêtes dans tout le pays !" },
          { emoji: '🎵', title: 'La Culture Vivante', text: "Malgré les difficultés politiques, la culture malienne rayonne. Les griots perpétuent les histoires anciennes. Des artistes comme Salif Keita font connaître la musique malienne dans le monde entier.", fact: "Salif Keita, 'La Voix d'Or de l'Afrique', est albinos. Il a transformé sa différence en force !" },
          { emoji: '🌍', title: 'Le Mali Aujourd\'hui', text: "Le Mali fait face à de grands défis : l'insécurité au nord, la pauvreté. Mais c'est aussi un pays de résilience extraordinaire, riche d'une culture millénaire.", fact: "La moitié des Maliens ont moins de 17 ans. L'avenir du pays est dans leurs mains !" },
        ],
        quiz: [
          { q: "Quand le Mali a-t-il déclare son indépendance ?", correct: "22 septembre 1960", wrong1: "14 juillet 1789", wrong2: "1er janvier 1900", emoji: '🌟' },
          { q: "Qui était le premier président du Mali ?", correct: "Modibo Keita", wrong1: "Moussa Traoré", wrong2: "Amadou Toumani Touré", emoji: '🎖️' },
          { q: "Que représentent les couleurs du drapeau malien ?", correct: "Espérance, or, sang des martyrs", wrong1: "Forêt, soleil, mer", wrong2: "Paix, justice, liberté", emoji: '🇲🇱' },
        ]
      },
    ]
  },

  SN: {
    name: 'Sénégal', flag: '🇸🇳', region: 'africa',
    color: '#1B5E20', dark: '#0d3510', bg: '#E8F5E9',
    hero: { emoji: '👧🏿', name: 'Fatou', age: 7 },
    tagline: "Du Royaume du Sine au Lion de Teranga",
    chapters: [
      {
        id: 'sn_origins', era: 'Avant 1000', title: 'Les Premiers Royaumes',
        subtitle: 'Toucouleurs, Wolofs et Sérères',
        emoji: '🌴', color: '#1B5E20', light: '#E8F5E9',
        intro: "Bien avant l'arrivée des Européens, le Sénégal était divisé en plusieurs royaumes puissants. Les Wolofs, les Sérères, les Toucouleurs et les Diolas construisaient des sociétés organisées, avec des rois, des lois et des traditions millénaires.",
        figure: { name: "Le Buur (Roi Wolof)", emoji: '👑', desc: "Dans la société wolof, le Buur était le chef suprême. Il était assiste par des conseillers, des guerriers et des griots — les gardiens de la mémoire collective." },
        cards: [
          { emoji: '🌊', title: "L'Empire du Djolof", text: "Au 14e siècle, l'empire du Djolof unifica les royaumes wolofs sous un seul dirigeant. Il contrôlait tout le nord du Sénégal actuel et commerçait avec les caravanes du Sahara.", fact: "Le Djolof donna son nom au peuple Wolof, la plus grande ethnie du Sénégal aujourd'hui !" },
          { emoji: '🎭', title: "Les Griots", text: "Les griots sont les historiens, musiciens et poètes de la société. Ils mémorisent l'histoire de chaque famille et la transmettent oralement de génération en génération.", fact: "Un griot peut réciter l'arbre généalogique d'une famille sur 30 générations ! C'est comme un disque dur humain." },
          { emoji: '🥁', title: "Le Sabar", text: "Le tambour sabar est au cœur de la culture sénégalaise. Il sert à communiquer entre villages, à annoncer les cérémonies, et à faire danser lors des fêtes.", fact: "Autrefois, les messages pouvaient se transmettre de village en village par le code des tambours, comme des SMS !" },
          { emoji: '🌾', title: "L'Agriculture", text: "Les Sénégalais cultivaient le mil, le sorgho et l'arachide depuis des siècles. Chaque ethnie avait ses techniques agricoles adaptées au terroir.", fact: "Le Sénégal est l'un des premiers pays à avoir cultivé l'arachide (cacahuète). L'huile d'arachide y est encore produite en grande quantité." },
        ],
        quiz: [
          { q: "Quel empire unit les royaumes wolofs ?", correct: "L'Empire du Djolof", wrong1: "L'Empire du Mali", wrong2: "Le Royaume du Sine", emoji: '👑' },
          { q: "Quel est le rôle des griots ?", correct: "Garder et transmettre l'histoire", wrong1: "Combattre les ennemis", wrong2: "Cultiver les champs", emoji: '🎭' },
          { q: "À quoi servait le tambour sabar ?", correct: "Communiquer et faire la fête", wrong1: "Faire peur aux ennemis", wrong2: "Appeler la pluie", emoji: '🥁' },
        ]
      },
      {
        id: 'sn_islam', era: '1000 — 1800', title: "L'Islam et les Royaumes",
        subtitle: "La foi qui transforme tout",
        emoji: '🕌', color: '#00695C', light: '#E0F2F1',
        intro: "À partir du 11e siècle, l'Islam arrive progressivement au Sénégal par les routes commerciales du Sahara. Des marabouts (saints musulmans) deviennent des figures énormément respectées. Leur influence transforme la politique, la culture et la vie quotidienne.",
        figure: { name: "Cheikh Ahmadou Bamba", emoji: '🕌', desc: "Il fonde la confrérie Mouride en 1883. Il prêchait la paix, le travail et la foi. Les Français l'ont exilé deux fois, mais son influence n'a fait que grandir. Toubka est aujourd'hui la capitale spirituelle du Sénégal." },
        cards: [
          { emoji: '🕌', title: "L'Arrivée de l'Islam", text: "L'Islam arrive au Sénégal par les marchands arabes et berbères vers le 11e siècle. Les rois adoptent d'abord la religion pour renforcer leurs liens commerciaux avec le monde arabe.", fact: "95% des Sénégalais sont musulmans aujourd'hui. Mais l'Islam sénégalais est unique : il mélange foi islamique et traditions africaines." },
          { emoji: '📿', title: "Les Confréries", text: "Les confréries religieuses (Mourides, Tidianes, Layenes) structurent la société sénégalaise. Chaque croyant est lié à un marabout qui guide sa vie spirituelle.", fact: "Le Grand Magal de Touba attire 5 millions de pèlerins chaque année ! C'est l'un des plus grands rassemblements religieux au monde." },
          { emoji: '⚔️', title: "Les Guerres Saintes", text: "Au 19e siècle, El Hadj Oumar Tall mène une jihad (guerre sainte) pour unifier les peuples de la région sous l'Islam. Il combat aussi bien les peuples animistes que les Français.", fact: "El Hadj Oumar Tall a fondé un empire qui couvrait le Sénégal, la Guinée et le Mali d'aujourd'hui !" },
        ],
        quiz: [
          { q: "Quel pourcentage des Sénégalais est musulman ?", correct: "95%", wrong1: "50%", wrong2: "20%", emoji: '🕌' },
          { q: "Qui a fondé la confrérie Mouride ?", correct: "Cheikh Ahmadou Bamba", wrong1: "El Hadj Oumar Tall", wrong2: "Lat Dior", emoji: '📿' },
          { q: "Comment appelle-t-on les guides spirituels au Sénégal ?", correct: "Des marabouts", wrong1: "Des imams", wrong2: "Des griots", emoji: '🙏' },
        ]
      },
      {
        id: 'sn_colonial', era: '1850 — 1960', title: "La Colonisation",
        subtitle: "Résistance et adaptation",
        emoji: '🏳️', color: '#7B1FA2', light: '#F3E5F5',
        intro: "Les Français s'installent à Saint-Louis et Dakar dès le 17e siècle. Mais la conquête de l'intérieur ne commence vraiment qu'au 19e siècle. Des guerriers comme Lat Dior résistent héroïquement avant d'être vaincus.",
        figure: { name: "Lat Dior", emoji: '⚔️', desc: "Damel (roi) du Cayor, il résiste aux Français pendant des années. Il est mort le 26 octobre 1886 en combattant contre la construction du chemin de fer qui traversait son royaume. Il est un hero national." },
        cards: [
          { emoji: '🏙️', title: "Dakar, Capitale Coloniale", text: "Les Français fondent Dakar en 1857 sur la presqu'île du Cap-Vert. La ville devient rapidement la capitale de toute l'Afrique Occidentale Française (AOF) — un territoire de 4 millions de km2 !", fact: "De Dakar, les Français administraient 8 pays d'Afrique de l'Ouest. C'était comme la capitale d'un continent !" },
          { emoji: '⚔️', title: "Lat Dior", text: "Damel du Cayor, il refuse de laisser les Français construire un chemin de fer à travers son royaume. Il meurt en combattant le 26 octobre 1886. Sa mort marque la fin de la résistance du Cayor.", fact: "Lat Dior est l'un des héros nationaux les plus aimés du Sénégal. Son portrait orne les billets de banque !" },
          { emoji: '🎓', title: "L'Élite Africaine", text: "Les quatre communes de Dakar, Saint-Louis, Gorée et Rufisque sont les seuls endroits en Afrique coloniale où les Africains ont les mêmes droits que les Français. Cela crée une élite africaine francophone unique.", fact: "Léopold Sédar Senghor, futur président du Sénégal, est sorti de ce système. Il est même devenu membre de l'Académie Française !" },
        ],
        quiz: [
          { q: "En quelle année les Français fondent-ils Dakar ?", correct: "1857", wrong1: "1960", wrong2: "1400", emoji: '🏙️' },
          { q: "Pourquoi Lat Dior s'est-il batu contre les Français ?", correct: "Pour empêcher la construction du chemin de fer", wrong1: "Pour protéger l'or de son royaume", wrong2: "Pour chasser les marchands arabes", emoji: '⚔️' },
          { q: "Dakar était la capitale de quel territoire colonial ?", correct: "L'Afrique Occidentale Française", wrong1: "L'Empire du Mali", wrong2: "Le Royaume du Djolof", emoji: '🏛️' },
        ]
      },
      {
        id: 'sn_independence', era: '1960 — aujourd\'hui', title: "L'Indépendance",
        subtitle: "Léopold, la Teranga et le Lion",
        emoji: '🦁', color: '#C62828', light: '#FFEBEE',
        intro: "Le 4 avril 1960, le Sénégal devient indépendant. Léopold Sédar Senghor, poète et intellectuel, devient le premier président. Il gouverne pendant 20 ans et passe le pouvoir pacifiquement — un exemple rare en Afrique.",
        figure: { name: "Léopold Sédar Senghor", emoji: '✍️', desc: "Premier président du Sénégal (1960-1980), poète de renommée mondiale, il a créé le concept de 'Négritude' — la fierté de l'identité africaine. Il est le premier Africain élu à l'Académie Française." },
        cards: [
          { emoji: '✍️', title: "Léopold Sédar Senghor", text: "Poète, philosophe et homme d'état, il gouverne avec sagesse pendant 20 ans. En 1980, il passe le pouvoir à Abdou Diouf — une transition rare et pacifique en Afrique.", fact: "Senghor a inventé le mot 'Négritude' pour décrire la fierté de l'identité et de la culture africaines. Son œuvre poétique est étudiée dans le monde entier !" },
          { emoji: '🦁', title: "La Teranga", text: "La Teranga est la philosophie sénégalaise de l'hospitalité. Elle signifie accueillir l'étranger avec chaleur et generosity. C'est l'une des plus grandes richesses du Sénégal.", fact: "Les Lions de la Teranga (équipe de foot) ont atteint la finale de la Coupe du Monde 2002. Ils ont battu la France championne du monde en poule !" },
          { emoji: '🎵', title: "La Musique Sénégalaise", text: "Le mbalax est la musique nationale sénégalaise, fusionnant les rythmes sabar traditionnels avec le jazz et la pop. Youssou N'Dour est l'artiste sénégalais le plus connu dans le monde.", fact: "Youssou N'Dour a chanté avec Peter Gabriel, Neneh Cherry et Paul Simón. Il est devenu ministre de la Culture du Sénégal !" },
        ],
        quiz: [
          { q: "Quand le Sénégal a-t-il pris son indépendance ?", correct: "4 avril 1960", wrong1: "22 septembre 1960", wrong2: "14 juillet 1960", emoji: '🦁' },
          { q: "Qu'est-ce que la Teranga ?", correct: "L'hospitalité sénégalaise", wrong1: "Un plat traditionnel", wrong2: "Le nom d'une ville", emoji: '🫂' },
          { q: "Quel musicien sénégalais est connu dans le monde entier ?", correct: "Youssou N'Dour", wrong1: "Salif Keita", wrong2: "Fela Kuti", emoji: '🎵' },
        ]
      },
      {
        id: 'sn_culture', era: 'Culture', title: "La Culture Vivante",
        subtitle: "Art, cuisine et sport",
        emoji: '🎨', color: '#F57F17', light: '#FFFDE7',
        intro: "La culture sénégalaise est l'une des plus riches d'Afrique. Du thiéboudienne (le plat national) aux combats de lutte traditionnelle, en passant par les tissus wax colorés, chaque aspect de la vie quotidienne est une célébration de l'identité sénégalaise.",
        figure: { name: "La Femme Sénégalaise", emoji: '👘', desc: "La femme sénégalaise est au cœur de la culture. Elle est l'gardienne des traditions culinaires, des chants rituels, et de l'art de s'habiller. Son boubou coloré et son gèle (turban) sont des œuvres d'art." },
        cards: [
          { emoji: '🍛', title: "Le Thiéboudienne", text: "Le plat national du Sénégal : du riz cuit dans une sauce de tomate avec du poisson et des légumes. Il se prépare pendant des heures et rassemble toute la famille autour d'un grand plat commun.", fact: "Le thiéboudienne a été classe au Patrimoine Culturel Immatériel de l'UNESCO en 2021 !" },
          { emoji: '🤼', title: "La Lutte Sénégalaise", text: "La lutte traditionnelle (laamb) est le sport numéro 1 au Sénégal, encore plus populaire que le foot ! Les lutteurs sont des stars nationales, couverts de talismans, qui combattent dans des stades pleins à craquer.", fact: "Les lutteurs peuvent gagner des millions de francs CFA pour un seul combat. Certains sont plus riches que des footballeurs !" },
          { emoji: '🎨', title: "Le Tissu Wax", text: "Les tissus wax aux motifs colorés sont une signature de la mode africaine. Les femmes sénégalaises les portent en boubou, en wrapper ou en tenue habillée. Chaque motif a une signification.", fact: "Le tissu wax a été inventé... aux Pays-Bas pour imiter les batiks indonésiens ! Mais les Africains se le sont approprié et en ont fait leur propre art." },
        ],
        quiz: [
          { q: "Quel est le plat national du Sénégal ?", correct: "Le thiéboudienne", wrong1: "Le couscous", wrong2: "Le jollof rice", emoji: '🍛' },
          { q: "Quel est le sport le plus populaire au Sénégal ?", correct: "La lutte traditionnelle", wrong1: "Le football", wrong2: "La course à pied", emoji: '🤼' },
          { q: "Le thiéboudienne a été classe par quelle organisation ?", correct: "L'UNESCO", wrong1: "La FIFA", wrong2: "L'ONU", emoji: '🏆' },
        ]
      },
    ]
  },

  MA: {
    name: 'Maroc', flag: '🇲🇦', region: 'africa',
    color: '#C62828', dark: '#7f1313', bg: '#FFEBEE',
    hero: { emoji: '👦🏽', name: 'Youssef', age: 8 },
    tagline: "Du Royaume Amazigh à la Monarchie moderne",
    chapters: [
      {
        id: 'ma_origins', era: 'Avant 700 ap. J.-C.', title: "Les Amazighs",
        subtitle: "Les hommes libres du Maghreb",
        emoji: '🏔️', color: '#5D4037', light: '#EFEBE9',
        intro: "Bien avant les Arabes, les Romains et les Phéniciens, le Maroc était habité par les Amazighs (Berbères) — 'les hommes libres'. Ils vivaient dans les montagnes de l'Atlas, les plaines fertiles et les oasis du Sahara depuis plus de 10 000 ans.",
        figure: { name: "La Reine Dihya (Kahina)", emoji: '👑', desc: "Guerrière amazighe du 7e siècle qui a résisté à l'invasion arabe pendant des années. Elle est l'une des grandes héroïnes de l'Afrique du Nord." },
        cards: [
          { emoji: '🏔️', title: "Les Montagnes de l'Atlas", text: "L'Atlas est la colonne vertébrale du Maroc. Ces montagnes abritent les Berbères depuis 10 000 ans. Le plus haut sommet, le Toubkal (4167m), est couvert de neige en hiver.", fact: "Le mot 'Atlas' vient du géant mythologique Atlas qui soutenait le ciel sur ses épaules dans la mythologie grecque !" },
          { emoji: '🌵', title: "Le Sahara Marocain", text: "Le Maroc possède des dunes de sable spectaculaires dans sa partie sud. Les Touaregs et les Sahraouis vivaient de l'élevage de chameaux et du commerce caravanier.", fact: "Erg Chebbi, près de Merzouga, est le plus grand erg (champ de dunes) du Maroc. Les dunes peuvent atteindre 150 mètres de haut !" },
          { emoji: '🎨', title: "L'Art Amazigh", text: "Les Amazighs ont créé une langue, un alphabet, et un art unique. Les tapis berbères, les bijoux en argent et les tatouages au henné sont encore pratiques aujourd'hui.", fact: "L'alphabet tifinagh, utilisé par les Amazighs depuis 3000 ans, est encore enseigne dans les écoles marocaines !" },
          { emoji: '🫒', title: "L'Olivier", text: "Le Maroc est l'un des plus grands producteurs d'huile d'olive au monde. Les oliviers sont cultivés depuis l'Antiquité dans les vallées de l'Atlas.", fact: "Certains oliviers au Maroc ont plus de 2000 ans ! Ils étaient déjà vieux quand Jésus est ne." },
        ],
        quiz: [
          { q: "Que signifie 'Amazigh' ?", correct: "Homme libre", wrong1: "Guerrier du désert", wrong2: "Roi des montagnes", emoji: '🏔️' },
          { q: "Quel est le plus haut sommet du Maroc ?", correct: "Le Toubkal", wrong1: "Le Mont Fuji", wrong2: "Le Kilimanjaro", emoji: '⛰️' },
          { q: "Quel est l'alphabet des Amazighs ?", correct: "Le tifinagh", wrong1: "L'alphabet latin", wrong2: "L'alphabet arabe", emoji: '✍️' },
        ]
      },
      {
        id: 'ma_islam', era: '700 — 1500', title: "L'Islam et les Dynasties",
        subtitle: "Idrisides, Almoravides et Almohades",
        emoji: '🕌', color: '#1565C0', light: '#E3F2FD',
        intro: "En 788, Idriss I, descendant du prophète Mohammed, fonde la première dynastie islamique du Maroc et crée la ville de Fès. Pendant des siècles, des dynasties berbères vont se succéder et construire certains des plus beaux monuments du monde islamique.",
        figure: { name: "Idriss I", emoji: '🕌', desc: "Descendant du prophète Mohammed, il fuit la persécution à La Mecque et trouve refuge au Maroc. Il fonde la première dynastie islamique et bat la ville de Fès en 789." },
        cards: [
          { emoji: '🏙️', title: "Fès, la Ville Sainte", text: "Fondée en 789 par Idriss I, Fès est la plus ancienne ville médiévale du monde encore habitée. Sa médina (vieille ville) est classée au patrimoine mondial de l'UNESCO.", fact: "L'Université al-Qarawiyyin à Fès, fondée en 859, est la plus vieille université du monde encore en activité !" },
          { emoji: '⚔️', title: "Les Almoravides", text: "Au 11e siècle, les guerriers Almoravides (Berbères du Sahara) partent de Mauritanie, conquièrent le Maroc, puis toute l'Andalousie. Leur empire s'étend du Sénégal à Madrid !", fact: "Les Almoravides ont fondé la ville de Marrakech en 1062. Elle est devenue leur capitale et la capitale du Maroc aujourd'hui !" },
          { emoji: '🌍', title: "Ibn Battuta (1304-1368)", text: "Ce grand voyageur marocain a parcouru 120 000 km — de Tanger à la Chine, à l'Inde, et en Afrique subsaharienne. Il a tout écrit dans son livre 'Les Voyages'.", fact: "Ibn Battuta a voyage 3 fois plus loin que Marco Polo ! Son livre est la plus grande source sur le monde médiéval." },
          { emoji: '🎨', title: "L'Architecture Arabo-Andalouse", text: "Les artisans marocains créent un style architectural unique : zellige (carreaux de mosaïque), stuc sculpté, bois de cèdre sculpté. Ces arts sont toujours transmis aujourd'hui.", fact: "Les artisans de Fès sont les seuls au monde à fabriquer encore du zellige entièrement à la main !" },
        ],
        quiz: [
          { q: "Qui a fondé la ville de Fès ?", correct: "Idriss I", wrong1: "Ibn Battuta", wrong2: "Les Almoravides", emoji: '🏙️' },
          { q: "Quelle est la plus vieille université du monde encore en activité ?", correct: "Al-Qarawiyyin à Fès", wrong1: "Oxford en Angleterre", wrong2: "La Sorbonne à Paris", emoji: '🎓' },
          { q: "Combien de km Ibn Battuta a-t-il parcourus ?", correct: "120 000 km", wrong1: "10 000 km", wrong2: "1 000 km", emoji: '🌍' },
        ]
      },
      {
        id: 'ma_empire', era: '1500 — 1900', title: "L'Empire Chérifien",
        subtitle: "Sultans et corsaires",
        emoji: '⚓', color: '#1B5E20', light: '#E8F5E9',
        intro: "Aux 16e et 17e siècles, le Maroc est une grande puissance maritime. Ses corsaires (pirates) terrorisent la Méditerranée. Le Sultan Ahmad al-Mansour bat le Portugal à la bataille des Trois Rois et envoie une armée conquérir l'Empire Songhaï.",
        figure: { name: "Ahmad al-Mansour", emoji: '⚔️', desc: "Sultan de 1578 à 1603, il bat le Portugal à la bataille des Trois Rois et étend l'empire jusqu'en Afrique subsaharienne. Son titre 'al-Mansour' signifie 'le Victorieux'." },
        cards: [
          { emoji: '⚔️', title: "La Bataille des Trois Rois", text: "En 1578, le roi du Portugal envahit le Maroc. Le sultan Ahmad al-Mansour le bat complètement à Wadi al-Makhazin. Trois rois meurent dans cette bataille — d'où le nom !", fact: "Avec l'or et les esclaves ramenés de l'empire Songhaï, Ahmad al-Mansour se fit appeler 'al-Dhahabi' — le Doré !" },
          { emoji: '⚓', title: "Les Corsaires de Salé", text: "Les corsaires marocains de Salé terrorisaient toute la Méditerranée et même l'Atlantique. Ils attaquaient des navires de toute l'Europe et vendaient les prisonniers comme esclaves.", fact: "En 1627, des corsaires marocains ont attaqué l'Islande ! Ils ont emmené 400 islanders en esclavage au Maroc." },
          { emoji: '🫖', title: "Le The à la Menthe", text: "La tradition du the à la menthe arrive avec les Touaregs du Sahara. Elle devient le symbole de l'hospitalité marocaine. Servir le the est un art — il doit être versé de haut pour créer la mousse.", fact: "Au Maroc, le the se sert en trois verres : 'le premier est amer comme la vie, le deuxième est fort comme l'amour, le troisième est doux comme la mort'." },
        ],
        quiz: [
          { q: "Combien de rois sont morts à la Bataille des Trois Rois ?", correct: "Trois rois", wrong1: "Un roi", wrong2: "Cinq rois", emoji: '⚔️' },
          { q: "Que signifie 'al-Mansour' ?", correct: "Le Victorieux", wrong1: "Le Grand", wrong2: "L'Or", emoji: '👑' },
          { q: "De quelle ville venaient les corsaires marocains ?", correct: "Salé", wrong1: "Casablanca", wrong2: "Marrakech", emoji: '⚓' },
        ]
      },
      {
        id: 'ma_colonial', era: '1912 — 1956', title: "Le Protectorat Français",
        subtitle: "Résistance et Indépendance",
        emoji: '🦅', color: '#7B1FA2', light: '#F3E5F5',
        intro: "En 1912, la France impose un protectorat au Maroc. Le sultan Mohammed V refuse de coopérer et soutient le mouvement pour l'indépendance. En 1953, les Français l'exilent à Madagascar — une erreur qui accélère la révolte. Il revient en triomphe en 1955 et le Maroc devient indépendant en 1956.",
        figure: { name: "Mohammed V", emoji: '🦅', desc: "Sultan puis roi du Maroc, il refuse de soutenir les Français et défend son peuple. Exilé par les Français en 1953, il revient en 1955 et mène le Maroc à l'indépendance le 2 mars 1956." },
        cards: [
          { emoji: '🏳️', title: "Le Protectorat de 1912", text: "Le traité de Fès de 1912 fait du Maroc un 'protectorat' français — en réalité une colonie. La France garde le sultan mais contrôle tout : l'armée, les finances, les affaires étrangères.", fact: "L'Espagne aussi avait sa partie du Maroc ! Le nord et le sud étaient espagnols pendant que la France contrôlait le centre." },
          { emoji: '✊', title: "L'Istiqlal", text: "En 1944, le parti de l'Indépendance (Istiqlal) est fondé. Il réclame l'indépendance du Maroc. Mohammed V le soutient en refusant de signer les décrets français.", fact: "Mohammed V a déclaré publiquement : 'Nous ne pouvons pas séparer notre sort de celui de notre peuple.' Les Français l'ont exilé le lendemain." },
          { emoji: '🦅', title: "Le Retour du Roi", text: "L'exil de Mohammed V déclenche une révolte générale au Maroc. Les Français comprennent qu'ils ne peuvent pas maintenir leur pouvoir et le font revenir en novembre 1955. Le 2 mars 1956, le Maroc est indépendant.", fact: "Le 18 novembre, jour du retour de Mohammed V, est celebrate comme la Fête de l'Indépendance au Maroc !" },
        ],
        quiz: [
          { q: "En quelle année le Maroc obtient-il son indépendance ?", correct: "1956", wrong1: "1960", wrong2: "1948", emoji: '🦅' },
          { q: "Où Mohammed V a-t-il été exilé ?", correct: "À Madagascar", wrong1: "En France", wrong2: "En Angleterre", emoji: '✈️' },
          { q: "Qu'est-ce que l'Istiqlal ?", correct: "Le parti de l'indépendance", wrong1: "La capitale du Maroc", wrong2: "Un plat marocain", emoji: '✊' },
        ]
      },
      {
        id: 'ma_today', era: "Aujourd'hui", title: "Le Maroc Moderne",
        subtitle: "Entre tradition et modernité",
        emoji: '🌟', color: '#C62828', light: '#FFEBEE',
        intro: "Aujourd'hui, le Maroc est une monarchie constitutionnelle gouvernée par le roi Mohammed VI depuis 1999. Le pays est en plein essor économique, avec ses médinas médiévales, ses déserts de sable, ses plages de l'Atlantique et ses villes modernes.",
        figure: { name: "Mohammed VI", emoji: '👑', desc: "Roi du Maroc depuis 1999, il a lancé de grands projets de modernisation tout en préservant la culture et les traditions. Sous son règne, le Maroc est devenu la première destination touristique d'Afrique." },
        cards: [
          { emoji: '🏙️', title: "Casablanca", text: "La plus grande ville du Maroc et son poumon économique. La Mosquée Hassan II, construite sur la mer, est l'une des plus grandes mosquées du monde avec son minaret de 210 mètres.", fact: "Le film 'Casablanca' (1942) avec Humphrey Bogart n'a pas été tourne au Maroc mais à Hollywood !" },
          { emoji: '🍲', title: "Le Tajine", text: "Le tajine est le plat emblématique du Maroc. Viande ou légumes mijoter lentement dans un récipient conique en terre cuite. L'arganier, unique au Maroc, donne son huile prisée dans le monde entier.", fact: "L'huile d'argan est appelée 'l'or liquide du Maroc'. Elle est produite dans le sud du Maroc et vendue plus cher que l'huile d'olive !" },
          { emoji: '⚽', title: "Les Lions de l'Atlas", text: "L'équipe nationale de football du Maroc a atteint les demi-finales de la Coupe du Monde 2022 au Qatar — la meilleure performance d'une équipe africaine dans l'histoire !", fact: "Le Maroc a battu l'Espagne, le Portugal et la Belgique avant de perdre contre la France en demi-finale. Tout le continent africain les soutenait !" },
        ],
        quiz: [
          { q: "Quelle est la plus grande mosquée du Maroc ?", correct: "La Mosquée Hassan II", wrong1: "La Mosquée Al-Qarawiyyin", wrong2: "La Mosquée de Marrakech", emoji: '🕌' },
          { q: "Jusqu'où les Lions de l'Atlas sont-ils allés en 2022 ?", correct: "En demi-finale", wrong1: "En finale", wrong2: "En quart de finale", emoji: '⚽' },
          { q: "Comment appelle-t-on l'huile d'argan ?", correct: "L'or liquide du Maroc", wrong1: "Le the du désert", wrong2: "Le miel du Sahara", emoji: '🫒' },
        ]
      },
    ]
  },

  NG: {
    name: 'Nigeria', flag: '🇳🇬', region: 'africa',
    color: '#1B5E20', dark: '#0d3510', bg: '#E8F5E9',
    hero: { emoji: '👦🏿', name: 'Emeka', age: 9 },
    tagline: "Le Géant de l'Afrique",
    chapters: [
      {
        id: 'ng_nok', era: '500 av. J.-C. — 200 ap. J.-C.', title: "La Civilisation Nok",
        subtitle: "Les premiers artistes de l'Afrique",
        emoji: '🏺', color: '#E65100', light: '#FFF3E0',
        intro: "Il y a 2500 ans, la civilisation Nok florissait dans le centre du Nigeria. Ces peuples fabriquaient des sculptures en terre cuite d'une sophistication incroyable — les plus anciennes sculptures figuratives sub-sahariennes connues. Ils maîtrisaient aussi le travail du fer.",
        figure: { name: "L'Artiste Nok", emoji: '🏺', desc: "Les artisans Nok créaient des têtes en terre cuite avec des yeux triangulaires caractéristiques. On ne sait pas encore exactement pourquoi. Étaient-ce des portraits de rois ? Des objets rituels ?" },
        cards: [
          { emoji: '🏺', title: "Les Sculptures Nok", text: "Les sculptures en terre cuite Nok sont les plus vieilles sculptures figuratives d'Afrique sub-saharienne. Leurs yeux triangulaires percés sont immédiatement reconnaissables.", fact: "On a retrouvé des sculptures Nok dans une région grande comme la France ! Elles ont été datées entre 500 av. J.-C. et 200 ap. J.-C." },
          { emoji: '🔥', title: "La Maîtrise du Fer", text: "Les Nok étaient parmi les premiers peuples sub-sahariens à fondre le fer. Cette technique transforme leur agriculture et leur capacité de guerre.", fact: "La technologie du fer des Nok était aussi avancée que celle de l'Europe à la même époque !" },
          { emoji: '🌾', title: "L'Agriculture Avancée", text: "Les Nok cultivaient l'igname, le millet et le sorgho. Avec leurs outils en fer, ils pouvaient travailler des terres plus difficiles et nourrir de plus grandes populations.", fact: "L'igname est encore aujourd'hui l'aliment de base du Nigeria. Le pays produit 70% des ignames du monde entier !" },
        ],
        quiz: [
          { q: "Que fabriquaient les artisans Nok ?", correct: "Des sculptures en terre cuite", wrong1: "Des bijoux en or", wrong2: "Des tapisseries", emoji: '🏺' },
          { q: "Quelle technologie les Nok maîtrisaient-ils ?", correct: "Le travail du fer", wrong1: "La construction de pyramides", wrong2: "La navigation", emoji: '⚒️' },
          { q: "Quel aliment est originaire du Nigeria ?", correct: "L'igname", wrong1: "La pomme de terre", wrong2: "Le riz", emoji: '🌾' },
        ]
      },
      {
        id: 'ng_empires', era: '1000 — 1800', title: "Les Grands Royaumes",
        subtitle: "Bénin, Yoruba et Haoussa",
        emoji: '👑', color: '#B71C1C', light: '#FFEBEE',
        intro: "Le Nigeria médiéval est une mosaïque de royaumes puissants. Le Royaume du Bénin avec ses bronzes extraordinaires, les cités-états Yoruba avec leurs philosophies complexes, et les royaumes Haoussa musulmans du nord. Chacun a laissé une empreinte profonde.",
        figure: { name: "L'Oba du Bénin", emoji: '🦁', desc: "L'Oba (roi) du Royaume du Bénin était considéré comme divin. Ses artisans créaient des bronzes et des ivoires d'une beauté extraordinaire, parmi les plus grands chefs-d'œuvre de l'art mondial." },
        cards: [
          { emoji: '🦁', title: "Le Royaume du Bénin", text: "Fondé vers 900, il est connu pour ses bronzes exceptionnels qui ornaient le palais royal. Ses guerriers et ses marchands commerçaient avec les Portugais dès le 15e siècle.", fact: "En 1897, les Anglais ont saisi et emmené 3000 bronzes du Bénin. La lutte pour leur retour dure encore aujourd'hui !" },
          { emoji: '🏛️', title: "Île-Ife, la Cité Sainte", text: "Pour les Yoruba, Île-Ife est le centre spirituel du monde — là où les dieux ont créé l'humanité. La ville est un centre artistique majeur depuis 1000 ans.", fact: "Les Yoruba ont un système de religion très complexe avec 401 dieux (orishas). Ces dieux se retrouvent aussi au Brésil et aux Caraïbes apportés par les esclaves !" },
          { emoji: '📚', title: "Les Royaumes Haoussa", text: "Dans le nord du Nigeria, sept cités-états Haoussa (Kano, Katsina, Zaria...) deviennent des centres du commerce islamique et du savoir. Kano est fondée au 9e siècle.", fact: "Kano est l'une des plus vieilles villes habitées sans interruption de l'Afrique de l'Ouest. Elle existe depuis plus de 1000 ans !" },
          { emoji: '🫙', title: "L'Industrie du Cuivre", text: "Les artisans du Bénin fondaient le cuivre (laiton) en des plaques et des sculptures d'une précision incroyable. Ces bronzes enregistraient l'histoire du royaume.", fact: "La technique de la cire perdue utilisée par les artisans du Bénin est identique à celle utilisée dans la Grèce antique — peut-être une découverte indépendante !" },
        ],
        quiz: [
          { q: "Pourquoi le Royaume du Bénin est-il célèbre ?", correct: "Ses bronzes extraordinaires", wrong1: "Ses pyramides", wrong2: "Ses mines d'or", emoji: '🦁' },
          { q: "Quelle est la ville sainte des Yoruba ?", correct: "Île-Ife", wrong1: "Lagos", wrong2: "Abuja", emoji: '🏛️' },
          { q: "Combien de bronzes les Anglais ont-ils pris en 1897 ?", correct: "3000 bronzes", wrong1: "100 bronzes", wrong2: "10 000 bronzes", emoji: '🫙' },
        ]
      },
      {
        id: 'ng_colonial', era: '1800 — 1960', title: "La Colonisation Britannique",
        subtitle: "La création du Nigeria",
        emoji: '🏳️', color: '#1565C0', light: '#E3F2FD',
        intro: "Les Britanniques colonisent progressivement le Nigeria entre 1861 et 1914. En 1914, ils fusionnent arbitrairement des centaines de peuples différents en un seul pays qu'ils appellent 'Nigeria'. Cette union forcée aura des conséquences durables.",
        figure: { name: "Funmilayo Ransome-Kuti", emoji: '✊', desc: "Activiste et féministe nigériane, elle a dirigé des manifestations contre les taxes coloniales en 1947. Sa lutte a inspiré une génération entière de Nigérians." },
        cards: [
          { emoji: '🏳️', title: "La Création du Nigeria", text: "En 1914, le Gouverneur Frederick Lugard fusionne le Protectorat du Nord et le Protectorat du Sud pour créer le Nigeria. Le nom vient de 'River Niger Area'.", fact: "On dit que le nom 'Nigeria' a été inventé par la petite amie de Lugard, la journaliste Flora Shaw !" },
          { emoji: '⚫', title: "La Traite des Esclaves", text: "Le Nigeria a été l'une des régions les plus touchées par la traite transatlantique. Des millions de Nigérians ont été vendus comme esclaves aux Amériques entre le 16e et le 19e siècle.", fact: "On estime que 3,5 millions de Nigérians ont été vendus comme esclaves. La plupart sont allés au Brésil, aux Caraïbes et aux USA." },
          { emoji: '🎓', title: "L'Éducation Coloniale", text: "Les missionnaires britanniques créent des écoles. Une nouvelle élite nigériane émerge — instruite en anglais, elle va mener le combat pour l'indépendance.", fact: "Nnamdi Azikiwe, futur premier président du Nigeria, a fait ses études aux États-Unis. Il est revenu au Nigeria avec des idées de liberté !" },
        ],
        quiz: [
          { q: "En quelle année le Nigeria a-t-il été créé ?", correct: "1914", wrong1: "1960", wrong2: "1800", emoji: '🏳️' },
          { q: "Que signifie 'Nigeria' ?", correct: "La zone du fleuve Niger", wrong1: "Le pays noir", wrong2: "La terre des orishas", emoji: '🌊' },
          { q: "Combien de Nigérians ont été vendus comme esclaves ?", correct: "3,5 millions", wrong1: "100 personnes", wrong2: "10 millions", emoji: '⚫' },
        ]
      },
      {
        id: 'ng_independence', era: '1960 — 2000', title: "L'Indépendance et ses défis",
        subtitle: "Liberté, guerre civile et pétrole",
        emoji: '🌟', color: '#E65100', light: '#FFF3E0',
        intro: "Le 1er octobre 1960, le Nigeria devient indépendant. Mais la jeune nation fait face à des défis énormes : la guerre civile du Biafra (1967-1970), des coups d'état militaires à répétition, et la malédiction du pétrole qui enrichit quelques-uns mais appauvrit beaucoup.",
        figure: { name: "Wole Soyinka", emoji: '📚', desc: "Écrivain et poète nigérian, il est le premier Africain à avoir reçu le Prix Nobel de Littérature en 1986. Il a été emprisonné par la dictature militaire." },
        cards: [
          { emoji: '🌟', title: "L'Indépendance du 1er Octobre 1960", text: "Le Nigeria accède à l'indépendance le 1er octobre 1960, fête nationale. Nnamdi Azikiwe devient le premier président, Abubakar Tafawa Balewa le premier ministre.", fact: "Avec 45 millions d'habitants en 1960, le Nigeria était déjà le pays le plus peuple d'Afrique !" },
          { emoji: '⚔️', title: "La Guerre du Biafra", text: "En 1967, la région orientale du Nigeria, peuplée d'Igbo, proclame son indépendance sous le nom de Biafra. S'ensuit une guerre terrible de 3 ans. Un million de personnes meurent de famine.", fact: "Les images d'enfants affamés du Biafra ont choqué le monde et créé les premières grandes campagnes humanitaires internationales." },
          { emoji: '🛢️', title: "La Malédiction du Pétrole", text: "Le Nigeria est un des plus grands producteurs de pétrole en Afrique. Mais cet argent profite peu aux citoyens ordinaires. Le delta du Niger, région pétrolifère, est l'une des zones les plus polluées du monde.", fact: "Le Nigeria gagne des milliards de dollars de pétrole chaque année, mais 40% de la population vit avec moins de 1,90 dollar par jour." },
        ],
        quiz: [
          { q: "Quand le Nigeria a-t-il déclare son indépendance ?", correct: "1er octobre 1960", wrong1: "4 juillet 1776", wrong2: "22 septembre 1960", emoji: '🌟' },
          { q: "Comment s'appelait la région séparatiste du Nigeria en 1967 ?", correct: "Le Biafra", wrong1: "Le Lagos", wrong2: "Le Bénin", emoji: '⚔️' },
          { q: "Wole Soyinka a reçu quel prix en 1986 ?", correct: "Le Prix Nobel de Littérature", wrong1: "Le Prix Nobel de la Paix", wrong2: "Le Ballon d'Or", emoji: '📚' },
        ]
      },
      {
        id: 'ng_today', era: "Aujourd'hui", title: "Le Nigeria d'Aujourd'hui",
        subtitle: "Le Géant qui s'éveillé",
        emoji: '🦅', color: '#1B5E20', light: '#E8F5E9',
        intro: "Aujourd'hui le Nigeria est la 1ère économie d'Afrique avec 220 millions d'habitants. Nollywood (son cinéma) est le 2e plus productif au monde. L'Afrobeats conquiert la planète. Et des entrepreneurs nigérians créent des start-ups qui changent l'Afrique.",
        figure: { name: "Burna Boy", emoji: '🎵', desc: "Artiste Afrobeats, il a remporté un Grammy Award en 2021. Il incarne la nouvelle génération nigériane qui conquiert le monde avec sa musique." },
        cards: [
          { emoji: '🎬', title: "Nollywood", text: "L'industrie cinématographique nigériane est la 2e plus productive au monde après Bollywood (Inde), avant Hollywood (USA). Elle produit plus de 2000 films par an !", fact: "Les films Nollywood sont regardés dans toute l'Afrique et dans la diaspora. Les acteurs nigérians sont des stars dans toute l'Afrique !" },
          { emoji: '🎵', title: "L'Afrobeats", text: "La musique nigériane est devenue un phénomène mondial. Des artistes comme Burna Boy, Wizkid et Davido jouent dans les plus grands stades du monde et collaborent avec les plus grandes stars américaines.", fact: "Wizkid a chanté avec Beyoncé sur le film 'Black is King'. L'Afrobeats est maintenant écoute dans 150 pays !" },
          { emoji: '💻', title: "Les Entrepreneurs", text: "Lagos est devenu l'un des plus grands hubs de start-ups d'Afrique. Des entreprises tech nigérianes comme Paystack et Flutterwave changent les systèmes de paiement de tout le continent.", fact: "Paystack a été rachetée par Stripe pour 200 millions de dollars — la plus grande acquisition tech en Afrique de l'histoire !" },
        ],
        quiz: [
          { q: "Quelle est la position de Nollywood dans le monde ?", correct: "2e après Bollywood", wrong1: "1er devant Hollywood", wrong2: "10e dans le monde", emoji: '🎬' },
          { q: "Quelle musique nigériane conquiert le monde ?", correct: "L'Afrobeats", wrong1: "Le jazz", wrong2: "Le reggae", emoji: '🎵' },
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
    tagline: "Des Gaulois à la République",
    chapters: [
      {
        id: 'fr_gaul', era: 'Avant 52 av. J.-C.', title: "La Gaule et les Gaulois",
        subtitle: "Nos ancêtres les Gaulois",
        emoji: '⚔️', color: '#5D4037', light: '#EFEBE9',
        intro: "Bien avant la France, le territoire était habité par les Gaulois — des peuples celtes arrivés vers 600 av. J.-C. Ils vivaient dans des villages fortifiés, maîtrisaient le fer et l'agriculture, et avaient leur propre religion avec les druides.",
        figure: { name: "Vercingétorix", emoji: '⚔️', desc: "Chef gaulois arverne, il unit les tribus gauloises contre Jules César en 52 av. J.-C. Il remporte la bataille de Gergovie mais est finalement vaincu à Alésia. Il est le premier héros national français." },
        cards: [
          { emoji: '🐗', title: "Les Gaulois", text: "Les Gaulois étaient divisés en plus de 60 tribus différentes. Ils cultivaient le blé, élevaient des cochons, et étaient d'excellents métallurgistes. Leurs bijoux en or sont dans les musées du monde entier.", fact: "C'est vrai que les Gaulois portaient des moustaches, mais pas de casques avec des ailes ! C'est une invention des dessinateurs du 19e siècle." },
          { emoji: '🌿', title: "Les Druides", text: "Les druides étaient les prêtres gaulois. Ils connaissaient les plantes médicinales, rendaient la justice et gardaient le savoir. Leur formation durait 20 ans ! Ils n'écrivaient rien — tout était mémorisé.", fact: "Les druides faisaient leurs cérémonies dans des forêts de chênes sacrés. Le gui du chêne était leur plante la plus précieuse." },
          { emoji: '⚔️', title: "Vercingétorix", text: "En 52 av. J.-C., Vercingétorix unit les tribus contre Jules César. Après sa défaite à Alésia, il se rend à César et est emmené à Rome. Il y sera emprisonné 6 ans avant d'être exécuté.", fact: "Jules César a écrit lui-même le récit de la conquête de la Gaule dans 'La Guerre des Gaules'. C'est l'un des premiers best-sellers de l'histoire !" },
          { emoji: '🏛️', title: "La Gaule Romaine", text: "Après leur conquête, les Romains construisent des routes, des aqueducs, des amphithéâtres dans toute la Gaule. La langue latine (ancêtre du français), le droit romain, et l'architecture transforment le territoire.", fact: "La ville de Lyon (Lugdunum) était la capitale de la Gaule romaine, plus importante que Paris à l'époque !" },
        ],
        quiz: [
          { q: "Comment s'appellent les peuples qui habitaient la France avant les Romains ?", correct: "Les Gaulois", wrong1: "Les Vikings", wrong2: "Les Francs", emoji: '⚔️' },
          { q: "Quel était le rôle des druides ?", correct: "Prêtres et gardiens du savoir", wrong1: "Guerriers d'élite", wrong2: "Marchands", emoji: '🌿' },
          { q: "Qui a écrit le récit de la conquête de la Gaule ?", correct: "Jules César", wrong1: "Vercingétorix", wrong2: "Napoléon", emoji: '📚' },
        ]
      },
      {
        id: 'fr_medieval', era: '500 — 1400', title: "Le Moyen Âge",
        subtitle: "Francs, Chevaliers et Cathédrales",
        emoji: '🏰', color: '#7B1FA2', light: '#F3E5F5',
        intro: "Après la chute de Rome, les Francs dominent la Gaule. Charlemagne fonde le premier Empire d'Occident en 800. Au Moyen Âge, la France construit ses plus belles cathédrales gothiques et produit ses premières grandes figures historiques.",
        figure: { name: "Jeanne d'Arc", emoji: '⚔️', desc: "Jeune paysanne de 17 ans qui affirme entendre des voix de saints lui ordonnant de délivrer la France des Anglais. Elle est brûlee à Rouen en 1431. Elle est aujourd'hui la sainte patronne de la France." },
        cards: [
          { emoji: '👑', title: "Charlemagne", text: "En 800, le pape couronne Charlemagne 'Empereur des Romains' à Rome. Il fait de l'éducation une priorité, impose l'écriture carolingienne, et fonde l'Empire qui deviendra la France, l'Allemagne et l'Italie.", fact: "Charlemagne ne savait pas lire ! Il a appris très tard et dormait avec une ardoise sous son oreiller pour s'exercer." },
          { emoji: '⚔️', title: "Jeanne d'Arc", text: "En 1429, Jeanne d'Arc convainc le roi Charles VII de la laisser mener l'armée. Elle délivre Orléans et fait couronner le roi. Capturée par les Anglais, elle est jugée pour hérésie et brûlee à 19 ans.", fact: "Jeanne d'Arc a été réhabilitée 25 ans après sa mort. En 1920, elle est déclarée sainte par l'Église catholique." },
          { emoji: '⛪', title: "Les Cathédrales", text: "Au 12e et 13e siècles, les Français construisent les plus belles cathédrales gothiques du monde : Notre-Dame de Paris, Chartres, Reims. Ces édifices étaient la plus haute technologie de l'époque.", fact: "Notre-Dame de Paris a pris 182 ans à construire (1163-1345). Les ouvriers qui ont posé les premières pierres ne l'ont jamais vue terminée." },
        ],
        quiz: [
          { q: "Quand Charlemagne a-t-il été couronné Empereur ?", correct: "En 800", wrong1: "En 1066", wrong2: "En 1200", emoji: '👑' },
          { q: "Quelle ville Jeanne d'Arc a-t-elle délivrée ?", correct: "Orléans", wrong1: "Paris", wrong2: "Lyon", emoji: '⚔️' },
          { q: "Combien d'années a-t-il fallu pour construire Notre-Dame ?", correct: "182 ans", wrong1: "10 ans", wrong2: "500 ans", emoji: '⛪' },
        ]
      },
      {
        id: 'fr_revolution', era: '1789 — 1815', title: "La Révolution",
        subtitle: "Liberté, Égalité, Fraternité",
        emoji: '🔥', color: '#B71C1C', light: '#FFEBEE',
        intro: "En 1789, le peuple français se révolte contre la monarchie et les inégalités. La Révolution française change la France et le monde. Pour la première fois, un pays déclare que tous les hommes sont égaux. Mais la révolution tourne au bain de sang avant que Napoléon n'émerge.",
        figure: { name: "Napoléon Bonaparte", emoji: '🎖️', desc: "Général corse, il profite du chaos de la Révolution pour prendre le pouvoir en 1799. Il réforme la France (Code Napoléon, lycées, préfectures) et conquit presque toute l'Europe avant d'être exilé." },
        cards: [
          { emoji: '🔥', title: "La Prise de la Bastille", text: "Le 14 juillet 1789, le peuple de Paris prend d'assaut la prison de la Bastille, symbole du pouvoir royal. C'est le début de la Révolution. Le 14 juillet est aujourd'hui la fête nationale française.", fact: "Il n'y avait que 7 prisonniers dans la Bastille quand le peuple l'a prise ! Mais c'était le symbole de l'oppression royale." },
          { emoji: '✂️', title: "La Guillotine", text: "La guillotine est inventée pour exécuter de manière 'égalitaire' — nobles et pauvres auraient la même mort. Le roi Louis XVI et la reine Marie-Antoinette sont guillotinés en 1793.", fact: "La guillotine a été utilisée en France jusqu'en 1977 ! La dernière exécution a eu lieu deux ans avant l'abolition de la peine de mort en 1981." },
          { emoji: '🎖️', title: "Napoléon Bonaparte", text: "Général de génie, il devient Consul puis Empereur. Il réforme complètement la France : le Code civil, le baccalauréat, la Banque de France, les préfectures. Son Code Napoléon inspiré encore les lois de 40 pays.", fact: "Napoléon mesurait 1m68 — la taille moyenne en France à l'époque. Sa petite taille est une légende inventée par les Anglais pour se moquer de lui !" },
        ],
        quiz: [
          { q: "Quand a eu lieu la prise de la Bastille ?", correct: "14 juillet 1789", wrong1: "1er janvier 1800", wrong2: "22 septembre 1792", emoji: '🔥' },
          { q: "Combien de prisonniers y avait-il dans la Bastille ?", correct: "7 prisonniers", wrong1: "1000 prisonniers", wrong2: "100 prisonniers", emoji: '✂️' },
          { q: "Qu'est-ce que le Code Napoléon ?", correct: "Un code de lois qui inspiré 40 pays", wrong1: "Un livre de stratégies militaires", wrong2: "Un code secret de l'armée", emoji: '📚' },
        ]
      },
      {
        id: 'fr_colonial', era: '1830 — 1962', title: "L'Empire Colonial",
        subtitle: "Le second empire le plus grand",
        emoji: '🌍', color: '#1565C0', light: '#E3F2FD',
        intro: "Entre 1830 et 1930, la France construit le deuxième plus grand empire colonial de l'histoire, après la Grande-Bretagne. Elle colonisé l'Algérie, le Maroc, la Tunisie, le Sénégal, le Mali, la Côte d'Ivoire, le Vietnam, le Cambodge et bien d'autres territoires.",
        figure: { name: "Toussaint Louverture", emoji: '✊', desc: "Leader de la Révolution haïtienne (1791-1804), il a mené les esclaves de Saint-Domingue (Haïti) à la liberté contre la France. Haïti devient la première république noire libre du monde." },
        cards: [
          { emoji: '🌍', title: "L'Empire Français", text: "À son apogée en 1920, l'empire français couvrait 12 millions de km2 et comptait 100 millions d'habitants. La France gouvernait des peuples en Afrique, en Asie, dans le Pacifique et aux Amériques.", fact: "L'empire français était 20 fois plus grand que la France métropolitaine !" },
          { emoji: '✊', title: "Les Résistances", text: "Partout dans l'empire, les peuples colonisés ont résisté. En Algérie, Abd el-Kader a combattu 15 ans. À Madagascar, les Malgaches se sont révoltés en 1947. Au Vietnam, Hô Chi Minh a finalement battu la France en 1954.", fact: "La Bataille de Diên Bien Phu en 1954 est la première fois dans l'histoire qu'une puissance coloniale asiatique bat militairement une puissance européenne." },
          { emoji: '🤝', title: "La Décolonisation", text: "Entre 1956 et 1962, presque tous les pays africains colonisés par la France obtiennent leur indépendance. Les Français parlent de 'décolonisation'. Les Africains parlent de libération.", fact: "Le Général de Gaulle a accordé l'indépendance à 14 pays africains en une seule année (1960). C'est pourquoi 1960 est appelée 'l'année de l'Afrique'." },
        ],
        quiz: [
          { q: "Quelle était la superficie de l'empire français au maximum ?", correct: "12 millions de km2", wrong1: "1 million de km2", wrong2: "50 millions de km2", emoji: '🌍' },
          { q: "Qui était le leader de la Révolution haïtienne ?", correct: "Toussaint Louverture", wrong1: "Napoléon Bonaparte", wrong2: "Simón Bolívar", emoji: '✊' },
          { q: "Comment appelle-t-on l'année 1960 pour l'Afrique ?", correct: "L'année de l'Afrique", wrong1: "L'année de la Libération", wrong2: "L'année de la Paix", emoji: '🌍' },
        ]
      },
      {
        id: 'fr_today', era: "Aujourd'hui", title: "La France Moderne",
        subtitle: "République, culture et diversité",
        emoji: '🗼', color: '#0D47A1', light: '#E3F2FD',
        intro: "Aujourd'hui la France est la 7e puissance économique mondiale, membre fondateur de l'Union Européenne, et membre permanent du Conseil de Sécurité de l'ONU. Sa culture — gastronomie, mode, art, cinéma — rayonne dans le monde entier.",
        figure: { name: "Simone Veil", emoji: '⚖️', desc: "Survivante de la Shoah, elle est devenue ministre de la Santé et a fait voter en 1975 la loi sur l'IVG. Symbol de courage, elle a été la première femme élue au Panthéon pour ses propres actions." },
        cards: [
          { emoji: '🗼', title: "Paris, Ville Lumière", text: "Paris est la ville la plus visitée au monde avec 30 millions de touristes par an. La Tour Eiffel, le Louvre, Versailles, les Champs-Élysées... chaque monument est connu dans le monde entier.", fact: "La Tour Eiffel est repeinte toutes les 7 ans. Il faut 60 tonnes de peinture et 25 peintres alpinistes pendant 18 mois !" },
          { emoji: '🧀', title: "La Gastronomie", text: "La cuisine française est inscrite au Patrimoine Culturel de l'UNESCO. La France a le plus grand nombre d'étoiles Michelin au monde. Croissants, baguettes, fromages, vins... l'alimentation française est un art.", fact: "La France est le pays qui consommé le plus de fromage par habitant au monde. Chaque Français en mange 28 kg par an !" },
          { emoji: '⚽', title: "Les Bleus", text: "L'équipe de France a remporté la Coupe du Monde en 1998 et 2018. En 2018, avec Mbappé, Pogba et Griezmann, les Bleus ont bat la Croatie 4-2 en finale.", fact: "Lors de la finale 2018, les Bleus étaient représentés par des joueurs dont les parents venaient de 20 pays différents. C'est la force de la France !" },
        ],
        quiz: [
          { q: "Combien de touristes Paris accueille-t-elle chaque année ?", correct: "30 millions", wrong1: "1 million", wrong2: "100 millions", emoji: '🗼' },
          { q: "Combien de kg de fromage chaque Français mange-t-il par an ?", correct: "28 kg", wrong1: "1 kg", wrong2: "100 kg", emoji: '🧀' },
          { q: "En quelles années la France a-t-elle gagne la Coupe du Monde ?", correct: "1998 et 2018", wrong1: "1966 et 1990", wrong2: "2002 et 2010", emoji: '⚽' },
        ]
      },
    ]
  },

  DE: {
    name: 'Allemagne', flag: '🇩🇪', region: 'europe',
    color: '#B71C1C', dark: '#7f1313', bg: '#FFEBEE',
    hero: { emoji: '👦🏼', name: 'Max', age: 8 },
    tagline: "Des tribus germaniques à la réunion",
    chapters: [
      {
        id: 'de_germanic', era: 'Avant 800', title: "Les Tribus Germaniques",
        subtitle: "Les peuples de la forêt",
        emoji: '🌲', color: '#2E7D32', light: '#E8F5E9',
        intro: "Avant l'Allemagne, le territoire était habité par des tribus germaniques : les Francs, les Saxons, les Visigoths, les Lombards... Ces peuples vivaient dans les grandes forêts d'Europe centrale et résistaient avec succès à l'Empire Romain.",
        figure: { name: "Arminius (Hermann)", emoji: '🌲', desc: "Chef de la tribu des Chérusques, il tend une embuscade aux légions romaines dans la Forêt de Teutoburg en 9 ap. J.-C. Il détruit 3 légions et arrête l'expansion romaine en Germanie." },
        cards: [
          { emoji: '🌲', title: "La Forêt de Teutoburg", text: "En 9 ap. J.-C., le chef germain Arminius attire 3 légions romaines dans une embuscade dans la forêt. Les Romains sont massacres. Auguste pleure : 'Varus, rends-moi mes légions !'", fact: "Cette bataille a changé l'histoire ! Sans cette victoire, toute l'Allemagne serait devenue romaine et parlerait peut-être latin aujourd'hui." },
          { emoji: '⚒️', title: "La Maîtrise du Fer", text: "Les Germaniques étaient d'excellents forgeons. Leurs épées étaient souvent meilleures que les épées romaines. Ils exportaient des armes à travers toute l'Europe.", fact: "Le mot 'épée' vient du vieux germanique 'swerd'. Les Germaniques ont donné beaucoup de mots aux langues européennes !" },
          { emoji: '🏰', title: "Le Saint-Empire Romain", text: "En 800, Charlemagne fonde l'Empire carolingien. Ses successeurs créent le Saint-Empire Romain Germanique (962-1806) — une confédération de centaines de principautés qui couvrait l'Europe centrale.", fact: "Le Saint-Empire n'était ni saint, ni romain, ni germanique selon le philosophe Voltaire — il était trop divisé pour être vraiment unifié !" },
        ],
        quiz: [
          { q: "Qu'a fait Arminius en 9 ap. J.-C. ?", correct: "Détruit 3 légions romaines dans une embuscade", wrong1: "A fondé la ville de Berlin", wrong2: "Battu les Francs", emoji: '🌲' },
          { q: "Qui a fondé l'Empire carolingien en 800 ?", correct: "Charlemagne", wrong1: "Arminius", wrong2: "Guillaume Ier", emoji: '👑' },
          { q: "Comment s'appelait l'empire allemand médiéval ?", correct: "Le Saint-Empire Romain Germanique", wrong1: "Le Royaume de Prusse", wrong2: "L'Empire Germain", emoji: '🏰' },
        ]
      },
      {
        id: 'de_reformation', era: '1517 — 1648', title: "La Réformation",
        subtitle: "Luther et la division du christianisme",
        emoji: '📖', color: '#7B1FA2', light: '#F3E5F5',
        intro: "En 1517, un moine allemand nommé Martin Luther afficha 95 thèses sur la porte d'une église à Wittenberg, remettant en cause l'autorité du pape. Cette protestation déclenche la Réformation protestante et divise le christianisme en deux, changeant pour toujours l'Europe.",
        figure: { name: "Martin Luther", emoji: '📖', desc: "Moine et théologien, il affiche ses 95 thèses en 1517 pour contester les abus de l'Église catholique. Excommunié, il traduit la Bible en allemand, créant une langue allemande standardisée." },
        cards: [
          { emoji: '📖', title: "Martin Luther", text: "En 1517, Luther affiche ses 95 thèses à Wittenberg. Il refuse de les retirer et est excommunié par le pape. Il traduit la Bible en allemand afin que tous puissent la lire — pas seulement les prêtres.", fact: "La traduction de la Bible par Luther a standardisé la langue allemande. Avant lui, il y avait des dizaines de dialectes très différents !" },
          { emoji: '📰', title: "L'Invention de l'Imprimerie", text: "Quelques décennies avant Luther, Gutenberg (Mayence, 1450) invente l'imprimerie à caractères mobiles. Les idées de Luther se répandent à une vitesse incroyable grâce à la presse.", fact: "En 1500, il y avait 20 millions de livres en Europe. En 1600, il y en avait 200 millions ! L'imprimerie c'est comme internet au 15e siècle." },
          { emoji: '⚔️', title: "La Guerre de Trente Ans", text: "De 1618 à 1648, l'Europe est ravagée par une guerre de religion entre catholiques et protestants. L'Allemagne perd le tiers de sa population. La Paix de Westphalie crée le système moderne des États-nations.", fact: "La Guerre de Trente Ans est la plus meurtrière de l'histoire européenne avant la 1ère Guerre Mondiale. L'Allemagne met 150 ans à se repeupler." },
        ],
        quiz: [
          { q: "Où Martin Luther a-t-il affiche ses 95 thèses ?", correct: "À Wittenberg", wrong1: "À Berlin", wrong2: "À Rome", emoji: '📖' },
          { q: "Qui a inventé l'imprimerie ?", correct: "Gutenberg", wrong1: "Luther", wrong2: "Charlemagne", emoji: '📰' },
          { q: "Combien d'années a duré la Guerre de Trente Ans ?", correct: "30 ans (1618-1648)", wrong1: "100 ans", wrong2: "10 ans", emoji: '⚔️' },
        ]
      },
      {
        id: 'de_unification', era: '1800 — 1918', title: "L'Unification et la Guerre",
        subtitle: "Bismarck, Kaiser et la Grande Guerre",
        emoji: '🦅', color: '#1565C0', light: '#E3F2FD',
        intro: "En 1871, Bismarck unifie les states germaniques en un seul Empire Allemand sous le Kaiser Guillaume Ier. L'Allemagne devient la première puissance industrielle d'Europe. Mais le nationalisme et les rivalités entre empires mènent à la catastrophe de la Première Guerre Mondiale.",
        figure: { name: "Otto von Bismarck", emoji: '🦅', desc: "Premier ministre de Prusse, il unifie les états germaniques par la diplomatie et la guerre ('fer et sang'). En 1871, il crée l'Empire Allemand et devient son premier chancelier." },
        cards: [
          { emoji: '🦅', title: "L'Unification en 1871", text: "Otto von Bismarck unifie 39 états germaniques en un seul Empire. La proclamation a lieu dans le palais de Versailles, en France, après la victoire sur Napoléon III. L'Allemagne est la nouvelle grande puissance d'Europe.", fact: "La proclamation de l'Empire allemand dans la Galerie des Glaces de Versailles (chez les Français !) était intentionnellement humiliante pour la France !" },
          { emoji: '🏭', title: "La Révolution Industrielle", text: "L'Allemagne du 19e siècle devient la première puissance industrielle d'Europe. Krupp produit des aciers, Bayer invente l'aspirine, Mercedes et Benz inventent l'automobile.", fact: "L'inventeur de la voiture à moteur (Karl Benz, 1885) était Allemand ! Sans lui, pas de voitures aujourd'hui." },
          { emoji: '💥', title: "La Première Guerre Mondiale", text: "En 1914, l'assassinat d'un prince autrichien déclenche une guerre mondiale qui dure 4 ans. 20 millions de morts. L'Allemagne est vaincue en 1918. Le traité de Versailles lui impose des conditions humiliantes.", fact: "Les tranchées de la Première Guerre Mondiale s'étendaient sur 750 km de la Belgique à la Suisse. Les soldats y vivaient dans des conditions terribles." },
        ],
        quiz: [
          { q: "Qui a unifié l'Allemagne en 1871 ?", correct: "Otto von Bismarck", wrong1: "Kaiser Wilhelm", wrong2: "Martin Luther", emoji: '🦅' },
          { q: "Où a été proclamé l'Empire allemand ?", correct: "Dans le palais de Versailles en France", wrong1: "À Berlin", wrong2: "À Munich", emoji: '🏰' },
          { q: "Qui a inventé la voiture à moteur en 1885 ?", correct: "Karl Benz", wrong1: "Henry Ford", wrong2: "Napoléon", emoji: '🚗' },
        ]
      },
      {
        id: 'de_ww2', era: '1933 — 1945', title: "La Seconde Guerre Mondiale",
        subtitle: "Hitler, la Shoah et la défaite",
        emoji: '💔', color: '#37474F', light: '#ECEFF1',
        intro: "En 1933, Adolf Hitler prend le pouvoir. Son régime nazi persécute les Juifs, les Roms, les handicapés et ses opposants. Il déclenche la Seconde Guerre Mondiale en 1939. Pendant la guerre, 6 millions de Juifs sont exterminés — la Shoah. En 1945, l'Allemagne est vaincue et divisée.",
        figure: { name: "Sophie Scholl", emoji: '🌹', desc: "Étudiante de 21 ans, elle distribuait des tracts contre le régime nazi avec son frère Hans. Arrêtée en 1943, elle est exécutée. Elle est le symbole de la résistance allemande contre Hitler." },
        cards: [
          { emoji: '🌹', title: "La Résistance", text: "Même sous la dictature nazie, certains Allemands ont risque leur vie pour résister. Sophie Scholl, Claus von Stauffenberg (qui a tente de tuer Hitler) et des milliers d'autres sont morts pour leurs convictions.", fact: "Sophie Scholl avait 21 ans quand elle a été exécutée. Sa dernière phrase était : 'Le soleil brille encore'." },
          { emoji: '💔', title: "La Shoah", text: "Le régime nazi a systématiquement exterminé 6 millions de Juifs européens dans des camps de concentration et d'extermination. C'est l'un des crimes les plus terribles de l'histoire humaine.", fact: "Le mot 'Shoah' signifie 'catastrophe' en hébreu. Il y avait 9 millions de Juifs en Europe en 1933. Les deux tiers ont été tués." },
          { emoji: '🧱', title: "La Chute du Mur de Berlin", text: "Après 1945, l'Allemagne est divisée en deux : l'Ouest (démocratie) et l'Est (communisme). En 1961, un mur est construit à Berlin pour empêcher les Allemands de l'Est de fuir. Il tombe enfin le 9 novembre 1989.", fact: "Des milliers de personnes ont essayé de traverser le Mur de Berlin. 140 ont été tuées. Le mur est tombe sans un seul coup de feu !" },
        ],
        quiz: [
          { q: "Combien de Juifs ont été tués pendant la Shoah ?", correct: "6 millions", wrong1: "1000 personnes", wrong2: "100 000", emoji: '💔' },
          { q: "Quel âge avait Sophie Scholl quand elle a été exécutée ?", correct: "21 ans", wrong1: "50 ans", wrong2: "15 ans", emoji: '🌹' },
          { q: "Quand le Mur de Berlin est-il tombe ?", correct: "9 novembre 1989", wrong1: "9 novembre 1961", wrong2: "1er janvier 2000", emoji: '🧱' },
        ]
      },
      {
        id: 'de_today', era: "Aujourd'hui", title: "L'Allemagne Réunifiée",
        subtitle: "Première puissance d'Europe",
        emoji: '🌟', color: '#1B5E20', light: '#E8F5E9',
        intro: "Depuis la réunion en 1990, l'Allemagne est devenue la première puissance économique d'Europe et la quatrième mondiale. Berlin est l'une des capitales culturelles les plus dynamiques du monde. L'Allemagne accueille des millions d'immigrés qui contribuent à sa richesse.",
        figure: { name: "Angela Merkel", emoji: '🌟', desc: "Chancelière de 2005 à 2021, elle est la femme la plus puissante du monde selon Forbes pendant 16 ans. Physicienne de formation, elle a gouverné l'Allemagne et l'Europe avec calme et méthode." },
        cards: [
          { emoji: '🚗', title: "L'Industrie Allemande", text: "L'Allemagne est le 3e exportateur mondial. Ses voitures (BMW, Mercedes, Volkswagen, Porsche), ses machines et ses produits chimiques sont vendus dans le monde entier. 'Made in Germany' est un gage de qualité.", fact: "1 voiture sur 5 vendue dans le monde est une marque allemande ! L'industrie automobile emploie 800 000 personnes en Allemagne." },
          { emoji: '⚽', title: "Le Football Allemand", text: "L'Allemagne est l'une des nations les plus titrées en football : 4 fois championne du monde (1954, 1974, 1990, 2014). La Bundesliga est l'une des meilleures ligues du monde.", fact: "L'Allemagne est le seul pays à avoir gagné la Coupe du Monde en Europe et en Amérique du Sud !" },
          { emoji: '🌍', title: "L'Allemagne et les Immigrés", text: "L'Allemagne accueille la plus grande communauté turque hors de Turquie. Des millions de familles africaines, arabes et européennes y vivent. Mesut Özil, Sami Khedira... la diversité fait la force de l'Allemagne.", fact: "En 2015, l'Allemagne a accueilli 1 million de réfugiés syriens. Angela Merkel a dit : 'Wir schaffen das' (On va y arriver) !" },
        ],
        quiz: [
          { q: "Combien de fois l'Allemagne a-t-elle gagne la Coupe du Monde ?", correct: "4 fois", wrong1: "2 fois", wrong2: "7 fois", emoji: '⚽' },
          { q: "Que signifie 'Made in Germany' ?", correct: "Fabriqué en Allemagne avec qualité", wrong1: "Fabriqué dans l'armée", wrong2: "Produit chimique", emoji: '🏭' },
          { q: "Que disait Angela Merkel sur les réfugiés ?", correct: "Wir schaffen das — On va y arriver", wrong1: "Nein — Non", wrong2: "Deutschland über allés", emoji: '🌍' },
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
    tagline: "Des samouraïs à la technologie",
    chapters: [
      {
        id: 'jp_ancient', era: 'Avant 600', title: "Le Japon Ancien",
        subtitle: "Les Jomon, les Yayoi et les premiers clans",
        emoji: '⛩️', color: '#5D4037', light: '#EFEBE9',
        intro: "Le Japon est habité depuis 30 000 ans. Les premiers Japonais (Jomon) étaient des chasseurs-cueilleurs. Vers 300 av. J.-C., un nouveau peuple (Yayoi) arrive et apporte la riziculture. Ces peuples mélangent leurs cultures pour créer la civilisation japonaise.",
        figure: { name: "La Déesse Amaterasu", emoji: '☀️', desc: "Dans la mythologie japonaise, Amaterasu est la déesse du soleil et l'ancêtre de la famille impériale. Les Japonais considèrent leur empereur comme son descendant." },
        cards: [
          { emoji: '🍶', title: "Le Riz et la Riziculture", text: "Vers 300 av. J.-C., les Yayoi apportent la culture du riz en paddies (champs inondés). Cette révolution agricole permet de nourrir des populations bien plus grandes.", fact: "Le Japon mange du riz depuis 2300 ans ! Le mot japonais pour 'repas' (gohan) signifie aussi 'riz cuit'." },
          { emoji: '⛩️', title: "Le Shinto", text: "Le Shinto est la religion originale du Japon. Elle voit des esprits (kami) dans tous les éléments de la nature : les arbres, les montagnes, les rivières. Les sanctuaires shinto sont encore visites par des millions de Japonais.", fact: "Il y a 80 000 sanctuaires shinto au Japon ! Plus que de supermarchés dans beaucoup de pays." },
          { emoji: '🏯', title: "Les Premiers Clans", text: "Le Japon est d'abord divisé en clans qui se font la guerre. Le clan Yamato s'impose progressivement et fonde la dynastie impériale qui existe encore aujourd'hui — la plus ancienne famille royale du monde.", fact: "La famille impériale japonaise gouverne depuis 2600 ans sans interruption. L'actuel empereur Naruhito est monte sur le Trône du Chrysanthème en 2019." },
        ],
        quiz: [
          { q: "Quel peuple a apporté la riziculture au Japon ?", correct: "Les Yayoi", wrong1: "Les Jomon", wrong2: "Les Samouraï", emoji: '🍶' },
          { q: "Comment appelle-t-on les esprits de la nature dans le Shinto ?", correct: "Les kami", wrong1: "Les ninja", wrong2: "Les shogun", emoji: '⛩️' },
          { q: "Depuis combien d'ans la famille impériale japonaise gouverne-t-elle ?", correct: "2600 ans", wrong1: "100 ans", wrong2: "500 ans", emoji: '👑' },
        ]
      },
      {
        id: 'jp_samurai', era: '1185 — 1868', title: "L'Ère des Samouraï",
        subtitle: "Bushido, Shogun et Katana",
        emoji: '⚔️', color: '#B71C1C', light: '#FFEBEE',
        intro: "À partir de 1185, le Japon est gouverné non par l'Empereur mais par les Shogun — des militaires qui détiennent le vrai pouvoir. L'ère des samouraïs dure 700 ans. Ces guerriers suivent un code d'honneur strict (Bushido) et sont les maîtres du combat.",
        figure: { name: "Miyamoto Musashi", emoji: '⚔️', desc: "Le plus grand samouraï de l'histoire, il n'a jamais perdu un duel. Il a écrit 'Le Livre des Cinq Anneaux', un traité de stratégie encore enseigne dans les écoles de gestion aujourd'hui." },
        cards: [
          { emoji: '⚔️', title: "Les Samouraï", text: "Les samouraïs sont les guerriers nobles du Japon. Ils servent leur seigneur (daimyo) avec une fidélité absolue. Leur arme principale, le katana (sabre), est considérée comme une œuvre d'art.", fact: "Un bon katana était forge pendant 15 jours et pouvait couper une balle en deux ! Les meilleures lames japonaises sont considérées comme les meilleures au monde." },
          { emoji: '📜', title: "Le Bushido", text: "Le Bushido est le 'code du guerrier' samouraï. Il valorise l'honneur, le courage, la loyauté, la droiture et la maîtrise de soi. Plutôt que de se rendre ou d'être capturé, un samouraï préférait se suicider (seppuku).", fact: "Le Bushido influence encore la culture d'entreprise japonaise aujourd'hui ! L'honneur et la loyauté à son employeur sont des valeurs très respectées." },
          { emoji: '🏯', title: "Les Châteaux", text: "Les seigneurs japonais construisent des châteaux spectaculaires : Himeji, Matsumoto, Osaka. Ces forteresses étaient à la fois des centres militaires et des symboles de puissance.", fact: "Le Château de Himeji est surnommé 'le Château du Héron Blanc' à cause de sa couleur blanche immaculée. Il date de 1346 et est intact !" },
          { emoji: '🌸', title: "La Philosophie Zen", text: "Le bouddhisme Zen arrive de Chine et devient la philosophie des samouraïs. La méditation, le jardin de pierres, la cérémonie du the, le haiku (poésie) — le Zen influence toute la culture japonaise.", fact: "La cérémonie du the japonaise (chado) peut durer 4 heures ! Chaque geste est précis et symbolique." },
        ],
        quiz: [
          { q: "Qu'est-ce que le Bushido ?", correct: "Le code d'honneur des samouraïs", wrong1: "Une danse traditionnelle", wrong2: "Un type de riz japonais", emoji: '📜' },
          { q: "Comment s'appelle le sabre des samouraïs ?", correct: "Le katana", wrong1: "Le ninja", wrong2: "Le dojo", emoji: '⚔️' },
          { q: "Que signifie le mot 'Shogun' ?", correct: "Grand général", wrong1: "Roi du peuple", wrong2: "Maître du sabre", emoji: '👑' },
        ]
      },
      {
        id: 'jp_meiji', era: '1868 — 1945', title: "La Modernisation",
        subtitle: "De la rénovation Meiji à la guerre",
        emoji: '🏭', color: '#1565C0', light: '#E3F2FD',
        intro: "En 1853, des navires de guerre américains arrivent au Japon et forcent le pays à s'ouvrir au monde. Le Japon comprend qu'il doit se moderniser ou être colonisé. La révolution Meiji (1868) transforme le pays en quelques décennies, et le Japon devient la première puissance asiatique moderne.",
        figure: { name: "L'Empereur Meiji", emoji: '🏭', desc: "Sous son règne (1868-1912), le Japon se transforme en une puissance industrielle et militaire moderne. Il adopte les technologies occidentales tout en préservant la culture japonaise." },
        cards: [
          { emoji: '🏭', title: "La Révolution Meiji", text: "En 1868, le pouvoir des shogun est aboli et l'Empereur reprend le pouvoir. Le Japon envoie des milliers de jeunes étudier en Europe et aux USA. En 30 ans, il se dote d'une industrie, d'une armée et d'une marine modernes.", fact: "Le Japon est le seul pays au monde à avoir réussi une modernisation industrielle complète en quelques décennies, sans être colonisé !" },
          { emoji: '⚔️', title: "La Victoire contre la Russie", text: "En 1905, le Japon bat la Russie — une puissance européenne — dans la guerre russo-japonaise. C'est la première fois depuis l'Empire mongol qu'une puissance asiatique bat une européenne.", fact: "La victoire du Japon contre la Russie a inspiré les mouvements nationalistes dans toute l'Asie et l'Afrique — si le Japon peut battre l'Europe, nous aussi !" },
          { emoji: '💥', title: "La Seconde Guerre Mondiale", text: "En 1941, le Japon attaque Pearl Harbor (USA) et entre dans la guerre. En 1945, les États-Unis larguent deux bombes atomiques sur Hiroshima et Nagasaki. Le Japon se rend le 15 août 1945.", fact: "Les bombes d'Hiroshima et Nagasaki ont tué 200 000 personnes en quelques secondes. Ce sont les seules bombes atomiques jamais utilisées en guerre." },
        ],
        quiz: [
          { q: "Qu'est-ce que la révolution Meiji ?", correct: "La modernisation rapide du Japon", wrong1: "Une guerre civile japonaise", wrong2: "L'invasion du Japon par l'Europe", emoji: '🏭' },
          { q: "Contre quelle puissance le Japon a-t-il gagne en 1905 ?", correct: "La Russie", wrong1: "La Chine", wrong2: "Les États-Unis", emoji: '⚔️' },
          { q: "Combien de personnes ont été tuées par les bombes atomiques ?", correct: "200 000 personnes", wrong1: "1000 personnes", wrong2: "1 million", emoji: '💥' },
        ]
      },
      {
        id: 'jp_postwar', era: '1945 — 1990', title: "Le Miracle Économique",
        subtitle: "De la défaite à la puissance",
        emoji: '📺', color: '#1B5E20', light: '#E8F5E9',
        intro: "Après leur défaite en 1945, les Japonais reconstruisent leur pays avec une énergie incroyable. En 30 ans, le Japon passe d'un pays en ruines à la deuxième économie mondiale. Toyota, Sony, Honda, Panasonic... le Japon invente l'ère de l'électronique.",
        figure: { name: "Akio Morita (Sony)", emoji: '📺', desc: "Co-fondateur de Sony en 1946, il a révolutionne le monde avec le transistor radio, la cassette audio, le Walkman, le CD et le Playstation. Sony vient de 'Sonny' et du latin 'sonus' (son)." },
        cards: [
          { emoji: '🚗', title: "Toyota et l'Industrie", text: "Toyota invente le 'toyotisme' — un système de production révolutionnaire qui élimine le gaspillage et améliore la qualité. Ce système est copié par toutes les usines du monde.", fact: "Toyota est aujourd'hui le plus grand constructeur automobile du monde. Sa méthode 'juste-à-temps' est enseignée dans toutes les écoles de gestion !" },
          { emoji: '🎮', title: "Les Jeux Vidéo", text: "Nintendo (Mario, Zelda), Séga (Sonic), Sony (PlayStation)... le Japon a inventé l'industrie du jeu vidéo. En 1985, Super Mario Bros sauve l'industrie mondiale du jeu vidéo après son effondrement.", fact: "Shigeru Miyamoto, le créateur de Mario, a été inspiré par les promenades dans les collines autour de Kyoto ! Il voulait créer une expérience d'exploration." },
          { emoji: '📺', title: "La Culture Pop Japonaise", text: "Les mangas (BD), les animés (dessins animés), les jeux vidéo et la J-Pop japonaises ont conquis le monde entier. Dragon Ball Z, Naruto, One Pièce, Studio Ghibli... la culture japonaise est partout.", fact: "Le film 'Voyage de Chihiro' de Studio Ghibli (2001) a été le plus vu au monde en 2021, battant Avengers et tous les films Marvel !" },
        ],
        quiz: [
          { q: "Qu'a inventé Toyota comme méthode de production ?", correct: "Le 'juste-à-temps' sans gaspillage", wrong1: "La chaîne d'assemblage", wrong2: "Le robot industriel", emoji: '🚗' },
          { q: "Quel jeu vidéo a sauvé l'industrie en 1985 ?", correct: "Super Mario Bros", wrong1: "Pac-Man", wrong2: "Tetris", emoji: '🎮' },
          { q: "Quel est le film de Studio Ghibli le plus connu ?", correct: "Le Voyage de Chihiro", wrong1: "Akira", wrong2: "Dragon Ball", emoji: '🎬' },
        ]
      },
      {
        id: 'jp_today', era: "Aujourd'hui", title: "Le Japon Moderne",
        subtitle: "Tradition et futur",
        emoji: '🗼', color: '#B71C1C', light: '#FFF0F0',
        intro: "Aujourd'hui le Japon est la 3e économie mondiale. Tokyo est la plus grande métropole de la planète avec 37 millions d'habitants. Le Japon allie comme aucun autre pays la tradition la plus ancienne et la technologie la plus avancée.",
        figure: { name: "Hayao Miyazaki", emoji: '🌸', desc: "Réalisateur de Studio Ghibli, il a créé des chefs-d'œuvre comme 'Mon Voisin Totoro', 'Princesse Mononoke' et 'Le Voyage de Chihiro'. Ses films sont aimés dans le monde entier." },
        cards: [
          { emoji: '🚅', title: "Le Shinkansen", text: "Le train à grande vitesse japonais (Shinkansen) circule depuis 1964 à 320 km/h. En 60 ans, il n'a jamais eu un seul mort ! Sa ponctualité moyenne : 1 minute de retard.", fact: "Si le Shinkansen arrive avec plus de 60 secondes de retard, le conducteur s'excuse publiquement ! En France, un train est 'en retard' après 5 minutes..." },
          { emoji: '🌸', title: "Le Sakura et les Traditions", text: "Chaque printemps, les Japonais font des pique-niques sous les cerisiers en fleur (hanami). Cette tradition de 1000 ans rassemble familles et amis pour célébrer la beauté éphémère.", fact: "La saison des cerisiers ne dure que 2 semaines ! Les Japonais suivent la 'frontière de la floraison' qui remonte lentement du sud vers le nord chaque année." },
          { emoji: '🤖', title: "La Robotique", text: "Le Japon a le plus grand nombre de robots industriels au monde. Des robots soignent les personnes âgées, des robots servent dans les restaurants, et Honda développe des robots humanoïdes depuis 30 ans.", fact: "Le Japon a 300 robots pour 10 000 ouvriers — le ratio le plus élevé du monde. Certains usines Toyota travaillent presque sans humains !" },
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
        intro: "La Chine est l'une des civilisations les plus anciennes du monde. Il y a 5000 ans, les premiers empereurs fondent les bases de la civilisation chinoise : l'écriture, le bronze, le jade, les rituels. Pendant 3000 ans, des dynasties se succèdent, créant peu a peu la grande culture chinoise.",
        figure: { name: "Confucius (551-479 av. J.-C.)", emoji: '📚', desc: "Philosophe et penseur, ses enseignements sur la famille, le respect et la société influencent encore 2 milliards de personnes aujourd'hui. Ses Analectes sont lus dans le monde entier." },
        cards: [
          { emoji: '📝', title: "L'Invention de l'Écriture", text: "Vers 1200 av. J.-C., les Chinois de la Dynaste Shang gravent des caractères sur des os pour pratiquer la divination. Ces 'os oraculaires' sont les premiers exemples de l'écriture chinoise.", fact: "L'écriture chinoise est la seule écriture ancienne encore utilisée de façon continue depuis 3000 ans ! Les Chinois peuvent encore lire des textes de 2000 ans sans trop de difficulté." },
          { emoji: '📚', title: "Confucius et ses Enseignements", text: "Confucius enseigne que la société est harmonieuse quand chacun respecte son rôle : le fils respecte son père, l'élève son maître, le sujet son roi. Cette philosophie structure la société chinoise depuis 2500 ans.", fact: "Confucius disait : 'Ne fais pas aux autres ce que tu ne voudrais pas qu'on te fasse.' Cette 'Règle d'Or' est présenté dans toutes les religions du monde !" },
          { emoji: '🐉', title: "Le Dragon Chinois", text: "Le dragon chinois est le symbole de l'empire. Contrairement aux dragons occidentaux (mauvais), le dragon chinois est bienveillant — il apporte la pluie, la fertilité et la chance.", fact: "L'Empereur de Chine était appelé 'le Fils du Dragon'. Son trône était le 'Trône du Dragon'. Ses vêtements étaient brodés de dragons !" },
        ],
        quiz: [
          { q: "Quand l'écriture chinoise a-t-elle été inventée ?", correct: "Vers 1200 av. J.-C.", wrong1: "En 2000 ap. J.-C.", wrong2: "Il y a 100 ans", emoji: '📝' },
          { q: "Que signifie la 'Règle d'Or' de Confucius ?", correct: "Ne fais pas aux autres ce que tu ne voudrais pas", wrong1: "L'or est plus important que tout", wrong2: "L'Empereur a toujours raison", emoji: '📚' },
          { q: "Que symbolise le dragon en Chine ?", correct: "La chance et la prospérité", wrong1: "Le danger et le mal", wrong2: "La guerre", emoji: '🐉' },
        ]
      },
      {
        id: 'cn_empire', era: '221 av. J.-C. — 907 ap. J.-C.', title: "Le Premier Empire",
        subtitle: "Qin Shi Huang et la Grande Muraille",
        emoji: '🏯', color: '#1565C0', light: '#E3F2FD',
        intro: "En 221 av. J.-C., Qin Shi Huang unifie pour la première fois tous les royaumes chinois en un seul empire. Il est le premier 'Fils du Ciel' — le premier vrai Empereur de Chine. Il construit la Grande Muraille, standardise les poids, les mesures et l'écriture.",
        figure: { name: "Qin Shi Huang", emoji: '👑', desc: "Premier Empereur de Chine (221-210 av. J.-C.), il unifie le pays, construit la Grande Muraille et se fait enterrer avec 8000 soldats en terre cuite pour le protéger dans l'au-delà." },
        cards: [
          { emoji: '🧱', title: "La Grande Muraille", text: "La Grande Muraille de Chine est construite sur 2000 ans par plusieurs dynasties. Elle s'étend sur 21 196 km — plus que la distance de Paris à New York et retour !", fact: "On dit qu'on peut voir la Grande Muraille depuis l'espace — c'est faux ! Elle est trop étroite. Mais elle reste la plus grande construction humaine de l'histoire." },
          { emoji: '🪆', title: "L'Armée de Terre Cuite", text: "En 1974, des paysans chinois découvrent par hasard 8000 soldats en terre cuite enterrés avec le premier Empereur Qin Shi Huang. Chaque soldat a un visage unique — c'est peut-être des portraits réels.", fact: "On a ouvert que 3 des 4 fosses de l'armée de terre cuite. La 4e fossé n'est pas encore fouillée — les archéologues attendent des technologies meilleures pour ne pas l'abîmer !" },
          { emoji: '🧭', title: "Les Grandes Inventions", text: "La Chine invente la boussole (9e siècle), la poudre à canon, l'imprimerie (440 ans avant Gutenberg !), le papier, la soie, la porcelaine. Ces inventions changent l'histoire du monde.", fact: "La poudre à canon a été inventée par des alchimistes chinois qui cherchaient la formule de l'immortalité. Ils ont trouvé quelque chose de très différent !" },
        ],
        quiz: [
          { q: "Quelle est la longueur de la Grande Muraille de Chine ?", correct: "21 196 km", wrong1: "1 km", wrong2: "100 km", emoji: '🧱' },
          { q: "Combien de soldats en terre cuite ont été trouvés ?", correct: "8000 soldats", wrong1: "10 soldats", wrong2: "1 million", emoji: '🪆' },
          { q: "Quelle invention chinoise a 440 ans d'avance sur Gutenberg ?", correct: "L'imprimerie", wrong1: "La boussole", wrong2: "La soie", emoji: '📰' },
        ]
      },
      {
        id: 'cn_silk', era: '600 — 1400', title: "La Route de la Soie",
        subtitle: "Tang, Song et les échanges mondiaux",
        emoji: '🐫', color: '#1B5E20', light: '#E8F5E9',
        intro: "Pendant les dynasties Tang et Song, la Chine est la première puissance mondiale. La Route de la Soie relie la Chine à l'Europe et permet des échanges commerciaux et culturels fantastiques. Les marchands arabes, persans, indiens et européens convergent vers les villes chinoises.",
        figure: { name: "Marco Polo", emoji: '🗺️', desc: "Marchand vénitien, il voyage de 1271 à 1295 jusqu'en Chine à la cour de Kublai Khan (petit-fils de Gengis Khan). Son livre 'Le Devisement du Monde' fait découvrir la Chine aux Européens." },
        cards: [
          { emoji: '🐫', title: "La Route de la Soie", text: "La Route de la Soie est un réseau de routes commerciales qui relient la Chine à Rome, en passant par la Perse et l'Inde. La soie, les épices, le papier, la porcelaine voyagent d'est en ouest. Les idées aussi.", fact: "Ce n'est pas qu'une seule route ! C'est un réseau de routes terrestres et maritimes de 6 400 km. La plus grande infrastructure commerciale de l'histoire ancienne." },
          { emoji: '🎆', title: "La Poudre à Canon", text: "La poudre à canon est inventée en Chine vers le 9e siècle. D'abord utilisée pour des feux d'artifice lors des célébrations, elle devient une arme révolutionnaire qui change les guerres du monde entier.", fact: "Le premier feu d'artifice était fait pour effrayer les mauvais esprits ! Les Chinois pensaient que le bruit fort chassait les esprits maléfiques." },
          { emoji: '🗺️', title: "Marco Polo en Chine", text: "Marco Polo passe 17 ans en Chine à la cour de Kublai Khan. Il découvre la grandeur des villes chinoises, le papier-monnaie, les nouilles (ancêtre des pâtes !), la poudre à canon.", fact: "Les pâtes italiennes viennent-elles de Chine ? Peut-être ! Des nouilles chinoises existaient 4000 ans avant les pâtes italiennes. Marco Polo les a peut-être rapportées !" },
        ],
        quiz: [
          { q: "Qu'est-ce que la Route de la Soie ?", correct: "Un réseau commercial entre la Chine et l'Europe", wrong1: "Une route faite en soie", wrong2: "Un chemin de fer ancien", emoji: '🐫' },
          { q: "Pour quoi utilisait-on la poudre à canon au début en Chine ?", correct: "Pour les feux d'artifice", wrong1: "Pour la guerre", wrong2: "Pour la cuisine", emoji: '🎆' },
          { q: "Combien d'années Marco Polo a-t-il passe en Chine ?", correct: "17 ans", wrong1: "1 an", wrong2: "50 ans", emoji: '🗺️' },
        ]
      },
      {
        id: 'cn_modern', era: '1839 — 1949', title: "La Chine Moderne",
        subtitle: "Des guerres de l'opium à Mao",
        emoji: '⚔️', color: '#7B1FA2', light: '#F3E5F5',
        intro: "Au 19e siècle, la Chine s'affaiblit et subit l'humiliation des puissances étrangères : l'Angleterre lui impose l'opium, le Japon lui vole la Corée et Taïwan. En 1911, l'Empire tombe. Des décennies de guerre civile et d'invasion japonaise suivent avant que Mao Zedong fonde la République Populaire en 1949.",
        figure: { name: "Sun Yat-sen", emoji: '🌹', desc: "Médecin et révolutionnaire, il renverse la dynastie Qing en 1911 et fonde la République de Chine. Il est vénéré comme le 'Père de la Nation' aussi bien en Chine communiste qu'à Taïwan." },
        cards: [
          { emoji: '😷', title: "Les Guerres de l'Opium", text: "L'Angleterre vendait de l'opium (une drogue) aux Chinois pour équilibrer son commerce. L'Empereur interdit l'opium. Les Anglais déclarent la guerre (1839). La Chine perd et doit céder Hong Kong.", fact: "Hong Kong est reste britannique de 1842 à 1997 — 155 ans ! Il est revenu à la Chine en 1997 lors d'une cérémonie historique devant le monde entier." },
          { emoji: '🌹', title: "La Chute de l'Empire", text: "En 1911, la révolution dirigée par Sun Yat-sen renverse le dernier Empereur, Puyi, qui n'avait que 5 ans. La République de Chine est fondée. Puyi continuera de vivre dans la Cité Interdite jusqu'en 1924.", fact: "Le dernier Empereur Puyi a eu une vie incroyable : Empereur à 2 ans, détrôné à 5 ans, collaborateur des Japonais, prisonnier des communistes, puis guide touristique. Le film 'Le Dernier Empereur' raconte son histoire." },
          { emoji: '🔴', title: "La Révolution Communiste", text: "Après des années de guerre civile et d'occupation japonaise, Mao Zedong et les communistes battent les nationalistes en 1949. Le 1er octobre 1949, Mao proclame la République Populaire de Chine depuis Pékin.", fact: "Mao a dit : 'La révolution n'est pas un dîner de gala.' Sa révolution a tué entre 15 et 55 millions de personnes — les historiens discutent encore du chiffre." },
        ],
        quiz: [
          { q: "Pourquoi l'Angleterre a-t-elle fait la guerre à la Chine ?", correct: "Pour imposer la vente d'opium", wrong1: "Pour prendre Hong Kong", wrong2: "Pour voler la soie chinoise", emoji: '😷' },
          { q: "Quel âge avait le dernier Empereur Puyi quand il est monte sur le trône ?", correct: "2 ans", wrong1: "18 ans", wrong2: "30 ans", emoji: '👑' },
          { q: "Quand Mao Zedong a-t-il fonde la République Populaire ?", correct: "1er octobre 1949", wrong1: "1er octobre 1911", wrong2: "1er mai 1945", emoji: '🔴' },
        ]
      },
      {
        id: 'cn_today', era: "Aujourd'hui", title: "La Chine d'Aujourd'hui",
        subtitle: "L'Atelier du Monde",
        emoji: '🌟', color: '#B71C1C', light: '#FFF0F0',
        intro: "Aujourd'hui la Chine est la deuxième économie mondiale et va bientôt devenir la première. En 40 ans, elle a tiré 800 millions de personnes hors de la pauvreté — un miracle sans précédent dans l'histoire. Elle investit massivement en Afrique, en Asie et partout dans le monde.",
        figure: { name: "Jack Ma", emoji: '💻', desc: "Fondateur d'Alibaba, le plus grand site de commerce électronique du monde. Ancien professeur d'anglais, il a été refusé 30 fois avant de fonder sa première entreprise." },
        cards: [
          { emoji: '🏗️', title: "Le Miracle Économique", text: "En 1980, la Chine était un pays pauvre. En 2020, elle est la deuxième économie mondiale. Elle a construit en 40 ans plus de routes, de trains, d'aéroports et de villes que n'importe quel autre pays dans l'histoire.", fact: "La Chine a consommé plus de ciment entre 2011 et 2013 qu'en les États-Unis en tout le 20e siècle !" },
          { emoji: '🚅', title: "Les Trains à Grande Vitesse", text: "La Chine a le plus grand réseau de trains à grande vitesse du monde — 40 000 km ! Plus que tous les autres pays réunis. Des villes de 10 millions d'habitants sont reliées en 2 heures.", fact: "La Chine a construit son premier train à grande vitesse en 2008 et en 2023 avait 40 000 km de réseau. Il a fallu 50 ans à l'Europe pour en construire 10 000 km !" },
          { emoji: '🌍', title: "La Chine en Afrique", text: "La Chine investit énormément en Afrique : routes, ports, chemins de fer, stades, universités. Des centaines de milliers de Chinois vivent en Afrique. Les rapports entre la Chine et l'Afrique changent le continent.", fact: "La Chine a financé et construit la ligne de chemin de fer reliant Djibouti à Addis-Abeba (Éthiopie) — la première d'Afrique de l'Est moderne !" },
        ],
        quiz: [
          { q: "Combien de personnes la Chine a-t-elle sorties de la pauvreté en 40 ans ?", correct: "800 millions de personnes", wrong1: "1000 personnes", wrong2: "10 millions", emoji: '🏗️' },
          { q: "Quelle est la longueur du réseau ferroviaire à grande vitesse chinois ?", correct: "40 000 km", wrong1: "100 km", wrong2: "5 000 km", emoji: '🚅' },
          { q: "Qu'est-ce qu'Alibaba ?", correct: "Le plus grand site de commerce électronique", wrong1: "Un conte des Mille et Une Nuits", wrong2: "Une marque de voitures chinoises", emoji: '💻' },
        ]
      },
    ]
  },

  IN: {
    name: 'Inde', flag: '🇮🇳', region: 'asia',
    color: '#E65100', dark: '#b74200', bg: '#FFF3E0',
    hero: { emoji: '👧🏽', name: 'Priya', age: 8 },
    tagline: "De la Civilisation de l'Indus à la plus grande démocratie",
    chapters: [
      {
        id: 'in_indus', era: '3300 — 1300 av. J.-C.', title: "La Civilisation de l'Indus",
        subtitle: "Les premières grandes villes du monde",
        emoji: '🏛️', color: '#5D4037', light: '#EFEBE9',
        intro: "Il y a 5000 ans, sur les rives du fleuve Indus (Pakistan et Inde actuels), naît l'une des premières grandes civilisations du monde. Les villes de Mohenjo-Daro et Harappa ont des rues quadrillées, des égouts, des bains publics — plus avancées que Rome 2000 ans plus tard !",
        figure: { name: "Les Bâtisseurs de l'Indus", emoji: '🏛️', desc: "On ne sait toujours pas qui gouvernait ces villes ! Pas de palais de roi trouvé, pas de temple central. Peut-être une république ? Le mystère de la civilisation de l'Indus fascine encore les archéologues." },
        cards: [
          { emoji: '🏛️', title: "Mohenjo-Daro", text: "Il y a 4500 ans, Mohenjo-Daro avait 40 000 habitants, des rues droites, des maisons en briques cuites, des égouts souterrains et un grand bain public central. Aucune ville européenne n'était aussi avancée à cette époque.", fact: "Les briques de Mohenjo-Daro ont toutes exactement les mêmes dimensions — une standardisation incroyable pour il y a 4500 ans !" },
          { emoji: '🐄', title: "La Sacralisation de la Vache", text: "Dans la civilisation de l'Indus, on trouve des sceaux montrant des taureaux. La vache est sacrée dans l'hindouisme depuis des millénaires. Le zebo (bovin à bosse) est l'ancêtre de toutes les races bovines d'Afrique et d'Asie.", fact: "L'Inde à la plus grande population bovine au monde : 300 millions de vaches ! Elles se promènent librement dans les rues des villes." },
          { emoji: '🧘', title: "Le Yoga", text: "Des sceaux de la civilisation de l'Indus montrent des figures en position de méditation — les premières représentations connues du yoga. Cette pratique a 5000 ans !", fact: "Le yoga est pratique par 300 millions de personnes dans le monde aujourd'hui. Il est parti d'un petit village de l'Indus il y a 5000 ans !" },
        ],
        quiz: [
          { q: "Il y a combien d'habitants avait Mohenjo-Daro ?", correct: "40 000 habitants", wrong1: "100 personnes", wrong2: "1 million", emoji: '🏛️' },
          { q: "Depuis combien d'années le yoga est-il pratique ?", correct: "5000 ans", wrong1: "100 ans", wrong2: "200 ans", emoji: '🧘' },
          { q: "Combien de vaches y a-t-il en Inde ?", correct: "300 millions", wrong1: "10 vaches", wrong2: "1 milliard", emoji: '🐄' },
        ]
      },
      {
        id: 'in_vedic', era: '1500 — 300 av. J.-C.', title: "La Période Védique",
        subtitle: "Hindouisme, Bouddhisme et l'Empire Maurya",
        emoji: '🕉️', color: '#7B1FA2', light: '#F3E5F5',
        intro: "Après la civilisation de l'Indus, des peuples indo-européens (Aryens) arrivent en Inde et apportent le sanscrit et les premiers textes sacrés (Védas). Ces textes fondent l'hindouisme. Puis Siddhartha Gautama fonde le bouddhisme. L'Empire Maurya (322-185 av. J.-C.) unifie l'Inde sous Ashoka.",
        figure: { name: "Ashoka le Grand", emoji: '☮️', desc: "Roi de l'Empire Maurya, après une bataille terrible où 100 000 personnes meurent, il se convertit au bouddhisme et gouverne avec la non-violence. Il envoie des missionnaires bouddhistes dans tout l'Asie." },
        cards: [
          { emoji: '🕉️', title: "L'Hindouisme", text: "L'hindouisme est la religion la plus ancienne du monde encore pratiquée activement. Elle n'a pas un seul fondateur mais s'est développée sur 5000 ans. Elle croit en la réincarnation, le karma et des millions de dieux.", fact: "L'hindouisme a 330 millions de dieux ! Mais la plupart des hindous en vénèrent surtout 3 : Brahma (créateur), Vishnu (protecteur), Shiva (destructeur)." },
          { emoji: '☯️', title: "Siddhartha Gautama (le Bouddha)", text: "Vers 500 av. J.-C., un prince indien nommé Siddhartha quitte son palais, voit la souffrance du monde, et cherche l'illumination. Il la trouve sous un arbre Bodhi. Il enseigne la fin de la souffrance par la méditation.", fact: "Le bouddhisme est la 4e religion du monde avec 500 millions de pratiquants. Il n'est plus majoritaire en Inde (son pays d'origine !) mais est la première religion en Asie du Sud-Est." },
          { emoji: '☮️', title: "Ashoka le Grand", text: "Après avoir conquis un territoire immense, Ashoka est horrifié par les massacres de guerre. Il se convertit au bouddhisme et devient un roi de la paix et de la non-violence. Ses édits sont graves dans des piliers de pierre.", fact: "Le symbole sur le drapeau indien — la Roue d'Ashoka — vient des piliers d'Ashoka. Elle symbolise le dharma (la loi morale) !" },
        ],
        quiz: [
          { q: "Combien de dieux l'hindouisme a-t-il ?", correct: "330 millions", wrong1: "1 seul", wrong2: "12", emoji: '🕉️' },
          { q: "Sous quel arbre Siddhartha a-t-il trouve l'illumination ?", correct: "Un arbre Bodhi", wrong1: "Un bananier", wrong2: "Un manguier", emoji: '☯️' },
          { q: "Que symbolise la Roue d'Ashoka sur le drapeau indien ?", correct: "La loi morale (dharma)", wrong1: "La force de l'armée", wrong2: "Le soleil", emoji: '☮️' },
        ]
      },
      {
        id: 'in_mogul', era: '1526 — 1857', title: "L'Empire Moghol",
        subtitle: "Akbar, Shah Jahan et le Taj Mahal",
        emoji: '🕌', color: '#1565C0', light: '#E3F2FD',
        intro: "En 1526, Babur, descendant de Tamerlan et Gengis Khan, fonde l'Empire Moghol en Inde. Pendant 300 ans, les Empereurs Moghols gouvernent une grande partie de l'Inde. Akbar le Grand crée un empire de tolérance religieuse. Shah Jahan construit le Taj Mahal pour sa femme décédée.",
        figure: { name: "Shah Jahan", emoji: '🕌', desc: "Empereur Moghol (1628-1658), il a construit le Taj Mahal en mémoire de sa femme bien-aimée Mumtaz Mahal, morte en accouchant de leur 14e enfant. Il a été emprisonné par son propre fils." },
        cards: [
          { emoji: '🕌', title: "Le Taj Mahal", text: "Construit entre 1631 et 1653 par 20 000 ouvriers, c'est un mausolée en marbre blanc pour la femme de Shah Jahan. Le Taj Mahal change de couleur selon l'heure — rose à l'aube, blanc le jour, doré au coucher du soleil.", fact: "La légende dit que Shah Jahan a voulu construire un Taj Mahal noir de l'autre côté de la rivière pour lui-même. Mais il a été dépose avant de pouvoir le faire." },
          { emoji: '👑', title: "Akbar le Grand", text: "Akbar (1556-1605) est le plus grand des Empereurs Moghols. Il crée un empire de tolérance : les hindous ont les mêmes droits que les musulmans, il invite des savants de toutes religions à sa cour.", fact: "Akbar était analphabète ! Il ne savait pas lire ni écrire. Mais il mémorisait tout ce qu'on lui lisait et était consideré comme l'un des esprits les plus brillants de son époque." },
          { emoji: '🌶️', title: "La Cuisine Moghole", text: "La cuisine moghol est un mélange de cuisine persane et indienne. Le biryani, le korma, les samosas, le tandoor — ces plats que le monde entier aimé aujourd'hui ont été créés ou perfectionnés dans les cuisines impériales mogholes.", fact: "Le poulet tikka masala, plat le plus commande dans les restaurants indiens du monde, a été inventé en Écosse par des immigrés indiens dans les années 1970 !" },
        ],
        quiz: [
          { q: "Pour qui Shah Jahan a-t-il construit le Taj Mahal ?", correct: "Pour sa femme Mumtaz Mahal", wrong1: "Pour lui-même", wrong2: "Pour Allah", emoji: '🕌' },
          { q: "Combien d'ouvriers ont construit le Taj Mahal ?", correct: "20 000 ouvriers", wrong1: "100 ouvriers", wrong2: "1 million", emoji: '🏗️' },
          { q: "Qu'est-ce qui rendait Akbar le Grand extraordinaire ?", correct: "Sa tolérance religieuse et son intelligence", wrong1: "Sa grande taille", wrong2: "Ses conquêtes militaires", emoji: '👑' },
        ]
      },
      {
        id: 'in_gandhi', era: '1857 — 1947', title: "La Lutte pour l'Indépendance",
        subtitle: "Gandhi et la non-violence",
        emoji: '✊', color: '#1B5E20', light: '#E8F5E9',
        intro: "Après 300 ans de commerce, la Compagnie Britannique des Indes Orientales prend le contrôle politique de l'Inde au 19e siècle. En 1857, une grande révolte est écrasée dans le sang. Mais le mouvement pour l'indépendance grandit, dirigé par Mahatma Gandhi avec sa méthode révolutionnaire : la non-violence.",
        figure: { name: "Mahatma Gandhi", emoji: '✊', desc: "Avocat, il développe la 'satyagraha' — la résistance par la non-violence. Il mène des millions d'Indiens contre la domination britannique. Indépendance acquise en 1947. Assassiné en 1948." },
        cards: [
          { emoji: '✊', title: "Mahatma Gandhi", text: "Gandhi invente la résistance non-violente comme arme politique. Boycot des produits britanniques, grèves de la faim, marche du sel (1930) — il montre qu'on peut battre l'oppression sans armes.", fact: "La Marche du Sel de Gandhi est l'une des plus belles actions politiques de l'histoire. Il marche 380 km pour aller ramasser du sel de la mer en défi de la loi britannique !" },
          { emoji: '🧵', title: "Le Rouet (Charkha)", text: "Gandhi porte un rouet comme symbole de résistance. Il encourage les Indiens à filer leur propre coton et à porter des vêtements indiens (khadi) plutôt que les textiles britanniques.", fact: "Le rouet de Gandhi est au centre du premier drapeau indien ! Il a été remplacé par la Roue d'Ashoka mais l'hommage à Gandhi reste." },
          { emoji: '🕊️', title: "L'Indépendance de 1947", text: "Le 15 août 1947, l'Inde devient indépendante. Jawaharlal Nehru prononce son discours historique 'Rencontre avec le Destin'. Mais la partition avec le Pakistan (pour les musulmans) cause des millions de morts.", fact: "La partition de l'Inde en 1947 provoque la plus grande migration humaine de l'histoire : 15 millions de personnes changent de pays en quelques mois !" },
        ],
        quiz: [
          { q: "Quelle méthode Gandhi utilisait-il pour lutter ?", correct: "La non-violence", wrong1: "Les armes à feu", wrong2: "La diplomatie secrète", emoji: '✊' },
          { q: "Qu'est-ce que la Marche du Sel ?", correct: "Une marche de 380 km pour désobéir à une loi britannique", wrong1: "Une recette de cuisine indienne", wrong2: "Une fête religieuse", emoji: '🧵' },
          { q: "Quand l'Inde a-t-elle obtenu son indépendance ?", correct: "15 août 1947", wrong1: "1er octobre 1960", wrong2: "4 juillet 1776", emoji: '🕊️' },
        ]
      },
      {
        id: 'in_today', era: "Aujourd'hui", title: "L'Inde Moderne",
        subtitle: "La plus grande démocratie du monde",
        emoji: '🇮🇳', color: '#E65100', light: '#FFF3E0',
        intro: "Aujourd'hui l'Inde est la plus grande démocratie du monde avec 1,4 milliard d'habitants — et la première puissance démographique ayant dépasse la Chine en 2023. Son économie est la 5e mondiale. Bollywood, la technologie de l'information et sa culture diverse rayonnent dans le monde.",
        figure: { name: "APJ Abdul Kalam", emoji: '🚀', desc: "Scientifique et 11e Président de l'Inde (2002-2007), il a dirigé le programme spatial indien. Fils pauvre d'un pêcheur, il est devenu le 'Missile Man of India'. Adore par les enfants indiens." },
        cards: [
          { emoji: '💻', title: "La Silicon Valley Indienne", text: "Bangalore est la capitale technologique de l'Inde. Des millions d'ingénieurs indiens travaillent pour les plus grandes entreprises tech mondiales. Le PDG de Google (Sundar Pichai) et de Microsoft (Satya Nadella) sont indiens !", fact: "1 PDG de Fortune 500 sur 3 est d'origine indienne ! L'Inde exporte ses talents technologiques dans le monde entier." },
          { emoji: '🎬', title: "Bollywood", text: "Bollywood (Mumbai + Hollywood) produit 1500 films par an — plus que Hollywood ! Les films indiens sont regardés par 3 milliards de personnes dans le monde. La danse, la musique et les couleurs de Bollywood sont uniques.", fact: "Le terme 'Bollywood' est récent mais le cinéma indien a commencé en 1913 — seulement 18 ans après les frères Lumière !" },
          { emoji: '🚀', title: "ISRO et l'Espace", text: "En 2023, l'Inde est devenue le 4e pays à alunir sur la Lune avec la mission Chandrayaan-3. Et le premier à atteindre le pôle sud lunaire ! L'agence spatiale indienne (ISRO) fait cela avec 10 fois moins de budget que la NASA.", fact: "Le budget de la mission lunaire Chandrayaan-3 était de 75 millions de dollars. Le film 'Interstellar' a coûté 165 millions de dollars à produire !" },
        ],
        quiz: [
          { q: "Quelle est la position de l'Inde parmi les démocraties du monde ?", correct: "La plus grande démocratie", wrong1: "La plus petite", wrong2: "La seule démocratie d'Asie", emoji: '🇮🇳' },
          { q: "Que produit Bollywood par an ?", correct: "1500 films", wrong1: "10 films", wrong2: "100 films", emoji: '🎬' },
          { q: "Quel exploit l'Inde a-t-elle réalise en 2023 ?", correct: "Atteindre le pôle sud de la Lune", wrong1: "Aller sur Mars", wrong2: "Envoyer un homme dans l'espace", emoji: '🚀' },
        ]
      },
    ]
  },

  // ════════════════════════════════════════════════════════════════════
  // AMERIQUES
  // ════════════════════════════════════════════════════════════════════

  BR: {
    name: 'Brésil', flag: '🇧🇷', region: 'americas',
    color: '#1B5E20', dark: '#0d3510', bg: '#E8F5E9',
    hero: { emoji: '👦🏽', name: 'Gabriel', age: 8 },
    tagline: "Des Tupi à l'Amazonie moderne",
    chapters: [
      {
        id: 'br_indigenous', era: 'Avant 1500', title: "Les Peuples Indigènes",
        subtitle: "Tupi, Guarani et les gardiens de la forêt",
        emoji: '🌴', color: '#2E7D32', light: '#E8F5E9',
        intro: "Avant l'arrivée des Européens, le Brésil était habité par entre 2 et 5 millions d'indigènes appartenant à des centaines de tribus différentes. Les Tupi vivaient sur la côte, les Guarani dans les forêts, les Yanomami en Amazonie. Ces peuples avaient une connaissance profonde de la forêt.",
        figure: { name: "Les Tupi-Guarani", emoji: '🌴', desc: "Les peuples Tupi-Guarani habitaient toute la côte brésilienne. Ils étaient agriculteurs, pêcheurs et guerriers. La langue tupi est encore parlée et a donné au portugais des mots comme 'ananas', 'jaguar', 'piranha'." },
        cards: [
          { emoji: '🌴', title: "L'Amazonie", text: "L'Amazonie est la plus grande forêt tropicale du monde — 5,5 millions de km2, soit presque la taille de l'Europe. Elle abrite 10% de toutes les espèces vivantes de la planète.", fact: "L'Amazonie produit 20% de l'oxygène de la planète. On l'appelle 'le Poumon de la Terre'. Sans elle, la vie sur Terre ne serait pas la même !" },
          { emoji: '🦜', title: "La Biodiversité", text: "Le Brésil est le pays où la nature est la plus variée au monde. Il possède 10% de toutes les espèces animales : jaguars, anacondas, aras, toucans, capybaras... et des milliers d'espèces encore inconnues des scientifiques.", fact: "On découvre encore une nouvelle espèce en Amazonie toutes les 2 jours ! La forêt est si riche qu'on ne l'a pas encore entièrement étudiée." },
          { emoji: '🌿', title: "La Pharmacie Verte", text: "Les peuples indigènes connaissent des centaines de plantes médicinales. Plus de 25% de nos médicaments modernes viennent de plantes découvertes par les indigènes d'Amazonie, dont la quinine contre le paludisme.", fact: "L'acide acétylsalicylique (aspirine) vient d'une plante utilisée par les indigènes pour les maux de tête ! La pharmacie a mis 50 ans à comprendre comment ça marchait." },
        ],
        quiz: [
          { q: "Quel pourcentage de l'oxygène l'Amazonie produit-elle ?", correct: "20%", wrong1: "1%", wrong2: "100%", emoji: '🌴' },
          { q: "Combien de nouvelles espèces découvre-t-on en Amazonie ?", correct: "Une toutes les 2 jours", wrong1: "Une par an", wrong2: "Aucune, tout est connu", emoji: '🦜' },
          { q: "Quel médicament vient de plantes indigènes d'Amazonie ?", correct: "La quinine contre le paludisme", wrong1: "Les antibiotiques", wrong2: "Le vaccin contre la grippe", emoji: '🌿' },
        ]
      },
      {
        id: 'br_colonial', era: '1500 — 1822', title: "La Colonisation Portugaise",
        subtitle: "L'arrivée de Cabral et l'esclavage",
        emoji: '⛵', color: '#7B1FA2', light: '#F3E5F5',
        intro: "En 1500, le navigateur portugais Pedro Álvares Cabral débarque au Brésil par hasard en voulant contourner l'Afrique. Les Portugais colonisent le pays et commencent à couper le bois brésil (qui donne son nom au pays) puis à cultiver la canne à sucre avec des esclaves africains.",
        figure: { name: "Zumbi dos Palmares", emoji: '✊', desc: "Leader du Quilombo dos Palmares — une communauté d'esclaves en fuite qui a vécu libre dans la forêt pendant 100 ans ! Zumbi a refusé de se rendre et est mort en combattant en 1695. Il est un hero national brésilien." },
        cards: [
          { emoji: '⛵', title: "L'Arrivée de Cabral", text: "Le 22 avril 1500, Pedro Álvares Cabral débarque sur la côte brésilienne en voulant contourner l'Afrique pour aller aux Indes. Il plante une croix et revendique la terre au nom du Portugal.", fact: "Cabral a nommé le pays 'Terra da Santa Cruz' (Terre de la Sainte Croix). Ce nom a été remplacé par 'Brasil' à cause du bois braise (bois de Brésil) très recherche !" },
          { emoji: '⚫', title: "L'Esclavage Africain", text: "Pour cultiver la canne à sucre, les Portugais importent 4 millions d'esclaves africains — le plus grand nombre de toute l'histoire des Amériques. Les esclaves venaient du Nigeria, du Bénin, de l'Angola, du Mozambique.", fact: "Le Brésil est le dernier pays des Amériques à abolir l'esclavage — en 1888 ! La princesse Isabel signe la 'Lei Áurea' (Loi d'Or) qui libère tous les esclaves." },
          { emoji: '✊', title: "Zumbi et les Quilombos", text: "Des esclaves en fuite créaient des communautés cachées dans la forêt (quilombos). Le plus grand, Palmares, avait 30 000 habitants et a survécu 100 ans avant d'être détruit. Son leader Zumbi est mort en combattant.", fact: "Il existe encore 3000 quilombos au Brésil aujourd'hui ! Les descendants d'esclaves qui les habitent ont des droits spéciaux sur leurs terres." },
        ],
        quiz: [
          { q: "En quelle année Cabral arrive-t-il au Brésil ?", correct: "1500", wrong1: "1492", wrong2: "1600", emoji: '⛵' },
          { q: "Combien d'esclaves africains ont été amenés au Brésil ?", correct: "4 millions", wrong1: "100 personnes", wrong2: "100 millions", emoji: '⚫' },
          { q: "Quand le Brésil a-t-il aboli l'esclavage ?", correct: "1888", wrong1: "1776", wrong2: "1945", emoji: '✊' },
        ]
      },
      {
        id: 'br_empire', era: '1822 — 1945', title: "L'Indépendance et la République",
        subtitle: "Pedro I, le caoutchouc et le café",
        emoji: '🌿', color: '#1B5E20', light: '#E8F5E9',
        intro: "En 1822, le prince héritier du Portugal Pedro I proclame l'indépendance du Brésil — et devient le premier Empereur ! Le Brésil est le seul pays d'Amérique du Sud à avoir été un empire. Au 19e siècle, le boom du caoutchouc et du café font la richesse du pays.",
        figure: { name: "Dom Pedro I", emoji: '👑', desc: "Prince du Portugal exilé au Brésil avec sa famille, il est pousse à rentrer au Portugal mais refuse. Le 7 septembre 1822, il crie 'Indépendance ou Mort !' et fonde l'Empire du Brésil." },
        cards: [
          { emoji: '👑', title: "L'Indépendance de 1822", text: "Le 7 septembre 1822, Pedro I crie 'Independencia ou Morte !' (Indépendance ou Mort) sur les rives de l'Ipiranga. Le Brésil est indépendant. Le 7 septembre est aujourd'hui la fête nationale.", fact: "Pedro I a abdiqué en faveur de son fils Pedro II en 1831. Pedro II a gouverné pendant 58 ans — le plus long règne de l'histoire brésilienne !" },
          { emoji: '🌿', title: "Le Boom du Caoutchouc", text: "À la fin du 19e siècle, l'invention du pneu rend le caoutchouc d'Amazonie vital pour le monde entier. Manaus, au milieu de la forêt, devient une ville aussi riche que Paris — elle a même un opéra !", fact: "L'Opéra de Manaus (1896) est construits au milieu de la jungle. Les pierres venaient d'Europe en bateau. Les riches commerçants de caoutchouc envoyaient leur linge à laver à Paris !" },
          { emoji: '☕', title: "Le Café", text: "Le Brésil est le plus grand producteur de café au monde depuis 1840. Le café brésilien a transformé l'économie et financé la construction de São Paulo. Aujourd'hui, 40% du café mondial vient du Brésil.", fact: "La plante café vient d'Éthiopie ! Elle a voyage en Arabie, puis en Europe, puis les Portugais l'ont apportée au Brésil. Un voyage de 10 000 km pour finir dans votre tasse." },
        ],
        quiz: [
          { q: "Quelle phrase Pedro I a-t-il criée pour l'indépendance ?", correct: "Indépendance ou Mort !", wrong1: "Vive le Brésil !", wrong2: "À bas le Portugal !", emoji: '👑' },
          { q: "D'où vient la plante café originellement ?", correct: "D'Éthiopie", wrong1: "Du Brésil", wrong2: "De Colombie", emoji: '☕' },
          { q: "Quelle ville au cœur de l'Amazonie a un grand opéra ?", correct: "Manaus", wrong1: "Brasília", wrong2: "Salvador", emoji: '🌿' },
        ]
      },
      {
        id: 'br_modern', era: '1945 — aujourd\'hui', title: "Le Brésil Moderne",
        subtitle: "Pelé, Carnaval et Amazonie",
        emoji: '⚽', color: '#C8600A', light: '#FFF3E0',
        intro: "Le Brésil d'aujourd'hui est la 9e économie mondiale avec 215 millions d'habitants. C'est le pays de Pelé (le plus grand footballeur de tous les temps), du Carnaval de Rio, de la samba, et de la lutte pour sauver l'Amazonie.",
        figure: { name: "Pelé", emoji: '⚽', desc: "Edson Arantes do Nascimento, dit Pelé, est le seul footballeur à avoir gagné 3 Coupes du Monde (1958, 1962, 1970). Il a marqué 1283 buts dans sa carrière. Il est mort le 29 décembre 2022." },
        cards: [
          { emoji: '⚽', title: "Pelé et le Football Brésilien", text: "Le Brésil est 5 fois champion du monde (1958, 1962, 1970, 1994, 2002). Pelé, Garrincha, Zico, Ronaldo, Ronaldinho... le Brésil a produit les plus grands joueurs de l'histoire.", fact: "Pelé a marqué son 1000e but en direct à la télévision en 1969. Il a dedié ce but 'aux enfants pauvres du Brésil' — il venait lui-même d'une famille très pauvre !" },
          { emoji: '🎭', title: "Le Carnaval de Rio", text: "Le Carnaval de Rio est la plus grande fête du monde. Pendant 4 jours, 6 millions de personnes dansent dans les rues. Les écoles de samba préparent leurs costumes et chorégraphies pendant toute une année.", fact: "Le costume d'une danseuse de samba peut peser 30 kg et prendre 6 mois à confectionner ! Et elle doit danser avec pendant 90 minutes !" },
          { emoji: '🌿', title: "La Lutte pour l'Amazonie", text: "Chaque année, des milliers de km2 de forêt sont brûlés pour créer des champs d'élevage. Des activistes comme Chico Mendes (assassiné en 1988) et des peuples indigènes se battent pour protéger la forêt.", fact: "La déforestation de l'Amazonie a ralenti sous certains présidents et accélère sous d'autres. La forêt résiste mais son avenir dépend des choix que les Brésiliens feront." },
        ],
        quiz: [
          { q: "Combien de Coupes du Monde le Brésil a-t-il gagnées ?", correct: "5 fois", wrong1: "2 fois", wrong2: "7 fois", emoji: '⚽' },
          { q: "Combien de personnes participent au Carnaval de Rio ?", correct: "6 millions de personnes", wrong1: "1000 personnes", wrong2: "1 milliard", emoji: '🎭' },
          { q: "Qui était Chico Mendes ?", correct: "Un activiste pour la forêt amazonienne", wrong1: "Un footballeur brésilien", wrong2: "Le fondateur du Carnaval", emoji: '🌿' },
        ]
      },
      {
        id: 'br_culture', era: 'Culture', title: "La Culture Brésilienne",
        subtitle: "Samba, architecture et diversité",
        emoji: '🎵', color: '#1B5E20', light: '#E8F5E9',
        intro: "La culture brésilienne est un mélange unique d'influences indigènes, portugaises, africaines, japonaises, italiennes et allemandes. Cette diversité a créé une des cultures les plus riches et joyeuses du monde : la samba, la bossa-nova, l'architecture de Brasília, les arts martiaux du capoeira.",
        figure: { name: "Oscar Niemeyer", emoji: '🏛️', desc: "Architecte brésilien, il a conçu les bâtiments de la capitale Brasília avec Lúcio Costa. Ses formes courbes comme des sculptures blanches sont reconnaissables entre tous. Il a travaillé jusqu'à 104 ans !" },
        cards: [
          { emoji: '🎵', title: "La Samba et la Bossa Nova", text: "La samba est née dans les favelas de Rio, apportée par les esclaves africains. La bossa-nova (samba plus jazz) a été inventée dans les années 50. 'La Garota de Ipanema' est l'une des chansons les plus enregistrées du monde.", fact: "La Bossa Nova a été créée par une chanteuse, Nara Leao, et un compositeur, Tom Jobim, qui se retrouvaient dans les appartements de Copacabana. Une révolution musicale née dans un salon !" },
          { emoji: '🤸', title: "La Capoeira", text: "La capoeira est un art martial brésilien créé par les esclaves africains. Déguisé en danse pour tromper les maîtres, elle combine la lutte, la danse et la musique. Elle est pratiquée dans 160 pays.", fact: "Les esclaves cachaient leurs techniques de combat dans les mouvements de danse de la capoeira. Les maîtres ne voyaient qu'une danse innocente !" },
          { emoji: '🏛️', title: "Brasília", text: "Brasília a été construite en 41 mois (1956-1960) au milieu de nulle part, pour être la nouvelle capitale du Brésil. Conçue par Oscar Niemeyer, ses formes futuristes en font une œuvre d'art urbain.", fact: "Quand on regarde Brasília depuis un avion, le plan de la ville à la forme d'un avion ou d'un oiseau ! Ce n'est pas un hasard — c'était voulu par les architectes." },
        ],
        quiz: [
          { q: "Où la samba est-elle née ?", correct: "Dans les favelas de Rio", wrong1: "À São Paulo", wrong2: "En Afrique", emoji: '🎵' },
          { q: "Pourquoi les esclaves cachaient-ils la capoeira dans la danse ?", correct: "Pour tromper les maîtres sur ses techniques de combat", wrong1: "Parce qu'ils aimaient danser", wrong2: "Parce que c'est plus facile", emoji: '🤸' },
          { q: "En combien de mois Brasília a-t-elle été construite ?", correct: "41 mois", wrong1: "100 ans", wrong2: "5 ans", emoji: '🏛️' },
        ]
      },
    ]
  },

  MX: {
    name: 'Mexique', flag: '🇲🇽', region: 'americas',
    color: '#1B5E20', dark: '#0d3510', bg: '#E8F5E9',
    hero: { emoji: '👧🏽', name: 'Sofia', age: 7 },
    tagline: "Des Mayas aux Aztèques et au Mexique moderne",
    chapters: [
      {
        id: 'mx_maya', era: '2000 av. J.-C. — 900 ap. J.-C.', title: "Les Mayas",
        subtitle: "Astronomes, mathématiciens et bâtisseurs",
        emoji: '🏛️', color: '#E65100', light: '#FFF3E0',
        intro: "Les Mayas sont l'une des civilisations les plus avancées de l'histoire. Ils inventent un système d'écriture complexe, un calendrier plus précis que celui utilisé en Europe, les concepts du zéro en mathématiques, et construisent des pyramides et des observatoires astronomiques extraordinaires.",
        figure: { name: "Les Astronomes Mayas", emoji: '🌟', desc: "Les Mayas calculaient les éclipses avec une précision incroyable, sans télescope. Leurs tables astronomiques étaient si précises qu'elles correspondent aux calculs modernes par ordinateur !" },
        cards: [
          { emoji: '🏛️', title: "Chichén Itzá", text: "La pyramide de Chichén Itzá est l'un des Merveilles du Monde Moderne. Au solstice d'été et d'hiver, l'ombre de la pyramide crée l'image d'un serpent qui descend les marches. Un calcul astronomique parfait.", fact: "Chichén Itzá a 365 marches en tout — une pour chaque jour de l'année ! Les Mayas utilisaient leur architecture comme calendrier géant." },
          { emoji: '🔢', title: "Le Zéro Maya", text: "Les Mayas ont inventé le concept du zéro vers 400 av. J.-C. — bien avant l'Europe ! Sans le zéro, on ne peut pas faire les calculs qui ont permis les ordinateurs, les téléphones et toute la technologie moderne.", fact: "Les mathématiciens européens n'utilisaient pas le zéro jusqu'au 13e siècle. Les Mayas l'avaient inventé 1500 ans avant ! Le zéro est peut-être l'invention la plus importante de l'humanité." },
          { emoji: '📅', title: "Le Calendrier Maya", text: "Les Mayas avaient en fait plusieurs calendriers simultanément. Le plus fameux, le Compte Long, comptait les jours depuis la création du monde. Il est plus précis que le calendrier grégorien européen.", fact: "Le 21 décembre 2012 était la fin d'un grand cycle dans le calendrier maya. Certains croyaient que c'était la fin du monde — mais les Mayas eux-mêmes avaient prévu des événements après cette date !" },
          { emoji: '🎭', title: "Le Jeu de Balle", text: "Les Mayas jouaient au jeu de balle (pok-ta-pok) — une sorte de basket médiéval où on ne peut toucher la balle qu'avec les hanches et les coudes ! Les terrains de jeu se trouvent dans toutes les villes mayas.", fact: "La balle du jeu de balle pesait 4 kg en caoutchouc solide ! Se prendre un coup de cette balle devait faire très mal." },
        ],
        quiz: [
          { q: "Combien de marches à la pyramide de Chichén Itzá ?", correct: "365 marches", wrong1: "100 marches", wrong2: "1000 marches", emoji: '🏛️' },
          { q: "Quelle invention mathématique les Mayas ont-ils faite 1500 ans avant l'Europe ?", correct: "Le concept du zéro", wrong1: "La multiplication", wrong2: "La racine carrée", emoji: '🔢' },
          { q: "Avec quelle partie du corps jouait-on au jeu de balle maya ?", correct: "Les hanches et les coudes", wrong1: "Les mains", wrong2: "Les pieds", emoji: '🎭' },
        ]
      },
      {
        id: 'mx_aztec', era: '1300 — 1521', title: "L'Empire Aztèque",
        subtitle: "Tenochtitlan, la Venise du Mexique",
        emoji: '🦅', color: '#B71C1C', light: '#FFEBEE',
        intro: "En 1325, les Aztèques fondent Tenochtitlan sur une île au milieu d'un lac. Cette ville grandit pour devenir la plus grande du monde avec 300 000 habitants — plus grande que toute ville européenne de l'époque. En 1519, le conquistador espagnol Hernán Cortés arrive et détruit tout.",
        figure: { name: "Moctezuma II", emoji: '🦅', desc: "Dernier grand Empereur Aztèque. Il régit avec Cortés pensant que c'était un dieu. Erreur fatale — Cortés le fait prisonnier et conquit l'empire. Moctezuma meurt en 1520 dans des circonstances mystérieuses." },
        cards: [
          { emoji: '🏙️', title: "Tenochtitlan", text: "Fondée en 1325 sur une île du lac Texcoco, Tenochtitlan avait des pyramides, des palais, des jardins flottants et des marchés où l'on vendait tout. Des causeways (ponts-routes) la reliaient à la terre ferme.", fact: "Mexico City est construite sur les ruines de Tenochtitlan. On retrouve encore des artefacts aztèques quand on creusé le métro !" },
          { emoji: '🌽', title: "Le Mais", text: "Les Aztèques cultivent le mais (maiz) depuis des millénaires. Pour eux, les humains sont faits de pâte de mais ! Le mais d'Amérique centrale a nourri l'Europe après la conquête et changé l'alimentation mondiale.", fact: "Avant Colomb, il n'y avait ni mais, ni tomates, ni chocolat en Europe ! Tous viennent du Mexique et des Amériques." },
          { emoji: '⚔️', title: "La Conquête de Cortés", text: "Hernán Cortés arrive en 1519 avec 500 soldats et des alliés indigènes ennemis des Aztèques. Il capturé Moctezuma et détruit Tenochtitlan en 1521. Une civilisation entière s'effondre en 2 ans.", fact: "Cortés avait 500 hommes. Les Aztèques avaient 300 000 guerriers. Comment Cortés a-t-il gagne ? Grâce aux maladies européennes (variole) et aux alliés indigènes qui détestaient les Aztèques !" },
        ],
        quiz: [
          { q: "Combien d'habitants avait Tenochtitlan ?", correct: "300 000 habitants", wrong1: "1000 habitants", wrong2: "1 million", emoji: '🏙️' },
          { q: "Quel aliment les Aztèques ont-ils donne au monde ?", correct: "Le mais (et le chocolat)", wrong1: "Le blé", wrong2: "Le riz", emoji: '🌽' },
          { q: "Combien de soldats avait Hernán Cortés ?", correct: "500 soldats", wrong1: "100 000 soldats", wrong2: "10 soldats", emoji: '⚔️' },
        ]
      },
      {
        id: 'mx_colonial', era: '1521 — 1821', title: "La Nouvelle Espagne",
        subtitle: "300 ans de colonisation",
        emoji: '🏰', color: '#7B1FA2', light: '#F3E5F5',
        intro: "Pendant 300 ans, le Mexique est la 'Nouvelle Espagne'. Les Espagnols construisent des églises sur les pyramides, importent des esclaves africains, et créent une société hiérarchique basée sur la race. Un métissage intense entre Espagnols, indigènes et Africains crée le peuple mexicain actuel.",
        figure: { name: "La Malinche", emoji: '🌺', desc: "Indigène Nahua, elle servait d'interprète et de conseillère à Hernán Cortés. Haie par certains comme traîtresse, révérée par d'autres comme une femme intelligente en situation impossible. Sa figure incarne la complexité de la conquête." },
        cards: [
          { emoji: '🌺', title: "Le Métissage", text: "En 300 ans de colonisation, les Espagnols, les indigènes et les Africains se mélangent. Le Mexique actuel est l'un des pays les plus métissés du monde. 60% des Mexicains sont 'mestizos' — ni européens ni indigènes mais les deux.", fact: "Le mot 'créole' désigne quelqu'un de descendance européenne ne aux Amériques. Le mot 'métis' désigne quelqu'un de parents européen et indigène. Ces distinctions étaient cruciales dans la société coloniale." },
          { emoji: '💀', title: "Le Jour des Morts", text: "La fête mexicaine du Jour des Morts (Dia de los Muertos) mélange la célébration catholique de la Toussaint avec les rituels aztèques pour honorer les ancêtres. Les familles installent des autels colorés avec les photos et les plats préférés des défunts.", fact: "Le Jour des Morts est classe au Patrimoine Culturel de l'UNESCO depuis 2008. Le film 'Coco' de Pixar s'en inspiré !" },
          { emoji: '🌶️', title: "La Cuisine Mexicaine", text: "La cuisine mexicaine est la fusion des saveurs indigènes (piments, mais, tomates, chocolat) et espagnoles (viande, fromage, huile d'olive). Tacos, tamales, mole... chaque région à ses spécialités.", fact: "Il existe 64 variétés de piment au Mexique ! Le piment le plus fort du monde (le Carolina Reaper) est 300 fois plus fort qu'un jalapeno ordinaire." },
        ],
        quiz: [
          { q: "Que signifie 'mestizo' ?", correct: "Quelqu'un de parents européen et indigène", wrong1: "Un Espagnol du Mexique", wrong2: "Un indigène pur", emoji: '🌺' },
          { q: "Quel film de Pixar s'inspiré du Jour des Morts ?", correct: "Coco", wrong1: "Encanto", wrong2: "Ratatouille", emoji: '💀' },
          { q: "Combien de variétés de piment y a-t-il au Mexique ?", correct: "64 variétés", wrong1: "3 variétés", wrong2: "1000 variétés", emoji: '🌶️' },
        ]
      },
      {
        id: 'mx_independence', era: '1810 — 1920', title: "L'Indépendance et la Révolution",
        subtitle: "Hidalgo, Juárez et Zapata",
        emoji: '🌵', color: '#1B5E20', light: '#E8F5E9',
        intro: "Le 16 septembre 1810, le prêtre Hidalgo sonne la cloche et appelle le peuple à la rébellion contre l'Espagne. L'indépendance est proclamée en 1821. Mais la vraie révolution pour les pauvres vient en 1910 avec Emiliano Zapata et Pancho Villa qui se battent pour les terres des paysans.",
        figure: { name: "Emiliano Zapata", emoji: '🌵', desc: "Leader paysan de la Révolution mexicaine (1910-1919), son cri de guerre était 'Tierra y Libertad' (Terre et Liberté). Il voulait rendre les terres aux paysans indigènes volées par les riches propriétaires. Assassiné en 1919." },
        cards: [
          { emoji: '🔔', title: "Le Cri de Hidalgo", text: "Le 16 septembre 1810, le prêtre Miguel Hidalgo sonne la cloche de son église à Dolores et appelle le peuple à se révolter contre l'Espagne. C'est le début de la guerre d'indépendance. Le 16 septembre est la fête nationale mexicaine.", fact: "Le Cri d'Indépendance est rejoue chaque année par le Président du Mexique depuis le balcon du Palais National à Mexico. Des millions de Mexicains l'écoutent !" },
          { emoji: '👨‍⚖️', title: "Benito Juárez", text: "Premier président indigène du Mexique (Zapotèque de Oaxaca), il sépare l'Église de l'État et modernise le pays. Napoléon III envoie l'Archiduc Maximilien prendre le pouvoir — Juárez le fait exécuter.", fact: "Juárez est considéré comme le plus grand président mexicain. Lincoln (président US) et lui s'écrivaient des lettres ! Deux présidents d'origine modeste qui changeaient leur pays en même temps." },
          { emoji: '🌵', title: "Emiliano Zapata", text: "En 1910, la Révolution mexicaine éclate. Zapata mène les paysans du Chiapas et Morelos avec son cri 'Tierra y Libertad'. Il veut rendre les terres aux indigènes volées par les hacendados (grands propriétaires).", fact: "Le mouvement zapatiste existe encore aujourd'hui au Chiapas ! En 1994, des indigènes se sont révoltés sous le nom EZLN en hommage à Zapata." },
        ],
        quiz: [
          { q: "Quand est la fête nationale mexicaine ?", correct: "16 septembre", wrong1: "5 mai", wrong2: "1er janvier", emoji: '🔔' },
          { q: "Que signifie le cri de Zapata ?", correct: "Terre et Liberté", wrong1: "Indépendance ou Mort", wrong2: "Vive le Mexique", emoji: '🌵' },
          { q: "Benito Juárez était de quelle origine ?", correct: "Zapotèque (indigène)", wrong1: "Espagnol", wrong2: "Français", emoji: '👨‍⚖️' },
        ]
      },
      {
        id: 'mx_today', era: "Aujourd'hui", title: "Le Mexique Moderne",
        subtitle: "La 12e économie mondiale",
        emoji: '🌮', color: '#C8600A', light: '#FFF3E0',
        intro: "Le Mexique d'aujourd'hui est la 12e économie mondiale, un pays de 130 millions d'habitants qui partage une frontière de 3000 km avec les États-Unis. Sa culture — cuisine, musique, cinéma — rayonne dans le monde entier. Les Mexicains forment la plus grande diaspora hispanique aux USA.",
        figure: { name: "Frida Kahlo", emoji: '🌺', desc: "Peintre mexicaine (1907-1954), ses autoportraits colorés et douloureux sont parmi les plus reconnaissables au monde. Survivante d'un terrible accident de bus, elle a transformé sa douleur en art." },
        cards: [
          { emoji: '🌺', title: "Frida Kahlo", text: "Frida Kahlo est l'artiste mexicaine la plus connue au monde. Ses peintures autobiographiques, pleines de couleurs et de douleur, s'arrachent pour des dizaines de millions de dollars dans les ventes aux enchères.", fact: "Une peinture de Frida Kahlo a été vendue 35 millions de dollars en 2021 — un record pour un artiste latino-américain !" },
          { emoji: '🌮', title: "La Cuisine Mexicaine", text: "La cuisine mexicaine est inscrite au Patrimoine Culturel de l'UNESCO. Tacos, tamales, enchiladas, mole, guacamole... elle est la deuxième cuisine la plus populaire au monde après la cuisine italienne.", fact: "Le guacamole existait déjà chez les Aztèques ! Le mot vient du nahuatl 'ahuacamolli' — sauce d'avocat. Les Aztèques mangeaient de l'avocat depuis 5000 ans." },
          { emoji: '🏺', title: "Les Pyramides Vivantes", text: "Le Mexique compte des dizaines de sites archéologiques majeurs : Teotihuacan, Palenque, Monte Alban, Tulum... Ces civilisations ne sont pas mortes — leurs descendants vivent encore au Mexique et parlent leurs langues.", fact: "Il y a 65 langues indigènes encore parlées au Mexique aujourd'hui ! Le nahuatl (langue aztèque) est parle par 1,7 million de personnes." },
        ],
        quiz: [
          { q: "Pour combien a été vendue une peinture de Frida Kahlo ?", correct: "35 millions de dollars", wrong1: "100 euros", wrong2: "1 milliard", emoji: '🌺' },
          { q: "La cuisine mexicaine est inscrite dans quelle liste ?", correct: "Le Patrimoine Culturel de l'UNESCO", wrong1: "Le Livre Guinness des Records", wrong2: "La Liste Rouge", emoji: '🌮' },
          { q: "Combien de langues indigènes sont parlées au Mexique ?", correct: "65 langues", wrong1: "1 langue", wrong2: "2 langues", emoji: '🏺' },
        ]
      },
    ]
  },

  // ════════════════════════════════════════════════════════════════════
  // NOUVEAUX PAYS
  // ════════════════════════════════════════════════════════════════════

  EG: {
    name: 'Égypte', flag: '🇪🇬', region: 'africa',
    color: '#C9A227', dark: '#7A5E10', bg: '#FFF8E1',
    hero: { emoji: '👦🏽', name: 'Karim', age: 8 },
    tagline: "Le pays des pharaons et du Nil",
    chapters: [
      {
        id: 'eg_pharaohs', era: '3100 — 30 av. J.-C.', title: "L'Égypte des Pharaons",
        subtitle: 'Pyramides et hiéroglyphes',
        emoji: '🔺', color: '#C9A227', light: '#FFF8E1',
        intro: "Il y a plus de 5000 ans, le long du Nil, est née l'une des plus grandes civilisations de l'histoire. Les pharaons régnaient comme des dieux vivants. Ils ont construit des pyramides géantes et inventé une écriture mystérieuse : les hiéroglyphes.",
        figure: { name: "Toutânkhamon", emoji: '👑', desc: "Devenu pharaon à 9 ans, mort à 18, son tombeau intact a été découvert en 1922 par Howard Carter, rempli d'or et de trésors." },
        cards: [
          { emoji: '🔺', title: "Les Grandes Pyramides", text: "La pyramide de Khéops à Gizeh mesure 146 mètres. Elle a été construite il y a 4500 ans avec 2,3 millions de blocs de pierre. C'est la seule des 7 merveilles du monde antique encore debout.", fact: "Pendant 3800 ans, c'était le plus haut bâtiment du monde !" },
          { emoji: '📜', title: "Les Hiéroglyphes", text: "Les Égyptiens écrivaient avec des dessins : un oiseau, un œil, un soleil. Il y avait plus de 700 signes. Les scribes étudiaient pendant 12 ans pour apprendre.", fact: "C'est Champollion, un Français, qui a déchiffré les hiéroglyphes en 1822 grâce à la pierre de Rosette." },
          { emoji: '🏺', title: "Le Nil, Source de Vie", text: "Le Nil déborde chaque année et dépose un limon noir très fertile. Sans le Nil, il n'y aurait que du désert. Les Égyptiens disaient : 'L'Égypte est un don du Nil'.", fact: "Le Nil est le plus long fleuve du monde — 6650 km !" },
          { emoji: '👑', title: "Les Pharaons", text: "Le pharaon était considéré comme un dieu sur Terre. Le plus célèbre est Ramsès II, qui a régné 66 ans et a eu plus de 100 enfants !", fact: "Cléopâtre, la dernière pharaonne, parlait 9 langues et n'était pas égyptienne mais grecque !" },
        ],
        quiz: [
          { q: "Quelle pyramide est la plus haute ?", correct: "Khéops à Gizeh", wrong1: "Le Sphinx", wrong2: "Karnak", emoji: '🔺' },
          { q: "Qui a déchiffré les hiéroglyphes ?", correct: "Champollion", wrong1: "Napoléon", wrong2: "Toutânkhamon", emoji: '📜' },
          { q: "Qu'est-ce que le Nil pour l'Égypte ?", correct: "Sa source de vie", wrong1: "Une montagne", wrong2: "Un désert", emoji: '🌊' },
        ]
      },
      {
        id: 'eg_ptolemees', era: '332 — 30 av. J.-C.', title: "L'Égypte Grecque",
        subtitle: "Alexandre et Cléopâtre",
        emoji: '🏛️', color: '#1565C0', light: '#E3F2FD',
        intro: "En 332 av. J.-C., Alexandre le Grand conquiert l'Égypte. Il fonde la ville d'Alexandrie qui deviendra le plus grand centre culturel du monde antique. Après sa mort, ses généraux fondent la dynastie des Ptolémées, qui finit avec la célèbre Cléopâtre.",
        figure: { name: "Cléopâtre VII", emoji: '👸', desc: "Dernière reine d'Égypte (51-30 av. J.-C.), elle parlait 9 langues et séduisit les plus grands Romains, César puis Marc Antoine, pour sauver son royaume." },
        cards: [
          { emoji: '🏛️', title: "Alexandrie", text: "Fondée par Alexandre le Grand en 331 av. J.-C., Alexandrie devient la capitale et un grand centre du savoir mondial.", fact: "Le Phare d'Alexandrie était l'une des 7 merveilles du monde antique !" },
          { emoji: '📚', title: "La Grande Bibliothèque", text: "Elle contenait plus de 700 000 rouleaux. Tous les livres du monde y étaient copies. Elle a malheureusement brûlé.", fact: "Les savants comme Ératosthène y ont calculé la taille de la Terre il y a 2200 ans !" },
          { emoji: '👸', title: "Cléopâtre", text: "Très intelligente, elle épouse Jules César puis Marc Antoine pour protéger l'Égypte. Vaincue par Rome en 30 av. J.-C., elle se suicide.", fact: "Cléopâtre vivait plus près de l'invention de l'iPhone (2007) que de la construction de la pyramide de Khéops !" },
        ],
        quiz: [
          { q: "Qui a fondé Alexandrie ?", correct: "Alexandre le Grand", wrong1: "Ramsès II", wrong2: "Cléopâtre", emoji: '🏛️' },
          { q: "Combien de langues Cléopâtre parlait-elle ?", correct: "9 langues", wrong1: "1 langue", wrong2: "20 langues", emoji: '👸' },
          { q: "Que contenait la grande bibliothèque ?", correct: "700 000 rouleaux", wrong1: "Des momies", wrong2: "Des trésors d'or", emoji: '📚' },
        ]
      },
      {
        id: 'eg_islam', era: '641 — 1517', title: "L'Égypte Islamique",
        subtitle: 'Le Caire et les Mamelouks',
        emoji: '🕌', color: '#2E7D32', light: '#E8F5E9',
        intro: "En 641, les Arabes apportent l'islam en Égypte. En 969, la ville du Caire est fondée. Les Mamelouks, des esclaves devenus soldats puis sultans, défendent l'Égypte contre les Croisades et les Mongols.",
        figure: { name: "Saladin", emoji: '⚔️', desc: "Sultan kurde qui a reconquis Jérusalem en 1187 et fondé la dynastie ayyoubide en Égypte. Respecte même par ses ennemis croisés pour sa noblesse." },
        cards: [
          { emoji: '🕌', title: "Le Caire", text: "Fondée en 969, le Caire est aujourd'hui la plus grande ville d'Afrique avec plus de 20 millions d'habitants.", fact: "Le mot 'Caire' vient de l'arabe 'al-Qahira' qui signifie 'la Victorieuse'." },
          { emoji: '⚔️', title: "Saladin", text: "Sultan d'Égypte, il a battu les croisés et repris Jérusalem en 1187. Il était connu pour sa générosité et son honneur.", fact: "Saladin a même envoyé son médecin personnel soigner Richard Cœur de Lion, son ennemi !" },
          { emoji: '🛡️', title: "Les Mamelouks", text: "Ils étaient des esclaves-soldats. Ils ont battu les Mongols à Ain Jalut en 1260, sauvant le monde musulman.", fact: "C'est la seule grande défaite de l'armée mongole après Gengis Khan !" },
          { emoji: '🎓', title: "Al-Azhar", text: "L'université Al-Azhar du Caire, fondée en 970, est l'une des plus anciennes du monde et le centre du savoir islamique sunnite.", fact: "Al-Azhar accueille encore aujourd'hui des étudiants de 100 pays différents !" },
        ],
        quiz: [
          { q: "Qui a repris Jérusalem en 1187 ?", correct: "Saladin", wrong1: "Napoléon", wrong2: "Ramsès II", emoji: '⚔️' },
          { q: "Que signifie 'al-Qahira' ?", correct: "La Victorieuse", wrong1: "Le Soleil", wrong2: "La Sainte", emoji: '🕌' },
          { q: "Qui a battu les Mongols à Ain Jalut ?", correct: "Les Mamelouks", wrong1: "Les Romains", wrong2: "Les Croisés", emoji: '🛡️' },
        ]
      },
      {
        id: 'eg_modern', era: '1798 — 1952', title: "L'Égypte Moderne",
        subtitle: 'De Napoléon à Nasser',
        emoji: '🚢', color: '#7B1FA2', light: '#F3E5F5',
        intro: "En 1798, Napoléon envahit l'Égypte et emmène des savants. C'est le début de l'égyptologie. Au 19e siècle, Mehmet Ali modernise le pays. En 1869, le canal de Suez est inauguré. En 1952, Nasser renverse le roi et l'Égypte devient une république.",
        figure: { name: "Gamal Abdel Nasser", emoji: '🎖️', desc: "Officier qui renversa le roi en 1952. Premier président arabe à défier l'Occident, il nationalisa le canal de Suez en 1956." },
        cards: [
          { emoji: '⚓', title: "Le Canal de Suez", text: "Inauguré en 1869, ce canal de 193 km relie la Méditerranée à la mer Rouge. C'est l'une des routes maritimes les plus importantes du monde.", fact: "Plus de 12% du commerce mondial passé par le canal de Suez !" },
          { emoji: '👨‍🔬', title: "L'Égyptologie", text: "Après l'expédition de Napoléon, des archéologues du monde entier viennent en Égypte. Ils découvrent des momies, des temples et des tombeaux.", fact: "Howard Carter a découvert le tombeau de Toutânkhamon en 1922, intact depuis 3300 ans !" },
          { emoji: '🎖️', title: "Nasser et la République", text: "En 1952, le colonel Nasser renverse le roi Farouk et fonde la république. Il nationalise le canal de Suez en 1956.", fact: "Nasser était si populaire que des bébés étaient appelés 'Gamal' dans tout le monde arabe !" },
        ],
        quiz: [
          { q: "Quand le canal de Suez a-t-il été inauguré ?", correct: "1869", wrong1: "1956", wrong2: "1922", emoji: '⚓' },
          { q: "Qui a découvert le tombeau de Toutânkhamon ?", correct: "Howard Carter", wrong1: "Napoléon", wrong2: "Champollion", emoji: '👨‍🔬' },
          { q: "Qui a renversé le roi en 1952 ?", correct: "Nasser", wrong1: "Cléopâtre", wrong2: "Saladin", emoji: '🎖️' },
        ]
      },
      {
        id: 'eg_today', era: "Aujourd'hui", title: "L'Égypte Aujourd'hui",
        subtitle: 'Tradition et modernité',
        emoji: '🌟', color: '#E65100', light: '#FFF3E0',
        intro: "L'Égypte d'aujourd'hui compte plus de 100 millions d'habitants. C'est le pays le plus peuple du monde arabe. Le tourisme, l'agriculture le long du Nil et le canal de Suez restent ses richesses.",
        figure: { name: "Le peuple égyptien", emoji: '👥', desc: "Héritier de 5000 ans de civilisation, le peuple égyptien est réputé pour son humour, sa musique et sa cuisine." },
        cards: [
          { emoji: '🏙️', title: "Le Nouveau Caire", text: "Une nouvelle capitale administrative est en construction depuis 2015 dans le désert pour soulager le Caire surpeuplé.", fact: "Elle aura le plus haut gratte-ciel d'Afrique : la Tour Iconique de 385 mètres !" },
          { emoji: '🍲', title: "La Cuisine Égyptienne", text: "Le koshari (riz, lentilles, pâtes) est le plat national. La molokheya, le ful medames et les feuilles de vigne sont aussi populaires.", fact: "Le pain égyptien 'aish baladi' signifie littéralement 'la vie' en arabe !" },
          { emoji: '⚽', title: "Mohamed Salah", text: "Star du football mondial, Mohamed Salah joue à Liverpool. Il est l'un des meilleurs joueurs d'Afrique de tous les temps.", fact: "À Liverpool, des fans chantent 'If he scores another few, then I'll be Muslim too' en son honneur !" },
        ],
        quiz: [
          { q: "Quel est le plat national égyptien ?", correct: "Le koshari", wrong1: "Le couscous", wrong2: "La pizza", emoji: '🍲' },
          { q: "Où joue Mohamed Salah ?", correct: "À Liverpool", wrong1: "Au Real Madrid", wrong2: "Au PSG", emoji: '⚽' },
          { q: "Combien d'habitants compte l'Égypte ?", correct: "Plus de 100 millions", wrong1: "10 millions", wrong2: "1 milliard", emoji: '👥' },
        ]
      },
    ]
  },

  ET: {
    name: 'Éthiopie', flag: '🇪🇹', region: 'africa',
    color: '#FFB300', dark: '#7A5500', bg: '#FFFDE7',
    hero: { emoji: '👧🏿', name: 'Selam', age: 8 },
    tagline: "Le berceau de l'humanité",
    chapters: [
      {
        id: 'et_origins', era: 'Préhistoire', title: "Le Berceau de l'Humanité",
        subtitle: 'Lucy et nos ancêtres',
        emoji: '🦴', color: '#5D4037', light: '#EFEBE9',
        intro: "L'Éthiopie est considérée comme le berceau de l'humanité. C'est ici qu'ont été découverts les plus anciens fossiles de nos ancêtres. Lucy, vieille de 3,2 millions d'années, y a été trouvée en 1974.",
        figure: { name: "Lucy", emoji: '🦴', desc: "Squelette d'une femelle Australopithèque trouve en 1974 par Yves Coppens. Elle a été nommée Lucy d'après la chanson des Beatles 'Lucy in the Sky with Diamonds'." },
        cards: [
          { emoji: '🦴', title: "La Découverte de Lucy", text: "En 1974, dans la vallée de l'Omo, des paléontologues découvrent le squelette d'une femelle qui marchait déjà sur 2 jambes il y a 3,2 millions d'années.", fact: "En amharique, Lucy s'appelle Dinkinesh, ce qui signifie 'Tu es merveilleuse' !" },
          { emoji: '🌋', title: "La Vallée du Rift", text: "Une immense fissure traverse l'Éthiopie. C'est là que les premiers hommes ont évolué. La vallée continue de s'élargir, l'Afrique va se couper en deux dans des millions d'années.", fact: "Le Danakil en Éthiopie est l'un des endroits les plus chauds de la Terre : 50°C !" },
          { emoji: '☕', title: "L'Origine du Café", text: "Le café est ne en Éthiopie, dans la région de Kaffa. La légende dit qu'un berger a remarqué que ses chèvres étaient excitées après avoir mange des baies de caféier.", fact: "Le mot 'café' vient de la région 'Kaffa' en Éthiopie !" },
        ],
        quiz: [
          { q: "Quel âge à Lucy ?", correct: "3,2 millions d'années", wrong1: "1000 ans", wrong2: "100 ans", emoji: '🦴' },
          { q: "D'où vient le café ?", correct: "D'Éthiopie", wrong1: "Du Brésil", wrong2: "D'Italie", emoji: '☕' },
          { q: "Que signifie Dinkinesh ?", correct: "Tu es merveilleuse", wrong1: "Petit os", wrong2: "Femme du désert", emoji: '✨' },
        ]
      },
      {
        id: 'et_aksum', era: '100 — 940', title: "Le Royaume d'Aksum",
        subtitle: 'Une grande puissance ancienne',
        emoji: '🏛️', color: '#1565C0', light: '#E3F2FD',
        intro: "Aksum était l'un des 4 grands empires du monde antique selon le prophète Mani, avec Rome, la Perse et la Chine. Ses rois ont construit des obélisques géants et frappaient leurs propres monnaies en or.",
        figure: { name: "Le Roi Ezana", emoji: '👑', desc: "Roi d'Aksum au 4e siècle, il fut le premier souverain africain à se convertir au christianisme en 330." },
        cards: [
          { emoji: '🗿', title: "Les Obélisques d'Aksum", text: "Géants monolithes en granit (jusqu'à 33 mètres), ils marquaient les tombes royales. Le plus grand est tombe il y a 1700 ans.", fact: "L'Italie de Mussolini avait volé un obélisque en 1937. Il a été rendu en 2005 !" },
          { emoji: '✝️', title: "Le Christianisme", text: "En 330, le roi Ezana se convertit au christianisme, faisant de l'Éthiopie l'un des premiers royaumes chrétiens du monde, avant même l'Empire romain !", fact: "L'Église orthodoxe éthiopienne est l'une des plus anciennes au monde avec 50 millions de fidèles." },
          { emoji: '🪙', title: "La Monnaie d'Or", text: "Aksum était l'un des rares royaumes à frapper sa propre monnaie en or, en argent et en bronze. Cela montre sa puissance économique.", fact: "Les pièces d'Aksum étaient inscrites en grec ! Aksum commerçait avec Rome, l'Inde et la Chine." },
        ],
        quiz: [
          { q: "Quand l'Éthiopie devient-elle chrétienne ?", correct: "En 330", wrong1: "En 1500", wrong2: "En 1900", emoji: '✝️' },
          { q: "Que sont les obélisques d'Aksum ?", correct: "Des monuments funéraires", wrong1: "Des palais", wrong2: "Des tours de guet", emoji: '🗿' },
          { q: "Quel roi d'Aksum est devenu chrétien ?", correct: "Ezana", wrong1: "Saladin", wrong2: "Ramsès", emoji: '👑' },
        ]
      },
      {
        id: 'et_lalibela', era: '1137 — 1270', title: "Lalibela",
        subtitle: 'Les églises taillées dans la roche',
        emoji: '⛪', color: '#6A1B9A', light: '#F3E5F5',
        intro: "Au 12e siècle, le roi Lalibela fit construire 11 églises entièrement taillées dans la roche, sous terre. Elles existent encore aujourd'hui et sont l'une des merveilles du monde.",
        figure: { name: "Le Roi Lalibela", emoji: '👑', desc: "Roi de la dynastie Zagwé, il voulut créer une 'Nouvelle Jérusalem' après que la vraie ville sainte fut prise par les musulmans." },
        cards: [
          { emoji: '⛪', title: "Les 11 Églises", text: "Toutes les églises ont été taillées dans la roche basaltique en partant du haut. Elles forment une croix vue du ciel.", fact: "La légende dit que les anges aidaient les ouvriers la nuit !" },
          { emoji: '🛕', title: "Bêta Giyorgis", text: "L'église Saint-Georges est la plus célèbre. Elle a la forme d'une croix grecque parfaite et mesure 12 mètres de profondeur.", fact: "C'est l'une des photos les plus célèbres d'Éthiopie !" },
          { emoji: '🙏', title: "La Foi Vivante", text: "Aujourd'hui encore, des milliers de pèlerins viennent prier à Lalibela, surtout pour Noël orthodoxe (le 7 janvier).", fact: "Les prêtres revêtent des robes blanches et chantent des prières en langue Ge'ez, vieille de 2000 ans." },
        ],
        quiz: [
          { q: "Combien d'églises à Lalibela ?", correct: "11", wrong1: "3", wrong2: "100", emoji: '⛪' },
          { q: "Comment ont-elles été construites ?", correct: "Taillées dans la roche", wrong1: "Avec des briques", wrong2: "Avec du bois", emoji: '⛏️' },
          { q: "Quelle est l'église la plus célèbre ?", correct: "Bêta Giyorgis (Saint-Georges)", wrong1: "Saint-Pierre", wrong2: "Notre-Dame", emoji: '🛕' },
        ]
      },
      {
        id: 'et_resistance', era: '1896 — 1941', title: "La Résistance",
        subtitle: 'Le seul pays africain jamais colonisé',
        emoji: '🛡️', color: '#1B5E20', light: '#E8F5E9',
        intro: "L'Éthiopie est le seul pays d'Afrique à n'avoir jamais été colonisé par les Européens (à part une courte occupation italienne). En 1896, l'empereur Ménélik II bat l'Italie à la bataille d'Adoua. C'est une victoire historique pour toute l'Afrique.",
        figure: { name: "Ménélik II", emoji: '⚔️', desc: "Empereur de 1889 à 1913, il bat l'Italie à Adoua en 1896 et modernise l'Éthiopie. Une des plus grandes victoires africaines contre une puissance coloniale." },
        cards: [
          { emoji: '⚔️', title: "La Bataille d'Adoua 1896", text: "Le 1er mars 1896, 100 000 guerriers éthiopiens écrasent l'armée italienne à Adoua. C'est la première grande victoire africaine contre une puissance coloniale.", fact: "Les Italiens ont perdu 7000 hommes. Cette victoire a inspiré toute l'Afrique !" },
          { emoji: '👑', title: "Hailé Sélassié", text: "Empereur de 1930 à 1974, il modernise le pays et fait entrer l'Éthiopie à l'ONU. Il fonde l'Union Africaine à Addis-Abeba.", fact: "Pour les Rastafariens en Jamaïque, Hailé Sélassié était considéré comme un dieu vivant !" },
          { emoji: '🦅', title: "L'Occupation 1936-1941", text: "Mussolini envahit l'Éthiopie en 1935. Mais avec l'aide des Britanniques, Hailé Sélassié reprend son trône en 1941.", fact: "C'est la seule période coloniale qu'ait connue l'Éthiopie : 5 ans seulement !" },
        ],
        quiz: [
          { q: "Quand l'Éthiopie a-t-elle battu l'Italie ?", correct: "En 1896 à Adoua", wrong1: "En 1500", wrong2: "En 1960", emoji: '⚔️' },
          { q: "Qui était Hailé Sélassié ?", correct: "Le dernier empereur d'Éthiopie", wrong1: "Un explorateur", wrong2: "Un footballeur", emoji: '👑' },
          { q: "L'Éthiopie a-t-elle été colonisée ?", correct: "Non, sauf une courte occupation italienne", wrong1: "Oui, par la France", wrong2: "Oui, pendant 100 ans", emoji: '🛡️' },
        ]
      },
      {
        id: 'et_today', era: "Aujourd'hui", title: "L'Éthiopie Moderne",
        subtitle: 'Une nation en plein essor',
        emoji: '🌟', color: '#FFB300', light: '#FFFDE7',
        intro: "L'Éthiopie est aujourd'hui le 2e pays le plus peuple d'Afrique avec 120 millions d'habitants. C'est l'une des économies à la croissance la plus rapide du monde. Addis-Abeba est le siège de l'Union Africaine.",
        figure: { name: "Abiy Ahmed", emoji: '🕊️', desc: "Premier ministre depuis 2018, il a reçu le prix Nobel de la paix en 2019 pour avoir fait la paix avec l'Érythrée." },
        cards: [
          { emoji: '🌍', title: "Addis-Abeba", text: "La capitale, dont le nom signifie 'Nouvelle Fleur', est la capitale diplomatique de l'Afrique. C'est le siège de l'Union Africaine.", fact: "Addis-Abeba est l'une des capitales les plus hautes du monde : 2355 mètres d'altitude !" },
          { emoji: '🏃', title: "Les Coureurs Éthiopiens", text: "L'Éthiopie domine le marathon mondial. Hailé Gebrselassie et Kenenisa Bekele sont des légendes. L'altitude des montagnes leur donne un avantage.", fact: "Abebe Bikila a gagné le marathon de Rome 1960... pieds nus !" },
          { emoji: '☕', title: "La Cérémonie du Café", text: "L'Éthiopie est le premier producteur africain de café. La cérémonie du café dure 1 à 2 heures et est un moment de partage essentiel.", fact: "On torréfié les grains à la main devant les invités — c'est un vrai rituel !" },
        ],
        quiz: [
          { q: "Que signifie Addis-Abeba ?", correct: "Nouvelle Fleur", wrong1: "Grande Ville", wrong2: "Capitale d'Or", emoji: '🌸' },
          { q: "Qui a gagné le marathon de Rome 1960 pieds nus ?", correct: "Abebe Bikila", wrong1: "Usain Bolt", wrong2: "Mo Farah", emoji: '🏃' },
          { q: "Combien d'habitants en Éthiopie ?", correct: "120 millions", wrong1: "1 million", wrong2: "2 milliards", emoji: '👥' },
        ]
      },
    ]
  },

  ZA: {
    name: 'Afrique du Sud', flag: '🇿🇦', region: 'africa',
    color: '#007749', dark: '#003D24', bg: '#E8F5E9',
    hero: { emoji: '👧🏿', name: 'Thandi', age: 8 },
    tagline: "La nation arc-en-ciel",
    chapters: [
      {
        id: 'za_origins', era: 'Préhistoire — 1652', title: "Les Premiers Peuples",
        subtitle: 'San, Khoi, Zoulous et Xhosa',
        emoji: '🏞️', color: '#5D4037', light: '#EFEBE9',
        intro: "Les San (Bushmen) sont parmi les plus anciens humains du monde. Ils vivent en Afrique du Sud depuis plus de 100 000 ans. Plus tard, les peuples Bantous (Zoulous, Xhosa) sont venus du nord.",
        figure: { name: "Les San", emoji: '🏹', desc: "Chasseurs-cueilleurs depuis 100 000 ans, ils ont laissé des milliers de peintures rupestres dans les montagnes du Drakensberg." },
        cards: [
          { emoji: '🏹', title: "Les San", text: "Les San (parfois appelés Bushmen) sont les plus anciens habitants d'Afrique du Sud. Ils vivaient de chasse et de cueillette.", fact: "Leurs langues ont des sons 'clic' uniques au monde !" },
          { emoji: '🎨', title: "L'Art Rupestre", text: "Les San ont peint des milliers de scènes sur les parois rocheuses du Drakensberg. Certaines ont 30 000 ans.", fact: "C'est l'une des plus grandes collections d'art préhistorique du monde !" },
          { emoji: '🛡️', title: "Les Zoulous", text: "Le peuple Zoulou s'est installé dans la région il y a 1000 ans. Ils ont développé une grande culture guerrière.", fact: "Aujourd'hui, le zoulou est la langue la plus parlée en Afrique du Sud." },
        ],
        quiz: [
          { q: "Qui sont les plus anciens habitants ?", correct: "Les San", wrong1: "Les Vikings", wrong2: "Les Romains", emoji: '🏹' },
          { q: "Qu'ont laissé les San ?", correct: "Des peintures rupestres", wrong1: "Des pyramides", wrong2: "Des routes", emoji: '🎨' },
          { q: "Quelle langue a des sons 'clic' ?", correct: "Les langues San", wrong1: "Le français", wrong2: "L'anglais", emoji: '🔉' },
        ]
      },
      {
        id: 'za_zulu', era: '1816 — 1879', title: "L'Empire Zoulou",
        subtitle: 'Chaka, le grand roi guerrier',
        emoji: '⚔️', color: '#C62828', light: '#FFEBEE',
        intro: "Au début du 19e siècle, un jeune chef nommé Chaka révolutionne l'art de la guerre et fonde l'Empire Zoulou. Il invente une nouvelle lance courte (l'iklwa) et une nouvelle tactique en forme de buffle. En 20 ans, il conquiert tout le sud-est de l'Afrique.",
        figure: { name: "Chaka Zoulou", emoji: '👑', desc: "Roi (1816-1828) qui a transformé une petite tribu en empire puissant. Génie militaire comparé à Napoléon." },
        cards: [
          { emoji: '⚔️', title: "Chaka et l'Iklwa", text: "Chaka invente une lance courte qu'on garde en main au lieu de la jeter. Cela rend ses guerriers redoutables au combat rapproché.", fact: "L'iklwa fait un bruit caractéristique en quittant le corps de l'ennemi : 'I-klwa' !" },
          { emoji: '🛡️', title: "La Tactique du Buffle", text: "Les armées zouloues attaquent en formation de buffle : la tête au centre, les cornes sur les côtes pour encercler l'ennemi.", fact: "Chaka entraînait ses guerriers à courir 80 km par jour, pieds nus sur des épines !" },
          { emoji: '🎖️', title: "Isandlwana 1879", text: "En 1879, l'armée zouloue écrase une armée britannique à Isandlwana. C'est l'une des pires défaites de l'Empire britannique.", fact: "Les Zoulous étaient 20 000, les Britanniques 1800 — et armes de fusils !" },
        ],
        quiz: [
          { q: "Comment s'appelle la lance de Chaka ?", correct: "L'iklwa", wrong1: "L'iglou", wrong2: "Le katana", emoji: '⚔️' },
          { q: "Quelle est la tactique zouloue ?", correct: "Le buffle", wrong1: "Le serpent", wrong2: "L'aigle", emoji: '🛡️' },
          { q: "Quelle bataille les Zoulous ont-ils gagne en 1879 ?", correct: "Isandlwana", wrong1: "Waterloo", wrong2: "Trafalgar", emoji: '🎖️' },
        ]
      },
      {
        id: 'za_apartheid', era: '1948 — 1994', title: "L'Apartheid",
        subtitle: "Un système injuste",
        emoji: '⛓️', color: '#424242', light: '#EEEEEE',
        intro: "De 1948 a 1994, le gouvernement blanc a imposé un système appelé 'apartheid' (séparation). Les Noirs n'avaient presque aucun droit. Ils étaient séparés des Blancs dans les écoles, les transports, les plages, les hôpitaux.",
        figure: { name: "Nelson Mandela", emoji: '✊🏿', desc: "Leader de la lutte contre l'apartheid, emprisonné 27 ans, il devient le premier président noir d'Afrique du Sud en 1994. Symbole mondial de paix et de pardon." },
        cards: [
          { emoji: '⛓️', title: "Qu'est-ce que l'Apartheid ?", text: "Un système legal qui séparait les gens par couleur de peau. Les Noirs (75% de la population) n'avaient presque aucun droit.", fact: "Le mot 'apartheid' vient de l'afrikaans et signifie 'séparation' !" },
          { emoji: '✊🏿', title: "Mandela en Prison", text: "En 1964, Nelson Mandela est condamné à perpétuité. Il passera 27 ans en prison, dont 18 sur l'île de Robben Island.", fact: "En prison, Mandela cassait des cailloux dans une carrière. Il a appris l'afrikaans pour mieux comprendre ses geôliers." },
          { emoji: '🌍', title: "Le Boycott International", text: "Le monde entier a boycotté l'Afrique du Sud : pas de compétitions sportives, pas de commerce. Cette pression a aidé à mettre fin à l'apartheid.", fact: "L'Afrique du Sud a été bannie des Jeux Olympiques de 1964 à 1992 !" },
          { emoji: '🕊️', title: "1994, La Libération", text: "Le 27 avril 1994, les premières élections libres ont lieu. Mandela devient président. C'est la fin officielle de l'apartheid.", fact: "Pour ces élections, des Noirs ont fait la queue 6 heures pour voter pour la 1re fois de leur vie !" },
        ],
        quiz: [
          { q: "Combien d'années Mandela a-t-il passe en prison ?", correct: "27 ans", wrong1: "5 ans", wrong2: "1 an", emoji: '⛓️' },
          { q: "Quand l'apartheid a-t-il pris fin ?", correct: "En 1994", wrong1: "En 1960", wrong2: "En 2010", emoji: '🕊️' },
          { q: "Que signifie 'apartheid' ?", correct: "Séparation", wrong1: "Liberté", wrong2: "Justice", emoji: '⛓️' },
        ]
      },
      {
        id: 'za_rainbow', era: '1994 — 2010', title: "La Nation Arc-en-Ciel",
        subtitle: 'Mandela et la réconciliation',
        emoji: '🌈', color: '#FFB300', light: '#FFFDE7',
        intro: "Après l'apartheid, Mandela appelle son pays la 'Nation Arc-en-Ciel'. Au lieu de se venger, il choisit le pardon. Il crée une Commission de Vérité et de Réconciliation pour guérir les blessures du pays.",
        figure: { name: "Desmond Tutu", emoji: '⛪', desc: "Archevêque et prix Nobel de la Paix 1984, il a inventé l'expression 'Nation Arc-en-Ciel'. Il a préside la Commission de Vérité et Réconciliation." },
        cards: [
          { emoji: '🏉', title: "La Coupe du Monde de Rugby 1995", text: "Mandela soutient l'équipe sud-africaine (les Springboks), longtemps symbole des Blancs. Quand ils gagnent, le pays entier s'unit.", fact: "Mandela a remis le trophée en portant le maillot des Springboks. Le film 'Invictus' raconte cette histoire !" },
          { emoji: '🤝', title: "La Réconciliation", text: "La Commission de Vérité et Réconciliation a permis aux victimes de raconter ce qu'elles avaient subi, et aux bourreaux de demander pardon.", fact: "Plus de 20 000 personnes ont témoigne devant la Commission entre 1996 et 1998." },
          { emoji: '⚽', title: "La Coupe du Monde 2010", text: "L'Afrique du Sud organise la 1re Coupe du Monde de football en Afrique. C'est un grand symbole.", fact: "Le bruit des vuvuzelas (trompettes) était si fort que la FIFA a failli les interdire !" },
        ],
        quiz: [
          { q: "Qui a inventé 'Nation Arc-en-Ciel' ?", correct: "Desmond Tutu", wrong1: "Chaka Zoulou", wrong2: "Napoléon", emoji: '🌈' },
          { q: "Quel sport l'Afrique du Sud a-t-elle gagne en 1995 ?", correct: "La Coupe du Monde de Rugby", wrong1: "Le tennis", wrong2: "Le judo", emoji: '🏉' },
          { q: "Quelle compétition en 2010 ?", correct: "La Coupe du Monde de football", wrong1: "Les JO d'hiver", wrong2: "Roland Garros", emoji: '⚽' },
        ]
      },
      {
        id: 'za_today', era: "Aujourd'hui", title: "L'Afrique du Sud Aujourd'hui",
        subtitle: 'Diversité et défis',
        emoji: '🌟', color: '#007749', light: '#E8F5E9',
        intro: "L'Afrique du Sud a 11 langues officielles ! C'est un pays riche en culture, en faune sauvage et en ressources naturelles. Mais il fait face à des défis importants : pauvreté, inégalités, criminalité.",
        figure: { name: "La jeunesse sud-africaine", emoji: '🧑🏿‍🎓', desc: "La première génération 'born free' (née après l'apartheid). Elle rêve d'une société vraiment égalitaire." },
        cards: [
          { emoji: '🦁', title: "Le Parc Kruger", text: "Le plus grand parc national d'Afrique du Sud. On y trouve les 'Big Five' : lion, léopard, rhinocéros, éléphant, buffle.", fact: "Le parc fait 19 485 km², presque la taille du Pays de Galles !" },
          { emoji: '💎', title: "Les Diamants et l'Or", text: "L'Afrique du Sud est l'un des plus grands producteurs d'or et de diamants au monde. Johannesburg s'est développée autour de ces mines.", fact: "Le diamant Cullinan, le plus gros jamais trouvé (3106 carats), a été découvert en Afrique du Sud en 1905 !" },
          { emoji: '🗣️', title: "11 Langues Officielles", text: "Zoulou, xhosa, afrikaans, anglais, sotho... L'Afrique du Sud est l'un des pays les plus multilingues du monde.", fact: "L'hymne national est chanté en 5 langues différentes !" },
        ],
        quiz: [
          { q: "Combien de langues officielles ?", correct: "11 langues", wrong1: "1 langue", wrong2: "100 langues", emoji: '🗣️' },
          { q: "Quels sont les 'Big Five' ?", correct: "Lion, léopard, rhino, éléphant, buffle", wrong1: "5 dinosaures", wrong2: "5 oiseaux", emoji: '🦁' },
          { q: "Quelle est une grande richesse minérale ?", correct: "L'or et les diamants", wrong1: "Le pétrole", wrong2: "Le sel", emoji: '💎' },
        ]
      },
    ]
  },

  IT: {
    name: 'Italie', flag: '🇮🇹', region: 'europe',
    color: '#008C45', dark: '#004D24', bg: '#E8F5E9',
    hero: { emoji: '👦🏻', name: 'Marco', age: 8 },
    tagline: "De Rome antique à la pizza moderne",
    chapters: [
      {
        id: 'it_rome', era: '753 av. J.-C. — 476', title: "L'Empire Romain",
        subtitle: 'César, gladiateurs et légionnaires',
        emoji: '🏛️', color: '#C62828', light: '#FFEBEE',
        intro: "Selon la légende, Rome a été fondée en 753 av. J.-C. par Romulus, un bébé élevé par une louve. La ville est devenue le centre du plus grand empire de l'Antiquité, qui s'étendait de l'Angleterre à l'Égypte.",
        figure: { name: "Jules César", emoji: '👑', desc: "Général et homme politique romain (100-44 av. J.-C.). Il a conquis la Gaule et changé Rome de république en dictature. Assassiné aux ides de mars." },
        cards: [
          { emoji: '🐺', title: "Romulus et Rémus", text: "La légende dit que 2 jumeaux ont été élèves par une louve. Romulus a tué Rémus et fondé Rome en 753 av. J.-C.", fact: "Une statue de la louve allaitant les jumeaux est devenue le symbole de Rome !" },
          { emoji: '🏟️', title: "Le Colisée", text: "Construit en 80 ap. J.-C., ce stade pouvait accueillir 50 000 spectateurs pour voir des combats de gladiateurs et des courses de chars.", fact: "On pouvait inonder l'arène pour faire des batailles navales !" },
          { emoji: '⚔️', title: "Jules César", text: "Le plus célèbre Romain. Il a conquis la Gaule et a été poignardé par Brutus, son ami, en 44 av. J.-C.", fact: "Sa dernière phrase aurait été : 'Tu quoque mi fili !' (Toi aussi, mon fils !)" },
          { emoji: '🛣️', title: "Les Routes Romaines", text: "Les Romains ont construit plus de 80 000 km de routes pavées à travers l'Empire. Certaines existent encore !", fact: "L'expression 'tous les chemins mènent à Rome' vient de la !" },
        ],
        quiz: [
          { q: "Qui a fondé Rome ?", correct: "Romulus", wrong1: "César", wrong2: "Cléopâtre", emoji: '🐺' },
          { q: "Combien de spectateurs au Colisée ?", correct: "50 000", wrong1: "100", wrong2: "1 million", emoji: '🏟️' },
          { q: "Qui a conquis la Gaule ?", correct: "Jules César", wrong1: "Romulus", wrong2: "Marco Polo", emoji: '⚔️' },
        ]
      },
      {
        id: 'it_renaissance', era: '1300 — 1600', title: "La Renaissance",
        subtitle: 'Artistes et génies',
        emoji: '🎨', color: '#7B1FA2', light: '#F3E5F5',
        intro: "Du 14e au 16e siècle, l'Italie connaît une explosion de créativité : la Renaissance. C'est l'époque de Léonard de Vinci, Michel-Ange, Raphaël. Florence et Venise sont les capitales mondiales de l'art.",
        figure: { name: "Léonard de Vinci", emoji: '🎨', desc: "Peintre, inventeur, scientifique, ingénieur (1452-1519). Génie universel qui a peint la Joconde et imaginé hélicoptères et chars d'assaut 400 ans avant leur invention." },
        cards: [
          { emoji: '🖼️', title: "La Joconde", text: "Peinte par Léonard de Vinci vers 1503. C'est le tableau le plus célèbre du monde, exposé au Louvre à Paris.", fact: "La Joconde a été volee en 1911 et retrouvée 2 ans plus tard. C'est ce vol qui l'a rendue célèbre !" },
          { emoji: '🗿', title: "Michel-Ange", text: "Sculpteur et peintre génial. Il a sculpté le David et peint le plafond de la Chapelle Sixtine au Vatican.", fact: "Il a passé 4 ans allongé sur le dos pour peindre la Chapelle Sixtine !" },
          { emoji: '⚙️', title: "Les Inventions de Léonard", text: "Léonard de Vinci a dessiné des hélicoptères, des sous-marins, des chars, des parachutes... 400 ans avant qu'on les invente vraiment !", fact: "Ses cahiers contenaient 13 000 pages de dessins et de notes !" },
          { emoji: '🏛️', title: "Florence et les Médicis", text: "Florence est le cœur de la Renaissance. La famille des Médicis, banquiers très riches, financé les artistes.", fact: "Les Médicis ont produit 4 papes et 2 reines de France !" },
        ],
        quiz: [
          { q: "Qui a peint la Joconde ?", correct: "Léonard de Vinci", wrong1: "Michel-Ange", wrong2: "Picasso", emoji: '🖼️' },
          { q: "Qui a sculpté le David ?", correct: "Michel-Ange", wrong1: "César", wrong2: "Léonard", emoji: '🗿' },
          { q: "Quelle famille a financé les artistes à Florence ?", correct: "Les Médicis", wrong1: "Les Bourbon", wrong2: "Les Tudors", emoji: '💰' },
        ]
      },
      {
        id: 'it_unification', era: '1815 — 1871', title: "L'Unification",
        subtitle: 'La naissance de l\'Italie moderne',
        emoji: '🇮🇹', color: '#1565C0', light: '#E3F2FD',
        intro: "Pendant des siècles, l'Italie était divisée en de nombreux petits États. Au 19e siècle, des hommes comme Garibaldi se battent pour unir l'Italie. En 1861, le royaume d'Italie est créé. En 1871, Rome devient la capitale.",
        figure: { name: "Giuseppe Garibaldi", emoji: '🎖️', desc: "Héros de l'unification italienne (1807-1882). Avec ses 'Mille' chemises rouges, il a conquis le sud de l'Italie." },
        cards: [
          { emoji: '⚔️', title: "Garibaldi et les Mille", text: "En 1860, Garibaldi part avec 1000 volontaires en chemises rouges et conquiert la Sicile et le sud de l'Italie. C'est un exploit incroyable !", fact: "Garibaldi est un héros mondial. Une statue de lui se trouve à New York, Washington, Buenos Aires..." },
          { emoji: '👑', title: "Le Royaume d'Italie", text: "En 1861, Victor-Emmanuel II devient le 1er roi d'Italie unifiée. Mais Rome reste sous le pape pendant 10 ans encore.", fact: "Avant 1861, on ne parlait pas vraiment 'italien' — chaque région avait son dialecte !" },
          { emoji: '🏛️', title: "Rome Capitale 1871", text: "En 1871, l'armée italienne entre à Rome. La ville devient la capitale du royaume. L'Italie est enfin complète.", fact: "Le pape s'est enfermé au Vatican pendant 60 ans pour protester !" },
        ],
        quiz: [
          { q: "Qui était Garibaldi ?", correct: "Le héros de l'unification italienne", wrong1: "Un peintre", wrong2: "Un pape", emoji: '🎖️' },
          { q: "Quand l'Italie est-elle unifiée ?", correct: "En 1861", wrong1: "En 1500", wrong2: "En 1945", emoji: '🇮🇹' },
          { q: "Quand Rome devient-elle capitale ?", correct: "En 1871", wrong1: "En 753 av. J.-C.", wrong2: "En 2000", emoji: '🏛️' },
        ]
      },
      {
        id: 'it_20th', era: '1922 — 1945', title: "Le 20e Siècle",
        subtitle: 'Mussolini et les guerres',
        emoji: '⚔️', color: '#424242', light: '#EEEEEE',
        intro: "En 1922, Benito Mussolini prend le pouvoir et impose une dictature fasciste. Il allie l'Italie à Hitler. La 2e Guerre Mondiale est un désastre. En 1946, l'Italie devient une république.",
        figure: { name: "Le Peuple Italien", emoji: '👥', desc: "Après les horreurs de la guerre, les Italiens ont reconstruit leur pays et fait de l'Italie une grande démocratie européenne." },
        cards: [
          { emoji: '⚔️', title: "Mussolini", text: "Mussolini prend le pouvoir en 1922 et installe une dictature. Il s'allie à Hitler en 1936. Cela mènera à la guerre.", fact: "Mussolini se faisait appeler 'Il Duce' (le chef) — un titre que les Italiens trouvent honteux aujourd'hui." },
          { emoji: '🕊️', title: "La Résistance", text: "Pendant la guerre, des milliers d'Italiens (les 'partigiani') ont résisté contre les fascistes et les Nazis. Ils sont des héros nationaux.", fact: "La fête du 25 avril célèbre la libération de l'Italie en 1945 !" },
          { emoji: '🗳️', title: "La République 1946", text: "En 1946, les Italiens votent : ils choisissent la république au lieu de la monarchie. Pour la 1re fois, les femmes votent !", fact: "Le roi a du quitter l'Italie le jour même de la proclamation de la république." },
        ],
        quiz: [
          { q: "Qui était Mussolini ?", correct: "Un dictateur fasciste", wrong1: "Un peintre", wrong2: "Un footballeur", emoji: '⚔️' },
          { q: "Quand l'Italie devient une république ?", correct: "En 1946", wrong1: "En 1500", wrong2: "En 2000", emoji: '🗳️' },
          { q: "Que célèbre le 25 avril ?", correct: "La libération", wrong1: "La fondation de Rome", wrong2: "Noël", emoji: '🕊️' },
        ]
      },
      {
        id: 'it_today', era: "Aujourd'hui", title: "L'Italie Moderne",
        subtitle: 'Pizza, mode et football',
        emoji: '🍕', color: '#008C45', light: '#E8F5E9',
        intro: "L'Italie est aujourd'hui un grand pays européen, célèbre pour sa cuisine, sa mode (Milan), son design, son cinéma et son football. Elle a une histoire riche de 3000 ans qu'elle protège jalousement.",
        figure: { name: "Les Italiens", emoji: '👨‍🍳', desc: "Réputé pour leur passion, leur cuisine, leur famille et leur amour de la vie ('la dolce vita')." },
        cards: [
          { emoji: '🍕', title: "La Pizza", text: "Inventée à Naples au 18e siècle. La pizza Margherita (rouge, blanc, vert) a été créée en 1889 en l'honneur de la reine Marguerite.", fact: "L'art du pizzaïolo napolitain est inscrit au patrimoine de l'UNESCO !" },
          { emoji: '🍝', title: "Les Pâtes", text: "L'Italie produit plus de 400 formes de pâtes différentes. Chaque région à ses recettes traditionnelles.", fact: "Un Italien mange en moyenne 23 kg de pâtes par an !" },
          { emoji: '⚽', title: "La Squadra Azzurra", text: "L'équipe nationale d'Italie a gagné 4 Coupes du Monde de football (1934, 1938, 1982, 2006).", fact: "L'Italie a gagné contre la France en finale en 2006 — après le coup de tête de Zidane !" },
          { emoji: '🏛️', title: "Le Patrimoine Mondial", text: "L'Italie a 58 sites classes au patrimoine de l'UNESCO — c'est le pays qui en a le plus au monde !", fact: "Venise, Florence, Rome, Pompéi... toute l'Italie est un musée à ciel ouvert." },
        ],
        quiz: [
          { q: "Où est née la pizza ?", correct: "À Naples", wrong1: "À Rome", wrong2: "À Paris", emoji: '🍕' },
          { q: "Combien de Coupes du Monde l'Italie a-t-elle gagne ?", correct: "4", wrong1: "1", wrong2: "10", emoji: '⚽' },
          { q: "Combien de sites UNESCO en Italie ?", correct: "58 sites", wrong1: "2 sites", wrong2: "Aucun", emoji: '🏛️' },
        ]
      },
    ]
  },

  GR: {
    name: 'Grèce', flag: '🇬🇷', region: 'europe',
    color: '#0D5EAF', dark: '#06325C', bg: '#E3F2FD',
    hero: { emoji: '👦🏻', name: 'Niko', age: 8 },
    tagline: "Le berceau de la démocratie",
    chapters: [
      {
        id: 'gr_antique', era: '800 — 146 av. J.-C.', title: "La Grèce Antique",
        subtitle: 'Athènes et la démocratie',
        emoji: '🏛️', color: '#0D5EAF', light: '#E3F2FD',
        intro: "Il y a 2500 ans, les Grecs ont inventé la démocratie à Athènes. C'est la qu'on a aussi inventé la philosophie, le théâtre, les Jeux Olympiques et les mathématiques modernes. La Grèce est le berceau de notre civilisation occidentale.",
        figure: { name: "Périclès", emoji: '👨‍⚖️', desc: "Homme politique d'Athènes au 5e siècle av. J.-C. Il a développé la démocratie et fait construire le Parthénon." },
        cards: [
          { emoji: '🗳️', title: "La Démocratie", text: "À Athènes, vers 500 av. J.-C., les citoyens votaient les lois eux-mêmes. C'est la naissance de la démocratie ('pouvoir du peuple').", fact: "Le mot 'démocratie' vient du grec : 'demos' (peuple) et 'kratos' (pouvoir) !" },
          { emoji: '🏛️', title: "Le Parthénon", text: "Temple dédié à la déesse Athéna, construit en 432 av. J.-C. sur l'Acropole d'Athènes. C'est le plus célèbre monument grec.", fact: "Il a tenu debout 2400 ans malgré les guerres et les tremblements de terre !" },
          { emoji: '🏃', title: "Les Jeux Olympiques", text: "Créés en 776 av. J.-C. à Olympie, les Jeux ont eu lieu tous les 4 ans pendant 1000 ans. Les athlètes concouraient nus !", fact: "Pendant les Jeux, toutes les guerres devaient s'arrêter — c'était la 'trêve sacrée' !" },
          { emoji: '🤔', title: "Socrate, Platon, Aristote", text: "Les premiers grands philosophes du monde. Ils ont inventé la façon de penser, de raisonner, de chercher la vérité.", fact: "Socrate a été condamné a mort pour avoir 'corrompu la jeunesse' — c'est-à-dire pour avoir appris aux jeunes à penser !" },
        ],
        quiz: [
          { q: "Où est née la démocratie ?", correct: "À Athènes", wrong1: "À Rome", wrong2: "À Paris", emoji: '🗳️' },
          { q: "Quand sont nés les Jeux Olympiques ?", correct: "En 776 av. J.-C.", wrong1: "En 1900", wrong2: "En 2000", emoji: '🏃' },
          { q: "Que signifie 'démocratie' ?", correct: "Pouvoir du peuple", wrong1: "Pouvoir des dieux", wrong2: "Pouvoir des riches", emoji: '👥' },
        ]
      },
      {
        id: 'gr_alex', era: '356 — 323 av. J.-C.', title: "Alexandre le Grand",
        subtitle: 'Le plus grand conquérant',
        emoji: '⚔️', color: '#C62828', light: '#FFEBEE',
        intro: "Alexandre le Grand est l'un des plus grands conquérants de l'histoire. En 12 ans, il a conquis un empire immense, de la Grèce à l'Inde. Il est mort jeune à 32 ans.",
        figure: { name: "Alexandre le Grand", emoji: '⚔️', desc: "Roi de Macédoine (356-323 av. J.-C.), élève de Aristote, il a conquis le plus grand empire connu de son temps." },
        cards: [
          { emoji: '🐎', title: "Le Cheval Bucéphale", text: "Alexandre a dompté son cheval Bucéphale à 12 ans, alors que personne n'y arrivait. Il a vu que le cheval avait peur de son ombre !", fact: "Bucéphale a accompagné Alexandre dans toutes ses batailles pendant 18 ans." },
          { emoji: '🌍', title: "L'Empire d'Alexandre", text: "En 12 ans, Alexandre a conquis la Perse, l'Égypte, et est arrivé jusqu'aux portes de l'Inde. Son empire faisait 5 millions de km² !", fact: "Il a fondé plus de 70 villes appelées 'Alexandrie' — la plus célèbre est en Égypte." },
          { emoji: '📚', title: "L'Élève d'Aristote", text: "Aristote, le grand philosophe, a été le précepteur d'Alexandre pendant 3 ans. Il lui a appris la philosophie, la science et la littérature.", fact: "Alexandre dormait avec un poignard et l'Iliade d'Homère sous son oreiller !" },
        ],
        quiz: [
          { q: "Qui était le maître d'Alexandre ?", correct: "Aristote", wrong1: "César", wrong2: "Socrate", emoji: '📚' },
          { q: "Comment s'appelait son cheval ?", correct: "Bucéphale", wrong1: "Pegasus", wrong2: "Black Beauty", emoji: '🐎' },
          { q: "À quel âge est mort Alexandre ?", correct: "32 ans", wrong1: "80 ans", wrong2: "10 ans", emoji: '⚔️' },
        ]
      },
      {
        id: 'gr_byzance', era: '330 — 1453', title: "L'Empire Byzantin",
        subtitle: 'La nouvelle Rome',
        emoji: '⛪', color: '#7B1FA2', light: '#F3E5F5',
        intro: "Quand l'Empire romain est tombe, sa partie orientale (grecque) a continué pendant 1000 ans encore. C'est l'Empire byzantin, avec Constantinople pour capitale. Il a protégé le christianisme et la culture grecque.",
        figure: { name: "Justinien", emoji: '👑', desc: "Empereur byzantin (527-565). Il a fait construire Sainte-Sophie et codifier les lois romaines." },
        cards: [
          { emoji: '⛪', title: "Sainte-Sophie", text: "Église géante construite en 537 à Constantinople. Pendant 1000 ans, c'était la plus grande église du monde.", fact: "Aujourd'hui c'est une mosquée à Istanbul (Turquie). Mais on voit encore les peintures chrétiennes !" },
          { emoji: '🏰', title: "Constantinople", text: "Capitale de l'Empire byzantin. C'était la plus grande et la plus riche ville du monde au Moyen Âge.", fact: "Les remparts de Constantinople ont résisté a plus de 20 sièges en 1000 ans !" },
          { emoji: '⚔️', title: "La Chute de 1453", text: "En 1453, les Turcs ottomans, avec d'énormes canons, prennent Constantinople. C'est la fin de l'Empire byzantin.", fact: "Le canon turc faisait 8 mètres de long et tirait des boulets de 700 kg !" },
        ],
        quiz: [
          { q: "Quelle était la capitale byzantine ?", correct: "Constantinople", wrong1: "Athènes", wrong2: "Rome", emoji: '🏰' },
          { q: "Quand Constantinople tombe ?", correct: "En 1453", wrong1: "En 800", wrong2: "En 1900", emoji: '⚔️' },
          { q: "Quelle église célèbre ?", correct: "Sainte-Sophie", wrong1: "Notre-Dame", wrong2: "Saint-Pierre", emoji: '⛪' },
        ]
      },
      {
        id: 'gr_independance', era: '1821 — 1832', title: "L'Indépendance",
        subtitle: 'La révolte contre les Ottomans',
        emoji: '🇬🇷', color: '#1B5E20', light: '#E8F5E9',
        intro: "Après 400 ans sous domination ottomane, les Grecs se révoltent en 1821. Soutenus par l'Europe (notamment le poète anglais Lord Byron), ils obtiennent l'indépendance en 1832.",
        figure: { name: "Theodoros Kolokotronis", emoji: '⚔️', desc: "Général et héros de la guerre d'indépendance grecque, il a battu les Ottomans à plusieurs reprises." },
        cards: [
          { emoji: '⚔️', title: "La Révolte de 1821", text: "Le 25 mars 1821, les Grecs se révoltent contre les Ottomans. La guerre dure 11 ans et fait des centaines de milliers de morts.", fact: "Le 25 mars est la fête nationale de la Grèce !" },
          { emoji: '✍️', title: "Lord Byron", text: "Le poète anglais Lord Byron a vendu ses biens pour aider les Grecs. Il est mort en Grèce en 1824 et est considéré comme un héros national.", fact: "Beaucoup d'Européens cultivés admiraient la Grèce antique et voulaient aider les Grecs modernes." },
          { emoji: '🇬🇷', title: "L'Indépendance 1832", text: "En 1832, la Grèce devient un royaume indépendant. Le prince allemand Othon devient le 1er roi.", fact: "Le drapeau grec a 9 lignes — une pour chaque syllabe de 'Eleftheria i Thanatos' (Liberté ou Mort) !" },
        ],
        quiz: [
          { q: "Quand la Grèce devient indépendante ?", correct: "En 1832", wrong1: "En 1500", wrong2: "En 1945", emoji: '🇬🇷' },
          { q: "Quel poète anglais a aidé les Grecs ?", correct: "Lord Byron", wrong1: "Shakespeare", wrong2: "Dickens", emoji: '✍️' },
          { q: "Quel jour est la fête nationale grecque ?", correct: "Le 25 mars", wrong1: "Le 14 juillet", wrong2: "Le 1er janvier", emoji: '🎉' },
        ]
      },
      {
        id: 'gr_today', era: "Aujourd'hui", title: "La Grèce Moderne",
        subtitle: 'Îles, soleil et tradition',
        emoji: '🌟', color: '#0D5EAF', light: '#E3F2FD',
        intro: "La Grèce d'aujourd'hui compte plus de 6000 îles ! C'est un grand pays touristique, avec une culture millénaire toujours vivante. Athènes est la capitale et compte 4 millions d'habitants.",
        figure: { name: "Le peuple grec", emoji: '👥', desc: "Héritier de 3000 ans d'histoire, le peuple grec est connu pour son hospitalité ('philoxenia') et sa joie de vivre." },
        cards: [
          { emoji: '🏝️', title: "Les Îles Grecques", text: "La Grèce a plus de 6000 îles, dont 227 sont habitées. Santorin et Mykonos sont les plus célèbres pour leurs maisons blanches et bleues.", fact: "Santorin est en fait un volcan ! L'éruption il y a 3600 ans est l'une des plus grandes de l'histoire." },
          { emoji: '🥗', title: "La Cuisine Grecque", text: "Salade grecque, moussaka, souvlaki, tzatziki, baklava... La cuisine grecque est méditerranéenne et très saine.", fact: "Le yaourt grec est mange depuis des milliers d'années. Aujourd'hui il est exporté dans le monde entier !" },
          { emoji: '🏛️', title: "L'Héritage Antique", text: "Les ruines antiques sont partout en Grèce : Acropole, Olympie, Delphes, Épidaure... Elles attirent des millions de visiteurs.", fact: "5 mots du français sur 10 viennent du grec ancien !" },
        ],
        quiz: [
          { q: "Combien d'îles à la Grèce ?", correct: "Plus de 6000", wrong1: "10", wrong2: "1 million", emoji: '🏝️' },
          { q: "Quelle île est en fait un volcan ?", correct: "Santorin", wrong1: "Mykonos", wrong2: "Crète", emoji: '🌋' },
          { q: "Que veut dire 'philoxenia' ?", correct: "Hospitalité", wrong1: "Liberté", wrong2: "Famille", emoji: '🤝' },
        ]
      },
    ]
  },

  TR: {
    name: 'Turquie', flag: '🇹🇷', region: 'asia',
    color: '#E30A17', dark: '#7A050B', bg: '#FFEBEE',
    hero: { emoji: '👦🏽', name: 'Mehmet', age: 8 },
    tagline: "Entre l'Europe et l'Asie",
    chapters: [
      {
        id: 'tr_anatolie', era: 'Avant 1300', title: "L'Anatolie Antique",
        subtitle: 'Hittites, Troie et Byzance',
        emoji: '🏛️', color: '#5D4037', light: '#EFEBE9',
        intro: "Avant les Turcs, l'Anatolie était habitée par de nombreux peuples : Hittites, Troyens, Grecs, Byzantins. La célèbre guerre de Troie a eu lieu sur le territoire de la Turquie actuelle.",
        figure: { name: "Le Cheval de Troie", emoji: '🐴', desc: "Selon la légende racontée par Homère, les Grecs auraient caché des soldats dans un cheval géant en bois pour entrer dans Troie." },
        cards: [
          { emoji: '🐴', title: "La Guerre de Troie", text: "Vers 1200 av. J.-C., les Grecs ont attaqué la ville de Troie pendant 10 ans. Ils ont fini par la prendre grâce à un cheval en bois.", fact: "Les ruines de Troie ont été découvertes en 1870 par un archéologue allemand, Heinrich Schliemann !" },
          { emoji: '⚒️', title: "Les Hittites", text: "Vers 1500 av. J.-C., les Hittites étaient l'une des plus grandes puissances du Moyen-Orient. Ils ont rivalisé avec l'Égypte.", fact: "Le 1er traité de paix de l'histoire (1259 av. J.-C.) a été signé entre les Hittites et l'Égypte !" },
          { emoji: '⛪', title: "L'Empire Byzantin", text: "Pendant 1000 ans, l'Anatolie était le cœur de l'Empire byzantin (chrétien et grec). Constantinople était la plus grande ville du monde.", fact: "Constantinople est devenue Istanbul quand les Turcs l'ont prise en 1453." },
        ],
        quiz: [
          { q: "Comment les Grecs ont pris Troie ?", correct: "Avec un cheval en bois", wrong1: "Avec des canons", wrong2: "Avec des éléphants", emoji: '🐴' },
          { q: "Qui étaient les Hittites ?", correct: "Une grande puissance ancienne", wrong1: "Des marchands chinois", wrong2: "Des Vikings", emoji: '⚒️' },
          { q: "Quel était l'ancien nom d'Istanbul ?", correct: "Constantinople", wrong1: "Athènes", wrong2: "Rome", emoji: '🏛️' },
        ]
      },
      {
        id: 'tr_seljuk', era: '1071 — 1453', title: "Les Seldjoukides",
        subtitle: 'L\'arrivée des Turcs',
        emoji: '🏹', color: '#1565C0', light: '#E3F2FD',
        intro: "Vers l'an 1000, des Turcs venus d'Asie centrale arrivent en Anatolie. Les Seldjoukides battent les Byzantins à Manzikert en 1071. Ils s'installent durablement et l'Anatolie devient la 'terre des Turcs' (Turchia, Turquie).",
        figure: { name: "Alp Arslan", emoji: '⚔️', desc: "Sultan seldjoukide qui a battu l'empereur byzantin à Manzikert en 1071, ouvrant l'Anatolie aux Turcs." },
        cards: [
          { emoji: '⚔️', title: "La Bataille de Manzikert 1071", text: "Le sultan Alp Arslan bat l'empereur byzantin Romain IV. C'est le début de la présence turque en Anatolie.", fact: "Alp Arslan signifie 'Lion Héroïque' en turc !" },
          { emoji: '🕌', title: "Konya", text: "Konya devient la capitale des Seldjoukides. C'est aussi la ville du grand poète soufi Rumi.", fact: "Les 'derviches tourneurs' de Konya tournent sur eux-mêmes pour atteindre Dieu — ils existent depuis 800 ans !" },
          { emoji: '✍️', title: "Rumi (1207-1273)", text: "Le plus grand poète mystique du monde musulman. Ses vers sur l'amour et la spiritualité sont lus dans le monde entier.", fact: "En 2007, Rumi était le poète le plus vendu aux États-Unis !" },
        ],
        quiz: [
          { q: "Quelle bataille en 1071 ?", correct: "Manzikert", wrong1: "Waterloo", wrong2: "Hastings", emoji: '⚔️' },
          { q: "Que signifie Alp Arslan ?", correct: "Lion Héroïque", wrong1: "Grand Sage", wrong2: "Petit Loup", emoji: '🦁' },
          { q: "Qui était Rumi ?", correct: "Un poète mystique", wrong1: "Un sultan", wrong2: "Un soldat", emoji: '✍️' },
        ]
      },
      {
        id: 'tr_ottoman', era: '1453 — 1923', title: "L'Empire Ottoman",
        subtitle: 'Soliman le Magnifique',
        emoji: '👑', color: '#E30A17', light: '#FFEBEE',
        intro: "En 1453, le sultan Mehmet II prend Constantinople, marquant la fin de l'Empire byzantin et le début de l'Empire ottoman. Au 16e siècle, sous Soliman le Magnifique, l'Empire ottoman devient l'une des plus grandes puissances du monde.",
        figure: { name: "Soliman le Magnifique", emoji: '👑', desc: "Sultan ottoman (1520-1566), il a étendu l'empire jusqu'à Vienne et fait construire de nombreuses mosquées magnifiques." },
        cards: [
          { emoji: '🏰', title: "La Prise de Constantinople 1453", text: "Le 29 mai 1453, le jeune sultan Mehmet II (21 ans) prend Constantinople après un siège de 53 jours. La ville devient Istanbul.", fact: "Mehmet II a fait transporter ses navires sur la terre ferme pendant la nuit pour surprendre les défenseurs !" },
          { emoji: '🕌', title: "La Mosquée Bleue", text: "Construite à Istanbul entre 1609 et 1616, elle est célèbre pour ses 20 000 carreaux de faïence bleue. Elle a 6 minarets.", fact: "C'était la 1re mosquée à avoir 6 minarets — un scandale pour l'époque !" },
          { emoji: '⚔️', title: "Soliman le Magnifique", text: "Il a régné 46 ans (1520-1566) et a étendu l'empire jusqu'à Vienne, en Égypte et en Algérie. Pour les Turcs, il est 'le législateur'.", fact: "Sous Soliman, l'Empire ottoman a fait 30 millions d'habitants — plus que l'Europe entière !" },
          { emoji: '☕', title: "Le Café Turc", text: "Le café est arrivé à Istanbul au 16e siècle. Les premiers cafés du monde ont ouvert dans la ville. Le café turc est inscrit à l'UNESCO.", fact: "Les Ottomans ont apporté le café en Europe via Vienne !" },
        ],
        quiz: [
          { q: "Quand Constantinople devient Istanbul ?", correct: "En 1453", wrong1: "En 800", wrong2: "En 1900", emoji: '🏰' },
          { q: "Combien de minarets la Mosquée Bleue ?", correct: "6", wrong1: "1", wrong2: "20", emoji: '🕌' },
          { q: "Combien de temps régna Soliman ?", correct: "46 ans", wrong1: "5 ans", wrong2: "1 an", emoji: '👑' },
        ]
      },
      {
        id: 'tr_ataturk', era: '1923 — 1938', title: "Mustafa Kemal",
        subtitle: 'Le père des Turcs',
        emoji: '🌟', color: '#1B5E20', light: '#E8F5E9',
        intro: "Après la Première Guerre mondiale, l'Empire ottoman s'effondre. Mustafa Kemal mène la guerre d'indépendance, fonde la république en 1923 et modernise totalement la Turquie. Il prend le nom 'Atatürk' (père des Turcs).",
        figure: { name: "Mustafa Kemal Atatürk", emoji: '🎖️', desc: "Héros militaire et fondateur de la Turquie moderne (1881-1938). Il a transformé un empire islamique en république laïque en 15 ans." },
        cards: [
          { emoji: '⚔️', title: "La Guerre d'Indépendance", text: "Après la 1re guerre mondiale, les Alliés veulent partager la Turquie. Mustafa Kemal organise la résistance et bat les Grecs et les Alliés en 1922.", fact: "Mustafa Kemal n'a jamais perdu une bataille de toute sa carrière militaire !" },
          { emoji: '🏛️', title: "La République 1923", text: "Le 29 octobre 1923, la république de Turquie est proclamée. Ankara devient la capitale à la place d'Istanbul.", fact: "Le 29 octobre est la fête nationale turque !" },
          { emoji: '📚', title: "Les Réformes", text: "Atatürk transforme tout : il adopte l'alphabet latin (au lieu de l'arabe), donne le vote aux femmes (avant la France !), sépare la religion de l'État.", fact: "Les femmes turques ont obtenu le droit de vote en 1934 — la France attendra 1944 !" },
        ],
        quiz: [
          { q: "Que signifie Atatürk ?", correct: "Père des Turcs", wrong1: "Sultan d'or", wrong2: "Roi du désert", emoji: '🌟' },
          { q: "Quand est née la république turque ?", correct: "En 1923", wrong1: "En 1453", wrong2: "En 1945", emoji: '🏛️' },
          { q: "Quand les femmes turques votent ?", correct: "En 1934", wrong1: "En 1900", wrong2: "En 2000", emoji: '🗳️' },
        ]
      },
      {
        id: 'tr_today', era: "Aujourd'hui", title: "La Turquie Moderne",
        subtitle: 'Pont entre 2 continents',
        emoji: '🌉', color: '#E30A17', light: '#FFEBEE',
        intro: "La Turquie compte 85 millions d'habitants. Istanbul est la seule ville au monde à cheval sur 2 continents (Europe et Asie). C'est un grand pays moderne avec une culture millénaire.",
        figure: { name: "Le peuple turc", emoji: '👥', desc: "Connu pour son hospitalité, sa cuisine et sa diversité culturelle entre Orient et Occident." },
        cards: [
          { emoji: '🌉', title: "Istanbul, 2 Continents", text: "Istanbul est la seule grande ville au monde construite sur 2 continents : l'Europe et l'Asie. Le Bosphore les sépare.", fact: "On peut prendre un ferry pour 'changer de continent' en 15 minutes !" },
          { emoji: '🥙', title: "La Cuisine Turque", text: "Kebab, baklava, lokoum, pilaf, dolmas... La cuisine turque est l'une des plus riches au monde, avec des influences orientales et européennes.", fact: "Le baklava (pâtisserie au miel) est en réalité une invention ottomane !" },
          { emoji: '🎨', title: "La Cappadoce", text: "Une région magique avec des cheminées de fée creusées par l'érosion. On peut survoler en montgolfière et dormir dans des hôtels-grottes.", fact: "Les premiers chrétiens persécutés se cachaient dans des villes souterraines en Cappadoce !" },
        ],
        quiz: [
          { q: "Sur combien de continents Istanbul ?", correct: "2 (Europe et Asie)", wrong1: "1", wrong2: "3", emoji: '🌉' },
          { q: "Quelle région a des cheminées de fée ?", correct: "La Cappadoce", wrong1: "Le Sahara", wrong2: "L'Anatolie", emoji: '🎨' },
          { q: "Combien d'habitants en Turquie ?", correct: "85 millions", wrong1: "1 million", wrong2: "1 milliard", emoji: '👥' },
        ]
      },
    ]
  },

  AR: {
    name: 'Argentine', flag: '🇦🇷', region: 'americas',
    color: '#75AADB', dark: '#3D5C7A', bg: '#E3F2FD',
    hero: { emoji: '👦🏽', name: 'Lionel', age: 8 },
    tagline: "Tango, football et pampa",
    chapters: [
      {
        id: 'ar_natives', era: 'Avant 1500', title: "Les Peuples Indigènes",
        subtitle: 'Mapuches, Guaranis et Quechuas',
        emoji: '🏹', color: '#5D4037', light: '#EFEBE9',
        intro: "Avant l'arrivée des Espagnols, l'Argentine était habitée par de nombreux peuples indigènes : les Mapuches dans le sud, les Guaranis dans le nord-est, et les Quechuas dans les Andes (proches de l'Empire Inca).",
        figure: { name: "Les Mapuches", emoji: '🛡️', desc: "Peuple guerrier de Patagonie qui a résisté pendant 300 ans aux Espagnols et aux Argentins. Ils existent toujours aujourd'hui." },
        cards: [
          { emoji: '🛡️', title: "Les Mapuches", text: "Les Mapuches vivaient dans le sud de l'Argentine et du Chili. Ils étaient si bons guerriers qu'ils ont résisté aux Espagnols pendant 300 ans.", fact: "'Mapuche' signifie 'peuple de la terre' en mapudungun !" },
          { emoji: '🌽', title: "Les Guaranis", text: "Les Guaranis vivaient dans le nord-est. Ils cultivaient le mais, le manioc et le maté. Le guarani est encore une langue officielle au Paraguay.", fact: "Beaucoup de mots français comme 'tapioca', 'jaguar', 'tapir' viennent du guarani !" },
          { emoji: '🏔️', title: "Les Andes", text: "Dans les montagnes du nord-ouest, les peuples Quechuas faisaient partie de l'Empire Inca. Ils cultivaient en terrasses sur les pentes.", fact: "L'Inca le plus célèbre Atahualpa parlait le quechua, encore parle aujourd'hui par 10 millions de personnes !" },
        ],
        quiz: [
          { q: "Quel peuple a résisté 300 ans aux Espagnols ?", correct: "Les Mapuches", wrong1: "Les Vikings", wrong2: "Les Romains", emoji: '🛡️' },
          { q: "Que signifie 'Mapuche' ?", correct: "Peuple de la terre", wrong1: "Grand guerrier", wrong2: "Roi du sud", emoji: '🌍' },
          { q: "Quel peuple parlait le guarani ?", correct: "Les Guaranis", wrong1: "Les Aztèques", wrong2: "Les Mayas", emoji: '🗣️' },
        ]
      },
      {
        id: 'ar_colonial', era: '1516 — 1810', title: "La Colonie Espagnole",
        subtitle: 'Le Rio de la Plata',
        emoji: '⛵', color: '#7B1FA2', light: '#F3E5F5',
        intro: "En 1516, les Espagnols arrivent. Ils fondent Buenos Aires en 1536 (puis à nouveau en 1580). Pendant 300 ans, l'Argentine fait partie de l'empire espagnol. Le pays tire son nom du latin 'argentum' (argent), car les Espagnols cherchaient de l'argent.",
        figure: { name: "Pedro de Mendoza", emoji: '⛵', desc: "Conquistador espagnol qui a fondé Buenos Aires en 1536. La ville a été abandonnée puis refondée en 1580." },
        cards: [
          { emoji: '⛵', title: "La Fondation de Buenos Aires", text: "Pedro de Mendoza fonde Buenos Aires en 1536 — mais elle est détruite par les indigènes. Juan de Garay la refonde en 1580.", fact: "Buenos Aires signifie 'bons airs' en espagnol — les marins aimaient le vent de l'estuaire !" },
          { emoji: '🐎', title: "Les Gauchos", text: "Les Gauchos sont les cow-boys d'Argentine. Ils élèvent les vaches dans la pampa, les vastes plaines argentines.", fact: "Les Gauchos mangeaient 5 kg de viande par jour ! Ils détestaient les légumes." },
          { emoji: '🥩', title: "L'Asado", text: "Le barbecue argentin (asado) date de cette époque. La viande de bœuf reste l'une des fiertés nationales.", fact: "Les Argentins mangent en moyenne 50 kg de viande de bœuf par an et par personne !" },
        ],
        quiz: [
          { q: "Que signifie 'Buenos Aires' ?", correct: "Bons airs", wrong1: "Belle ville", wrong2: "Grande capitale", emoji: '🌬️' },
          { q: "Qui sont les Gauchos ?", correct: "Les cow-boys d'Argentine", wrong1: "Des marins", wrong2: "Des moines", emoji: '🐎' },
          { q: "D'où vient le mot 'Argentine' ?", correct: "Du latin 'argentum' (argent)", wrong1: "D'un roi", wrong2: "D'une ville", emoji: '🪙' },
        ]
      },
      {
        id: 'ar_independance', era: '1810 — 1816', title: "L'Indépendance",
        subtitle: 'San Martin, le libérateur',
        emoji: '⚔️', color: '#75AADB', light: '#E3F2FD',
        intro: "En 1810, les Argentins se révoltent contre l'Espagne. En 1816, l'indépendance est proclamée à Tucumán. Le général José de San Martin libère ensuite le Chili et le Pérou. Il est l'un des plus grands héros d'Amérique du Sud.",
        figure: { name: "José de San Martin", emoji: '🎖️', desc: "Général argentin (1778-1850), il a libéré l'Argentine, le Chili et le Pérou de l'Espagne. Avec Bolívar, c'est le père de l'indépendance sud-américaine." },
        cards: [
          { emoji: '🎖️', title: "José de San Martin", text: "Le plus grand héros d'Argentine. Il a libéré son pays mais aussi le Chili et le Pérou. Après la victoire, il a refusé le pouvoir et est parti en France.", fact: "Sa traversée des Andes avec 5000 hommes en 1817 est l'une des plus grandes opérations militaires de l'histoire !" },
          { emoji: '🏔️', title: "La Traversée des Andes", text: "En 1817, San Martin traverse les Andes (à 4000 m d'altitude) avec son armée pour attaquer le Chili par surprise. Une exploit comparable à celle d'Hannibal.", fact: "Ses hommes portaient des chaussures de cuir et plusieurs sont morts de froid en chemin !" },
          { emoji: '🇦🇷', title: "Le Drapeau Argentin", text: "Le drapeau bleu et blanc avec un soleil est créé en 1812 par le général Manuel Belgrano. Le soleil représente le 'Soleil de Mai' (la liberté).", fact: "Le bleu et le blanc représentent le ciel argentin !" },
        ],
        quiz: [
          { q: "Qui a libéré l'Argentine ?", correct: "José de San Martin", wrong1: "Bolívar", wrong2: "Napoléon", emoji: '🎖️' },
          { q: "Quel exploit en 1817 ?", correct: "La traversée des Andes", wrong1: "La conquête de l'Espagne", wrong2: "La traversée de l'Atlantique", emoji: '🏔️' },
          { q: "Que représente le soleil sur le drapeau ?", correct: "Le Soleil de Mai (la liberté)", wrong1: "Le dieu Inca", wrong2: "L'or", emoji: '☀️' },
        ]
      },
      {
        id: 'ar_perons', era: '1946 — 1976', title: "L'Ère Perón",
        subtitle: 'Juan et Eva Perón',
        emoji: '⭐', color: '#E65100', light: '#FFF3E0',
        intro: "En 1946, Juan Perón est élu président. Sa femme Eva (Evita) devient la femme la plus aimée d'Argentine. Elle aide les pauvres, défend les femmes, et obtient le droit de vote pour elles. Elle meurt jeune à 33 ans et devient une légende.",
        figure: { name: "Eva Perón (Evita)", emoji: '👸', desc: "Femme de Juan Perón (1919-1952), surnommée Evita, elle est devenue une icône pour les pauvres et les femmes argentins." },
        cards: [
          { emoji: '👸', title: "Evita Perón", text: "Eva Duarte était actrice. En épousant Juan Perón, elle est devenue 'Evita', la femme la plus aimée d'Argentine. Elle défendait les pauvres et les femmes.", fact: "Quand Evita est morte à 33 ans, plus de 2 millions de personnes ont assiste à ses funérailles !" },
          { emoji: '🗳️', title: "Le Vote des Femmes", text: "Grâce à Evita, les femmes argentines ont obtenu le droit de vote en 1947.", fact: "C'est plus tôt qu'en France (1944) mais plus tard que la Turquie (1934) !" },
          { emoji: '🎭', title: "La Comédie Musicale Evita", text: "L'histoire d'Evita a inspiré une célèbre comédie musicale, puis un film avec Madonna en 1996.", fact: "La chanson 'Don't Cry for Me Argentina' est connue dans le monde entier !" },
        ],
        quiz: [
          { q: "Qui était Evita ?", correct: "La femme de Juan Perón", wrong1: "Une chanteuse", wrong2: "Une reine", emoji: '👸' },
          { q: "Quand les femmes argentines ont-elles vote ?", correct: "En 1947", wrong1: "En 1900", wrong2: "En 2000", emoji: '🗳️' },
          { q: "Qui a joué Evita au cinéma ?", correct: "Madonna", wrong1: "Beyoncé", wrong2: "Lady Gaga", emoji: '🎭' },
        ]
      },
      {
        id: 'ar_today', era: "Aujourd'hui", title: "L'Argentine Moderne",
        subtitle: 'Tango, football et Patagonie',
        emoji: '⚽', color: '#75AADB', light: '#E3F2FD',
        intro: "L'Argentine est un grand pays au sud de l'Amérique du Sud. Elle a 47 millions d'habitants et compte parmi ses fiertés : le tango, le football, le maté, la viande de bœuf et la Patagonie sauvage.",
        figure: { name: "Lionel Messi", emoji: '⚽', desc: "Considéré comme l'un des plus grands footballeurs de tous les temps. Il a remporté la Coupe du Monde 2022 avec l'Argentine." },
        cards: [
          { emoji: '💃', title: "Le Tango", text: "Le tango est ne dans les quartiers populaires de Buenos Aires à la fin du 19e siècle. Aujourd'hui c'est une danse mondiale.", fact: "Le tango est inscrit au patrimoine culturel de l'UNESCO depuis 2009 !" },
          { emoji: '⚽', title: "Messi et la Coupe 2022", text: "L'équipe d'Argentine a gagné la Coupe du Monde 2022 contre la France, avec Lionel Messi comme capitaine.", fact: "Maradona avait déjà gagné en 1986 — Messi a accompli son rêve d'enfance 36 ans plus tard !" },
          { emoji: '🐧', title: "La Patagonie", text: "Le sud de l'Argentine est la Patagonie : glaciers, montagnes, manchots, baleines. C'est l'un des plus beaux endroits au monde.", fact: "Le glacier Perito Moreno avance de 2 mètres par jour !" },
          { emoji: '🧉', title: "Le Maté", text: "Le maté est la boisson nationale. C'est une infusion d'herbes amère bue dans une calebasse avec une paille en métal (la bombilla).", fact: "Les Argentins consomment 5 kg de maté par personne et par an !" },
        ],
        quiz: [
          { q: "Où est ne le tango ?", correct: "À Buenos Aires", wrong1: "À Paris", wrong2: "À Madrid", emoji: '💃' },
          { q: "Qui a gagné la Coupe du Monde 2022 ?", correct: "L'Argentine", wrong1: "La France", wrong2: "Le Brésil", emoji: '⚽' },
          { q: "Comment s'appelle la boisson nationale ?", correct: "Le maté", wrong1: "Le café", wrong2: "Le the", emoji: '🧉' },
        ]
      },
    ]
  },

  PE: {
    name: 'Pérou', flag: '🇵🇪', region: 'americas',
    color: '#D91023', dark: '#7A0913', bg: '#FFEBEE',
    hero: { emoji: '👧🏽', name: 'Maya', age: 8 },
    tagline: "L'Empire Inca et le Machu Picchu",
    chapters: [
      {
        id: 'pe_pre', era: 'Avant 1438', title: "Les Civilisations Anciennes",
        subtitle: 'Caral, Nazca et Mochica',
        emoji: '🏺', color: '#5D4037', light: '#EFEBE9',
        intro: "Avant les Incas, le Pérou a connu de nombreuses civilisations. Caral, vieille de 5000 ans, est l'une des plus anciennes villes du monde. Les Nazcas ont dessiné des lignes géantes dans le désert. Les Mochicas étaient de grands artistes.",
        figure: { name: "Les Civilisations Andines", emoji: '🏛️', desc: "Pendant 5000 ans, des dizaines de cultures se sont succédé dans les Andes péruviennes." },
        cards: [
          { emoji: '🏛️', title: "Caral, la Plus Vieille Ville", text: "Caral, fondée il y a 5000 ans, est aussi vieille que les pyramides d'Égypte. Mais elle est restée oubliée pendant des siècles.", fact: "Caral n'avait pas de murailles ni d'armes — ses habitants vivaient en paix !" },
          { emoji: '🦅', title: "Les Lignes de Nazca", text: "Dans le désert péruvien, les Nazcas ont dessiné d'énormes figures (un singe, un colibri, une araignée...) il y a 2000 ans. On ne les voit que du ciel !", fact: "Personne ne sait pourquoi ils les ont faites ! Certains pensent que c'étaient des messages aux dieux." },
          { emoji: '🏺', title: "Les Mochicas", text: "Les Mochicas (100-700 ap. J.-C.) étaient de grands artistes. Ils faisaient des poteries représentant des visages très réalistes.", fact: "Les Mochicas faisaient des opérations chirurgicales du crâne il y a 1500 ans !" },
        ],
        quiz: [
          { q: "Quel âge à la ville de Caral ?", correct: "5000 ans", wrong1: "100 ans", wrong2: "1 million d'années", emoji: '🏛️' },
          { q: "Que sont les Lignes de Nazca ?", correct: "Des dessins géants dans le désert", wrong1: "Des routes", wrong2: "Des canaux", emoji: '🦅' },
          { q: "Que faisaient les Mochicas ?", correct: "Des poteries réalistes", wrong1: "Des télévisions", wrong2: "Des ordinateurs", emoji: '🏺' },
        ]
      },
      {
        id: 'pe_inca', era: '1438 — 1533', title: "L'Empire Inca",
        subtitle: 'Le plus grand empire d\'Amérique',
        emoji: '👑', color: '#FFB300', light: '#FFFDE7',
        intro: "Au 15e siècle, les Incas créent le plus grand empire d'Amérique du Sud. Il s'étend de la Colombie au Chili. Leur capitale, Cuzco, était magnifique. Ils ont construit le Machu Picchu et 40 000 km de routes à travers les Andes.",
        figure: { name: "Pachacútec", emoji: '👑', desc: "9e empereur Inca (1438-1471), il a transformé le royaume Inca en immense empire. C'est lui qui a fait construire le Machu Picchu." },
        cards: [
          { emoji: '🏔️', title: "Le Machu Picchu", text: "Construit vers 1450 à 2430 mètres d'altitude, le Machu Picchu est une cité inca cachée dans les montagnes. Elle est restée oubliée jusqu'en 1911.", fact: "Les Incas ont taillé les pierres si parfaitement qu'on ne peut pas glisser une feuille de papier entre elles, sans ciment !" },
          { emoji: '🛣️', title: "Les Routes Inca", text: "Les Incas ont construit 40 000 km de routes à travers les Andes. Des coureurs (chasquis) portaient des messages à 240 km par jour !", fact: "Les routes inca étaient meilleures que les routes romaines en montagne !" },
          { emoji: '🌽', title: "Les Cultures en Terrasses", text: "Les Incas ont sculpté des terrasses dans les montagnes pour cultiver le mais, la pomme de terre et le quinoa.", fact: "La pomme de terre vient du Pérou ! Sans les Incas, pas de frites en Europe." },
          { emoji: '🪢', title: "Les Quipus", text: "Les Incas n'avaient pas d'écriture mais des cordes à nœuds (les quipus) pour compter et noter des informations.", fact: "On commence seulement à déchiffrer les quipus aujourd'hui — ils contiennent peut-être des histoires !" },
        ],
        quiz: [
          { q: "Quelle cité cachée ont construit les Incas ?", correct: "Le Machu Picchu", wrong1: "Le Colisée", wrong2: "Les pyramides", emoji: '🏔️' },
          { q: "D'où vient la pomme de terre ?", correct: "Du Pérou", wrong1: "De France", wrong2: "D'Italie", emoji: '🥔' },
          { q: "Comment les Incas notaient les informations ?", correct: "Avec des cordes à nœuds (quipus)", wrong1: "Avec des hiéroglyphes", wrong2: "Avec des lettres", emoji: '🪢' },
        ]
      },
      {
        id: 'pe_pizarro', era: '1532 — 1572', title: "La Conquête Espagnole",
        subtitle: 'Pizarro et la fin des Incas',
        emoji: '⚔️', color: '#C62828', light: '#FFEBEE',
        intro: "En 1532, le conquistador Francisco Pizarro arrive avec seulement 168 hommes. Il capturé l'empereur Inca Atahualpa par traîtrise et obtient une rançon en or. Puis il l'exécuté. C'est la fin tragique de l'Empire Inca.",
        figure: { name: "Atahualpa", emoji: '👑', desc: "Dernier empereur Inca (1502-1533), il fut capturé par les Espagnols et exécuté après avoir payé une rançon énorme en or et en argent." },
        cards: [
          { emoji: '⚔️', title: "Pizarro et 168 Hommes", text: "Avec seulement 168 soldats, des chevaux et des canons, Pizarro a battu une armée de 80 000 Incas à Cajamarca en 1532. Les Incas n'avaient jamais vu de chevaux !", fact: "Les Incas pensaient que les Espagnols et leurs chevaux étaient un seul animal monstrueux !" },
          { emoji: '🪙', title: "La Rançon d'Atahualpa", text: "Pour sa libération, Atahualpa promit de remplir une pièce d'or jusqu'au plafond. Il l'a fait — mais Pizarro l'a quand même exécuté.", fact: "La pièce a été remplie de 6 tonnes d'or et 12 tonnes d'argent. Pizarro a tout fait fondre en lingots !" },
          { emoji: '💀', title: "La Fin de l'Empire", text: "Après la mort d'Atahualpa, l'empire s'est effondré. Les maladies européennes (variole) ont tué des millions d'Incas en quelques années.", fact: "On estime que 90% des Incas sont morts en 100 ans, principalement à cause des maladies." },
        ],
        quiz: [
          { q: "Combien d'hommes avait Pizarro ?", correct: "168", wrong1: "10 000", wrong2: "1 million", emoji: '⚔️' },
          { q: "Qui était Atahualpa ?", correct: "Le dernier empereur Inca", wrong1: "Un Espagnol", wrong2: "Un explorateur", emoji: '👑' },
          { q: "Qu'a fait Pizarro de la rançon ?", correct: "Il l'a fait fondre en lingots", wrong1: "Il l'a rendue", wrong2: "Il l'a perdue", emoji: '🪙' },
        ]
      },
      {
        id: 'pe_independance', era: '1821 — 1900', title: "L'Indépendance",
        subtitle: 'San Martin et Bolívar',
        emoji: '🇵🇪', color: '#1B5E20', light: '#E8F5E9',
        intro: "En 1821, San Martin (l'Argentin) déclare l'indépendance du Pérou. En 1824, Simón Bolívar (le Vénézuélien) bat définitivement les Espagnols à Ayacucho. Le Pérou devient libre après 300 ans de colonisation.",
        figure: { name: "Simón Bolívar", emoji: '🎖️', desc: "Le 'Libérateur' de l'Amérique du Sud (1783-1830), il a libéré 6 pays : Venezuela, Colombie, Équateur, Pérou, Bolivie et Panama." },
        cards: [
          { emoji: '🎖️', title: "San Martin Libère Lima", text: "Le 28 juillet 1821, San Martin entre dans Lima et proclame l'indépendance du Pérou.", fact: "Le 28 juillet est la fête nationale du Pérou !" },
          { emoji: '⚔️', title: "La Bataille d'Ayacucho 1824", text: "Bolívar et son lieutenant Sucre battent les derniers Espagnols à Ayacucho. C'est la fin de l'empire espagnol en Amérique du Sud.", fact: "Le Pérou est l'avant-dernier pays sud-américain à obtenir son indépendance." },
          { emoji: '🥈', title: "L'Argent de Potosí", text: "Pendant la colonisation, les Espagnols extrayaient des tonnes d'argent des mines de Potosí (en Bolivie actuelle, partie du Pérou colonial).", fact: "Si on avait empilé tout l'argent extrait, cela aurait fait un pont jusqu'en Espagne !" },
        ],
        quiz: [
          { q: "Qui a libéré Lima en 1821 ?", correct: "San Martin", wrong1: "Pizarro", wrong2: "Atahualpa", emoji: '🎖️' },
          { q: "Combien de pays Bolívar a libéré ?", correct: "6 pays", wrong1: "1 pays", wrong2: "100 pays", emoji: '🌎' },
          { q: "Quel jour est la fête nationale ?", correct: "Le 28 juillet", wrong1: "Le 14 juillet", wrong2: "Le 1er janvier", emoji: '🇵🇪' },
        ]
      },
      {
        id: 'pe_today', era: "Aujourd'hui", title: "Le Pérou Moderne",
        subtitle: 'Cuisine, montagnes et culture',
        emoji: '🌟', color: '#D91023', light: '#FFEBEE',
        intro: "Le Pérou compte 33 millions d'habitants. C'est l'un des pays les plus diversifiés au monde : Andes enneigées, Amazonie, désert, océan Pacifique. Sa cuisine est considérée comme l'une des meilleures du monde.",
        figure: { name: "Le peuple péruvien", emoji: '👥', desc: "Très divers, il mélange des origines indigènes, espagnoles, africaines et asiatiques." },
        cards: [
          { emoji: '🍽️', title: "La Cuisine Péruvienne", text: "Le ceviche (poisson cru marine) est le plat national. La cuisine péruvienne est élue plusieurs fois 'meilleure du monde'.", fact: "Lima a 4 restaurants dans le top 50 mondial — c'est la capitale gastronomique d'Amérique latine !" },
          { emoji: '🦙', title: "Les Lamas et Alpagas", text: "Le Pérou est le pays des lamas et alpagas. Leur laine est très douce et utilisée pour les vêtements traditionnels.", fact: "Un alpaga peut produire 5 kg de laine par an !" },
          { emoji: '🏔️', title: "Le Machu Picchu Aujourd'hui", text: "Le Machu Picchu est l'une des 7 nouvelles merveilles du monde. Plus d'un million de touristes le visitent chaque année.", fact: "On peut faire le 'Chemin de l'Inca' à pied pendant 4 jours pour atteindre le Machu Picchu !" },
        ],
        quiz: [
          { q: "Quel est le plat national ?", correct: "Le ceviche", wrong1: "La pizza", wrong2: "Le couscous", emoji: '🍽️' },
          { q: "Quel animal est emblématique du Pérou ?", correct: "Le lama", wrong1: "L'éléphant", wrong2: "Le tigre", emoji: '🦙' },
          { q: "Le Machu Picchu est l'une des combien de nouvelles merveilles ?", correct: "7", wrong1: "1", wrong2: "100", emoji: '🏔️' },
        ]
      },
    ]
  },

  CA: {
    name: 'Canada', flag: '🇨🇦', region: 'americas',
    color: '#FF0000', dark: '#7A0000', bg: '#FFEBEE',
    hero: { emoji: '👦🏻', name: 'Lucas', age: 8 },
    tagline: "Du Grand Nord aux deux langues",
    chapters: [
      {
        id: 'ca_natives', era: 'Avant 1500', title: "Les Premières Nations",
        subtitle: 'Les peuples autochtones',
        emoji: '🪶', color: '#5D4037', light: '#EFEBE9',
        intro: "Avant l'arrivée des Européens, le Canada était habité depuis 15 000 ans par des centaines de peuples : Inuits dans l'Arctique, Iroquois et Algonquins dans l'est, Cris dans les plaines, Haïdas sur la côte pacifique.",
        figure: { name: "Les Inuits", emoji: '🥶', desc: "Peuple de l'Arctique qui a su survivre dans les conditions les plus extrêmes du monde, en chassant le phoque et le caribou." },
        cards: [
          { emoji: '🪶', title: "Les Premières Nations", text: "Plus de 600 nations indigènes vivaient au Canada avant les Européens. Chacune avait sa langue, ses traditions et son territoire.", fact: "Aujourd'hui, on recense plus de 70 langues autochtones encore parlées au Canada !" },
          { emoji: '🛖', title: "Les Iroquois", text: "Les Iroquois vivaient dans des 'grandes maisons' (longhouses) pouvant abriter 50 personnes. Ils étaient organisés en confédération — un modèle politique avance.", fact: "La constitution iroquoise a inspiré celle des États-Unis !" },
          { emoji: '🥶', title: "Les Inuits et l'Igloo", text: "Les Inuits vivent dans l'Arctique depuis 5000 ans. Ils ont inventé l'igloo, le kayak et les harpons pour chasser le phoque.", fact: "L'igloo se réchauffe avec la chaleur du corps : à l'intérieur il fait 5 à 15 °C, même par -40 °C dehors !" },
        ],
        quiz: [
          { q: "Combien de nations indigènes au Canada ?", correct: "Plus de 600", wrong1: "1", wrong2: "10", emoji: '🪶' },
          { q: "Quel peuple a inventé l'igloo ?", correct: "Les Inuits", wrong1: "Les Vikings", wrong2: "Les Romains", emoji: '🥶' },
          { q: "Qu'est-ce qu'une 'longhouse' ?", correct: "Une grande maison iroquoise", wrong1: "Un bateau", wrong2: "Un temple", emoji: '🛖' },
        ]
      },
      {
        id: 'ca_french', era: '1534 — 1763', title: "La Nouvelle-France",
        subtitle: 'Cartier et Champlain',
        emoji: '⚜️', color: '#1565C0', light: '#E3F2FD',
        intro: "En 1534, le Français Jacques Cartier explore le Saint-Laurent. En 1608, Samuel de Champlain fonde Québec. La Nouvelle-France grandit pendant 150 ans, jusqu'à couvrir un territoire immense — du Québec à la Louisiane.",
        figure: { name: "Samuel de Champlain", emoji: '⛵', desc: "Explorateur et navigateur français (1574-1635), il a fondé la ville de Québec en 1608. On l'appelle 'le Père de la Nouvelle-France'." },
        cards: [
          { emoji: '⛵', title: "Jacques Cartier 1534", text: "Jacques Cartier remonte le fleuve Saint-Laurent en 1534-1535. Il prend possession du territoire au nom du roi de France.", fact: "Le mot 'Canada' vient d'un mot iroquois 'kanata' qui signifie 'village' — Cartier a cru que c'était le nom du pays !" },
          { emoji: '🏰', title: "La Fondation de Québec", text: "En 1608, Champlain fonde Québec, la 1re ville francophone d'Amérique. Elle est aujourd'hui la seule ville d'Amérique du Nord avec encore ses remparts.", fact: "Québec a fête ses 400 ans en 2008 !" },
          { emoji: '🦫', title: "Le Commerce des Fourrures", text: "La Nouvelle-France était riche en fourrures (castor surtout). Les coureurs des bois échangeaient avec les Indiens.", fact: "Le castor est devenu un symbole national du Canada !" },
        ],
        quiz: [
          { q: "Qui a fondé Québec ?", correct: "Samuel de Champlain", wrong1: "Jacques Cartier", wrong2: "Christophe Colomb", emoji: '🏰' },
          { q: "D'où vient le mot 'Canada' ?", correct: "Du mot iroquois 'kanata' (village)", wrong1: "D'un explorateur", wrong2: "D'un roi", emoji: '🪶' },
          { q: "Quel animal est le symbole du Canada ?", correct: "Le castor", wrong1: "Le tigre", wrong2: "L'éléphant", emoji: '🦫' },
        ]
      },
      {
        id: 'ca_british', era: '1763 — 1867', title: "Le Canada Britannique",
        subtitle: 'La conquête et la confédération',
        emoji: '🇬🇧', color: '#7B1FA2', light: '#F3E5F5',
        intro: "En 1763, après une guerre, la France perd le Canada qui devient britannique. Mais les Français y restent : c'est pourquoi le Québec parle encore français aujourd'hui ! En 1867, le Canada devient un pays unifié.",
        figure: { name: "John À. Macdonald", emoji: '🎩', desc: "1er Premier ministre du Canada (1867-1873 et 1878-1891), il a fondé la Confédération et lancé la construction du chemin de fer transcontinental." },
        cards: [
          { emoji: '⚔️', title: "La Bataille des Plaines d'Abraham", text: "En 1759, les Britanniques battent les Français à Québec. La France perd le Canada en 1763 par le Traité de Paris.", fact: "La bataille a duré seulement 15 minutes mais a changé l'histoire de l'Amérique du Nord !" },
          { emoji: '🇫🇷', title: "Le Québec Français", text: "Les Britanniques ont laissé les Français garder leur langue, leur religion et leurs lois. C'est pourquoi le Québec est encore francophone aujourd'hui.", fact: "Le Canada est officiellement bilingue : français et anglais sont les 2 langues officielles." },
          { emoji: '🇨🇦', title: "La Confédération 1867", text: "Le 1er juillet 1867, plusieurs colonies britanniques s'unissent pour former le Canada. C'est l'acte de naissance du pays.", fact: "Le 1er juillet est la fête nationale du Canada !" },
          { emoji: '🚂', title: "Le Chemin de Fer Transcontinental", text: "Le chemin de fer reliant l'est et l'ouest du Canada est achevé en 1885. C'est ce qui a uni le pays.", fact: "Plus de 15 000 ouvriers chinois ont participé à sa construction !" },
        ],
        quiz: [
          { q: "Quand le Canada devient un pays ?", correct: "En 1867", wrong1: "En 1500", wrong2: "En 2000", emoji: '🇨🇦' },
          { q: "Pourquoi le Québec parle français ?", correct: "Les Britanniques ont laissé la langue", wrong1: "Le Québec a conquis la France", wrong2: "C'est un mystère", emoji: '🇫🇷' },
          { q: "Quel jour est la fête nationale ?", correct: "Le 1er juillet", wrong1: "Le 4 juillet", wrong2: "Le 14 juillet", emoji: '🎉' },
        ]
      },
      {
        id: 'ca_20th', era: '1900 — 2000', title: "Le 20e Siècle",
        subtitle: "Guerres et indépendance",
        emoji: '🍁', color: '#FF0000', light: '#FFEBEE',
        intro: "Le Canada participe aux 2 Guerres mondiales aux côtes de la Grande-Bretagne. En 1982, il devient totalement indépendant. La feuille d'érable rouge devient son symbole en 1965.",
        figure: { name: "Pierre Elliott Trudeau", emoji: '🎓', desc: "Premier ministre charismatique (1968-1979 et 1980-1984), il a fait du Canada un pays officiellement bilingue et indépendant." },
        cards: [
          { emoji: '🎖️', title: "Vimy Ridge 1917", text: "Pendant la 1re Guerre mondiale, les soldats canadiens prennent la crête de Vimy en France. C'est considéré comme la naissance de la nation canadienne.", fact: "10 000 soldats canadiens sont morts ou blessés ce jour-là !" },
          { emoji: '🍁', title: "Le Drapeau à la Feuille d'Érable", text: "En 1965, le Canada adopte un nouveau drapeau avec une feuille d'érable rouge. Avant, il avait le drapeau britannique.", fact: "L'érable est un arbre très présent au Canada — son sirop est une fierté nationale !" },
          { emoji: '📜', title: "L'Indépendance 1982", text: "En 1982, le Canada obtient sa propre constitution. Avant cela, il dépendait encore en partie du Parlement britannique.", fact: "La reine Elizabeth II est restée chef d'État du Canada jusqu'en 2022 !" },
        ],
        quiz: [
          { q: "Qu'a gagné le Canada en 1917 ?", correct: "La crête de Vimy", wrong1: "L'Angleterre", wrong2: "La France", emoji: '🎖️' },
          { q: "Quand le drapeau actuel ?", correct: "En 1965", wrong1: "En 1500", wrong2: "En 2020", emoji: '🍁' },
          { q: "Combien de langues officielles ?", correct: "2 (anglais et français)", wrong1: "1", wrong2: "10", emoji: '🗣️' },
        ]
      },
      {
        id: 'ca_today', era: "Aujourd'hui", title: "Le Canada Moderne",
        subtitle: 'Diversité, nature et hockey',
        emoji: '🌟', color: '#FF0000', light: '#FFEBEE',
        intro: "Le Canada est le 2e plus grand pays du monde par superficie. Il a 40 millions d'habitants, principalement dans le sud (près des États-Unis). C'est un pays accueillant, multiculturel, connu pour ses paysages magnifiques.",
        figure: { name: "Le peuple canadien", emoji: '👥', desc: "Très divers (origine européenne, asiatique, africaine, indigène), reconnu pour sa politesse et son accueil aux immigrants." },
        cards: [
          { emoji: '🏒', title: "Le Hockey sur Glace", text: "Le hockey est le sport national du Canada. Les meilleurs joueurs du monde sont canadiens : Wayne Gretzky, Sidney Crosby...", fact: "Le hockey a été inventé au Canada vers 1875 !" },
          { emoji: '🐻', title: "La Nature Sauvage", text: "Le Canada a des forêts immenses, des montagnes Rocheuses, des lacs (3 millions !), des ours, des élans, des baleines...", fact: "Le Canada a plus de lacs que tous les autres pays du monde réunis !" },
          { emoji: '🍁', title: "Le Sirop d'Érable", text: "Le Canada produit 75% du sirop d'érable mondial. On l'extrait des érables au printemps puis on le fait bouillir.", fact: "Il faut 40 litres de sève d'érable pour faire 1 litre de sirop !" },
          { emoji: '🌎', title: "Un Pays Multiculturel", text: "Plus de 20% des Canadiens sont nés à l'étranger. Toronto est l'une des villes les plus multiculturelles au monde.", fact: "À Toronto, on entend plus de 140 langues différentes !" },
        ],
        quiz: [
          { q: "Quel est le sport national ?", correct: "Le hockey sur glace", wrong1: "Le foot", wrong2: "Le golf", emoji: '🏒' },
          { q: "Combien de litres de sève pour 1L de sirop ?", correct: "40 litres", wrong1: "2 litres", wrong2: "1000 litres", emoji: '🍁' },
          { q: "Le Canada est le combientième plus grand pays ?", correct: "Le 2e", wrong1: "Le 50e", wrong2: "Le 100e", emoji: '🌎' },
        ]
      },
    ]
  },

};

export const REGIONS = {
  africa: {
    mascot: "🦁", grad: ["#FFB300", "#FF6F00"],
    name: 'Afrique', emoji: '🌍',
    color: '#FF6F00', bg: '#FFF8E1',
    countries: ['ML', 'SN', 'MA', 'NG', 'EG', 'ET', 'ZA']
  },
  europe: {
    mascot: "🏰", grad: ["#42A5F5", "#3949AB"],
    name: 'Europe', emoji: '🌍',
    color: '#1565C0', bg: '#E3F2FD',
    countries: ['FR', 'DE', 'IT', 'GR']
  },
  asia: {
    mascot: "🐼", grad: ["#26C6DA", "#00897B"],
    name: 'Asie', emoji: '🌏',
    color: '#00695C', bg: '#E0F2F1',
    countries: ['JP', 'CN', 'IN', 'TR']
  },
  americas: {
    mascot: "🦜", grad: ["#EC407A", "#8E24AA"],
    name: 'Amériques', emoji: '🌎',
    color: '#6A1B9A', bg: '#F3E5F5',
    countries: ['BR', 'MX', 'AR', 'PE', 'CA']
  },
  oceania: {
    mascot: "🦘", grad: ["#FFA726", "#E53935"],
    name: 'Océanie', emoji: '🌏',
    color: '#C62828', bg: '#FFF3E0',
    countries: []
  },
};

// Pays « monde » : index leger (le contenu complet est charge a l'ouverture du pays).
// Les chapitres contiennent des emplacements vides pour que les compteurs fonctionnent.
export const RICH_CODES = Object.keys(COUNTRIES)
for (const [code, m] of Object.entries(WORLD_META)) {
  COUNTRIES[code] = {
    name: m.name, flag: m.flag, region: m.region, color: m.color, dark: m.color, bg: m.bg,
    tagline: m.tagline, teaser: m.teaser, hero: m.hero, lazy: true,
    chapters: m.ch.map(([id, era, title, subtitle, emoji, color, light, nCards, nQuiz]) => ({
      id, era, title, subtitle, emoji, color, light,
      cards: Array(nCards).fill(null), quiz: Array(nQuiz).fill(null),
    })),
  }
  REGIONS[m.region]?.countries.push(code)
}
