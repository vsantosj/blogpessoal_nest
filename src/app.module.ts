import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsModule } from './posts/posts.module';
import { ThemeModule } from './theme/theme.module';
import { AuthModule } from './auth/auth.modules';
import { UserModule } from './user/user.module';
import { AppController } from './app.controller';
import { ProdService } from './data/services/prod.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      useClass: ProdService,
      imports: [ConfigModule],
    }),
    PostsModule, ThemeModule, AuthModule, UserModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule { }
