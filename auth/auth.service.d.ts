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
/// <reference types="mongoose/types/inferschematype" />
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import { Users, UsersDocument } from 'src/db-schema/user.schema';
import { EmailDto, GoogleAuthDto, LogInDto, NewPasswordDto, NewUserDto } from './dto';
import { TResUserAuth, TTokens } from './type';
import { UserService } from 'src/user/user.service';
import { TId } from 'src/type';
import { EmailMessageService } from 'src/email-message/email-message.service';
export declare enum ETypeOperation {
    GOOGLE = "google",
    PASSWORD = "password"
}
export declare class AuthService {
    private usersModel;
    private usersService;
    private jwtService;
    private emailMessage;
    constructor(usersModel: Model<UsersDocument>, usersService: UserService, jwtService: JwtService, emailMessage: EmailMessageService);
    signUp(newUserDto: NewUserDto): Promise<TResUserAuth>;
    isUseEmail({ email }: EmailDto): Promise<void>;
    logIn(logInDto: LogInDto): Promise<TResUserAuth>;
    logOut(user: UsersDocument, accessToken: string, refreshToken: string): Promise<void>;
    refresh(refreshToken: string): Promise<string>;
    googleLogin(googleAuthDto: GoogleAuthDto): Promise<TTokens>;
    current(id: TId, type: string, fields: string): Promise<TResUserAuth | (import("mongoose").Document<unknown, any, UsersDocument> & Users & Document & Required<{
        _id: import("mongoose").Schema.Types.ObjectId;
    }>)>;
    passwordChangeRequest({ email }: EmailDto): Promise<void>;
    forgottenPasswordError(token: string): Promise<void>;
    passwordChangeNewPassword({ password }: NewPasswordDto, userId: TId): Promise<TResUserAuth>;
    private forgottenPasswordUserSearch;
    private forgottenPasswordDecode;
    private avatarGenerator;
    private generatorToken;
    private generatorTokens;
    private hashPassword;
    private passwordIsValid;
    private normalizeData;
    private clearTokens;
}
