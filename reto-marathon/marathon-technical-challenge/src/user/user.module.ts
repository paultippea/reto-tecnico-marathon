import { Module } from '@nestjs/common';
import { UserController } from './controller/user.controller';
import { UserService } from './service/user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { MongoErrorInterceptor } from 'src/configuration/errors/MongoError.nterceptor';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema
      }
    ])
  ],
  controllers: [UserController],
  providers: [
    UserService,
    ConfigService,
    JwtService,
    {
      provide: APP_INTERCEPTOR,
      useClass: MongoErrorInterceptor,
    }
  ]
})
export class UserModule { }
