// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const characterStream_1 = require("./characterStream");
const textRangeCollection_1 = require("./textRangeCollection");
const types_1 = require("./types");
var QuoteType;
(function (QuoteType) {
    QuoteType[QuoteType["None"] = 0] = "None";
    QuoteType[QuoteType["Single"] = 1] = "Single";
    QuoteType[QuoteType["Double"] = 2] = "Double";
    QuoteType[QuoteType["TripleSingle"] = 3] = "TripleSingle";
    QuoteType[QuoteType["TripleDouble"] = 4] = "TripleDouble";
})(QuoteType || (QuoteType = {}));
class Token extends types_1.TextRange {
    constructor(type, start, length) {
        super(start, length);
        this.type = type;
    }
}
class Tokenizer {
    constructor() {
        this.tokens = [];
    }
    Tokenize(text, start, length) {
        if (start === undefined) {
            start = 0;
        }
        else if (start < 0 || start >= text.length) {
            throw new Error('Invalid range start');
        }
        if (length === undefined) {
            length = text.length;
        }
        else if (length < 0 || start + length >= text.length) {
            throw new Error('Invalid range length');
        }
        this.cs = new characterStream_1.CharacterStream(text);
        this.cs.position = start;
        const end = start + length;
        while (!this.cs.isEndOfStream()) {
            this.AddNextToken();
            if (this.cs.position >= end) {
                break;
            }
        }
        return new textRangeCollection_1.TextRangeCollection(this.tokens);
    }
    AddNextToken() {
        this.cs.skipWhitespace();
        if (this.cs.isEndOfStream()) {
            return;
        }
        if (!this.handleCharacter()) {
            this.cs.moveNext();
        }
    }
    handleCharacter() {
        const quoteType = this.getQuoteType();
        if (quoteType !== QuoteType.None) {
            this.handleString(quoteType);
            return true;
        }
        switch (this.cs.currentChar) {
            case 35 /* Hash */:
                this.handleComment();
                break;
            default:
                break;
        }
        return false;
    }
    handleComment() {
        const start = this.cs.position;
        this.cs.skipToEol();
        this.tokens.push(new Token(types_1.TokenType.Comment, start, this.cs.position - start));
    }
    getQuoteType() {
        if (this.cs.currentChar === 39 /* SingleQuote */) {
            return this.cs.nextChar === 39 /* SingleQuote */ && this.cs.lookAhead(2) === 39 /* SingleQuote */
                ? QuoteType.TripleSingle
                : QuoteType.Single;
        }
        if (this.cs.currentChar === 34 /* DoubleQuote */) {
            return this.cs.nextChar === 34 /* DoubleQuote */ && this.cs.lookAhead(2) === 34 /* DoubleQuote */
                ? QuoteType.TripleDouble
                : QuoteType.Double;
        }
        return QuoteType.None;
    }
    handleString(quoteType) {
        const start = this.cs.position;
        if (quoteType === QuoteType.Single || quoteType === QuoteType.Double) {
            this.cs.moveNext();
            this.skipToSingleEndQuote(quoteType === QuoteType.Single
                ? 39 /* SingleQuote */
                : 34 /* DoubleQuote */);
        }
        else {
            this.cs.advance(3);
            this.skipToTripleEndQuote(quoteType === QuoteType.TripleSingle
                ? 39 /* SingleQuote */
                : 34 /* DoubleQuote */);
        }
        this.tokens.push(new Token(types_1.TokenType.String, start, this.cs.position - start));
    }
    skipToSingleEndQuote(quote) {
        while (!this.cs.isEndOfStream() && this.cs.currentChar !== quote) {
            this.cs.moveNext();
        }
        this.cs.moveNext();
    }
    skipToTripleEndQuote(quote) {
        while (!this.cs.isEndOfStream() && (this.cs.currentChar !== quote || this.cs.nextChar !== quote || this.cs.lookAhead(2) !== quote)) {
            this.cs.moveNext();
        }
        this.cs.advance(3);
    }
}
exports.Tokenizer = Tokenizer;
//# sourceMappingURL=tokenizer.js.map