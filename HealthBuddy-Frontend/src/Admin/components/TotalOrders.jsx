import React from 'react'
import InfoCard from './InfoCard'
import { UserCircleIcon, UsersIcon } from '@heroicons/react/16/solid'
import { ShoppingBag } from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux'
import { Card } from '@mui/material'


const TotalOrders = () => {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state) => state.userState);
  // const sumOrders = users?.orders?.length((total, product) => total += product.price, 0);

  return (
    <Card className='' >
        <InfoCard title="Total Deliveries" value={users?.length}>
          <ShoppingBag className="mr-5 text-green-600" sx={{width:"60px", height:"76px"}}></ShoppingBag>
        </InfoCard>
    </Card>
  )
}

export default TotalOrders