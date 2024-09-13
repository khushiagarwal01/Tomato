import React, { useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import { Route,Routes } from 'react-router-dom'
import Home from './pages/home/Home.jsx';
import Cart from './pages/cart/Cart';
import Placeorder from './pages/placeorder/Placeorder.jsx'
import Footer from './components/footer/Footer.jsx';

import Loginpopup from './components/loginpopup/Loginpopup.jsx';

function App() {
  const [showlogin,setshowlogin]=useState(false)
  return (
    <>
    {showlogin?<Loginpopup setshowlogin={setshowlogin}></Loginpopup>:<></>}
    <div className='app'>
      <Navbar setshowlogin={setshowlogin}/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/cart' element={<Cart/> }/>
        <Route path='/order' element={<Placeorder/>} />
      </Routes>
    </div>
    <Footer></Footer>
    </>
  )
}

export default App
