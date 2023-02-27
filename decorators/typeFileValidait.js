"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsFile = void 0;
const class_validator_1 = require("class-validator");
const mime = ['image/jpg', 'image/png', 'image/jpeg', 'image/webp'];
function IsFile(options = { mime }, validationOptions) {
    return function (object, propertyName) {
        return (0, class_validator_1.registerDecorator)({
            name: 'isFile',
            target: object.constructor,
            propertyName: propertyName,
            constraints: [],
            options: Object.assign({ message: `file format can only be ${options.mime.map(x => x.split('/')[1]).join(', ')}` }, validationOptions),
            validator: {
                validate(file) {
                    return file && file.every(f => { var _a; return (f === null || f === void 0 ? void 0 : f.mimetype) && ((_a = options === null || options === void 0 ? void 0 : options.mime) !== null && _a !== void 0 ? _a : []).includes(f === null || f === void 0 ? void 0 : f.mimetype); });
                },
            },
        });
    };
}
exports.IsFile = IsFile;
//# sourceMappingURL=typeFileValidait.js.map