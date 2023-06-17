import React from 'react';
import { useAuth } from '../context/authContext';
import { Link } from 'react-router-dom';

function Profile() {
  const { user } = useAuth();

  console.log(user);

  return (
    <div className='cardCont'>
      <div className='formCont'>
        <Link to={'/'} className='link text-blue-gray-900'>
          Home...
        </Link>
        <h1 className='font-bold text-center text-lg'>Profile Data</h1>
        {!user ? (
          <p>loading</p>
        ) : (
          <>
            <p className='text-center'>
              {user.emailVerified ? (
                <span className='bg-green-500 p-2 rounded-full text-xs text-white'>
                  email Verified
                </span>
              ) : (
                <span className='bg-red-500 p-2 rounded-full text-xs text-white'>
                  email Not Verified
                </span>
              )}
            </p>
            <p>email: {user.email}</p>
            <p>name: {user.displayName}</p>
            <p>phone: {user.phoneNumber ? user.phoneNumber : 'not phone'}</p>
            <Link to='/phone' className='btn btn-outline'>
              Verificar Phone
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default Profile;
