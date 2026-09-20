## Aggiornamento: tentativo di avvio in HD (720p)

Aggiunto un tentativo di forzare la qualità a 720p all'avvio di ogni
video e ad ogni cambio video, tramite l'API ufficiale di YouTube
(`setPlaybackQuality('hd720')`).

⚠️ Non è garantito al 100%: YouTube tratta questo come un "suggerimento"
da anni, non un comando vincolante — la qualità reale dipende anche da
connessione e browser dell'utente. Inoltre, avendo nascosto i controlli
nativi nel passo precedente, se YouTube dovesse comunque partire in
bassa qualità, l'utente non ha più modo di cambiarla manualmente. Se
noti che capita spesso, fammelo sapere e rivediamo se tenere nascosti
tutti i controlli.

Build verificata senza errori.

## Aggiornamento: controlli play/pausa personalizzati (via API ufficiale YouTube)

Costruiti controlli minimal disegnati da noi (solo play/pausa, nessun
altro elemento YouTube visibile durante la riproduzione), usando la
IFrame Player API ufficiale di YouTube — pensata proprio per questo
tipo di personalizzazione, quindi nessuna violazione dei loro termini.

Come funziona: un pulsante trasparente copre tutto il video; mostra
un'icona play/pausa disegnata da noi al centro, che cambia in base allo
stato reale del video (gestito tramite l'API, non un trucco visivo). Un
click mette in pausa o riprende la riproduzione.

I video su Bunny.net (se ce ne saranno in futuro) continuano a usare il
player semplice di prima, invariato.

Build verificata senza errori.

## Aggiornamento: solo tasto play, niente altri controlli YouTube

Aggiunto `controls=0` (parametro ufficiale YouTube) all'embed: resta
visibile solo il grande tasto play iniziale, sparisce tutta la barra
controlli (volume, sottotitoli, impostazioni, schermo intero, logo).

Nota: una volta avviato il video non ci sono più pulsanti visibili per
pausa/volume, ma un click sul video di solito lo mette comunque in
pausa/riprende (comportamento base del player). Se in futuro servono
controlli minimal personalizzati (play/pausa disegnati su misura), è
possibile ma richiede l'integrazione con l'API IFrame di YouTube — un
lavoro più corposo, da valutare se serve davvero.

Build verificata senza errori.

## Aggiornamento: cornice brandizzata Gustoscopio intorno al player

Aggiunta una cornice con gradiente blu/nero e una piccola intestazione
"GUSTOSCOPIO · [titolo video]" sopra il player — solo estetica, non
tocca in alcun modo l'iframe di YouTube al suo interno (nessuna
violazione dei termini d'uso del loro embed).

Build verificata senza errori.

## Aggiornamento: player YouTube più pulito

Aggiunti parametri all'embed YouTube per ridurre al minimo i riferimenti
alla piattaforma: niente video correlati di altri canali a fine
riproduzione, logo ridotto, niente annotazioni sovrapposte.

Nota onesta: YouTube non permette di eliminare del tutto la possibilità
di aprire il video sulla loro piattaforma (è un vincolo dei loro termini
d'uso per gli embed, non un limite tecnico nostro). Il player è comunque
molto più pulito di quello di default.

Build verificata senza errori.

## Aggiornamento: tutti i 12 video migrati da Bunny a YouTube

Completata la migrazione: tutti e 12 i video del corso usano ora ID
YouTube reali invece di Bunny.net. Nessun ID duplicato (verificato).

⚠️ PROMEMORIA IMPORTANTE (invariato): per una protezione reale, ogni
video va impostato come "Privato" su YouTube e condiviso manualmente
con l'email Google di ciascun cliente dopo l'acquisto — passaggio NON
automatizzato dal sito. Finché restano pubblici/non in elenco, chi ha
il link li vede anche senza aver pagato.

Bunny.net non è più usato per nessun video del corso attuale, ma il
codice (`getBunnyEmbedUrl`, `BUNNY_LIBRARY_ID`) resta disponibile in
`corsi.js` per eventuali corsi futuri che vorrete tenere lì.

Build verificata senza errori.

## Aggiornamento: primi 4 video migrati da Bunny a YouTube

Su richiesta, i video 1.1, 1.2, 1.3 e 2.1 ora usano YouTube invece di
Bunny.net (ID reali collegati). Aggiunta una funzione generica
`getEmbedUrl()` in `corsi.js` che sceglie da sola tra Bunny e YouTube in
base al campo `provider` di ciascun video — i restanti 8 video restano
su Bunny per ora, migrabili con calma uno alla volta.

⚠️ PROMEMORIA IMPORTANTE (discusso in chat): con YouTube, il vero
controllo d'accesso va fatto impostando ogni video come "Privato" su
YouTube e condividendolo manualmente con l'email Google di ciascun
cliente dopo l'acquisto — questo passaggio NON è automatizzato dal sito
(il webhook sblocca l'accesso su Gustoscopio, ma non condivide il video
su YouTube per te). Finché i video restano pubblici/non in elenco su
YouTube, chi ha il link può vederli anche senza aver pagato.

Build verificata senza errori.

## Aggiornamento: 10 "idee veloci" a 2-3 ingredienti per dare più spunti su ogni alimento base (da 87 a 97 ricette)

Ricette semplicissime come richiesto (tipo "Nutricotta + dolcificante +
cioccolato fondente"), pensate per dare al paziente tante varianti sullo
stesso alimento base invece di un'unica ricetta complessa. Coprono 5 basi
proteiche diverse, ognuna con 2-3 idee:

- **Nutricotta** (Ricotta Proteica LIDL): con dolcificante e cioccolato
  fondente · con marmellata Hero Light · al cacao
- **Yogurt greco 0%**: al cacao · con marmellata Hero Light · con
  cioccolato fondente e dolcificante
- **Fiocchi di latte 0%**: con cioccolato fondente e dolcificante · con
  marmellata Hero Light
- **Kefir PRO**: al cacao
- **Philadelphia Protein**: con marmellata Hero Light

Aggiunti 3 alimenti mancanti per poterle fare: **Marmellata Hero Light**
(42 kcal/100g, dati reali trovati online, media tra le varianti gusto),
**Dolcificante** (valori quasi a zero, come da etichetta tipica) e **Cacao
amaro in polvere** (228 kcal/100g, valore di riferimento standard).

Tutte pronte in 1 minuto, un solo passaggio ("mescola e mangia"). Nessun
ID duplicato tra i 180 alimenti né tra le 97 ricette, nessun foodId rotto.
Build verificata senza errori.



Approvate dal legale — rimosso l'avviso "bozza da verificare" da
entrambe le pagine (`/privacy` e `/cookie-policy`). Il contenuto resta
lo stesso, sono definitive.

Build verificata senza errori.

## Aggiornamento: dati reali del titolare inseriti nella Privacy Policy

Sostituiti tutti i placeholder in `/privacy` e `/cookie-policy` con i
dati reali:
- Dr. Davide Palumbo — Biologo Nutrizionista
- Partita IVA 12543901008
- Email: davidepalumbo.nutrizione@gmail.com
- Data ultimo aggiornamento: 19 settembre 2026

Resta comunque valido il consiglio di farla verificare da un legale o
consulente privacy prima di considerarla definitiva — soprattutto per
la parte sui dati fisici della valutazione.

Build verificata senza errori.

## Aggiornamento: Privacy Policy, Cookie Policy e consenso alla registrazione

⚠️ IMPORTANTE: queste sono BOZZE basate su cosa fa davvero il sito oggi
(inventario dati verificato nel codice). Vanno fatte verificare e
completare da un legale/consulente privacy prima di considerarle
definitive — in particolare vanno inseriti i dati reali del titolare
del trattamento (nome, P.IVA, contatti) al posto dei placeholder tra
[parentesi quadre] in `src/pages/PrivacyPage.jsx`.

Cosa è stato aggiunto:
- `/privacy` — Informativa Privacy completa: dati account, dati di
  acquisto, pagamento (gestito da Stripe), dati fisici della valutazione
  (chiarito che restano SOLO nel browser, mai inviati/salvati), dati
  tecnici, fornitori terzi coinvolti, diritti dell'utente.
- `/cookie-policy` — Cookie Policy: il sito non usa cookie di
  profilazione/marketing né analytics ad oggi; spiegato l'unico
  meccanismo tecnico usato (sessione di login).
- Link a entrambe le pagine nel footer di tutto il sito.
- **Checkbox obbligatoria** "Ho letto e accetto la Privacy Policy" alla
  registrazione (sia nella pagina del corso che in `/accedi`): il
  bottone resta disabilitato finché non viene spuntata. Il link apre la
  pagina in una scheda separata, così non si perde il form compilato.

Build verificata senza errori.

## Aggiornamento: campo "Conferma email" alla registrazione (+ conferma email non serve più)

Novità di questo pacchetto:
- Rimossa la conferma via email (vedi nota precedente) — chi si registra
  entra subito.
- Aggiunto un campo "Conferma email" nel form di registrazione (sia
  nella pagina del corso che in /accedi): il campo password compare solo
  quando le due email coincidono, con incolla disattivato sul secondo
  campo (altrimenti si potrebbe incollare la stessa email sbagliata due
  volte, vanificando il controllo). Se non coincidono, appare un avviso
  chiaro.
- Questo sostituisce, almeno in parte, la protezione che dava la
  conferma via email: cattura i refusi nell'indirizzo prima ancora di
  creare l'account.

Build verificata senza errori.

## Aggiornamento: rimossa la conferma email

Su richiesta, la conferma email è stata disattivata (era il motivo per
cui arrivava un'email generica di Supabase, percepita come "sospetta").
Ora chi si registra entra subito, senza dover controllare la posta —
vero flusso a un unico passaggio dalla pagina del corso.

Compromesso accettato consapevolmente: non c'è più una verifica che
l'indirizzo email inserito sia corretto/esistente. Il filtro reale
resta comunque il pagamento con carta.

Build verificata senza errori.

## Confermato: pagamento live testato con successo, prezzo tornato a 29€

Test reale completato: pagamento da 1€ riuscito su Stripe Live, webhook
ricevuto, corso sbloccato automaticamente sul sito. L'intera catena
(login → valutazione → Stripe → Supabase → sblocco) funziona in
produzione.

Prezzo rimesso a 29€ (era stato abbassato a 1€ solo per il test).

Build verificata senza errori.

## ⚠️ TEST TEMPORANEO: prezzo abbassato a 1€

Il prezzo del corso è impostato a 1€ SOLO per verificare che il
pagamento vero (Stripe Live) funzioni end-to-end. Dopo aver confermato
che l'acquisto sblocca correttamente il corso, va rimesso a 29€ in
`src/corsi.js` (campo `price` e `priceLabel`).

## Aggiornamento: stesso restyling per "Il Lab" e "Strumenti"

Entrambe le pagine ora hanno lo stesso hero scuro con bagliore animato
usato per Corsi (coerenza visiva su tutto il sito). Le card degli
strumenti:
- Compaiono con un leggero effetto a cascata al caricamento.
- L'icona si ingrandisce e ruota leggermente al passaggio del mouse.
- La freccia "→" si sposta leggermente a destra all'hover.

Nessuna nuova dipendenza, riusa le stesse animazioni CSS già create per
Corsi. Build verificata senza errori.

## Aggiornamento: restyling pagina hub /corsi

- Aggiunto un hero scuro d'impatto in cima (stesso stile della pagina
  del singolo corso: bagliore animato, comparsa a cascata), con titolo,
  gancio breve e il bottone Accedi/Esci ora come pillola elegante invece
  di un link semplice.
- Le card dei corsi hanno una vera barra di progresso visiva (invece del
  solo testo "X di Y video") e compaiono con un leggero effetto a
  cascata quando la pagina si carica.
- Pronta a scalare bene quando aggiungerete altri corsi: ogni card
  calcola da sola la propria barra di progresso.

Build verificata senza errori.

## Correzione: bagliore dell'hero e pannello decentrato

- Il bagliore blu nell'hero era troppo piccolo: quando si muoveva
  rivelava un bordo netto contro lo sfondo nero. Ora è più grande e con
  una dissolvenza più morbida, quindi il movimento resta invisibile ai
  bordi.
- Il pannello "Crea il tuo account" (e gli altri pannelli sotto l'hero)
  erano scentrati a sinistra su schermi larghi — persa la centratura
  automatica durante il restyling precedente. Ripristinata.

Build verificata senza errori.

## Aggiornamento: micro-animazioni sulla pagina corso

- L'hero appare con una comparsa graduale a cascata (kicker → titolo →
  gancio → prezzo → le 4 chip, una dopo l'altra).
- Il bagliore blu sullo sfondo dell'hero si muove lentamente in loop,
  per dare vita senza distrarre.
- I pannelli (login, valutazione, acquisto) entrano con un piccolo
  movimento verso l'alto ogni volta che cambi stato, invece di apparire
  di scatto.
- I valori BMI e metabolismo basale fanno un piccolo "pop" ogni volta
  che li aggiorni cambiando i dati nel form.

Nessuna nuova dipendenza: solo animazioni CSS (keyframes), niente
librerie di animazione. Build verificata senza errori.

## Aggiornamento: restyling pagina corso — hero d'impatto, meno testo

- La lunga descrizione a paragrafi è sparita. Al suo posto: un hero scuro
  (stesso stile dei "momenti firma" del sito) con titolo grande in serif,
  un gancio di UNA frase, il prezzo in evidenza, e 4 punti chiave in
  formato "chip" scansionabile invece di testo da leggere per intero.
- I pannelli sotto l'hero (login/registrazione, valutazione, acquisto)
  sono ora CHIARI (card bianche), non più neri — così il nero resta
  "speciale" solo per l'hero, coerente con la regola del vostro design
  system di usarlo con parsimonia.
- Nessun contenuto perso: i punti della vecchia descrizione sono
  riorganizzati come `highlights` in `src/corsi.js`, facili da
  modificare o estendere per corsi futuri.

Build verificata senza errori.

## Aggiornamento: login/registrazione integrati nella pagina del corso

Non serve più uscire dalla pagina del corso per accedere: il form di
login/registrazione è ora direttamente dentro `/corsi/da-zero-al-tuo-piano`
(stessa pagina, si passa da form → valutazione → acquisto senza mai
cambiare URL). La pagina separata `/accedi` resta disponibile per chi la
raggiunge direttamente, ma non è più necessaria per acquistare.

La conferma email resta ATTIVA (scelta tua): chi si registra riceve
comunque una mail da confermare prima di poter accedere — non è un
flusso a un unico passaggio per i nuovi utenti, ma resta molto più
comodo per chi ha già un account (email + password → subito valutazione
e acquisto, sulla stessa pagina).

Build verificata senza errori.

## Aggiornamento: vendite del corso attivate (salesOpen: true)

Il corso "Da Zero al Tuo Piano" non mostra più "In arrivo" — è
acquistabile per davvero. Il bottone "Acquista — 29€" è di nuovo
visibile su `/corsi` e sulla pagina del corso.

IMPORTANTE: questo va caricato SOLO dopo aver già aggiornato su Vercel
le chiavi Stripe da test a Live (STRIPE_SECRET_KEY e
STRIPE_WEBHOOK_SECRET) e aver fatto il Redeploy — altrimenti il sito
mostrerebbe il bottone attivo ma i pagamenti userebbero ancora le
chiavi sbagliate.

Build verificata senza errori.

## Aggiornamento: testimonianze in striscia scorrevole (invece della griglia)

Le 12 testimonianze non occupano più una griglia enorme: ora scorrono in
due righe automaticamente (direzioni opposte), con i bordi che sfumano
dolcemente — uno spazio fisso e compatto qualunque sia il numero di
testimonianze presenti. Passando il mouse sopra una riga, quella riga si
ferma per poter leggere con calma. Nessuna nuova dipendenza: solo
animazione CSS.

Se in futuro aggiungi altre testimonianze, basta aggiungerle
all'array `TESTIMONIALS` in `PercorsiPage.jsx` — si dividono da sole
tra le due righe.

Build verificata senza errori.

## Aggiornamento: testimonianze da 3 a 12

Espansa la sezione "Chi lo ha provato" nella pagina Percorsi
Personalizzati da 3 a 12 testimonianze, con situazioni ed età diverse
(lavoro/famiglia, sport, rapporto col cibo, maternità, viaggi, ecc.), per
evitare che sembrino tutte uguali. La griglia a 3 colonne ora si riempie
in 4 righe piene.

⚠️ PROMEMORIA IMPORTANTE: come le 3 originali, anche queste 9 nuove sono
testimonianze di esempio/segnaposto (nomi ed età inventati), non persone
reali. Prima di un lancio pubblico vero vanno sostituite con
testimonianze autentiche di clienti reali (con il loro consenso) — non
lasciarle come sono se il sito va online per davvero, altrimenti
sarebbero recensioni false.

Build verificata senza errori.

## Aggiornamento: scheda allenamento, guide PDF e videocorso inclusi nel Percorso

Nella lista "Cosa include il percorso" (pagina Percorsi Personalizzati),
sostituita la voce generica "possibilità di aggiungere scheda di
allenamento e materiali extra" con tre voci esplicite, ora incluse di
default:
- Scheda di allenamento personalizzata
- Guide PDF di approfondimento
- Accesso al videocorso "Da Zero al Tuo Piano"

Build verificata senza errori.

## Aggiornamento: restyling sezione "Percorsi Personalizzati"

Nessuna modifica strutturale, solo rifiniture visive:
- Hover con leggero sollevamento su: card delle 4 fasi, righe "cosa
  include", card testimonianze, pillole "trust", bottone CTA finale.
- Avatar con iniziali per ogni testimonianza (più umano, meno "muro di
  testo").
- Sottolineatura rossa (Pompeian Red, uso minimo) sotto la parola
  "dieta" nel titolo — l'unico tocco di rosso della pagina, coerente col
  vincolo "max 2%" del design system.
- Sfondo leggermente decorato (puntini sottili) nel pannello scuro
  "4 fasi" e bagliore blu soffuso nel blocco CTA finale, per dare
  profondità senza aggiungere immagini esterne.
- Checkmark che diventano rossi al passaggio del mouse su "cosa include"
  (piccola sorpresa coerente col ruolo del rosso nel design system).

Nessuna nuova dipendenza, nessuna immagine esterna (tutto CSS). Build
verificata senza errori.

## Aggiornamento: corso completo — 12 di 12 video

Aggiunti gli ultimi 5 video: "3.3 Esempio pratico: una giornata intera",
Modulo 4 ("4.1 I 3 miti che rovinano i piani", "4.2 Perché
\"buono/cattivo\" non esiste") e Modulo 5 ("5.1 Cosa fare quando non hai
voglia", "5.2 Come adattare il piano nel tempo").

Tutti e 12 i Video ID controllati: nessun duplicato.

`salesOpen` resta VOLUTAMENTE `false`: il corso è tecnicamente completo
ma le vendite restano disattivate finché non vengono controllati tutti
i video online. Quando sei pronto, in `src/corsi.js` cambia
`salesOpen: false` in `salesOpen: true` per aprire l'acquisto.

Build verificata senza errori.

## Aggiornamento: barra di ricerca in /ricette + 6 nuove ricette veloci (da 81 a 87)

**Barra di ricerca aggiunta a `/ricette`**: con 81+ ricette e solo i filtri
per kcal/tempo/categoria, trovare una ricetta specifica per nome era
scomodo — hai ragione, mancava. Ora c'è una ricerca per nome sopra i
filtri esistenti, stesso stile già usato in `/alimenti`. Si combina con i
filtri (puoi cercare per nome E filtrare per kcal insieme).

**6 nuove ricette veloci per snack**:

- Crackers Galbusera Magretti con Parmigiano (1 pacchetto/4 gallette + 20g
  Parmigiano, come richiesto)
- Kefir PRO con banana
- Bresaola con grana e rucola
- Tonno con gallette di riso
- Uovo sodo con gallette di mais
- Yogurt HiPRO con noci

Tutte pronte in 2-8 minuti, zero o quasi preparazione. Nessun ID
duplicato tra le 87 ricette, nessun foodId rotto. Build verificata senza
errori.



Chi visita il sito da telefono ora vede, in basso, un piccolo banner
scuro (coerente col design system) che lo informa della possibilità di
installare Gustoscopio come app:

- **Android/Chrome**: il banner mostra un pulsante "Installa" che apre
  direttamente il prompt nativo del browser (nessun passaggio manuale).
- **iPhone/iPad (Safari)**: Safari non permette di aprire il prompt in
  automatico, quindi il banner mostra le istruzioni testuali — "tocca
  Condividi, poi Aggiungi a Home".
- Non compare affatto se l'app è già installata (rilevato tramite
  `display-mode: standalone`), e se l'utente lo chiude con la ✕ non
  ricompare più su quel dispositivo (ricordato in `localStorage`).

Nuovo componente `src/components/InstallAppBanner.jsx`, collegato in
`App.jsx` accanto al Toast esistente — visibile su tutte le pagine.
Nessuna CTA aggressiva, coerente col tono del brief ("mai invadente"):
un banner piccolo, in basso, sempre chiudibile con un tap. Build
verificata senza errori.



Ho cercato online i prodotti reali della linea proteica LIDL (marchi
Chef Select, Milbona, Gelatelli). Aggiunti inizialmente 11 alimenti, poi
**rimossi i 6 con dati solo "tipici di categoria"** (formaggio spalmabile
proteico, barretta proteica, affettato vegano proteico, muesli proteico,
pancake proteici, penne di lenticchie al ragù) su richiesta — nessuno era
usato in ricette, quindi rimossi senza rompere nulla. Restano solo i 5 con
dati confermati da fonti reali:

| Alimento | kcal | proteine | carbo | grassi | fibre |
|---|---|---|---|---|---|
| Polpette tacchino/pollo High Protein (Chef Select) | 239 | 14g | 12.6g | 15.1g | 0g |
| Budino Proteico (Milbona) | 76 | 10g | 5.2g | 1.5g | 0g |
| Pizza Margherita High Protein (Chef Select) | 163 | 15.8g | 13.4g | 4.1g | 3g |
| Gelato Proteico al Cioccolato (Gelatelli) | 157 | 7.8g | 19.6g | 4.2g | 4.7g |
| High Protein Drink (Chef Select/Milbona) | 66 | 10g | 4g | 1.5g | 0g |

Aggiunta anche la **Base per pinsa (Di Marco)** richiesta, in vendita in
vari supermercati (es. DEM): 230 kcal, 10.2g proteine, 41g carboidrati,
2.4g grassi per 100g, dati confermati su Fatsecret. La fibra (2g) è
l'unico valore stimato — non trovato nella fonte, segnalato per
trasparenza.

Nessun ID duplicato tra i 177 alimenti, nessun foodId rotto. Build
verificata senza errori.



## Aggiornamento: aggiunti i video 5, 6, 7 (Modulo 2 completato + Modulo 3)

- Modulo 2 ora completo con "2.1 Come si calcola il fabbisogno" e
  "2.2 Proteine: quante ne servono a te".
- Nuovo Modulo 3 con "3.1 Il metodo del piatto" e "3.2 Usare il Plate
  Builder passo passo".
- Contatore aggiornato automaticamente a 7 di 12 video disponibili.

`salesOpen` resta `false`. Build verificata senza errori.

## Aggiornamento: valori del Tofu sincronizzati con l'etichetta reale (Eurospin Bio)

Controllati i valori ufficiali del prodotto che mi hai linkato (Tofu al
naturale Bio, Eurospin, 2x125g) su Open Food Facts — stessa scheda
prodotto della linea Amo Essere/Fior di Natura Eurospin, dati presi
direttamente dall'etichetta:

| | Prima | Ora (da etichetta) |
|---|---|---|
| kcal | 76 | **155** |
| proteine | 8g | **15g** |
| carboidrati | 1.9g | **2.2g** |
| grassi | 4.8g | **9.2g** |
| fibre | 0.3g | **1.9g** |

Il valore precedente era sensibilmente sottostimato (quasi la metà delle
kcal reali). Ho lasciato il nome "Tofu" generico (non l'ho rinominato in
"Tofu Eurospin") perché è usato in diverse ricette pensate in modo
generico — cambiare nome lì avrebbe reso l'accostamento strano.

**Effetto collaterale corretto**: la ricetta "Tofu con porri e riso" era
stata costruita per stare sotto i 15g di grassi con il vecchio valore del
tofu. Con grassi quasi raddoppiati, sarebbe salita a ~19.8g. Ho ridotto il
tofu da 150g a 100g e l'olio da 5g a 4g: ora la ricetta torna a 14.2g di
grassi, di nuovo sotto la soglia. L'altra ricetta con tofu ("Tofu saltato
con verdure", tra le 20 originali) non aveva questo vincolo, quindi non
l'ho toccata.

Build verificata senza errori.



Prima i due selettori di Food Battle erano `<select>` HTML classici con
tutti i 172 alimenti in fila — scomodo da scorrere, specialmente da
mobile. Ora sono un campo di ricerca: clicchi, digiti il nome (anche solo
parziale) e scegli dal menu filtrato in tempo reale.

Nuovo componente riutilizzabile `src/components/FoodSearchSelect.jsx` —
pensato per essere riusabile anche altrove in futuro, se serve un selettore
di alimenti in altre pagine. Per ora sostituisce i due `<select>` solo in
Food Battle, come richiesto. Build verificata senza errori.



Una ricetta per ognuno dei 10 prodotti aggiunti nell'ultimo aggiornamento
alimenti, distribuite tra colazione, pranzo, cena e snack:

- Yogurt HiPRO con muesli e mirtilli
- Kefir PRO con gallette Fiorentini Super Protein e mandorle
- Crackers Galbusera Magretti con Philadelphia Protein
- Pasta Barilla Protein+ al pomodoro
- Pasta di legumi con zucchine e pomodoro
- Mozzarella Protein con pomodorini e rucola
- Ricotta Proteica LIDL con fragole e gallette di riso
- Insalata con ricotta di pecora, noci e mela
- Farro con ricotta di mucca e pomodorini
- Gallette Fiorentini Super Protein con hummus e pomodorini

Nessun ID duplicato tra le 81 ricette, nessun `foodId` rotto. Build
verificata senza errori.



**Ricotta generica rimossa** (da 172 a 171 alimenti): non era usata da
nessuna ricetta, quindi tolta senza rompere nulla. Restano le tre versioni
specifiche già aggiunte: Ricotta di pecora, Ricotta di mucca, Ricotta
Proteica LIDL.

**Nuovo form "Suggerisci un alimento"**: quando una ricerca non trova
nulla — sia nella barra principale della homepage sia in `/alimenti` —
compare un piccolo form (nome alimento precompilato con quello cercato +
un campo note facoltativo) che salva il suggerimento in una tabella
Supabase (`food_suggestions`), non più un semplice "nessun risultato".

⚠️ **AZIONE RICHIESTA DA TE PRIMA CHE FUNZIONI**: devi eseguire UNA VOLTA
il nuovo file `supabase-schema-food-suggestions.sql` in Supabase → SQL
Editor → New query (è uno script a parte, non serve ri-eseguire il file
`supabase-schema.sql` originale). Crea la tabella `food_suggestions` con
Row Level Security: chiunque può scrivere un suggerimento, nessuno può
leggere quelli altrui dal sito — i suggerimenti li vedi solo tu da
Supabase → Table Editor → food_suggestions.

File nuovi/modificati: `src/components/SuggestFoodForm.jsx` (nuovo),
`supabase-schema-food-suggestions.sql` (nuovo), `AlimentiPage.jsx` e
`Home.jsx` (collegato il form all'empty state della ricerca). Build
verificata senza errori.



Aggiunti i prodotti richiesti. Per quelli di cui mi avevi già dato i
valori esatti li ho usati direttamente; per gli altri ho cercato online i
valori reali riportati sulle confezioni/schede prodotto ufficiali:

| Alimento | kcal | proteine | carbo | grassi | fibre | Fonte valori |
|---|---|---|---|---|---|---|
| Crackers Galbusera Magretti | 370* | 11.6g | 77.4g | 1.5g | 4g | forniti da te |
| Yogurt HiPRO Danone | 57 | 10g | 3.9g | 0.2g | 0g | cercato online |
| Kefir PRO High Protein | 57 | 6.8g | 4.1g | 1.5g | 0g | cercato online |
| Mozzarella Protein (Granarolo/Lidl) | 131 | 20g | 1.4g | 5g | 0g | cercato online |
| Ricotta Proteica LIDL (Nutricotta) | 55* | 9g | 2.6g | 1g | 0g | forniti da te |
| Ricotta di pecora | 240 | 11.1g | 3.3g | 19.5g | 0g | valore di riferimento standard |
| Ricotta di mucca | 146 | 8.8g | 3.5g | 10.9g | 0g | = alla "Ricotta" generica già in database |
| Pasta Barilla Protein+ | 354 | 20g | 54g | 2.5g | 7g | cercato online |
| Pasta di lenticchie, ceci e piselli | 335 | 22g | 52g | 2.5g | 10g | valore di riferimento generico |
| Gallette Fiorentini Super Protein | 355 | 24g | 55g | 1.9g | 12g | cercato online |

*Per i due alimenti dove mi hai dato solo proteine/carbo/grassi/fibre, ho
calcolato le kcal con la formula standard (4 kcal/g proteine e carbo, 9
kcal/g grassi) — non un valore a caso.

Nota sui valori "cercati online": sono quelli dichiarati sulle etichette
al momento della ricerca — i produttori possono aggiornare le ricette nel
tempo, quindi vale lo stesso avviso già dato per Kellogg's/Philadelphia:
ricontrollali sulla confezione reale prima di un lancio pubblico.

Nessun ID duplicato tra i 172 alimenti. Build verificata senza errori.



Cambiamento richiesto: ora quando aggiungi un alimento nella sezione
"Costruisci il tuo piatto" scegli prima a quale momento della giornata
appartiene, tramite 4 tab (Colazione/Pranzo/Cena/Snack). Ogni pasto ha il
suo elenco di alimenti, i suoi grammi e i suoi totali indipendenti — non è
più un unico piatto condiviso.

Sotto, una nuova card **"Riepilogo della giornata"** somma automaticamente
tutti e 4 i pasti e mostra: kcal totali della giornata, il dettaglio kcal
per singolo pasto, e i macro totali (proteine/carboidrati/grassi/fibre)
dell'intera giornata.

Cosa è cambiato tecnicamente:
- `PlateContext.jsx`: ogni voce ora ha anche un campo `meal`
  (`colazione`/`pranzo`/`cena`/`snack`). Aggiunte le funzioni derivate
  `mealItems` (alimenti raggruppati per pasto) e `mealTotals` (totali per
  pasto). `totals` ora rappresenta il totale dell'INTERA giornata (somma di
  tutti i pasti) — usato dal nuovo riepilogo.
- I pulsanti target (300/400/500/600/700 kcal) e il suggerimento
  automatico ora si riferiscono al pasto attualmente selezionato, non più
  al totale generale (ha più senso: un target di 300 kcal è pensato per
  uno snack, non per l'intera giornata).
- `FoodPage.jsx` e `RecipePage.jsx` continuano a funzionare come prima
  (aggiungono di default al pasto "Pranzo") — se in futuro vuoi scegliere
  il pasto anche da lì, è una modifica separata che possiamo fare quando
  vuoi.

Nessun nuovo CSS in conflitto con Acqua/Quanto pesa (qui `FabbisognoIdricoPage.jsx`/`PorzioniPage.jsx`, non toccati). Build verificata senza errori.



Questo file zip era la base "attiva" più recente (con login/Supabase, i
corsi, ecc.), ma non conteneva ancora diverse aggiunte fatte in
conversazioni precedenti su un'altra copia del progetto. Reintegrato tutto
tranne gli strumenti Acqua e Quanto pesa (già presenti qui in una versione
propria: `FabbisognoIdricoPage.jsx` e `PorzioniPage.jsx`).

**Alimenti**: da 99 a 162.
- 27 verdure (sedano, aglio, porri, asparagi, bietole, cavoli vari, rucola,
  radicchio, carciofi, ecc.)
- 8 pesci/molluschi: sogliola, nasello, calamaro, polpo, cefalo, rombo,
  orata di mare, spigola di mare
- 5 formaggi/latticini: fiocchi di latte 0% e classici, Philadelphia
  Classico/Light/Protein
- 10 alimenti vari: riso soffiato Kellogg's, cornflakes di mais, muesli,
  patate dolci, funghi, hummus, popcorn, salmone affumicato, kefir,
  formaggio spalmabile light, più farina d'avena
- **12 nuovi tagli di carne**, per la richiesta di oggi: filetto di manzo,
  controfiletto di manzo, agnello, coniglio, pancetta, speck, salame,
  mortadella, prosciutto crudo sgrassato, petto d'anatra, cosciotto di
  pollo, hamburger di manzo magro

**Ricette**: da 29 a 71 (+42), comprese le ricette per ciascuno degli 8
pesci appena reintegrati (es. Sogliola al limone con patate dolci, Nasello
con funghi trifolati, Calamari con radicchio e orzo, Polpo con sedano rapa
e patate, Cefalo con finocchi e arancia, Rombo al forno con patate, Orata
al forno con patate e finocchi, Spigola al vapore con riso), oltre a 15
ricette colazione proteiche e 15 ricette pranzo/cena sotto i 15g di
grassi.

Verificato: nessun ID duplicato tra i 162 alimenti né tra le 71 ricette,
nessun `foodId` richiamato dalle ricette che non esista nel database. Build
completa del progetto (con Supabase/Stripe inclusi) verificata senza
errori — solo un avviso standard di Vite sulla dimensione del bundle, non
un errore, non legato a queste modifiche.



Aggiunto "2.1 Come si calcola il fabbisogno" al Modulo 2. Il contatore
"X di 12 video disponibili" si è aggiornato da solo a 4/12, sia su
`/corsi` che nella pagina del corso — nessuna modifica manuale necessaria
oltre ad aggiungere il video in `corsi.js`.

Ricorda: `salesOpen` resta `false` finché non decidete di riaprire le
vendite (vedi istruzioni più sotto in questo file).

Build verificata senza errori.

## Aggiornamento: descrizione estesa del corso

Aggiunta la descrizione lunga di "Da Zero al Tuo Piano" nella pagina del
corso (sotto il titolo, sopra il blocco valutazione/acquisto). Leggermente
snellita rispetto al testo originale per adattarla meglio alla lettura
web, senza toglierne il contenuto o il tono.

Per modificarla in futuro: `src/corsi.js` → campo `description` del
corso (è un elenco di paragrafi, uno per riga).

## Aggiornamento: badge Instagram in fondo al sito

Creato `src/components/Footer.jsx`, un componente condiviso con il
disclaimer nutrizionale + un badge che linka a
https://www.instagram.com/gustoscopio/ (si apre in una nuova scheda).

Sostituito il footer ripetuto (era copiato in 20 file diversi) con
questo unico componente in tutte le pagine del sito — se in futuro
serve cambiare il disclaimer o aggiungere altri link social, si modifica
in un solo posto: `src/components/Footer.jsx`.

Nessuna nuova dipendenza. Build verificata senza errori su tutte le pagine.

## Aggiornamento: acquisto disattivato finché il corso non è completo

Aggiunto `salesOpen: false` in `src/corsi.js`. Con questo valore:
- Su `/corsi` la card mostra "Prossimamente" invece del prezzo.
- Sulla pagina del corso, al posto del bottone "Acquista" compare un
  messaggio "In arrivo" con il conteggio video pronti.

TUTTO IL RESTO RESTA COLLEGATO E FUNZIONANTE (Stripe, webhook, Supabase)
— non li abbiamo toccati, sono solo "in pausa" per questo corso.

### Come riattivare le vendite quando il corso è completo

Apri `src/corsi.js` e cambia:
`salesOpen: false` → `salesOpen: true`
Nient'altro da fare: bottone "Acquista" e pagamento tornano visibili e
funzionanti immediatamente.

## Aggiornamento: indicatore "3 di 12 video disponibili"

Aggiunto un contatore automatico (in `/corsi` e nella pagina del corso)
che mostra quanti video sono disponibili rispetto al totale previsto
(`totalPlannedVideos` in `corsi.js`). Per ora dice "3 di 12" — si
aggiorna da solo appena aggiungi nuovi video a `corsi.js`, nessuna altra
modifica necessaria.

### Come aggiungere i prossimi video quando sono pronti

1. Carica il video su Bunny.net Stream (stessa Video Library, ID 745119)
   e prendi il suo Video ID.
2. Apri `src/corsi.js` e aggiungi il video dentro "Modulo 2" (o crea un
   "Modulo 3" se preferisci raggruppare diversamente), con lo stesso
   formato usato per i video di "Modulo 1":
   `{ id: 'VIDEO-ID-DI-BUNNY', title: '2.1 Titolo della lezione' }`
3. Se un modulo ha almeno un video, togli `comingSoon: true` da
   quel modulo.
4. Il prezzo del corso (29€) resta lo stesso: NON serve toccare Stripe
   finché il prezzo non cambia. Se in futuro vorrai cambiare il prezzo
   quando il corso è completo, quello sì richiede di aggiornarlo nel
   codice (il prezzo è passato dinamicamente a Stripe ad ogni acquisto,
   non serve un "prodotto" fisso da modificare lì).

## Novità: mini valutazione (BMI + metabolismo basale) prima dell'acquisto

- Rimosso il link separato "Scopri la tua valutazione dello stato
  nutrizionale" da `/corsi`.
- Nella pagina del corso, prima del bottone "Acquista", ora c'è un mini
  form (età, sesso, peso, altezza) con BMI e metabolismo basale calcolati
  al volo — fa parte della valutazione inclusa nel pacchetto.
- La pagina standalone `/valutazione` resta nel codice ma non è più
  linkata da nessuna parte (si può rimuovere del tutto in futuro se non
  serve più altrove).

Nessuna nuova dipendenza. Build verificata senza errori.

## Promemoria: sistemare il redirect email di Supabase

Se durante la conferma email compare un errore "impossibile raggiungere
il sito" che punta a localhost, vai su Supabase → Authentication → URL
Configuration e imposta Site URL su https://gustoscopio.vercel.app
(aggiungendo anche .../** tra i Redirect URLs). Non è un problema di
codice, solo di configurazione lato Supabase.

## Novità: pagamento Stripe collegato (passo 6, parte 1)

- `api/create-checkout-session.js`: funzione serverless (Vercel) che crea
  una sessione di pagamento Stripe per il corso scelto.
- `api/stripe-webhook.js`: funzione serverless che riceve la conferma di
  pagamento da Stripe e sblocca l'accesso scrivendo nella tabella
  `purchases` su Supabase (usando la service_role key, mai esposta nel
  browser).
- `/corsi/da-zero-al-tuo-piano` ora mostra davvero il blocco: se non sei
  loggato ti chiede di accedere, se sei loggato ma non hai comprato
  mostra il bottone "Acquista — 29€", se hai comprato mostra i video.
- `vercel.json` aggiornato per non intercettare le chiamate a `/api/*`.

IMPORTANTE — prima che funzioni online servono le variabili d'ambiente
su Vercel (Settings → Environment Variables):
- STRIPE_SECRET_KEY
- SUPABASE_SERVICE_ROLE_KEY

La variabile STRIPE_WEBHOOK_SECRET arriva nel prossimo passo (si ottiene
solo DOPO aver creato il webhook su Stripe, che a sua volta richiede che
il sito sia già online con questa funzione deployata — va fatto in
quest'ordine).

Nuova dipendenza: `stripe`. Build verificata senza errori.

## Novità: login reale collegato a Supabase (passo 5)

- `src/supabaseClient.js`: connessione al progetto Supabase reale
  (URL e chiave "anon" — sicura da avere nel codice, protetta dalle
  regole di sicurezza sul database, non richiede variabili d'ambiente
  su Vercel).
- `src/AuthContext.jsx`: gestisce sessione utente reale (login,
  registrazione, logout) e una funzione `hasPurchased(courseId)` già
  pronta per il prossimo passo (il blocco pagamento).
- `/accedi` ora registra/autentica per davvero: crea un utente vero su
  Supabase, che genera automaticamente anche una riga nella tabella
  `profiles`.
- `/corsi` mostra "Accedi" o "Esci (email)" a seconda che tu sia loggato
  o meno.

Importante: in questo passo il login FUNZIONA, ma non blocca ancora
niente — chiunque può comunque vedere il corso e i video su
`/corsi/da-zero-al-tuo-piano` senza aver pagato. Il blocco vero (via
Stripe + tabella `purchases`) arriva nel prossimo passo.

Nuova dipendenza: `@supabase/supabase-js`. Build verificata senza errori.

## Novità: primo corso collegato ai video reali (passo 4)

- `src/corsi.js`: dati del primo corso, "Da Zero al Tuo Piano" (29€),
  Modulo 1 con i primi 3 video reali collegati a Bunny Stream (Library
  ID 745119). Modulo 2 segnato come "in preparazione", nessun contenuto
  finto.
- `/corsi`: ora mostra la card del corso con prezzo.
- `/corsi/da-zero-al-tuo-piano`: pagina di dettaglio con player video
  (incorporato da Bunny Stream) e lista dei moduli/lezioni cliccabili.

⚠️ IMPORTANTE: in questo passo i video sono ancora VISIBILI A CHIUNQUE
ABBIA IL LINK della pagina corso — non è ancora collegato nessun
controllo di pagamento. Il blocco vero (Stripe + Supabase, link firmati
che scadono su Bunny) arriva nel prossimo passo. Fino ad allora, non
condividere pubblicamente il link di questa pagina.

Nessuna nuova dipendenza esterna nel codice (l'embed usa un iframe
diretto verso Bunny). Build verificata senza errori.

## Novità: pagina di valutazione dello stato nutrizionale (passo 3)

Nuova pagina `/valutazione`, raggiungibile da un link in `/corsi`. Chiede
età, sesso, peso, altezza, livello di attività (e clima) e mostra subito
4 stime automatiche: BMI, fabbisogno calorico, range proteico, fabbisogno
idrico — riusando le formule già centralizzate in `calculators.js`,
nessun calcolo duplicato.

Importante: le stime sono chiaramente etichettate come automatiche e
informative. La vera valutazione dello stato nutrizionale, quella che
giustifica la voce in fattura, resta quella scritta personalmente dopo
l'acquisto — questa pagina è il punto di raccolta dati e la prima stima,
non sostituisce quel lavoro professionale.

In questo passo il pulsante "Continua all'acquisto del corso" non fa
ancora nulla di reale (nessun collegamento a Stripe/Supabase): serve solo
per testare che il form e i calcoli funzionino bene online. Anche la
pagina Corsi ora ha la barra di navigazione, che mancava.

Nessuna nuova dipendenza esterna. Build verificata senza errori.

## Novità: fix — "Costruisci il piatto" da Strumenti ora atterra sulla sezione giusta

Il link "Costruisci il piatto" nell'hub `/strumenti` porta a `/#plate-builder`
sulla home. Lo scroll verso quella sezione in realtà funzionava già, ma per
due motivi sembrava "sbagliato":

1. La nav in alto è `sticky` e copriva il titolo della sezione appena
   raggiunta — sembrava di essere atterrati nel punto sbagliato. Aggiunto
   `scroll-margin-top` su `.plate-section` così il browser lascia lo spazio
   giusto sotto la nav quando scorre fino a quell'ancora.
2. Lo scroll partiva a volte prima che la nuova pagina fosse del tutto
   assestata (font, layout), sbagliando di qualche decina di pixel.
   `ScrollToTop.jsx` ora aspetta un istante prima di calcolare la
   posizione.

Nessuna nuova dipendenza. Build verificata (`npm install` + `npm run
build`) senza errori.

## Novità: fix scroll — le pagine ora si aprono sempre dall'alto

Bug: navigando tra le pagine (es. da `/strumenti` a `/strumenti/bmi`), la
pagina si apriva mantenendo la posizione di scroll di quella precedente
invece di partire dall'inizio. È un comportamento tipico delle SPA con
`react-router-dom`: il router cambia il contenuto ma non tocca lo scroll
del browser.

Aggiunto `src/components/ScrollToTop.jsx`, montato dentro `<BrowserRouter>`
in `App.jsx`: ad ogni cambio di rotta forza lo scroll in cima. Gestisce
anche i link con ancora (es. "/#plate-builder" da Strumenti verso il Plate
Builder in home), scorrendo fino a quell'elemento invece che in cima.

Nessuna nuova dipendenza. Build verificata (`npm install` + `npm run
build`) senza errori.

## Novità: revisione mobile completa (Plate Builder e non solo)

Nota importante: in questo ambiente non è stato possibile scaricare un
browser headless per fare uno screenshot reale a 375px (rete bloccata per
il download di Chromium). La revisione è stata fatta leggendo il CSS e
facendo i calcoli aritmetici delle larghezze a 320px/375px, come indicato
nella regola del progetto. **Consigliamo comunque un test visivo reale su
telefono/DevTools prima di considerare il lavoro chiuso al 100%.**

Cosa è cambiato:

- **Plate Builder** (`#plate-builder` in Home): era il problema segnalato
  ("il piatto risulta troppo grande"). Il numero grande delle kcal totali
  passava da 56px fisso (40px solo sotto i 480px) a `clamp(30px, 9vw,
  56px)` — ora scala in modo fluido con la larghezza reale dello schermo
  invece di avere due soli "scalini". Stessa logica su padding e margini
  della sezione nera (`clamp()` invece di valori fissi), gap tra le due
  colonne, dimensione dei box macro, input dello stepper (ridotto da 44px
  a 38px per lasciare più spazio al testo del nome alimento).
- Stessa tecnica del `clamp()` applicata a: numero risultato di TUTTI i
  calcolatori in `/strumenti` (`.calc-result-big`), punteggio finale di
  Mito o Verità, numero grande nella card "Cosa include" di Percorsi
  Personalizzati, titolo dell'hero in home, titoli di sezione.
- Padding ridotto su mobile per: hero, sezioni generiche (`.section`),
  teaser "Percorsi personalizzati", modale di prenotazione.
- Corretti due bug latenti di overflow orizzontale (la stessa causa già
  documentata nelle istruzioni di progetto — contenitori flex senza
  `min-width: 0`): riga alimento in `/alimenti` (`.alimenti-row-info`) e
  riga quantità in Food Battle su schermi sotto i 380px.

Nessuna nuova dipendenza. Build verificata (`npm install` + `npm run
build`) senza errori.

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
