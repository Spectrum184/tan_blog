import { FC, useEffect } from "react";
import { getComments, setCommentData } from "redux/commentStore";
import { useAppDispatch, useAppState } from "redux/store";
import Pagination from "./Pagination";

type PropTypes = {
  postId: string;
};

const CommentDisplay: FC<PropTypes> = ({ postId }) => {
  const { comment, user } = useAppState((state) => state);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getComments({ postId, page: 1 }));
  }, [dispatch, postId]);

  return (
    <div className="w-full">
      <h3 className="mb-4 text-lg font-semibold text-gray-900">Bình luận:</h3>
      <Pagination
        currentPage={comment.page}
        totalPage={comment.totalPage}
        onPageChange={(page) => dispatch(setCommentData({ page }))}
      />
    </div>
  );
};

export default CommentDisplay;
