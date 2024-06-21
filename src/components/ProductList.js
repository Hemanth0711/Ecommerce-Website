// src/components/ProductList.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaHeart, FaShoppingCart, FaTrash } from 'react-icons/fa';
import { fetchProducts } from '../Api';

const ProductList = ({ addToCart, removeFromCart, addToWishlist, removeFromWishlist, cartItems, wishlistItems, searchTerm, filter }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      const data = await fetchProducts();
      setProducts(data);
    };
    getProducts();
  }, []);

  const filteredProducts = products
    .filter(product => 
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) && 
      (!filter || product.category === filter)
    );

  const isInCart = (product) => cartItems.some(item => item.id === product.id);
  const isInWishlist = (product) => wishlistItems.some(item => item.id === product.id);

  return (
    <div className="flex flex-wrap justify-center bg-gray-100">
      {filteredProducts.map(product => (
        <div key={product.id} className="border border-gray-300 p-4 m-4 bg-white rounded shadow-lg w-80 text-center">
          <img src={product.image} alt={product.title} className="w-48 h-48 mx-auto" />
          <h3 className="mt-4 text-lg font-semibold">{product.title}</h3>
          <p className="text-xl font-semibold text-gray-700">${product.price}</p>
          <div className="flex justify-around mt-4">
            <button
              onClick={() => isInCart(product) ? removeFromCart(product.id) : addToCart(product)}
              className={`px-4 py-2 rounded ${isInCart(product) ? 'bg-red-500 text-white' : 'bg-blue-500 text-white'}`}
            >
              {isInCart(product) ? <FaTrash /> : <FaShoppingCart />}
            </button>
            <button
              onClick={() => isInWishlist(product) ? removeFromWishlist(product.id) : addToWishlist(product)}
              className={`px-4 py-2 rounded ${isInWishlist(product) ? 'bg-red-500 text-white' : 'bg-yellow-500 text-white'}`}
            >
              {isInWishlist(product) ? <FaTrash /> : <FaHeart />}
            </button>
          </div>
          <Link to={`/products/${product.id}`} className="text-blue-500 block mt-4">View Details</Link>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
