import React, { useEffect, useState } from 'react'
import { watchdatas } from './watchdata'

const Watches = () => {
  const [watches, setWatches] = useState([])
  const [gender,setgender] = useState("")
  const [availability,setavailability] = useState("")
  const [brand,setbrand] = useState("")
  const [filterwatches,setfilterwatches] = useState([])
  useEffect(() => {
    const filteredWatches = watchdatas.map((watch) => {
      return {
        name: watch.name,
        price: watch.price,
        image: watch.image,
        brand: watch.brand,
        Gender: watch.Gender,
        availability: watch.stock > 0 ? 'In Stock' : 'Out of Stock'
      }
    })
    setWatches(filteredWatches)
    setfilterwatches(filteredWatches)
  }, [])
  useEffect(()=>{
        let result = watches
        if(gender)
        {
            result = result.filter(w=>w.Gender===gender)
        }
        if(availability)
        {
            result = result.filter(w=>w.availability===availability)
        }
        if(brand)
        {
            result = result.filter(w=>w.brand===brand)
        }
        setfilterwatches(result)
  },[gender, availability, brand])
  return (
    <div className="p-4 md:p-10 bg-gray-50 min-h-screen">
      {/* Heading */}
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Explore Luxury Watches</h1>

      {/* Divider */}
      <div className="border border-gray-300 mb-8"></div>

      {/* Filter Panel */}
      <div className="flex flex-col md:flex-row justify-center items-center gap-6 mb-10">
        {/* Gender */}
        <div className="flex flex-col gap-1 w-64">
          <label className="text-sm font-medium text-gray-700">Gender</label>
          <select onChange={(e)=>{setgender(e.target.value)}} className="px-4 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400">
            <option>Choose Gender</option>
            <option value="Men">Male</option>
            <option value="Women">Female</option>
            <option value="Unisex">Unisex</option>
          </select>
        </div>

        {/* Brand */}
        <div className="flex flex-col gap-1 w-64">
          <label className="text-sm font-medium text-gray-700">Brand</label>
          <select onChange={(e)=>{setbrand(e.target.value)}} className="px-4 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400">
            <option>Choose Brand</option>
            <option value="Omega">Omega</option>
            <option value="Rolex">Rolex</option>
            <option value="Cartier">Cartier</option>
            <option value="Tissot">Tissot</option>
            <option value="Seiko">Seiko</option>
            <option value="Fossil">Fossil</option>
            <option value="Casio">Casio</option>
            <option value="Tag Heuer">Tag Heuer</option>
            <option value="Michael Kors">Michael Kors</option>
            <option value="Citizen">Citizen</option>
          </select>
        </div>

        {/* Availability */}
        <div className="flex flex-col gap-1 w-64">
          <label className="text-sm font-medium text-gray-700">Availability</label>
          <select onChange={(e)=>{setavailability(e.target.value)}} className="px-4 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400">
            <option>Choose Availability</option>
            <option value="In Stock">In Stock</option>
            <option value="Out of Stock">Out of Stock</option>
          </select>
        </div>
      </div>

      {/* Watches Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filterwatches.map((watch, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-md hover:shadow-xl transition duration-300 p-4 flex flex-col items-center"
          >
            <img
              src={watch.image}
              alt={watch.name}
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <h2 className="text-lg font-semibold text-center">{watch.name}</h2>
            <p className="text-sm text-gray-600">Brand: {watch.brand}</p>
            <p className="text-sm text-gray-600">Gender: {watch.Gender}</p>
            <p
              className={`text-xs font-semibold mt-2 px-3 py-1 rounded-full ${
                watch.availability === 'In Stock'
                  ? 'bg-green-100 text-green-700'
                  : 'bg-red-100 text-red-600'
              }`}
            >
              {watch.availability}
            </p>
            <p className="mt-2 text-blue-600 font-bold text-lg">Rs. {watch.price}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Watches
