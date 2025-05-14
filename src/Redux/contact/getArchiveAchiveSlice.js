import { errorMeg, successMeg } from "@/modules/utils";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getApi } from "../api";

export const getDoulaArchiveAchive = createAsyncThunk(
  "data/getDoulaArchiveAchiveSlice",
  async (query) => {
    try {
      const response = await getApi(`/contact/${query}`);
      if (response?.data?.success) {
        successMeg(response?.data?.message);
      } else {
        errorMeg(response?.data?.error);
      }
      return response?.data;
    } catch (error) {
      throw error;
    }
  }
);
