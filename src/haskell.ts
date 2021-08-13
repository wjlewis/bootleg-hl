import {
  Token,
  Peekable,
  ClassName,
  char,
  isWhitespaceChar,
  isDigit,
} from './common';

export default function haskell(source: string): Token[] {
  const tokens = [];
  const chars = new Peekable(source);

  while (!chars.isDone) {
    const start = chars.pos;
    let className;
    const c = chars.pop();
    if ('[]()'.includes(c)) {
      className = ClassName.Punc;
    } else if (c === '"') {
      chars.eatString();
      className = ClassName.String;
    } else if (c === '-' && chars.peek() === '-') {
      chars.eatInlineComment();
      className = ClassName.Comment;
    } else if (isInfixIdentChar(c)) {
      chars.popWhile(isInfixIdentChar);
      className = ClassName.Op;
    } else if (isWhitespaceChar(c)) {
      chars.eatWhitespace();
    } else if (startsIdent(c)) {
      chars.popWhile(continuesName);
      className = ClassName.Ident;
    } else if (startsType(c)) {
      chars.popWhile(continuesName);
      className = ClassName.Type;
    } else if (isDigit(c)) {
      chars.eatNumber();
      className = ClassName.Num;
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

function isInfixIdentChar(c: char): boolean {
  return '+-*/:<>$@!=.~'.includes(c);
}

function startsIdent(c: char): boolean {
  return ('a' <= c && c <= 'z') || c === '_';
}

function startsType(c: char): boolean {
  return 'A' <= c && c <= 'Z';
}

function continuesName(c: char): boolean {
  return (
    ('a' <= c && c <= 'z') ||
    ('A' <= c && c <= 'Z') ||
    ('0' <= c && c <= '9') ||
    c === '_'
  );
}

const keywords = [
  'case',
  'of',
  'class',
  'data',
  'instance',
  'default',
  'deriving',
  'do',
  'forall',
  'hiding',
  'if',
  'then',
  'else',
  'import',
  'infix',
  'infixl',
  'infixr',
  'let',
  'in',
  'module',
  'newtype',
  'qualified',
  'as',
  'type',
  'where',
];
