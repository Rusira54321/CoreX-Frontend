import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { toast, Bounce } from 'react-toastify';
import axios from 'axios';
import NewUserCountChart from './NewUserCountChart';
import MonthlyRevenueChart from './MonthlyRevenueChart';
const Dashboard = () => {
  const [outofStocks,setOutOfStocks] = useState(0)
  const [pendingCount,setPendingCount] = useState(0)
  const [NoUsers,setNoUsers] = useState(0)
  const url = "https://corexbackend.onrender.com/product/getoutstockcount"
  const url1 = "https://corexbackend.onrender.com/order/numberPOrders"
  const url2 = "https://corexbackend.onrender.com/user/noOfusers"
  const navigate = useNavigate();

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("email");
    toast.success("Logged out successfully!", {
      position: "top-right",
      autoClose: 3000,
      theme: "dark",
      transition: Bounce,
    });
    navigate("/login");
  };

  useEffect(()=>{
      const getOutofStock = async() =>{
          await axios.get(url).then((res)=>{
            setOutOfStocks(res.data.count)
          })
      }
      getOutofStock()
      const getpendingcount = async() =>{
          await axios.get(url1).then((res)=>{
            setPendingCount(res.data.count)
          })
      }
      getpendingcount()
      const getNumberOFUsers = async() =>{
          await axios.get(url2).then((res)=>{
              setNoUsers(res.data.count)
          })
      }
      getNumberOFUsers()
  },[])
  return (
    <div className="relative w-full min-h-screen bg-gradient-to-br from-blue-100 via-white to-pink-100 px-1 sm:px-2 md:px-4 py-6 md:py-10">
      {/* Logout button top right */}
      <motion.button
        type="button"
        onClick={handleLogout}
        className="fixed top-4 right-2 sm:right-4 z-30 bg-gradient-to-r from-red-500 via-red-600 to-pink-500 text-white py-2 px-4 sm:px-6 rounded-xl font-bold shadow-lg hover:scale-105 transition-all duration-200 text-sm sm:text-base"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.97 }}
      >
        Logout
      </motion.button>
      <motion.div
        className="flex flex-col md:flex-row flex-wrap gap-4 md:gap-6 lg:gap-8 mt-16 md:mt-8 w-full max-w-7xl mx-auto"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.15 } }
        }}
      >
        <motion.div
          className="flex-1 min-w-[220px] bg-gradient-to-br from-yellow-200 via-yellow-100 to-white rounded-3xl justify-center items-center shadow-2xl border border-yellow-100 p-4 sm:p-6 md:p-8 flex flex-col transition hover:scale-105"
          whileHover={{ y: -6, scale: 1.04, boxShadow: "0 8px 32px 0 rgba(255, 193, 7, 0.15)" }}
          variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
        >
          <span className="text-3xl sm:text-4xl mb-2">📦</span>
          <p className="text-lg sm:text-xl font-bold text-yellow-800 mb-1 text-center">Total Out Of Stocks</p>
          <p className="text-2xl sm:text-3xl font-extrabold text-yellow-700">{outofStocks}</p>
        </motion.div>
        <motion.div
          className="flex-1 min-w-[220px] bg-gradient-to-br from-blue-200 via-blue-100 to-white rounded-3xl justify-center items-center shadow-2xl border border-blue-100 p-4 sm:p-6 md:p-8 flex flex-col transition hover:scale-105"
          whileHover={{ y: -6, scale: 1.04, boxShadow: "0 8px 32px 0 rgba(33, 150, 243, 0.15)" }}
          variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
        >
          <span className="text-3xl sm:text-4xl mb-2">⏳</span>
          <p className="text-lg sm:text-xl font-bold text-blue-800 mb-1 text-center">Total Pending Orders</p>
          <p className="text-2xl sm:text-3xl font-extrabold text-blue-700">{pendingCount}</p>
        </motion.div>
        <motion.div
          className="flex-1 min-w-[220px] bg-gradient-to-br from-orange-200 via-orange-100 to-white rounded-3xl justify-center items-center shadow-2xl border border-orange-100 p-4 sm:p-6 md:p-8 flex flex-col transition hover:scale-105"
          whileHover={{ y: -6, scale: 1.04, boxShadow: "0 8px 32px 0 rgba(255, 152, 0, 0.15)" }}
          variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
        >
          <span className="text-3xl sm:text-4xl mb-2">👤</span>
          <p className="text-lg sm:text-xl font-bold text-orange-800 mb-1 text-center">No Of Users</p>
          <p className="text-2xl sm:text-3xl font-extrabold text-orange-700">{NoUsers}</p>
        </motion.div>
      </motion.div>

    {/* Monthly Revenue Chart full width below cards, outside the grid */}
    <motion.div
      className="w-full mt-10 sm:mt-12 px-0 sm:px-2 md:px-4 lg:px-8"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
    >
      <div className="w-full bg-white rounded-3xl shadow-2xl p-2 md:p-6 overflow-x-auto min-h-[320px]">
        <MonthlyRevenueChart />
      </div>
    </motion.div>
    <motion.div
      className="w-full mt-10 sm:mt-12 px-0 sm:px-2 md:px-4 lg:px-8"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
    >
      <div className="w-full bg-white rounded-3xl shadow-2xl p-2 md:p-6 overflow-x-auto min-h-[320px]">
        <NewUserCountChart />
      </div>
    </motion.div>
    </div>
  )
}

export default Dashboard
