import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Order = () => {
    const [orders,setOrders] = useState([])
    const URL = "https://corexbackend.onrender.com/order/getUserOrders"
    useEffect(()=>{
        const email = localStorage.getItem("email")
        const getOrders = async() =>{
            await axios.post(URL,{
                email:email
            }).then((res)=>{
                // If response is {orders: [...]}, use that, else fallback to res.data
                if (Array.isArray(res.data)) {
                  setOrders(res.data);
                } else if (Array.isArray(res.data.orders)) {
                  setOrders(res.data.orders);
                } else {
                  setOrders([]);
                }
            })
        }
        if(email!=null)
        {
            getOrders()
        }
    },[])
  return (
    <div className="flex flex-col mt-5 items-center w-full min-h-screen bg-gradient-to-br from-blue-50 via-white to-pink-50 px-2">
      <h1 className="text-3xl font-extrabold mb-8 text-indigo-700 tracking-tight flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7h18M3 12h18M3 17h18" /></svg>
        My Orders
      </h1>
      {orders.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-10">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2a4 4 0 018 0v2m-4-4v4m0 0v4m0-4h4m-4 0H7" /></svg>
          <p className="text-gray-400 text-lg font-medium">No orders found.</p>
        </div>
      ) : (
        <div className="w-full max-w-3xl flex flex-col gap-8">
          {orders.map((order, idx) => (
            <div
              key={idx}
              className="relative bg-white rounded-2xl shadow-xl border-l-8 border-indigo-200 p-6 flex flex-col gap-4 hover:shadow-2xl transition group"
            >
              <div className="flex flex-wrap gap-2 items-center mb-2">
                <span className="font-semibold text-gray-700 flex items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V7a2 2 0 00-2-2H6a2 2 0 00-2 2v6" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v2a4 4 0 008 0v-2" /></svg>
                  Items:
                </span>
                <ul className="flex flex-wrap gap-2">
                  {order.items.map((item, i) => (
                    <li key={i} className="bg-indigo-50 text-indigo-700 px-2 py-1 rounded-lg text-sm font-medium shadow-sm">
                      {item.product} <span className="text-gray-500">(x{item.quantity})</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-wrap gap-4 items-center mb-1">
                <span className="font-semibold text-gray-700 flex items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 0V4m0 8v8m0-8h8m-8 0H4" /></svg>
                  Total Price:
                </span>
                <span className="text-lg font-bold text-green-600 bg-green-50 px-3 py-1 rounded-lg shadow-sm">Rs{order.totalPrice?.toFixed(2)}</span>
              </div>
              <div className="flex flex-wrap gap-4 items-center mb-1">
                <span className="font-semibold text-gray-700 flex items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  Status:
                </span>
                <span className={`px-3 py-1 rounded-full text-sm font-semibold shadow-sm
                  ${order.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' : ''}
                  ${order.status === 'Shipped' ? 'bg-blue-100 text-blue-700' : ''}
                  ${order.status === 'Delivered' ? 'bg-green-100 text-green-700' : ''}
                  ${order.status === 'Cancelled' ? 'bg-red-100 text-red-700' : ''}
                `}>{order.status}</span>
              </div>
              <div className="flex flex-wrap gap-4 items-center">
                <span className="font-semibold text-gray-700 flex items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-pink-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 4h10a2 2 0 012 2v10a2 2 0 01-2 2H7a2 2 0 01-2-2V9a2 2 0 012-2z" /></svg>
                  Paid Date & Time:
                </span>
                <span className="text-gray-600 bg-pink-50 px-3 py-1 rounded-lg shadow-sm">
                  {order.createdAt ? new Date(order.createdAt).toLocaleString() : 'N/A'}
                </span>
              </div>
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-200" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2a4 4 0 018 0v2m-4-4v4m0 0v4m0-4h4m-4 0H7" /></svg>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Order