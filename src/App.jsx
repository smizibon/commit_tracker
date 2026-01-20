import { useState } from 'react';
import './App.css';
import ErrorDisplay from './components/ErrorDisplay';
import { parseCsvRows } from './utils/parseCsvToTsv';
import { createSafeAsync } from './utils/errorHandler';

function App() {
  const [csvInput, setCsvInput] = useState('');
  const [commitOutput, setCommitOutput] = useState('');
  const [messageOutput, setMessageOutput] = useState('');
  const [rowsData, setRowsData] = useState([]);
  const [baseUrl, setBaseUrl] = useState('https://bitbucket.org/tigerit/communicator-desktop-pwa/commits/');
  const [error, setError] = useState('');
  const [commitCopied, setCommitCopied] = useState(false);
  const [messageCopied, setMessageCopied] = useState(false);
  const [snippetCopied, setSnippetCopied] = useState(false);
  const runSafeAsync = createSafeAsync(setError);

  // Sample data for testing
  const sampleData = `"c1f392c4314725931a3063241e3a9b71b79794fa","I adjusted the older-backfill stop condition so a run won't end just because it hit the payload limit when zero messages were added. It will keep paging until it actually adds messages (or hits caps/no-progress). This should prevent the success with added 0 idle fallback"
"d7c8223fba3184e3d105264e4d5a434eaa4c9be2","Stopped the older-backfill sentinel from pushing the page down when it adds new messages from batch response."`;

  const gitLogCommand = `git log --pretty=format:'"%H","%s"' > commits.csv`;

  const processCSV = () => {
    setCommitCopied(false);
    setMessageCopied(false);
    setSnippetCopied(false);
    try {
      const rows = parseCsvRows(csvInput, baseUrl);
      const commits = rows.map((row) => row?.[0] ?? '').join('\n');
      const messages = rows.map((row) => row?.[1] ?? '').join('\n');
      setRowsData(rows);
      setCommitOutput(commits);
      setMessageOutput(messages);
      setError('');
    } catch (err) {
      setError(err.message);
      setRowsData([]);
      setCommitOutput('');
      setMessageOutput('');
    }
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Check file type
    if (!file.name.endsWith('.csv') && !file.name.endsWith('.txt')) {
      setError('Please upload a .csv or .txt file');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target.result;
      setCsvInput(content);
      setError('');
      setCommitOutput('');
      setMessageOutput('');
      setRowsData([]);
      setCommitCopied(false);
      setMessageCopied(false);
      setSnippetCopied(false);
    };
    reader.onerror = () => {
      setError('Error reading file');
    };
    reader.readAsText(file);
  };

  const copyToClipboard = () =>
    runSafeAsync(async () => {
      if (!rowsData.length) {
        throw new Error('No output to copy');
      }
      const tsv = rowsData
        .map((row) => {
          const [c = '', m = ''] = row;
          return `${c}\t${m}`;
        })
        .join('\n');
      await navigator.clipboard.writeText(tsv);
      setCommitCopied(true);
      setMessageCopied(true);
      setTimeout(() => {
        setCommitCopied(false);
        setMessageCopied(false);
      }, 3000);
    });

  const copyCommitColumn = () =>
    runSafeAsync(async () => {
      if (!commitOutput) throw new Error('No commit column to copy');
      await navigator.clipboard.writeText(commitOutput);
      setCommitCopied(true);
      setTimeout(() => setCommitCopied(false), 3000);
    });

  const copyMessageColumn = () =>
    runSafeAsync(async () => {
      if (!messageOutput) throw new Error('No message column to copy');
      await navigator.clipboard.writeText(messageOutput);
      setMessageCopied(true);
      setTimeout(() => setMessageCopied(false), 3000);
    });

  const loadSampleData = () => {
    setCsvInput(sampleData);
    setError('');
    setCommitOutput('');
    setMessageOutput('');
    setRowsData([]);
    setCommitCopied(false);
    setMessageCopied(false);
    setSnippetCopied(false);
  };

  const handleBaseUrlChange = (e) => {
    setBaseUrl(e.target.value);
  };

  const clearAll = () => {
    setCsvInput('');
    setCommitOutput('');
    setMessageOutput('');
    setRowsData([]);
    setError('');
    setCommitCopied(false);
    setMessageCopied(false);
    setSnippetCopied(false);
  };

  const copyGitSnippet = () =>
    runSafeAsync(async () => {
      await navigator.clipboard.writeText(gitLogCommand);
      setSnippetCopied(true);
      setTimeout(() => setSnippetCopied(false), 2500);
    });

  return (
    <div className="app">
      <div className="container">
        <header className="header">
          <h1>CSV to Excel Converter</h1>
          <p className="subtitle">Convert CSV commit data to Excel-compatible format</p>
        </header>

        <div className="content">
          {/* Input Section */}
          <div className="section">
            <div className="section-header">
              <h2>Input CSV Data</h2>
              <div className="button-group">
                <button
                  onClick={loadSampleData}
                  className="btn btn-secondary"
                  data-testid="load-sample-button"
                >
                  Load Sample
                </button>
                <button
                  onClick={clearAll}
                  className="btn btn-secondary"
                  data-testid="clear-all-button"
                >
                  Clear All
                </button>
              </div>
            </div>
            
            <div className="file-upload">
              <label htmlFor="file-input" className="file-label">
                📁 Choose CSV/TXT file
              </label>
              <input
                id="file-input"
                type="file"
                accept=".csv,.txt"
                onChange={handleFileUpload}
                className="file-input"
                data-testid="file-input"
              />
            </div>

            <div className="code-snippet" aria-label="git log csv command">
              <div className="code-snippet__header">
                <div className="code-snippet__title">Generate commits CSV:</div>
                <button
                  onClick={copyGitSnippet}
                  className="btn btn-ghost"
                  data-testid="copy-git-snippet-button"
                >
                  {snippetCopied ? '✓ Copied' : '📋 Copy'}
                </button>
              </div>
              <pre className="code-snippet__block" data-testid="git-log-snippet">{gitLogCommand}</pre>
            </div>

            <label className="field-label" htmlFor="base-url-input">
              Commit base URL (used to build hyperlinks)
            </label>
            <input
              id="base-url-input"
              className="text-input"
              type="text"
              value={baseUrl}
              onChange={handleBaseUrlChange}
              placeholder="https://bitbucket.org/org/repo/commits/"
              data-testid="base-url-input"
            />

            <textarea
              className="textarea"
              placeholder='Paste your CSV data here...&#10;&#10;Example:&#10;"commit_hash","commit_message"&#10;"abc123","Fixed bug in component"'
              value={csvInput}
              onChange={(e) => setCsvInput(e.target.value)}
              rows={10}
              data-testid="csv-textarea"
            />

            <button
              onClick={processCSV}
              className="btn btn-primary"
              data-testid="process-data-button"
            >
              🔄 Process Data
            </button>
          </div>

          {/* Output Section */}
          <div className="section">
            <div className="section-header">
              <h2>Excel-Ready Columns</h2>
              {(commitOutput || messageOutput) && (
                <button
                  onClick={copyToClipboard}
                  className="btn btn-success"
                  data-testid="copy-to-clipboard-button"
                >
                  {commitCopied && messageCopied ? '✓ Both Copied' : '📋 Copy Both'}
                </button>
              )}
            </div>

            <ErrorDisplay message={error} />

            <div className="dual-output">
              <div className="output-card">
                <div className="output-card__header">
                  <h3>Commit (with hyperlink)</h3>
                  {commitOutput && (
                    <button
                      onClick={copyCommitColumn}
                      className="btn btn-ghost"
                      data-testid="copy-commit-column"
                    >
                      {commitCopied ? '✓ Copied' : '📋 Copy'}
                    </button>
                  )}
                </div>
                <textarea
                  className="textarea output"
                  placeholder="Commit IDs (hyperlinks) will appear here"
                  value={commitOutput}
                  readOnly
                  rows={10}
                  data-testid="commit-output-textarea"
                />
              </div>

              <div className="output-card">
                <div className="output-card__header">
                  <h3>Commit Message</h3>
                  {messageOutput && (
                    <button
                      onClick={copyMessageColumn}
                      className="btn btn-ghost"
                      data-testid="copy-message-column"
                    >
                      {messageCopied ? '✓ Copied' : '📋 Copy'}
                    </button>
                  )}
                </div>
                <textarea
                  className="textarea output"
                  placeholder="Commit messages will appear here"
                  value={messageOutput}
                  readOnly
                  rows={10}
                  data-testid="message-output-textarea"
                />
              </div>
            </div>
          </div>
        </div>

        <footer className="footer">
          <p>
            <strong>How to use:</strong>
          </p>
          <ol>
            <li>Paste your CSV data or upload a file</li>
            <li>Click "Process Data" to convert to Excel format</li>
            <li>Click "Copy to Clipboard"</li>
            <li>Paste into Excel (each field will be in a separate column)</li>
          </ol>
        </footer>
      </div>
    </div>
  );
}

export default App;
