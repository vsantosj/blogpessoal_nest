
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsController } from './controllers/posts.controller';
import { Posts } from './entities/posts.entity';
import { PostsService } from './services/posts.service';
import { ThemeModule } from '../theme/theme.module';

@Module({
    imports: [TypeOrmModule.forFeature([Posts]), ThemeModule],
    providers: [PostsService],
    controllers: [PostsController],
    exports:[TypeOrmModule]
})
export class PostsModule { }
