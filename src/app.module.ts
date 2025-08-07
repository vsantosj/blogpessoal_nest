import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsModule } from './posts/posts.module';
import { Posts } from './posts/entities/posts.entity';
import { ThemeModule } from './theme/theme.module';
import { Theme } from './theme/entities/theme.entity';
import { AuthModule } from './auth/auth.modules';
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entities';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: 3306,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [Posts, Theme, User],
      synchronize: process.env.NODE_ENV === 'development',
      logging: process.env.NODE_ENV === 'development',
    }),
    PostsModule, ThemeModule, AuthModule, UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
