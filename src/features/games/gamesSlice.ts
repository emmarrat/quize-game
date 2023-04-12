import {ClueCategory} from "../../types";
import {createSlice} from "@reduxjs/toolkit";
import {fetchCluesArray} from "./gamesThunks";
import {RootState} from "../../app/store";

interface GamesState {
  clues: ClueCategory[];
  fetchLoading: boolean;
}

const initialState: GamesState = {
  clues: [],
  fetchLoading: false,
};

export const gamesSlice = createSlice({
    name: 'games',
    initialState,
    reducers: {},
    extraReducers: builder => {

      builder.addCase(fetchCluesArray.pending, (state) => {
        state.clues = []
        state.fetchLoading = true;
      });
      builder.addCase(fetchCluesArray.fulfilled, (state, {payload: clues}) => {
        state.fetchLoading = false;
        state.clues = clues;
      });
      builder.addCase(fetchCluesArray.rejected, (state) => {
        state.fetchLoading = false;
      });
    }
  },
);

export const gamesReducer = gamesSlice.reducer;

export const selectClues = (state: RootState) => state.games.clues;
export const selectFetching = (state: RootState) => state.games.fetchLoading;

