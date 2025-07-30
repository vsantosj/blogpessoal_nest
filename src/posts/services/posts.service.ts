import { HttpException, HttpStatus, Injectable} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike, DeleteResult } from 'typeorm';
import { Posts } from './entities/posts.entity';


@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Posts)
    private postRepository: Repository<Posts>,
  ) {}

  async findAll(): Promise<Posts[]> {
    return await this.postRepository.find({
      relations: {
        theme: true
      }
    });
  }


  async findById(id: number): Promise<Posts> {
    const posts = await this.postRepository.findOne({ 
      where: { id } ,
      relations:{
        theme:true
      }
    });
    
    if (!posts) {
      throw new HttpException (`Post com  ID: ${id} não encontrado!`, HttpStatus.NOT_FOUND)
    }
    
    return posts;
  }

  async findByTitle(title: string): Promise<Posts[]> {
    return await this.postRepository.find({
      where: { 
        title: ILike(`%${title}%`) 
      },
      relations:{
        theme:true
      }

    });
  }

  async create( post: Posts): Promise<Posts> {
    return await this.postRepository.save(post);
  }


  async update(post: Posts): Promise<Posts> {
        await this.findById(post.id);
    
    return await this.postRepository.save(post);
  }

  async delete(id: number): Promise<DeleteResult> {
        await this.findById(id);
        
        return await this.postRepository.delete(id);
  }
}