import React from 'react'
import { Routes } from 'react-router-dom'
import { Route } from 'react-router-dom'
import Layout from './Layout'
import Home from './Home'
import Watches from './Watches'
import Watch from './Watch'
import Cart from './Cart'
import AdminLayout from "./Adminpages/Layout"
import Login from "./Login"
import Orders from './Adminpages/Orders'
import SignUp from './SignUp'
import AddProduct from './Adminpages/AddProduct'
import {ToastContainer} from "react-toastify"
import SuccessfulPayment from './SuccessfulPayment'
import Dashboard from './Adminpages/Dashboard'
import Product from './Adminpages/Product'
const App = () => {
  return (
    <div>
    <ToastContainer/>
    <Routes>
      <Route path='/' element={<Layout/>}>
            <Route index element={<Home/>}/>
            <Route path='/watches' element={<Watches/>}/>
            <Route path='/watch/:id' element={<Watch/>}/>
            <Route path='/cart' element={<Cart/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/Signup' element={<SignUp/>}/>
            <Route path='/successfulPayment' element={<SuccessfulPayment/>}/>
      </Route>
      <Route path='/admin' element={<AdminLayout/>}>
            <Route path='dashboard' element={<Dashboard/>}/>
            <Route path='product' element={<Product/>}/>
            <Route path='addProduct' element={<AddProduct/>}/>
            <Route path='order' element={<Orders/>}/>
      </Route>
    </Routes>
    </div>
  )
}

export default App
