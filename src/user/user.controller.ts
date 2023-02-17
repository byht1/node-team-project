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
}
