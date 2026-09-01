## Aggiornamento: grammi editabili nel piatto ("Costruisci il tuo piatto")

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

## ATTENZIONE — indirizzo email da sostituire

Il file src/components/PercorsiModal.jsx contiene questa riga in cima:

    const CONTACT_EMAIL = 'info@gustoscopio.it';

È un indirizzo segnaposto. Prima di pubblicare, sostituiscilo con il tuo
indirizzo email reale, altrimenti le richieste finiranno nel vuoto.

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
