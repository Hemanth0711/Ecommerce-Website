// src/components/ProductDetail.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchProductById } from '../Api.js';

const ProductDetail = ({ addToCart, addToWishlist }) => {
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

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <img src={product.image} alt={product.title} className="w-full h-64 object-contain mx-auto" />
      <h2 className="text-2xl mt-4">{product.title}</h2>
      <p className="mt-2">{product.description}</p>
      <p className="text-xl font-semibold mt-2">${product.price}</p>
      <div className="flex space-x-4 mt-4">
        <button onClick={() => addToCart(product)} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Add to Cart
        </button>
        <button onClick={() => addToWishlist(product)} className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600">
          Save to Wishlist
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;
