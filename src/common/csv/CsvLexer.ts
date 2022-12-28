import { CsvTokenType, CsvToken } from "./CsvTokenType";
import { CsvInputSource } from "./CsvInputSource";

function newToken(tokenType: CsvTokenType, value: string = ""): CsvToken {
  return {
    tokenType,
    value,
  };
}

class CsvLexer {
  private readonly is: CsvInputSource;
  constructor(source: string | string[]) {
    this.is = new CsvInputSource(source);
  }

  nextToken(): CsvToken {
    const c = this.is.nextChar();
    if (c == null) {
      return newToken("EOF");
    }

    switch (c) {
      case ",":
        return newToken("DELIMITER", c);
      case "\r":
        if (this.is.peekNext() === "\n") {
          // skip
          this.is.nextChar();
          return newToken("EOR", "\r\n");
        }
        return newToken("EOR", c);
      case "\n":
        return newToken("EOR", c);
      case '"':
        return this.readWhenQuoted();
      default:
        return this.read(c);
    }
  }

  /**
   * ダブルクォーテーションで囲まれていた時
   */
  readWhenQuoted(): CsvToken {
    let csvValue = "";

    while (true) {
      const c = this.is.nextChar();
      if (c == null) {
        throw new Error(
          "ダブルクォーテーションで囲まれた文字を読み取っている途中でファイルが終了しました。"
        );
      }

      switch (c) {
        case '"': {
          const p = this.is.peekNext();
          if (p === '"') {
            // ダブルクォートの連続は エスケープなので次の文字へ
            csvValue += c;
            this.is.nextChar();
            break;
          }

          // 次の文字がダブルクォート以外の場合は、値としての終了なので返す。
          return newToken("VALUE", csvValue);
        }
        default:
          // ダブルクォート以外の場合は文字列を蓄積していく
          csvValue += c;
          break;
      }
    }
  }

  read(firstChar: string): CsvToken {
    let csvValue = firstChar;
    while (true) {
      const p = this.is.peekNext();
      if (p == null) {
        // 次が空の場合もファイルの終わり
        return newToken("VALUE", csvValue);
      }

      switch (p) {
        case ",":
        case "\r":
        case "\n":
          // 次がカンマだったり、改行の場合は、値の終わり
          return newToken("VALUE", csvValue);
        default:
          // それ以外の時は値がまだ続いているので蓄積する
          const c = this.is.nextChar();
          csvValue += c;
          break;
      }
    }
  }
}

export { CsvLexer };
