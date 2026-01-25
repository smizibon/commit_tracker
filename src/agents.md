# Source Context (AI-lean, v2.0)

## 🎯 Decision Tree: Which Leaf File?

**Your task → Read this file:**

| I need to... | Go to | Reason |
|--------------|-------|--------|
| Fix error handling or async wrapping | `src/shared/agents.md` | createSafeAsync pattern |
| Debug CSV parsing or quote issues | `src/shared/agents.md` | normalizeQuotes, parseCsvRows |
| Add a new project | `src/app/agents.md` | projects registry, folder pattern |
| Modify CommitConverterApp | `src/app/projects/commit-converter/agents.md` | State map + all handlers |
| Fix copy button or file upload | `src/app/projects/commit-converter/agents.md` | copy* handlers, handleFileUpload |
| Understand routing | **This file** | main.jsx, router.jsx details below |
| Start from scratch? | `agents.md` (root) | Overview + ground rules |

---

## Entry Points

### `main.jsx`
Mounts React with `AppRouter` from `router.jsx`.

### `router.jsx`
BrowserRouter with routes:
- `/` → Hub (landing page)
- `/projects/commit-converter` → CommitConverterApp
- `src/App.jsx` re-exports CommitConverterApp (legacy compatibility)

---

## Folder Context (See Detailed agents.md in Each)

### `src/shared/` → `agents.md`
All reusable utilities & components (single source of truth):
- `components/ErrorDisplay.jsx` - error banner
- `utils/parseCsvToTsv.js` - CSV parsing + hyperlink formatting
- `utils/errorHandler.js` - async error wrapping (createSafeAsync)

### `src/app/` → `agents.md`
Project-specific logic & structure:
- `hub/Hub.jsx` - landing page (project list)
- `projects/projects.js` - project registry
- `projects/commit-converter/` - main project

### `src/app/projects/commit-converter/` → `agents.md`
Detailed state management, handlers, UI layout, testid conventions.

---

## Known Duplicates (TO CONSOLIDATE)
⚠️ `src/utils/` exists with duplicate files:
- `src/utils/parseCsvToTsv.js` (DELETE - use `src/shared/utils/parseCsvToTsv.js`)
- `src/utils/errorHandler.js` (DELETE - use `src/shared/utils/errorHandler.js`)

**Action**: Remove `src/utils/` folder entirely; update all imports to use `src/shared/utils/`.

## Documentation Update Rule
**When code stabilizes**: Update root + leaf agents.md files to keep decision tree current. This ensures AI editors find context fast without reading stale docs.

---

## Last Updated
2026-01-25 | React 19.2.0 | Context window optimized
