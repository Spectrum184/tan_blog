import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { map, of } from 'rxjs';
import { IResultPagination } from 'src/common/interface';
import { PaginationQueryDto } from 'src/common/pagination';
import { Repository } from 'typeorm';
import { ListPostDto, PostDto } from '../post/dto';
import { Post } from '../post/entity';
import { TagDto } from './dto';
import { Tag } from './entity';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(Tag) private readonly tagRepository: Repository<Tag>,
    @InjectRepository(Post) private readonly postRepository: Repository<Post>,
  ) {}

  async generateTags(name: string): Promise<string[]> {
    try {
      const arrTag: string[] = [];
      const tags = name.split(',');

      of(...tags)
        .pipe(map((tag) => tag.replace(/\s/g, '')))
        .subscribe((tag) => arrTag.push(tag.toLowerCase()));

      return arrTag;
    } catch (error) {
      throw error;
    }
  }

  async createTags(tag: string): Promise<Tag[]> {
    try {
      const arrTag = await this.generateTags(tag);

      if (arrTag.length === 0) return [];

      const newArrTag = await Promise.all(
        arrTag.map(async (name: string) => {
          const tag = await this.tagRepository.findOne({
            name,
          });

          if (tag) return tag;

          const newTag = new Tag();
          newTag.name = name;

          const saveTag = await this.tagRepository.save(newTag);

          return saveTag;
        }),
      );

      return newArrTag;
    } catch (error) {
      throw error;
    }
  }

  async findAll(): Promise<TagDto> {
    try {
      const tags = await this.tagRepository.find();

      if (tags.length !== 0) return new TagDto(tags);

      return null;
    } catch (error) {
      throw error;
    }
  }

  async findPostByTag(
    name: string,
    {
      page,
      limit = 9,
      sort = 'time',
      order = 'DESC',
    }: Partial<PaginationQueryDto>,
  ): Promise<IResultPagination<PostDto>> {
    try {
      const builder = this.postRepository
        .createQueryBuilder('posts')
        .leftJoinAndSelect('posts.category', 'category')
        .innerJoinAndSelect('posts.tags', 'tags', 'tags.name = :name', {
          name,
        })
        .leftJoinAndSelect('posts.author', 'author')
        .loadRelationCountAndMap('posts.comments', 'posts.comments');

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
}
