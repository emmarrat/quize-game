import {createAsyncThunk} from "@reduxjs/toolkit";
import {Category, Clue, ClueData} from "../../types";
import axiosApi from "../../axiosApi";

export const fetchCategories = createAsyncThunk<Category[]>(
  'games/fetchCategories',
  async () => {
    const response = await axiosApi.get<Category[]>('categories?count=5');
    return response.data;
  }
);

export const fetchCluesByCategory = createAsyncThunk<Clue[], number>(
  'games/fetchCluesByCategory',
  async(categoryId) => {
    const response = await axiosApi.get<ClueData[]>('clues?category=' + categoryId);
    const responseData = response.data;

    const sortedResponse: Clue[] = responseData.map((res) => {
      return {
        id: res.id,
        category: res.category.title,
        question: res.question,
        answer: res.answer,
        value: res.value,
      }
    });
    return sortedResponse.slice(0, 5);
  }
)