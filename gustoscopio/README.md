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
