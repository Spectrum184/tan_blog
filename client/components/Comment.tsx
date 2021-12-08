import { FC, useState, SyntheticEvent } from "react";
import { createComment } from "redux/commentStore";
import { useAppDispatch, useAppState } from "redux/store";

type PropTypes = {
  postId: string;
};

const Comment: FC<PropTypes> = ({ postId }) => {
  const { jwtToken } = useAppState((state) => state.user);
  const [content, setContent] = useState<string>("");
  const dispatch = useAppDispatch();

  const onComment = (e: SyntheticEvent) => {
    e.preventDefault();

    if (!content) return;

    dispatch(createComment({ postId, content, jwtToken }));
  };

  return (
    <form className="mt-2" onSubmit={onComment}>
      <h3 className="mb-4 text-2xl font-medium text-center">Viết bình luận</h3>
      <textarea
        itemType="text"
        name="comment"
        className="w-full px-4 py-3 mb-2 border border-transparent border-gray-200 rounded-lg focus:ring focus:ring-green-500 focus:outline-none"
        placeholder="Nội dung tối đa 1000 chữ..."
        rows={4}
        cols={33}
        value={content}
        onChange={(e) => setContent(e.target.value)}
      ></textarea>
      <input
        type="submit"
        value="Bình luận"
        name="submit"
        className=" text-white px-2 py-2 bg-green-500 rounded-lg cursor-pointer hover:bg-green-400"
      />
    </form>
  );
};

export default Comment;
