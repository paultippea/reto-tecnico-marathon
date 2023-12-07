import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { SingInRequest } from '../dto/signInRequest.dto';

@Controller({ path: 'api/v1/auth' })
export class AuthController {

    constructor(
        private authService: AuthService
    ) { }

    @Post("/signin")
    signIn(@Body() body: SingInRequest) {
        return this.authService.signIn(body);
    }
}
