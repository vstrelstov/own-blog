import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './interfaces/user.interface';

@Injectable()
export class UsersService {

    constructor(@InjectModel('User') private readonly userModel: Model<User>) {}
    
    async findOne(username: string): Promise<User | undefined> {
        const users = await this.userModel.find().exec();
        return users[0];
    }
}
