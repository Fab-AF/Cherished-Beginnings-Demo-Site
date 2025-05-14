import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getApi } from "../api";
import { errorMeg, successMeg } from "@/modules/utils";

const initialState = {
  data: null,
  loading: false,
  error: null,
};

export const getUserProfile = createAsyncThunk(
  "data/getUserProfile",
  async () => {
    try {
      const response = await getApi(`/users/profile`);
      if (!response?.data?.success) {
          errorMeg(response?.data?.error);
      }
      
      return response?.data;
    } catch (error) {
      throw error;
    }
  }
);

const getUserProfileSlice = createSlice({
  name: "get-user-profile",
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
  getUserProfileSlice.actions;

export default getUserProfileSlice?.reducer;
