# 🎤 ITRap2026

Classifiche rap italiana 2026 — uso personale.

---

## 📁 Struttura progetto

```
src/
├── app/
│   ├── models/
│   │   └── album.model.ts          # interfaccia Album + dizionario mesi
│   ├── services/
│   │   └── albums.service.ts       # carica e filtra il JSON
│   ├── components/
│   │   ├── podio/                  # podio top 3
│   │   └── lista/                  # lista dal 4° in poi
│   ├── app.component.*             # pagina principale
│   └── app.config.ts               # providers Angular
├── assets/
│   ├── albums.json                 # ← qui aggiungi i tuoi album
│   └── covers/                     # ← qui metti le copertine
└── styles.scss                     # font globali
```

---

## ▶️ Avvio in sviluppo

```bash
ng serve
```

Poi apri `http://localhost:4200`

---

## 📝 Come aggiungere un album

Apri `src/assets/albums.json` e aggiungi un oggetto all'array:

```json
{
  "artista": "Nome Artista",
  "titolo": "Titolo Album",
  "mese": 5,
  "voto": 8.3,
  "copertina": "assets/covers/nomeartista-album.jpg",
  "nascosto": false,
  "tracce": 13
}
```

### Campi:
| Campo | Tipo | Descrizione |
|-------|------|-------------|
| `artista` | string | Nome dell'artista |
| `titolo` | string | Titolo dell'album |
| `mese` | number | Mese di uscita (1–12) |
| `voto` | number | Voto da 0 a 10 (decimali ok) |
| `copertina` | string | Percorso immagine relativo a `src/` |
| `nascosto` | boolean | `true` = escluso dalle classifiche |
| `tracce` | number | Numero di tracce |

### Copertine:
- Metti i file immagine in `src/assets/covers/`
- Usa jpg o png, dimensione consigliata: **500×500 px**
- Se un'immagine manca, appare un placeholder automatico

---

## 🚀 Deploy su GitHub Pages

### 1. Installa il tool di deploy (una volta sola)
```bash
ng add angular-cli-ghpages
```

### 2. Modifica `angular.json`
Verifica che nel blocco `deploy` ci sia il tuo repo:
```json
"deploy": {
  "builder": "angular-cli-ghpages:deploy",
  "options": {
    "baseHref": "/NOME-REPO/"
  }
}
```
Sostituisci `NOME-REPO` con il nome del tuo repository GitHub.

### 3. Deploy
```bash
ng deploy
```

Il comando fa automaticamente build + push sul branch `gh-pages`.

### 4. Abilita GitHub Pages
Nel tuo repo su GitHub:
- **Settings → Pages → Source → Deploy from branch → `gh-pages`**

Dopo qualche minuto il sito sarà online su:
`https://TUO-USERNAME.github.io/NOME-REPO/`

---

## 🔄 Aggiornare il sito dopo modifiche al JSON

```bash
ng deploy
```

Basta questo. Non serve fare altro.

---

## 🎨 Personalizzazioni rapide

### Cambiare colore accent (neon verde → altro)
In `src/app/app.component.scss`:
```scss
--color-accent: #00ff87;   // ← cambia questo hex
--accent-rgb: 0, 255, 135; // ← stessi valori in RGB separati da virgola
```

### Cambiare nome sito
In `src/app/app.component.html` modifica il blocco `.logo`.

---

## ⚠️ Note

- Il campo `nascosto: true` nasconde l'album da tutte le classifiche (annuale e mensile) senza cancellarlo dal JSON — utile per album che non vuoi considerare
- Gli album vengono ordinati per voto decrescente in automatico
- I mesi appaiono nel selettore solo se hanno almeno un album non nascosto