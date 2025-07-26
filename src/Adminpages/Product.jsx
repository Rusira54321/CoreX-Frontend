import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
const Product = () => {
  let allproducts
  let filterprodcutss
  const [searchproduct,setSearchProduct] = useState("")
  const [brand,setbrand] = useState("")
  const [availability,setavailability] = useState("")
  const [filterproducts,setfilterproducts] = useState([])
  const navigate = useNavigate()
  useEffect(()=>{
    const getallProducts = async() =>{
          await axios.get("http://localhost:8000/product/getallwatches").then((res)=>{
            allproducts = res.data.watches
            filterprodcutss = allproducts
            if(!searchproduct && !brand && !availability)
              { 
                    filterprodcutss = allproducts
              }
            if(brand)
            {
                filterprodcutss = filterprodcutss.filter(watch=>watch.brand==brand)
            }
            if(availability)
            {
              if(availability=="In Stock")
              {
                filterprodcutss = filterprodcutss.filter(watch=>watch.stock>0)
              }else if(availability=="Out of Stock")
              {
                filterprodcutss = filterprodcutss.filter(watch=>watch.stock<=0)
              }
            }
            if(searchproduct)
            {
                filterprodcutss = filterprodcutss.filter(watch=>watch.name.toLowerCase().includes(searchproduct.toLowerCase()))
            }
            setfilterproducts(filterprodcutss)
          })
      }
      getallProducts()
      
  },[searchproduct,brand,availability])
  return (
    <div>
        <div className='flex mt-20 lg:mt-10 mx-auto justify-center lg:mr-65 md:mr-65 md:ml-60  md:mt-10'>
                <div onClick={()=>navigate('/admin/addProduct')} className='flex justify-center items-center w-[150px] h-[30px] bg-blue-600 text-white px-2 hover:bg-blue-700 cursor-pointer'>
                    Add Products
                </div>
        </div>
        <div className='flex mt-10 mx-auto justify-center lg:mr-65 md:mr-65 md:ml-60 '>
            <input type='text' onChange={(e)=>setSearchProduct(e.target.value)} className='w-full mx-2 md:w-full  lg:w-2/3 border-2 px-1 md:px-2' placeholder='Search product'></input>
        </div>
        <div className='flex mt-10 mx-auto justify-center lg:mr-65 md:mr-65 md:ml-60 gap-x-10'>
            <select onChange={(e)=>setbrand(e.target.value)}>
                <option className='bg-gray-50' value="">Choose Brand</option>
                <option className='bg-gray-50' value="Omega">Omega</option>
                <option className='bg-gray-50' value="Rolex">Rolex</option>
                <option className='bg-gray-50' value="Cartier">Cartier</option>
                <option className='bg-gray-50' value="Tissot">Tissot</option>
                <option className='bg-gray-50' value="Seiko">Seiko</option>
                <option className='bg-gray-50' value="Fossil">Fossil</option>
                <option className='bg-gray-50' value="Casio">Casio</option>
                <option className='bg-gray-50' value="Tag Heuer">Tag Heuer</option>
                <option className='bg-gray-50' value="Michael kors">Michael kors</option>
                <option className='bg-gray-50' value="Citizen">Citizen</option>
            </select>
            <select onChange={(e)=>setavailability(e.target.value)}>
                <option className='bg-gray-50' value="">Choose availability</option>
                <option className='bg-gray-50' value="In Stock">In Stock</option>
                <option className='bg-gray-50' value="Out of Stock">Out of Stock</option>
            </select>
        </div>
        <div className="grid grid-cols-1 mt-10 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
        { filterproducts && filterproducts.map((watch, index) => (
          <div key={index}
            className="bg-white  rounded-xl shadow-md hover:shadow-xl transition duration-300 p-4 flex flex-col items-center"
          >
            <img
              src={`http://localhost:8000/images/${watch.image}`}
              alt={watch.name}
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <h2 className="text-lg font-semibold text-center">{watch.name}</h2>
            <p className="text-sm text-gray-600">Brand: {watch.brand}</p>
            <p className="text-sm text-gray-600">Gender: {watch.Gender}</p>
            {
              watch.stock > 0 ?
                <p className='text-xs font-semibold mt-2 px-3 py-1 rounded-full bg-green-100 text-green-700'>
                      In Stock
                </p>:
                <p className='text-xs font-semibold mt-2 px-3 py-1 rounded-full bg-red-100 text-red-600'>
                      Out of Stock
                </p>
            }
            <p className="mt-2 text-blue-600 font-bold text-lg">Rs. {watch.price}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Product
