"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsValidDate = void 0;
const class_validator_1 = require("class-validator");
const date = require("date-and-time");
function IsValidDate({ pattern = 'DD.MM.YYYY', minDate = new Date('1900-01-01'), maxDate = new Date() }, validationOptions) {
    return function (object, propertyName) {
        return (0, class_validator_1.registerDecorator)({
            name: 'IsValidDate',
            target: object.constructor,
            propertyName: propertyName,
            constraints: [],
            options: Object.assign({ message: 'The date is not valid' }, validationOptions),
            validator: {
                validate(value) {
                    const parsedDate = date.parse(value, pattern);
                    if (isNaN(parsedDate.getTime()))
                        return false;
                    const userDate = new Date(value.split('.').reverse().join('-'));
                    const minDifference = date.subtract(userDate, minDate).toDays();
                    const difference = date.subtract(userDate, maxDate).toDays();
                    if (difference > 0 || minDifference < 0)
                        return false;
                    return true;
                },
            },
        });
    };
}
exports.IsValidDate = IsValidDate;
//# sourceMappingURL=dataValidate.js.map