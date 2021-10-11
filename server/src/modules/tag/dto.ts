import { Tag } from './entity';

export class TagDto {
  constructor(tags: Tag[]) {
    this.tags = tags.map((tag) => tag.name);
  }

  readonly tags: string[];
}
