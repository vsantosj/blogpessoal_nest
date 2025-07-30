
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsController } from './controllers/post.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Post])],
    providers: [PostService],
    controllers: [PostsController],
})
export class PostsModule { }
