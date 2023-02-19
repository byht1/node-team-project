import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

import { ValidationException } from 'src/global/exceptions/validation.exception';

@Injectable()
export class ValidatePipe implements PipeTransform {
  async transform(value: any, metadata: ArgumentMetadata): Promise<any> {
    // console.log(1)
    // console.log('value:', value)
    // console.log('metadata:', metadata)
    if (!value) throw new ValidationException('The request body cannot be empty');
    // console.log(2)
    const obj = plainToClass(metadata.metatype, value);
    console.log("obj: ", obj)
    const errors = await validate(obj);
    console.log("errors after await validate: ", errors)

    if (errors.length) {
      // console.log(3)
      console.log("errors:", errors)
      const messages = errors.reduce((acc, err) => {
        acc[err.property] = Object.values(err.constraints).join(', ');
        console.log('acc:', acc)
        return acc;
      }, {});
      throw new ValidationException(messages);
    }

    return value;
  }
}
