import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './products/productsSlice';
import commentsReducer from './comments/commentsSlice';
import { fetchProducts } from './products/productsSlice';
import { fetchComments } from './comments/commentsSlice';


const store = configureStore({
  reducer: {
    products: productsReducer,
    comments: commentsReducer,
  },
});

store.dispatch(fetchProducts());
store.dispatch(fetchComments())


export default store;
