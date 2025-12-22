import { createSlice } from "@reduxjs/toolkit";

const notesSlice = createSlice({
  name: "notes",
  initialState: {
    list: [],
  },
  reducers: {
    setNotes: (state, action) => {
      state.list = action.payload;
    },

    addNote: (state, action) => {
      state.list.push(action.payload);
    },

    updateNote: (state, action) => {
      console.log("action.payload :", action.payload);
      state.list = state.list.map((note) =>
        note._id === action.payload._id ? action.payload : note
      );
    },

    deleteNote: (state, action) => {
      state.list = state.list.filter((note) => note._id !== action.payload);
    },
  },
});

export const { setNotes, addNote, updateNote, deleteNote } = notesSlice.actions;

export default notesSlice.reducer;
