import React, { useEffect, useState } from "react";
import {toast,Bounce} from "react-toastify"

import axios from "axios";
const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get("http://localhost:8000/order/getorders", {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        }); // 🔗 Admin API endpoint
        const data = await response.data.Orders;
        setOrders(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);
  const updateOrderStatus = async(id,value) =>{
    const token = localStorage.getItem("token");
        await axios.post("http://localhost:8000/order/updateOrders",{
            id:id,
            value:value
        },{
            headers: {
            "Authorization": `Bearer ${token}`
          }
        }).then((res)=>{
            const fetchOrders = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get("http://localhost:8000/order/getorders", {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        }); // 🔗 Admin API endpoint
        const data = await response.data.Orders;
        setOrders(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders()
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
            
        })
  }
  // Filter orders based on search and status
  const filteredOrders = orders.filter(order => {
    const term = search.toLowerCase();
    const matchesSearch =
      order.customer_name?.toLowerCase().includes(term) ||
      order.customer_email?.toLowerCase().includes(term) ||
      order.customer_address?.toLowerCase().includes(term);
    const matchesStatus = statusFilter ? order.status === statusFilter : true;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-100 py-15 md:py-6  px-1 sm:px-6  flex flex-col items-center">
      <div className="w-full max-w-6xl bg-white/90 shadow-2xl rounded-3xl p-3 sm:p-8 border border-blue-100">
        <h1 className="text-center text-2xl sm:text-4xl font-extrabold tracking-tight text-blue-900 mb-2 flex items-center justify-center gap-2">
          <span className="text-3xl sm:text-5xl">📦</span> Customer Orders
        </h1>
        <p className="text-center text-gray-500 mb-6 sm:mb-8 text-sm sm:text-base">Manage and track all customer orders in one place.</p>

        {/* Filter by Status and Search Bar */}
        <div className="flex flex-col sm:flex-row sm:justify-between mb-4 sm:mb-6 gap-2">
          <select
            className="w-full sm:w-48 px-3 py-2 border border-blue-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300 text-blue-900 bg-white text-sm sm:text-base"
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
          >
            <option value="">All Statuses</option>
            <option value="Pending">Pending</option>
            <option value="Shipped">Shipped</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
          </select>
          <input
            type="text"
            className="w-full sm:w-80 px-3 py-2 border border-blue-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300 text-blue-900 bg-white placeholder:text-blue-400 text-sm sm:text-base"
            placeholder="Search by customer, email, or address..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center mt-8">
            <div className="w-12 h-12 border-4 border-blue-300 border-t-blue-600 rounded-full animate-spin mb-4"></div>
            <p className="text-lg text-blue-700 font-medium">Loading orders...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="flex flex-col items-center mt-8">
            <span className="text-2xl text-red-400 mb-2">❌</span>
            <p className="text-lg text-red-600 font-semibold">{error}</p>
          </div>
        )}

        {/* Orders Card View (all screens) */}
        {!loading && !error && filteredOrders.length > 0 && (
          <div className="mt-4 space-y-4">
            {filteredOrders.map((order) => (
              <div key={order._id} className="bg-white/90 border border-blue-100 rounded-2xl shadow-md p-4 flex flex-col gap-2">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-bold text-blue-900 text-base">{order.customer_name}</span>
                  <span className={
                    `px-2 py-0.5 rounded-full text-xs font-semibold shadow-sm border ml-auto ` +
                    (order.status === 'Pending' ? 'bg-yellow-100 text-yellow-800 border-yellow-300' :
                      order.status === 'Shipped' ? 'bg-blue-100 text-blue-800 border-blue-300' :
                      order.status === 'Delivered' ? 'bg-green-100 text-green-800 border-green-300' :
                      order.status === 'Cancelled' ? 'bg-red-100 text-red-700 border-red-300' :
                      'bg-gray-100 text-gray-700 border-gray-300')
                  }>
                    {order.status}
                  </span>
                </div>
                <div className="text-blue-700 text-xs break-words"><span className="font-semibold">Email:</span> {order.customer_email}</div>
                <div className="text-blue-700 text-xs break-words"><span className="font-semibold">Address:</span> {order.customer_address}</div>
                <div className="text-blue-700 text-xs"><span className="font-semibold">Items:</span> {order.items.map((item, idx) => (
                  <span key={idx} className="inline-block bg-blue-100 rounded px-2 py-0.5 mr-1 mb-1 shadow-sm">{item.product} × {item.quantity}</span>
                ))}</div>
                <div className="text-green-600 font-bold text-sm"><span className="font-semibold">Total:</span> Rs {order.totalPrice.toFixed(2)}</div>
                <div className="flex items-center gap-2 mt-1">
                  <select
                    className="border border-blue-200 rounded-lg px-2 py-1 bg-white text-blue-900 focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition-all shadow-sm text-xs"
                    value={order.status}
                    onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
              </div>
            ))}
          </div>
        )}
        {!loading && !error && filteredOrders.length === 0 && (
          <div className="flex flex-col items-center mt-12">
            <span className="text-5xl text-blue-200 mb-4">🗂️</span>
            <p className="text-xl text-blue-700 font-medium">No orders found.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Orders
