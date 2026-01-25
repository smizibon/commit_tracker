# Source Context (AI-lean)

## Routing & Entry
`src/main.jsx` renders `AppRouter` from `src/router.jsx`.
Routes: `/` → `Hub`; `/projects/commit-converter` → `CommitConverterApp`.
`src/App.jsx` re-exports `CommitConverterApp` for compatibility.

## Hub
`src/app/hub/Hub.jsx` + `Hub.css`; lists `projects` registry; project links have `data-testid="project-link-<id>"`.

## Commit Converter App
File: `src/app/projects/commit-converter/CommitConverterApp.jsx` (+ `App.css`).
State: csvInput, commitOutput, messageOutput, rowsData, baseUrl, error, commitCopied, messageCopied, snippetCopied, snippetCopied50.
Handlers: processCSV (parseCsvRows + baseUrl), handleFileUpload, copyCommitColumn, copyMessageColumn, copyToClipboard (TSV both), loadSampleData, clearAll, copyGitSnippet, copyGitSnippet50, handleBaseUrlChange.
UI: file upload, git log snippets (all/50), base URL input, CSV textarea, dual outputs with copy buttons. All interactive elements have `data-testid`.

## Shared Utils
`src/shared/utils/parseCsvToTsv.js`: normalize smart quotes; papaparse with fallback; sanitizeRows → commit cell HYPERLINK(baseUrl or parsed URL, short hash 7 chars) + message; exports parseCsvRows/parseCsvToTsv.
`src/shared/utils/errorHandler.js`: createSafeAsync wraps async, routes errors to setter.

## Components
`src/shared/components/ErrorDisplay.jsx`: error banner used in app.

## Styles
Commit converter `App.css`: gradient header, grid layout, button variants, file upload, code-snippet blocks, dual-output cards, responsive single column <~900px.
Hub `Hub.css`: card grid, hero, footer text.
