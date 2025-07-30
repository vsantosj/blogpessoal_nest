// src/posts/posts.service.ts
import { HttpException, HttpStatus, Injectable} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike, DeleteResult } from 'typeorm';
import { Post } from '../entities/post.entity';



@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
  ) {}

  async findAll(): Promise<Post[]> {
    return await this.postRepository.find({
    });
  }


  async findById(id: number): Promise<Post> {
    const post = await this.postRepository.findOne({ 
      where: { id } 
    });
    
    if (!post) {
      throw new HttpException (`Post com  ID: ${id} não encontrado!`, HttpStatus.NOT_FOUND)
    }
    
    return post;
  }

  async findByTitle(title: string): Promise<Post[]> {
    return await this.postRepository.find({
      where: { 
        title: ILike(`%${title}%`) 
      }

    })
  }

  async create( post: Post): Promise<Post> {
    return await this.postRepository.save(post);
  }


  async update(post: Post): Promise<Post> {
        await this.findById(post.id);
    
    return await this.postRepository.save(post);
  }

  async delete(id: number): Promise<DeleteResult> {
        await this.findById(id);
        
        return await this.postRepository.delete(id);
  }
}