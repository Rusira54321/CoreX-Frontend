import React from "react";
import Header from "./Header"

import { Outlet } from "react-router-dom";
import Footer from "./Footer";
const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
        <Header/>
      <main className="flex-grow bg-gray-50">
        <Outlet/>
      </main>
      <Footer/>
    </div>
  );
};

export default Layout;