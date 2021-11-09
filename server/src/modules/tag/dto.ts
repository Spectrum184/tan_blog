import { PostDto } from '../post/dto';
import { Tag } from './entity';

export class TagDto {
  constructor(tags: Tag[]) {
    this.tags = tags.map((tag) => tag.name);
  }

  readonly tags: string[];
}

export class TagPostDto {
  constructor(tag: Tag) {
    this.tag = tag.name;
    this.posts = tag.posts?.map(
      (post) =>
        new PostDto({
          ...post,
          content: post.content.replace(/<[^>]*>/g, '').substr(0, 300),
        }),
    );
  }

  readonly posts: PostDto[];
  readonly tag: string;
}
