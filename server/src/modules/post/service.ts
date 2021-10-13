import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from '../category/entity';
import { TagService } from '../tag/service';
import { UserDto } from '../user/dto';
import { PostDto } from './dto';
import { Post } from './entity';
import { PostPayload } from './payload';
import slugify from 'slugify';
import { User } from '../user/entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post) private readonly postRepository: Repository<Post>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    private readonly tagService: TagService,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async createPost(
    { title, content, status, categoryId, tag, thumbnail }: PostPayload,
    user: UserDto,
  ): Promise<PostDto> {
    try {
      const slug = await this.generateSlug(title);
      const author = await this.userRepository.findOne({ id: user.id });

      const category = await this.categoryRepository.findOne({
        id: categoryId,
      });

      const arrTag = await this.tagService.createTags(user.username, tag);

      const newPost = new Post();

      newPost.category = category;
      newPost.title = title;
      newPost.author = author;
      newPost.content = content;
      newPost.tags = arrTag;
      newPost.createdBy = user.username;
      newPost.slug = slug;
      newPost.status = status;
      newPost.thumbnail = thumbnail;

      const savePost = await this.postRepository.save(newPost);

      return new PostDto(savePost, category, arrTag);
    } catch (error) {
      throw error;
    }
  }

  async generateSlug(name: string): Promise<string> {
    const slug = slugify(name, {
      replacement: '-',
      trim: true,
      lower: true,
      locale: 'vi',
    });

    const post = await this.postRepository.findOne({
      slug,
    });

    if (post) throw new Error('This category is existed!');

    return slug;
  }
}
