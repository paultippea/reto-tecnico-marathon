import { Controller, UseGuards } from '@nestjs/common';
import { UserService } from '../service/user.service';
import { Post, Get, Body, Param } from '@nestjs/common';
import { UserRequestDto } from '../dto/userRequest.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@Controller({ path: 'api/v1/user' })
export class UserController {

    constructor(
        private userService: UserService
    ) { }

    @Post()
    createUser(@Body() body: UserRequestDto) {
        return this.userService.createUser(body);
    }

    @Get()
    @UseGuards(AuthGuard)
    allUsers() {
        return this.userService.findAll();
    }

    @Get("/:id")
    @UseGuards(AuthGuard)
    findByIdUsers(@Param('id') id: string) {
        return this.userService.findById(id);
    }
}