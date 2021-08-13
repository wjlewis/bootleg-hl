export interface Lexer {
  (source: string): Token[];
}

export interface Token {
  text: string;
  className?: ClassName;
}

export enum ClassName {
  Punc,
  Kw,
  Op,
  Ident,
  Type,
  Num,
  String,
  Comment,
  Unknown,
}

export function classNameToString(klass: ClassName) {
  return {
    [ClassName.Punc]: 'punc',
    [ClassName.Kw]: 'kw',
    [ClassName.Op]: 'op',
    [ClassName.Ident]: 'ident',
    [ClassName.Type]: 'type',
    [ClassName.Num]: 'num',
    [ClassName.String]: 'string',
    [ClassName.Comment]: 'comment',
    [ClassName.Unknown]: 'unknown',
  }[klass];
}

export class Peekable {
  public pos: number;

  constructor(private source: string) {
    this.pos = 0;
  }

  get isDone(): boolean {
    return this.pos >= this.source.length;
  }

  pop(): char {
    return this.source[this.pos++];
  }

  peek(): char {
    return this.source[this.pos];
  }

  popWhile(test: (c: char) => boolean) {
    while (test(this.source[this.pos])) {
      this.pos++;
    }
  }

  eatString() {
    let escapeNext = false;
    while (!this.isDone) {
      const c = this.peek();
      if (c == '\\' && !escapeNext) {
        escapeNext = true;
        this.pop();
      } else if (c == '"' && !escapeNext) {
        this.pop();
        return;
      } else if (c === '\n' || c === '\r') {
        return;
      } else {
        escapeNext = false;
        this.pop();
      }
    }
  }

  eatInlineComment() {
    this.popWhile(c => !'\n\r'.includes(c));
  }

  eatWhitespace() {
    this.popWhile(isWhitespaceChar);
  }

  eatNumber() {
    this.popWhile(isDigit);
  }
}

export function isWhitespaceChar(c: char): boolean {
  return ' \t\r\n'.includes(c);
}

export function isDigit(c: char): boolean {
  return '0' <= c && c <= '9';
}

export type char = string;
