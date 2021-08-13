import { Lexer, classNameToString } from './common';
import haskell from './haskell';
import racket from './racket';

function main() {
  const languages = [
    { name: 'haskell', lexer: haskell },
    { name: 'racket', lexer: racket },
  ];

  languages.forEach(({ name, lexer }) => hlLanguage(name, lexer));
}

function hlLanguage(name: string, lexer: Lexer) {
  const snippets = document.getElementsByClassName(`hl-${name}`);

  for (let i = 0; i < snippets.length; i++) {
    const snippet = snippets[i];
    if (
      snippet.nodeName === 'CODE' &&
      snippet.firstChild &&
      snippet.firstChild.nodeType === Node.TEXT_NODE
    ) {
      const sourceText = (snippet as HTMLElement).innerText;
      const tokens = lexer(sourceText.trim());

      const tokenElts = tokens.map(token => {
        if (token.className) {
          const elt = document.createElement('span');
          elt.classList.add(classNameToString(token.className));
          elt.innerText = token.text;
          return elt;
        } else {
          return document.createTextNode(token.text);
        }
      });

      snippet.innerHTML = '';
      tokenElts.forEach(elt => snippet.appendChild(elt));
    }
  }
}

main();
