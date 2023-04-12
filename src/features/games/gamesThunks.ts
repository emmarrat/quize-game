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
export const fetchCluesByCategories = createAsyncThunk<Clue[][], number[]>(
  'games/fetchCluesByCategories',
  async (categoryIds) => {
    const promises = categoryIds.map(categoryId =>
      axiosApi.get<ClueData[]>(`clues?category=${categoryId}`)
        .then(response => response.data)
    );

    const responses = await Promise.all(promises);

    const cluesByCategories: Clue[][] = responses.map(clueData => {
      const sortedClues = clueData
        .map((res) => ({
          id: res.id,
          category: res.category.title,
          question: res.question,
          answer: res.answer,
          value: res.value,
        }))
        .slice(0, 5);
      return sortedClues;
    });

    return cluesByCategories;
  }
);

