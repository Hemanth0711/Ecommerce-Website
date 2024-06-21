// src/pages/HomePage.js
import React from 'react';
import ProductList from '../components/ProductList';

const HomePage = ({ addToCart, removeFromCart, addToWishlist, removeFromWishlist, searchTerm, filter, cartItems, wishlistItems }) => {
  return (
    <div className="p-4">
      <ProductList 
        filter={filter} 
        searchTerm={searchTerm} 
        addToCart={addToCart} 
        removeFromCart={removeFromCart}
        addToWishlist={addToWishlist} 
        removeFromWishlist={removeFromWishlist}
        cartItems={cartItems}
        wishlistItems={wishlistItems} 
      />
    </div>
  );
};

export default HomePage;
