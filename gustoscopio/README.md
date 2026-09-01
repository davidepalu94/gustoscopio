# Gustoscopio — come mettere il sito online

Questo è un progetto React (Vite). Puoi metterlo online gratis in circa 15 minuti,
senza terminale, seguendo i passi qui sotto.

## 1. Crea un account GitHub
Vai su https://github.com/signup e crea un account gratuito.

## 2. Crea un nuovo repository
- Clicca "New repository"
- Nome: `gustoscopio`
- Lascialo "Public" o "Private", scegli tu
- Clicca "Create repository"

## 3. Carica i file
- Nella pagina del repository appena creato, clicca "uploading an existing file"
- Trascina dentro TUTTA questa cartella (tranne `node_modules` e `dist`, se presenti)
- Clicca "Commit changes"

## 4. Crea un account Vercel
Vai su https://vercel.com/signup e registrati con lo stesso account GitHub
(pulsante "Continue with GitHub").

## 5. Importa il progetto
- Su Vercel clicca "Add New" → "Project"
- Seleziona il repository `gustoscopio`
- Vercel riconosce automaticamente che è un progetto Vite: non devi cambiare nulla
- Clicca "Deploy"

Dopo circa un minuto il sito è online con un indirizzo tipo:
`https://gustoscopio.vercel.app`

## 6. (Opzionale) Dominio personalizzato
- Compra un dominio (es. gustoscopio.it) su un registrar qualsiasi (es. Namecheap, Register.it)
- Su Vercel vai su Project → Settings → Domains → aggiungi il dominio
- Segui le istruzioni per puntare il DNS (Vercel te le mostra passo passo)

## Aggiornare il sito in futuro
Ogni volta che vuoi cambiare qualcosa nel sito:
1. Modifica il file `src/App.jsx`
2. Carica di nuovo il file su GitHub (sostituendo quello vecchio)
3. Vercel pubblica automaticamente la nuova versione in circa un minuto

Nessun comando da digitare, nessun server da gestire.
