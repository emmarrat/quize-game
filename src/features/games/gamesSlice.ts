import {Category} from "../../types";
import {createSlice} from "@reduxjs/toolkit";
import {fetchCategories} from "./gamesThunks";
import {RootState} from "../../app/store";

interface GamesState {
  categories: Category[];
  fetchLoading: boolean;
}

const initialState: GamesState = {
  categories: [],
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
    }
  },
);

export const gamesReducer = gamesSlice.reducer;

export const selectCategories = (state: RootState) => state.games.categories;

export const selectFetching = (state: RootState) => state.games.fetchLoading;

