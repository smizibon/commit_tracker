# CSV to Excel Converter - Project Context

## ⚖️ LLM Ground Rules (STRICT)
- **Reusable-First**: Scan `src/utils/` and `src/components/` before writing code.
- **Generic Logic**: Parametrize functions; avoid hardcoded magic values.
- **Error Safety**: Wrap async in `ErrorHandler`; use `ErrorDisplay` for UI. No crashes.
- **Testable UI**: Mandatory `data-testid="component-element-type"` (kebab-case) on all interactive elements.
- **Doc-First Update**: Update relevant `CONTEXT.md` files *after* verifying code stability.

## Project Overview
React app: CSV (commit hashes/messages) → TSV (Excel-compatible)

## Tech Stack
React 18 + Vite
papaparse (CSV)
Browser APIs (file/clipboard)

## Data Flow
Input: "hash","message"
Output: hash<TAB>message

## Structure
/src/App.jsx - main component
/src/App.css - styles
/src/components/ - reusable UI
/src/components/ErrorDisplay.jsx - shared error banner
/src/utils/ - helper functions
/src/utils/parseCsvToTsv.js - CSV→TSV logic (papaparse)
/src/utils/errorHandler.js - createSafeAsync wrapper
/context.md - this file

## Features
1. Manual CSV paste
2. File upload (.csv/.txt)
3. CSV parsing (handles quotes/commas)
4. TSV generation
5. Clipboard copy
6. Error handling
7. data-testid on interactive elements (kebab-case)

## Status
✅ Phase 1: Setup complete
✅ Phase 2: Core functionality complete
✅ Phase 3: File upload complete
✅ Playwright tested: 8/8 passed

## Last Updated
2026-01-20
