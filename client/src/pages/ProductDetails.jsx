import React, { useState, useEffect } from "react";
import { AiFillStar, AiOutlineTag } from "react-icons/ai";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { addToCart } from "../actions/cart";
import { useDispatch } from "react-redux";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
const currentProduct = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentProduct } = useSelector((state) => state.products);
  const [selectedImage, setSelectedImage] = useState("");
  useEffect(() => {
    if (currentProduct && currentProduct?.productImage[0]) {
      setSelectedImage(currentProduct.productImage[0]);
    } else {
      navigate("/");
    }
  }, [currentProduct, navigate]);

  const handleAddToCart = () => {
    dispatch(addToCart(currentProduct));
  };

  return (
    <div className="flex container  mx-auto flex-col lg:flex-row gap-10 p-8">
      <div className="flex w-full lg:w-1/2 ">
        <div className="flex flex-col gap-3 max-h-80 py-1">
          <Swiper
            direction="vertical"
            spaceBetween={10}
            slidesPerView={4}
            className="w-20 h-full"
          >
            {currentProduct?.productImage?.map((thumb, index) => (
              <SwiperSlide key={index}>
                <img
                  src={thumb}
                  alt={`Thumbnail ${index + 1}`}
                  className={`w-20 h-20 object-contain rounded-md cursor-pointer border ${
                    selectedImage === thumb
                      ? "border-black"
                      : "border-gray-300 hover:border-gray-500"
                  }`}
                  onClick={() => setSelectedImage(thumb)}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <img
          src={selectedImage}
          alt="Main Product"
          className=" ml-3 mr-20 w-96 max-h-96 h-auto rounded-md border border-gray-200 shadow-lg object-contain"
        />
      </div>

      {/* Right Section: Product Details */}
      <div className="flex flex-col w-full lg:w-1/2">
        <h2 className="text-lg px-3 py-2 bg-blue-600/5 mb-2 w-fit text-blue-600 rounded-md ">
          {currentProduct?.category}
        </h2>
        <h1 className="text-2xl my-2 font-semibold text-gray-800">
          {currentProduct?.productName}
        </h1>
        <h3 className=" text-gray-500 text-xl"> {currentProduct?.brandName}</h3>
        <div className="flex items-center space-x-1 mt-2">
          {[...Array(5)].map((_, index) => (
            <AiFillStar key={index} className="text-yellow-500" />
          ))}
          <span className="text-sm text-gray-500 ml-2">(157 Reviews)</span>
        </div>

        <div className="flex items-center mt-4">
          <p className="text-2xl font-bold text-gray-800">
            ${currentProduct?.sellingPrice?.toFixed(2)}
          </p>
          {currentProduct.sellingPrice < currentProduct.price && (
            <p className="text-lg line-through text-gray-400 ml-4">
              ${currentProduct.price.toFixed(2)}
            </p>
          )}
        </div>
        {currentProduct.sellingPrice < currentProduct.price && (
          <p className="text-sm text-gray-500 mt-2 flex items-center">
            <AiOutlineTag className="mr-2" />
            Save{" "}
            {Math.floor(
              -(
                (currentProduct?.sellingPrice - currentProduct.price) /
                currentProduct.price
              ) * 100
            )}{" "}
            % right now
          </p>
        )}

        {/* Features */}
        <div className="mt-6">
          <h2 className="text-lg font-semibold text-gray-800">Description</h2>
          <p className="text-sm text-gray-500 mt-2">
            {currentProduct.description}
          </p>
        </div>

        {/* Add to Cart */}
        <div className="mt-6">
          <button
            onClick={handleAddToCart}
            className="bg-blue-600 hover:text-gray-900 hover:bg-white text-white border transition-all duration-500 border-blue-600 hover:border-gray-200 px-4 py-3 rounded-md flex items-center"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default currentProduct;
