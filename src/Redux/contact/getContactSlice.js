import { errorMeg } from "@/modules/utils";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getApi } from "../api";

const initialState = {
  data: null,
  loading: false,
  error: null,
};

export const getDoulaContact = createAsyncThunk(
  "data/getDoulaContact",
  async (query="") => {
    try {
      const response = await getApi(`/contact/get-contact?${query}`);
      if (!response?.data?.success) {
        errorMeg(response?.data?.error);
      }
      return response?.data;
    } catch (error) {
      throw error;
    }
  }
);

const getDoulaContactSlice = createSlice({
  name: "get-doula-contact-list",
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
  getDoulaContactSlice.actions;

export default getDoulaContactSlice?.reducer;
