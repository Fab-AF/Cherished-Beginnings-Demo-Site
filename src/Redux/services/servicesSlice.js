import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getApi, getApiError } from "../api";
import { errorMeg } from "@/modules/utils";
import { clearLocalStore } from "@/modules/authentication";

const initialState = {
  data: null,
  loading: false,
  error: null,
};

export const getServicesList = createAsyncThunk(
  "data/getServicesList",
  async () => {
    try {
      const response = await getApi(`/get-services`);
      if (!response?.data?.success) {
        errorMeg(response?.data?.error);
      }
      return response?.data;
    } catch (error) {
      if (error?.response?.status === 401) {
        clearLocalStore();
        // window.location.replace("/");
        return errorMeg(getApiError(error));
      }
      // throw error;
    }
  }
);

const servicesListSlice = createSlice({
  name: "services-list",
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
  servicesListSlice.actions;

export default servicesListSlice?.reducer;
