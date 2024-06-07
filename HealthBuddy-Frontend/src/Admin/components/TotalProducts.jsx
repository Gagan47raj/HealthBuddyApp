import React from 'react'
import InfoCard from './InfoCard'
import { Inventory, ProductionQuantityLimits } from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux'
import { Card } from '@mui/material'


const TotalProducts = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((store) => store);
  return (
    <Card className='' >
        <InfoCard title="Total Products" value={products?.products?.content?.length}>
          <Inventory className="mr-5 text-blue-600 " sx={{width:"50px", height:"50px"}}></Inventory>
        </InfoCard>
    </Card>
  )
}

export default TotalProducts