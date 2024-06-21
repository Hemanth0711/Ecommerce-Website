// src/components/Wishlist.js
import React from 'react';

const Wishlist = ({ wishlistItems, removeFromWishlist, moveToCart }) => {
  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-4">Wishlist</h2>
      {wishlistItems.length === 0 ? (
        <p className="text-lg text-gray-600">Your wishlist is empty.</p>
      ) : (
        <div className="space-y-4">
          {wishlistItems.map(item => (
            <div key={item.id} className="flex items-center bg-white shadow p-4 rounded-lg">
              <img src={item.image} alt={item.title} className="w-20 h-20 object-contain mr-4" />
              <div className="flex-1">
                <h3 className="text-xl font-semibold">{item.title}</h3>
                <p className="text-gray-700">${item.price}</p>
                <div className="flex items-center space-x-2 mt-2">
                  <button onClick={() => moveToCart(item)} className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">Move to Cart</button>
                  <button onClick={() => removeFromWishlist(item.id)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">Remove</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
