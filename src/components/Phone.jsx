import React from 'react';
import { useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { BsFillShieldLockFill } from 'react-icons/bs';
import { useAuth } from '../context/authContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Input } from '@material-tailwind/react';

function Phone() {
  const [phone, setPhone] = useState('+59175025024');
  const { updateUserPhone, user } = useAuth();
  const navigate = useNavigate();

  const handleChange = e => {
    setPhone(e.target.value);
    console.log(phone);
  };
  // console.log(phone);

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await updateUserPhone(phone);
      toast.success('Updated phone successfully');
      console.log(user);
      // navigate('/profile');
    } catch (err) {
      console.log(window.recaptchaVerifier);
      console.log(err);
    }
  };

  // console.log(phone);
  return (
    <div className='cardCont'>
      <div className='formCont'>
        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
          <h1 className='title'>Verify Phone</h1>
          <span className='flex justify-between px-2 text-sm'>
            <p>Enter your phone</p>
            <BsFillShieldLockFill size={20} />
          </span>
          {/* <PhoneInput country={'us'} value={phone} onChange={setPhone} /> */}
          <Input
            onChange={handleChange}
            value={phone}
            variant='standard'
            label='Phone'
          />
          <button className='btn btn-success'>Send SMS</button>
          <div id='recaptcha-container'></div>
        </form>
      </div>
    </div>
  );
}

export default Phone;
