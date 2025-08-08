import React,{useEffect, useState} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios"
import {toast,Bounce} from "react-toastify"
const Setting = () => {
  const [password,setPassword] = useState("")
  const [address,setaddress] = useState("")
  const URL = "http://localhost:8000/user/updateUserDetails"
  const getURL = "http://localhost:8000/user/getuser"
  const getdata = async() =>{
    const email = localStorage.getItem("email")
    const token1 = localStorage.getItem("token")
      await axios.post(getURL,{
        email:email
      },{
        headers:{
        "Authorization":`Bearer ${token1}`
      }
      }).then((res)=>{
          setPassword(res.data.user.password)
          setaddress(res.data.user.address)
      })
    }
  useEffect(()=>{
    getdata()
  },[])
  const handleSubmit = async(e) =>{
      e.preventDefault()
      const token = localStorage.getItem("token")
      await axios.post(URL,{
        password:password,
        address:address
      },{
         headers:{
        "Authorization":`Bearer ${token}`
      }
      }).then((res)=>{
        toast.success(res.data.message, {
                                    position: "top-right",
                                    autoClose: 5000,        
                                    hideProgressBar: false,
                                    closeOnClick: false,
                                    pauseOnHover: true,
                                    draggable: true,
                                    progress: undefined,
                                    theme: "dark",
                                    transition: Bounce,
                                    }); 
                                    getdata() 
        
      }).catch((error)=>{
        console.log(error)
      })
  }
  // Logout handler
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("email");
    toast.success("Logged out successfully!", {
      position: "top-right",
      autoClose: 3000,
      theme: "dark",
      transition: Bounce,
    });
    navigate("/login");
  };

  return (
    <div className="relative flex min-h-screen justify-center items-center bg-white px-2">
      <form onSubmit={handleSubmit} className="w-full max-w-sm sm:max-w-md bg-white rounded-2xl shadow-2xl p-8 flex flex-col gap-6 border border-gray-100">
        <h1 className="text-3xl font-extrabold text-center text-blue-700 mb-2 tracking-tight">Modify profile</h1>
        <div className="flex flex-col gap-1">
          <label htmlFor="password" className="text-sm font-medium text-gray-700">Password</label>
          <input required id="password" type="password"  value={password} onChange={(e)=>setPassword(e.target.value)} className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition" placeholder="Enter your password" />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="address" className="text-sm font-medium text-gray-700">Address</label>
          <input required id="address" type="text" value={address} onChange={(e)=>setaddress(e.target.value)} className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition" placeholder="Enter your address" />
        </div>
        <button type="submit" className="mt-2 w-full bg-blue-600 text-white py-2 rounded-lg font-semibold shadow hover:bg-blue-700 transition">Submit</button>
        <button onClick={handleLogout} className="mt-1 w-full bg-amber-300 text-red-500 py-2 rounded-lg font-semibold shadow hover:bg-yellow-500 transition">Logout</button>
      </form>
      
    </div>
  )
}
export default Setting