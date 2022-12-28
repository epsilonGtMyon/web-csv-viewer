class CsvInputSource {
  private readonly source: string | string[];
  private currentPosition: number;

  constructor(source: string | string[]) {
    this.source = source;
    this.currentPosition = -1;
  }

  public nextChar(): string | undefined {
    this.currentPosition++;
    return this.source[this.currentPosition];
  }

  public peekNext(): string | undefined {
    return this.source[this.currentPosition + 1];
  }
}

export { CsvInputSource };
