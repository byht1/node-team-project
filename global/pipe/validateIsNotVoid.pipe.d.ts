import { PipeTransform } from '@nestjs/common';
export declare class ValidateIsNotVoid implements PipeTransform {
    transform(payload: any): Promise<any>;
}
