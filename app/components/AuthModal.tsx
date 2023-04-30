"use-client"

import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { useState, useEffect } from 'react';
import AuthModalInput from './AuthModalInput';
import useAuth from '@/hooks/useAtuh';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: '25px',
  boxShadow: 24,
  p: 4,
};

interface Props {
    isSignIn: boolean,
    className: string
}

function AuthModal({isSignIn, className}: Props) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const {signin} = useAuth();  
  const [disabled, setDisabled] = useState(true)

  const [inputs, setInputs] = useState({
    firstName:'',
    lastName: '',
    email: '',
    phone:'',
    password: '',
    city: ''
  })
  //Funtions to control the Sign In / Sign Up button
  useEffect(() => {
    if(isSignIn) {
      if(inputs.password && inputs.email) {
        return setDisabled(false)
      }
      setDisabled(true)
    } else {
      if(inputs.firstName && inputs.lastName && inputs.email && inputs.password && inputs.city && inputs.phone){
        return setDisabled(false)
      }
      setDisabled(true)
    }
  }, [inputs])
  // Handler to update the input props
  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value
    })
  }
  // Function to call the sign in/ sign up method of the API ((api/auth/signin)
  const handleClick = () => {
    if(isSignIn){
      signin({email:inputs.email, password: inputs.password})
    }
  }

  return (
    <div>
      <Button onClick={handleOpen} className={className}>{isSignIn? 'Sign In' : 'Sign Up'}</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className='p-2 h-[500px]'>
            <div className="uppercase font-bold text-center pb-2 border-b margin-b">
                <p className='text-sm'>
                    {isSignIn? 'Sign In' : 'Create Account'}
                </p>
            </div>
            <div className='pt-3 m-auto'>
                <h2 className='text-lg font-light text-center'>
                    {isSignIn? 'Log into your account' : 'Create your OpenTable account'}
                </h2>
                <AuthModalInput
                  inputs={inputs}
                  handleChangeInput={handleChangeInput}
                  isSignIn={isSignIn}
                />
                <button className='uppercase bg-blue-400 w-full text-white p-4 rounded text-sm disabled:bg-gray-400'
                disabled = {disabled}
                onClick={handleClick}
                >
                  {isSignIn? 'Sign In' : 'Create Account'}
                </button>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}

export default AuthModal