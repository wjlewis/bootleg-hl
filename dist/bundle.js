/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/common.ts":
/*!***********************!*\
  !*** ./src/common.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"ClassName\": () => (/* binding */ ClassName),\n/* harmony export */   \"classNameToString\": () => (/* binding */ classNameToString),\n/* harmony export */   \"Peekable\": () => (/* binding */ Peekable),\n/* harmony export */   \"isWhitespaceChar\": () => (/* binding */ isWhitespaceChar),\n/* harmony export */   \"isDigit\": () => (/* binding */ isDigit)\n/* harmony export */ });\nvar ClassName;\n(function (ClassName) {\n    ClassName[ClassName[\"Punc\"] = 0] = \"Punc\";\n    ClassName[ClassName[\"Kw\"] = 1] = \"Kw\";\n    ClassName[ClassName[\"Op\"] = 2] = \"Op\";\n    ClassName[ClassName[\"Ident\"] = 3] = \"Ident\";\n    ClassName[ClassName[\"Type\"] = 4] = \"Type\";\n    ClassName[ClassName[\"Num\"] = 5] = \"Num\";\n    ClassName[ClassName[\"String\"] = 6] = \"String\";\n    ClassName[ClassName[\"Comment\"] = 7] = \"Comment\";\n    ClassName[ClassName[\"Unknown\"] = 8] = \"Unknown\";\n})(ClassName || (ClassName = {}));\nfunction classNameToString(klass) {\n    var _a;\n    return (_a = {},\n        _a[ClassName.Punc] = 'punc',\n        _a[ClassName.Kw] = 'kw',\n        _a[ClassName.Op] = 'op',\n        _a[ClassName.Ident] = 'ident',\n        _a[ClassName.Type] = 'type',\n        _a[ClassName.Num] = 'num',\n        _a[ClassName.String] = 'string',\n        _a[ClassName.Comment] = 'comment',\n        _a[ClassName.Unknown] = 'unknown',\n        _a)[klass];\n}\nvar Peekable = /** @class */ (function () {\n    function Peekable(source) {\n        this.source = source;\n        this.pos = 0;\n    }\n    Object.defineProperty(Peekable.prototype, \"isDone\", {\n        get: function () {\n            return this.pos >= this.source.length;\n        },\n        enumerable: false,\n        configurable: true\n    });\n    Peekable.prototype.pop = function () {\n        return this.source[this.pos++];\n    };\n    Peekable.prototype.peek = function () {\n        return this.source[this.pos];\n    };\n    Peekable.prototype.popWhile = function (test) {\n        while (test(this.source[this.pos])) {\n            this.pos++;\n        }\n    };\n    Peekable.prototype.eatString = function (quote) {\n        if (quote === void 0) { quote = '\"'; }\n        var escapeNext = false;\n        while (!this.isDone) {\n            var c = this.peek();\n            if (c == '\\\\' && !escapeNext) {\n                escapeNext = true;\n                this.pop();\n            }\n            else if (c == quote && !escapeNext) {\n                this.pop();\n                return;\n            }\n            else if (c === '\\n' || c === '\\r') {\n                return;\n            }\n            else {\n                escapeNext = false;\n                this.pop();\n            }\n        }\n    };\n    Peekable.prototype.eatInlineComment = function () {\n        var _this = this;\n        this.popWhile(function (c) { return !_this.isDone && !'\\n\\r'.includes(c); });\n    };\n    Peekable.prototype.eatWhitespace = function () {\n        this.popWhile(isWhitespaceChar);\n    };\n    Peekable.prototype.eatNumber = function () {\n        this.popWhile(isDigit);\n    };\n    return Peekable;\n}());\n\nfunction isWhitespaceChar(c) {\n    return ' \\t\\r\\n'.includes(c);\n}\nfunction isDigit(c) {\n    return '0' <= c && c <= '9';\n}\n\n\n//# sourceURL=webpack://bootleg-hl/./src/common.ts?");

/***/ }),

/***/ "./src/haskell.ts":
/*!************************!*\
  !*** ./src/haskell.ts ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ haskell)\n/* harmony export */ });\n/* harmony import */ var _common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./common */ \"./src/common.ts\");\n\nfunction haskell(source) {\n    var tokens = [];\n    var chars = new _common__WEBPACK_IMPORTED_MODULE_0__.Peekable(source);\n    while (!chars.isDone) {\n        var start = chars.pos;\n        var className = void 0;\n        var c = chars.pop();\n        if ('[]()'.includes(c)) {\n            className = _common__WEBPACK_IMPORTED_MODULE_0__.ClassName.Punc;\n        }\n        else if (c === '\"') {\n            chars.eatString();\n            className = _common__WEBPACK_IMPORTED_MODULE_0__.ClassName.String;\n        }\n        else if (c === '-' && chars.peek() === '-') {\n            chars.eatInlineComment();\n            className = _common__WEBPACK_IMPORTED_MODULE_0__.ClassName.Comment;\n        }\n        else if (isInfixIdentChar(c)) {\n            chars.popWhile(isInfixIdentChar);\n            className = _common__WEBPACK_IMPORTED_MODULE_0__.ClassName.Op;\n        }\n        else if ((0,_common__WEBPACK_IMPORTED_MODULE_0__.isWhitespaceChar)(c)) {\n            chars.eatWhitespace();\n        }\n        else if (startsIdent(c)) {\n            chars.popWhile(continuesName);\n            className = _common__WEBPACK_IMPORTED_MODULE_0__.ClassName.Ident;\n        }\n        else if (startsType(c)) {\n            chars.popWhile(continuesName);\n            className = _common__WEBPACK_IMPORTED_MODULE_0__.ClassName.Type;\n        }\n        else if ((0,_common__WEBPACK_IMPORTED_MODULE_0__.isDigit)(c)) {\n            chars.eatNumber();\n            className = _common__WEBPACK_IMPORTED_MODULE_0__.ClassName.Num;\n        }\n        else {\n            className = _common__WEBPACK_IMPORTED_MODULE_0__.ClassName.Unknown;\n        }\n        var text = source.slice(start, chars.pos);\n        if (keywords.includes(text)) {\n            className = _common__WEBPACK_IMPORTED_MODULE_0__.ClassName.Kw;\n        }\n        tokens.push({ text: text, className: className });\n    }\n    return tokens;\n}\nfunction isInfixIdentChar(c) {\n    return '+-*/:<>$@!=.~'.includes(c);\n}\nfunction startsIdent(c) {\n    return ('a' <= c && c <= 'z') || c === '_';\n}\nfunction startsType(c) {\n    return 'A' <= c && c <= 'Z';\n}\nfunction continuesName(c) {\n    return (('a' <= c && c <= 'z') ||\n        ('A' <= c && c <= 'Z') ||\n        ('0' <= c && c <= '9') ||\n        c === '_');\n}\nvar keywords = [\n    'case',\n    'of',\n    'class',\n    'data',\n    'instance',\n    'default',\n    'deriving',\n    'do',\n    'forall',\n    'hiding',\n    'if',\n    'then',\n    'else',\n    'import',\n    'infix',\n    'infixl',\n    'infixr',\n    'let',\n    'in',\n    'module',\n    'newtype',\n    'qualified',\n    'as',\n    'type',\n    'where',\n];\n\n\n//# sourceURL=webpack://bootleg-hl/./src/haskell.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./common */ \"./src/common.ts\");\n/* harmony import */ var _haskell__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./haskell */ \"./src/haskell.ts\");\n/* harmony import */ var _racket__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./racket */ \"./src/racket.ts\");\n/* harmony import */ var _typescript__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./typescript */ \"./src/typescript.ts\");\n\n\n\n\nfunction main() {\n    var languages = [\n        { name: 'haskell', lexer: _haskell__WEBPACK_IMPORTED_MODULE_1__.default },\n        { name: 'racket', lexer: _racket__WEBPACK_IMPORTED_MODULE_2__.default },\n        { name: 'typescript', lexer: _typescript__WEBPACK_IMPORTED_MODULE_3__.default },\n    ];\n    languages.forEach(function (_a) {\n        var name = _a.name, lexer = _a.lexer;\n        return hlLanguage(name, lexer);\n    });\n}\nfunction hlLanguage(name, lexer) {\n    var snippets = document.getElementsByClassName(\"hl-\" + name);\n    var _loop_1 = function (i) {\n        var snippet = snippets[i];\n        if (snippet.nodeName === 'CODE' &&\n            snippet.firstChild &&\n            snippet.firstChild.nodeType === Node.TEXT_NODE) {\n            var sourceText = snippet.innerText;\n            var tokens = lexer(sourceText.trim());\n            var tokenElts = tokens.map(function (token) {\n                if (token.className !== undefined) {\n                    var elt = document.createElement('span');\n                    elt.classList.add((0,_common__WEBPACK_IMPORTED_MODULE_0__.classNameToString)(token.className));\n                    elt.innerText = token.text;\n                    return elt;\n                }\n                else {\n                    return document.createTextNode(token.text);\n                }\n            });\n            snippet.innerHTML = '';\n            tokenElts.forEach(function (elt) { return snippet.appendChild(elt); });\n        }\n    };\n    for (var i = 0; i < snippets.length; i++) {\n        _loop_1(i);\n    }\n}\nmain();\n\n\n//# sourceURL=webpack://bootleg-hl/./src/index.ts?");

/***/ }),

/***/ "./src/racket.ts":
/*!***********************!*\
  !*** ./src/racket.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ racket)\n/* harmony export */ });\n/* harmony import */ var _common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./common */ \"./src/common.ts\");\n\nfunction racket(source) {\n    var tokens = [];\n    var chars = new _common__WEBPACK_IMPORTED_MODULE_0__.Peekable(source);\n    while (!chars.isDone) {\n        var start = chars.pos;\n        var className = void 0;\n        var c = chars.pop();\n        if ('()[]'.includes(c)) {\n            className = _common__WEBPACK_IMPORTED_MODULE_0__.ClassName.Punc;\n        }\n        else if (c === ';') {\n            chars.eatInlineComment();\n            className = _common__WEBPACK_IMPORTED_MODULE_0__.ClassName.Comment;\n        }\n        else if (c === '\"') {\n            chars.eatString();\n            className = _common__WEBPACK_IMPORTED_MODULE_0__.ClassName.String;\n        }\n        else if (startsIdent(c)) {\n            chars.popWhile(continuesIdent);\n            className = _common__WEBPACK_IMPORTED_MODULE_0__.ClassName.Ident;\n        }\n        else if ((0,_common__WEBPACK_IMPORTED_MODULE_0__.isDigit)(c)) {\n            chars.eatNumber();\n            className = _common__WEBPACK_IMPORTED_MODULE_0__.ClassName.Num;\n        }\n        else if ((0,_common__WEBPACK_IMPORTED_MODULE_0__.isWhitespaceChar)(c)) {\n            chars.eatWhitespace();\n        }\n        else {\n            className = _common__WEBPACK_IMPORTED_MODULE_0__.ClassName.Unknown;\n        }\n        var text = source.slice(start, chars.pos);\n        if (keywords.includes(text)) {\n            className = _common__WEBPACK_IMPORTED_MODULE_0__.ClassName.Kw;\n        }\n        tokens.push({ text: text, className: className });\n    }\n    return tokens;\n}\nfunction startsIdent(c) {\n    return (('a' <= c && c <= 'z') || ('A' <= c && c <= 'Z') || special.includes(c));\n}\nvar special = '+-*/<>=!$^&:?#';\nfunction continuesIdent(c) {\n    return startsIdent(c) || (0,_common__WEBPACK_IMPORTED_MODULE_0__.isDigit)(c);\n}\nvar keywords = [\n    'define',\n    'lambda',\n    'if',\n    'let',\n    'let*',\n    'match',\n    'else',\n    '#lang',\n    '#t',\n    '#f',\n    'require',\n    '`',\n    ',',\n    ',@',\n];\n\n\n//# sourceURL=webpack://bootleg-hl/./src/racket.ts?");

/***/ }),

/***/ "./src/typescript.ts":
/*!***************************!*\
  !*** ./src/typescript.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ typescript)\n/* harmony export */ });\n/* harmony import */ var _common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./common */ \"./src/common.ts\");\n\nfunction typescript(source) {\n    var tokens = [];\n    var chars = new _common__WEBPACK_IMPORTED_MODULE_0__.Peekable(source);\n    while (!chars.isDone) {\n        var start = chars.pos;\n        var className = void 0;\n        var c = chars.pop();\n        if ('[](){}<>.,:?;'.includes(c)) {\n            className = _common__WEBPACK_IMPORTED_MODULE_0__.ClassName.Punc;\n        }\n        else if ('\"\\'`'.includes(c)) {\n            chars.eatString(c);\n            className = _common__WEBPACK_IMPORTED_MODULE_0__.ClassName.String;\n        }\n        else if (c === '/' && chars.peek() === '/') {\n            chars.eatInlineComment();\n            className = _common__WEBPACK_IMPORTED_MODULE_0__.ClassName.Comment;\n        }\n        else if ('+-*/%^='.includes(c)) {\n            className = _common__WEBPACK_IMPORTED_MODULE_0__.ClassName.Op;\n        }\n        else if ((0,_common__WEBPACK_IMPORTED_MODULE_0__.isWhitespaceChar)(c)) {\n            chars.eatWhitespace();\n        }\n        else if (startsIdent(c)) {\n            chars.popWhile(continuesName);\n            className = _common__WEBPACK_IMPORTED_MODULE_0__.ClassName.Ident;\n        }\n        else if (startsType(c)) {\n            chars.popWhile(continuesName);\n            className = _common__WEBPACK_IMPORTED_MODULE_0__.ClassName.Type;\n        }\n        else if ((0,_common__WEBPACK_IMPORTED_MODULE_0__.isDigit)(c)) {\n            chars.eatNumber();\n            className = _common__WEBPACK_IMPORTED_MODULE_0__.ClassName.Num;\n        }\n        else {\n            className = _common__WEBPACK_IMPORTED_MODULE_0__.ClassName.Unknown;\n        }\n        var text = source.slice(start, chars.pos);\n        if (keywords.includes(text)) {\n            className = _common__WEBPACK_IMPORTED_MODULE_0__.ClassName.Kw;\n        }\n        tokens.push({ text: text, className: className });\n    }\n    return tokens;\n}\nfunction startsIdent(c) {\n    return ('a' <= c && c <= 'z') || c === '_';\n}\nfunction startsType(c) {\n    return ('A' <= c && c <= 'Z') || c === '_';\n}\nfunction continuesName(c) {\n    return (('a' <= c && c <= 'z') ||\n        ('A' <= c && c <= 'Z') ||\n        ('0' <= c && c <= '9') ||\n        c === '_');\n}\nvar keywords = [\n    'break',\n    'case',\n    'catch',\n    'class',\n    'const',\n    'continue',\n    'debugger',\n    'default',\n    'delete',\n    'do',\n    'else',\n    'export',\n    'extends',\n    'finally',\n    'for',\n    'function',\n    'if',\n    'import',\n    'in',\n    'instanceof',\n    'new',\n    'return',\n    'super',\n    'switch',\n    'this',\n    'throw',\n    'try',\n    'typeof',\n    'var',\n    'void',\n    'while',\n    'with',\n    'yield',\n    'enum',\n    'implements',\n    'interface',\n    'let',\n    'package',\n    'private',\n    'protected',\n    'public',\n    'static',\n    'yield',\n    'async',\n    'await',\n];\n\n\n//# sourceURL=webpack://bootleg-hl/./src/typescript.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ 	
/******/ })()
;