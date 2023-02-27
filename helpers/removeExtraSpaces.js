"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeExtraSpaces = void 0;
const removeExtraSpaces = (obj) => {
    const newObj = {};
    for (const key in obj) {
        const value = obj[key];
        if (typeof value === 'string') {
            newObj[key] = value.replace(/\s+/g, ' ').trim();
        }
        else if (typeof value === 'object') {
            newObj[key] = (0, exports.removeExtraSpaces)(value);
        }
        else {
            newObj[key] = value;
        }
    }
    return newObj;
};
exports.removeExtraSpaces = removeExtraSpaces;
//# sourceMappingURL=removeExtraSpaces.js.map