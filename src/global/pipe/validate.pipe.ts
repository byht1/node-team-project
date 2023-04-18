import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

import { ValidationException } from 'src/global/exceptions/validation.exception';

@Injectable()
export class ValidatePipe implements PipeTransform {
  async transform(value: any, metadata: ArgumentMetadata): Promise<any> {
    try {
      if (!value) throw new ValidationException('The request body cannot be empty');
      if (typeof value !== 'object') return value;
    console.log('value:', value)
    const obj = plainToClass(metadata.metatype, value);
    console.log('obj:', obj)
    const errors = await validate(obj);

    if (errors.length) {
      console.log("errors:", errors)
      const messages = errors.reduce((acc, err) => {
        acc[err.property] = Object.values(err.constraints).join(', ');
        return acc;
      }, {});
      console.log('messages:', messages)
      throw new ValidationException(messages);
    }

    return value;
    } catch (error) {
      console.log("error in catch: ", error)
    }
  }
}
