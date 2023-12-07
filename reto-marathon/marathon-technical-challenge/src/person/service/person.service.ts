import { HttpService } from '@nestjs/axios';
import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { map } from 'rxjs';
import { PersonDto } from '../dto/person.dto';
import { PersonRequest } from '../dto/personRequest.dto';
import { Person } from '../schema/person.schema';

@Injectable()
export class PersonService {

    constructor(
        @InjectModel(Person.name)
        private personModel: Model<Person>,
        private readonly httpService: HttpService,
        private readonly config: ConfigService
    ) { }

    async createUser(person: PersonDto) {
        const newPerson = new this.personModel(person);
        return await newPerson.save();
    }

    listPerson() {
        return this.personModel.find();
    }

    async findByRuc(body: PersonRequest) {
        const { ruc, tipo } = body;
        const baseUri = this.config.get('apiperson').uri;
        const token = this.config.get('apiperson').token;
        const uri = `${baseUri}Ruc2WS_JSON.php?tipo=${tipo}&ruc=${ruc}&token=${token}`;
        const person = await this.httpService.get(uri)
            .pipe(map((res) => res.data));
        return person.pipe(map((res) => {
            if (!res.estado) {
                throw new BadRequestException(res.razon_social)
            }
            return this.createUser(res)
        }));
    }
}
