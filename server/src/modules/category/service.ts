import slugify from 'slugify';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoryDto } from './dto';
import { Category } from './entity';
import { CategoryPayload } from './payload';
import { PaginationQueryDto } from 'src/common/pagination';
import { ListPostDto, PostDto } from '../post/dto';
import { IResultPagination } from 'src/common/interface';
import { Post } from '../post/entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    @InjectRepository(Post) private readonly postRepository: Repository<Post>,
  ) {}

  async findAllCategories(): Promise<CategoryDto[]> {
    try {
      const categories = await this.categoryRepository
        .createQueryBuilder('categories')
        .loadRelationCountAndMap('categories.posts', 'categories.posts')
        .getMany();

      if (categories.length === 0) return [];

      const arrCategories = categories.map(
        (category) => new CategoryDto(category),
      );

      return arrCategories;
    } catch (error) {
      throw error;
    }
  }

  async createdCategory(
    categoryPayload: CategoryPayload,
  ): Promise<CategoryDto> {
    try {
      const slug = await this.generateSlug(categoryPayload.name);
      const category = new Category();

      category.name = categoryPayload.name;
      category.slug = slug;
      category.description = categoryPayload.description;
      category.thumbnail = categoryPayload.thumbnail;

      const newCategory = await this.categoryRepository.save(category);

      return new CategoryDto(newCategory);
    } catch (error) {
      throw error;
    }
  }

  async findPostByCategorySlug(
    slug: string,
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
        .leftJoinAndSelect('posts.tags', 'tags')
        .innerJoinAndSelect(
          'posts.category',
          'category',
          'category.slug = :slug',
          { slug },
        )
        .leftJoinAndSelect('posts.author', 'author');

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

  async deleteCategory(id: string): Promise<boolean> {
    try {
      const result = await this.categoryRepository.delete({ id });

      return result.affected !== null;
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

    const category = await this.categoryRepository.findOne({
      slug,
    });

    if (category) throw new Error('Đã tồn tại danh mục này!');

    return slug;
  }
}
