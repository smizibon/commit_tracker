import Papa from 'papaparse';

const SMART_DOUBLE_OPEN = /[“«]/g;
const SMART_DOUBLE_CLOSE = /[”»]/g;
const SMART_SINGLE = /[’‘]/g;

// Remove common commit URL prefixes (e.g., Bitbucket) to leave only the hash
function stripCommitUrl(value) {
  if (!value) return value;
  const match = value.match(/https?:\/\/[^\s"']+\/commits\/([a-fA-F0-9]+)/);
  return match ? match[1] : value;
}

function normalizeQuotes(text) {
  return text
    .replace(SMART_DOUBLE_OPEN, '"')
    .replace(SMART_DOUBLE_CLOSE, '"')
    .replace(SMART_SINGLE, "'");
}

function tryFallbackTwoColumnParse(text) {
  const lines = text.split(/\r?\n/).filter((l) => l.trim().length > 0);
  const data = [];

  for (const line of lines) {
    // Expect: "hash","message" (message may contain commas/quotes)
    const match = line.match(/^"([^"]+)",(.*)$/);
    if (!match) {
      throw new Error(`Unable to parse line: ${line.slice(0, 80)}...`);
    }
    const hash = stripCommitUrl(match[1]);
    let message = match[2];

    // Trim outer quotes on message if present
    if (message.startsWith('"') && message.endsWith('"')) {
      message = message.slice(1, -1);
    }

    // Unescape doubled quotes if any
    message = message.replace(/""/g, '"');

    data.push([hash, message]);
  }

  return data;
}

export function parseCsvToTsv(csvText) {
  const trimmed = csvText?.trim();
  if (!trimmed) {
    throw new Error('Please enter some CSV data or upload a file');
  }

  const normalized = normalizeQuotes(trimmed);

  let data;

  const results = Papa.parse(normalized, {
    skipEmptyLines: true,
  });

  if (results.errors?.length === 0 && results.data?.length) {
    data = results.data;
  } else {
    // Fallback for malformed quotes: manual two-column parse
    data = tryFallbackTwoColumnParse(normalized);
  }

  if (!data?.length) {
    throw new Error('No data found in the CSV');
  }

  const sanitizedData = data.map((row) => {
    if (!Array.isArray(row) || !row.length) return row;
    const [first, ...rest] = row;
    return [stripCommitUrl(first), ...rest];
  });

  const tsvLines = sanitizedData.map((row) => {
    if (row.length >= 2) return `${row[0]}\t${row[1]}`;
    return row.join('\t');
  });

  return tsvLines.join('\n');
}
