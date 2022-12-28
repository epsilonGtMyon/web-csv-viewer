import { CsvLexer } from "./CsvLexer";
import { CsvToken } from "./CsvTokenType";

class CsvReader {
  
  /**
   * 全てのレコードを読み込みます。
   * @param source
   * @returns CSVのレコード
   */
  public readAll(source: string | string[]) {
    const lexer = new CsvLexer(source);

    const allRow = [];
    while (true) {
      const { record, eof } = this.readRecord(lexer);
      if (record.length > 0) {
        allRow.push(record);
      }

      if (eof) {
        break;
      }
    }

    return allRow;
  }

  /**
   * 全てのレコードを読み込み、行毎の値を返すジェネレータを返します。
   * @param source
   */
  public *readAsGenerator(source: string | string[]) {
    const lexer = new CsvLexer(source);

    while (true) {
      const { record, eof } = this.readRecord(lexer);
      if (record.length > 0) {
        yield record;
      }

      if (eof) {
        break;
      }
    }
  }

  /**
   * 1レコードを読み込みます。
   * @param lexer
   * @returns 1レコードの配列
   */
  readRecord(lexer: CsvLexer) {
    const record = [];
    let previousToken: CsvToken | undefined = undefined;
    let t: CsvToken | undefined = undefined;

    while (true) {
      previousToken = t;
      t = lexer.nextToken();
      if (t.tokenType === "EOF") {
        // ファイルの終わり
        if (previousToken != null && previousToken.tokenType === "DELIMITER") {
          // カンマの直後にファイルが終了した場合, 空の値が無くなってしまう
          record.push("");
        }
        return { record: record, eof: true };
      } else if (t.tokenType === "VALUE") {
        record.push(t.value);
        continue;
      } else if (t.tokenType === "DELIMITER") {
        if (
          previousToken === undefined ||
          previousToken.tokenType === "DELIMITER"
        ) {
          // レコードの先頭でいきなりカンマ もしくは カンマ2連続の場合
          // 空の値の事実が無くなってしまうのでここで追加
          record.push("");
        }
        continue;
      } else if (t.tokenType === "EOR") {
        if (previousToken != null && previousToken.tokenType === "DELIMITER") {
          // カンマの直後にレコードが終了した場合, 空の値が無くなってしまう
          record.push("");
        }
        return { record: record, eof: false };
      }
    }
  }
}

export { CsvReader };
