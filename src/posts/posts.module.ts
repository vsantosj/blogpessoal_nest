
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsController } from './controllers/posts.controller';
import { Posts } from './entities/posts.entity';
import { PostsService } from './services/posts.service';

@Module({
    imports: [TypeOrmModule.forFeature([Posts])],
    providers: [PostsService],
    controllers: [PostsController],
})
export class PostsModule { }
