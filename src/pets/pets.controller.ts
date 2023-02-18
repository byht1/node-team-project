import { Body, Controller, Delete, Param, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ObjectId } from "mongoose";
import { Pet } from 'src/db-schema/pets.schema';
import { CreatePetDto } from './dto/create-pet.dto';
import { UploadFileDto } from './dto/upload-file.dto';
import { PetsService } from './pets.service';

@ApiTags('Pets')
@Controller('pets')
export class PetsController {
    constructor(private readonly petsService: PetsService) {}

    @ApiOperation({summary: 'Add pet'})
    @ApiResponse({status: 201, type: Pet})
    @UseInterceptors(FileInterceptor('image'))
    @Post()
    create(@Body() dto: CreatePetDto,
    @UploadedFile() image: UploadFileDto): Promise<Pet> {
        return this.petsService.createPet(dto, image)
    }

    @ApiOperation({summary: 'Delete pet'})
    @ApiResponse({status: 200, type: Pet})
    @Delete(':id')
    remove(@Param('id') id: ObjectId): Promise<Pet> {
        return this.petsService.removePet(id)
    }

}