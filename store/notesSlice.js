"use client"

import { createSlice } from '@reduxjs/toolkit';
import { startOfWeek, startOfMonth } from 'date-fns';

const notesSlice = createSlice({
  name: 'notes',
  initialState: {
    allNotes: [],
    filteredNotes: [],
  },
  reducers: {
    setNotes: (state, action) => {
      state.allNotes = action.payload;
      state.filteredNotes = action.payload;
    },
    addNote: (state, action) => {
      state.allNotes.push(action.payload);
      state.filteredNotes.push(action.payload);
    },
    deleteNote: (state, action) => {
      state.allNotes = state.allNotes.filter(note => note.id !== action.payload);
      state.filteredNotes = state.filteredNotes.filter(note => note.id !== action.payload);
    },
    filterByWeek: (state) => {
      const startOfCurrentWeek = startOfWeek(new Date());
      state.filteredNotes = state.allNotes.filter(note => {
        const noteDate = new Date(note.created_at);
        return noteDate >= startOfCurrentWeek;
      });
    },
    filterByMonth: (state) => {
      const startOfCurrentMonth = startOfMonth(new Date());
      state.filteredNotes = state.allNotes.filter(note => {
        const noteDate = new Date(note.created_at);
        return noteDate >= startOfCurrentMonth;
      });
    },
    clearFilter: (state) => {
      state.filteredNotes = state.allNotes;
    },
  },
});

export const { setNotes, addNote, filterByWeek, filterByMonth, clearFilter, deleteNote } = notesSlice.actions;
export default notesSlice.reducer;