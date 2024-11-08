import React from "react";

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white p-4 shadow rounded-lg flex flex-col items-center">
      <h3 className="text-lg font-bold">{product.name}</h3>
      <p className="text-gray-500">{product.price}</p>
      <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded">
        Buy Now
      </button>
    </div>
  );
};

export default ProductCard;
