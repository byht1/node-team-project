"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidateIsNotVoid = void 0;
const common_1 = require("@nestjs/common");
const validation_exception_1 = require("../exceptions/validation.exception");
(0, common_1.Injectable)();
class ValidateIsNotVoid {
    transform(payload) {
        var _a;
        if (!payload || !((_a = Object.keys(payload)) === null || _a === void 0 ? void 0 : _a.length)) {
            throw new validation_exception_1.ValidationException('The request body cannot be empty');
        }
        return payload;
    }
}
exports.ValidateIsNotVoid = ValidateIsNotVoid;
//# sourceMappingURL=validateIsNotVoid.pipe.js.map