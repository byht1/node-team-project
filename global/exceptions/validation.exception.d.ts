import { HttpException } from '@nestjs/common';
export declare class ValidationException extends HttpException {
    messages: any;
    constructor(response: any);
}
