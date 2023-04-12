import {ClueCategorySorted} from "../../types";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {fetchCluesArray} from "./gamesThunks";
import {RootState} from "../../app/store";

interface GamesState {
  clues: ClueCategorySorted[];
  fetchLoading: boolean;
}

const initialState: GamesState = {
  clues: [],
  fetchLoading: false,
};

export const gamesSlice = createSlice({
    name: 'games',
    initialState,
    reducers: {
      markAnswered: (state, action: PayloadAction<number>) => {
        state.clues.forEach((clue) => {
          clue.clues.forEach((c) => {
            if(c.id === action.payload) {
              c.isAnswered = true;
            }
          })
        })
      },
    },
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
export const {markAnswered} = gamesSlice.actions;

export const selectClues = (state: RootState) => state.games.clues;
export const selectFetching = (state: RootState) => state.games.fetchLoading;

