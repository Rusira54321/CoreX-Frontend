import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'

const User = () => {
    const [users,setusers] = useState([])
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState("");
    useEffect(() => {
      const fetchOrders = async () => {
        const token = localStorage.getItem("token");
        try {
          const response = await axios.get("http://localhost:8000/user/getusers", {
            headers: {
              "Authorization": `Bearer ${token}`
            }
          }); // 🔗 Admin API endpoint
          const data = response.data.users;
          setusers(data);
        } catch (err) {
          setError(err.response?.data?.message || err.message);
        } finally {
          setLoading(false);
        }
      };

      fetchOrders();
    }, []);

    // Filter users based on search
    const filteredUsers = users.filter(user => {
      const term = search.toLowerCase();
      return (
        user.name?.toLowerCase().includes(term) ||
        user.email?.toLowerCase().includes(term) ||
        user.address?.toLowerCase().includes(term)
      );
    });
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-100 py-6 px-1 sm:px-6 flex flex-col items-center">
      <div className="w-full mt-10 md:mt-0 max-w-6xl bg-white/90 shadow-2xl rounded-3xl p-3 sm:p-8 border border-blue-100">
        <h1 className="text-center text-2xl sm:text-4xl font-extrabold tracking-tight text-blue-900 mb-2 flex items-center justify-center gap-2">
          <span className="text-3xl sm:text-5xl">👤</span> Users
        </h1>
        <p className="text-center text-gray-500 mb-6 sm:mb-8 text-sm sm:text-base">All registered users in the system.</p>

        {/* Search Bar */}
        <div className="flex flex-col sm:flex-row sm:justify-end mb-4 sm:mb-6 gap-2">
          <input
            type="text"
            className="w-full sm:w-80 px-3 py-2 border border-blue-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300 text-blue-900 bg-white placeholder:text-blue-400 text-sm sm:text-base"
            placeholder="Search by name, email, or address..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center mt-8">
            <div className="w-12 h-12 border-4 border-blue-300 border-t-blue-600 rounded-full animate-spin mb-4"></div>
            <p className="text-lg text-blue-700 font-medium">Loading users...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="flex flex-col items-center mt-8">
            <span className="text-2xl text-red-400 mb-2">❌</span>
            <p className="text-lg text-red-600 font-semibold">{error}</p>
          </div>
        )}

        {/* Users Card View */}
        {!loading && !error && filteredUsers.length > 0 && (
          <div className="mt-4 space-y-4">
            {filteredUsers.map((user) => (
              <div key={user._id} className="bg-white/90 border border-blue-100 rounded-2xl shadow-md p-4 flex flex-col gap-2">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-bold text-blue-900 text-base">{user.name}</span>
                  <span className={
                    `px-2 py-0.5 rounded-full text-xs font-semibold shadow-sm border ml-auto ` +
                    (user.role === 'admin' ? 'bg-blue-100 text-blue-800 border-blue-300' :
                      'bg-gray-100 text-gray-700 border-gray-300')
                  }>
                    {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                  </span>
                </div>
                <div className="text-blue-700 text-xs break-words"><span className="font-semibold">Email:</span> {user.email}</div>
                <div className="text-blue-700 text-xs break-words"><span className="font-semibold">Address:</span> {user.address || <span className='italic text-gray-400'>No address</span>}</div>
              </div>
            ))}
          </div>
        )}
        {!loading && !error && filteredUsers.length === 0 && (
          <div className="flex flex-col items-center mt-12">
            <span className="text-5xl text-blue-200 mb-4">🗂️</span>
            <p className="text-xl text-blue-700 font-medium">No users found.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default User
