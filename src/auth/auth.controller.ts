import { Body, Controller, Get, HttpCode, Post, Req, Res, UseGuards, UsePipes } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiExcludeEndpoint,
  ApiExtraModels,
  ApiHeaders,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Response } from 'express';
import { Users } from 'src/db-schema/user.schema';
import { CustomCookie } from 'src/decorators/CustomCookie.decorator';
import { IRequestUser } from 'src/type/req';
import { AuthService } from './auth.service';
import { LogInDto, NewUserDto } from './dto';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import { ValidatePipe } from '../global/pipe/validate.pipe';
import { AuthGuard } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { LoginRedirectUrlDto } from './dto/LoginRedirectUrlDto';
import { TTokens } from './type';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService, private configService: ConfigService) {}

  @ApiOperation({ summary: 'Registration' })
  @ApiResponse({ status: 201, type: Users })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({
    status: 409,
    description: 'Email in use',
  })
  @ApiResponse({ status: 500, description: 'Server error' })
  @UsePipes(ValidatePipe)
  @Post('sign-up')
  async signUp(@Body() newUserDto: NewUserDto, @Res({ passthrough: true }) response: Response) {
    const user = await this.authService.signUp(newUserDto);

    response.cookie('refreshToken', user.refresh_token, {
      maxAge: 2 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    return user;
  }

  @ApiOperation({ summary: 'Login to the account' })
  @ApiResponse({ status: 201, type: Users })
  @ApiResponse({ status: 400, description: 'Invalid data' })
  @ApiResponse({ status: 401, description: 'User does not exist' })
  @ApiResponse({ status: 401, description: 'Incorrect password' })
  @ApiResponse({ status: 500, description: 'Server error' })
  @UsePipes(ValidatePipe)
  @Post('log-in')
  async logIn(@Body() logInDto: LogInDto, @Res({ passthrough: true }) response: Response) {
    const user = await this.authService.logIn(logInDto);
    response.cookie('refreshToken', user.refresh_token, {
      maxAge: 2 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    return user;
  }

  @ApiOperation({ summary: 'Logout to the account' })
  @ApiHeaders([
    {
      name: 'Authorization',
      required: true,
      description: 'The token issued to the current user.',
    },
  ])
  @ApiResponse({ status: 204 })
  @ApiResponse({ status: 403, description: 'Invalid token' })
  @ApiResponse({ status: 500, description: 'Server error' })
  @UseGuards(JwtAuthGuard)
  @HttpCode(204)
  @Get('logout')
  logOut(@Req() req: IRequestUser, @CustomCookie('refreshToken') refreshToken) {
    return this.authService.logOut(req.user, req.access_token, refreshToken);
  }

  @ApiOperation({ summary: 'Get a new access token' })
  @ApiResponse({ status: 201, type: String })
  @ApiHeaders([
    {
      name: 'Cookie',
      required: true,
      description: 'The refresh token issued to the current user.',
    },
  ])
  @ApiResponse({ status: 403, description: 'Invalid token' })
  @ApiResponse({ status: 500, description: 'Server error' })
  @Get('refresh')
  refresh(@CustomCookie('refreshToken') refreshToken) {
    return this.authService.refresh(refreshToken);
  }

  @ApiOperation({ summary: 'Authorization by token' })
  @ApiHeaders([
    {
      name: 'Authorization',
      required: true,
      description: 'The token issued to the current user.',
    },
  ])
  @ApiResponse({ status: 201, type: Users })
  @ApiResponse({ status: 403, description: 'Invalid token' })
  @ApiResponse({ status: 500, description: 'Server error' })
  @UseGuards(JwtAuthGuard)
  @Get('current')
  current(@Req() req: IRequestUser) {
    return this.authService.current(req.user._id);
  }

  @ApiOperation({ summary: 'Google authorization' })
  @ApiExtraModels(LoginRedirectUrlDto)
  @ApiResponse({ status: 302, type: LoginRedirectUrlDto })
  @ApiOkResponse({ description: 'User access token generated successfully' })
  @ApiBadRequestResponse({ description: 'Invalid authorization code or state value' })
  @Get('google')
  @UseGuards(AuthGuard('google'))
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  googleLogin() {}

  @ApiExcludeEndpoint()
  @UseGuards(AuthGuard('google'))
  @Get('google/callback')
  async googleLoginCallback(@Req() req: any, @Res() response: Response) {
    const tokens: TTokens = await this.authService.googleLogin(req.user);

    response.cookie('refreshToken', tokens.refresh_token, {
      maxAge: 2 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    return response.redirect(`http://localhost:3000/react-team-project/?access_token=${tokens.access_token}`);
    // return response.redirect(`https://byht1.github.io/react-team-project/?access_token=${tokens.access_token}`);
    // if (jwt) {
    //   res.redirect(`${this.configService.get('https://byht1.github.io/react-team-project/')}?token=${jwt}`);
    // } else {
    //   res.redirect(`${this.configService.get('https://byht1.github.io/react-team-project/')}`);
    // }
  }
}
