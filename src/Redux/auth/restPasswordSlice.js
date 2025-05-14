import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { postApi } from "../api";
import { errorMeg, successMeg } from "@/modules/utils";

const initialState = {
  data: {},
  loading: false,
  error: null,
};

export const resetPassword = createAsyncThunk(
  "data/resetPassword",
  async (data) => {
    try {
      const response = await postApi(`/users/send-reset-password-email`, data);
      if (response?.data?.success) {
        successMeg(response?.data?.messaeg)
      }else{
        errorMeg(response?.data?.error);
      }
      return response?.data;
    } catch (error) {
      throw error;
    }
  }
);

const resetPasswordsSlice = createSlice({
  name: "rest-password",
  initialState,
  reducers: {
    loadingStatus: (state) => {
      state.loading = true;
      state.error = null;
    },
    successStatus: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    errorStatus: (state, action) => {
      state.loading = false;
      state.error = action?.error?.message;
    },
  },
});

export const { loadingStatus, successStatus, errorStatus } =
  resetPasswordsSlice.actions;

export default resetPasswordsSlice?.reducer;
