import {createAsyncThunk} from "@reduxjs/toolkit";
import {Category} from "../../types";
import axiosApi from "../../axiosApi";

export const fetchCategories = createAsyncThunk<Category[]>(
  'games/fetchCategories',
  async () => {
    const response = await axiosApi.get<Category[]>('categories?count=5');
    return response.data;
  }
);