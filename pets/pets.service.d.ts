import { Model, ObjectId } from 'mongoose';
import { S3Service } from 'src/AWS/s3.service';
import { Pet, PetDocument } from 'src/db-schema/pets.schema';
import { UserService } from 'src/user/user.service';
import { CreatePetDto } from './dto/create-pet.dto';
import { UploadFileDto } from './dto/upload-file.dto';
export declare class PetsService {
    private petModel;
    private fileService;
    private userService;
    constructor(petModel: Model<PetDocument>, fileService: S3Service, userService: UserService);
    createPet(createPetDto: CreatePetDto, image: UploadFileDto, userId: ObjectId): Promise<Pet>;
    removePet(petId: ObjectId, userId: ObjectId): Promise<Pet>;
}
