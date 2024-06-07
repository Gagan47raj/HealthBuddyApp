import React, { useEffect } from 'react';
import CartItem from './CartItem';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCart } from '../../../States/Cart/Action';

const Cart = () => {
    const navigate = useNavigate();
    const { cart } = useSelector((store) => store);
    const dispatch = useDispatch();

    const handleCheckOut = () => {
        navigate("/checkout?step=2");
    };

    useEffect(() => {
        dispatch(getCart());
    }, [cart.updateCartItem, cart.deleteCartItem, dispatch]); // Only dispatch should be in the dependency array

    if (cart.cart?.cartItems.length > 0) {
        return (
            <div className='lg:grid grid-cols-3 lg:px-16 relative'>
                <div className='col-span-2'>
                    {cart.cart?.cartItems.map((item) => (
                        <CartItem key={item.id} item={item} />
                    ))}
                </div>
                <div className='px-5 sticky top-0 h-[100vh] mt-5 lg:mt-0'>
                    <div className='border'>
                        <p className='uppercase font-bold opacity-60 p-4'>Price Details</p>
                        <hr />
                        <div className='space-y-3 font-semibold mb-10 p-5'>
                            <div className='flex justify-between pt-3 text-black'>
                                <span>Price</span>
                                <span className='text-green-600'>₹{cart.cart?.totalPrice}</span>
                            </div>
                            <div className='flex justify-between pt-3'>
                                <span>Discount</span>
                                <span className='text-green-600'>₹{cart.cart?.discount}</span>
                            </div>
                            <div className='flex justify-between pt-3 text-black'>
                                <span>Delivery Charge</span>
                                <span className='text-green-600'>{cart.cart?.totalPrice >= 250 ? "Free" : "₹50"}</span>
                            </div>
                            <div className='flex justify-between pt-3 text-black'>
                                <span>Total Amount</span>
                                <span className='text-green-600'>₹{(cart.cart?.totalPrice) >= 250 ? cart.cart?.totalPrice : cart.cart?.totalDiscountedPrice + 50}</span>
                            </div>
                        </div>
                        <Button
                            onClick={handleCheckOut}
                            className="w-full"
                            variant="contained"
                            sx={{ px: "2.5rem", py: ".7rem", bgcolor: "#9155fd" }}
                        >
                            Checkout
                        </Button>
                    </div>
                </div>
            </div>
        );
    } else {
        return <div className='h-[50vh] flex justify-center items-center'>
            <div className='text-3xl font-bold border p-5 border-gray-300 rounded'>Your Cart is Empty</div>
            </div>;
    }
};

export default Cart;
