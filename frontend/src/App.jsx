import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { createCartAsync } from './features/cart/cartSlice';
import Navbar from './componets/Navbar';



const App = () => {

  return (
    <div className='min-h-screen bg-white  dark:text-white transition-colors duration-500'>
     <Navbar/>
      <div>
      </div>
      <main>
        <Outlet />
      </main>
    </div>

  )
}

export default App
