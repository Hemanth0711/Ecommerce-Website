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
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 bg-gray-100">
      {filteredProducts.map(product => (
        <div key={product.id} className="border border-gray-300 p-4 bg-white rounded shadow-lg text-center">
          <img src={product.image} alt={product.title} className="w-full h-48 p-2 object-fit-cover" />
          <h3 className="mt-4 text-lg font-semibold">{product.title}</h3>
          <p className="text-xl font-semibold text-gray-700">${product.price}</p>
          <div className="flex justify-around mt-4">
            <button
              onClick={() => isInWishlist(product) ? removeFromWishlist(product.id) : addToWishlist(product)}
              className={`px-4 py-2 rounded ${isInWishlist(product) ? 'bg-red-500 text-white' : 'bg-yellow-500 text-white'}`}
            >
              {isInWishlist(product) ? <FaTrash /> : <FaHeart />}
            </button>
            <button
              onClick={() => isInCart(product) ? removeFromCart(product.id) : addToCart(product)}
              className={`px-4 py-2 rounded ${isInCart(product) ? 'bg-red-500 text-white' : 'bg-blue-500 text-white'}`}
            >
              {isInCart(product) ? <FaTrash /> : <FaShoppingCart />}
            </button>
          </div>
          <Link to={`/products/${product.id}`} className="text-blue-500 block mt-4">View Details</Link>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
