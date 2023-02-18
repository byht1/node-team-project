import { Injectable} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { S3Service, TypeOperation } from 'src/AWS/s3.service';
import { Pet, PetDocument } from 'src/db-schema/pets.schema';
import { CreatePetDto } from './dto/create-pet.dto';

@Injectable()
export class PetsService {
    constructor(@InjectModel(Pet.name) private petModel: Model<PetDocument>,
    private fileService: S3Service) {}

    async createPet(dto: CreatePetDto, image: any): Promise<Pet> {
        // const fileName = await this.fileService.uploadFile(image, TypeOperation.PETS)
        const fileName = 'image'
        const pet = await this.petModel.create({...dto, image: fileName});
        return pet
    }

    async removePet(id: string): Promise<Pet> {
        return this.petModel.findByIdAndRemove(id)
    }
}
