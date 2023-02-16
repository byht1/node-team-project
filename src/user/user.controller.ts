import { Body, Controller, Patch, Req, UploadedFiles, UseGuards, UseInterceptors, UsePipes } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiBody, ApiConsumes, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ValidatePipe } from 'src/global/pipe/validate.pipe';
import { ValidateIsNotVoid } from 'src/global/pipe/validateIsNotVoid.pipe';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { IRequestUser } from 'src/type/req';
import { UpdateUser } from './schema-swagger';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { EditingUserDto, EditingUserPhotoDto } from './dto';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('test')
  test() {
    return this.userService.removeFavirite('63ed62b5c19e964d34ac9fae', '63ecf30a25d33bae0cd89451');
  }
}
