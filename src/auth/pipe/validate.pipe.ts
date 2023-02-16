import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

import { ValidationException } from 'src/exceptions/validation.exception';

@Injectable()
export class ValidatePipe implements PipeTransform {
  async transform(value: any, metadata: ArgumentMetadata) {
    const obj = plainToClass(metadata.metatype, value);
    const errors = await validate(obj);

    if (errors.length) {
      const messages = errors.reduce((acc, err) => {
        acc[err.property] = Object.values(err.constraints).join(', ');
        return acc;
      }, {});
      //   const messages = errors.map(err => {
      //     return `${err.property} - ${Object.values(err.constraints).join(', ')}`;
      //   });
      throw new ValidationException(messages);
    }

    return value;
  }
}
