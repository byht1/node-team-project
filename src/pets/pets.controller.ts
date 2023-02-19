import { Body, Controller, Delete, Param, Post, UploadedFile, UseInterceptors, UsePipes } from '@nestjs/common';
import { FileFieldsInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ObjectId } from "mongoose";
import { Pet } from 'src/db-schema/pets.schema';
import { CreatePetDto } from './dto/create-pet.dto';
import { CreatePetSchema } from './schema-swagger/create-pet.schema';
import { UploadFileDto } from './dto/upload-file.dto';
import { PetsService } from './pets.service';
import { ValidatePipe } from 'src/global/pipe/validate.pipe';

@ApiTags('Pets')
@Controller('pets')
export class PetsController {
    constructor(private readonly petsService: PetsService) {}

    @ApiBody({type: CreatePetSchema})
    @ApiOperation({summary: 'Add pet'})
    @ApiResponse({ status: 201, type: Pet })
    // @ApiConsumes('multipart/form-data')
    @UsePipes(ValidatePipe)
    @UseInterceptors(FileFieldsInterceptor([{ name: 'image', maxCount: 1 }]))
    @Post()
    create(@Body() dto: CreatePetDto,
        @UploadedFile() image: UploadFileDto): Promise<Pet> {
        console.log('image', image)
        return this.petsService.createPet(dto, image)
    }

    @ApiOperation({summary: 'Delete pet'})
    @ApiResponse({status: 200, type: Pet})
    @Delete(':id')
    remove(@Param('id') id: ObjectId): Promise<Pet> {
        return this.petsService.removePet(id)
    }

}