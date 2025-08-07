import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entities';
import { AuthModule } from '../auth/auth.modules';
import { UserService } from './services/user.service';
import { UserController } from './controllers/user.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User]),
  forwardRef(()=> AuthModule)], 
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
