import { JwtService } from '@nestjs/jwt';
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Bcrypt } from '../bcrypt/bcrypt';
import { UserService } from '../../user/services/user.service';
import { UserLogin } from '../entities/userlogin.entity';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
        private bcrypt: Bcrypt
    ) { }

    async validateUser(username: string, password: string): Promise<any> {
        try {
            const findUser = await this.userService.findByUser(username);

            if (!findUser) {
                throw new HttpException('Usuário não encontrado!', HttpStatus.NOT_FOUND);
            }

            const matchPassword = await this.bcrypt.comparePasswords(password, findUser.password);

            if (findUser && matchPassword) {
                const { password, ...resposta } = findUser;
                return resposta;
            }
            throw new HttpException('Credenciais inválidas!', HttpStatus.UNAUTHORIZED);

        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            }
            console.error('Erro no validateUser:', error);
            throw new HttpException(
                'Erro interno no servidor durante validação',
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }

    async login(userLogin: UserLogin) {
        const payload = { sub: userLogin.user };

        const fyndUser = await this.userService.findByUser(
            userLogin.user,
        );

        if (!fyndUser)
            throw new HttpException("Usuário não encontrado!", HttpStatus.NOT_FOUND);

        return {
            id: fyndUser.id,
            name: fyndUser.name,
            user: userLogin.user,
            password: "",
            photoUrl: fyndUser.photoUrl,
            token: `Bearer ${this.jwtService.sign(payload)}`,
        };
    }
}
