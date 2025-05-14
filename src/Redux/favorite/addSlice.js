import { errorMeg, successMeg } from "@/modules/utils";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { postApi } from "../api";

export const addFavoriteDetail = createAsyncThunk(
  "data/addFavoriteDetail",
  async (id) => {
    try {
      const response = await postApi(`/doula/add-to-favorite/${id}`);
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

export const removeAllFavoriteDetail = createAsyncThunk(
  "data/addFavoriteDetail",
  async (id) => {
    try {
      const response = await postApi(`/doula/remove-from-favorite`, id);
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
