# Genere les pages legales statiques de Mokalibo (public/impressum.html, datenschutz.html, agb.html).
# Modifier UNIQUEMENT le bloc COMPANY ci-dessous, puis lancer : python3 scripts/legal/build.py
# Ces textes sont des modeles serieux mais ne remplacent pas un avocat (verification conseillee).

import html, os

COMPANY = {
    'owner': 'Walid Azar',
    'business': 'Azar Consulting (Einzelunternehmen)',
    'street': '[Straße und Hausnummer]',
    'city': '[PLZ] Wittlich',
    'country': 'Deutschland',
    'email': '[E-Mail-Adresse]',
    'phone': '[Telefonnummer]',
    'app': 'Mokalibo',
    'site': 'https://mokalibo.com',
    'updated': '08.10.2026',
    'authority': 'Der Landesbeauftragte für den Datenschutz und die Informationsfreiheit Rheinland-Pfalz, Hintere Bleiche 34, 55116 Mainz',
}

C = {k: html.escape(v) for k, v in COMPANY.items()}
OUT = os.path.join(os.path.dirname(__file__), '..', '..', 'public')

ADDRESS = f"{C['owner']}<br>{C['business']}<br>{C['street']}<br>{C['city']}<br>{C['country']}"
CONTACT = f"E-Mail : <a href=\"mailto:{C['email']}\">{C['email']}</a><br>Tel. : {C['phone']}"

PAGE = """<!doctype html>
<html lang="de">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>{title} — Mokalibo</title>
<meta name="robots" content="index,follow">
<link rel="icon" type="image/svg+xml" href="/favicon.svg">
<style>
  :root {{ --ink:#1A2A4F; --green:#2E9E5B; --muted:#5B6B7A; --bg:#F7FDF6; }}
  * {{ box-sizing: border-box; }}
  body {{ margin:0; font-family: Nunito, -apple-system, Segoe UI, Roboto, Arial, sans-serif; color:var(--ink); background:var(--bg); line-height:1.65; }}
  header {{ background: linear-gradient(180deg,#CDEFD6,#E8F8EA); padding: 22px 16px; }}
  .wrap {{ max-width: 820px; margin: 0 auto; padding: 0 16px; }}
  .logo {{ font-weight: 900; font-size: 26px; text-decoration:none; }}
  .logo .a {{ color:#FF6F00; }} .logo .b {{ color:#1E88E5; }}
  nav {{ margin-top: 8px; font-size: 14px; font-weight: 800; }}
  nav a {{ color: var(--green); margin-right: 14px; }}
  h1 {{ font-size: 30px; margin: 28px 0 4px; }}
  h2 {{ font-size: 21px; margin: 30px 0 6px; padding-top: 6px; border-top: 2px solid #DDEFE1; }}
  h3 {{ font-size: 17px; margin: 20px 0 4px; }}
  p, li {{ font-size: 15.5px; }}
  .lang {{ display:inline-block; background:white; border-radius:999px; padding:6px 14px; margin: 10px 8px 0 0; font-weight:800; font-size:14px; color:var(--green); text-decoration:none; box-shadow:0 3px 10px rgba(46,158,91,.15); }}
  .card {{ background:white; border-radius:18px; padding:16px 18px; margin: 14px 0; box-shadow:0 6px 18px rgba(46,158,91,.10); }}
  .muted {{ color: var(--muted); font-size: 14px; }}
  footer {{ margin: 40px 0 30px; font-size: 13px; color: var(--muted); }}
  a {{ color: var(--green); }}
  .todo {{ background:#FFF3CD; }}
</style>
</head>
<body>
<header><div class="wrap">
  <a class="logo" href="/"><span class="a">Moka</span><span class="b">libo</span></a>
  <nav><a href="/impressum">Impressum</a><a href="/datenschutz">Datenschutz</a><a href="/agb">AGB</a><a href="/">← App</a></nav>
</div></header>
<main class="wrap">
<h1>{title}</h1>
<p class="muted">Stand / Version : {updated}</p>
<a class="lang" href="#de">🇩🇪 Deutsch</a><a class="lang" href="#fr">🇫🇷 Français</a>
<section id="de" lang="de">{de}</section>
<section id="fr" lang="fr"><h2 style="border:none">🇫🇷 Version française</h2><p class="muted">Traduction pour information. En cas de divergence, la version allemande fait foi.</p>{fr}</section>
<footer>© Mokalibo · {business}</footer>
</main>
</body>
</html>
"""

def page(name, title, de, fr):
    out = PAGE.format(title=title, de=de, fr=fr, updated=C['updated'], business=C['business'])
    out = out.replace('[', '<span class="todo">[').replace(']', ']</span>')
    with open(os.path.join(OUT, name), 'w', encoding='utf-8') as f:
        f.write(out)
    print('ecrit', name)

# ───────────────────────── IMPRESSUM ─────────────────────────
page('impressum.html', 'Impressum / Mentions légales', f"""
<h2>Angaben gemäß § 5 DDG</h2>
<div class="card"><p>{ADDRESS}</p></div>
<h2>Kontakt</h2>
<p>{CONTACT}</p>
<h2>Umsatzsteuer</h2>
<p>Kleinunternehmer gemäß § 19 UStG. Es wird keine Umsatzsteuer berechnet und ausgewiesen.</p>
<h2>Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV</h2>
<p>{C['owner']}, Anschrift wie oben.</p>
<h2>Verbraucherstreitbeilegung</h2>
<p>Wir sind nicht bereit und nicht verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.</p>
<h2>Haftung für Inhalte und Links</h2>
<p>Die Inhalte von {C['app']} wurden mit großer Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen. Für Inhalte externer Links sind ausschließlich deren Betreiber verantwortlich.</p>
""", f"""
<h2>Éditeur (§ 5 DDG)</h2>
<div class="card"><p>{ADDRESS}</p></div>
<h2>Contact</h2>
<p>{CONTACT}</p>
<h2>TVA</h2>
<p>Petite entreprise au sens du § 19 UStG (Kleinunternehmer) : aucune TVA n'est facturée.</p>
<h2>Responsable du contenu (§ 18 al. 2 MStV)</h2>
<p>{C['owner']}, adresse ci-dessus.</p>
<h2>Règlement des litiges de consommation</h2>
<p>Nous ne sommes ni disposés ni tenus de participer à une procédure de règlement des litiges devant un organisme de médiation de la consommation.</p>
<h2>Responsabilité</h2>
<p>Les contenus de {C['app']} ont été rédigés avec le plus grand soin, sans garantie d'exactitude, d'exhaustivité ou d'actualité. Les sites externes liés relèvent de la seule responsabilité de leurs exploitants.</p>
""")

# ───────────────────────── DATENSCHUTZ ─────────────────────────
DS_DE = f"""
<h2>1. Verantwortlicher</h2>
<div class="card"><p>{ADDRESS}<br>{CONTACT}</p></div>
<p>Ein Datenschutzbeauftragter ist nicht bestellt, da keine gesetzliche Pflicht besteht.</p>

<h2>2. Grundsätze</h2>
<p>{C['app']} ist eine Lern-App für Kinder. Wir erheben so wenige Daten wie möglich, zeigen <strong>keine Werbung</strong>, setzen <strong>keine Tracking- oder Analyse-Tools</strong> ein und verkaufen keine Daten. Das Elternkonto wird von einem Erwachsenen angelegt; Kinderprofile werden ausschließlich vom Elternteil angelegt und verwaltet.</p>

<h2>3. Welche Daten wir verarbeiten</h2>
<h3>a) Elternkonto</h3>
<p>E-Mail-Adresse und Passwort (verschlüsselt gespeichert) oder – bei Anmeldung mit Google – Name, E-Mail-Adresse und Google-Kennung. Zweck: Bereitstellung des Kontos. Rechtsgrundlage: Art. 6 Abs. 1 lit. b DSGVO (Vertrag).</p>
<h3>b) Kinderprofile</h3>
<p>Vorname oder Spitzname, Alter, Avatar, Sprache, Leseniveau, Lernfortschritt (abgeschlossene Kapitel, Punkte) sowie Nutzungsstatistiken (Nutzungsdauer pro Tag und Land, zuletzt aktiv), die nur den Eltern im Elternbereich angezeigt werden. Wir empfehlen, nur einen Vornamen oder Spitznamen zu verwenden. Rechtsgrundlage: Art. 6 Abs. 1 lit. b DSGVO; die Angaben werden vom Elternteil im Rahmen der elterlichen Verantwortung gemacht.</p>
<h3>c) Geräte</h3>
<p>Pro Konto sind höchstens 5 Geräte erlaubt. Dafür speichern wir eine zufällige Geräte-ID, die Gerätebezeichnung (z. B. „iPhone · Safari“) und den Zeitpunkt der letzten Nutzung. Zweck: Schutz vor missbräuchlicher Weitergabe des Kontos. Rechtsgrundlage: Art. 6 Abs. 1 lit. b und f DSGVO.</p>
<h3>d) Zahlung</h3>
<p>Die Zahlung erfolgt über Stripe (Stripe Payments Europe, Ltd., 1 Grand Canal Street Lower, Dublin 2, Irland). Zahlungsdaten (z. B. Kartendaten) werden ausschließlich von Stripe verarbeitet; wir erhalten nur den Zahlungsstatus, die E-Mail-Adresse, Betrag und eine Transaktionskennung. Rechtsgrundlage: Art. 6 Abs. 1 lit. b und c DSGVO (Vertrag, steuerrechtliche Aufbewahrungspflichten). Datenschutzerklärung von Stripe: <a href="https://stripe.com/de/privacy">stripe.com/de/privacy</a>.</p>
<h3>e) Hosting und Server-Logs</h3>
<p>Die Website wird bei Netlify, Inc. (USA) gehostet. Beim Aufruf werden technisch notwendige Daten (IP-Adresse, Datum, Uhrzeit, aufgerufene Seite, Browser) verarbeitet. Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO (sicherer Betrieb).</p>
<h3>f) Datenbank und Anmeldung</h3>
<p>Konto- und Fortschrittsdaten werden mit Google Firebase (Google Ireland Ltd. / Google LLC) gespeichert. Rechtsgrundlage: Art. 6 Abs. 1 lit. b DSGVO.</p>
<h3>g) Übersetzung</h3>
<p>Wählt ein Nutzer eine andere Sprache als Französisch, werden die Lerntexte der App über einen Übersetzungsdienst von Google (translate.googleapis.com) übersetzt. Dabei werden nur die Lerntexte (keine personenbezogenen Inhalte) sowie technisch bedingt die IP-Adresse übermittelt. Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO.</p>
<h3>h) Vorlesefunktion</h3>
<p>Die Vorlesefunktion nutzt die Sprachausgabe des Browsers bzw. Betriebssystems. Je nach Gerät kann der Hersteller (z. B. Apple, Google, Microsoft) diese Funktion bereitstellen.</p>
<h3>i) Schriftarten</h3>
<p>Alle Schriftarten werden von unserem eigenen Server geladen; es findet keine Verbindung zu Google Fonts statt.</p>

<h2>4. Lokaler Speicher (keine Cookies zu Werbezwecken)</h2>
<p>Die App speichert im Browser (Local Storage, Service Worker) nur technisch notwendige Informationen: Anmeldestatus, Sprache, Vorlese-Einstellung, Geräte-ID, Offline-Inhalte und Übersetzungs-Cache. Dies ist nach § 25 Abs. 2 Nr. 2 TDDDG ohne Einwilligung zulässig. Es werden keine Tracking-Cookies verwendet.</p>

<h2>5. Übermittlung in Drittländer</h2>
<p>Netlify, Google und Stripe können Daten in den USA verarbeiten. Die Übermittlung erfolgt auf Grundlage des EU-US Data Privacy Framework und/oder von EU-Standardvertragsklauseln (Art. 45, 46 DSGVO).</p>

<h2>6. Speicherdauer</h2>
<p>Konto-, Kinder- und Gerätedaten speichern wir, bis das Elternkonto gelöscht wird. Zahlungs- und Rechnungsdaten bewahren wir aufgrund gesetzlicher Pflichten bis zu 10 Jahre auf (§ 147 AO, § 257 HGB).</p>

<h2>7. Ihre Rechte</h2>
<p>Sie haben das Recht auf Auskunft (Art. 15), Berichtigung (Art. 16), Löschung (Art. 17), Einschränkung (Art. 18), Datenübertragbarkeit (Art. 20) und Widerspruch (Art. 21 DSGVO). Zur Löschung Ihres Kontos und aller Kinderprofile genügt eine E-Mail an <a href="mailto:{C['email']}">{C['email']}</a>. Sie können sich außerdem bei einer Aufsichtsbehörde beschweren, zum Beispiel bei: {C['authority']}.</p>
"""

DS_FR = f"""
<h2>1. Responsable du traitement</h2>
<div class="card"><p>{ADDRESS}<br>{CONTACT}</p></div>
<p>Aucun délégué à la protection des données n'est désigné, faute d'obligation légale.</p>
<h2>2. Principes</h2>
<p>{C['app']} est une application éducative pour enfants. Nous collectons le moins de données possible, <strong>sans publicité</strong>, <strong>sans outil de suivi ni de statistiques d'audience</strong>, et ne vendons aucune donnée. Le compte est créé par un adulte ; les profils enfants sont créés et gérés uniquement par le parent.</p>
<h2>3. Données traitées</h2>
<h3>a) Compte parent</h3>
<p>Adresse e-mail et mot de passe (chiffré), ou, en cas de connexion avec Google, nom, e-mail et identifiant Google. Base légale : art. 6 §1 b) RGPD (contrat).</p>
<h3>b) Profils enfants</h3>
<p>Prénom ou surnom, âge, avatar, langue, niveau de lecture, progression (chapitres terminés, points) et statistiques d'utilisation (temps passé par jour et par pays, dernière activité), visibles uniquement par les parents dans l'espace parent. Nous recommandons d'utiliser seulement un prénom ou un surnom. Base légale : art. 6 §1 b) RGPD, informations fournies par le parent dans le cadre de l'autorité parentale.</p>
<h3>c) Appareils</h3>
<p>5 appareils maximum par compte : nous enregistrons un identifiant aléatoire, le type d'appareil (ex. « iPhone · Safari ») et la date de dernière utilisation, afin d'éviter le partage abusif du compte. Base légale : art. 6 §1 b) et f) RGPD.</p>
<h3>d) Paiement</h3>
<p>Le paiement est traité par Stripe (Stripe Payments Europe, Ltd., Dublin, Irlande). Nous ne recevons jamais vos données de carte, seulement le statut du paiement, l'e-mail, le montant et un identifiant de transaction. Base légale : art. 6 §1 b) et c) RGPD (contrat, obligations comptables et fiscales).</p>
<h3>e) Hébergement</h3>
<p>Le site est hébergé par Netlify, Inc. (États-Unis). Les données techniques nécessaires (adresse IP, date, page, navigateur) sont traitées pour le bon fonctionnement et la sécurité (art. 6 §1 f) RGPD).</p>
<h3>f) Base de données et connexion</h3>
<p>Les comptes et la progression sont stockés avec Google Firebase (Google Ireland Ltd. / Google LLC). Base légale : art. 6 §1 b) RGPD.</p>
<h3>g) Traduction</h3>
<p>Si une autre langue que le français est choisie, les textes pédagogiques sont traduits via un service de Google (translate.googleapis.com) : seuls les textes de l'app (aucune donnée personnelle) et, techniquement, l'adresse IP sont transmis (art. 6 §1 f) RGPD).</p>
<h3>h) Lecture à voix haute</h3>
<p>La voix off utilise la synthèse vocale du navigateur ou du système, fournie selon l'appareil par son fabricant (Apple, Google, Microsoft…).</p>
<h3>i) Polices</h3>
<p>Toutes les polices sont chargées depuis notre propre serveur, sans connexion à Google Fonts.</p>
<h2>4. Stockage local (aucun cookie publicitaire)</h2>
<p>L'app ne conserve dans le navigateur que les informations strictement nécessaires (connexion, langue, voix off, identifiant d'appareil, contenus hors-ligne, cache de traduction), ce qui ne nécessite pas de consentement (§ 25 al. 2 n° 2 TDDDG). Aucun cookie de suivi.</p>
<h2>5. Transferts hors UE</h2>
<p>Netlify, Google et Stripe peuvent traiter des données aux États-Unis, sur la base du EU-US Data Privacy Framework et/ou des clauses contractuelles types de l'UE.</p>
<h2>6. Durée de conservation</h2>
<p>Jusqu'à la suppression du compte parent. Les données de paiement et de facturation sont conservées jusqu'à 10 ans (obligations légales allemandes).</p>
<h2>7. Vos droits</h2>
<p>Accès, rectification, effacement, limitation, portabilité et opposition (art. 15 à 21 RGPD). Pour supprimer votre compte et tous les profils enfants, il suffit d'écrire à <a href="mailto:{C['email']}">{C['email']}</a>. Vous pouvez aussi saisir une autorité de contrôle, par exemple : {C['authority']}.</p>
"""
page('datenschutz.html', 'Datenschutzerklärung / Confidentialité', DS_DE, DS_FR)

# ───────────────────────── AGB + WIDERRUF ─────────────────────────
AGB_DE = f"""
<h2>§ 1 Geltungsbereich und Anbieter</h2>
<p>Diese Allgemeinen Geschäftsbedingungen gelten für die Nutzung der Lern-App {C['app']} ({C['site']}) und den Kauf des Vollzugangs. Anbieter ist {C['owner']}, {C['business']}, {C['street']}, {C['city']}, {C['country']}.</p>
<h2>§ 2 Leistungen</h2>
<p>Ein Land (Mali) kann kostenlos genutzt werden. Der kostenpflichtige Vollzugang schaltet alle Länder, Lesestufen und Quizze für alle Kinderprofile des Elternkontos frei. „Zugang auf Lebenszeit“ bedeutet: zeitlich unbegrenzt, solange {C['app']} betrieben wird; es handelt sich um eine Einmalzahlung ohne Abonnement.</p>
<h2>§ 3 Konto und Nutzungsgrenzen</h2>
<p>Das Elternkonto darf nur von volljährigen Personen angelegt werden. Pro Konto sind höchstens 5 Kinderprofile und 5 Geräte zulässig. Der Zugang ist für die private Nutzung innerhalb der Familie bestimmt; eine Weitergabe der Zugangsdaten an Dritte ist nicht gestattet.</p>
<h2>§ 4 Vertragsschluss</h2>
<p>Mit Klick auf die Schaltfläche zur Zahlung und Abschluss des Bezahlvorgangs bei Stripe gibt der Kunde ein verbindliches Angebot ab. Der Vertrag kommt mit der Freischaltung des Zugangs zustande. Die Vertragssprache ist Deutsch; eine französische Übersetzung wird zur Information bereitgestellt.</p>
<h2>§ 5 Preis und Zahlung</h2>
<p>Der Preis beträgt einmalig 2,00 €. Gemäß § 19 UStG wird keine Umsatzsteuer berechnet. Die Zahlung erfolgt über Stripe mit den dort angebotenen Zahlungsmitteln. Eine Rechnung wird per E-Mail zugesandt.</p>
<h2>§ 6 Widerrufsrecht</h2>
<div class="card">
<h3>Widerrufsbelehrung</h3>
<p>Verbraucher haben das Recht, binnen vierzehn Tagen ohne Angabe von Gründen diesen Vertrag zu widerrufen. Die Widerrufsfrist beträgt vierzehn Tage ab dem Tag des Vertragsschlusses. Um Ihr Widerrufsrecht auszuüben, müssen Sie uns ({C['owner']}, {C['business']}, {C['street']}, {C['city']}, E-Mail: {C['email']}) mittels einer eindeutigen Erklärung (z. B. per E-Mail) über Ihren Entschluss, diesen Vertrag zu widerrufen, informieren. Sie können dafür das unten stehende Muster-Widerrufsformular verwenden, das jedoch nicht vorgeschrieben ist. Zur Wahrung der Widerrufsfrist reicht es aus, dass Sie die Mitteilung vor Ablauf der Widerrufsfrist absenden.</p>
<h3>Folgen des Widerrufs</h3>
<p>Wenn Sie diesen Vertrag widerrufen, haben wir Ihnen alle Zahlungen, die wir von Ihnen erhalten haben, unverzüglich und spätestens binnen vierzehn Tagen ab dem Tag zurückzuzahlen, an dem die Mitteilung über Ihren Widerruf bei uns eingegangen ist. Für diese Rückzahlung verwenden wir dasselbe Zahlungsmittel, das Sie bei der ursprünglichen Transaktion eingesetzt haben, es sei denn, mit Ihnen wurde ausdrücklich etwas anderes vereinbart; in keinem Fall werden Ihnen wegen dieser Rückzahlung Entgelte berechnet.</p>
<h3>Erlöschen des Widerrufsrechts</h3>
<p>Das Widerrufsrecht erlischt bei einem Vertrag über die Bereitstellung von nicht auf einem körperlichen Datenträger befindlichen digitalen Inhalten, wenn wir mit der Ausführung des Vertrags begonnen haben, nachdem Sie ausdrücklich zugestimmt haben, dass wir vor Ablauf der Widerrufsfrist mit der Ausführung beginnen, und Sie Ihre Kenntnis davon bestätigt haben, dass Sie durch Ihre Zustimmung mit Beginn der Ausführung Ihr Widerrufsrecht verlieren (§ 356 Abs. 5 BGB). Diese Zustimmung und Bestätigung erfolgen vor der Zahlung durch Ankreuzen des entsprechenden Kästchens.</p>
<h3>Muster-Widerrufsformular</h3>
<p>(Wenn Sie den Vertrag widerrufen wollen, dann füllen Sie bitte dieses Formular aus und senden Sie es zurück.)<br>
– An {C['owner']}, {C['business']}, {C['street']}, {C['city']}, E-Mail: {C['email']}<br>
– Hiermit widerrufe(n) ich/wir (*) den von mir/uns (*) abgeschlossenen Vertrag über die Bereitstellung der folgenden digitalen Inhalte: {C['app']} Vollzugang<br>
– Bestellt am (*):<br>– Name des/der Verbraucher(s):<br>– Anschrift des/der Verbraucher(s):<br>– E-Mail-Adresse des Kontos:<br>
– Unterschrift des/der Verbraucher(s) (nur bei Mitteilung auf Papier)<br>– Datum<br>(*) Unzutreffendes streichen.</p>
</div>
<h2>§ 7 Verfügbarkeit und Inhalte</h2>
<p>Wir bemühen uns um eine möglichst unterbrechungsfreie Verfügbarkeit, können diese aber nicht garantieren (z. B. bei Wartung oder Störungen bei Dienstleistern). Die Lerninhalte werden sorgfältig erstellt und können weiterentwickelt werden; ein Anspruch auf bestimmte Inhalte besteht nicht, solange der Kern der Leistung erhalten bleibt.</p>
<h2>§ 8 Haftung</h2>
<p>Wir haften unbeschränkt bei Vorsatz und grober Fahrlässigkeit sowie bei Verletzung von Leben, Körper oder Gesundheit. Bei leichter Fahrlässigkeit haften wir nur bei Verletzung wesentlicher Vertragspflichten und begrenzt auf den vertragstypischen, vorhersehbaren Schaden. Die gesetzlichen Gewährleistungsrechte für digitale Produkte (§§ 327 ff. BGB) bleiben unberührt.</p>
<h2>§ 9 Schlussbestimmungen</h2>
<p>Es gilt das Recht der Bundesrepublik Deutschland. Gegenüber Verbrauchern gilt diese Rechtswahl nur, soweit nicht zwingende Verbraucherschutzvorschriften des Staates, in dem der Verbraucher seinen gewöhnlichen Aufenthalt hat, entgegenstehen. Sollten einzelne Bestimmungen unwirksam sein, bleibt die Wirksamkeit der übrigen unberührt.</p>
"""

AGB_FR = f"""
<h2>Art. 1 Champ d'application et vendeur</h2>
<p>Les présentes conditions générales de vente (CGV) s'appliquent à l'utilisation de l'application éducative {C['app']} ({C['site']}) et à l'achat de l'accès complet. Le vendeur est {C['owner']}, {C['business']}, {C['street']}, {C['city']}, {C['country']}.</p>
<h2>Art. 2 Services</h2>
<p>Un pays (le Mali) est utilisable gratuitement. L'accès complet payant débloque tous les pays, niveaux de lecture et quiz pour tous les profils enfants du compte parent. « Accès à vie » signifie : sans limite de durée, tant que {C['app']} est exploitée ; il s'agit d'un paiement unique, sans abonnement.</p>
<h2>Art. 3 Compte et limites d'utilisation</h2>
<p>Le compte parent est réservé aux personnes majeures. 5 profils enfants et 5 appareils maximum par compte. L'accès est destiné à un usage privé et familial ; le partage des identifiants avec des tiers est interdit.</p>
<h2>Art. 4 Conclusion du contrat</h2>
<p>En validant le paiement sur Stripe, le client fait une offre ferme ; le contrat est conclu au déblocage de l'accès. La langue du contrat est l'allemand ; cette traduction est fournie à titre informatif.</p>
<h2>Art. 5 Prix et paiement</h2>
<p>Le prix est de 2,00 € en paiement unique. TVA non applicable (§ 19 UStG, régime des petites entreprises). Le paiement s'effectue via Stripe. Une facture est envoyée par e-mail.</p>
<h2>Art. 6 Droit de rétractation</h2>
<div class="card">
<p>Le consommateur dispose d'un délai de quatorze jours à compter de la conclusion du contrat pour se rétracter sans motif, en nous informant par une déclaration claire (par exemple par e-mail à {C['email']}). En cas de rétractation, nous remboursons tous les paiements reçus au plus tard dans les quatorze jours, par le même moyen de paiement, sans frais.</p>
<p><strong>Perte du droit de rétractation :</strong> pour un contenu numérique fourni sans support matériel, le droit de rétractation s'éteint dès que l'exécution a commencé, lorsque le consommateur a expressément demandé l'exécution avant la fin du délai et reconnu perdre ainsi son droit de rétractation (§ 356 al. 5 BGB). Cet accord est donné avant le paiement en cochant la case prévue.</p>
<p>Un modèle de formulaire de rétractation figure dans la version allemande ci-dessus.</p>
</div>
<h2>Art. 7 Disponibilité et contenus</h2>
<p>Nous faisons notre possible pour assurer une disponibilité continue, sans pouvoir la garantir (maintenance, incidents chez nos prestataires). Les contenus pédagogiques sont rédigés avec soin et peuvent évoluer.</p>
<h2>Art. 8 Responsabilité</h2>
<p>Responsabilité illimitée en cas de faute intentionnelle ou lourde et d'atteinte à la vie, au corps ou à la santé ; en cas de faute légère, limitée aux obligations essentielles et au dommage prévisible. Les garanties légales applicables aux produits numériques (§§ 327 et suiv. BGB) restent inchangées.</p>
<h2>Art. 9 Dispositions finales</h2>
<p>Le droit allemand s'applique, sans priver le consommateur de la protection des dispositions impératives de son pays de résidence habituelle. La nullité d'une clause n'affecte pas les autres.</p>
"""
page('agb.html', 'AGB / Conditions générales de vente', AGB_DE, AGB_FR)
