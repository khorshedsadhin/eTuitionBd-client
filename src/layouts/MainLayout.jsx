import React from "react";
import Navbar from "../components/Shared/Navbar/Navbar";
import Container from "../components/Shared/Container";
import Footer from "../components/Shared/Footer/Footer";

const MainLayout = () => {
  return (
    <div className="bg-base-100 min-h-screen">
      <Navbar></Navbar>
      <div className='pt-24 min-h-[calc(100vh-68px)]'>
        
      </div>
      <Footer></Footer>
    </div>
  );
};

export default MainLayout;
