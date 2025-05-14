import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getApi, postApi } from "../api";
import { errorMeg ,successMeg } from "@/modules/utils";

const initialState = {
  data: null,
  loading: false,
  error: null,
};

export const updateAvailability = createAsyncThunk(
  "data/updateAvailability",
  async (data) => {
    try {
      const response = await postApi(`/doula/update-availability`,data);
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

const updateAvailabilitySlice = createSlice({
  name: "availability-list",
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
  updateAvailabilitySlice.actions;

export default updateAvailabilitySlice?.reducer;
