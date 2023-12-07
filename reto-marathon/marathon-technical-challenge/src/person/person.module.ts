import { Module } from '@nestjs/common';
import { PersonController } from './controller/person.controller';
import { PersonService } from './service/person.service';
import { HttpModule } from '@nestjs/axios';
import { MongooseModule } from '@nestjs/mongoose';
import { Person, PersonSchema } from './schema/person.schema';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { MongoErrorInterceptor } from 'src/configuration/errors/MongoError.nterceptor';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  imports: [
    HttpModule,
    MongooseModule.forFeature([
      {
        name: Person.name,
        schema: PersonSchema
      }
    ])
  ],
  controllers: [PersonController],
  providers: [
    PersonService, 
    ConfigService, 
    JwtService,
    {
      provide: APP_INTERCEPTOR,
      useClass: MongoErrorInterceptor,
    }
  ]
})
export class PersonModule { }
