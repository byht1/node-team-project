import { registerDecorator, ValidationArguments } from 'class-validator';
import { parse } from 'date-fns';

export function IsDateFormatWhithinRange(format: string, minDate?: string, maxDate?: string) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'IsDateFormatWhithinRange',
      target: object.constructor,
      propertyName: propertyName,
      validator: {
        validate(value: any) {
          if (value === undefined || value === null || value === '') {
            return true;
          }
          const parsedDate = parse(value, format, new Date());
          const isValidFormat = parsedDate && !isNaN(parsedDate.getTime()) && value === parsedDate.toLocaleDateString();
          if (!isValidFormat) {
            return false;
          }
          if (minDate) {
            const parsedMinDate = parse(minDate, format, new Date());
            if (parsedDate < parsedMinDate) {
              return false;
            }
          }
          if (maxDate) {
            const parsedMaxDate = parse(maxDate, format, new Date());
            if (parsedDate > parsedMaxDate) {
              return false;
            }
          }
          return true;
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} must be a valid date in the format ${format} and whithin range ${minDate} and ${maxDate}`;
        },
      },
    });
  };
}
