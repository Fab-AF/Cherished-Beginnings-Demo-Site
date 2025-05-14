import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { postApi } from "../api";
import { errorMeg, successMeg } from "@/modules/utils";

const initialState = {
  data: null,
  loading: false,
  error: null,
};

export const updateUserProfile = createAsyncThunk(
  "data/updateUserProfile",
  async (data) => {
    try {
      const response = await postApi(`/users/update-profile`, data, true);
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

const userProfileSlice = createSlice({
  name: "user-profile",
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
  userProfileSlice.actions;

export default userProfileSlice?.reducer;
