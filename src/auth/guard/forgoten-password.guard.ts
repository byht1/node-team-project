import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Users, UsersDocument } from 'src/db-schema/user.schema';
import { ETypeOperation } from '../auth.service';

@Injectable()
export class ForgotenPasswordGuard implements CanActivate {
  constructor(@InjectModel(Users.name) private usersModel: Model<UsersDocument>, private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const isToken = req.headers.authorization;

    if (!isToken) {
      throw new HttpException('Missing token', HttpStatus.FORBIDDEN);
    }

    const [bearer, token] = isToken.split(' ');

    if (bearer !== 'Bearer' || !token) {
      throw new HttpException('Invalid token', HttpStatus.FORBIDDEN);
    }

    try {
      const { id, typeOperation } = this.jwtService.verify(token, {
        secret: process.env.ACCESS_SECRET_KEY,
      });

      const user = await this.usersModel.findById(id);

      if (!user || (user.forgottenPasswordToken !== token && typeOperation === ETypeOperation.PASSWORD)) {
        throw new HttpException('Invalid token', HttpStatus.FORBIDDEN);
      }

      req.user = user;
      req.access_token = token;
      req.typeOperation = typeOperation;

      return true;
    } catch (error) {
      const payload = this.jwtService.decode(token);

      if (typeof payload === 'string' || !payload?.id) {
        throw new HttpException('Invalid token', HttpStatus.FORBIDDEN);
      }

      const user = await this.usersModel.findById(payload.id);

      user.forgottenPasswordToken = null;
      user.save();

      throw new HttpException('Invalid token', HttpStatus.FORBIDDEN);
    }
  }
}
