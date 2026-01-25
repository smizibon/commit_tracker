# QA Workflow

A React/Vite app with a commit-converter workflow that turns CSV commit data (hashes + messages) into Excel-compatible TSV output. Built as a hub to host QA utilities.

## Features

✅ **CSV Parsing** - Handles quoted strings with commas and special characters
✅ **File Upload** - Upload .csv or .txt files directly
✅ **Manual Input** - Paste CSV data directly into the text area
✅ **TSV Output** - Converts to tab-separated values for Excel compatibility
✅ **One-Click Copy** - Copy formatted output to clipboard
✅ **Sample Data** - Load sample data to test the functionality
✅ **Error Handling** - Clear error messages for invalid data

## Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Usage

### Method 1: Paste CSV Data

1. Paste your CSV data into the input text area
2. Click "Process Data"
3. Click "Copy to Clipboard"
4. Paste into Excel (each field will be in a separate column)

### Method 2: Upload File

1. Click "Choose CSV/TXT file" and select your file
2. Click "Process Data"
3. Click "Copy to Clipboard"
4. Paste into Excel

### Method 3: Use Sample Data

1. Click "Load Sample" to load example commit data
2. Click "Process Data" to see the output
3. Test the copy-paste functionality

## Input Format

CSV format with quoted strings:
```csv
"commit_hash","commit_message"
"c1f392c4314725931a3063241e3a9b71b79794fa","Fixed bug in component"
"d7c8223fba3184e3d105264e4d5a434eaa4c9be2","Updated documentation"
```

## Output Format

Tab-separated values (TSV):
```
commit_hash	commit_message
c1f392c4314725931a3063241e3a9b71b79794fa	Fixed bug in component
d7c8223fba3184e3d105264e4d5a434eaa4c9be2	Updated documentation
```

## Tech Stack

- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **papaparse** - CSV parsing library
- **Modern CSS** - Responsive design with gradients

## Project Structure

```
qa-workflow/
├── src/
│   ├── App.jsx          # Main application component
│   ├── App.css          # Application styles
│   ├── index.css        # Global styles
│   ├── main.jsx         # React entry point
│   └── agents.md        # AI context for codebase
├── public/              # Static assets
├── agents.md            # Project-level context
├── package.json         # Dependencies
└── README.md            # This file
```

## Development

The application uses:
- **State Management**: React useState hooks
- **CSV Parsing**: papaparse library for robust parsing
- **Clipboard API**: Native browser API for copy functionality
- **File Reading**: FileReader API for file uploads

## Browser Compatibility

- Modern browsers with ES6+ support
- Clipboard API support (Chrome, Firefox, Safari, Edge)

## License

MIT

## Contributing

Feel free to submit issues and enhancement requests!

