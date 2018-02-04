// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
class TextRange {
    constructor(start, length) {
        if (start < 0) {
            throw new Error('start must be non-negative');
        }
        if (length < 0) {
            throw new Error('length must be non-negative');
        }
        this.start = start;
        this.length = length;
    }
    static fromBounds(start, end) {
        return new TextRange(start, end - start);
    }
    get end() {
        return this.start + this.length;
    }
    contains(position) {
        return position >= this.start && position < this.end;
    }
}
TextRange.empty = TextRange.fromBounds(0, 0);
exports.TextRange = TextRange;
var TokenType;
(function (TokenType) {
    TokenType[TokenType["String"] = 0] = "String";
    TokenType[TokenType["Comment"] = 1] = "Comment";
})(TokenType = exports.TokenType || (exports.TokenType = {}));
//# sourceMappingURL=types.js.map