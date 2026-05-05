import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import productReducer from '../features/products/productSlice';
import cartReducer from '../features/cart/cartSlice';
import orderReducer from '../features/checkout/CheckOutSlice';
import paymentReducer from '../features/payment/PaymentSlice';
import loginReducer from '../features/auth/loginSlice';
import signupReducer from '../features/auth/signupSlice';

const rootReducer = combineReducers({
  products: productReducer,
  carts: cartReducer,
  authLogin: loginReducer,
  authSignup: signupReducer,
  razorOrderData: paymentReducer,
  order: orderReducer,
});

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);