import React, { useState } from "react";
import axios from "axios";
import {toast,Bounce} from "react-toastify"
const AddProduct = () => {
  const [image, setImage] = useState(null);
  const [name,setname] = useState("")
  const [brand,setbrand] = useState("")
  const [price,setprice] = useState("")
  const [gender,setgender] = useState("")
  const [description,setdescription] = useState("")
  const [stock,setstock] = useState("")
  const handleSubmit = async(e) =>{
      e.preventDefault()
      const token = localStorage.getItem("token")
      const formdata = new FormData()
      formdata.append("productPic",image)
      formdata.append("name",name)
      formdata.append("price",price)
      formdata.append("description",description)
      formdata.append("brand",brand)
      formdata.append("gender",gender)
      formdata.append("stock",stock)
      const URL = "https://corexbackend.onrender.com/product/addproducts"
      await axios.post(URL,formdata,{
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
                                theme: "light",
                                transition: Bounce,
                                });
          setImage(null)
          setname("")
          setbrand("")
          setprice("")
          setgender("")
          setdescription("")
          setstock("")
          e.target.reset()
        
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
});
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
            required
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
            required
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
            <select required onChange={(e)=>setgender(e.target.value)} value={gender} className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
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
            required
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

          {/* Product Image */}
          <div className="flex flex-col md:flex-row gap-3">
            <label className="hidden md:block w-32 font-medium text-gray-700">
              Product Image
            </label>
            <input
            required
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
              className="w-full cursor-pointer text-sm text-gray-700 border border-gray-300 rounded-lg p-3
                         file:mr-4 file:py-2 file:px-4 
                         file:rounded-full file:border-0 file:text-sm file:font-semibold
                         file:bg-blue-600 file:text-white hover:file:bg-blue-700"
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
  );
};

export default AddProduct;
