interface ICommentUser {
  id: string;
  username: string;
  avatar: string;
  name: string;
}

export interface IReply {
  id: string;
  content: string;
  user: ICommentUser;
  commentId: string;
  createdAt: string;
}

export interface IComment {
  id: string;
  content: string;
  createdAt: string;
  user: ICommentUser;
  replies?: IReply[];
}

export interface ICommentPaginate {
  data: IComment[];
  page: number;
  totalPage: number;
}
