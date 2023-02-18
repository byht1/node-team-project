import { Injectable, PipeTransform } from '@nestjs/common';
import { ValidationException } from '../exceptions/validation.exception';

Injectable();
export class ValidateIsNotVoid implements PipeTransform {
  transform(payload: any): any {
    if (!payload || !Object.keys(payload)?.length) {
      throw new ValidationException('The request body cannot be empty');
    }

    return payload;
  }
}
