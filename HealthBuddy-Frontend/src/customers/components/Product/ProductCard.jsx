import React from "react";
import "./ProductCard.css";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/product/${product.id}`)}
      className="productCard w-[15rem] m-3 transition-all cursor-pointer bg-gray-100 border border-gray-200 rounded-lg shadow-md hover:shadow-lg"  
    >
      <div className="h-[10rem]">
        <img
          className="object-cover object-center mx-auto"
          src={product.imageUrl}
          alt=""
        />
      </div>
      <hr className="w-11/12 mx-auto border-gray-400"/>
      <div className="p-2 ">
        <div>
          <p className="font-bold opacity-70">{product.name}</p>
          <p>{product.brand}</p>
        </div>

        <div className="flex items-center space-x-2 ">
          <p className="font-semibold">₹{product.discountedPrice}</p>
          <p className="line-through opacity-50">₹{product.price}</p>
          <p className="text-green-600 font-semibold">
            {product.discountPercent}%
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
