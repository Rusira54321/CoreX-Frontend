import React, { useEffect, useState } from 'react'
import ImageSlideshow from './ImageSlideshow'
import { Headset, Truck, ShieldCheck, Diamond } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const Home = () => {
  const [bestsellers,setbestsellers] = useState([])
  const [latestproducts,setlatestproducts] =useState([])
  useEffect(()=>{
    const token = localStorage.getItem("token")
    const getlatestproducts = async() =>{
        await axios.get("http://localhost:8000/product/getlatestproduct").then((res)=>{
          setlatestproducts(res.data.product)
        })
    }
    getlatestproducts()
    const getbestsellingproducts = async() =>{
        await axios.get("http://localhost:8000/product/getbestsellingproduct").then((res)=>{
            setbestsellers(res.data.product)
        })
    }
    getbestsellingproducts()
  },[])
  const navigate = useNavigate()
    const features  =[{
      icon: <Headset className="w-10 h-10 text-blue-600 mx-auto" />,
      title: "24/7 Customer Support",
      description: "Our support team is available around the clock to assist you anytime."
    },
    {
      icon: <Truck className="w-10 h-10 text-green-600 mx-auto" />,
      title: "Free Worldwide Shipping",
      description: "We offer fast and free delivery on all orders, globally."
    },
    {
      icon: <ShieldCheck className="w-10 h-10 text-purple-600 mx-auto" />,
      title: "100% Secure Payment",
      description: "Your payments are protected with the latest security technology."
    },
    {
      icon: <Diamond className="w-10 h-10 text-yellow-600 mx-auto" />,
      title: "Premium Craftsmanship",
      description: "All watches are crafted with the finest materials and expert precision."
    }]
  return (
    <div>
      <ImageSlideshow />

      {/* Welcome Heading */}
      <div className="mt-8 text-center text-2xl font-bold">
        Welcome to CorexWatches
      </div>

      {/* Brand Description */}
      <div className="mt-4 text-center text-gray-600 px-4 sm:px-6 md:px-8 lg:px-10 max-w-4xl mx-auto leading-relaxed">
        Corex Watches is a luxury watch brand dedicated to craftsmanship,
        innovation, and timeless design. Each timepiece is meticulously
        engineered using premium materials to deliver precision, durability, and
        style. Whether you’re dressing up for a formal event or adding a touch
        of sophistication to your everyday look, Corex offers a collection that
        blends classic elegance with modern aesthetics.
        <br />
        <br />
        Our watches feature cutting-edge movements, scratch-resistant sapphire
        crystals, and finely detailed dials, ensuring that every Corex watch is
        not just a device to tell time but a statement of personality and taste.
        <br />
        <br />
        Experience the perfect balance of tradition and contemporary design —
        Corex Watches, where luxury meets innovation.
      </div>

      {/* New Arrivals Section */}
      <div className="flex items-center w-full mt-10 px-4 sm:px-6 md:px-8 lg:px-10">
        {/* Title */}
        <div className="text-2xl font-bold whitespace-nowrap">
          New Arrivals
        </div>

        {/* Horizontal line fills the remaining space */}
        <div className="flex-grow ml-4 border-t border-gray-300"></div>
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-8 px-4 sm:px-6 md:px-8 lg:px-10'>
        {/* Example Watch Cards */}
        {
            latestproducts.map((watch, index) => (
              <div key={index} onClick={()=>{navigate(`/watch/${watch._id}`)}} className="bg-white cursor-pointer shadow-lg rounded-2xl overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-2xl border border-gray-100">
                <img src={`http://localhost:8000/images/${watch.image}`} alt={watch.name} className="w-full h-48 object-cover rounded-t-2xl" />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-1">{watch.name}</h3>
                  <p className="text-gray-500 mb-3 text-sm">{watch.description}</p>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-2xl font-bold text-blue-600">Rs{watch.price.toLocaleString()}</span>
                    <span className={`text-xs px-2 py-1 rounded-full font-semibold ${watch.stock > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {watch.stock > 0 ? 'In Stock' : 'Out of Stock'}
                    </span>
                  </div>
                </div>
              </div>
            ))
        }
      </div>
      <div className="flex items-center w-full mt-15 px-4 sm:px-6 md:px-8 lg:px-10">
        {/* Title */}
        <div className="text-2xl font-bold whitespace-nowrap">
          Best sellers
        </div>

        {/* Horizontal line fills the remaining space */}
        <div className="flex-grow ml-4 border-t border-gray-300"></div>
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-8 px-4 sm:px-6 md:px-8 lg:px-10'>
        {/* Example Watch Cards */}
        {
            bestsellers.map((watch, index) => (
              <div key={index} onClick={()=>{navigate(`/watch/${watch._id}`)}} className="bg-white shadow-lg cursor-pointer rounded-2xl overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-2xl border border-gray-100">
                <img src={`http://localhost:8000/images/${watch.image}`} alt={watch.name} className="w-full h-48 object-cover rounded-t-2xl" />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-1">{watch.name}</h3>
                  <p className="text-gray-500 mb-3 text-sm">{watch.description}</p>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-2xl font-bold text-blue-600">${watch.price.toLocaleString()}</span>
                    <span className={`text-xs px-2 py-1 rounded-full font-semibold ${watch.stock > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {watch.stock > 0 ? 'In Stock' : 'Out of Stock'}
                    </span>
                  </div>
                </div>
              </div>
            ))
        }
      </div>
      <div className='mt-16 px-4 sm:px-6 md:px-8 lg:px-10 mb-20'>
            <h2 className='text-2xl font-bold text-center mb-8'>Why Choose CorexWatches?</h2>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8'>
                {
                    features.map((feature,index)=>(
                        <div key={index} className='bg-white shadow-lg rounded-2xl p-8 text-center transition-transform duration-300 hover:scale-105 hover:shadow-2xl border border-gray-100'>
                            {feature.icon}
                             <h3 className="mt-4 font-bold text-lg text-gray-800">{feature.title}</h3>
                             <p className="text-gray-500 mt-2 text-sm">{feature.description}</p>
                        </div>
                    ))
                }
            </div>
      </div>
    </div>
  )
}

export default Home