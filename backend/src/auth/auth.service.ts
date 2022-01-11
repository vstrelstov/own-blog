import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) {}

    private bcrypt = require('bcrypt');

    private hashPassword(plaintextPass: string): String {
        const saltRounds = 10;
        
        let passwordHash = '';
        this.bcrypt.hash(plaintextPass, saltRounds, function(err, hash) {
            if (!err) {
                passwordHash = hash;
            }
        });

        return passwordHash;
    }

    private async checkPassword(plaintextPass: string, hash: string): Promise<boolean> {
        const comparisonResult = await this.bcrypt.compare(plaintextPass, hash);
        return comparisonResult;
    }

    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.usersService.findOne(username);
        
        if (user && await this.checkPassword(pass, user.password)) {
            const { password, ...result } = user;
            return result;
        }

        return null;
    }

    async login(user: any) {
        const payload = { username: user.username, sub: user.userId };
        return {
            access_token: this.jwtService.sign(payload)
        };
    }
}
