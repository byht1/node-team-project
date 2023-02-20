import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PetsService } from './pets.service';
import { PetsController } from './pets.controller';
import { Pet, PetSchema } from 'src/db-schema/pets.schema';
import { S3Service } from 'src/AWS/s3.service';
import { AuthModule } from 'src/auth/auth.module';
import { UserService } from 'src/user/user.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {name: Pet.name, schema: PetSchema}
    ]),
    AuthModule,
  ],
  controllers: [PetsController],
  providers: [PetsService, S3Service, UserService],
})
export class PetsModule {}
