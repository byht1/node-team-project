import { registerDecorator, ValidationOptions } from 'class-validator';
import * as date from 'date-and-time';

export function IsValidDate(format?: string, min?: Date, max?: Date, validationOptions?: ValidationOptions) {
  const pattern = format ? format : 'DD.MM.YYYY';
  const minDate = min ? min : new Date('1900-01-01');
  const maxDate = max ? max : new Date();

  return function (object: any, propertyName: string) {
    return registerDecorator({
      name: 'IsValidDate',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: {
        message: 'The date is not valid',
        ...validationOptions,
      },
      validator: {
        validate(value: string) {
          const parsedDate = date.parse(value, pattern);

          if (isNaN(parsedDate.getTime())) return false;

          const userDate = new Date(value.split('.').reverse().join('-'));

          const minDifference = date.subtract(userDate, minDate).toDays();
          const difference = date.subtract(userDate, maxDate).toDays();

          if (difference > 0 || minDifference < 0) return false;

          return true;
        },
      },
    });
  };
}
