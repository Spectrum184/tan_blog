import Pagination from "../Pagination";

import { FC, useEffect } from "react";
import { getComments, setCommentData } from "redux/commentStore";
import { useAppDispatch, useAppState } from "redux/store";
import CommentCard from "./CommentCard";

type PropTypes = {
  postId: string;
};

const CommentDisplay: FC<PropTypes> = ({ postId }) => {
  const { comment } = useAppState((state) => state);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getComments({ postId, page: 1 }));
  }, [dispatch, postId]);

  return (
    <div className="w-full">
      <h3 className="mb-4 text-lg font-semibold text-gray-900">Bình luận:</h3>
      {comment.data.length > 0 &&
        comment.data.map((c) => (
          <CommentCard
            user={c.user}
            content={c.content}
            createdAt={c.createdAt}
            key={c.id}
            id={c.id}
          />
        ))}
      <Pagination
        currentPage={comment.page}
        totalPage={comment.totalPage}
        onPageChange={(page) => dispatch(setCommentData({ page }))}
      />
    </div>
  );
};

export default CommentDisplay;
