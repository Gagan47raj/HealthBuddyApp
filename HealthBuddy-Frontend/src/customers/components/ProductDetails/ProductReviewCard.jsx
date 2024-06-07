import { Avatar, Box, Grid, Rating } from '@mui/material'
import React from 'react'

const ProductReviewCard = () => {
  return (
    <div>
        <Grid container spacing={2} gap={3}>
            <Grid item xs={1}>
                <Box>
                    <Avatar className='text-white' sx={{width:56, height:56, bgcolor:"#9155fd"}}>
                        R
                    </Avatar>
                </Box>
            </Grid>
            
            <Grid item xs={9}>
                <div className='space-y-2'>
                    <div>
                        <p className='font-semibold text-lg'>Mahesh</p>
                        <p className='opacity-70'>2 days ago</p>
                    </div>
                </div>

                <Rating value={4.5} name='half-rating'/>
                <p>Very nice product please consider this one kay lala</p>
            </Grid>
        </Grid>
    </div>
  )
}

export default ProductReviewCard