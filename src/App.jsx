import React from 'react'
import { Routes } from 'react-router-dom'
import { Route } from 'react-router-dom'
import Layout from './Layout'
import Home from './Home'
import Watches from './Watches'
import Watch from './Watch'
import Cart from './Cart'
import Login from "./Login"
const App = () => {
  return (
    <div>
    <Routes>
      <Route path='/' element={<Layout/>}>
            <Route index element={<Home/>}/>
            <Route path='/watches' element={<Watches/>}/>
            <Route path='/watch/:id' element={<Watch/>}/>
            <Route path='/cart' element={<Cart/>}/>
            <Route path='/login' element={<Login/>}/>
      </Route>
    </Routes>
    </div>
  )
}

export default App
