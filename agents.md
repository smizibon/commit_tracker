# QA Workflow - Project Context (v2.0)

## ⚖️ LLM Ground Rules (STRICT + ENHANCED)

### Code Reuse & Structure
- **Primary rule**: Check `src/shared/utils/` **first** before new code (consolidate duplicates from `src/utils/`)
- **Utils ownership**: All shared logic lives in `src/shared/utils/`; project-specific logic in `src/app/projects/<name>/`
- **Avoid duplicates**: If utility exists in both locations, refactor to single source in `src/shared/`
- **Generic logic**: Avoid hardcoded magic values; use constants or function parameters

### UI & Testing Standards
- **Testable UI**: Every interactive element needs `data-testid` (kebab-case, namespaced: `<action>-<feature>-<element>`)
  - Examples: `copy-commit-button`, `load-sample-button`, `base-url-input`, `csv-textarea`, `error-display`
- **Data flow clarity**: Map component state → output explicitly in JSX (use `data-testid` on outputs too)
- **Accessibility**: Use semantic HTML (`<section>`, `<article>`); include `aria-label` for non-obvious regions

### Design System & Theme Support
- **Glassmorphism**: All UI elements use frosted glass effect (backdrop-filter blur + semi-transparent backgrounds)
  - Pattern: `background: rgba(255,255,255,0.1)` (light mode) or `rgba(0,0,0,0.1)` (dark mode) + `backdrop-filter: blur(10px)`
  - Borders: `border: 1px solid rgba(255,255,255,0.2)` or `rgba(0,0,0,0.2)` with rounded corners
  - No flat colors or solid backgrounds on cards/modals
- **Dark/Light Mode**: Support both themes via CSS variables or Tailwind theme config
  - Light mode: Light backgrounds (near white), dark text, glassmorphism with light overlays
  - Dark mode: Dark backgrounds (near black), light text, glassmorphism with dark overlays
  - Use `prefers-color-scheme` media query as fallback; allow manual toggle if needed
- **Consistency**: All new components must follow glassmorphism + dual-theme from day one
  - Test both modes before commit
  - Use theme-aware colors (CSS variables, Tailwind colors: `dark:` prefix)
  - No hardcoded colors (e.g., `#FFFFFF`, `#000000`) — use semantic tokens

### Async & Error Handling
- **Async pattern**: Wrap all clipboard/file ops with `createSafeAsync(setError)`
- **Error display**: Route errors to `<ErrorDisplay message={error} />` banner
- **Error messages**: User-friendly, specific (not generic "error occurred")
- **Recovery UX**: Provide "Clear All" / "Load Sample" to unblock users

### Documentation & Context Windows
- **Context efficiency**: Keep `agents.md` **<150 lines**; link to TESTING.md, PROJECT_SUMMARY.md for details
- **Inline comments**: Only for complex logic (e.g., regex patterns, quote normalization edge cases)
- **Version tracking**: Update timestamp & React/dependency versions quarterly
- **State diagrams**: Document state transitions for multi-step workflows
- **Sync on stable code**: When code becomes stable, update all affected agents.md files (root + leaf) to reflect changes in decision tree → keeps AI context navigation fast & accurate

## Project Overview
React 19 + Vite app: CSV of commit hash/message → Excel-ready columns (HYPERLINK formula + message).
**Core use case**: Paste/upload commit data → Generate Excel-compatible TSV with hyperlinked commits.

## Tech Stack (Current)
- **React**: 19.2.0 (hooks-first, no class components)
- **Build**: Vite
- **Router**: React Router v6 (BrowserRouter)
- **Parsing**: papaparse 5.5.3 (with manual fallback)
- **I/O**: Browser FileReader / Clipboard API

## Data Flow (One-line)
CSV input → normalizeQuotes + Papa.parse → formatCommitCell (HYPERLINK + 7-char short hash) + message → dual columns → clipboard → Excel

## File Structure (Simplified)
```
src/
  shared/                    → See src/shared/agents.md
    components/, utils/
  app/                       → See src/app/agents.md
    hub/, projects/
  router.jsx, main.jsx
```

## AI Editor Navigation Table

| What do you need? | Go to file | Section |
|-------------------|-----------|---------|
| Error handling pattern | `src/shared/agents.md` | errorHandler.js |
| CSV parsing, quote normalization, hyperlinks | `src/shared/agents.md` | parseCsvToTsv.js |
| Adding new project or modifying routing | `src/app/agents.md` | Projects Registry |
| CommitConverterApp state, handlers, or UI | `src/app/projects/commit-converter/agents.md` | Component State |
| Overview, tech stack, ground rules | **This file** | Ground Rules section |
| CSS/Theme design | `src/app/projects/commit-converter/agents.md` | Design system reference |
| Dark/light mode toggle or styling | `src/app/agents.md` | Theme configuration (if global) |
| Glassmorphism component patterns | **This file** | Design System & Theme Support section |

## Detailed Context by Layer
- **Root level** (this file): Ground rules, tech stack, navigation table above
- **`src/agents.md`**: Entry points (main.jsx, router.jsx) + leaf routing
- **`src/shared/agents.md`**: Utilities (errorHandler, parseCsvToTsv) + ErrorDisplay
- **`src/app/agents.md`**: Hub.jsx, projects registry, project folder pattern
- **`src/app/projects/commit-converter/agents.md`**: Component state, all handlers, UI layout, testids

## Critical Features (TL;DR)
✅ Dual-column output (commit hyperlinks + messages)
✅ Three copy modes (commit-only, message-only, both as TSV)
✅ Git log snippets with copy buttons
✅ Smart quote normalization & fallback CSV parsing
✅ Dynamic base URL override (Bitbucket → any git platform)
✅ All elements testable with data-testid kebab-case

## Status
Main branch active; last updated: 2026-01-25 | React 19.2.0
