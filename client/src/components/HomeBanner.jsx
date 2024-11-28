import React from "react";
import banner from "../assets/banner.webp";
function HomeBanner() {
  return (
    <div className="relative my-10 rounded-lg  text-white overflow-hidden  text-left">
      <img
        src={banner}
        alt="Banner"
        className="absolute inset-0 w-full h-full object-cover "
      />
      <div className="relative w-full md:w-3/4 lg:w-1/2 py-20 pl-8  bg-gradient-to-r from-black to-blue-600 z-10 px-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Welcome to TechNest
        </h1>
        <p className="text-base md:text-lg font-light  mb-8">
          The ultimate destination for premium-quality electronic products!
          Here, you'll discover a wide range of cutting-edge gadgets and
          devices, all designed to meet your needs and enhance your lifestyle.
        </p>
        <button className="border hover:bg-blue-600 capitalize transition-all duration-500 hover:border-blue-600 text-white  font-medium border-gray-100  px-4 py-3 rounded-md flex items-center">
          register now
        </button>
      </div>
    </div>
  );
}

export default HomeBanner;
