import { ObjectId } from 'mongoose';
import { Pet } from 'src/db-schema/pets.schema';
import { CreatePetDto, UploadFileDto } from './dto';
import { PetsService } from './pets.service';
import { IRequestUser } from 'src/type/req';
export declare class PetsController {
    private readonly petsService;
    constructor(petsService: PetsService);
    create(req: IRequestUser, dto: CreatePetDto, { image }: UploadFileDto): Promise<Pet>;
    remove(id: ObjectId, req: IRequestUser): Promise<Pet>;
}
