import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getApi, postApi } from "../api";
import { errorMeg ,successMeg } from "@/modules/utils";

const initialState = {
  data: null,
  loading: false,
  error: null,
};

export const getDoulaDetailsContact = createAsyncThunk(
  "data/getDoulaDetailsContact",
  async (id) => {
    try {
      const response = await getApi(`/contact/get-contact/${id}`);
      if (!response?.data?.success) {
        errorMeg(response?.data?.error);
      }
      return response?.data;
    } catch (error) {
      throw error;
    }
  }
);

const getDoulaDetailSlice = createSlice({
  name: "get-doula-contact-details",
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
  getDoulaDetailSlice.actions;

export default getDoulaDetailSlice?.reducer;
