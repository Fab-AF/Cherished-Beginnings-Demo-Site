import { createAsyncThunk } from "@reduxjs/toolkit";
import { postApi } from "../api";
import { errorMeg, successMeg  } from "@/modules/utils";

export const messageApi = createAsyncThunk(
  "data/messageApi",
  async (data) => {
    try {
      const response = await postApi(`/contact/send-message`,data);
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
