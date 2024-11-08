import React, { useState } from "react";
import Sidebar from "./Sidebar";
import ProductGrid from "./productGrid";
import { products } from 'C:/Users/asus/.vscode/Aura/client/src/data/products';

function DBUser() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState(products);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
  };

  // Filter products that match the description based on the query
  const executeSearch = () => {
    setFilteredProducts(
      products.filter((product) =>
        product.description.toLowerCase().includes(searchQuery)
      )
    );
  };

  // Suggestion list based on current search query
  const suggestions = products.filter(
    (product) =>
      product.description.toLowerCase().includes(searchQuery) && searchQuery
  );

  return (
    <div className=" flex flex-col">
    <div >
    <Sidebar />
    </div>  
    <div className="bg-black min-h-screen text-gray-100">
        
        
        <div className="flex-1 p-8">
          {/* Header */}
          <header className="bg-gray-900 w-full top-0 left-0 z-50 shadow-lg border-b border-red-600">
            <div className="container mx-auto px-4">
              <div className="flex items-center justify-between h-16">
                <h1 className="text-4xl font-extrabold text-red-500">Gems in Scrap</h1>
              </div>
            </div>
          </header>

          {/* Search Bar */}
          <div className="mb-6 relative flex justify-left w-full bg-gradient-to-r from-gray-800 via-gray-900 to-black shadow-lg border border-red-600 rounded-lg p-2 items-center mt-6">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={handleSearch}
              className="w-1/2 p-2 bg-gray-800 text-gray-200 border border-gray-700 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <button
              onClick={executeSearch}
              className="bg-red-600 text-white px-6 py-2 rounded-r-lg hover:bg-red-700 transition duration-300 transform hover:scale-105"
            >
              Enter
            </button>
          </div>

          {/* Suggestions Dropdown */}
          {suggestions.length > 0 && (
            <ul className="absolute z-10 bg-gray-800 border border-gray-600 rounded-lg mt-1 w-1/2 max-h-48 overflow-y-auto shadow-lg">
              {suggestions.map((product) => (
                <li
                  key={product.id}
                  onClick={() => {
                    setSearchQuery(product.description);
                    setFilteredProducts([product]);
                  }}
                  className="p-2 hover:bg-red-600 hover:text-white cursor-pointer transition duration-200"
                >
                  {product.description}
                </li>
              ))}
            </ul>
          )}

          {/* Product Grid */}
          <ProductGrid products={filteredProducts} />
        </div>
      </div>
    </div>
  );
}

export default DBUser;
