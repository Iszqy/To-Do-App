# Electron + React To-Do App

A simple desktop To-Do list app built with React and Electron.js.
This project is meant as a **learning reference** for converting React web apps into desktop apps.

---

## 📁 Project Structure

```
electron-todo-app/
├── public/
│   ├── electron.js      ← Electron MAIN PROCESS (desktop window logic)
│   └── index.html       ← HTML entry point for React
├── src/
│   ├── index.js         ← React entry point
│   ├── App.js           ← Main To-Do component
│   ├── App.css          ← Styles
│   └── index.css        ← Global styles
├── package.json         ← Scripts + dependencies + electron-builder config
└── README.md
```

### Key concept: Two processes in Electron
| Process | File | Role |
|---|---|---|
| **Main process** | `public/electron.js` | Creates the desktop window (like a browser) |
| **Renderer process** | `src/` (your React app) | Runs inside that window (like a webpage) |

---

## 🚀 Setup & Running

### 1. Install dependencies
```bash
npm install
```
> ⚠️ This will download Electron (~100MB including Chromium). It may take a few minutes on first install. This is normal.

### 2. Run in development mode (RECOMMENDED for learning)
```bash
npm run electron-dev
```
This starts:
- The React dev server on `localhost:3000`
- Electron loading from that dev server

You'll see live updates when you edit React files (hot reload works!).

### 3. Build the React app (for production)
```bash
npm run build
```
This compiles React into a `build/` folder.

### 4. Run Electron with the built app
```bash
npm run electron
```

### 5. Package into a distributable (optional)
```bash
npm run package
```
> Uses `--dir` flag which is much faster — outputs files instead of creating an installer.
> Find the output in the `dist/` folder.

---

## ⚡ Why Was My Colleague's Build So Slow? (Common Mistakes)

### Mistake 1: Bundling `node_modules`
The `electron-builder` config in `package.json` uses the `files` field:
```json
"files": [
  "build/**/*",
  "public/electron.js"
]
```
This tells electron-builder to **only include** the compiled React build and the Electron main file — NOT the entire `node_modules` folder. This keeps the output small and fast.

### Mistake 2: Targeting installer format during development
This `package.json` uses `"target": "dir"` which skips creating a `.exe`/`.dmg` installer and just outputs raw files. Much faster for testing.

### Mistake 3: Not building React first
Always run `npm run build` before `npm run electron` or `npm run package`. If you skip this, Electron won't find the `build/` folder.

### Mistake 4: Running the dev server + packager at the same time
Use `electron-dev` for development (live reload) and `package` only when you want a final distributable.

---

## 🔧 How the Main Process Works (`public/electron.js`)

```js
const startUrl =
  process.env.ELECTRON_START_URL ||           // Dev: use localhost:3000
  url.format({
    pathname: path.join(__dirname, '../build/index.html'),  // Prod: use build folder
    ...
  });

mainWindow.loadURL(startUrl);
```

In **development**, `electron-dev` sets `ELECTRON_START_URL=http://localhost:3000`.
In **production** (after build), it loads from the `build/` folder.

---

## 📦 Dependencies Explained

| Package | Why it's needed |
|---|---|
| `electron` | The desktop runtime |
| `electron-builder` | Packages the app into a distributable |
| `concurrently` | Runs React dev server and Electron at the same time |
| `wait-on` | Waits for React dev server to be ready before launching Electron |
| `react-scripts` | Standard Create React App build tooling |
