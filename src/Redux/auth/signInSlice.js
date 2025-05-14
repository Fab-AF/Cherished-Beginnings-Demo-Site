import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { postApi } from "../api";
import { errorMeg, successMeg } from "@/modules/utils";

const initialState = {
  data: {},
  loading: false,
  error: null,
};

export const singIn = createAsyncThunk("data/singIn", async (data) => {
  try {
    const response = await postApi(`/users/login`, data);
    if (response?.data?.success) {
      successMeg(response?.data?.messaeg ?? "User login successfully.");
    } else {
      errorMeg(response?.data?.error);
    }
    return response?.data;
  } catch (error) {
    throw error;
  }
});

const signInSlice = createSlice({
  name: "sign-in",
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
      state.error = action.error.message;
    },
  },
});

export const { loadingStatus, successStatus, errorStatus } =
  signInSlice.actions;

export default signInSlice?.reducer;
