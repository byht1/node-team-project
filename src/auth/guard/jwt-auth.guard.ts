import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Users, UsersDocument } from 'src/db-schema/user.schema';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    @InjectModel(Users.name) private usersModel: Model<UsersDocument>,
    private jwtService: JwtService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();

    try {
      const [bearer, token] = req.headers.authorization.split(' ');

      if (bearer !== 'Bearer' || !token) {
        throw new HttpException('Не валідний токен', HttpStatus.FORBIDDEN);
      }

      const isValidToken = this.jwtService.verify(token, {
        secret: process.env.ASSES_SECRET_KEY,
      });

      const user = await this.usersModel.findById(isValidToken.id);

      if (!user || !user.asses_token.includes(token)) {
        user.asses_token.filter(x => x !== token);
        user.save();
        throw new HttpException('Не валідний токен', HttpStatus.FORBIDDEN);
      }

      req.user = user;
      req.asses_token = token;

      return true;
    } catch (error) {
      throw new HttpException('Не валідний токен', HttpStatus.FORBIDDEN);
    }
  }
}
