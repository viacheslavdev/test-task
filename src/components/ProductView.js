import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts, addCommentToProduct, deleteProduct } from '../redux/products/productsSlice';
import { fetchComments, deleteComment } from '../redux/comments/commentsSlice';

const ProductView = () => {
    const { id } = useParams();
    const product = useSelector((state) => state.products.products.find((product) => product.id === id));
    const comments = useSelector((state) => state.comments.comments.filter((comment) => comment.productId === id));
    const dispatch = useDispatch();
    const [newComment, setNewComment] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (!product) {
            dispatch(fetchProducts());
        }
        if (comments.length === 0) {
            dispatch(fetchComments());
        }
    }, [dispatch, product, comments.length]);

    const handleAddComment = () => {
        if (newComment.trim() !== '') {
            const comment = { productId: id, description: newComment, date: new Date().toLocaleString() };
            dispatch(addCommentToProduct({ productId: id, comment }));
            setNewComment('');
            window.location.reload()
        }
    };

    const handleDeleteComment = (commentId) => {
        dispatch(deleteComment(commentId));
    };

    const handleDeleteProduct = () => {
        dispatch(deleteProduct(id));
        navigate('/products');
    };

    return (
        <div className="product-detail">
            <h2 className="product-detail-header">Product Detail</h2>
            {product ? (
                <div className="product-detail-list">
                    <div>Name: {product.name}</div>
                    <div>Count: {product.count}</div>
                    <div>Size: {product.size.width} x {product.size.height}</div>
                    <div>Weight: {product.weight}</div>
                </div>
            ) : (
                <div className="not-found-message">Product not found</div>
            )}
            <button onClick={handleDeleteProduct} className="product-delete-button">Delete product</button>
            <h3 className="comments-header">Comments</h3>
            <ul className="comments-list">
                {comments.map((comment) => (
                    <li key={comment.id}>
                        <div>{comment.description}</div>
                        <div>Date: {comment.date}</div>
                        <button onClick={() => handleDeleteComment(comment.id)} className="comment-delete-button">Delete comment</button>
                    </li>
                ))}
            </ul>
            <div className="input-comment">
                <textarea  value={newComment} onChange={(e) => setNewComment(e.target.value)} />
                <button onClick={handleAddComment} className="comment-add-button">Add Comment</button>
            </div>
        </div>
    );
};

export default ProductView;
