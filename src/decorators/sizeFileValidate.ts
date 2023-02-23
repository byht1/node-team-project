import { registerDecorator, ValidationOptions } from 'class-validator';

export function IsFileSize(options?: number, validationOptions?: ValidationOptions) {
  const size = options ? options : 5000000;
  return function (object: any, propertyName: string) {
    return registerDecorator({
      name: 'IsFileSize',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: {
        message: `The file is required and size cannot be larger than ${size / 1000000}MB`,
        ...validationOptions,
      },
      validator: {
        validate(file: any) {
          return file && file.every(f => f?.size <= size);

          // const value = file[0];
          // if (value?.size <= size) {
          //   return true;
          // }
          // return false;
        },
      },
    });
  };
}
