import React from 'react'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar/Navbar'
import Sidebar from './components/sidebar/Sidebar'
import {Routes,Route} from 'react-router-dom'
import Add from './pages/add/Add';
import List from './pages/list/List';
import Order from './pages/orders/Order';
function App() {
  const url="http://localhost:4000"
  return (
    <div>
      <ToastContainer></ToastContainer>
      <Navbar></Navbar>
      <hr />
      <div className="app-content">
        <Sidebar></Sidebar>
        <Routes>
          <Route path='/add' element={<Add url={url}/>}></Route>
          <Route path='/list' element={<List url={url}/>}></Route>

          <Route path='/orders' element={<Order url={url}/>}></Route>

        </Routes>
      </div>
    </div>
  )
}

export default App
