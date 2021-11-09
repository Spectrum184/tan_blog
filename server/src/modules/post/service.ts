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
import { PaginationQueryDto } from 'src/common/pagination';
import { IResultPagination } from 'src/common/interface';

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
  ): Promise<string> {
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

      await this.postRepository.save(newPost);

      return slug;
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

    if (post) throw new Error('Bài đăng đã tồn tại!');

    return slug;
  }

  async getPostBySlug(slug: string): Promise<PostDto> {
    try {
      const post = await this.postRepository.findOne({
        where: { slug: slug, status: true },
        relations: ['tags', 'category'],
      });

      return new PostDto(post);
    } catch (error) {
      throw error;
    }
  }

  async findPosts({
    page,
    param,
    perPage,
    sort,
  }: PaginationQueryDto): Promise<IResultPagination<PostDto>> {
    try {
      const limit = perPage || 9;
      const builder = this.postRepository
        .createQueryBuilder('posts')
        .leftJoinAndSelect('posts.tags', 'tags')
        .leftJoinAndSelect('posts.category', 'category')
        .leftJoinAndSelect('posts.author', 'author')
        .where('posts.title LIKE :param', { param: `%${param || ''}%` });

      if (sort) builder.orderBy('posts.createdAt', sort);

      const total = await builder.getCount();

      builder.offset((page - 1) * limit).limit(limit);

      const posts = await builder.getMany();

      if (posts.length === 0)
        return {
          data: [],
          total: 0,
          page,
          lastPage: Math.ceil(total / limit),
        };

      const newPosts = posts.map((post) => new PostDto(post));

      return {
        data: newPosts,
        total,
        page,
        lastPage: Math.ceil(total / limit),
      };
    } catch (error) {
      throw error;
    }
  }
}
