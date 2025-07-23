import React, { useEffect, useState } from 'react'
import { useCart } from './CartContext'
import {toast,Bounce} from "react-toastify"

const Cart = () => {
  const { CartItems, removeFromCart, updateQuantity } = useCart()
  const [total, setTotal] = useState(0)

  const changeQuantity = (value, id) => {
    updateQuantity(id, value)
  }

  useEffect(() => {
    if (CartItems && Array.isArray(CartItems)) {
      const totalAmount = CartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
      setTotal(totalAmount)
    }
  }, [CartItems])

  const removeitem = (id) => {
    removeFromCart(id)
  }
  const checkout = () =>{
    const token = localStorage.getItem("token")
    if(token == null)
    {
      toast.error("You are not registered user first login or sigunup", {
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
      return
    }
    else{
      
    }
  }
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
