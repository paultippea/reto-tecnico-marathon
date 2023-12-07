import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { PersonModule } from './person/person.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './configuration/configuration';
import { JwtService, JwtModule } from '@nestjs/jwt';

@Module({
  providers: [JwtService],
  imports: [
    UserModule,
    AuthModule,
    PersonModule,
    JwtModule,
    ConfigModule.forRoot({
      load: [configuration],
    }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get('database').uri,
        user: configService.get('database').user,
        pass: configService.get('database').pass,
        dbName: configService.get('database').dbName
      })
    })
  ]
})
export class AppModule { }
