import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../schemas/user.schema'
import { Model } from 'mongoose';
import { UserRequestDto } from '../dto/userRequest.dto';
import { hash } from 'bcrypt';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name)
        private userModel: Model<User>
    ) { }

    async createUser(user: UserRequestDto) {
        user.password = await hash(user.password, 10);
        const newUser = new this.userModel(user);
        return await newUser.save();
    }

    findById(id: string) {
        return this.userModel.findById(id);
    }

    findOneEmail(email: string) {
        return this.userModel.findOne({ email });
    }

    findAll() {
        return this.userModel.find();
    }
}
