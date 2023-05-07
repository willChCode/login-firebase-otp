import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ResetPassword from './components/resetPassword';
import Profile from './components/Profile';
import Phone from './components/Phone';
import Prueba from './components/Prueba';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/reset-password' element={<ResetPassword />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/phone' element={<Phone />} />
        <Route path='/prueba' element={<Prueba />} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;