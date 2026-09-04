## Novità: ricreati due strumenti — Fabbisogno idrico e Quanto pesa una porzione

Aggiunte due nuove pagine dentro `/strumenti`, coerenti con gli altri
calcolatori già presenti (Fabbisogno calorico, Proteine, BMI):

- **`/strumenti/fabbisogno-idrico`** — stima l'acqua giornaliera consigliata
  in base a peso, livello di attività e clima caldo/sudorazione. Formula in
  `calculators.js` (`calculateWaterNeeds`): 30-35 ml/kg di base + bonus per
  attività + bonus per clima caldo. Disclaimer sempre presente.
- **`/strumenti/porzioni`** — mostra il peso di riferimento di "una
  porzione" per la categoria dell'alimento selezionato (stile CREA/LARN,
  es. Frutta 150g, Carne 100g, Legumi cotti 150g...), con slider per
  regolare i grammi. I valori nutrizionali mostrati vengono SEMPRE calcolati
  dai dati reali dell'alimento in `foods.js` tramite la funzione `calc()`
  già usata in `FoodPage.jsx` — nessun valore scritto a mano.

Le porzioni di riferimento sono in `PORTION_REFERENCE` dentro
`calculators.js`: sono indicative, non regole fisse, e il testo lo dice
esplicitamente in pagina.

Nessuna nuova dipendenza. Build verificata (`npm install` + `npm run build`)
senza errori.

## Novità: pagina di login (passo 2 — solo interfaccia)

Aggiunta la pagina `/accedi` con form email + password, raggiungibile
anche da un link nella pagina `/corsi`. In questo passo il form NON è
ancora collegato a nessun servizio: cliccando "Accedi" appare solo un
messaggio "Accesso non ancora attivo". Nessuna nuova dipendenza esterna
aggiunta, zero rischio per il resto del sito.

Il collegamento vero (Supabase) arriva nel prossimo passo, solo dopo aver
confermato che questa pagina va online senza problemi.

Build verificata (`npm install` + `npm run build`) senza errori.

## Novità: pagina CORSI (passo 1 di più — solo la struttura base)

Nuova voce "CORSI" nel menu in alto, che porta a una pagina `/corsi`
statica e semplice — per ora dice solo "I primi corsi sono in
preparazione", nessun contenuto reale ancora.

Questo è VOLUTAMENTE il primo di più passi, per evitare il problema della
versione precedente (schermata bianca per colpa dell'integrazione
Supabase fatta tutta insieme). In questo passo:

- NESSUNA nuova dipendenza esterna (niente Supabase, niente pacchetti
  aggiunti a package.json).
- NESSUN login, NESSUN blocco di accesso: la pagina è visibile a tutti,
  esattamente come le altre pagine del sito.
- Zero rischio di rompere il resto del sito: nessun file esistente è
  stato toccato a parte l'aggiunta della voce "CORSI" in Nav.jsx e la
  nuova route in App.jsx.

Il blocco "solo clienti premium" (login + accesso riservato) arriverà in
un passo successivo, DOPO aver confermato che questa versione va online
senza problemi.

Build verificata (`npm install` + `npm run build`) senza errori.

## Correzione: sito tutto bianco se Supabase non è ancora configurato

Bug della versione precedente: se le variabili `VITE_SUPABASE_URL` /
`VITE_SUPABASE_ANON_KEY` non erano ancora impostate su Vercel, l'intero
sito andava in errore al caricamento (pagina bianca), non solo `/corsi`.
Corretto: ora se Supabase non è configurato, `supabase` resta `null` e il
resto del sito funziona normalmente. Solo chi prova ad accedere su
`/accedi` vede un messaggio chiaro ("Accesso non ancora disponibile: la
configurazione è in corso.") finché non aggiungi le variabili su Vercel.
Build verificata senza errori.

## Novità: area CORSI (riservata ai clienti premium)

- Nuova voce "CORSI" nel menu in alto, sempre visibile — non è una CTA
  commerciale, è una normale voce di navigazione come le altre.
- Cliccando su "CORSI" senza essere loggati o senza accesso premium, si
  vede un messaggio soft ("i corsi fanno parte dei Percorsi
  Personalizzati") con un link a `/percorsi-personalizzati` — nessun toni
  aggressivi, coerente col brief.
- **Serve un backend per gestire l'accesso**, quindi per la prima volta il
  progetto usa un servizio esterno: **Supabase** (autenticazione email +
  password, gratuito). Non serve un vero server: Supabase viene chiamato
  direttamente dal frontend con una chiave pubblica sicura da esporre.

### Cosa è stato aggiunto

- `src/supabaseClient.js` — inizializza la connessione a Supabase.
- `src/AuthContext.jsx` — gestisce sessione utente e stato "premium",
  accanto a `PlateContext.jsx`.
- `src/components/RequirePremium.jsx` — protegge la route `/corsi`:
  mostra login se non autenticato, messaggio soft se autenticato ma non
  premium, altrimenti il contenuto.
- `src/pages/Login.jsx` — pagina di accesso/registrazione (email + password).
- `src/pages/Corsi.jsx` + `src/corsi.js` — hub corsi, per ora vuoto
  (nessun corso reale è stato ancora scritto: come da regola per i dati,
  meglio vuoto che riempito con contenuti finti).
- `supabase-schema.sql` — da eseguire UNA volta nel pannello Supabase
  (SQL Editor) per creare la tabella dei profili utente.
- `.env.example` — mostra quali variabili servono (`VITE_SUPABASE_URL`,
  `VITE_SUPABASE_ANON_KEY`).

### Come attivare l'accesso premium (per ora manuale)

Non c'è ancora un pagamento automatico collegato. Il flusso è:
1. Il cliente acquista un Percorso Personalizzato (come già avviene oggi).
2. Il cliente si registra su `/accedi` con email e password.
3. Chi gestisce il sito va su Supabase → Table Editor → tabella
   `profiles` → imposta `is_premium = true` sulla riga di quell'utente.
4. Da quel momento quel cliente vede i corsi su `/corsi`.

### Cosa serve fare per andare online con questa funzione

1. Creare un progetto gratuito su supabase.com.
2. Eseguire il contenuto di `supabase-schema.sql` nell'SQL Editor di Supabase.
3. Copiare URL e chiave anon del progetto Supabase (Settings → API).
4. Su Vercel: Settings → Environment Variables → aggiungere
   `VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY` con quei valori.
5. Rifare il deploy (o aspettare il prossimo push).

Senza questi passaggi il sito compila ed è online normalmente, ma la
pagina `/corsi` non troverà una connessione valida a Supabase.

Build verificata (`npm install` + `npm run build`) senza errori.

## Correzione: rimosso il cognome "Palumbo" dalla sezione Lab

Il titolo "Palumbo Lab." compariva in tre punti (homepage, /lab,
/articoli), in contrasto con la regola del brief originale "nessun
riferimento a nomi personali nel brand, nei testi o nel codice" — probabile
refuso rimasto da una versione precedente. Sostituito con "Il Lab." in
tutti e tre i punti. Build verificata senza errori.



L'indirizzo email placeholder (`info@gustoscopio.it`) in
`src/components/PercorsiModal.jsx` è stato sostituito con l'indirizzo reale
`davidepalumbo.nutrizione@gmail.com`. Da ora le richieste di prenotazione
dal modale di "Percorsi Personalizzati" apriranno il client di posta
dell'utente con questo indirizzo già precompilato. Verificato che non ci
fossero altri riferimenti al vecchio indirizzo nel codice. Build verificata
senza errori.



Da 20 a 29 ricette. Aggiunte 9 ricette pensate per pranzo/cena, con
ingredienti già presenti nel database che finora erano poco usati (merluzzo,
gamberi, couscous, orzo, farro, edamame, sgombro, manzo, fagioli, finocchi,
arancia, melanzane):

- Merluzzo al forno con patate e finocchi
- Gamberi saltati con couscous e zucchine
- Farro con ceci e verdure miste
- Melanzane gratinate con pomodoro e mozzarella
- Insalata di orzo con verdure e mozzarella
- Manzo con patate e broccoli al forno
- Riso con edamame e verdure saltate
- Sgombro con insalata di finocchi e arancia
- Fagioli in umido con pane integrale

Valori nutrizionali calcolati automaticamente dagli ingredienti tramite
`calcRecipeTotals`, come sempre — nessun numero scritto a mano. Verificato
che tutti i foodId richiamati esistano nel database e che non ci siano ID
di ricette duplicati (29 ricette, tutte con ID univoco). Build verificata
senza errori.



Nella sezione "Il tuo piatto", il valore in grammi di ogni alimento non era
più solo un numero fisso regolabile a scatti di 10g: ora è un campo di
testo cliccabile, in cui si può scrivere direttamente il valore esatto
desiderato (es. 137 g). I pulsanti −/+ restano per gli spostamenti rapidi
di 10g; il campo serve per la precisione fine, incluso variare di 1g alla
volta. Build verificata senza errori.



La barra di ricerca in homepage prometteva ("Cerca un alimento, una ricetta
o un argomento...") ma cercava solo tra gli alimenti: RECIPES e ARTICLES
erano importati in Home.jsx ma mai usati nella ricerca. Corretto: ora la
ricerca unisce risultati da alimenti, ricette e articoli (max 8 risultati
totali) e il click porta alla pagina corretta a seconda del tipo
(/alimenti/:id, /ricette/:id, /articoli/:id).

Verificato: nessun ID duplicato tra i 99 alimenti, le 20 ricette e gli 8
articoli; nessun foodId richiamato da ricette o articoli che non esista in
foods.js. Build (`npm install` + `npm run build`) completata senza errori.

# Gustoscopio — come aggiornare il sito online

## Se il repository GitHub esiste già (caso piu probabile)

1. Vai sul tuo repository su GitHub.
2. Elimina tutto il contenuto attuale (o crea un nuovo repository pulito).
3. Clicca "Add file" -> "Upload files".
4. IMPORTANTE: apri questa cartella estratta e trascina dentro il CONTENUTO
   (index.html, package.json, vercel.json, src, ecc.) - NON trascinare la cartella
   "gustoscopio" stessa, altrimenti i file finiscono un livello troppo in profondita
   e Vercel non li trova (e' l'errore capitato la prima volta).
5. Clicca "Commit changes".
6. Vercel rifa' il deploy da solo in automatico entro un minuto. Se non parte
   da solo, vai su Vercel -> Deployments -> pulsante "Redeploy".

## Se stai partendo da zero

Segui la guida precedente (crea account GitHub, crea repository, carica il
CONTENUTO della cartella - non la cartella stessa -, crea account Vercel,
importa il progetto, Deploy).

Se il sito da' errore 404 dopo il deploy: su Vercel vai su
Settings -> Build and Deployment -> Root Directory, e verifica che sia vuoto
(cioe' che i file siano davvero alla radice del repository).

## Cosa c'e' di nuovo in questa versione

- Ogni alimento ha ora una pagina propria: /alimenti/banana, /alimenti/pasta, ecc.
  Ci si arriva cliccando "Vedi scheda completa" su una card o dai risultati di ricerca.
- Il piatto costruito (Plate Builder) e' condiviso tra homepage e pagine alimento.
- Il file vercel.json e' necessario per far funzionare questi indirizzi anche
  aprendo il link direttamente: non cancellarlo.

## Aggiornare il sito in futuro

1. Modifica i file dentro src/
2. Ripeti la procedura di upload sopra
3. Vercel pubblica la nuova versione in automatico

## Novità: Ricette

- Nuova pagina /ricette con filtri reali (kcal, tempo, categoria).
- Ogni ricetta ha una pagina propria /ricette/nome-ricetta con:
  - porzioni regolabili (i valori nutrizionali si ricalcolano sommando gli
    ingredienti reali dal database alimenti, mai scritti a mano)
  - lista ingredienti collegata alle rispettive pagine alimento
  - preparazione passo passo
  - pulsante "Aggiungi tutto al piatto" che aggiunge ogni ingrediente al
    Plate Builder condiviso
  - ricette correlate
- La pagina di ogni alimento ora mostra le ricette reali che lo utilizzano.
- Il database alimenti (src/foods.js) è stato ampliato: ora include anche
  pane integrale, tonno al naturale e spinaci, usati nelle nuove ricette.

## Novità: Food Battle

- Nuova pagina /confronta: scegli due alimenti da menu a tendina, imposta la
  quantità (uguale per entrambi, così il confronto è corretto) e vedi kcal e
  macronutrienti affiancati.
- Puoi scegliere un parametro (es. "Più proteine", "Meno kcal") e il sistema
  evidenzia quale dei due vince SOLO su quel parametro — non esiste un
  "alimento migliore assoluto", coerente col principio del brief originale.
- Dalla pagina di ogni alimento, "Confronta" ora porta dritto al Food Battle
  con quell'alimento già selezionato.
- Il menu "LAB" ora punta al Food Battle (sarà la home dell'area Lab quando
  aggiungeremo Mito o Verità e i quiz).

## Novità: Strumenti

- Nuova pagina /strumenti con 4 card: Fabbisogno calorico, Proteine,
  Costruisci il piatto (rimanda al Plate Builder in homepage), BMI.
- /strumenti/fabbisogno: calcolatore del fabbisogno calorico (formula di
  Mifflin-St Jeor), mostra mantenimento, deficit (-500 kcal) e surplus (+500 kcal).
- /strumenti/proteine: intervallo proteico giornaliero indicativo in base a
  peso e livello di attività.
- /strumenti/bmi: calcolo del BMI con tono neutro — mostra solo il dato e le
  fasce di riferimento, senza giudizi, con una nota che spiega i limiti
  dell'indicatore (non distingue massa muscolare da massa grassa).
- Tutte le formule sono centralizzate in src/calculators.js, non ripetute nei
  componenti, con disclaimer chiaro ovunque: sono stime informative, non
  sostituiscono una valutazione professionale.
- Il menu "STRUMENTI" ora funziona.

## Novità: Apri il Frigo

- Nuova pagina /apri-il-frigo: seleziona gli ingredienti che hai a disposizione
  (chip cliccabili con tutti gli alimenti del database).
- Il sistema mostra le ricette compatibili ordinate per: quanti ingredienti
  hai già, percentuale di compatibilità, poi tempo di preparazione.
- Se ti manca 1-2 ingredienti per completare una ricetta, te lo dice
  esplicitamente ("Ti manca: pomodoro").
- Filtro opzionale per limite di calorie (≤300 / ≤500 / ≤700).
- Accessibile dalla pagina Ricette con il link "Non sai cosa cucinare? Apri
  il frigo →".

## Novità: database alimenti ampliato

- Da 15 a 84 alimenti, distribuiti su tutte le categorie del brief originale:
  Frutta, Verdura, Cereali & derivati, Carne, Pesce, Uova, Legumi,
  Latte & derivati, Frutta secca, Condimenti, Dolci & snack, Bevande.
- IMPORTANTE — trasparenza sui dati: i valori nutrizionali sono valori di
  riferimento standard (compatibili con le tabelle nutrizionali più diffuse,
  tipo USDA/CREA), inseriti manualmente per popolare la piattaforma.
  Prima di una pubblicazione pubblica definitiva andrebbero verificati e
  collegati a una fonte ufficiale, come previsto dal Prompt 3 (campo
  "source" per ogni alimento). Per arrivare a centinaia o migliaia di
  alimenti in modo affidabile servirà un vero import da una fonte esterna
  strutturata (es. CREA, USDA), non l'inserimento manuale.
- La homepage ora mostra una selezione fissa e varia di 8 alimenti in
  vetrina (prima, con l'ordinamento per categoria, mostrava solo frutta).
- Ricerca, Food Battle, Apri il Frigo, pagine alimento: tutto funziona già
  con l'intero dataset ampliato, nessuna modifica necessaria.

## Novità: Mito o Verità + area LAB

- Nuova pagina /lab: raccoglie Food Battle e Mito o Verità (prima "LAB" nel
  menu portava solo a Food Battle).
- Nuova pagina /mito-o-verita: 8 affermazioni sulla nutrizione, rispondi
  MITO o VERITÀ, la card si "gira" (animazione flip reale in CSS) mostrando
  la risposta corretta e una spiegazione breve. Alla fine mostra un
  punteggio semplice (es. 5/8) e permette di ricominciare.
- Questa sezione ha uno sfondo blu elettrico dedicato — è il "momento
  visivo forte" richiesto dal brief originale per quest'area, distinto dal
  nero del Plate Builder.
- Le spiegazioni non danno mai giudizi assoluti ("sempre", "mai") e restano
  coerenti col principio "niente terrorismo alimentare" del brief.

## Novità: pagina Alimenti (database completo)

- Nuova pagina /alimenti: elenco di tutti gli 84 alimenti, con ricerca live
  e filtro per categoria (Frutta, Verdura, Carne, ecc.).
- Ogni riga porta alla scheda completa dell'alimento.
- Il menu "ALIMENTI" ora funziona: era l'ultima voce di navigazione rimasta
  senza destinazione.

## Novità: 15 alimenti aggiunti su richiesta

Da 84 a 99 alimenti. Aggiunti: Seitan, Tofu, Tofu affumicato, Tempeh,
Affettato vegetale, Tonno sott'olio, Salmone selvaggio, Albume, Proteine in
polvere isolate, Proteine vegetali (riso e pisello), Latte proteico vaccino
scremato, Yogurt greco 0%/2%/5% grassi (tre varianti distinte), Gallette di
riso e di mais.

Trasparenza sui valori:
- Affettato vegetale, Proteine isolate, Proteine vegetali, Latte proteico:
  proteine/carboidrati/grassi sono i valori esatti forniti; le kcal sono
  state CALCOLATE da questi (proteine×4 + carboidrati×4 + grassi×9), mai
  inventate.
- Tutti gli altri (Seitan, Tofu, Tempeh, Tonno sott'olio, Salmone selvaggio,
  Albume, Yogurt 0%/2%, Gallette): valori di riferimento standard, stessa
  logica già usata per il resto del database — da verificare con una fonte
  ufficiale prima di una pubblicazione pubblica definitiva.
- Nuove categorie: "Proteine vegetali" e "Integratori".

## Novità: Articoli / Palumbo Lab editoriale

- Nuova pagina /articoli: 4 articoli (Calorie, Dimagrimento, Proteine,
  Metabolismo), raggiungibile dall'hub /lab (terza card "Articoli").
- Ogni articolo è costruito "a blocchi", non come muro di testo:
  - box "IN BREVE" con risposta rapida in 2-4 frasi
  - paragrafi di approfondimento
  - quiz interattivi incorporati DENTRO l'articolo (component InlineQuiz):
    l'utente risponde, vede subito se ha indovinato e legge la spiegazione
  - link contestuali a schede alimento e strumenti (es. link al
    calcolatore fabbisogno dentro l'articolo sul deficit calorico)
  - articoli correlati in fondo
- Il motore a blocchi (src/articles.js) rende facile aggiungere nuovi
  articoli in futuro senza scrivere una nuova pagina da zero: basta
  aggiungere un nuovo oggetto con i blocchi desiderati.

## Novità: Percorsi Personalizzati (pagina commerciale)

- Nuova pagina /percorsi-personalizzati: hero, le 4 fasi del metodo
  (Analizziamo, Costruiamo, Adattiamo, Consolidiamo), testimonianze
  (esempi generici, non persone reali), CTA finale "Richiedi informazioni".
- Cliccando la CTA finale si apre una FINESTRA (modale) dove si sceglie:
  - il pacchetto: Prima visita / Percorso 3 mesi / 6 mesi / 12 mesi
  - eventuali extra: scheda di allenamento personalizzata, pacchetto PDF
    con manuali e guide
  - un bottone "Invia richiesta via email" che apre il programma di posta
    dell'utente con oggetto e corpo del messaggio già compilati in base
    alle scelte fatte.
- Tutte le CTA "Scopri i percorsi personalizzati" sparse nel sito (homepage,
  pagina BMI, pagina Fabbisogno calorico, menu in alto) ora portano
  davvero a questa pagina — prima erano testo non cliccabile.

## Email del modale di prenotazione (RISOLTO — vedi nota più recente in cima)

Il file src/components/PercorsiModal.jsx contiene questa riga in cima:

    const CONTACT_EMAIL = 'davidepalumbo.nutrizione@gmail.com';

Non è più un segnaposto: è l'indirizzo reale a cui arrivano le richieste.

Nota: il sistema attuale (mailto) apre il programma di posta dell'utente
con l'email già scritta, ma è l'utente a doverla effettivamente inviare —
non c'è un vero invio automatico dal sito, perché non abbiamo un backend.
Se in futuro vuoi un modulo che invia davvero senza passare dal programma
di posta dell'utente, serve un servizio esterno tipo Netlify Forms,
Formspree o simili: possiamo aggiungerlo quando vuoi.

## Novità: più ricette e più articoli

Da 5 a 13 ricette. Aggiunte: Buddha bowl con quinoa e ceci, Salmone al
forno con patate, Tofu saltato con verdure, Insalata di farro con
mozzarella e pomodoro, Porridge di avena con mirtilli e mandorle, Seitan
alla piastra con verdure, Lenticchie stufate, Smoothie proteico alla
banana. Usano gli alimenti aggiunti di recente (tofu, seitan, salmone,
quinoa, lenticchie, farro, avena, proteine isolate).

Da 4 a 8 articoli. Aggiunti, con nuove categorie: "Cosa mangiare prima di
allenarsi" (Sport), "Le fibre e la salute intestinale" (Intestino), "Dieta
chetogenica: come funziona davvero" (Keto & Low Carb), "Il mito del
metabolismo lento" (Miti alimentari). Stessa struttura a blocchi degli
altri, con quiz interattivi incorporati.

Tutti i foodId usati nelle nuove ricette e articoli sono stati verificati
contro il database alimenti: nessun riferimento rotto.

## Novità: ottimizzazione mobile

- Menu mobile vero (hamburger): prima ALIMENTI/RICETTE/LAB/STRUMENTI
  sparivano del tutto sotto i 780px di larghezza senza alcuna alternativa.
  Ora un'icona ☰ in alto a destra apre un menu a tendina con tutte le voci
  (icona che si trasforma in ✕ quando aperto).
- Risolto un bug strutturale di CSS (flex/grid non permettevano agli
  elementi di restringersi sotto una certa larghezza) che causava
  overflow orizzontale in "Costruisci il tuo piatto" e "Il tuo piatto":
  ora gli elementi di ogni riga vanno a capo in modo ordinato invece di
  uscire dallo schermo.
- Numeri e testo ridotti su schermi molto piccoli (sotto 480px): il totale
  kcal, le card dei macronutrienti e i pulsanti target sono più compatti
  ma restano leggibili.
- Verificato con screenshot reali a 375px di larghezza (iPhone-size):
  nessun overflow orizzontale residuo su nessuna delle sezioni testate.

## Correzione: ricette e articoli ora visibili in homepage

Il contenuto (13 ricette, 8 articoli) esisteva già nel codice ed era
raggiungibile dal menu, ma la homepage non lo mostrava mai: si fermava a
"Quante kcal?" e "Costruisci il piatto". Aggiunte due nuove sezioni alla
homepage, come previsto dall'ordine originale del brief:

- "Mangia bene. Davvero." — anteprima delle prime 3 ricette con link
  "Vedi tutte le ricette →"
- "Palumbo Lab." — Food Battle e Mito o Verità in evidenza, più le prime 2
  anteprime articoli, con link "Esplora tutto il Lab →"

Verificato con screenshot reali (desktop e mobile 375px) che le sezioni
compaiono correttamente e senza overflow.

## Novità: redesign "Percorsi Personalizzati" (più magnetico)

Nessun trucco da urgenza finta (niente sconti, countdown, "ultimi posti":
restano esclusi per scelta, come indicato nel brief originale). Il
miglioramento è tutto di gerarchia visiva e ritmo:

- Hero con badge "IL METODO", parola chiave "dieta" evidenziata in blu
  corsivo, e tre pillole di fiducia sotto al sottotitolo (Su misura per
  te / Si adatta nel tempo / Accompagnamento reale).
- Le 4 fasi ora sono una vera timeline: cerchi numerati blu, connettori
  visivi tra una fase e l'altra su desktop.
- Nuova sezione "Cosa include il percorso": lista con check blu + un
  pannello scuro a fianco con il numero "4" in grande, per dare peso
  visivo senza aggiungere altro testo.
- Testimonianze ridisegnate con virgolette decorative e bordo superiore blu.
- Finale a tutta larghezza, sfondo scuro arrotondato (stesso linguaggio
  visivo della sezione "Costruisci il piatto"): è il vero momento di
  conversione, isolato e ad alto contrasto rispetto al resto della pagina.
- Il modale di prenotazione ha ora un'icona per ogni pacchetto.

Verificato con screenshot reali (desktop, mobile, modale aperto): nessun
overflow, tutto leggibile.

## Novità: ricette proteiche / da palestra

Da 13 a 20 ricette. Aggiunte 7 ricette a tema proteico/palestra:

- Pancake proteici con farina d'avena e albume (colazione/post-workout)
- Porridge proteico con frutta e yogurt greco (avena cotta nel latte
  proteico, completata con yogurt greco e mirtilli)
- Frittata di albumi con spinaci
- Pollo, patate e broccoli al forno (il classico "pasto da palestra")
- Riso con tonno e piselli (post-workout, veloce)
- Overnight oats proteici (si prepara la sera prima)
- Tacchino con riso integrale e zucchine

Tutte usano ingredienti proteici già nel database (albume, latte proteico,
yogurt greco nelle sue varianti, tonno, pollo, tacchino). Valori
nutrizionali calcolati automaticamente dagli ingredienti, come sempre —
nessun numero scritto a mano. Verificato che tutti i foodId richiamati
esistano nel database e che non ci siano ID di ricette duplicati.
