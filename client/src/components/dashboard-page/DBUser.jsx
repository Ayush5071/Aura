import { useState } from 'react';
import Sidebar from './Sidebar.jsx';
import ProductGrid from './productGrid.jsx';

function DBUser() {
  const [isOpen, setIsOpen] = useState(false);

  // Toggle function to open and close the sidebar
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex bg-gray-900 text-gray-100 min-h-screen">
      {/* Sidebar component with isOpen and toggleSidebar props */}
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />

      {/* Overlay for mobile screen when sidebar is open */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-10 md:hidden"
          onClick={toggleSidebar} // Clicking on overlay will close sidebar
        ></div>
      )}

      <div
        className={`flex-1 p-8 transition-all duration-300 ${
          isOpen ? 'ml-64 md:ml-0' : 'ml-0'
        }`}
      >
        {/* Header */}
        <header className="flex justify-between items-center mb-10">
          {/* Sidebar Toggle Button (visible on mobile only) */}
          <button
            onClick={toggleSidebar}
            className="md:hidden p-4 text-white"
          >
            <div className="space-y-1">
              <span className="block w-6 h-0.5 bg-yellow-200"></span>
              <span className="block w-6 h-0.5 bg-yellow-200"></span>
              <span className="block w-6 h-0.5 bg-yellow-200"></span>
            </div>
          </button>

          <h1 className="text-4xl font-aerial text-gold-500 text-center mx-auto">
            TRASH TO MONEY
          </h1>
          <button className="bg-red-600 text-white px-6 py-2 rounded-lg shadow-lg hover:bg-red-700 transition duration-300 transform hover:scale-105">
            Add Product
          </button>
        </header>

        {/* Overview Section */}
        <section className="mb-10">
          <h2 className="text-3xl font-semibold mb-6 text-gold-400">Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg transform hover:scale-105 transition duration-300">
              <p className="text-xl font-medium text-gold-300">Total Sales</p>
              <p className="mt-2 text-3xl font-bold text-red-500">$12,340</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg transform hover:scale-105 transition duration-300">
              <p className="text-xl font-medium text-gold-300">New Users</p>
              <p className="mt-2 text-3xl font-bold text-green-400">1,200</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg transform hover:scale-105 transition duration-300">
              <p className="text-xl font-medium text-gold-300">Products</p>
              <p className="mt-2 text-3xl font-bold text-purple-400">320</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg transform hover:scale-105 transition duration-300">
              <p className="text-xl font-medium text-gold-300">Pending Orders</p>
              <p className="mt-2 text-3xl font-bold text-red-500">45</p>
            </div>
          </div>
        </section>

        {/* Product Grid */}
        <ProductGrid />
      </div>
    </div>
  );
}

export default DBUser;
