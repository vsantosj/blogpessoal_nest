import { InjectRepository } from '@nestjs/typeorm';
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { ILike, Repository } from 'typeorm';
import { Theme } from '../entities/theme.entity';


@Injectable()
export class ThemeService {

    constructor(
        @InjectRepository(Theme)
        private themeRepository: Repository<Theme>
    ) { }

    async findAll(): Promise<Theme[]> {
        return await this.themeRepository.find({
            relations: {
                posts: true
            }
        });
    }

    async findById(id: number): Promise<Theme> {
        let theme = await this.themeRepository.findOne({
            where: {
                id
            },
            relations: {
                posts: true
            }
        });

        if (!theme)
            throw new HttpException(
                `O tema com ID: ${id} não foi encontrado!`, HttpStatus.NOT_FOUND
            );

        return theme;
    }

    async findByContent(content: string): Promise<Theme[]> {
        return await this.themeRepository.find({
            where: {
                theme: ILike(`%${content}%`)
            },
            relations: {
                posts: true
            }
        });
    }

    async create(theme: Theme): Promise<Theme> {
        if (theme.id) {
            const existsTheme = await this.themeRepository.findOne({
                where: { id: theme.id }
            });
            if (existsTheme) {
                throw new HttpException(
                    `Tema com ID: ${theme.id} já existe!`,
                    HttpStatus.CONFLICT
                );
            }
        }
        return await this.themeRepository.save(theme);
    }

    async update(theme: Theme): Promise<Theme> {
        if (!theme.id) {
            throw new HttpException(
                'ID do tema é obrigatório para atualização!',
                HttpStatus.BAD_REQUEST
            );
        }
        await this.findById(theme.id);

        return await this.themeRepository.save(theme);
    }
    async delete(id: number): Promise<Theme> {
        const theme = await this.findById(id);
        await this.themeRepository.delete(id);
        return theme;
    }
}