import { registerDecorator, ValidationOptions } from 'class-validator';
import { subtract } from 'date-and-time';

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
          const date = value.split('.');

          const dateNumber: number[] = [];

          if (date.length !== 3) {
            return false;
          }

          for (let i = 0; i < date.length; i += 1) {
            const length = date[i].length;
            if (i === 2) {
              if (length !== 4) return false;
            }
            if (length !== 2 && i !== 2) return false;

            const number = Number(date[i]);

            if (!number) return false;

            dateNumber.push(number);
          }

          const [day, month, year] = dateNumber;

          const yesterday = new Date();
          const min = new Date('1900-01-01');
          const dataUser = new Date(year, month - 1, day + 1);
          const difference = subtract(dataUser, yesterday).toDays();
          const minDifference = subtract(dataUser, min).toDays();

          if (difference > 0 || minDifference < 0) return false;

          return true;
        },
      },
    });
  };
}
