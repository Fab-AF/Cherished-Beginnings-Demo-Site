import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { postApi } from "../api";
import { errorMeg, successMeg } from "@/modules/utils";

const initialState = {
  data: {},
  loading: false,
  error: null,
  loading: false,
};

export const singUp = createAsyncThunk("data/singUp", async (data) => {
  try {
    const response = await postApi(`/users/register`, data);
    if (response?.data?.success) {
      successMeg(response?.data?.messaeg);
    } else {
      errorMeg(response?.data?.error);
    }
    return response?.data;
  } catch (error) {
    throw error;
  }
});

const signUpSlice = createSlice({
  name: "sign-up",
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
    setLoadingValue: (state, action) => {
      state.loading = action?.payload;
    },
  },
});

export const { setLoadingValue, loadingStatus, successStatus, errorStatus } =
  signUpSlice.actions;

export default signUpSlice?.reducer;
