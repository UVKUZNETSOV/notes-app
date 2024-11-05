import { configureStore } from '@reduxjs/toolkit';
import noteReducer from './notesSlice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      notes: noteReducer,
    },
  });
};