const decoders = [
  new TextDecoder("sjis", { fatal: true }),
  new TextDecoder("utf-8", { fatal: true, ignoreBOM: true }),
];

async function decodeTextFile(file: File) {
  const buf = await file.arrayBuffer();

  let error: undefined | Error = undefined;
  for (const decoder of decoders) {
    try {
      return decoder.decode(buf);
    } catch (e) {
      error = e as Error;
    }
  }

  // どれにもデコードできなかった場合
  throw error;
}

export { decodeTextFile };
