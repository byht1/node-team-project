import { ArgumentMetadata, PipeTransform } from '@nestjs/common';
export declare class ValidatePipe implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata): Promise<any>;
}
