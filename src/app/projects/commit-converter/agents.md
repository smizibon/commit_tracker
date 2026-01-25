# Commit Converter App Context (v2.0)

## Overview
Single-page app that converts CSV of commit hashes & messages into Excel-ready hyperlinked columns.

**Files**: `CommitConverterApp.jsx` (main component) + `App.css` (styles)

---

## Component State (CommitConverterApp)

```javascript
const [csvInput, setCsvInput] = useState('');           // Raw user CSV paste
const [baseUrl, setBaseUrl] = useState('https://...');  // Git platform URL (Bitbucket default)
const [rowsData, setRowsData] = useState([]);           // [[hyperlink, message], ...]
const [commitOutput, setCommitOutput] = useState('');   // Commit column TSV
const [messageOutput, setMessageOutput] = useState(''); // Message column TSV
const [error, setError] = useState(null);               // Error message
const [commitCopied, setCommitCopied] = useState(false);
const [messageCopied, setMessageCopied] = useState(false);
const [snippetCopied, setSnippetCopied] = useState(false);   // git log all
const [snippetCopied50, setSnippetCopied50] = useState(false); // git log -50
```

---

## Key Handlers

### processCSV()
**Trigger**: User pastes CSV or uploads file
**Logic**:
1. Call `parseCsvRows(csvInput, baseUrl)` from shared utils
2. Set `rowsData` result
3. Extract columns: `commitOutput` = col 0, `messageOutput` = col 1
4. Join as TSV strings (tab-separated)
5. On error → `createSafeAsync` catches, sets error message

### handleFileUpload(event)
**Trigger**: File input change
**Logic**:
1. Read file with FileReader.readAsText()
2. Wrapped with `createSafeAsync()`
3. Set `csvInput` with file contents
4. Trigger `processCSV()`
5. Reject if not .csv/.txt (show error)

### copyCommitColumn(), copyMessageColumn(), copyToClipboard()
**Trigger**: Copy buttons (Commit-only, Message-only, Both)
**Logic**:
1. Wrapped with `createSafeAsync()`
2. Copy respective text to navigator.clipboard.writeText()
3. Set flag (commitCopied/messageCopied) to true
4. Auto-clear flag after 2s (for button feedback "Copied!" animation)

### copyGitSnippet(allCommits=false)
**Trigger**: "Copy Git Command" buttons
**Logic**:
1. Build command: 
   - All commits: `git log --oneline`
   - Last 50: `git log -50 --oneline`
2. Copy to clipboard with createSafeAsync()
3. Trigger snippetCopied or snippetCopied50 flag

### handleBaseUrlChange(event)
**Trigger**: Base URL input change
**Logic**:
1. Update `baseUrl` state
2. Re-run `processCSV()` to regenerate hyperlinks with new base URL

### loadSampleData()
**Trigger**: "Load Sample" button
**Logic**:
1. Fetch sample CSV from `sample-data.csv` (static file)
2. Set `csvInput` with sample content
3. Trigger `processCSV()`

### clearAll()
**Trigger**: "Clear All" button
**Logic**:
1. Reset all state to initial values
2. Clear error message
3. Unblock user for new input

---

## UI Structure

### Input Section
  - `git log --oneline` with `data-testid="git-log-snippet"`
  - `git log -50 --oneline` with `data-testid="git-log-snippet-50"`

### Output Section

### Error & Feedback

---

def456ghi789 | Update docs

**After processCSV()**:
```
rowsData = [
  ['=HYPERLINK("https://bitbucket.org/.../abc123def456","abc123d")', 'Fix login bug'],
  ['=HYPERLINK("https://bitbucket.org/.../def456ghi789","def456g")', 'Update docs']
]
commitOutput = '=HYPERLINK(...,"abc123d")\n=HYPERLINK(...,"def456g")'
messageOutput = 'Fix login bug\nUpdate docs'
```

**User copies "Both"** → TSV with hyperlink column + message column → Paste into Excel

---

## Critical Testid Conventions

**Format**: `<action>-<feature>-<element>`

- `load-sample-button` - Load Sample Data
- `clear-all-button` - Reset all
- `file-input` - File upload
- `base-url-input` - Base URL override
- `csv-textarea` - CSV input area
- `copy-commit-button` - Copy commit column
- `copy-message-button` - Copy message column
- `copy-both-button` - Copy both columns as TSV
- `git-log-snippet` - All commits command block
- `git-log-snippet-50` - Last 50 commits command block
- `copy-git-log-button` - Copy all commits command
- `copy-git-log-50-button` - Copy last 50 commits command
- `commit-output-textarea` - Commit output display
- `message-output-textarea` - Message output display
- `error-display` - Error banner

## Documentation Sync Rule
**When handlers change or new state added**: Update root agents.md navigation table + this file's state/handler sections → keeps AI decision tree accurate & fast for future edits

---

## Last Updated
2026-01-25 | React 19.2.0
