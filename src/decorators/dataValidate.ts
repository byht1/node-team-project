import { registerDecorator, ValidationOptions } from 'class-validator';
import * as date from 'date-and-time';

export function IsValidDate(validationOptions?: ValidationOptions) {
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
          const pattern = 'DD.MM.YYYY';
          const parsedDate = date.parse(value, pattern);

          if (isNaN(parsedDate.getTime())) return false;

          const userDate = new Date(value.split('.').reverse().join('-'));
          const minDate = new Date('1900-01-01');
          const tooDay = new Date();

          const minDifference = date.subtract(userDate, minDate).toDays();
          const difference = date.subtract(userDate, tooDay).toDays();

          if (difference > -1 || minDifference < 0) return false;

          return true;
        },
      },
    });
  };
}
