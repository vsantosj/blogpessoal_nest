import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Bcrypt } from '../../auth/bcrypt/bcrypt';
import { User } from '../entities/user.entities';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        private bcrypt: Bcrypt
    ) { }

    async findByUser(user: string): Promise<User | null> {
        return await this.userRepository.findOne({
            where: {
                user: user
            }
        })
    }

    async findAll(): Promise<User[]> {
        return await this.userRepository.find();

    }

    async findById(id: number): Promise<User> {

        const user = await this.userRepository.findOne({
            where: {
                id
            }
        });

        if (!user)
            throw new HttpException('Usuário não encontrado!', HttpStatus.NOT_FOUND);

        return user;

    }

    async create(user: User): Promise<User> {

        const buscaUsuario = await this.findByUser(user.user);

        if (buscaUsuario)
            throw new HttpException("O User já existe!", HttpStatus.BAD_REQUEST);

        user.password = await this.bcrypt.encryptPassword(user.password)
        return await this.userRepository.save(user);

    }

    async update(user: User): Promise<User> {

        await this.findById(user.id);

        if (!user.id)
            throw new HttpException('Usuário(e-mail) já cadastrado!', HttpStatus.BAD_REQUEST);

        const findUser = await this.findByUser(user.user);

        if (findUser && findUser.id !== user.id)
            throw new HttpException('Usuário (e-mail) já Cadastrado!', HttpStatus.BAD_REQUEST);

        user.password = await this.bcrypt.encryptPassword(user.password)
        return await this.userRepository.save(user);

    }

}
