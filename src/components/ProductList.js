// ProductList.js

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../redux/products/productsSlice';
import { Link } from 'react-router-dom';

const ProductList = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const loading = useSelector((state) => state.products.loading);
  const error = useSelector((state) => state.products.error);
  

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="products">
      <h2 className="products-header">Product List</h2>
      <Link to="/add-product">Add New Product</Link>
      <ul className="products-wrapper">
        {products.map((product) => (
          <li key={product.id} className="products-detail">
            <a href={`/products/${product.id}`}>Product detail</a>
            <div>Name: {product.name}</div>
            <div>Count: {product.count}</div>
            <div>Size: {product.size.width} x {product.size.height}</div>
            <div>Weight: {product.weight}</div>
            <div>Comments: {product.comments.length}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
