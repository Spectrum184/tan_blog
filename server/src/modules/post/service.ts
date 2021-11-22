import slugify from 'slugify';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from '../category/entity';
import { TagService } from '../tag/service';
import { UserDto } from '../user/dto';
import { ListPostDto, PostDto } from './dto';
import { Post } from './entity';
import { PostPayload } from './payload';
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
        where: { slug, status: true },
        relations: ['tags', 'category', 'author'],
      });

      if (!post) return null;

      return new PostDto(post);
    } catch (error) {
      throw error;
    }
  }

  async findPosts({
    page,
    content = '',
    limit = 9,
    sort = 'time',
    order = 'DESC',
  }: PaginationQueryDto): Promise<IResultPagination<PostDto>> {
    try {
      const builder = this.postRepository
        .createQueryBuilder('posts')
        .leftJoinAndSelect('posts.tags', 'tags')
        .leftJoinAndSelect('posts.category', 'category')
        .leftJoinAndSelect('posts.author', 'author')
        .where('posts.title LIKE :content', { content: `%${content}%` });

      if (sort === 'time') builder.orderBy('posts.createdAt', order);

      if (sort === 'view') builder.orderBy('posts.views', order);

      const total = await builder.getCount();

      builder.skip((page - 1) * limit).take(limit);

      const posts = await builder.getMany();

      if (posts.length === 0)
        return {
          data: [],
          total: 0,
          page,
          totalPage: Math.ceil(total / limit),
        };

      const newPosts = posts.map((post) => new ListPostDto(post));

      return {
        data: newPosts,
        total,
        page,
        totalPage: Math.ceil(total / limit),
      };
    } catch (error) {
      throw error;
    }
  }

  async findPostByCondition(
    condition: 'time' | 'view',
  ): Promise<ListPostDto[]> {
    try {
      const builder = this.postRepository
        .createQueryBuilder('posts')
        .leftJoinAndSelect('posts.tags', 'tags')
        .leftJoinAndSelect('posts.category', 'category')
        .leftJoinAndSelect('posts.author', 'author');

      if (condition === 'time') builder.orderBy('posts.createdAt', 'DESC');

      if (condition === 'view') builder.orderBy('posts.views', 'DESC');

      const posts = await builder.take(3).getMany();

      if (posts.length === 0) return [];

      const arrPost = posts.map((post) => new ListPostDto(post));

      return arrPost;
    } catch (error) {
      throw error;
    }
  }

  async findRandomPosts(): Promise<ListPostDto[]> {
    try {
      const builder = this.postRepository
        .createQueryBuilder('posts')
        .orderBy('RANDOM()')
        .leftJoinAndSelect('posts.tags', 'tags')
        .leftJoinAndSelect('posts.category', 'category')
        .leftJoinAndSelect('posts.author', 'author');

      const posts = await builder.getMany();

      if (posts.length === 0) return [];
      console.log(posts.length);

      const arrPost = posts.slice(0, 5).map((post) => new ListPostDto(post));

      return arrPost;
    } catch (error) {
      throw error;
    }
  }
}
