import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import user from "./userStore";
import alert from "./alertStore";
import comment from "./commentStore";

export function makeStore() {
  return configureStore({
    reducer: { user, alert, comment },
  });
}

const store = makeStore();

type AppState = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useAppState = <T extends (state: AppState) => any>(
  selector: T,
): ReturnType<T> => useSelector(selector);

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>;

export default store;
