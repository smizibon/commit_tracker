# Shared Utils & Components Context (v2.0)

## Overview
This folder contains **reusable, non-project-specific utilities and components** used across all projects in the app.

## 🎯 What Do You Need?

## Structure
```
shared/
  components/
    ErrorDisplay.jsx     ← Error banner component
    parseCsvToTsv.js     ← CSV parsing & hyperlink formatting
    errorHandler.js      ← Async error wrapping
**Purpose**: Reusable error banner that conditionally renders error messages.
**Props**: 
- `message` (string) - error text to display
**Usage**: `<ErrorDisplay message={error} />`
**Styling**: Full-width banner, red background, close/dismiss logic (if implemented)

---

## Utils

### errorHandler.js
**Export**: `createSafeAsync(asyncFn, setError)`

**Pattern**:
```javascript
const handleCopy = () => {
  createSafeAsync(
    () => navigator.clipboard.writeText(data),
    setError
  );
};
```

**Behavior**:
- Wraps async function
- Catches errors, routes to `setError(errorMessage)`
- Clears error state on success
- Prevents unhandled promise rejections

---

### parseCsvToTsv.js
**Exports**: `parseCsvRows()`, `parseCsvToTsv()`, `normalizeQuotes()`, `sanitizeRows()`, `formatCommitCell()`

#### Main Entry: `parseCsvRows(csvText, baseUrl)`
- **Input**: Raw CSV string (pasted or from file), git platform base URL
- **Output**: `[[hyperlink, message], ...]` array
- **Process**:
  1. normalizeQuotes(csvText) - handle "", '', « »
  2. Papa.parse(csvText) → fallback to manual regex if fails
  3. sanitizeRows() - filter/clean
  4. formatCommitCell() - transform each commit cell with baseUrl

#### `formatCommitCell(hash, baseUrl)`
- **Input**: Bare commit hash (e.g., `abc123def456...`), base URL
- **Output**: `=HYPERLINK("https://bitbucket.org/.../commits/abc123def456","abc123d")`
- **Logic**: 
  - Extract 7-char short hash (display text)
  - Build full URL: `baseUrl + hash`
  - Return Excel HYPERLINK formula

#### `normalizeQuotes(text)`
- Converts smart quotes ("", '') → regular quotes (", ')
- Handles « » (guillemets)
- Prevents quote nesting errors in CSV parsing

#### `sanitizeRows(rows)`
- Filters empty rows
- Trims whitespace
- Validates [hash, message] tuple structure

---

## Ground Rules
- **No project-specific logic here** - all generic utilities only
- **Error messages**: User-friendly (not stack traces)
- **Testing**: All functions should accept parameters (no global state)
- **Documentation**: Keep docstrings for complex transforms (normalizeQuotes, formatCommitCell)
- **Doc sync**: When new utils stabilize, update agents.md decision tree → AI finds code fast

## Last Updated
2026-01-25 | React 19.2.0
