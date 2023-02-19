import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { Users, UsersDocument } from 'src/db-schema/user.schema';
// import { EmailMessageService } from '../email-message/email-message.service';
import { GoogleAuthDto, LogInDto, NewUserDto } from './dto';
import { Token, TResUserAuth, TTokens } from './type';
import { UserService } from 'src/user/user.service';
import { TId } from 'src/type';
import { uuid } from 'uuidv4';

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

  async logOut(user: UsersDocument, accessToken: string, refreshToken: string): Promise<void> {
    console.log('🚀  AuthService  refreshToken🚀', refreshToken);
    const id = user._id;
    // console.log('🚀  AuthService  user.refresh_token', user.refresh_token.length);
    // console.log('🚀  AuthService  user.access_token', user.access_token.length);
    const accessTokenDelete = user.access_token.filter(x => x.token !== accessToken);
    const refreshTokenDelete = user.refresh_token.filter(x => {
      console.log('🚀  AuthService  x.token !== refreshToken', x.token !== refreshToken);
      console.log('🚀  AuthService  refreshToken', refreshToken);
      console.log('🚀  AuthService  x.token', x.token);
      return x.token !== refreshToken;
    });
    // console.log('🚀  AuthService  refreshTokenDelete', refreshTokenDelete.length);
    // console.log('🚀  AuthService  accessTokenDelete', accessTokenDelete.length);
    await this.usersModel.findByIdAndUpdate(id, {
      access_token: accessTokenDelete,
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

      if (!user.refresh_token.find(x => x.token === refreshToken)) throw new Error();

      const accessToken = this.generatorToken(isValid.id, 'access');

      user.access_token.push(accessToken);
      user.save();

      console.log('🚀  AuthService  accessToken.token', accessToken.token);
      return accessToken.token;
    } catch (error) {
      const payload = await this.jwtService.decode(refreshToken);

      if (typeof payload === 'string' || !payload.id) {
        throw new HttpException('Invalid token', HttpStatus.FORBIDDEN);
      }

      await this.clearTokens(payload.id, refreshToken);

      throw new HttpException('Invalid token', HttpStatus.FORBIDDEN);
    }
  }

  async googleLogin(googleAuthDto: GoogleAuthDto): Promise<TTokens> {
    const { email, picture, firstName, lastName } = googleAuthDto;

    const isUser = await this.usersModel.findOne({ email });

    if (isUser) return await this.generatorTokens(isUser._id);

    const hashPassword = await this.hashPassword(Date.now().toString());
    console.log(1111);
    const newUser = await this.usersModel.create({
      password: hashPassword,
      photo: picture,
      name: `${firstName} ${lastName}`,
      email,
    });
    console.log(222);
    return await this.generatorTokens(newUser._id);
  }

  async current(id: TId) {
    const user = await this.usersModel.findById(id, '-password -access_token -refresh_token').populate('cards');
    return user;
  }

  async getTokens(id: TId) {
    return await this.generatorTokens(id);
  }

  private avatarGenerator(name): string {
    return `https://api.multiavatar.com/${name}.png`;
  }
  // access _token;

  private generatorToken(id: TId, type: 'access' | 'ref'): Token {
    return {
      token: this.jwtService.sign(
        { id },
        {
          expiresIn: type === 'ref' ? '1d' : '24h',
          secret: type === 'ref' ? process.env.REFRESH_SECRET_KEY : process.env.ACCESS_SECRET_KEY,
        },
      ),
      date: Date.now(),
    };
  }

  private async generatorTokens(id: TId): Promise<TTokens> {
    const access = this.generatorToken(id, 'access');
    const refresh = this.generatorToken(id, 'ref');

    const user = await this.usersModel.findById(id);

    user.access_token.push(access);
    user.refresh_token.push(refresh);
    user.save();

    return { access_token: access.token, refresh_token: refresh.token };
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

    const accessToken = [];
    const refreshToken = user.refresh_token.filter(
      x => currentDate - x.date <= 24 * 60 * 60 * 1000 && x.token !== refCurrentToken,
    );

    user.access_token = accessToken;
    user.refresh_token = refreshToken;

    user.save;
  }
}
