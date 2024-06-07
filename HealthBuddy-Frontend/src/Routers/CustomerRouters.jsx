import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Navigation from '../customers/components/Navigation/Navigation'
import Footer from '../customers/components/Footer/Footer'
import HomePage from '../customers/pages/HomePage/HomePage'
import Cart from '../customers/components/Cart/Cart'
import Product from '../customers/components/Product/Product'
import ProductDetails from '../customers/components/ProductDetails/ProductDetail'
import Checkout from '../customers/components/Checkout/Checkout'
import Order from '../customers/components/Orders/Orders'
import OrderDetails from '../customers/components/Orders/OrderDetails'
import PaymentSuccess from '../customers/components/Payment/PaymentSuccess'
import Profile from '../customers/components/Profile/Profile'
import ContactUs from '../customers/components/ContactUs/ContactUs'
import AboutUs from '../customers/components/AboutUs/AboutUs'


const CustomerRouters = () => {
  return (
    <div>
        <div>
            <Navigation/>
        </div>
        <Routes>
            <Route path='/login' element={<HomePage/>}></Route>
            <Route path='/register' element={<HomePage/>}></Route>
          
            <Route path='/' element={<HomePage/>}></Route>
            <Route path='/cart' element={<Cart/>}></Route>
            {/* <Route path='/:levelOne/:levelTwo/:levelThree' element={<Product/>}></Route> */}
            <Route path='/medicine' element={<Product/>}></Route>
            <Route path='/product/:productId' element={<ProductDetails/>}></Route>
            <Route path='/checkout' element={<Checkout/>}></Route>
            <Route path='/account/order' element={<Order/>}></Route>
            <Route path='/account/order/:orderId' element={<OrderDetails/>}></Route>
            <Route path='/payment/:orderId' element={<PaymentSuccess/>}></Route>
            <Route path='/profile' element={<Profile/>}></Route>
            <Route path='/aboutus' element={<AboutUs/>}></Route>
            <Route path='/contactus' element={<ContactUs/>}></Route>

            
        {/* <HomePage/> */}
        {/* <Product/> */}
        {/* <ProductDetail/> */}
        {/* <Cart/> */}
        {/* <Checkout/> */}
        {/* <Orders/> */}

        </Routes>
        <div>
            <Footer/>
        </div>
    </div>
  )
}

export default CustomerRouters