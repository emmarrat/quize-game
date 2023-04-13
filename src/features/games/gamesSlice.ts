import {ClueCategorySorted, User} from "../../types";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {fetchCluesArray} from "./gamesThunks";
import {RootState} from "../../app/store";

interface GamesState {
  clues: ClueCategorySorted[];
  fetchLoading: boolean;
  user: User | null;
  previousUsers: User[];
  isGameStarted: boolean;
}

const initialState: GamesState = {
  clues: [],
  fetchLoading: false,
  user: null,
  previousUsers: [],
  isGameStarted: false,
};

export const gamesSlice = createSlice({
    name: 'games',
    initialState,
    reducers: {
      login: (state, action: PayloadAction<string>) => {
        state.user = {
          name: action.payload,
          currentScore: 0,
          scores: [],
        };
        state.isGameStarted = true;
      },
      logout: (state) => {
        if (state.user) {
          state.user.scores.push(state.user.currentScore);
          state.user.currentScore = 0;
          state.previousUsers.push(state.user);
          state.user = null;
        }
        state.isGameStarted = false;
      },
      markAnswered: (state, action: PayloadAction<number>) => {
        state.clues.forEach((clue) => {
          clue.clues.forEach((c) => {
            if (c.id === action.payload) {
              c.isAnswered = true;
            }
          })
        });
      },
      incrementScore: (state, action: PayloadAction<number>) => {
        if (state.user) {
          state.user.currentScore += action.payload;
        }
      },
      decrementScore: (state, action: PayloadAction<number>) => {
        if (state.user) {
          state.user.currentScore -= action.payload;
        }
      },
      endGame: (state) => {
        if (state.user) {
          state.isGameStarted = false;
          state.user.scores.push(state.user.currentScore);
          state.clues.forEach((clue) => {
            clue.clues.forEach((c) => {
              c.isAnswered = false;
            })
          });
        }
      },
      startGame: (state) => {
        if (state.user) {
          state.user.currentScore = 0;
          state.isGameStarted = true;
        }
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
export const {login, logout, markAnswered, incrementScore, decrementScore, endGame, startGame} = gamesSlice.actions;

export const selectClues = (state: RootState) => state.games.clues;
export const selectUser = (state: RootState) => state.games.user;
export const selectPreviousUsers = (state: RootState) => state.games.previousUsers;
export const selectGameStatus = (state: RootState) => state.games.isGameStarted;
export const selectFetching = (state: RootState) => state.games.fetchLoading;

