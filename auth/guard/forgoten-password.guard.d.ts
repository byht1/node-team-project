import { CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import { UsersDocument } from 'src/db-schema/user.schema';
export declare class ForgotenPasswordGuard implements CanActivate {
    private usersModel;
    private jwtService;
    constructor(usersModel: Model<UsersDocument>, jwtService: JwtService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
