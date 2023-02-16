import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { Users, UsersDocument } from 'src/db-schema/user.schema';
// import { EmailMessageService } from '../email-message/email-message.service';
import { LogInDto, NewUserDto } from './dto';
import { TAvatar, TResUserAuth, TTokens } from './type';
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

  // FIXME: добиит рефреш токен
  async logOut(user: UsersDocument, currentToken: string): Promise<void> {
    const id = user._id;
    const tokenDelete = user.asses_token.filter(x => x !== currentToken);

    await this.usersModel.findByIdAndUpdate(id, { asses_token: tokenDelete });

    return;
  }

  async getTokens(id: TId) {
    return await this.generatorTokens(id);
  }

  private avatarGenerator(name): TAvatar {
    return {
      png: `https://api.multiavatar.com/${name}.png`,
      svg: `https://api.multiavatar.com/${name}.svg`,
    };
  }

  private async generatorTokens(id: TId): Promise<TTokens> {
    const asses = this.jwtService.sign(
      { id },
      { expiresIn: '2d', secret: process.env.ASSES_SECRET_KEY },
    );
    const refresh = this.jwtService.sign(
      { id },
      { expiresIn: '2d', secret: process.env.REFRESH_SECRET_KEY },
    );

    const user = await this.usersModel.findById(id);

    user.asses_token.push(asses);
    user.refresh_token.push(refresh);
    user.save();

    return { asses_token: asses, refresh_token: refresh };
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

  private normalizeData(
    user: UsersDocument,
    tokens: TTokens,
  ): Promise<TResUserAuth> {
    const res: { [key: string]: any } = { ...user };

    delete res._doc.password;

    return { ...res._doc, ...tokens };
  }
}
