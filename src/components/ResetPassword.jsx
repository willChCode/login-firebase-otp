import React, { useState } from 'react';
import { Input } from '@material-tailwind/react';
import { useAuth } from '../context/authContext';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';

function ResetPassword() {
  const { resetPassword } = useAuth();
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleChangeEmail = e => {
    setEmail(e.target.value);
  };

  const handleResetPassword = async e => {
    e.preventDefault();
    try {
      await resetPassword(email);
      toast.success('We send you a email with a link to reset your password.');
      setEmail('');
      navigate('/login');
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className='cardCont'>
      <div className='formCont'>
        <form onSubmit={handleResetPassword} className='flex flex-col gap-4'>
          <h1 className='font-bold text-lg text-center'>Reset Password</h1>
          {/* I<Input variant='standard' label='Email' /> */}
          <Input
            onChange={handleChangeEmail}
            variant='standard'
            color='teal'
            label='Email'
            name='email'
            value={email}
          />
          <button className='btn btn-success'>Next</button>
        </form>
        <Link to='/login' className='text-neutral-500 text-sm'>
          Back...
        </Link>
      </div>
    </div>
  );
}

export default ResetPassword;
