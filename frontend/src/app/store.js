import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import loginReducer from '../features/auth/authSlice.js';

const persistConfig = {
  key: 'auth',
  storage,
  whitelist: ['token', 'user']
};

const persistedReducer = persistReducer(persistConfig, loginReducer);

export const store = configureStore({
  reducer: {
    auth: persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

export const persister = persistStore(store);