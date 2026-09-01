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
