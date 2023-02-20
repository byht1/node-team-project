import { HttpException, HttpStatus, Injectable} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { S3Service, TypeOperation } from 'src/AWS/s3.service';
import { Pet, PetDocument } from 'src/db-schema/pets.schema';
import { CreatePetDto } from './dto/create-pet.dto';
import { UploadFileDto } from './dto/upload-file.dto';

@Injectable()
export class PetsService {
    constructor(@InjectModel(Pet.name) private petModel: Model<PetDocument>,
    private fileService: S3Service) {}

    async createPet(createPetDto: CreatePetDto, image: UploadFileDto, userId: ObjectId): Promise<Pet> {
        const fileName = await this.fileService.uploadFile(image, TypeOperation.PETS)
        const pet = await this.petModel.create({
                ...createPetDto,
                image: fileName,
                owner: userId,
            })
        return pet
    }

    async removePet(petId: ObjectId): Promise<Pet> {
        const petFind = await this.petModel.findById(petId)

        if (!petFind) {
            throw new HttpException('Pet not found', HttpStatus.NOT_FOUND)
        }
        const string = petFind.image.split('/').pop()
        await this.fileService.deleteFile(string, TypeOperation.PETS)
        const pet = await this.petModel.findByIdAndRemove(petId).select({createdAt: 0, updatedAt: 0})

        return pet
    }
}
