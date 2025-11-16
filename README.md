<div align="center">
<h1>Trello Boards Dashboard</h1>
<p><strong>Una mini dashboard per esplorare i tuoi board Trello</strong> in diverse viste (Board, Tabella, Dashboard) con filtri, conversioni di tempo e componenti UI reattivi.</p>
</div>

## 🧩 Descrizione

Questa applicazione Next.js fornisce una panoramica rapida e personalizzabile dei tuoi board Trello. Dopo aver configurato la tua API key e il token, puoi:

- Visualizzare i board personali
- Ispezionare liste e card di ciascun board
- Analizzare membri e assegnazioni
- Ottenere una vista tabellare aggregata (utile per filtrare e ricercare)
- Usare componenti UI (Accordion, Badge, Switch, Select, Tooltip) per un'esperienza fluida
- Salvare preferenze locali (es. filtri o impostazioni) via `localStorage`

## ✨ Funzionalità Principali

- Recupero dati real-time da Trello via REST API (axios)
- Gestione di board, liste, card e membri (`trello.service.ts` + tipi in `trello.model.ts`)
- Viste multiple: `BoardView`, `TableView`, `DashboardPage`
- Tabella reattiva con `@tanstack/react-table`
- Conversione tempo / utilità varie (`TimeConverter.tsx`, `utils/`)
- Persistenza preferenze utente (`useLocalStorage` hook)
- Componenti UI personalizzati e styling con Tailwind CSS + Radix UI

## 🏗️ Architettura & Struttura Cartelle

```
app/              # Routing Next.js (App Router), layout globale e pagina iniziale
components/       # Componenti riutilizzabili e viste principali
	pages/          # BoardView, DashboardPage, TableView
	ui/             # Wrapper Radix (select, switch, tooltip)
hooks/            # Hooks custom (es. useLocalStorage, useIsClient)
services/         # Chiamate alle API Trello (axios + env vars)
models/           # Tipi/Interfacce TypeScript per oggetti Trello
lib/              # Utils generici
utils/            # Utility di formattazione (es. colori)
public/           # Assets statici
tailwind.config.ts# Configurazione Tailwind
```

## 🔑 Variabili d'Ambiente

Per funzionare l'app richiede una API key e un token Trello.
Creare un file `.env.local` nella root con:

```
TRELLO_API=la_tua_api_key
TRELLO_TOKEN=il_tuo_token
```

Se mancanti, il service lancia un errore (`trello.service.ts`). Puoi ottenere queste credenziali da: https://trello.com/power-ups/admin (sezione API) o dalla documentazione ufficiale.

## 🚀 Setup & Avvio

Installazione dipendenze (consigliato pnpm):

```bash
pnpm install
```

Avvio sviluppo (usa la porta 3003 configurata in `package.json`):

```bash
pnpm dev
```

Apri: http://localhost:3003

Build di produzione:

```bash
pnpm build
pnpm start
```

Linting:

```bash
pnpm lint
```

## 🧪 Tecnologie Utilizzate

- Next.js 16 (App Router)
- React 19
- TypeScript 5
- Tailwind CSS + tailwindcss-animate
- Radix UI (Select, Switch, Tooltip)
- TanStack React Table
- Axios (HTTP client)
- Lucide React (Icone)

## 📦 Tipi & Service

- Tipi definiti in `models/trello.model.ts` (Board, Card, List, Member, ecc.)
- Funzioni di fetch in `services/trello.service.ts`:
  - `getPersonalData()`
  - `getBoards()`
  - `getBoardLists(boardId)`
  - `getBoardCards(boardId)`
  - `getBoardMembers(boardId)`

## 🗂 Viste Principali

- `DashboardPage`: panoramica sintetica
- `BoardView`: dettaglio board con liste e card
- `TableView`: rappresentazione tabellare aggregata (ricerca / filtro)

## 💾 Stato & Persistenza

- Preferenze utente e impostazioni leggere salvate via hook `useLocalStorage`
- Gestione condizionale rendering client/server via `useIsClient`

## 🛡️ Sicurezza & Limiti

- Le chiavi Trello sono locali e non vengono committate (usare `.env.local`)
- Nessun caching avanzato lato server al momento
- Le chiamate sono client-side: per ambienti enterprise valutare un proxy server sicuro

## 🔮 Possibili Evoluzioni

- Filtri avanzati per membri / liste
- Esportazione CSV / XLSX della vista tabellare
- Caching / ISR per board statici
- Grafici (analytics su carico card per lista / membro)
- Autenticazione multi-utente

## 🛠 Troubleshooting

| Problema                  | Possibile Causa                    | Soluzione                             |
| ------------------------- | ---------------------------------- | ------------------------------------- |
| Errore Missing TRELLO_API | Variabile non impostata            | Aggiungi `TRELLO_API` in `.env.local` |
| Board vuoti               | Nessun board associato all'account | Verifica nell'account Trello          |
| Porte errate              | Browser su 3000                    | Usa http://localhost:3003             |

## 📄 Licenza

Uso interno. Adatta liberamente alle tue necessità. Nessuna licenza pubblica definita.

## 🤝 Contributi

Pull request interne benvenute. Mantieni coerenza con stile esistente (Tailwind + componenti UI modulari).

---

Se hai bisogno di estendere la dashboard (nuove viste, grafici, integrazioni) apri una issue interna con una breve descrizione e lo use-case.
