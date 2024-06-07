import {
  AddCircleOutlined,
  RemoveCircleOutline,
  RemoveCircleOutlineOutlined,
  RemoveCircleOutlined,
} from "@mui/icons-material";
import { Button, IconButton } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { removeCartItem, updateCartItem } from "../../../States/Cart/Action";

const CartItem = ({item}) => {
  const dispatch = useDispatch();
  const handleUpdateCartItem = (num) => {
    const data = {data:{quantity : item.quantity+num}, cartItemId:item?.id}
    dispatch(updateCartItem(data))
  }

  const handleRemoveCartItem = () =>{
    dispatch(removeCartItem(item.id))
  }

  return (
    <div className="p-5 shadow-lg border rounded-md mb-3">
      <div className="flex items-center">
        <div className="w-[5rem] h-[5rem] lg:w-[9rem] lg:h-[9rem]">
          <img
            className="w-full h-full object-cover object-top"
            src={item.product.imageUrl}
            alt=""
          />
        </div>

        <div className="ml-5 space-y-1">
          <p className="font-semibold">{item.product.name}</p>
          <p className="opacity-70">Quanlity: {item.size}</p>
          <p className="opacity-70 mt-2">Seller: {item.product.brand}</p>

          <div className="flex space-x-5 items-center textgray-900 pt-6">
            <p className="font-semibold">₹{item.price}</p>
            <p className="opacity-50 line-through">₹{item.discountedPrice}</p>
            <p className="text-green-500 font-semibold">{item.discountPercent}% off</p>
          </div>
        </div>
      </div>
      <div className="lg:flex items-center lg:space-x-10 pt-4">

          <div className="flex items-center space-x-2">
            <IconButton onClick={()=>handleUpdateCartItem(-1)} disabled={item.quantity <= 1}>
              <RemoveCircleOutlined/>
            </IconButton>
            <span className="py-1 px-7 border rounded-sm">{item.quantity}</span>
            <IconButton sx={{color:"RGB(145 85 253)"}} onClick={()=>handleUpdateCartItem(1)} disabled={item.quantity >= 6}>
              <AddCircleOutlined/>
            </IconButton>
            

            <div>
            <Button onClick={handleRemoveCartItem} sx={{color:"RGB(145 85 253)"}}>Remove</Button>
          </div>
          
          </div> 

          

        </div>
    </div>
  );
};

export default CartItem;
