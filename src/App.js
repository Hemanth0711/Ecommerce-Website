// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import Cart from './components/Cart';
import Wishlist from './components/Wishlist';
import Header from './components/Header';

const App = () => {
  const [cartItems, setCartItems] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('');

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const item = prevItems.find((item) => item.id === product.id);
      if (item) {
        return prevItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const updateQuantity = (id, quantity) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: parseInt(quantity) } : item
      )
    );
  };

  const addToWishlist = (product) => {
    setWishlistItems((prevItems) => {
      if (prevItems.find((item) => item.id === product.id)) {
        return prevItems;
      }
      return [...prevItems, product];
    });
  };

  const removeFromWishlist = (id) => {
    setWishlistItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  const moveToCart = (product) => {
    addToCart(product);
    removeFromWishlist(product.id);
  };

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Header
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          handleFilterChange={handleFilterChange}
        />

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage addToCart={addToCart} removeFromCart={removeFromCart} addToWishlist={addToWishlist} removeFromWishlist={removeFromWishlist} searchTerm={searchTerm} filter={filter} cartItems={cartItems} wishlistItems={wishlistItems} />} />
            <Route path="/products/:id" element={<ProductPage cartItems={cartItems} wishlistItems={wishlistItems} addToCart={addToCart} removeFromCart={removeFromCart} addToWishlist={addToWishlist} removeFromWishlist={removeFromWishlist} />} />
            <Route
              path="/cart"
              element={
                <Cart
                  cartItems={cartItems}
                  removeFromCart={removeFromCart}
                  updateQuantity={updateQuantity}
                />
              }
            />
            <Route path="/wishlist" element={<Wishlist wishlistItems={wishlistItems} removeFromWishlist={removeFromWishlist} moveToCart={moveToCart} />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
