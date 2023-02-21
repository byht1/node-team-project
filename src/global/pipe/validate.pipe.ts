import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

import { ValidationException } from 'src/global/exceptions/validation.exception';

@Injectable()
export class ValidatePipe implements PipeTransform {
  async transform(value: any, metadata: ArgumentMetadata): Promise<any> {
    if (!value) throw new ValidationException('The request body cannot be empty');

    const obj = plainToClass(metadata.metatype, value);
    const errors = await validate(obj);

    if (errors.length) {
      console.log('errors: ', errors)
      const messages = errors.reduce((acc, err) => {
        acc[err.property] = Object.values(err.constraints).join(', ');
        return acc;
      }, {});
      throw new ValidationException(messages);
    }

    return value;
  }
}
