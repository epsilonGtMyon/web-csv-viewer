export type CsvTokenType = "DELIMITER" | "VALUE" | "EOR" | "EOF";

type CsvDelimiterToken = {
  tokenType: "DELIMITER";
  value: string;
};
type CsvValueToken = {
  tokenType: "VALUE";
  value: string;
};
type CsvEORToken = {
  tokenType: "EOR";
  value: string;
};
type CsvEOFToken = {
  tokenType: "EOF";
  value: string
};

export type CsvToken =
  | CsvDelimiterToken
  | CsvValueToken
  | CsvEORToken
  | CsvEOFToken;
