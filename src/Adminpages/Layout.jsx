import React from 'react';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';

const AdminLayout = () => {
  return (
    <div className="min-h-screen flex bg-gray-50">
      <Sidebar />
      <main className="flex-1 p-4 md:ml-64 transition-all duration-300">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;