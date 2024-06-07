import { InboxIcon } from '@heroicons/react/16/solid';
import { AccountCircle, AddShoppingCart, Dashboard, Email, Home, Logout, Person, Person2, ShoppingBag, StoreMallDirectory } from '@mui/icons-material';
import { Box, CssBaseline, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, useMediaQuery, useTheme } from '@mui/material';
import React, { useState } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom';
import MyDashboard from './components/MyDashboard';
import CustomerTables from './components/CustomerTables';
import OrdersTable from './components/OrdersTable';
import CreateProductForm from './components/CreateProductForm';
import ProductTables from './components/ProductTables';
import { logout } from '../States/Auth/Action';
import { useDispatch } from 'react-redux';


const menu =[
    {name :"Dashboard", path:"/admin",icon : <Dashboard className='text-sky-500'/>},
    {name :"Products", path:"/admin/products",icon : <ShoppingBag className='text-purple-500'/> },
    {name :"Customers", path:"/admin/customers",icon : <Person2 className='text-orange-500'/> },
    {name :"Orders", path:"/admin/orders",icon : <StoreMallDirectory className='text-amber-500'/> },
    {name :"AddProducts", path:"/admin/product/create",icon : <AddShoppingCart className='text-emerald-500'/>},
]

const Admin = () => {
    const theme = useTheme();
    const isLargeScreen=useMediaQuery(theme.breakpoints.up("lg"));
    const [sideBarVisible,setSideBarVisible]=useState(false);
    const navigate = useNavigate(); 
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
        localStorage.clear();
        navigate("/");
      };
    
    const drawer = (
        <Box
        sx={{
            overflow:"auto",
            display:"flex",
            flexDirection:"column",
            justifyContent:"space-between",
            // border:"1px solid #000",
            height:"100%",
        }}
        >

            {/* {isLargeScreen && <Toolbar/>} */}
            <List>
                {menu.map((item,index) =>
                <ListItem key= {item.name} disablePadding onClick={() => navigate(item.path)}>
                    <ListItemButton>
                        <ListItemIcon>
                            {item.icon}
                        </ListItemIcon>
                        <ListItemText>{item.name}</ListItemText>
                    </ListItemButton>
                </ListItem>
                )}
            </List>

            <List>
                
                <ListItem  disablePadding>
                    <ListItemButton onClick={() => navigate("/profile")}>
                        <ListItemIcon>
                            <AccountCircle className='text-green-500'/>
                        </ListItemIcon>
                        <ListItemText>Profile</ListItemText>
                    </ListItemButton>
                </ListItem>
                <ListItem  disablePadding>
                    <ListItemButton onClick={() => navigate("/")}>
                        <ListItemIcon>
                            <Home className='text-blue-500'/>
                        </ListItemIcon>
                        <ListItemText>Home</ListItemText>
                    </ListItemButton>
                </ListItem>
                <ListItem  disablePadding>
                    <ListItemButton onClick={handleLogout}>
                        <ListItemIcon>
                            <Logout className='text-red-500'/>
                        </ListItemIcon>
                        <ListItemText>Logout</ListItemText>
                    </ListItemButton>
                </ListItem>
                
            </List>

        </Box>
    )
  return (
    <div>
        <div className='flex h-[100vh] '>
            <CssBaseline/>

            <div className='w-[15%] border border-r-gray-300 h-full fixed top-0'>
                {drawer}
            </div>

            <div className='w-[85%] h-full ml-[15%]'>

                <Routes>
                    <Route path='/' element={<MyDashboard/>}></Route>
                    <Route path='/product/create' element={<CreateProductForm/>}></Route>
                    <Route path='/products' element={<ProductTables/>}></Route>
                    <Route path='/orders' element={<OrdersTable/>}></Route>
                    <Route path='/customers' element={<CustomerTables/>}></Route>  
                </Routes>

            </div>

        </div>
    </div>
  )
}

export default Admin