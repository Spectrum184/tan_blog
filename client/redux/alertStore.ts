import { createSlice, PayloadAction, Dispatch } from "@reduxjs/toolkit";
import { IAlert } from "interface/alert";

const initialState: IAlert = {
  type: "success",
  message: "",
  show: false,
};

const alertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    setAlertState(state, action: PayloadAction<Partial<IAlert>>) {
      Object.assign(state, action.payload);
    },
  },
});

export const { setAlertState } = alertSlice.actions;

export const showAlert = (payload: IAlert) => (dispatch: Dispatch) => {
  dispatch(setAlertState(payload));
};

export default alertSlice.reducer;
