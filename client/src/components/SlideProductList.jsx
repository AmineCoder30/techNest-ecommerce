import React, { useEffect, useState } from "react";
import { ProductCard } from "./index";
import { Swiper, SwiperSlide } from "swiper/react";
import { useSelector } from "react-redux";
import { filterProductsByCategory } from "../helpers";
import { useDispatch } from "react-redux";
import * as actionsTypes from "../constants/ActionsType";
import { useNavigate } from "react-router-dom";
import "swiper/css";
function SlideProductList({ title }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { fullProducts } = useSelector((state) => state.products);
  const [filteredProducts, setFilteredProducts] = useState([]);
  useEffect(() => {
    const Products = filterProductsByCategory(fullProducts.data, title);
    setFilteredProducts(Products);
  }, [fullProducts]);
  const handleCategoryClick = (item) => {
    dispatch({
      type: actionsTypes.SET_CURRENT_CATEGORY,
      payload: item,
    });
    navigate("/categoryproducts");
  };

  return (
    filteredProducts.length > 0 && (
      <div key={title} className="container mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-semibold">{title}</h1>
          <button
            onClick={() => handleCategoryClick(title)}
            className="text-sm font-medium text-blue-600"
          >
            View All
          </button>
        </div>
        <div className="w-full">
          <Swiper
            slidesPerView={2}
            spaceBetween={10}
            // Responsive breakpoints
            breakpoints={{
              // when window width is >= 320px

              // when window width is >= 640px
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 20,
              },
              1280: {
                slidesPerView: 4,
                spaceBetween: 20,
              },
            }}
            onSlideChange={() => console.log("slide change")}
            onSwiper={(swiper) => console.log(swiper)}
            className="container mx-auto mb-10"
          >
            {filteredProducts.map((product) => (
              <SwiperSlide key={product._id}>
                <ProductCard product={product} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    )
  );
}

export default SlideProductList;
