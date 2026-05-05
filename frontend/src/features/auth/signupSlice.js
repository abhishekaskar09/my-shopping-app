 import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// 🔹 Async thunk for user registration API call
export const authRegisterAsync = createAsyncThunk(
  'api/register',
  async (formData, { rejectWithValue }) => {
    try {
      // 🔹 Send registration request with user data
      const response = await axios.post(
        'http://localhost:5000/api/auth/register',
        formData
      );

      // 🔹 Return response data (user + token)
      return response.data;

    } catch (error) {
      console.log('error in register slice check!', error);

      // 🔹 Handle API error and return error response
      return rejectWithValue(error?.response?.data);
    }
  }
);

// 🔹 Create register slice
const registerSlice = createSlice({
  name: 'register',

  // 🔹 Initial state for signup
  initialState: {
    authSignup: null, 
    token: null,     
    loading: false,   
    error: null,      
  },

  reducers: {
    // 🔹 Clear signup data (used on logout/reset)
    clearSignup: (state) => {
      state.authSignup = null;
      state.token = null;
    },
  },

  // 🔹 Handle async thunk states
  extraReducers: (builder) => {
    builder

      // 🔹 When registration request is pending
      .addCase(authRegisterAsync.pending, (state) => {
        state.loading = true;
      })

      // 🔹 When registration is successful
      .addCase(authRegisterAsync.fulfilled, (state, action) => {
        state.loading = false;

        // 🔹 Store user data and token
        state.authSignup = action.payload.others;
        state.token = action.payload.token;
      })

      // 🔹 When registration fails
      .addCase(authRegisterAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

// 🔹 Export action
export const { clearSignup } = registerSlice.actions;

// 🔹 Export reducer
export default registerSlice.reducer;