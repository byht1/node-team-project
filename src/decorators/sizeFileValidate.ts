import { registerDecorator, ValidationOptions } from 'class-validator';

export function IsFileSize(options?: number, validationOptions?: ValidationOptions) {
  const size = options ? options : 5000000;
  return function (object: any, propertyName: string) {
    console.log(22222222222, "options", options)
    return registerDecorator({
      name: 'IsFileSize',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: {
        message: `The file size cannot be larger than ${size / 1000000}MB`,
        ...validationOptions,
      },
      validator: {
        validate(file: any) {
          const result = file.every(f => f?.size <= size);
          // const value = file[0];
          // if (value?.size <= size) {
          //   return true;
          // }
          // return false;
          if (!result) {
            console.log("result in file size validation: ", result)
          }
          return result;
        },
      },
    });
  };
}
