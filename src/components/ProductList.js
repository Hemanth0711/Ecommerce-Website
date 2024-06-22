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
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4 p-1 md:p-4 bg-gray-100">
      {filteredProducts.map(product => (
        <div key={product.id} className="border border-gray-300 p-2 md:p-4 bg-white rounded shadow-lg text-center">
          <img src={product.image} alt={product.title} className="w-full h-32 md:h-48 p-2 object-cover" />
          <h3 className="mt-2 md:mt-4 text-sm md:text-lg font-semibold">{product.title}</h3>
          <p className="text-lg md:text-xl font-semibold text-gray-700">${product.price}</p>
          <div className="flex justify-around mt-2 md:mt-4">
            <button
              onClick={() => isInWishlist(product) ? removeFromWishlist(product.id) : addToWishlist(product)}
              className={`px-2 py-1 md:px-4 md:py-2 rounded ${isInWishlist(product) ? 'bg-red-500 text-white' : 'bg-yellow-500 text-white'}`}
            >
              {isInWishlist(product) ? <FaTrash size={16} /> : <FaHeart size={16} />}
            </button>
            <button
              onClick={() => isInCart(product) ? removeFromCart(product.id) : addToCart(product)}
              className={`px-2 py-1 md:px-4 md:py-2 rounded ${isInCart(product) ? 'bg-red-500 text-white' : 'bg-blue-500 text-white'}`}
            >
              {isInCart(product) ? <FaTrash size={16} /> : <FaShoppingCart size={16} />}
            </button>
          </div>
          <Link to={`/products/${product.id}`} className="text-blue-500 block mt-2 md:mt-4 text-sm md:text-base">View Details</Link>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
