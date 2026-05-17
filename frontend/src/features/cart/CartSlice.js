 import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { verifyPaymentAsync } from "../payment/PaymentSlice";

// -------------------- CART CREATE API --------------------
export const createCartAsync = createAsyncThunk(
  'api/create',
  async (cartData, { getState, rejectWithValue }) => {
    try {
      // getting auth token from redux state
      const token = getState().authLogin.token;

      // API call to create cart item
      const response = await axios.post(
        '/api/carts/create',
        cartData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // returning backend response
      return response.data;
    } catch (error) {
      // handling error from backend
      return rejectWithValue(
        error?.response?.data || 'backend error in cartcontroller in create'
      );
    }
  }
);

// -------------------- CART DELETE API --------------------
export const deleteCartAsync = createAsyncThunk(
  'api/delete',
  async (productId, { getState, rejectWithValue }) => {
    try {
      // getting auth token from redux state
      const token = getState().authLogin.token;

      // API call to delete product from cart
      const response = await axios.delete(
        `api/carts/delete/${productId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // returning updated cart data
      return response.data;
    } catch (error) {
      // handling delete error
      return rejectWithValue(
        error?.response?.data || 'backend error in cartcontroller in delete'
      );
    }
  }
);

// -------------------- CART SLICE --------------------
const CartSlice = createSlice({
  name: 'carts',

  // initial state for cart module
  initialState: {
    carts: [],
    totalItems: 0,
    totalPrice: 0,
    loading: false,
    error: null
  },

  extraReducers: (builder) => {

    // -------------------- CREATE CART --------------------
    builder.addCase(createCartAsync.pending, (state) => {
      state.loading = true;
    })
    .addCase(createCartAsync.fulfilled, (state, action) => {
      state.loading = false;
      state.carts = action.payload.carts;
      state.totalPrice = action.payload.totalPrice;
      state.totalItems = action.payload.totalItems;
    })
    .addCase(createCartAsync.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })

    // -------------------- DELETE CART ITEM --------------------
    .addCase(deleteCartAsync.fulfilled, (state, action) => {
      state.carts = action.payload.carts;
    })

    // -------------------- PAYMENT SUCCESS → CLEAR CART --------------------
    .addCase(verifyPaymentAsync.fulfilled, (state, action) => {
      state.loading = false;
      state.carts = [];
      state.totalPrice = 0;
    });
  }
});

export default CartSlice.reducer;