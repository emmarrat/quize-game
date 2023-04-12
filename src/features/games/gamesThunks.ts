import {createAsyncThunk} from "@reduxjs/toolkit";
import {ClueCategory, ClueCategorySorted} from "../../types";
import axiosApi from "../../axiosApi";
import {CATEGORY_ID} from "../../constants";

export const fetchCluesArray = createAsyncThunk<ClueCategorySorted[], void>(
  'games/fetchCluesWithCategory',
  async () => {
    const promises = CATEGORY_ID.map((categoryId) =>
      axiosApi.get<ClueCategory>(`category?id=${categoryId}`).then((response) => response.data)
    );
    const response = await Promise.all(promises);
    return response.map((res) => {
      return {
        ...res,
        clues: res.clues
          .filter(clue => clue.value !== null)
          .sort((a, b) => a.value - b.value) // Sort the array by the value property
          .filter((clue, index, array) => {  // Filter the array to include only one object with each value
            if (index === 0) {
              return true;  // Always include the first object
            }
            return clue.value !== array[index - 1].value; // Only include objects with a new value
          })
          .slice(0, 5)
          .map((res) => {
            return {
              ...res,
              isAnswered: false
            }
          })
      }
    })
  }
);

