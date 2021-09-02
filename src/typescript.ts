import {
  Token,
  Peekable,
  ClassName,
  char,
  isWhitespaceChar,
  isDigit,
} from './common';

export default function typescript(source: string): Token[] {
  const tokens = [];
  const chars = new Peekable(source);

  while (!chars.isDone) {
    const start = chars.pos;
    let className;
    const c = chars.pop();
    if ('[](){}<>.,:?;'.includes(c)) {
      className = ClassName.Punc;
    } else if ('"\'`'.includes(c)) {
      chars.eatString(c);
      className = ClassName.String;
    } else if (c === '/' && chars.peek() === '/') {
      chars.eatInlineComment();
      className = ClassName.Comment;
    } else if ('+-*/%^='.includes(c)) {
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

function startsIdent(c: char): boolean {
  return ('a' <= c && c <= 'z') || c === '_';
}

function startsType(c: char): boolean {
  return ('A' <= c && c <= 'Z') || c === '_';
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
  'break',
  'case',
  'catch',
  'class',
  'const',
  'continue',
  'debugger',
  'default',
  'delete',
  'do',
  'else',
  'export',
  'extends',
  'finally',
  'for',
  'function',
  'if',
  'import',
  'in',
  'instanceof',
  'new',
  'return',
  'super',
  'switch',
  'this',
  'throw',
  'try',
  'typeof',
  'var',
  'void',
  'while',
  'with',
  'yield',
  'enum',
  'implements',
  'interface',
  'let',
  'package',
  'private',
  'protected',
  'public',
  'static',
  'yield',
  'async',
  'await',
  // Added because they look better highlighted
  'constructor',
  '=>',
];
