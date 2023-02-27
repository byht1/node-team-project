/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype" />
import { Response } from 'express';
import { Users } from 'src/db-schema/user.schema';
import { IRequestUser } from 'src/type/req';
import { AuthService } from './auth.service';
import { EmailDto, LogInDto, NewPasswordDto, NewUserDto, QueryCurrentDto, RefreshTokenDto, TokenForgotenPasswordDto } from './dto';
import { ConfigService } from '@nestjs/config';
export declare class AuthController {
    private authService;
    private configService;
    constructor(authService: AuthService, configService: ConfigService);
    signUp(newUserDto: NewUserDto, response: Response): Promise<import("./type").TResUserAuth>;
    isUseEmail(email: EmailDto): Promise<void>;
    logIn(logInDto: LogInDto): Promise<import("./type").TResUserAuth>;
    logOut(req: IRequestUser, { refresh_token }: RefreshTokenDto): Promise<void>;
    refresh({ refresh_token }: RefreshTokenDto): Promise<string>;
    current(req: IRequestUser, { type, fields }: QueryCurrentDto): Promise<import("./type").TResUserAuth | (import("mongoose").Document<unknown, any, import("src/db-schema/user.schema").UsersDocument> & Users & Document & Required<{
        _id: import("mongoose").Schema.Types.ObjectId;
    }>)>;
    googleLogin(): void;
    googleLoginCallback(req: any, response: Response): Promise<void>;
    passwordChangeRequest(body: EmailDto): Promise<void>;
    passwordChangeRequestError({ token }: TokenForgotenPasswordDto, response: Response): Promise<void>;
    passwordChangeNewPassword(req: IRequestUser, body: NewPasswordDto): Promise<import("./type").TResUserAuth>;
}
