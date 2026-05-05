 import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

// -------------------- FETCH PRODUCTS (WITH PAGINATION + FILTERS) --------------------
// API call to get products with pagination, search and category filters
export const getProductsAsync = createAsyncThunk(
  'api/get',
  async (
    { pagination = 1, limit = 12, search = "", category = "all" },
    { rejectWithValue }
  ) => {
    try {
      // API request to fetch products list
      const response = await axios.get(
        `http://localhost:5000/api/products/get?pagination=${pagination}&limit=${limit}&search=${search}&category=${category}`
      );

      // return fetched products data
      return response.data;
    } catch (error) {
      // log error for debugging
      console.log('Fetch products Not Founds in getProductsAsync', error);

      // return backend error message
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

// -------------------- FETCH CATEGORIES --------------------
// API call to get all product categories
export const getCategoryAsync = createAsyncThunk(
  'api/category',
  async (_, { rejectWithValue }) => {
    try {
      // API request to fetch categories
      const response = await axios.get(
        `http://localhost:5000/api/products/categories`
      );

      // return categories data
      return response.data;
    } catch (error) {
      // log error for debugging
      console.log('Fetch products Not Founds in getCategory', error);

      // return backend error message
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

// -------------------- PRODUCT SLICE --------------------
const productSlice = createSlice({
  name: 'products',

  // initial state for product module
  initialState: {
    products: [],
    categories: [],
    totalProducts: 0,
    totalPages: null,
    currentPage: 1,
    LocalSearch: "",
    LocalCategory: "All",
    loading: false,
    error: null,
  },

  extraReducers: (builder) => {

    // -------------------- GET PRODUCTS --------------------
    builder
      .addCase(getProductsAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProductsAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.products;
        state.totalPages = action.payload.totalPages;
        state.currentPage = action.payload.currentPage;
        state.LocalSearch = action.payload.search;
        state.LocalCategory = action.payload.category;
      })
      .addCase(getProductsAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // -------------------- GET CATEGORIES --------------------
      .addCase(getCategoryAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      });
  }
});

export default productSlice.reducer;