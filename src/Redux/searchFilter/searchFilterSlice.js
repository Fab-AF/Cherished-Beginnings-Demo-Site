import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const initialFilterValue = {
  service: [],
  location: "",
  dateFrom: "",
  dateTo: "",
  child_info: [],
};

const initialState = {
  data: initialFilterValue,
  loading: false,
  error: null,
};

const searchFilterSlice = createSlice({
  name: "search-filter",
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
  searchFilterSlice.actions;

export default searchFilterSlice?.reducer;
