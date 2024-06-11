// src/components/AddProductForm.js

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addProduct } from '../redux/products/productsSlice';
import { useNavigate } from 'react-router-dom';

const AddProductForm = () => {
  const [productName, setProductName] = useState('');
  const [productCount, setProductCount] = useState('');
  const [productWidth, setProductWidth] = useState('');
  const [productHeight, setProductHeight] = useState('');
  const [productWeight, setProductWeight] = useState('');
  const [productImageUrl, setProductImageUrl] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddProduct = () => {
    const newProduct = {
      name: productName,
      count: parseInt(productCount),
      size: {
        width: parseInt(productWidth),
        height: parseInt(productHeight),
      },
      weight: productWeight,
      imageUrl: productImageUrl,
      comments: [],
    };
    dispatch(addProduct(newProduct));
    navigate('/products');
  };

  return (
    <div className="add-form">
      <h2 className="add-form-header">Add New Product</h2>
      <form onSubmit={(e) => { e.preventDefault(); handleAddProduct(); }}>
        <div className="input-wrapper">
          <label>Name:</label>
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            required
          />
        </div>
        <div className="input-wrapper">
          <label>Count:</label>
          <input
            type="number"
            value={productCount}
            onChange={(e) => setProductCount(e.target.value)}
            required
          />
        </div>
        <div className="input-wrapper">
          <label>Width:</label>
          <input
            type="number"
            value={productWidth}
            onChange={(e) => setProductWidth(e.target.value)}
            required
          />
        </div>
        <div className="input-wrapper">
          <label>Height:</label>
          <input
            type="number"
            value={productHeight}
            onChange={(e) => setProductHeight(e.target.value)}
            required
          />
        </div>
        <div className="input-wrapper">
          <label>Weight:</label>
          <input
            type="text"
            value={productWeight}
            onChange={(e) => setProductWeight(e.target.value)}
            required
          />
        </div>
        <div className="input-wrapper">
          <label>Image URL:</label>
          <input
            type="text"
            value={productImageUrl}
            onChange={(e) => setProductImageUrl(e.target.value)}
            required
          />
        </div>
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default AddProductForm;
