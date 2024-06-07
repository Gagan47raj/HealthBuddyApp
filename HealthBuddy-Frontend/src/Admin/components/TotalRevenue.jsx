import React from 'react'
import InfoCard from './InfoCard'
import { UserCircleIcon, UsersIcon } from '@heroicons/react/16/solid'
import { GraphicEq, Inventory, MoneyOutlined, ProductionQuantityLimits, Share } from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux'
import { Card } from '@mui/material'


const TotalRevenue = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((store) => store);

  const sumPrices = products?.products?.content?.reduce((total, product) => total += product.price, 0);

  return (
    <Card className='' >
        <InfoCard title="Total Revenue" value={"₹"+sumPrices}>
          <MoneyOutlined className="mr-5 text-blue-600 " sx={{width:"70px", height:"76px"}}></MoneyOutlined>
        </InfoCard>
    </Card>
  )
}

export default TotalRevenue