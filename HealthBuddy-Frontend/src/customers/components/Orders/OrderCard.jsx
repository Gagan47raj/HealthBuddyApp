import { Button, Grid } from '@mui/material'
import React from 'react'
import AdjustIcon from '@mui/icons-material/Adjust';
import { useNavigate } from 'react-router-dom';

const OrderCard = ({order}) => {
    const navigate = useNavigate(); 
  return (
    <div onClick={()=>navigate(`/account/order/${order.id}`)} className='p-5 shadow-lg hover:shadow-2xl border rounded-md'>
        <Grid container spacing={2} sx={{justifyContent:"space-between"}}>
            <Grid item xs={6}>
                <div className='flex cursor-pointer'>
                    <img src={order.orderItems?.[0]?.product?.imageUrl} alt="" className='w-[5rem] h-[5rem] object-cover object-top'/>
                    <div className='ml-5 space-y-2'>
                        <p className=''>{order.orderItems?.[0]?.product?.name}</p>
                        <p className='opacity-50 text-xs font-semibold'>Size : {order.orderItems?.[0]?.quantity}</p>
                        <p className='opacity-50 text-xs font-semibold'>Brand : {order.orderItems?.[0]?.product?.brand}</p>
                    </div>
                </div>
            </Grid>

            <Grid item xs={2}>
                <p>₹{order.totalPrice}</p>
                <br />
                <p>Total Item : {order.totalItem}</p>
            </Grid>
            <Grid item xs={4}>
            { true && <div>
                <p>
                <AdjustIcon sx={{width:"15px", height:"15px"}} 
                className={`mr-2 text-xs ${
                    order.orderStatus === "PENDING" ? 'text-yellow-500' :
                    order.orderStatus === "CANCELLED" ? 'text-red-500' : 'text-green-500'
                  }`} />
                    <span>
                        {order.orderStatus}
                    </span>
                </p>
                {/* <p className='text-xs'>
                Your Item Has Been Delivered
                </p> */}
            </div>  }
                { false &&   <p>
                    <span>
                       Expected Delivery on March 4
                    </span>
                </p>}
            </Grid>
        </Grid>
    </div>
  )
}

export default OrderCard