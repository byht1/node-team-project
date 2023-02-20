import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PetsService } from './pets.service';
import { PetsController } from './pets.controller';
import { Pet, PetSchema } from 'src/db-schema/pets.schema';
import { S3Service } from 'src/AWS/s3.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {name: Pet.name, schema: PetSchema}
    ]),
  ],
  controllers: [PetsController],
  providers: [PetsService, S3Service],
})
export class PetsModule {}
