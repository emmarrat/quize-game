import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../../app/store";

interface UsersState {
  user: string | null;
  isSuccess: boolean;
}

const initialState: UsersState = {
  user: null,
  isSuccess: false,
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<string>) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    }
  }
});

export const usersReducer = usersSlice.reducer;
export const {login, logout} = usersSlice.actions;

export const selectUser = (state: RootState) => state.users.user;
