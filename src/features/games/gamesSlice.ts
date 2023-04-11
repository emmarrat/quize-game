import {Category, Clue} from "../../types";
import {createSlice} from "@reduxjs/toolkit";
import {fetchCategories, fetchCluesByCategory} from "./gamesThunks";
import {RootState} from "../../app/store";

interface GamesState {
  categories: Category[];
  clues: Clue[];
  fetchLoading: boolean;
}

const initialState: GamesState = {
  categories: [],
  clues: [],
  fetchLoading: false,
};

export const gamesSlice = createSlice({
    name: 'games',
    initialState,
    reducers: {},
    extraReducers: builder => {
      builder.addCase(fetchCategories.pending, (state) => {
        state.fetchLoading = true;
      });
      builder.addCase(fetchCategories.fulfilled, (state, {payload: categories}) => {
        state.fetchLoading = false;
        state.categories = categories;
      });
      builder.addCase(fetchCategories.rejected, (state) => {
        state.fetchLoading = false;
      });
      builder.addCase(fetchCluesByCategory.pending, (state) => {
        state.clues = []
        state.fetchLoading = true;
      });
      builder.addCase(fetchCluesByCategory.fulfilled, (state, {payload: clues}) => {
        state.fetchLoading = false;
        state.clues = clues;
      });
      builder.addCase(fetchCluesByCategory.rejected, (state) => {
        state.fetchLoading = false;
      });
    }
  },
);

export const gamesReducer = gamesSlice.reducer;

export const selectCategories = (state: RootState) => state.games.categories;
export const selectClues = (state: RootState) => state.games.clues;
export const selectFetching = (state: RootState) => state.games.fetchLoading;

