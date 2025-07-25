import React, { useEffect, useState } from 'react';
import { watchdatas } from './watchdata';
import { useNavigate, useParams } from 'react-router-dom';
import {useCart} from "./CartContext"
const Watch = () => {
  const {addToCart,CartItems} = useCart()
  const navigate = useNavigate()
  const { id } = useParams();
  const [watchdata, setwatchdata] = useState({});
  const [quantity, setquantity] = useState(0);
  const [watchbrand,setwatchbrand] = useState("")
  const [watchgender,setwatchgender] = useState("")
  const [relatedwatches, setrelatedwatches] = useState([]);
  const [relatedStart, setRelatedStart] = useState(0);
  const [relatedVisible, setRelatedVisible] = useState(4);
  const additemstocart = (watchdata,quantity) =>{
      if(quantity>0)
      {
        addToCart(watchdata,quantity)
      }
  }
  // Responsive: set number of visible related items
  useEffect(() => {
    function updateVisible() {
      if (window.innerWidth >= 1024) {
        setRelatedVisible(4);
      } else if (window.innerWidth >= 768) {
        setRelatedVisible(3);
      } else if (window.innerWidth >= 640) {
        setRelatedVisible(2);
      } else {
        setRelatedVisible(1);
      }
    }
    updateVisible();
    window.addEventListener('resize', updateVisible);
    return () => window.removeEventListener('resize', updateVisible);
  }, []);

  useEffect(() => {
    const selectedWatch = watchdatas.find(watch => watch.id == id);
    if (selectedWatch) {
      setwatchdata(selectedWatch);
    }
  }, [id]);
  useEffect(() => {
    const matchwatch = watchdatas.find(watch => watch.id == id);
    if (matchwatch) {
      setwatchbrand(matchwatch.brand);
      setwatchgender(matchwatch.Gender);
    }
  }, [id]);
  const navigatetorelatedproduct = (id) =>{
        setquantity(0)
        navigate(`/watch/${id}`)
  }
  useEffect(() => {
    if (watchbrand && watchgender) {
      const related = watchdatas.filter(
        watch => watch.Gender == watchgender && watch.brand == watchbrand && String(watch.id) !== String(id)
      );
      setrelatedwatches(related);
      setRelatedStart(0);
    }
  }, [watchbrand, watchgender, id]);

  const handlePrev = () => {
    setRelatedStart(prev => Math.max(prev - relatedVisible, 0));
  };

  const handleNext = () => {
    setRelatedStart(prev =>
      Math.min(prev + relatedVisible, Math.max(relatedwatches.length - relatedVisible, 0))
    );
  };
  const decreaseQuantity = () => {
    setquantity(prev => (prev > 0 ? prev - 1 : prev));
  };

  const increaseQuantity = () => {
    setquantity(prev => (prev < watchdata.stock ? prev + 1 : prev));
  };

  return (
    <div className="px-4 py-8 md:py-16 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* Watch Image */}
        <div className="w-full h-[300px] sm:h-[350px] md:h-[400px] lg:h-[450px] flex justify-center items-center">
          <img
            src={watchdata.image}
            alt={watchdata.name}
            className="w-full h-full object-cover rounded-lg shadow-lg max-w-md"
          />
        </div>

        {/* Watch Details */}
        <div className="px-2 md:px-4">
          <h1 className="text-3xl font-bold text-gray-800">{watchdata.name}</h1>
          <h2 className="text-xl mt-3 text-blue-600 font-semibold">Rs. {watchdata.price}</h2>
          <p className="text-sm mt-4 text-gray-500 leading-relaxed">{watchdata.description}</p>

          {/* Quantity Selector */}
          {watchdata.stock > 0 ? (
            <div className="mt-6">
              <h3 className="text-md font-medium mb-2">Quantity *</h3>
              <div className="flex items-center w-[120px] h-[45px] bg-amber-300 rounded overflow-hidden shadow-sm">
                <button
                  onClick={decreaseQuantity}
                  className="w-1/3 text-xl font-bold border-r-2 border-amber-200 hover:bg-amber-400 transition cursor-pointer"
                >
                  -
                </button>
                <div className="w-1/3 text-center text-lg font-semibold">{quantity}</div>
                <button
                  onClick={increaseQuantity}
                  className="w-1/3 text-xl font-bold border-l-2 border-amber-200 hover:bg-amber-400 transition cursor-pointer"
                >
                  +
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-1">In stock: {watchdata.stock}</p>
            </div>
          ) : (
            <p className="mt-6 text-red-500 font-medium">Out of Stock</p>
          )}

          {/* Action Buttons */}
          <div className="mt-6 flex flex-col gap-3">
            <button onClick={()=>additemstocart(watchdata,quantity)} className="w-full cursor-pointer h-[50px] bg-orange-600 text-white rounded shadow hover:bg-orange-700 transition hover:underline">
              Add to Cart
            </button>
            <button className="w-full h-[50px] cursor-pointer bg-gray-800 text-white rounded shadow hover:bg-gray-900 transition hover:underline">
              Pay
            </button>
          </div>
        </div>
      </div>
      <div className="flex items-center w-full mt-15 px-4 sm:px-6 md:px-8 lg:px-10">
        {/* Title */}
        <div className="text-2xl font-normal whitespace-nowrap">
          You Might Also Like
        </div>

        {/* Horizontal line fills the remaining space */}
        <div className="flex-grow ml-4 border-t border-gray-300"></div>
      </div>
      <div className='mt-5 px-4 sm:px-6 md:px-8 lg:px-10'>
        {relatedwatches.length > relatedVisible && (
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={handlePrev}
              disabled={relatedStart === 0}
              className="p-2 rounded-full border border-gray-300 bg-white shadow hover:bg-gray-100 transition disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Previous"
            >
              <span className="text-xl">&#8592;</span>
            </button>
            <button
              onClick={handleNext}
              disabled={relatedStart + relatedVisible >= relatedwatches.length}
              className="p-2 rounded-full border border-gray-300 bg-white shadow hover:bg-gray-100 transition disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Next"
            >
              <span className="text-xl">&#8594;</span>
            </button>
          </div>
        )}
        <div className='grid grid-rows-1 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
          {relatedwatches.length === 0 && (
            <div className="col-span-full text-center text-gray-500 py-8">
              No related watches found.
            </div>
          )}
          {relatedwatches
            .slice(relatedStart, relatedStart + relatedVisible)
            .map((watch) => (
            <div key={watch.id} onClick={() =>{
                  navigatetorelatedproduct(watch.id)
            }} className="bg-white cursor-pointer rounded-xl shadow-md hover:shadow-xl transition duration-300 p-4 flex flex-col items-center">
              <img
                src={watch.image}
                alt={watch.name}
                className="w-full h-40 object-cover rounded-md mb-3"
              />
              <h2 className="text-lg font-semibold text-center">{watch.name}</h2>
              <p className="text-sm text-gray-600">Brand: {watch.brand}</p>
              <p className="text-sm text-gray-600">Gender: {watch.Gender}</p>
              <p
                className={`text-xs font-semibold mt-2 px-3 py-1 rounded-full ${
                  watch.stock > 0
                    ? 'bg-green-100 text-green-700'
                    : 'bg-red-100 text-red-600'
                }`}
              >
                {watch.stock > 0 ? 'In Stock' : 'Out of Stock'}
              </p>
              <p className="mt-2 text-blue-600 font-bold text-lg">Rs. {watch.price}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Watch;
