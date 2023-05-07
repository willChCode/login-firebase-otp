import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';
import { toast } from 'react-toastify';

function Home() {
  const { user, logout, loading } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
      toast.success('Logged out');
    } catch (err) {
      console.log(err);
    }
  };

  // console.log(loading);
  console.log(user);
  return (
    <div className='cardCont'>
      <section className='formCont'>
        <h1 className='text-center font-bold text-xl'>HOME</h1>
        <div className='flex flex-col gap-4 '>
          {!user ? (
            <>
              <p>registrate o logueate</p>
              <span className='flex justify-around'>
                <Link to='/login' className='btn btn-primary'>
                  Login
                </Link>
                <Link to='/register' className='btn btn-secondary'>
                  Register
                </Link>
              </span>
            </>
          ) : (
            <>
              {loading ? (
                <p>Loading</p>
              ) : (
                <>
                  {user.photoURL && (
                    <span className='btn btn-circle btn-ghost m-auto'>
                      <img className='rounded-full' src={user.photoURL} />
                    </span>
                  )}
                  <p className='text-center text-lg'>
                    {user.displayName || user.email}
                  </p>
                  <Link to='/profile' className='text-neutral-500 text-sm'>
                    View Profile...
                  </Link>
                </>
              )}
              <button onClick={handleLogout} className='btn btn-success'>
                Logout
              </button>
            </>
          )}
        </div>
      </section>
    </div>
  );
}

export default Home;
