import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getApi } from "../api";
import { errorMeg  } from "@/modules/utils";

const initialState = {
  data: null,
  loading: false,
  error: null,
};

export const getLanguagesList = createAsyncThunk(
  "data/getLanguagesList",
  async () => {
    try {
      const response = await getApi(`/get-languages`);
      if (!response?.data?.success) {
        errorMeg(response?.data?.error);
      }
      return response?.data;
    } catch (error) {
      throw error;
    }
  }
);

const languageListSlice = createSlice({
  name: "language-list",
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
  languageListSlice.actions;

export default languageListSlice?.reducer;
