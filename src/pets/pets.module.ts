import { Module } from '@nestjs/common';
import { PetsService } from './pets.service';
import { PetsController } from './pets.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Pet, PetSchema } from 'src/db-schema/pets.schema';
import { S3Module } from 'src/AWS/s3.module';

@Module({
  providers: [PetsService],
  controllers: [PetsController],
  imports: [
    MongooseModule.forFeature([
      {name: Pet.name, schema: PetSchema}
    ]),
    S3Module,
  ]
})
export class PetsModule {}
