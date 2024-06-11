import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  products: [],
  loading: false,
  error: null,
};

// Async thunk for fetching products
export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  const response = await axios.get('http://localhost:3001/products');
  return response.data;
});

// Async thunk for adding a product
export const addProduct = createAsyncThunk('products/addProduct', async (product) => {
  const response = await axios.post('http://localhost:3001/products', product);
  return response.data;
});

// Async thunk for deleting a product
export const deleteProduct = createAsyncThunk('products/deleteProduct', async (productId) => {
  await axios.delete(`http://localhost:3001/products/${productId}`);
  return productId;
});

// Async thunk for adding a comment
export const addCommentToProduct = createAsyncThunk('products/addCommentToProduct', async ({ productId, comment }) => {
    // Add the comment
    const response = await axios.post('http://localhost:3001/comments', comment);
    const newComment = response.data;
  
    // Get the product
    const productResponse = await axios.get(`http://localhost:3001/products/${productId}`);
    const product = productResponse.data;
  
    // Update the product with the new comment
    const updatedProduct = {
      ...product,
      comments: [...product.comments, newComment],
    };
  
    // Save the updated product
    await axios.put(`http://localhost:3001/products/${productId}`, updatedProduct);
  
    // Return the updated product and new comment
    return { productId, comment: newComment, updatedProduct };
  });

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.products.push(action.payload);
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.products = state.products.filter((product) => product.id !== action.payload);
      })
      .addCase(addCommentToProduct.fulfilled, (state, action) => {
    const { productId, updatedProduct } = action.payload;
    const productIndex = state.products.findIndex((product) => product.id === productId);
    if (productIndex !== -1) {
      state.products[productIndex] = updatedProduct;
    }
});
  },
});

export default productsSlice.reducer;
