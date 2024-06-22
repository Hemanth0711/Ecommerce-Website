// src/components/Header.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSearch, FaHeart, FaShoppingCart, FaBars } from 'react-icons/fa';
import Logo from '../images/hocalware_logo.png';

const Header = ({ searchTerm, setSearchTerm, handleFilterChange }) => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const clearFilters = () => {
    handleFilterChange('');
    setActiveFilter('');
    navigate('/');
  };

  const handleFilterClick = (category) => {
    navigate('/');
    handleFilterChange(category);
    setActiveFilter(category);
    setIsSidebarOpen(false);
  };

  return (
    <header className="bg-gradient-to-r from-yellow-300 to-yellow-400 text-gray-900 p-4 flex flex-wrap items-center justify-between">
      <div className="flex items-center space-x-4">
        <img src={Logo} alt="Logo" className="h-10" />
        <div className="hidden md:flex items-center space-x-4">
          <button
            onClick={() => handleFilterClick('')}
            className={`px-3 py-2 rounded hover:bg-yellow-600 focus:bg-yellow-600 ${!activeFilter ? 'bg-yellow-600 text-white' : 'text-gray-900'}`}
          >
            All Products
          </button>
          <button
            onClick={() => handleFilterClick('electronics')}
            className={`px-3 py-2 rounded hover:bg-yellow-600 focus:bg-yellow-600 ${activeFilter === 'electronics' ? 'bg-yellow-600 text-white' : 'text-gray-900'}`}
          >
            Electronics
          </button>
          <button
            onClick={() => handleFilterClick('jewelery')}
            className={`px-3 py-2 rounded hover:bg-yellow-600 focus:bg-yellow-600 ${activeFilter === 'jewelery' ? 'bg-yellow-600 text-white' : 'text-gray-900'}`}
          >
            Jewelry
          </button>
          <button
            onClick={() => handleFilterClick("men's clothing")}
            className={`px-3 py-2 rounded hover:bg-yellow-600 focus:bg-yellow-600 ${activeFilter === "men's clothing" ? 'bg-yellow-600 text-white' : 'text-gray-900'}`}
          >
            Men's Clothing
          </button>
          <button
            onClick={() => handleFilterClick("women's clothing")}
            className={`px-3 py-2 rounded hover:bg-yellow-600 focus:bg-yellow-600 ${activeFilter === "women's clothing" ? 'bg-yellow-600 text-white' : 'text-gray-900'}`}
          >
            Women's Clothing
          </button>
        </div>
        
      </div>
      <div className="flex items-center space-x-4">
        <div className="relative">
          <FaSearch className="absolute top-3 left-3 text-gray-700" />
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="pl-10 pr-4 py-2 rounded bg-gray-200 text-black focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
        </div>
        <Link to="/wishlist" className="bg-yellow-600 text-white px-3 py-2 rounded hover:bg-yellow-700 focus:bg-yellow-700 flex items-center">
          <FaHeart className="mr-2" /> Wishlist
        </Link>
        <Link to="/cart" className="bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600 focus:bg-blue-700 flex items-center">
          <FaShoppingCart className="mr-2" /> Cart
        </Link>
        <button
          className="md:hidden text-gray-900"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          <FaBars size={24} />
        </button>
      </div>
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
          <div className="bg-white w-64 h-full shadow-lg p-4">
            <button
              onClick={() => handleFilterClick('')}
              className={`block w-full text-left px-3 py-2 rounded hover:bg-yellow-600 focus:bg-yellow-600 ${!activeFilter ? 'bg-yellow-600 text-white' : 'text-gray-900'}`}
            >
              All Products
            </button>
            <button
              onClick={() => handleFilterClick('electronics')}
              className={`block w-full text-left px-3 py-2 rounded hover:bg-yellow-600 focus:bg-yellow-600 ${activeFilter === 'electronics' ? 'bg-yellow-600 text-white' : 'text-gray-900'}`}
            >
              Electronics
            </button>
            <button
              onClick={() => handleFilterClick('jewelery')}
              className={`block w-full text-left px-3 py-2 rounded hover:bg-yellow-600 focus:bg-yellow-600 ${activeFilter === 'jewelery' ? 'bg-yellow-600 text-white' : 'text-gray-900'}`}
            >
              Jewelry
            </button>
            <button
              onClick={() => handleFilterClick("men's clothing")}
              className={`block w-full text-left px-3 py-2 rounded hover:bg-yellow-600 focus:bg-yellow-600 ${activeFilter === "men's clothing" ? 'bg-yellow-600 text-white' : 'text-gray-900'}`}
            >
              Men's Clothing
            </button>
            <button
              onClick={() => handleFilterClick("women's clothing")}
              className={`block w-full text-left px-3 py-2 rounded hover:bg-yellow-600 focus:bg-yellow-600 ${activeFilter === "women's clothing" ? 'bg-yellow-600 text-white' : 'text-gray-900'}`}
            >
              Women's Clothing
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
