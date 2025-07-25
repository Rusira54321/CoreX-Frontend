import React, { useEffect, useState } from 'react'
import { useCart } from './CartContext'
import {toast,Bounce} from "react-toastify"
import axios from "axios"
import {loadStripe} from "@stripe/stripe-js"

const Cart = () => {
  const { CartItems, removeFromCart, updateQuantity } = useCart()
  const [total, setTotal] = useState(0)
  const [itemsdata,setitemsdata] = useState([])
  const changeQuantity = (value, id) => {
    updateQuantity(id, value)
  }
  const key = import.meta.env.VITE_CURRENCY_CONVERTER
  const stripekey = import.meta.env.VITE_STRIPE_KEY
  const BASE_URL = `https://v6.exchangerate-api.com/v6/${key}/latest/`;
  const convertCurrency = async (from, to, amount) => {
    try {
      const response = await axios.get(`${BASE_URL}${from}`);
      const rate = response.data.conversion_rates[to];
      if (!rate) {
        console.log(`Exchange rate for ${to} not found.`);
        return 0;
      }
      var convertedAmount = parseFloat((amount * rate).toFixed(2));
      return convertedAmount;
    } catch (error) {
      console.error("Error fetching exchange rate:", error.message);
      return 0;
    }
  };
  useEffect(() => {
    if (CartItems && Array.isArray(CartItems)) {
      const totalAmount = CartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
      setTotal(totalAmount)
    }
  }, [CartItems])

  const removeitem = (id) => {
    removeFromCart(id)
  }
  const checkout = async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    toast.error("You are not a registered user. Please login or sign up.", {
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
    return;
  }
  try {
    const updatedItems = await Promise.all(
      CartItems.map(async (item) => {
        const priceInUSD = await convertCurrency("LKR", "USD", item.price);
        return {
          Gender: item.Gender,
          brand: item.brand,
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          priceUSD: priceInUSD,
        };
      })
    );
    setitemsdata(updatedItems);
    const email = localStorage.getItem("email")
    const token = localStorage.getItem("token")
    const stripe = await loadStripe(stripekey)
    await axios.post(`http://localhost:8000/stripe/checkout`,{
      items:updatedItems,
      email:email
    },{
      headers:{
        "Authorization":`Bearer ${token}`
      }
    }).then(async(res)=>{
      const session = await res.data;
    const result = await stripe.redirectToCheckout({
            sessionId:session.id
          })
          if(result.error)
          {
            console.log(result.error);
            alert(result.error.message)
          }
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
  } catch (err) {
    console.error("Checkout error:", err.message);
  }
};
  return (
    <div className="px-4 sm:px-6 lg:px-10 py-8 bg-gray-50 min-h-screen">
      <h1 className="text-center text-3xl font-bold mb-4">🛒 SHOPPING CART</h1>

      <div className="flex flex-col lg:flex-row gap-6 mb-20">
        {/* Items */}
        <div className="w-full lg:w-3/4">
          {CartItems && CartItems.length != 0 ? (
            CartItems.map((item, index) => (
              <div className="mb-6 border rounded-lg p-4 shadow bg-white" key={item.id}>
                <div className="flex flex-col md:flex-row gap-4">
                  <img
                    src={item.image}
                    className="h-[150px] w-full md:w-[200px] object-cover rounded-lg border"
                    alt={item.name}
                  />
                  <div className="flex flex-col md:flex-row w-full gap-4">
                    <div className="flex flex-col justify-between w-full md:w-1/2">
                      <div>
                        <h1 className="font-semibold text-lg">{item.name}</h1>
                        <p className="text-sm text-gray-500">Gender: {item.Gender}</p>
                      </div>
                      <button
                        onClick={() => removeitem(item.id)}
                        className="mt-4 w-full sm:w-[100px] bg-red-500 text-white py-1 rounded hover:bg-red-600 transition"
                      >
                        Remove
                      </button>
                    </div>

                    <div className="flex flex-col sm:flex-row justify-between w-full md:w-1/2">
                      <div>
                        <h1 className="font-bold">Each</h1>
                        <p className="text-gray-600">Rs. {item.price}</p>
                      </div>
                      <div>
                        <h1 className="font-bold">Quantity</h1>
                        <input
                          type="number"
                          value={item.quantity}
                          onChange={(e) => changeQuantity(e.target.value, item.id)}
                          className="w-[80px] border border-gray-300 px-2 py-1 rounded mt-1"
                          min={1}
                          max={item.stock}
                        />
                      </div>
                      <div>
                        <h1 className="font-bold">Total</h1>
                        <p className="text-blue-600 font-semibold">Rs. {item.price * item.quantity}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-red-500 font-medium mt-10">Cart is Empty</div>
          )}
        </div>

        {/* Summary */}
        <div className="w-full lg:w-1/4">
          <div className="bg-white rounded-xl p-6 shadow-md">
            <h2 className="text-xl font-bold mb-4">🧾 Order Summary</h2>
            <div className="flex justify-between mb-2">
              <p className="text-gray-700">Total Price:</p>
              <p className="font-semibold text-gray-900">Rs. {total}</p>
            </div>
            <button
              onClick={()=>checkout()}
              className="w-full cursor-pointer mt-5 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
              disabled={CartItems.length === 0}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
