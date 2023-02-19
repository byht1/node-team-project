import { Injectable} from '@nestjs/common';
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

    async createPet(dto: CreatePetDto, image: UploadFileDto): Promise<Pet> {
        const fileName = await this.fileService.uploadFile(image, TypeOperation.PETS)
        // const fileName = 'image'
        const pet = await this.petModel.create({...dto, image: fileName})
        return pet
    }

    async removePet(id: ObjectId): Promise<Pet> {
        return await this.petModel.findByIdAndRemove(id)
    }
}
