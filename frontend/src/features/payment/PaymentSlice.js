 import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// -------------------- 1. CREATE RAZORPAY ORDER --------------------
// API call to generate Razorpay order from backend
export const processPaymentAsync = createAsyncThunk(
  'payment/process',
  async (verifyData, { getState, rejectWithValue }) => {
    try {
      // Extract auth token from redux state
      const token = getState().authLogin?.token;

      // API request to create payment order
      const response = await axios.post(
        'http://localhost:5000/api/payment/process',
        verifyData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Return backend response
      return response.data;
    } catch (error) {
      // Handle backend error response
      return rejectWithValue(error?.response?.data);
    }
  }
);

// -------------------- 2. VERIFY PAYMENT SIGNATURE --------------------
// API call to verify Razorpay payment signature (backend step 2)
export const verifyPaymentAsync = createAsyncThunk(
  'payment/verify',
  async (verifyData, { getState, rejectWithValue }) => {
    try {
      // Extract auth token from redux state
      const token = getState().authLogin?.token;
      console.log(token); // Debugging purpose

      // API request to verify payment
      const response = await axios.post(
        'http://localhost:5000/api/payment/verify',
        verifyData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Return verification response
      return response.data;
    } catch (error) {
      // Handle verification error response
      return rejectWithValue(error?.response?.data);
    }
  }
);

// -------------------- PAYMENT SLICE --------------------
const PaymentSlice = createSlice({
  name: 'payment',

  // Initial state for payment module
  initialState: {
    loading: false,
    error: null,
    success: false,
    razorOrderData: null,
  },

  reducers: {
    // -------------------- RESET PAYMENT STATE --------------------
    // Reset all payment-related state values
    resetPaymentState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.razorOrderData = null;
    }
  },

  extraReducers: (builder) => {

    // -------------------- PROCESS PAYMENT --------------------
    builder
      .addCase(processPaymentAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(processPaymentAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.razorOrderData = action.payload.razorOrder;
      })
      .addCase(processPaymentAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      })

      // -------------------- VERIFY PAYMENT --------------------
      .addCase(verifyPaymentAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(verifyPaymentAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.razorOrderData = null;
      })
      .addCase(verifyPaymentAsync.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload?.message;
      });
  }
});

export const { resetPaymentState } = PaymentSlice.actions;
export default PaymentSlice.reducer;