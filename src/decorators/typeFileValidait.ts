import { registerDecorator, ValidationOptions } from 'class-validator';

interface IsFileOptions {
  mime: string[];
}

const mime: string[] = ['image/jpg', 'image/png', 'image/jpeg', 'image/webp'];

export function IsFile(options: IsFileOptions = { mime }, validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    return registerDecorator({
      name: 'isFile',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: {
        message: `file format can only be ${options.mime.map(x => x.split('/')[1]).join(', ')}`,
        ...validationOptions,
      },
      validator: {
        validate(file: any) {
          const result = file.every(f => f?.mimetype && (options?.mime ?? []).includes(f?.mimetype));

          // const value = file[0];
          // if (value?.mimetype && (options?.mime ?? []).includes(value?.mimetype)) {
          //   return true;
          // }
          // return false;

          return result;
        },
      },
    });
  };
}
