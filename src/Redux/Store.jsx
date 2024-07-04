import { configureStore } from '@reduxjs/toolkit';
import userSlice from './User/UserReducer';
import ProductReducer from './Products/ProductReducer';
import orderSlice from './Orders/OrderReducer';

export const store = configureStore({
  reducer: {
    user: userSlice,
    product : ProductReducer,
    order : orderSlice,
  },
})

export default store;