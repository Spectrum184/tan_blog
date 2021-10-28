import { IUser } from "../interface/user";
import { createSlice, PayloadAction, Dispatch } from "@reduxjs/toolkit";
import { ILogin } from "../interface/auth";
import { postDataAPI } from "../utils/fetchData";
import { AxiosError } from "axios";

const initialState: IUser = {
  username: "",
  email: "",
  avatar: "",
  name: "",
  about: "",
  id: "",
  createdAt: "",
  roles: [],
  isActivated: false,
  jwtToken: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserState(state, action: PayloadAction<Partial<IUser>>) {
      Object.assign(state, action.payload);
    },
  },
});

export const { setUserState } = userSlice.actions;

export const login = (payload: ILogin) => async (dispatch: Dispatch) => {
  try {
    const res = await postDataAPI("auth/login", payload);

    dispatch(setUserState(res.data));
  } catch (error: any) {
    console.log(error.response);
  }
};

export const refresh = () => async (dispatch: Dispatch) => {
  try {
    const res = await postDataAPI("auth/refresh-token", {});

    dispatch(setUserState(res.data));
  } catch (error: any) {
    console.log(error.response);
  }
};

export default userSlice.reducer;
