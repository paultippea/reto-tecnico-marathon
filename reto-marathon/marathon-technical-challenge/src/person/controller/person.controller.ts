import { Controller, Post, Body, UseGuards, Get } from '@nestjs/common';
import { PersonRequest } from '../dto/personRequest.dto';
import { PersonService } from '../service/person.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@UseGuards(AuthGuard)
@Controller({ path: 'api/v1/person' })
export class PersonController {

    constructor(
        private readonly personService: PersonService
    ) { }

    @Post('/register')
    register(@Body() body: PersonRequest) {
        return this.personService.findByRuc(body);
    }

    @Get()
    listPerson() {
        return this.personService.listPerson();
    }
}
