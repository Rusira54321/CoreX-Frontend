import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from "recharts"
const MonthlyRevenueChart = () => {
    const [year,setYear] = useState(new Date().getFullYear())
    const url = `https://corexbackend.onrender.com/order/getmonthlyrevenue?year=${year}`
    const [data,setdata] = useState([])
    useEffect(()=>{
        const getdata = async() =>{
            await axios.get(url).then((res)=>{
                setdata(res.data)
            })
        }
        getdata()
    },[])
  // Gradient for bars
  const barColors = [
    '#6366f1', '#818cf8', '#a5b4fc', '#f472b6', '#fbbf24', '#34d399', '#60a5fa', '#f87171', '#facc15', '#38bdf8', '#f472b6', '#a3e635'
  ];

  // Custom Tooltip
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white rounded-xl shadow-lg px-4 py-2 border border-gray-100">
          <p className="font-semibold text-indigo-600 mb-1">{label}</p>
          <p className="text-gray-700">Revenue: <span className="font-bold text-indigo-500">Rs{payload[0].value}</span></p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full h-[350px]">
      <h2 className="text-xl sm:text-2xl font-extrabold mb-4 text-indigo-700 tracking-tight">Monthly Revenue <span className="text-gray-500 font-normal">({year})</span></h2>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }} barCategoryGap={20}>
          <defs>
            <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#818cf8"/>
              <stop offset="100%" stopColor="#6366f1"/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e0e7ff" />
          <XAxis dataKey="month" tick={{ fontSize: 14, fill: '#6366f1', fontWeight: 600 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 14, fill: '#818cf8', fontWeight: 600 }} axisLine={false} tickLine={false} />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f3f4f6', opacity: 0.5 }} />
          <Legend iconType="circle" wrapperStyle={{ fontSize: 14, color: '#6366f1', fontWeight: 600 }} />
          <Bar dataKey="revenue" radius={[8, 8, 0, 0]} fill="url(#barGradient)" isAnimationActive={true} animationDuration={1200} >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={barColors[index % barColors.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default MonthlyRevenueChart
