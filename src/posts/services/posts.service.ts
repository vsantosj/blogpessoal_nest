// src/posts/posts.service.ts
import { HttpException, HttpStatus, Injectable} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike, DeleteResult } from 'typeorm';
import { Posts } from '../entities/posts.entity';



@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Posts)
    private postsRepository: Repository<Posts>,
  ) {}

  async findAll(): Promise<Posts[]> {
    return await this.postsRepository.find({
    });
  }


  async findById(id: number): Promise<Posts> {
    const post = await this.postsRepository.findOne({ 
      where: { id } 
    });
    
    if (!post) {
      throw new HttpException (`Post com  ID: ${id} não encontrado!`, HttpStatus.NOT_FOUND)
    }
    
    return post;
  }

  async findByTitle(title: string): Promise<Posts[]> {
    return await this.postsRepository.find({
      where: { 
        title: ILike(`%${title}%`) 
      }

    })
  }

  async create( post: Posts): Promise<Posts> {
    return await this.postsRepository.save(post);
  }


  async update(post: Posts): Promise<Posts> {
        await this.findById(post.id);
    
    return await this.postsRepository.save(post);
  }

  async delete(id: number): Promise<DeleteResult> {
        await this.findById(id);
        
        return await this.postsRepository.delete(id);
  }
}