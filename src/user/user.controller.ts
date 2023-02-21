import { Body, Controller, Get, Patch, Req, UploadedFiles, UseGuards, UseInterceptors, UsePipes } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiBody, ApiConsumes, ApiResponse, ApiTags, ApiOperation, ApiHeaders } from '@nestjs/swagger';
import { ValidatePipe } from 'src/global/pipe/validate.pipe';
import { ValidateIsNotVoid } from 'src/global/pipe/validateIsNotVoid.pipe';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { IRequestUser } from 'src/type/req';
import { UpdateUser, UserDataPets } from './schema-swagger';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { EditingUserDto, EditingUserPhotoDto } from './dto';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @ApiOperation({ summary: 'Get user data' })
  @ApiHeaders([
    {
      name: 'Authorization',
      required: true,
      description: 'The token issued to the current user.',
    },
  ])
  @ApiResponse({ status: 201, type: UpdateUser })
  @ApiResponse({ status: 403, description: 'Invalid token' })
  @ApiResponse({ status: 500, description: 'Server error' })
  @UseGuards(JwtAuthGuard)
  @Get()
  currentUser(@Req() req: IRequestUser) {
    return this.userService.currentUser(req.user._id);
  }

  @ApiOperation({ summary: 'Update user data' })
  @ApiHeaders([
    {
      name: 'Authorization',
      required: true,
      description: 'The token issued to the current user.',
    },
  ])
  @ApiResponse({ status: 201, type: UpdateUser })
  @ApiResponse({ status: 400, description: 'Invalid data' })
  @ApiResponse({ status: 403, description: 'Invalid token' })
  @ApiResponse({ status: 500, description: 'Server error' })
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidatePipe)
  @UsePipes(ValidateIsNotVoid)
  @Patch('editing')
  editingData(@Body() editingUserDto: EditingUserDto, @Req() req: IRequestUser) {
    return this.userService.editingData(editingUserDto, req.user._id);
  }

  @ApiOperation({ summary: 'Update user avatar' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiHeaders([
    {
      name: 'Authorization',
      required: true,
      description: 'The token issued to the current user.',
    },
  ])
  @ApiResponse({ status: 201, type: UpdateUser })
  @ApiResponse({ status: 400, description: 'Invalid data' })
  @ApiResponse({ status: 403, description: 'Invalid token' })
  @ApiResponse({ status: 500, description: 'Server error' })
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileFieldsInterceptor([{ name: 'file', maxCount: 1 }]))
  @UsePipes(ValidatePipe)
  // @UsePipes(ValidateIsNotVoid)
  @Patch('editing/photo')
  editingPhoto(@UploadedFiles() { file }: EditingUserPhotoDto, @Req() req: IRequestUser) {
    return this.userService.editingPhoto(file[0], req.user._id);
  }

  @ApiOperation({ summary: 'Update user data' })
  @ApiHeaders([
    {
      name: 'Authorization',
      required: true,
      description: 'The token issued to the current user.',
    },
  ])
  @ApiResponse({ status: 201, type: UserDataPets })
  @ApiResponse({ status: 403, description: 'Invalid token' })
  @ApiResponse({ status: 500, description: 'Server error' })
  @UseGuards(JwtAuthGuard)
  @Get('user-pets')
  allUserPets(@Req() req: IRequestUser) {
    return this.userService.allUserPets(req.user._id);
  }
}
