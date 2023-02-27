import { ValidationOptions } from 'class-validator';
interface IsFileOptions {
    mime: string[];
}
export declare function IsFile(options?: IsFileOptions, validationOptions?: ValidationOptions): (object: object, propertyName: string) => void;
export {};
