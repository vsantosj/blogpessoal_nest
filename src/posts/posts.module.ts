
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsController } from './controllers/posts.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Posts])],
    providers: [PostsService],
    controllers: [PostsController],
})
export class PostsModule { }
