import { Grid } from '@mui/material'
import React from 'react'
import Achievements from './TotalUsers'
import MonthlyOverview from './TotalProducts'
import CustomersList from './CustomersList'
import ProductList from './ProductList'
import TotalOrders from './TotalOrders'
import TotalRevenue from './TotalRevenue'

const MyDashboard = () => {
  return (
    <div className='p-10 bg-gray-100 h-full'>
      <Grid container spacing={2}>
        <Grid item xs={10} md={2}>
          <Achievements/>
        </Grid>

        <Grid item xs={10} md={2}>
          <MonthlyOverview/>
        </Grid>

        <Grid item xs={10} md={2}>
          <TotalOrders/>
        </Grid>

        <Grid item xs={12} md={6}>
          <TotalRevenue/>
        </Grid>

        <Grid item xs={12} md={6}>
          <CustomersList/>
        </Grid>

        <Grid item xs={12} md={6}>
          <ProductList/>
        </Grid>
        
      </Grid>
    </div>
  )
}

export default MyDashboard