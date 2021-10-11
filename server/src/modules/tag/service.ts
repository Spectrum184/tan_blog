import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { map, of } from 'rxjs';
import { Repository } from 'typeorm';
import { Tag } from './entity';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(Tag) private readonly tagRepository: Repository<Tag>,
  ) {}

  async createTags(name: string): Promise<string[]> {
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
}
