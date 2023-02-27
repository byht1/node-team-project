"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsFileSize = void 0;
const class_validator_1 = require("class-validator");
function IsFileSize(options, validationOptions) {
    const size = options ? options : 5000000;
    return function (object, propertyName) {
        return (0, class_validator_1.registerDecorator)({
            name: 'IsFileSize',
            target: object.constructor,
            propertyName: propertyName,
            constraints: [],
            options: Object.assign({ message: `The file is required and size cannot be larger than ${size / 1000000}MB` }, validationOptions),
            validator: {
                validate(file) {
                    return file && file.every(f => (f === null || f === void 0 ? void 0 : f.size) <= size);
                },
            },
        });
    };
}
exports.IsFileSize = IsFileSize;
//# sourceMappingURL=sizeFileValidate.js.map