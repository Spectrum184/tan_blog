import { createSlice, PayloadAction, Dispatch } from "@reduxjs/toolkit";
import { IComment, ICommentPaginate } from "interface/comment";
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
      state.data.push(action.payload);
    },
  },
});

export const { setCommentData, addCommentData } = commentSlice.actions;

export const getComments =
  ({ postId, page }: IGetComment) =>
  async (dispatch: Dispatch) => {
    try {
      const res = await getDataAPI(
        `comment/post/${postId}/search?page=${page}&limit=9`,
      );

      console.log(res);
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

export default commentSlice.reducer;
