
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { DeleteResult } from 'typeorm';

@Controller('posts')
export class PostsController {
    constructor(private readonly postsService: PostsService) { }

    @Get()
    @Put()
    @HttpCode(HttpStatus.OK)
    findAll(): Promise<Post[]> {
        return this.postsService.findAll();
    }

    @Get(':id')
    findById(@Param('id', ParseIntPipe) id: number): Promise<Post> {
        return this.postsService.findById(id);
    }

    @Get('/titulo/:title')
    findByTitle(@Query('title') title: string): Promise<Post[]> {
        return this.postsService.findByTitle(title);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() post: Post): Promise<Post> {
        return this.postsService.create(post);
    }

    @Put()
    @HttpCode(HttpStatus.OK)
    update(@Body() post: Post): Promise<Post> {
        return this.postsService.update(post);
    }

    @Delete(':id')
    delete(@Param('id', ParseIntPipe) id: number): Promise<DeleteResult> {
        return this.postsService.delete(id);
    }
}
