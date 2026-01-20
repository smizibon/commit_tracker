# CSV to Excel Converter - Project Context

## ⚖️ LLM Ground Rules (STRICT)
- Reuse first: check `src/utils/`, `src/components/` before new code.
- Generic logic: avoid hardcoded magic values.
- Error safety: wrap async with `createSafeAsync`; show UI errors with `ErrorDisplay`.
- Testable UI: every interactive element needs a `data-testid` (kebab-case).
- Doc discipline: update context files after stable code.
- Token-thrifty docs: keep `context.md` concise for AI editors (retain details, minimal fluff).

## Project Overview
React/Vite app: CSV of commit hash/message → Excel-ready columns (hyperlink + message).

## Tech
React 18 + Vite; papaparse; browser FileReader/clipboard.

## Data Flow
Input CSV rows → parseCsvRows → commit column (HYPERLINK with short hash display) + message column → copy buttons.

## Structure (key files)
`src/App.jsx` main UI (inputs, dual outputs, copy buttons, git-log snippets, base URL field)
`src/App.css` styling
`src/components/ErrorDisplay.jsx` error banner
`src/utils/parseCsvToTsv.js` CSV parsing + hyperlink formatting
`src/utils/errorHandler.js` async wrapper
`context.md`, `src/context.md`

## Features
- Paste or upload CSV (.csv/.txt)
- Normalize smart quotes; papaparse with fallback
- Hyperlink commit column using base URL + short hash (7 chars); message column
- Copy buttons: commit-only, message-only, both (TSV)
- Git log command snippets (all commits, last 50) with copy buttons
- Error display; testids everywhere

## Status
Main branch active; last build/pass: 2026-01-20
