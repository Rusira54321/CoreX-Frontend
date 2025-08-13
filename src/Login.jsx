import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios"
import {toast,Bounce} from "react-toastify"

const Login = () => {
  const navigate = useNavigate()
  const [email,setemail] = useState("")
  const [password,setpassword] = useState("")
  const URL = "https://corexbackend.onrender.com/user/login"
  const handleSubmit = async(e) =>{
        e.preventDefault()
        await axios.post(URL,{
            email:email,
            password:password
        }).then((res)=>{
              const token = res.data.token
              const role = res.data.role
              localStorage.setItem("token",token)
              localStorage.setItem("role",role)
              localStorage.setItem("email",email)
              if(role=="admin")
              {
                 navigate(`/admin/dashboard`)
              }
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
             setemail("")
             setpassword("")
        }).catch((error)=>{
            toast.error(error.response.data.message, {
                                position: "top-right",
                                autoClose: 5000,
                                hideProgressBar: false,
                                closeOnClick: false,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                                theme: "dark",
                                transition: Bounce,
                            })
        })
  }  
  return (
    <div className="flex min-h-screen justify-center items-center bg-white px-2">
      <form onSubmit={handleSubmit} className="w-full max-w-sm sm:max-w-md bg-white rounded-2xl shadow-2xl p-8 flex flex-col gap-6 border border-gray-100">
        <h1 className="text-3xl font-extrabold text-center text-blue-700 mb-2 tracking-tight">Login</h1>
        <div className="flex flex-col gap-1">
          <label htmlFor="email" className="text-sm font-medium text-gray-700">Email</label>
          <input required id="email" value={email} type="email" onChange={(e)=>setemail(e.target.value)} className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition" placeholder="Enter your email" />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="password" className="text-sm font-medium text-gray-700">Password</label>
          <input required id="password" type="password" value={password} onChange={(e)=>setpassword(e.target.value)} className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition" placeholder="Enter your password" />
        </div>
        <button type="submit" className="mt-2 w-full bg-blue-600 text-white py-2 rounded-lg font-semibold shadow hover:bg-blue-700 transition">Login</button>
        <div className="text-center mt-2 text-sm text-gray-600">
          Don't have an account?{' '}
          <Link to="/Signup" className="text-blue-600 font-semibold hover:underline">Sign up</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
