import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { map, of } from 'rxjs';
import { Repository } from 'typeorm';
import { TagDto, TagPostDto } from './dto';
import { Tag } from './entity';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(Tag) private readonly tagRepository: Repository<Tag>,
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

  async findPostByTag(tagName: string): Promise<any> {
    try {
      const tag = await this.tagRepository
        .createQueryBuilder('tag')
        .where('tag.name = :tagName', { tagName })
        .leftJoinAndSelect('tag.posts', 'posts', 'posts.status = :status', {
          status: true,
        })
        .leftJoinAndSelect('posts.category', 'category')
        .leftJoinAndSelect('posts.author', 'author')
        .getOne();

      return new TagPostDto(tag);
    } catch (error) {
      throw error;
    }
  }
}
