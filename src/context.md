# Source Code Context

## App.jsx
Main component
State: csvInput, tsvOutput, error, copied
Functions:
  processCSV() - CSV→TSV via parseCsvToTsv util
  handleFileUpload() - reads .csv/.txt files
  copyToClipboard() - navigator.clipboard API via createSafeAsync
  loadSampleData() - test data loader
  clearAll() - reset state
UI: 2-column layout (input|output)
data-testids: load-sample-button, clear-all-button, file-input, csv-textarea, process-data-button, copy-to-clipboard-button, tsv-output-textarea

## App.css
Layout: flexbox grid
Theme: purple gradient (#667eea→#764ba2)
Responsive: 2-col desktop, 1-col mobile
Components: .btn, .textarea, .error-message, .info-message, .file-upload

## Dependencies
papaparse - CSV parser (handles quotes/commas)

## Components
ErrorDisplay.jsx - reusable error banner

## Data Flow
User input → parseCsvToTsv util → setState(tsvOutput) → clipboard via createSafeAsync

## Missing (TODO)
/src/utils/ - consider more helpers for future features
/src/components/ - extract more UI as needed
