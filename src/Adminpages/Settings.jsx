import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {toast,Bounce} from "react-toastify"
const Settings = () => {
  const [name,setname] = useState("")
  const [email,setemail] = useState("")
  const [password,setpassword] = useState("")
  const getsettingURL = "http://localhost:8000/user/getAdmin"
  useEffect(()=>{
    const token = localStorage.getItem("token")
    const getadmin = async() =>{
            await axios.get(getsettingURL,{
                 headers: {
              "Authorization": `Bearer ${token}`
            }
            }).then((res)=>{
                setname(res.data.admindata.name)
                setemail(res.data.admindata.email)
                setpassword(res.data.admindata.password)
            })
    }
    getadmin()
  },[])
  const handleSubmit = async(e) =>{
        e.preventDefault()
        const token = localStorage.getItem("token")
        await axios.post("http://localhost:8000/user/updateAdmin",{
            name:name,
            email:email,
            password:password
        },{
             headers: {
              "Authorization": `Bearer ${token}`
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
                                            theme: "light",
                                            transition: Bounce,
                                            });
        }).catch((error)=>{
            console.log(error)
            console.log(error.response.message)
        })
  }
  return (
    <div className="flex min-h-screen justify-center items-center bg-gradient-to-br from-blue-50 via-white to-pink-50 px-2 py-8">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6 sm:p-10 flex flex-col gap-6 border border-gray-100">
        <h1 className="text-center text-2xl sm:text-3xl text-blue-600 font-extrabold mb-2 tracking-tight">Edit Settings</h1>
        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2">
            <label className="font-medium text-gray-700">Admin Name</label>
            <input required type="text" value={name} onChange={(e)=>setname(e.target.value)} className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-300 outline-none bg-white/80 placeholder-gray-400" placeholder="Enter admin name" />
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-medium text-gray-700">Email</label>
            <input required type="email" value={email} onChange={(e)=>setemail(e.target.value)} className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-300 outline-none bg-white/80 placeholder-gray-400" placeholder="Enter email" />
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-medium text-gray-700">Password</label>
            <input required type="password" value={password} onChange={(e)=>setpassword(e.target.value)} className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-300 outline-none bg-white/80 placeholder-gray-400" placeholder="Enter password" />
          </div>
          <button type="submit" className="w-full bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 text-white py-2 rounded-lg font-bold shadow hover:scale-105 transition-all duration-200 mt-2">Save Changes</button>
        </form>
      </div>
    </div>
  );
}

export default Settings