import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { Users, UsersSchema } from 'src/db-schema/user.schema';
import { EmailMessageModule } from 'src/email-message/email-message.module';
import { EmailMessageService } from 'src/email-message/email-message.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { UserService } from 'src/user/user.service';
import { S3Service } from 'src/AWS/s3.service';
import { PassportModule } from '@nestjs/passport';
import { GoogleStrategy } from './strategy/google.strategy';
import { FacebookStrategy } from './strategy/facebook.strategy';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env' }),
    MongooseModule.forFeature([{ name: Users.name, schema: UsersSchema }]),
    PassportModule,
    JwtModule,
    EmailMessageModule,
    UserModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, EmailMessageService, S3Service, UserService, GoogleStrategy, FacebookStrategy],
  exports: [AuthService, JwtModule, MongooseModule],
})
export class AuthModule {}
