
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { DeleteResult } from 'typeorm';
import { PostsService } from '../services/posts.service';
import { Posts } from '../entities/posts.entity';

@Controller('posts')
export class PostsController {
    constructor(private readonly postsService: PostsService) { }

    @Get()
    @HttpCode(HttpStatus.OK)
    findAll(): Promise<Posts[]> {
        return this.postsService.findAll();
    }

    @Get('/:id')
    findById(@Param('id', ParseIntPipe) id: number): Promise<Posts> {
        return this.postsService.findById(id);
    }

    @Get('/titulo/:title')
    findByTitle(@Param('title') title: string): Promise<Posts[]> {
        return this.postsService.findByTitle(title);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() post: Posts): Promise<Posts> {
        return this.postsService.create(post);
    }
    @Put('/:id')
    @HttpCode(HttpStatus.OK)
    update(@Param('id') id: number, @Body() post: Posts): Promise<Posts> {
        return this.postsService.update(post);
    }


    @Delete('/:id')
    delete(@Param('id', ParseIntPipe) id: number): Promise<DeleteResult> {
        return this.postsService.delete(id);
    }
}
