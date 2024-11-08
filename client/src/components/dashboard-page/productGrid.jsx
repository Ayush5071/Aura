import React,{useState} from "react";
import ProductCard from "../dashboard-page/ProductCard";
import { products } from "/Users/asus/.vscode/Aura/client/src/data/products";

const ProductGrid = () => {
  const [page, setPage] = useState(1);
  const productsPerPage = 12;

  // Calculate the products to display based on the current page
  const startIndex = (page - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const displayedProducts = products.slice(startIndex, endIndex);

  // Calculate total pages needed for the pagination
  const totalPages = Math.ceil(products.length / productsPerPage);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold  text-gold mb-4">Products</h2>
      <div className=" text-black grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4">
        {displayedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <div className="flex justify-left mt-4">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            className={`px-4 py-2 m-1 text-white ${
              page === index + 1 ? "bg-blue-500 text-black" : "bg-gray-300 "
            }`}
            onClick={() => setPage(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;
