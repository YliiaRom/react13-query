import { createSlice } from "@reduxjs/toolkit";
import { deletePosts, fetchPosts } from "./postsThunk.js";

const initialState = {
  postsList: [],
  // --пагінація
  // --яку оберуть сторінку
  currentPageNumber: 1,
  // --скільки постів на сторінці
  postsNumPerPage: 5,
  // --сторінки
  totalPageNumber: 1,
  status: "idle",
  error: null,
};

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    // --встановлює поточну сторінку
    setCurrentPage: (state, action) => {
      state.currentPageNumber = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "success";
        state.error = null;
        state.postsList = action.payload.items;
        const paginationDate = action.payload.pagination;
        state.currentPageNumber = paginationDate.currentPage;
        state.postsNumPerPage = paginationDate.pageSize;
        state.totalPageNumber = paginationDate.totalPages;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // deletePosts
      .addCase(deletePosts.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(deletePosts.fulfilled, (state, action) => {
        state.status = "success";
        state.error = null;
        state.postsList = state.postsList.filter(
          (item) => item.id !== action.payload
        );
      })
      .addCase(deletePosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});
export const { setCurrentPage } = postsSlice.actions;
export default postsSlice.reducer;
