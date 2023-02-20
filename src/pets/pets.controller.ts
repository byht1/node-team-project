import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  Req,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiHeaders, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ObjectId } from 'mongoose';
import { Pet } from 'src/db-schema/pets.schema';
import { CreatePetDto } from './dto/create-pet.dto';
import { CreatePetSchema } from './schema-swagger/create-pet.schema';
import { UploadFileDto } from './dto/upload-file.dto';
import { PetsService } from './pets.service';
import { ValidatePipe } from 'src/global/pipe/validate.pipe';
import { ValidateIsNotVoid } from 'src/global/pipe/validateIsNotVoid.pipe';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { IRequestUser } from 'src/type/req';

@ApiTags('Pets')
@Controller('pets')
export class PetsController {
  constructor(private readonly petsService: PetsService) {}

  @ApiOperation({ summary: 'Add pet' })
  @ApiBearerAuth()
  @ApiHeaders([
    {
      name: 'Authorization',
      required: true,
      description: 'User token',
    },
  ])
  @ApiBody({ type: CreatePetSchema })
  @ApiConsumes('multipart/form-data')
  @ApiResponse({ status: 201, description: 'Pet created', type: Pet })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 403, description: 'Invalid token' })
  @ApiResponse({ status: 500, description: 'Server error' })
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidatePipe)
  @UsePipes(ValidateIsNotVoid)
  @UseInterceptors(FileFieldsInterceptor([{ name: 'image', maxCount: 1 }]))
  @Post()
  create(@Req() req: IRequestUser,
    @Body() dto: CreatePetDto,
    @UploadedFiles() { image }: UploadFileDto) {
      return this.petsService.createPet(dto, image[0], req.user._id)
    }

  @ApiOperation({ summary: 'Delete pet' })
  @ApiBearerAuth()
  @ApiHeaders([
    {
      name: 'Authorization',
      required: true,
      description: 'User token',
    },
  ])
  @ApiResponse({ status: 200, description: 'Pet deleted', type: Pet })
  @ApiResponse({ status: 403, description: 'Invalid token' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @ApiResponse({ status: 500, description: 'Server error' })
  @UseGuards(JwtAuthGuard)
  @ApiParam({ name: 'id', required: true, description: 'Pet ID' })
  @Delete(':id')
  remove(@Param('id') id: ObjectId): Promise<Pet> {
    return this.petsService.removePet(id)
  }
}
