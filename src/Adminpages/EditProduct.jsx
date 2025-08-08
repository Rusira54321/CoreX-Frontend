import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {toast,Bounce} from "react-toastify"

const EditProduct = () => {
  
    const {id} = useParams()
    const [gender,setgender] = useState("")
    const [brand,setbrand] = useState("")
    const [description,setdescription] = useState("")
    const [name,setname] = useState("")
    const [price,setprice] = useState(0)
    const [stock,setstock] = useState(0) 
    const url = `http://localhost:8000/product/getproductbyid/${id}`
    const url1 = `http://localhost:8000/product/updatedProduct/${id}`
    const getProductData = async() =>{
            await axios.get(url).then((res)=>{
                setgender(res.data.product.Gender)
                setbrand(res.data.product.brand)
                setdescription(res.data.product.description)
                setname(res.data.product.name)
                setprice(res.data.product.price)
                setstock(res.data.product.stock)
            })
        }
    useEffect(()=>{
        getProductData()
    },[])
    const handleSubmit = async(e) =>{
        e.preventDefault()
        const token = localStorage.getItem("token")
        await axios.post(url1,{
          stock:stock,
          price:price
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
          getProductData()
        })
    }
  return (
    <div className="flex min-h-screen mt-10 md:mt-0 w-full justify-center items-center bg-gray-100 p-4">
      
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-lg p-6 md:p-10">
        
        {/* Heading */}
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-8">
          Add New Product
        </h1>

        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
          {/* Name */}
          <div className="flex flex-col md:flex-row gap-3">
            <label className="hidden md:block w-32 font-medium text-gray-700">
              Name
            </label>
            <input
            disabled
              value={name}
              onChange={(e)=>setname(e.target.value)}
              type="text"
              placeholder="Product Name"
              className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Brand */}
          <div className="flex flex-col md:flex-row gap-3">
            <label className="hidden md:block w-32 font-medium text-gray-700">
              Brand
            </label>
            <input
            disabled
            value={brand}
            onChange={(e)=>setbrand(e.target.value)}
              type="text"
              placeholder="Brand"
              className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Price */}
          <div className="flex flex-col md:flex-row gap-3">
            <label className="hidden md:block w-32 font-medium text-gray-700">
              Price
            </label>
            <input
            min={0}
            required
             value={price}
             onChange={(e)=>setprice(e.target.value)}
              type="number"
              placeholder="Price"
              className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Gender */}
          <div className="flex flex-col md:flex-row gap-3">
            <label className="hidden md:block w-32 font-medium text-gray-700">
              Gender
            </label>
            <select  disabled onChange={(e)=>setgender(e.target.value)} value={gender} className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">Select Gender</option>
              <option value="Men">Men</option>
              <option value="Women">Women</option>
              <option value="Unisex">Unisex</option>
            </select>
          </div>

          {/* Description */}
          <div className="flex flex-col md:flex-row gap-3">
            <label className="hidden md:block w-32 font-medium text-gray-700">
              Description
            </label>
            <textarea
            disabled
            value={description}
            onChange={(e)=>setdescription(e.target.value)}
              rows="3"
              placeholder="Product Description"
              className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>

          {/* Stock */}
          <div className="flex flex-col md:flex-row gap-3">
            <label className="hidden md:block w-32 font-medium text-gray-700">
              Stock
            </label>
            <input
            min={0}
            required
            value={stock}
            onChange={(e)=>setstock(e.target.value)}
              type="number"
              placeholder="Stock Quantity"
              className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

         

          {/* Submit Button */}
          <div className="flex justify-center mt-6">
            <button
              type="submit"
              className="w-full cursor-pointer md:w-40 h-12 bg-blue-600 text-white font-medium rounded-lg shadow-md hover:bg-blue-700 transition-all duration-300"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditProduct
