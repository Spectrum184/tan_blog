import { IUser } from "../interface/user";
import { createSlice, PayloadAction, Dispatch } from "@reduxjs/toolkit";
import { ILogin, IRegister } from "../interface/auth";
import { postDataAPI } from "../utils/fetchData";
import { setAlertState } from "./alertStore";

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

    localStorage.setItem("logged", "true");

    if (typeof window !== "undefined") window.location.href = "/";
  } catch (error: any) {
    dispatch(
      setAlertState({
        show: true,
        type: "error",
        message: error.response.message,
      })
    );
    localStorage.clear();
  }
};

export const refresh = () => async (dispatch: Dispatch) => {
  try {
    const res = await postDataAPI("auth/refresh-token", {});

    dispatch(setUserState(res.data));

    localStorage.setItem("logged", "true");
  } catch (error: any) {
    dispatch(
      setAlertState({
        show: true,
        type: "error",
        message: error.response.message,
      })
    );
    localStorage.clear();
  }
};

export const register = (payload: IRegister) => async (dispatch: Dispatch) => {
  try {
    const res = await postDataAPI("auth/register", payload);

    dispatch(setUserState(res.data));
    localStorage.setItem("logged", "true");

    if (typeof window !== "undefined") window.location.href = "/";
  } catch (error: any) {
    dispatch(
      setAlertState({
        show: true,
        type: "error",
        message: error.response.message,
      })
    );
    localStorage.clear();
  }
};

export const logout = () => async (dispatch: Dispatch) => {
  try {
    localStorage.clear();
    await postDataAPI("auth/logout", {});
    if (typeof window !== "undefined") window.location.href = "/";
  } catch (error: any) {
    dispatch(
      setAlertState({
        show: true,
        type: "error",
        message: error.response.message,
      })
    );
  }
};

export default userSlice.reducer;
