import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { S3Service, TypeOperation } from 'src/AWS/s3.service';
import { Pet, PetDocument } from 'src/db-schema/pets.schema';
import { UserService } from 'src/user/user.service';
import { CreatePetDto } from './dto/create-pet.dto';
import { UploadFileDto } from './dto/upload-file.dto';

@Injectable()
export class PetsService {
  constructor(
    @InjectModel(Pet.name) private petModel: Model<PetDocument>,
    private fileService: S3Service,
    private userService: UserService,
  ) {}

  async createPet(createPetDto: CreatePetDto, image: UploadFileDto, userId: ObjectId): Promise<Pet> {
    const fileName = await this.fileService.uploadFile(image, TypeOperation.PETS);
    const pet = await this.petModel.create({
      ...createPetDto,
      image: fileName,
      owner: userId,
    });

    await this.userService.addPet(userId, pet);

    return pet;
  }

  async removePet(petId: ObjectId, userId: ObjectId): Promise<Pet> {
    const pet = await this.petModel.findOneAndRemove({ owner: userId, _id: petId });

    if (!pet) {
      throw new HttpException('Pet not found', HttpStatus.NOT_FOUND);
    }
    const string = pet.image.split('/').pop();
    await this.fileService.deleteFile(string, TypeOperation.PETS);

    await this.userService.removePet(userId, pet);

    return pet;
  }
}
