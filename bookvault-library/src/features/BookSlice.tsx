import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import axios from "axios";

export interface Book {
  id?: number;
  title: string;
  author: string;
  price: number;
  category: string;
}

interface BookState {
  data: Book[];
  loading: boolean;
  error: string | null;
  selectedBook: Book | null;
  isEditModalOpen: boolean;
}

const initialState: BookState = {
  data: [],
  loading: false,
  error: null,
  selectedBook: null,
  isEditModalOpen: false,
};

const API_URL = "http://localhost:5000/books";

export const fetchBooks = createAsyncThunk("books/fetchBooks", async () => {
  const response = await axios.get(API_URL);
  return response.data as Book[];
});

export const addBook = createAsyncThunk("books/addBook", async (newBook: Book) => {
  const response = await axios.post(API_URL, newBook);
  return response.data as Book;
});

export const updateBook = createAsyncThunk("books/updateBook", async (book: Book) => {
  const response = await axios.put(`${API_URL}/${book.id}`, book);
  return response.data as Book;
});

export const deleteBook = createAsyncThunk("books/deleteBook", async (id: number) => {
  await axios.delete(`${API_URL}/${id}`);
  return id;
});

const bookSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    openEditModal(state, action: PayloadAction<Book>) {
      state.selectedBook = action.payload;
      state.isEditModalOpen = true;
    },
    closeEditModal(state) {
      state.selectedBook = null;
      state.isEditModalOpen = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBooks.fulfilled, (state, action: PayloadAction<Book[]>) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchBooks.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to fetch books";
      })

      .addCase(addBook.pending, (state) => {
        state.loading = true;
      })
      .addCase(addBook.fulfilled, (state, action: PayloadAction<Book>) => {
        state.loading = false;
        state.data.push(action.payload);
      })

      .addCase(updateBook.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateBook.fulfilled, (state, action: PayloadAction<Book>) => {
        state.loading = false;
        state.data = state.data.map((book) =>
          book.id === action.payload.id ? action.payload : book
        );
        state.selectedBook = null;
        state.isEditModalOpen = false;
      })

      .addCase(deleteBook.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteBook.fulfilled, (state, action: PayloadAction<number>) => {
        state.loading = false;
        state.data = state.data.filter((book) => book.id !== action.payload);
      });
  },
});

export const { openEditModal, closeEditModal } = bookSlice.actions;
export default bookSlice.reducer;
