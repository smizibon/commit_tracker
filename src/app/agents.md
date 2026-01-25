# App Layer Context (v2.0)

## Overview
The `app/` folder contains **project-specific logic and routing structure**. Each project lives in `projects/<projectName>/`.

## 🎯 Before Reading: Redirects
## Structure
app/
  hub/                           ← Landing page & project registry
    Hub.jsx, Hub.css
  projects/
    projects.js                  ← Project metadata array
    commit-converter/            ← Project 1: commit hash converter
      CommitConverterApp.jsx
      App.css
```

---

## Hub (Landing Page)

**File**: `src/app/hub/Hub.jsx` + `Hub.css`

**Purpose**: Lists all available projects; users select which tool to use.

**Logic**:
- Imports `projects` array from `src/app/projects/projects.js`
- Maps over array, renders clickable project cards
- Each card links to `/projects/{projectId}`

**Testids**:
- `project-link-{projectId}` - for each project link (enables testing navigation)

**Styling**: Card grid, hero header, footer text (see Hub.css for layout)

---

## Projects Registry

**File**: `src/app/projects/projects.js`

**Structure**:
```javascript
export const projects = [
  {
    id: 'commit-converter',
    name: 'Commit Converter',
    description: 'CSV of commits → Excel-ready hyperlinked columns',
    path: '/projects/commit-converter',
    component: CommitConverterApp
  },
  // ... more projects
];
```

**Rule**: Every new project must be registered here to appear in Hub.

---

## Project Structure Pattern

Each project folder (`commit-converter/`, etc.) should follow:
```
projects/{projectName}/
  {ProjectName}App.jsx      ← Main component (hooks, state management)
  App.css                   ← Project-specific styles
  agents.md                 ← (Optional) Project-level context if complex
```

### State Management Pattern
- Use `useState()` for local state (no Redux needed for small projects)
- All async ops wrapped with `createSafeAsync(setError)`
- Error state → ErrorDisplay component
- Copied feedback → boolean flags (commitCopied, messageCopied, etc.)

### Required Testids
- Inputs: `{featureName}-input`, `{featureName}-textarea`, `file-input`
- Buttons: `{action}-{feature}-button` (e.g., `copy-commit-button`, `load-sample-button`)
- Outputs: `{feature}-output`, `error-display`
- Read-only regions: Use `aria-label` if needed

---

## Ground Rules
- **Use shared utils**: Import from `src/shared/utils/` & `src/shared/components/`
- **No duplicate logic**: If you need a util, check shared/ first
- **Error handling**: Always show errors via ErrorDisplay; never console.error to users
- **Data flow**: Map state → JSX explicitly; use data-testid on key outputs
- **CSS scope**: Use CSS classes prefixed with project name (e.g., `.commit-converter-header`)
- **Doc sync**: When code becomes stable, update agents.md files (root + leaf) in decision tree → keeps AI context navigation fast

## Last Updated
2026-01-25 | React 19.2.0
