function escape(text: string) {
  let shouldQuote = false;
  if (/(\r\n|\r|\n)/.test(text)) {
    shouldQuote = true;
  }

  let escapedText = text;

  if (shouldQuote) {
    if (/"/.test(text)) {
      escapedText = escapedText.replaceAll('"', '""');
    }
    escapedText = `"${escapedText}"`;
  }
  return escapedText;
}

function recordsToTsv(records: string[][]) {
  return records
    .map((record) => record.map((v) => escape(v)).join("\t"))
    .join("\r\n");
}

export { recordsToTsv };
