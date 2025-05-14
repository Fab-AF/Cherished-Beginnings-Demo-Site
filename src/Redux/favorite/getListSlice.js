import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getApi, postApi } from "../api";
import { errorMeg, successMeg } from "@/modules/utils";

const initialState = {
  data: null,
  loading: false,
  error: null,
};

export const getFavoriteDetail = createAsyncThunk(
  "data/getFavoriteDetail",
  async (query) => {
    try {
      const response = await getApi(
        `/doula/get-favorite?${query}`
      );
      if (!response?.data?.success) {
        errorMeg(response?.data?.error);
      }
      return response?.data;
    } catch (error) {
      throw error;
    }
  }
);

const getFavoriteDetailsSlice = createSlice({
  name: "get-favorite",
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
  getFavoriteDetailsSlice.actions;

export default getFavoriteDetailsSlice?.reducer;


