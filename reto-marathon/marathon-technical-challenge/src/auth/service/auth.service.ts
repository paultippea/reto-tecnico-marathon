import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/service/user.service';
import { SingInRequest } from '../dto/signInRequest.dto';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ) { }

    async signIn(body: SingInRequest): Promise<any> {
        const user = await this.userService.findOneEmail(body.email);

        if (!user || !(await compare(body.password, user.password))) {
            throw new UnauthorizedException();
        }

        const payload = { sub: user.id, username: user.username, email: user.email };
        return {
            type_token: 'Bearer',
            access_token: await this.jwtService.signAsync(payload),
        };
    }

}
