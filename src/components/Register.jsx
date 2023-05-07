import { Input, input } from '@material-tailwind/react';
import { useState } from 'react';
import { useAuth } from '../context/authContext';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const initialState = {
  email: '',
  password: ''
};

function Register() {
  const [inputs, setInputs] = useState(initialState);
  const { singUp } = useAuth();
  const navigate = useNavigate();

  const handleChange = ({ target: { name, value } }) => {
    setInputs({ ...inputs, [name]: value });
  };
  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await singUp(inputs.email, inputs.password);
      setInputs(initialState);
      toast.success('Welcome! You have registered');
      navigate('/');
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  };
  return (
    <div className='cardCont'>
      <div className='formCont'>
        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
          <h1 className='font-bold text-center'>Register</h1>
          <Input
            onChange={handleChange}
            variant='standard'
            color='teal'
            label='Email'
            name='email'
            value={inputs.email}
          />
          <Input
            onChange={handleChange}
            variant='standard'
            color='teal'
            label='Password'
            name='password'
            value={inputs.password}
          />
          <button className='btn btn-success'>register</button>
        </form>
        <span className='flex justify-between text-sm mt-2 text-neutral-500'>
          <p>Already have an Account</p>
          <Link to='/login'>Login</Link>
        </span>
      </div>
    </div>
  );
}

export default Register;
