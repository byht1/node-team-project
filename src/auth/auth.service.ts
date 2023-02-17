import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { Users, UsersDocument } from 'src/db-schema/user.schema';
// import { EmailMessageService } from '../email-message/email-message.service';
import { LogInDto, NewUserDto } from './dto';
import { Token, TResUserAuth, TTokens } from './type';
import { UserService } from 'src/user/user.service';
import { TId } from 'src/type';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Users.name) private usersModel: Model<UsersDocument>,
    private usersService: UserService,
    private jwtService: JwtService, // private emailMessage: EmailMessageService,
  ) {}

  async signUp(newUserDto: NewUserDto): Promise<TResUserAuth> {
    const { email, name, password } = newUserDto;

    const isEmail = await this.usersService.userByEmail(email);
    if (isEmail) throw new HttpException('Email in use', HttpStatus.CONFLICT);

    const hashPassword = await this.hashPassword(password);

    const user = await this.usersModel.create({
      ...newUserDto,
      photo: this.avatarGenerator(name),
      password: hashPassword,
    });

    const tokens = await this.generatorTokens(user._id);

    return this.normalizeData(user, tokens);
  }

  async logIn(logInDto: LogInDto): Promise<TResUserAuth> {
    const { email, password } = logInDto;

    const isUser = await this.usersService.userByEmail(email);

    if (!isUser) {
      throw new HttpException('User does not exist', HttpStatus.UNAUTHORIZED);
    }

    await this.passwordIsValid(password, isUser.password);

    const tokens = await this.generatorTokens(isUser._id);

    return this.normalizeData(isUser, tokens);
  }

  async logOut(user: UsersDocument, assesToken: string, refreshToken: string): Promise<void> {
    const id = user._id;
    const assesTokenDelete = user.asses_token.filter(x => x.token !== assesToken);
    const refreshTokenDelete = user.refresh_token.filter(x => x.token !== refreshToken);

    await this.usersModel.findByIdAndUpdate(id, {
      asses_token: assesTokenDelete,
      refresh_token: refreshTokenDelete,
    });

    return;
  }

  async refresh(refreshToken: string): Promise<string> {
    try {
      const isValid = await this.jwtService.verify(refreshToken, {
        secret: process.env.REFRESH_SECRET_KEY,
      });

      const user = await this.usersModel.findById(isValid.id);

      const assesToken = this.generatorToken(isValid.id, 'asses');

      user.asses_token.push(assesToken);
      user.save();

      return assesToken.token;
    } catch (error) {
      const payload = await this.jwtService.decode(refreshToken);

      if (typeof payload === 'string' || !payload.id) {
        throw new HttpException('Invalid token', HttpStatus.FORBIDDEN);
      }

      await this.clearTokens(payload.id, refreshToken);

      throw new HttpException('Invalid token', HttpStatus.FORBIDDEN);
    }
  }

  async getTokens(id: TId) {
    return await this.generatorTokens(id);
  }

  private avatarGenerator(name): string {
    return `https://api.multiavatar.com/${name}.png`;
  }

  private generatorToken(id: TId, type: 'asses' | 'ref'): Token {
    return {
      token: this.jwtService.sign(
        { id },
        {
          expiresIn: type === 'ref' ? '1d' : '15m',
          secret: type === 'ref' ? process.env.REFRESH_SECRET_KEY : process.env.ASSES_SECRET_KEY,
        },
      ),
      date: Date.now(),
    };
  }

  private async generatorTokens(id: TId): Promise<TTokens> {
    const asses = this.generatorToken(id, 'asses');
    const refresh = this.generatorToken(id, 'ref');

    const user = await this.usersModel.findById(id);

    user.asses_token.push(asses);
    user.refresh_token.push(refresh);
    user.save();

    return { asses_token: asses.token, refresh_token: refresh.token };
  }

  private async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }

  private async passwordIsValid(password: string, userPassword: string) {
    const passwordEquals = await bcrypt.compare(password, userPassword);

    if (!passwordEquals) {
      throw new HttpException('Incorrect password', HttpStatus.UNAUTHORIZED);
    }
  }

  private normalizeData(user: UsersDocument, tokens: TTokens): Promise<TResUserAuth> {
    const res: { [key: string]: any } = { ...user };

    delete res._doc.password;

    return { ...res._doc, ...tokens };
  }

  private async clearTokens(id: TId, refCurrentToken: string) {
    const user = await this.usersModel.findById(id);

    if (!user) {
      throw new HttpException('Invalid token', HttpStatus.FORBIDDEN);
    }

    const currentDate = Date.now();

    const assesToken = [];
    const refreshToken = user.refresh_token.filter(
      x => currentDate - x.date <= 24 * 60 * 60 * 1000 && x.token !== refCurrentToken,
    );

    user.asses_token = assesToken;
    user.refresh_token = refreshToken;

    user.save;
  }
}
