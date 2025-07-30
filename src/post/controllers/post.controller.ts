
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { DeleteResult } from 'typeorm';

@Controller('posts')
export class PostsController {
    constructor(private readonly postService: PostService) { }

    @Get()
    @HttpCode(HttpStatus.OK)
    findAll(): Promise<Post[]> {
        return this.postService.findAll();
    }

    @Get('/:id')
    findById(@Param('id', ParseIntPipe) id: number): Promise<Post> {
        return this.postService.findById(id);
    }

    @Get('/titulo/:title')
    findByTitle(@Param('title') title: string): Promise<Post[]> {
        return this.postService.findByTitle(title);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() post: Post): Promise<Post> {
        return this.postService.create(post);
    }

    @Put()
    @HttpCode(HttpStatus.OK)
    update(@Body() post: Post): Promise<Post> {
        return this.postService.update(post);
    }

    @Delete('/:id')
    delete(@Param('id', ParseIntPipe) id: number): Promise<DeleteResult> {
        return this.postService.delete(id);
    }
}
