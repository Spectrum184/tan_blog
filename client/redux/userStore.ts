import { IUser } from "../interface/user";
import { createSlice, PayloadAction, Dispatch } from "@reduxjs/toolkit";
import { ILogin } from "../interface/auth";

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
  } catch (error) {}
};

export default userSlice.reducer;
