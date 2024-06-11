import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    comments: [],
    loading: false,
    error: null,
};


export const fetchComments = createAsyncThunk('comments/fetchComments', async () => {
    const response = await axios.get('http://localhost:3001/comments');
    return response.data;
});

export const deleteComment = createAsyncThunk('comments/deleteComment', async (commentId, { getState }) => {
    const state = getState();
    const comment = state.comments.comments.find((c) => c.id === commentId);

    if (comment) {
        await axios.delete(`http://localhost:3001/comments/${commentId}`);

        const productResponse = await axios.get(`http://localhost:3001/products/${comment.productId}`);
        const updatedProduct = {
            ...productResponse.data,
            comments: productResponse.data.comments.filter((id) => id !== commentId)
        };

        await axios.put(`http://localhost:3001/products/${comment.productId}`, updatedProduct);

        return { commentId, productId: comment.productId, updatedProduct };
    }
    throw new Error('Comment not found');
});

const commentsSlice = createSlice({
    name: 'comments',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchComments.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchComments.fulfilled, (state, action) => {
                state.loading = false;
                state.comments = action.payload;
            })
            .addCase(fetchComments.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(deleteComment.fulfilled, (state, action) => {
                state.comments = state.comments.filter((comment) => comment.id !== action.payload.commentId);
            });
    },
});

export default commentsSlice.reducer;
