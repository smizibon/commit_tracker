# Source Context (AI-lean)

## App.jsx
State: csvInput, commitOutput, messageOutput, rowsData, baseUrl, error, commitCopied, messageCopied, snippetCopied, snippetCopied50.
Key handlers: processCSV (parseCsvRows with baseUrl, builds commit/message outputs), handleFileUpload, copyCommitColumn, copyMessageColumn, copyToClipboard (TSV both), loadSampleData, clearAll, copyGitSnippet, copyGitSnippet50, handleBaseUrlChange.
UI: Input section (file upload, git log snippet, git log -n 50 snippet, base URL input); Dual outputs (commit column with hyperlinks, message column) + copy buttons. Layout grid.
Testids include: load-sample-button, clear-all-button, file-input, csv-textarea, process-data-button, copy-to-clipboard-button, commit-output-textarea, message-output-textarea, copy-commit-column, copy-message-column, git-log-snippet, git-log-snippet-50, copy-git-snippet-button, copy-git-snippet-50-button, base-url-input.

## App.css
Gradient header; grid layout; buttons (primary/secondary/success/ghost); file-upload; code-snippet blocks; dual-output cards; text inputs; responsive single-column under ~900px.

## Utils
parseCsvToTsv.js: normalize smart quotes; papaparse with fallback; sanitizeRows -> commit cell as HYPERLINK(baseUrl or parsed URL, short hash 7 chars) + message; parseCsvRows export.
errorHandler.js: createSafeAsync wraps async, routes errors to setter.

## Components
ErrorDisplay.jsx: simple error banner.
