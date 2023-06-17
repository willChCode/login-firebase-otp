import React from 'react';
import { useState } from 'react';
import { BsFillShieldLockFill } from 'react-icons/bs';
import { useAuth } from '../context/authContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

function Phone() {
  const [phone, setPhone] = useState();
  const { updateUserPhone, user } = useAuth();
  const navigate = useNavigate();

  // const handleChange = e => {
  //   setPhone(e.target.value);
  //   console.log(phone);
  // };
  // console.log(phone);

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await updateUserPhone(`+${phone}`);
      toast.success('Updated phone successfully');
      navigate('/profile');
    } catch (err) {
      // console.log(window.recaptchaVerifier);
      // console.log(err.message);
      toast.error(err.message);
      navigate('/');
      return err;
    }
  };

  // console.log(phone);
  return (
    <div className='cardCont'>
      <div className='formCont'>
        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
          <h1 className='title'>Verify Phone</h1>
          <span className='flex justify-between px-2 text-sm mb-1'>
            <p>Enter your phone</p>
            <BsFillShieldLockFill size={20} />
          </span>
          {/* <PhoneInput country={'us'} value={phone} onChange={setPhone} /> */}
          <PhoneInput
            value={phone}
            onChange={setPhone}
            enableSearch={true}
            inputProps={{
              name: 'phone',
              required: true,
              autoFocus: true
            }}
          />
          {/* <Input
            onChange={handleChange}
            value={phone}
            variant='standard'
            label='Phone'
          /> */}
          <button className='btn btn-success mt-1'>Send SMS</button>
          <div id='recaptcha-container'></div>
        </form>
      </div>
    </div>
  );
}

export default Phone;
