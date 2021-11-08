import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoryDto } from './dto';
import { Category } from './entity';
import { CategoryPayload } from './payload';
import slugify from 'slugify';
import { UserDto } from '../user/dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
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
    user: UserDto,
  ): Promise<CategoryDto> {
    try {
      const slug = await this.generateSlug(categoryPayload.name);
      const category = new Category();

      category.name = categoryPayload.name;
      category.slug = slug;
      category.description = categoryPayload.description;
      category.thumbnail = categoryPayload.thumbnail;
      category.createdBy = user.username;

      const newCategory = await this.categoryRepository.save(category);

      return new CategoryDto(newCategory);
    } catch (error) {
      throw error;
    }
  }

  async findPostByCategorySlug(slug: string): Promise<any> {
    try {
      const category = await this.categoryRepository
        .createQueryBuilder('category')
        .where('category.slug = :slug', { slug })
        .leftJoinAndSelect('category.posts', 'posts')
        .leftJoinAndSelect('posts.tags', 'tags')
        .getOne();

      console.log(category);

      return category;
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

    if (category) throw new Error('Không tồn tại danh mục này!');

    return slug;
  }
}
