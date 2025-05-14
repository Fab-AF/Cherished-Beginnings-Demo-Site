import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { postApi } from "../api";
import { errorMeg, successMeg } from "@/modules/utils";

const initialState = {
  data: {},
  loading: false,
  error: null,
};

export const changePassword = createAsyncThunk(
  "data/changePassword",
  async (data) => {
    try {
      const response = await postApi(`/users/change-password`, data);
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

const changePasswordSlice = createSlice({
  name: "change-password",
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
  changePasswordSlice.actions;

export default changePasswordSlice?.reducer;
