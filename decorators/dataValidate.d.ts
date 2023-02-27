import { ValidationOptions } from 'class-validator';
type TDateParams = {
    pattern?: string;
    minDate?: Date;
    maxDate?: Date;
} | undefined;
export declare function IsValidDate({ pattern, minDate, maxDate }: TDateParams, validationOptions?: ValidationOptions): (object: any, propertyName: string) => void;
export {};
