import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Users, UsersSchema } from 'src/db-schema/user.schema';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { AuthModule } from 'src/auth/auth.module';
import { S3Service } from 'src/AWS/s3.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: Users.name, schema: UsersSchema }]), forwardRef(() => AuthModule)],
  controllers: [UserController],
  providers: [UserService, S3Service],
  exports: [UserService],
})
export class UserModule {}
