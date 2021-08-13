import {
  Token,
  Peekable,
  ClassName,
  char,
  isWhitespaceChar,
  isDigit,
} from './common';

export default function racket(source: string): Token[] {
  const tokens = [];
  const chars = new Peekable(source);

  while (!chars.isDone) {
    const start = chars.pos;
    let className;
    const c = chars.pop();

    if ('()[]'.includes(c)) {
      className = ClassName.Punc;
    } else if (c === ';') {
      chars.eatInlineComment();
      className = ClassName.Comment;
    } else if (c === '"') {
      chars.eatString();
      className = ClassName.String;
    } else if (startsIdent(c)) {
      chars.popWhile(continuesIdent);
      className = ClassName.Ident;
    } else if (isDigit(c)) {
      chars.eatNumber();
      className = ClassName.Num;
    } else if (isWhitespaceChar(c)) {
      chars.eatWhitespace();
    } else {
      className = ClassName.Unknown;
    }

    const text = source.slice(start, chars.pos);
    if (keywords.includes(text)) {
      className = ClassName.Kw;
    }
    tokens.push({ text, className });
  }

  return tokens;
}

function startsIdent(c: char): boolean {
  return (
    ('a' <= c && c <= 'z') || ('A' <= c && c <= 'Z') || special.includes(c)
  );
}

const special = '+-*/<>=!$^&:?#';

function continuesIdent(c: char): boolean {
  return startsIdent(c) || isDigit(c);
}

const keywords = [
  'define',
  'lambda',
  'if',
  'let',
  'let*',
  'match',
  'else',
  '#lang',
  '#t',
  '#f',
  'require',
  '`',
  ',',
  ',@',
];
