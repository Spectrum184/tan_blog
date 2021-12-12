import { createSlice, PayloadAction, Dispatch } from "@reduxjs/toolkit";
import { IComment, ICommentPaginate, IReply } from "interface/comment";
import { getDataAPI, postDataAPI } from "utils/fetchData";
import { setAlertState } from "./alertStore";

interface IGetComment {
  postId: string;
  page: number;
}

interface ICreateComment {
  postId: string;
  content: string;
  jwtToken?: string;
}

interface ICreateReply {
  commentId: string;
  content: string;
  jwtToken?: string;
}

const initialState: ICommentPaginate = {
  data: [],
  totalPage: 1,
  page: 1,
};

const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {
    setCommentData(state, action: PayloadAction<Partial<ICommentPaginate>>) {
      Object.assign(state, action.payload);
    },
    addCommentData(state, action: PayloadAction<IComment>) {
      state.data.unshift(action.payload);
    },
    addReplyData(
      state,
      action: PayloadAction<{ commentId: string; reply: IReply }>,
    ) {
      for (const comment of state.data) {
        if (comment.id === action.payload.commentId) {
          comment.replies?.unshift(action.payload.reply);
        }
      }
    },
  },
});

export const { setCommentData, addCommentData, addReplyData } =
  commentSlice.actions;

export const getComments =
  ({ postId, page }: IGetComment) =>
  async (dispatch: Dispatch) => {
    try {
      const res = await getDataAPI(
        `comment/post/${postId}/search?page=${page}&limit=9`,
      );
      const data = await res.data;

      dispatch(
        setCommentData({
          data: data.data,
          page: data.page,
          totalPage: data.totalPage,
        }),
      );
    } catch (error: any) {
      dispatch(
        setAlertState({
          show: true,
          type: "error",
          message: error.response.data.message,
        }),
      );
    }
  };

export const createComment =
  ({ postId, content, jwtToken }: ICreateComment) =>
  async (dispatch: Dispatch) => {
    try {
      const res = await postDataAPI("comment", { postId, content }, jwtToken);

      const comment: IComment = await res.data;

      dispatch(addCommentData(comment));
    } catch (error: any) {
      dispatch(
        setAlertState({
          show: true,
          type: "error",
          message: error.response.data.message,
        }),
      );
    }
  };

export const createReply =
  ({ commentId, content, jwtToken }: ICreateReply) =>
  async (dispatch: Dispatch) => {
    try {
      const res = await postDataAPI("reply", { commentId, content }, jwtToken);

      dispatch(addReplyData(res.data));
    } catch (error: any) {
      dispatch(
        setAlertState({
          show: true,
          type: "error",
          message: error.response.data.message,
        }),
      );
    }
  };

export default commentSlice.reducer;
