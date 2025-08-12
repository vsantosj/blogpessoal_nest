
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put, UseGuards } from "@nestjs/common";
import { ThemeService } from "../service/theme.service";
import { Theme } from "../entities/theme.entity";
import { JwtAuthGuard } from "../../auth/guard/jwt-auth.guard";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

@ApiTags('Tema')
@UseGuards(JwtAuthGuard)
@Controller("/temas")
@ApiBearerAuth()
export class ThemeController {
    constructor(private readonly themeService: ThemeService) { }

    @Get()
    @HttpCode(HttpStatus.OK)
    findAll(): Promise<Theme[]> {
        return this.themeService.findAll();
    }

    @Get('/:id')
    @HttpCode(HttpStatus.OK)
    findById(@Param('id', ParseIntPipe) id: number): Promise<Theme> {
        return this.themeService.findById(id);
    }

    @Get('/descricao/:content')
    @HttpCode(HttpStatus.OK)
    findByContent(@Param('content') content: string): Promise<Theme[]> {
        return this.themeService.findByContent(content);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() theme: Theme): Promise<Theme> {
        return this.themeService.create(theme);
    }

    @Put()
    @HttpCode(HttpStatus.OK)
    update(@Body() theme: Theme): Promise<Theme> {
        return this.themeService.update(theme);
    }

    @Delete('/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    delete(@Param('id', ParseIntPipe) id: number) {
        return this.themeService.delete(id);
    }

}
