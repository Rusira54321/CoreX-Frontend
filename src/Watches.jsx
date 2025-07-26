import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
const Watches = () => {
  const navigate = useNavigate()
  const [allwatches,setallwatches] = useState([])
  const [watches, setWatches] = useState([])
  const [gender,setgender] = useState("")
  const [availability,setavailability] = useState("")
  const [brand,setbrand] = useState("")
  const [filterwatches,setfilterwatches] = useState([])
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(200000);
  useEffect(() => {
  const token = localStorage.getItem("token");
  
  const getallwatches = async () => {
    try {
      const res = await axios.get("http://localhost:8000/product/getallwatches");
      setallwatches(res.data.watches);

      // ✅ Format the data right after fetching
      const formatted = res.data.watches.map((watch) => ({
        id: watch._id,
        name: watch.name,
        price: watch.price,
        image: watch.image,
        brand: watch.brand,
        Gender: watch.Gender,
        availability: watch.stock > 0 ? 'In Stock' : 'Out of Stock'
      }));

      setWatches(formatted);
      setfilterwatches(formatted);
    } catch (error) {
      console.error("Error fetching watches:", error);
    }
  };

  getallwatches();
}, []);
  useEffect(() => {
    let result = watches;
    if (!gender && !availability && !brand && minPrice === 0 && maxPrice === 200000) {
      result = watches;
    }
    if (gender) {
      result = result.filter((w) => w.Gender === gender);
    }
    if (availability) {
      result = result.filter((w) => w.availability === availability);
    }
    if (brand) {
      result = result.filter((w) => w.brand === brand);
    }
    result = result.filter((w) => w.price >= parseInt(minPrice) && w.price <= parseInt(maxPrice));
    setfilterwatches(result);
  }, [gender, availability, brand, minPrice, maxPrice, watches]);
  return (
    <div className="p-4 md:p-10 bg-gray-50 min-h-screen">
      {/* Heading */}
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Explore Luxury Watches</h1>

      {/* Divider */}
      <div className="border border-gray-300 mb-8"></div>

      {/* Filter Panel */}
      <div className="flex flex-col md:flex-row justify-center items-center gap-6 mb-10 flex-wrap">
        {/* Gender */}
        <div className="flex flex-col gap-1 w-64">
          <label className="text-sm font-medium text-gray-700">Gender</label>
          <select onChange={(e)=>{setgender(e.target.value)}} className="px-4 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400">
            <option value="">Choose Gender</option>
            <option value="Men">Male</option>
            <option value="Women">Female</option>
            <option value="Unisex">Unisex</option>
          </select>
        </div>

        {/* Brand */}
        <div className="flex flex-col gap-1 w-64">
          <label className="text-sm font-medium text-gray-700">Brand</label>
          <select onChange={(e)=>{setbrand(e.target.value)}} className="px-4 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400">
            <option value="">Choose Brand</option>
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
            <option value="">Choose Availability</option>
            <option value="In Stock">In Stock</option>
            <option value="Out of Stock">Out of Stock</option>
          </select>
        </div>

        {/* Price Range (Double Slider) */}
        <div className="flex flex-col gap-1 w-64">
          <label className="text-sm font-medium text-gray-700 mb-1">Price Range</label>
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
              <span>Min: Rs. {minPrice}</span>
              <span>Max: Rs. {maxPrice}</span>
            </div>
            <div className="flex gap-2 items-center">
              <input
                type="range"
                min="0"
                max={maxPrice}
                value={minPrice}
                onChange={e => {
                  const val = Math.min(Number(e.target.value), maxPrice - 1);
                  setMinPrice(val);
                }}
                className="w-full accent-blue-500"
              />
              <input
                type="range"
                min={minPrice}
                max="200000"
                value={maxPrice}
                onChange={e => {
                  const val = Math.max(Number(e.target.value), minPrice + 1);
                  setMaxPrice(val);
                }}
                className="w-full accent-blue-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Watches Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filterwatches.map((watch, index) => (
          <div
          onClick={()=>{navigate(`/watch/${watch.id}`)}}
            key={index}
            className="bg-white cursor-pointer rounded-xl shadow-md hover:shadow-xl transition duration-300 p-4 flex flex-col items-center"
          >
            <img
              src={`http://localhost:8000/images/${watch.image}`}
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
