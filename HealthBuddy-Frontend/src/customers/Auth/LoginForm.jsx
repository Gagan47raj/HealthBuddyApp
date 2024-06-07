import { Button, Grid, TextField } from '@mui/material';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {useNavigate } from 'react-router-dom';
import { login } from '../../States/Auth/Action';

const LoginForm = () => {
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { auth } = useSelector((state) => state);

  useEffect(() => {
    if (auth.jwt) {
      navigate('/'); // Or wherever you want to navigate after successful login/registration
    }
  }, [auth.jwt, navigate])
   

  const handleSubmit=(event)=>{
    event.preventDefault()

    const data = new FormData(event.currentTarget);

    const userData = {
      email: data.get('email'),
      password: data.get('password')
    }

    dispatch(login(userData))

    console.log("user data : ", userData)
  }
  
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          


          <Grid item xs={12}  >
            <TextField
            required
            id='email'
            name='email'
            label='Email'
            type='email'
            fullWidth
            autoComplete='email'/>
          </Grid>

          <Grid item xs={12}  >
            <TextField
            required
            id='password'
            name='password'
            label='Password'
            type='password'
            fullWidth
            autoComplete='password'/>
          </Grid>

          <Grid item xs={12}  >
            <Button className='bg-[#9155fd] w-full'
            type='submit'
            variant='contained'
            size='large'
            sx={{padding:".8rem 0",bgcolor:"#9155fd"}}>
              Login
            </Button>
          </Grid>
        </Grid>
      </form>

      <div className='flex justify-center flex-col items-center'>
      <div className='py-3 flex items-center'>
        <p>Don't have an account ?</p>
        <Button onClick={() => navigate("/register")} className='ml-5' size='small'>Make An Account</Button>
      </div>
    </div>
    
    </div>
  )
}

export default LoginForm