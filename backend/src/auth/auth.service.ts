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

    private checkPassword(plaintextPass: string, hash: string): boolean {
        let result = false;

        this.bcrypt.compare(plaintextPass, hash).then(function(comparisonResult) {
            result = comparisonResult;
        })

        return result;
    }

    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.usersService.findOne(username);
        
        if (user && this.checkPassword(pass, user.password)) {
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
