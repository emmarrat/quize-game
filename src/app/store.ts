import {combineReducers, configureStore} from "@reduxjs/toolkit";

import {persistReducer, persistStore} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import {FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE} from 'redux-persist/es/constants';
import {gamesReducer} from "../features/games/gamesSlice";

const persistConfig = {
  key: 'game:users',
  storage,
  whitelist: ['user', 'clues', 'previousUsers', 'isGameStarted'],
}

const rootReducer = combineReducers({
  games: persistReducer(persistConfig, gamesReducer),
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);



export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;