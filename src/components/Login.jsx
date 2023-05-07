import { Input } from '@material-tailwind/react';
import React, { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebookF } from 'react-icons/fa';
import { BsGithub } from 'react-icons/bs';
import { useAuth } from '../context/authContext';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const initialState = {
  email: '',
  password: ''
};

function Login() {
  const [inputs, setInputs] = useState(initialState);
  const { singIn, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  const handleChange = ({ target: { name, value } }) => {
    setInputs({ ...inputs, [name]: value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await singIn(inputs.email, inputs.password);
      setInputs(initialState);
      toast.success('Login Success');
      navigate('/');
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
      toast.success('Login Success with Google');
      navigate('/');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='cardCont'>
      <div className='formCont'>
        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
          <h1 className='font-bold text-center text-xl'>Login</h1>
          <Input
            onChange={handleChange}
            variant='standard'
            color='teal'
            label='Email'
            name='email'
          />
          <Input
            onChange={handleChange}
            variant='standard'
            color='teal'
            label='Password'
            name='password'
          />
          <Link
            to='/reset-password'
            className='text-sm text-neutral-500 text-end'>
            forgot password?
          </Link>
          <button className='btn btn-success '>Login</button>
        </form>
        <span className='flex justify-between text-sm text-neutral-500'>
          <p>Dont have an Account</p>
          <Link to='/register'>Register</Link>
        </span>
        <span>
          <section className='flex items-center my-[5px]'>
            <hr className='flex-1 bg-gray-400 h-[1.5px] ' />
            <p className='mx-2 text-sm'>Or Sign Up Using</p>
            <hr className='flex-1 bg-gray-400 h-[1.5px] ' />
          </section>

          <section className='flex justify-around'>
            <button
              onClick={handleGoogleLogin}
              className='btn btn-circle btn-ghost'>
              <FcGoogle size={30} />
            </button>
            <button className='btn btn-circle btn-ghost'>
              <FaFacebookF size={25} color='#3b5998' />
            </button>
            <button className='btn btn-circle btn-ghost'>
              <BsGithub size={30} />
            </button>
          </section>
        </span>
      </div>
    </div>
  );
}

export default Login;
