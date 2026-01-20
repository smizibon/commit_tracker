# Testing Guide

## Quick Test Steps

### Test 1: Load Sample Data
1. Open http://localhost:5173/
2. Click "Load Sample" button
3. Click "Process Data" button
4. Verify the output shows tab-separated values
5. Click "Copy to Clipboard"
6. Open Excel/Google Sheets
7. Paste (Cmd+V or Ctrl+V)
8. Verify data appears in separate columns

### Test 2: Manual Paste
1. Clear the form using "Clear All" button
2. Paste this CSV data into the input area:
```
"abc123","First commit message"
"def456","Second commit with, commas in message"
"ghi789","Third commit message"
```
3. Click "Process Data"
4. Verify output is formatted correctly
5. Test copy functionality

### Test 3: File Upload
1. Use the "Choose CSV/TXT file" button
2. Select the `sample-data.csv` file from the project root
3. Verify data loads into input area
4. Click "Process Data"
5. Verify output
6. Test copy functionality

### Test 4: Error Handling
1. Clear all data
2. Click "Process Data" without entering data
3. Verify error message appears
4. Enter invalid data (e.g., random text)
5. Process and check error handling

## Expected Results

### Input Format (CSV):
```csv
"c1f392c4314725931a3063241e3a9b71b79794fa","I adjusted the older-backfill stop condition"
"d7c8223fba3184e3d105264e4d5a434eaa4c9be2","Stopped the older-backfill sentinel"
```

### Output Format (TSV):
```tsv
c1f392c4314725931a3063241e3a9b71b79794fa	I adjusted the older-backfill stop condition
d7c8223fba3184e3d105264e4d5a434eaa4c9be2	Stopped the older-backfill sentinel
```

### Excel Paste Result:
| Column A (Hash) | Column B (Message) |
|----------------|-------------------|
| c1f392c4... | I adjusted the older-backfill stop condition |
| d7c8223f... | Stopped the older-backfill sentinel |

## Features Checklist

- [x] React project created with Vite
- [x] papaparse installed for CSV parsing
- [x] UI with input/output text areas
- [x] "Load Sample" button functionality
- [x] "Clear All" button functionality
- [x] "Process Data" button with CSV parsing
- [x] File upload support (.csv and .txt)
- [x] TSV output generation (tab-separated)
- [x] "Copy to Clipboard" functionality
- [x] Error handling and user feedback
- [x] Responsive design with beautiful UI
- [x] Instructions footer
- [x] Context.md files for AI assistance

## Browser Testing

Test in multiple browsers:
- Chrome/Edge (Chromium)
- Firefox
- Safari

Verify:
- CSV parsing works correctly
- Copy to clipboard functions
- File upload works
- UI displays properly
- Responsive design on mobile

## Known Limitations

1. **Large Files**: Very large CSV files (>100MB) may cause performance issues
2. **Browser Compatibility**: Clipboard API requires HTTPS in production (works on localhost)
3. **CSV Format**: Expects exactly 2 columns (hash, message)

## Troubleshooting

**Issue**: Data not copying to clipboard
- **Solution**: Ensure you're on localhost or HTTPS
- **Solution**: Check browser clipboard permissions

**Issue**: CSV parsing errors
- **Solution**: Ensure data is properly quoted
- **Solution**: Check for escaped quotes in messages

**Issue**: Excel columns not separating
- **Solution**: Verify tab character (\t) is in output
- **Solution**: Try paste special > Text in Excel

## Next Steps

Optional enhancements:
1. Add drag-and-drop file upload
2. Support for CSV headers
3. Export as .tsv file download
4. Batch processing multiple files
5. Custom column mapping
6. Preview before processing
