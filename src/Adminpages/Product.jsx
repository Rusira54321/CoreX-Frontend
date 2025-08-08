import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { motion, AnimatePresence } from 'framer-motion';
import { FaEdit, FaTrash } from 'react-icons/fa';
import {toast,Bounce} from "react-toastify"
const Product = () => {
  let allproducts
  let filterprodcutss
  const [searchproduct, setSearchProduct] = useState("")
  const [brand, setbrand] = useState("")
  const [availability, setavailability] = useState("")
  const [filterproducts, setfilterproducts] = useState([])
  const navigate = useNavigate()
  const getallProducts = async () => {
      await axios.get("http://localhost:8000/product/getallwatches").then((res) => {
        allproducts = res.data.watches
        filterprodcutss = allproducts
        if (!searchproduct && !brand && !availability) {
          filterprodcutss = allproducts
        }
        if (brand) {
          filterprodcutss = filterprodcutss.filter(watch => watch.brand == brand)
        }
        if (availability) {
          if (availability == "In Stock") {
            filterprodcutss = filterprodcutss.filter(watch => watch.stock > 0)
          } else if (availability == "Out of Stock") {
            filterprodcutss = filterprodcutss.filter(watch => watch.stock <= 0)
          }
        }
        if (searchproduct) {
          filterprodcutss = filterprodcutss.filter(watch => watch.name.toLowerCase().includes(searchproduct.toLowerCase()))
        }
        setfilterproducts(filterprodcutss)
      })
    }
  useEffect(() => {
    getallProducts()
  }, [searchproduct, brand, availability])
  const handleDelete = async(id) =>{
    const deleteURL = `http://localhost:8000/product/deleteproduct/${id}`
    const token = localStorage.getItem("token")
    await axios.delete(deleteURL,{
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
            getallProducts()
    })
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-pink-50 px-2 py-8">
      {/* Add Products Button */}
      <motion.div
        className='flex mt-16 lg:mt-10 justify-center'
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, type: 'spring' }}
      >
        <motion.button
          whileHover={{ scale: 1.07 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => navigate('/admin/addProduct')}
          className='flex justify-center items-center w-full sm:w-[180px] h-[44px] bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 text-white px-4 font-bold rounded-xl shadow-lg hover:from-blue-600 hover:to-blue-800 transition-all duration-200'
        >
          + Add Product
        </motion.button>
      </motion.div>

      {/* Search Bar */}
      <motion.div
        className='flex mt-8 justify-center'
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6, type: 'spring' }}
      >
        <motion.input
          type='text'
          onChange={(e) => setSearchProduct(e.target.value)}
          className='w-full sm:w-2/3 border-2 border-blue-200 px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300 shadow-sm bg-white/80 placeholder-gray-400'
          placeholder='Search product...'
          whileFocus={{ scale: 1.03 }}
        />
      </motion.div>

      {/* Filters */}
      <motion.div
        className='flex flex-col sm:flex-row mt-8 justify-center gap-4'
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6, type: 'spring' }}
      >
        <motion.select
          onChange={(e) => setbrand(e.target.value)}
          className='w-full sm:w-auto border-2 border-blue-200 px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300 bg-white/80 shadow-sm'
          whileFocus={{ scale: 1.03 }}
        >
          <option value="">Choose Brand</option>
          <option value="Omega">Omega</option>
          <option value="Rolex">Rolex</option>
          <option value="Cartier">Cartier</option>
          <option value="Tissot">Tissot</option>
          <option value="Seiko">Seiko</option>
          <option value="Fossil">Fossil</option>
          <option value="Casio">Casio</option>
          <option value="Tag Heuer">Tag Heuer</option>
          <option value="Michael kors">Michael kors</option>
          <option value="Citizen">Citizen</option>
        </motion.select>

        <motion.select
          onChange={(e) => setavailability(e.target.value)}
          className='w-full sm:w-auto border-2 border-blue-200 px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300 bg-white/80 shadow-sm'
          whileFocus={{ scale: 1.03 }}
        >
          <option value="">Choose availability</option>
          <option value="In Stock">In Stock</option>
          <option value="Out of Stock">Out of Stock</option>
        </motion.select>
      </motion.div>

      {/* Product Grid */}
      <motion.div
        className="grid grid-cols-1 mt-10 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.08
            }
          }
        }}
      >
        <AnimatePresence>
          {filterproducts && filterproducts.map((watch, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.4, type: 'spring' }}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition duration-300 p-4 flex flex-col items-center"
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
                watch.stock > 0 ? (
                  <p className='text-xs font-semibold mt-2 px-3 py-1 rounded-full bg-green-100 text-green-700'>
                    In Stock
                  </p>
                ) : (
                  <p className='text-xs font-semibold mt-2 px-3 py-1 rounded-full bg-red-100 text-red-600'>
                    Out of Stock
                  </p>
                )
              }
              <p className="mt-2 text-blue-600 font-bold text-lg">Rs. {watch.price}</p>
              <div className="flex gap-3 mt-4">
                <button
                  onClick={() => navigate(`/admin/editProduct/${watch._id}`)}
                  className="p-2 bg-blue-500 text-white rounded-full shadow hover:bg-blue-700 transition flex items-center justify-center"
                  title="Edit"
                >
                  <FaEdit size={18} />
                </button>
                <button
                  onClick={() =>handleDelete(watch._id)}
                  className="p-2 bg-red-500 text-white rounded-full shadow hover:bg-red-700 transition flex items-center justify-center"
                  title="Delete"
                >
                  <FaTrash size={18} />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}

export default Product
