// src/components/Cart.js
import React from 'react';

const Cart = ({ cartItems, removeFromCart, updateQuantity }) => {
  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-4">Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p className="text-lg text-gray-600">Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {cartItems.map(item => (
            <div key={item.id} className="flex items-center bg-white shadow p-4 rounded-lg">
              <img src={item.image} alt={item.title} className="w-20 h-20 object-contain mr-4" />
              <div className="flex-1">
                <h3 className="text-xl font-semibold">{item.title}</h3>
                <p className="text-gray-700">${item.price}</p>
                <div className="flex items-center space-x-2 mt-2">
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => updateQuantity(item.id, e.target.value)}
                    className="w-16 px-2 py-1 border rounded"
                  />
                  <button onClick={() => removeFromCart(item.id)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">Remove</button>
                </div>
              </div>
            </div>
          ))}
          <div className="text-right">
            <h3 className="text-2xl font-bold">Total: ${total.toFixed(2)}</h3>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
