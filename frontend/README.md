# 🌍 Global Directory

A responsive web application that lets you explore detailed information for **250+ countries** around the world. Search by name, capital, currency, language or several other attributes, or simply browse by region from an interactive card grid.
Built with **React 18**, **Vite**, **Material‑UI (MUI) 5**, and the free **REST Countries v3.1 API**.

---

## Key Features

| Feature                      | Details                                                                                                            |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| **Home page quick search**   | Autocomplete search bar plus one‑click region filters.                                                             |
| **Advanced Search tab**      | Find countries by **capital city**, **currency**, **language**, **time‑zone**, **calling code**, or **UN region**. |
| **Rich country cards**       | Flag, name, capital and region in a clean, responsive grid.                                                        |
| **Accessible design**        | Dark‑mode aware colours, keyboard navigation, and WAI‑ARIA labels.                                                 |
| **Unit & integration tests** | \~90 % coverage using **Jest** + **React Testing Library**.                                                        |
| **Instant dev reload**       | Powered by Vite’s lightning‑fast HMR.                                                                              |

---

## 🚀 Getting Started

### Prerequisites

* **Node.js ≥ 18** (tested on 18 LTS and 20 LTS)
* **npm ≥ 9** (comes with Node)
  *Optional*: `pnpm` or `yarn` work too; adjust commands accordingly.

### Installation

```bash
# 1. Clone the repo
$ git clone https://github.com/your‑username/global‑directory.git
$ cd global‑directory

# 2. Install dependencies
$ npm install
```

### Running the app in development mode

```bash
$ npm start      # alias for vite --open
```

Open [http://localhost:5173](http://localhost:5173) and the app will automatically reload on file changes.

### Running the test suite

```bash
$ npm test       # runs Jest in watch mode
```

A complete coverage report is generated in `/coverage` when the watcher terminates (`q`).

### Building for production

```bash
$ npm run build  # vite build
```

The optimised static bundle is output to `dist/`. Serve it with any static host or CI/CD pipeline – e.g. **GitHub Pages**, **Netlify**, or **Vercel**.

---

## 🔌 API Reference

All data is fetched on‑demand from **[REST Countries v3.1](https://restcountries.com/)** (no key or auth required):

| Use case                   | Endpoint                      | Example                              |
| -------------------------- | ----------------------------- | ------------------------------------ |
| **All countries**          | `GET /v3.1/all`               | `https://restcountries.com/v3.1/all` |
| By **capital**             | `GET /v3.1/capital/{capital}` | `/capital/Paris`                     |
| By **currency**            | `GET /v3.1/currency/{code}`   | `/currency/eur`                      |
| By **language**            | `GET /v3.1/lang/{code}`       | `/lang/fr`                           |
| By **name** | `GET /v3.1/name/{name}`       | `/name/canada`                       |

 

## 🧪 Testing Strategy

* **Unit tests** verify pure util functions and component logic.
* **Integration tests** mount pages with React Testing Library and mock network requests via `msw`.
* **CI** – GitHub Actions matrix on Node 18 & 20 runs `npm test` and publishes the coverage badge.

 
---

## 🛠️ Troubleshooting & Common Issues

### Material‑UI peer‑dependency version mismatch

```
npm ERR! Could not resolve dependency:
peer react@"^17.0.0 || ^18.0.0" from @mui/icons-material@5.15.19
```

**Solution**: lock both `@mui/material` and `@mui/icons-material` at the **same minor version** and ensure React ≥ 18. A working excerpt from `package.json`:

```json
"@mui/material": "5.15.19",
"@mui/icons-material": "5.15.19",
"@emotion/react": "^11.11.1",
"@emotion/styled": "^11.11.0"
```

Then reinstall:

```bash
rm -rf node_modules package‑lock.json
npm install
```

### CORS pre‑flight failures in older browsers

REST Countries sends proper CORS headers; however, Safari 13 occasionally caches 301 redirects. Hard‑reload or disable the cache while dev‑testing.

 

