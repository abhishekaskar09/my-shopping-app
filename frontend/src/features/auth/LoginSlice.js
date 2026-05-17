 import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';
import { authRegisterAsync } from "./SignupSlice";

// 🔹 Async thunk for user login API call
export const loginAsync = createAsyncThunk(
  'api/login',
  async (formData, { rejectWithValue }) => {
    try {
      // 🔹 Send login request with user credentials
      const response = await axios.post(
        'http://localhost:5000/api/auth/login',
        formData
      );

      // 🔹 Return response data (user + token)
      return response.data;

    } catch (error) {
      console.log('Error in login slice', error);

      // 🔹 Handle API error and send custom error message
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

// 🔹 Create login slice
const LoginSlice = createSlice({
  name: 'login',

  // 🔹 Initial state for authentication
  initialState: {
    authLogin: null, 
    token: null,      
    loading: false,   
    error: null,      
  },

  reducers: {
    // 🔹 Clear error message manually
    clearAuthError: (state) => {
      state.error = null;
    },

    // 🔹 Clear login data (used during logout)
    clearLogin: (state, action) => {
      state.authLogin = null;
      state.token = null;
    }
  },

  // 🔹 Handle async thunk states
  extraReducers: (builder) => {
    builder

      // 🔹 When login request is pending
      .addCase(loginAsync.pending, (state) => {
        state.loading = true;
      })

      // 🔹 When login is successful
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.loading = false;

        // 🔹 Store user data and token
        state.authLogin = action.payload.login;
        state.token = action.payload.token;
      })

      // 🔹 When login fails
      .addCase(loginAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // 🔹 Handle signup success (auto login after register)
      .addCase(authRegisterAsync.fulfilled, (state, action) => {
        state.authLogin = action.payload.others;
        state.token = action.payload.token;
      });
  }
});

// 🔹 Export actions
export const { clearAuthError, clearLogin } = LoginSlice.actions;

// 🔹 Export reducer
export default LoginSlice.reducer;