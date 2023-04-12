import {Category, Clue} from "../../types";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {fetchCategories, fetchCluesByCategories} from "./gamesThunks";
import {RootState} from "../../app/store";

interface GamesState {
  categories: Category[];
  clues: Clue[][];
  fetchLoading: boolean;
  user: string | null;
}

const initialState: GamesState = {
  categories: [],
  clues: [[], [], [], [], []],
  fetchLoading: false,
  user: null,
};

export const gamesSlice = createSlice({
    name: 'games',
    initialState,
    reducers: {
      login: (state, action: PayloadAction<string>) => {
        state.user = action.payload;
      },
      logout: (state) => {
        state.user = null;
      }
    },
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
      builder.addCase(fetchCluesByCategories.pending, (state) => {
        state.clues = []
        state.fetchLoading = true;
      });
      builder.addCase(fetchCluesByCategories.fulfilled, (state, {payload: clues}) => {
        state.fetchLoading = false;
        state.clues = clues;
      });
      builder.addCase(fetchCluesByCategories.rejected, (state) => {
        state.fetchLoading = false;
      });
    }
  },
);

export const gamesReducer = gamesSlice.reducer;
export const {login, logout} = gamesSlice.actions;

export const selectCategories = (state: RootState) => state.games.categories;
export const selectClues = (state: RootState) => state.games.clues;
export const selectUser = (state: RootState) => state.games.user;

export const selectFetching = (state: RootState) => state.games.fetchLoading;

