import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Users, UsersDocument } from 'src/db-schema/user.schema';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(@InjectModel(Users.name) private usersModel: Model<UsersDocument>, private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const [bearer, token] = req.headers.authorization?.split(' ');

    try {
      if (bearer !== 'Bearer' || !token) {
        throw new HttpException('Invalid token', HttpStatus.FORBIDDEN);
      }

      const isValidToken = this.jwtService.verify(token, {
        secret: process.env.ASSES_SECRET_KEY,
      });

      const user = await this.usersModel.findById(isValidToken.id);

      if (!user || !user.asses_token.find(x => x.token === token)) {
        user.asses_token.filter(x => x !== token);
        user.save();
        throw new HttpException('Invalid token', HttpStatus.FORBIDDEN);
      }

      req.user = user;
      req.asses_token = token;

      return true;
    } catch (error) {
      const payload = this.jwtService.decode(token);

      if (typeof payload === 'string' || !payload?.id) {
        throw new HttpException('Invalid token', HttpStatus.FORBIDDEN);
      }

      const user = await this.usersModel.findById(payload.id);

      user.asses_token = user.asses_token.filter(x => x.token !== token);
      user.save();

      throw new HttpException('Invalid token', HttpStatus.FORBIDDEN);
    }
  }
}
