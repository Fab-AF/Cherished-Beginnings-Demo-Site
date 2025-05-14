import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { postApi } from "../api";
import { errorMeg, successMeg } from "@/modules/utils";

const initialState = {
  data: null,
  loading: false,
  error: null,
};

export const updateDoulaProfile = createAsyncThunk(
  "data/updateDoulaProfile",
  async (data) => {
    try {
      const response = await postApi(
        `/doula/update-profile?step=${data?.step}`,
        data?.data,
        [2,3]?.includes(data?.step) ? false : true
      );
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

const doulaProfileSlice = createSlice({
  name: "doula-profile",
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
  doulaProfileSlice.actions;

export default doulaProfileSlice?.reducer;
