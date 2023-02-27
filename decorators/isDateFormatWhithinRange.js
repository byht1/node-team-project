"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsDateFormatWhithinRange = void 0;
const class_validator_1 = require("class-validator");
const date_fns_1 = require("date-fns");
function IsDateFormatWhithinRange(format, minDate, maxDate) {
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            name: 'IsDateFormatWhithinRange',
            target: object.constructor,
            propertyName: propertyName,
            validator: {
                validate(value) {
                    if (value === undefined || value === null || value === '') {
                        return true;
                    }
                    const parsedDate = (0, date_fns_1.parse)(value, format, new Date());
                    const isValidFormat = parsedDate && !isNaN(parsedDate.getTime()) && value === parsedDate.toLocaleDateString();
                    if (!isValidFormat) {
                        return false;
                    }
                    if (minDate) {
                        const parsedMinDate = (0, date_fns_1.parse)(minDate, format, new Date());
                        if (parsedDate < parsedMinDate) {
                            return false;
                        }
                    }
                    if (maxDate) {
                        const parsedMaxDate = (0, date_fns_1.parse)(maxDate, format, new Date());
                        if (parsedDate > parsedMaxDate) {
                            return false;
                        }
                    }
                    return true;
                },
                defaultMessage(args) {
                    return `${args.property} must be a valid date in the format ${format} and whithin range ${minDate} and ${maxDate}`;
                },
            },
        });
    };
}
exports.IsDateFormatWhithinRange = IsDateFormatWhithinRange;
//# sourceMappingURL=isDateFormatWhithinRange.js.map