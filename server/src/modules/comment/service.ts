import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IResultPagination } from 'src/common/interface';
import { PaginationQueryDto } from 'src/common/pagination';
import { Repository } from 'typeorm';
import { Post } from '../post/entity';
import { User } from '../user/entity';
import { CommentDto } from './dto';
import { Comment } from './entity';
import { CommentPayload } from './payload';

Injectable();
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Post) private readonly postRepository: Repository<Post>,
  ) {}

  async createComment(
    { content, postId }: CommentPayload,
    userId: string,
  ): Promise<CommentDto> {
    try {
      const user = await this.userRepository.findOne(userId);
      const post = await this.postRepository.findOne(postId);

      if (!user || !post)
        throw new NotFoundException(
          'Không tìm thấy bài đăng hoặc người bình luận!',
        );

      const newComment = new Comment();

      newComment.content = content;
      newComment.user = user;
      newComment.post = post;

      await this.commentRepository.save(newComment);

      return new CommentDto(newComment);
    } catch (error) {
      throw error;
    }
  }

  async findCommentsByPost(
    { page, limit = 9, order = 'DESC' }: PaginationQueryDto,
    postId: string,
  ): Promise<IResultPagination<CommentDto>> {
    try {
      const builder = this.commentRepository
        .createQueryBuilder('comments')
        .innerJoin('comments.post', 'post', 'post.id = :id', { id: postId })
        .leftJoinAndSelect('comments.user', 'user')
        .leftJoinAndSelect('comments.replies', 'replies')
        .leftJoinAndSelect('replies.user', 'replyUser')
        .orderBy('comments.createdAt', order);

      const total = await builder.getCount();

      builder.skip((page - 1) * limit).take(limit);

      console.log(builder.getSql());

      const comments = await builder.getMany();

      if (comments.length === 0)
        return {
          data: [],
          total: 0,
          page,
          totalPage: Math.ceil(total / limit),
        };

      const newComments = comments.map((comment) => new CommentDto(comment));
      return {
        data: newComments,
        total,
        page,
        totalPage: Math.ceil(total / limit),
      };
    } catch (error) {
      throw error;
    }
  }
}
