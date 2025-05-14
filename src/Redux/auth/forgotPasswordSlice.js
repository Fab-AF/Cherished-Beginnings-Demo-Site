import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { postApi } from "../api";
import { errorMeg, successMeg } from "@/modules/utils";

const initialState = {
  data: {},
  loading: false,
  error: null,
};

export const forgotPassword = createAsyncThunk(
  "data/forgotPassword",
  async (data) => {
    try {
      const response = await postApi(`/users/update-password`, data);
      if (response?.data?.success) {
        successMeg(response?.data?.messaeg);
      } else {
        errorMeg(response?.data?.error);
      }
      return response?.data;
    } catch (error) {
      throw error;
    }
  }
);

const forgotPasswordSlice = createSlice({
  name: "forgot-password",
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
  forgotPasswordSlice.actions;

export default forgotPasswordSlice?.reducer;
