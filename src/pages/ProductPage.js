// src/pages/ProductPage.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FaCartPlus, FaCartArrowDown, FaHeart, FaHeartBroken } from 'react-icons/fa';
import { fetchProductById } from '../Api.js';

const ProductPage = ({ cartItems, wishlistItems, addToCart, removeFromCart, addToWishlist, removeFromWishlist }) => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const getProduct = async () => {
      const data = await fetchProductById(id);
      setProduct(data);
    };
    getProduct();
  }, [id]);

  if (!product) return <div>Loading...</div>;

  const isInCart = cartItems.some(item => item.id === product.id);
  const isInWishlist = wishlistItems.some(item => item.id === product.id);

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <img src={product.image} alt={product.title} className="w-full h-64 object-contain mx-auto" />
      <h2 className="text-2xl mt-4">{product.title}</h2>
      <p className="mt-2">{product.description}</p>
      <p className="text-xl font-semibold mt-2">${product.price}</p>
      <div className="flex space-x-4 mt-4">
        <button
          onClick={() => isInCart ? removeFromCart(product.id) : addToCart(product)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center space-x-2"
        >
          {isInCart ? <FaCartArrowDown /> : <FaCartPlus />}
          <span>{isInCart ? 'Remove from Cart' : 'Add to Cart'}</span>
        </button>
        <button
          onClick={() => isInWishlist ? removeFromWishlist(product.id) : addToWishlist(product)}
          className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 flex items-center space-x-2"
        >
          {isInWishlist ? <FaHeartBroken /> : <FaHeart />}
          <span>{isInWishlist ? 'Remove from Wishlist' : 'Save to Wishlist'}</span>
        </button>
      </div>
    </div>
  );
};

export default ProductPage;
