import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Users, UsersDocument } from 'src/db-schema/user.schema';
import { validate } from 'class-validator';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(@InjectModel(Users.name) private usersModel: Model<UsersDocument>, private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const isToken = req.headers.authorization;
    let isDelete = true;

    if (!isToken) {
      throw new HttpException('Missing token', HttpStatus.FORBIDDEN);
    }

    const [bearer, token] = isToken.split(' ');

    if (bearer !== 'Bearer' || !token) {
      throw new HttpException('Invalid token', HttpStatus.FORBIDDEN);
    }

    try {
      const isValidToken = await this.jwtService.verify(token, {
        secret: process.env.ACCESS_SECRET_KEY,
      });

      const user = await this.usersModel.findById(isValidToken.id);

      if (!user || !user.access_token.find(x => x.token === token)) {
        user.access_token.filter(x => x !== token);
        user.save();
        isDelete = false;
        throw new HttpException('Invalid token', HttpStatus.FORBIDDEN);
      }
      req.user = user;
      req.access_token = token;
      return true;
    } catch (error) {
      const payload = this.jwtService.decode(token);

      if (typeof payload === 'string' || !payload?.id) {
        throw new HttpException('Invalid token', HttpStatus.FORBIDDEN);
      }

      if (isDelete) {
        const user = await this.usersModel.findById(payload.id);

        user.access_token = user.access_token.filter(x => x.token !== token);
        user.save();
      }

      throw new HttpException('Invalid token', HttpStatus.FORBIDDEN);
    }
  }
}
