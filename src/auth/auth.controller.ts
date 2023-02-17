import { Body, Controller, Get, HttpCode, Post, Req, Res, UseGuards, UsePipes } from '@nestjs/common';
import { ApiHeaders, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { Users } from 'src/db-schema/user.schema';
import { CustomCookie } from 'src/decorators/CustomCookie.decorator';
import { IRequestUser } from 'src/type/req';
import { AuthService } from './auth.service';
import { LogInDto, NewUserDto } from './dto';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import { ValidatePipe } from '../global/pipe/validate.pipe';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiResponse({ status: 201, type: Users })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({
    status: 409,
    description: 'Email in use',
  })
  @ApiResponse({ status: 500, description: 'Server error' })
  @UsePipes(ValidatePipe)
  @Post('sign-up')
  signUp(@Body() newUserDto: NewUserDto) {
    return this.authService.signUp(newUserDto);
  }

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
    return this.authService.logOut(req.user, req.asses_token, refreshToken);
  }

  @ApiResponse({ status: 201, type: 'New refresh token' })
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
}
