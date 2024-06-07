import { Step, StepLabel, Stepper, colors } from '@mui/material'
import React from 'react'

const steps=[
    "Placed",
    "Order Confirmed",
    "Shipped",
    "Out For Delivered",
    "Delivered",
]

const OrderTracking = ({activeStep}) => {
  return (
    <div className='w-full'>
        <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label)=> <Step>
                <StepLabel sx={{colors:"#9155FD", fontSize:"44px"}}>{label}</StepLabel>
            </Step>)}
        </Stepper>
    </div>
  )
}

export default OrderTracking