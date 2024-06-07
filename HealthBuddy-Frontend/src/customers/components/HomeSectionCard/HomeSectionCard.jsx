import { Button } from "@mui/material";
import React from "react";

const HomeSectionCard = ({ product }) => {
  return (
    <div
      className="cursor-pointer flex flex-col items-center bg-white rounded-lg 
    shadow-lg overflow-hidden w-[15rem] mx-3 border border-gray-200"
    >
      <div className="h-[13rem] w-[10rem]">
        <img
          className="object-cover object-top w-full h-full"
          src={product.imageUrl}
          alt=""
        />
      </div>

      <div className="p-4">
        <h3 className="text-lg font-medium text-gray-900">{product.title}</h3>
        <p className="mt-2 text-sm text-gray-500">
          {product.brand}
          </p>

          <div className="flex justify-between items-center mt-4">
            <p className="mt-2 mb-4 text-sm text-black-500 font-bold">
          ₹{product.price}
          </p>
          <Button variant="contained" className="z-50 bg-white p-2 w-[5rem]">Buy</Button>
          </div>
          
          
      </div>
    </div>
  );
};

export default HomeSectionCard;
