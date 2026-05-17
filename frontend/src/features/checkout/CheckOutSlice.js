 import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { verifyPaymentAsync } from "../payment/PaymentSlice";

// -------------------- CREATE CHECKOUT / ORDER API --------------------
export const createCheckoutAsync = createAsyncThunk(
  'api/address',
  async (address, { getState, rejectWithValue }) => {
    try {
      // getting auth token from redux state
      const token = getState().authLogin.token;

      // API call to create order/checkout
      const response = await axios.post(
        'http://localhost:5000/api/orders/create',
        address,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // return backend response
      return response.data;
    } catch (error) {
      // logging error for debugging
      console.log('error in checkout slice', error);

      // sending error message to rejected state
      return rejectWithValue(error?.response?.data?.message);
    }
  }
);

// -------------------- GET ALL ORDERS (ORDER HISTORY) --------------------
export const getCheckoutAsync = createAsyncThunk(
  'api/getOrders',
  async (_, { getState, rejectWithValue }) => {
    try {
      // getting auth token
      const token = getState().authLogin.token;

      // API call to fetch order history
      const response = await axios.get(
        'http://localhost:5000/api/orders/get',
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // return orders data
      return response.data;
    } catch (error) {
      // logging error
      console.log('error in checkout slice', error);

      // sending error message
      return rejectWithValue(error?.response?.data?.message);
    }
  }
);

// -------------------- ORDER SLICE --------------------
const CheckSlice = createSlice({
  name: 'order',
  initialState: {
    order: [],
    currentOrderId: null,
    error: null,
    loading: false,
  },

  extraReducers: (builder) => {

    // -------------------- CREATE ORDER --------------------
    builder
      .addCase(createCheckoutAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(createCheckoutAsync.fulfilled, (state, action) => {
        state.loading = false;

        // adding new order at start of list
        if (action.payload.orders) {
          state.order.unshift(action.payload.orders);
        }

        // storing current order id
        state.currentOrderId = action.payload.orderId;
      })
      .addCase(createCheckoutAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // -------------------- GET ORDER HISTORY --------------------
      .addCase(getCheckoutAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCheckoutAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload.orders || [];
      })
      .addCase(getCheckoutAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // -------------------- PAYMENT SUCCESS RESET --------------------
      .addCase(verifyPaymentAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.currentOrderId = null;
        state.error = null;
      });
  }
});

export default CheckSlice.reducer;