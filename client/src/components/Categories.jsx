import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { useSelector, useDispatch } from "react-redux";
import { countCategoryOccurrences } from "../helpers";
import * as actionsTypes from "../constants/ActionsType";
import "swiper/css";

function Categories() {
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const [countCategory, setcountCategory] = useState({});
  const { categories, products } = useSelector((state) => state.products);
  useEffect(() => {
    const categoryCounts = countCategoryOccurrences(products.data);
    setcountCategory(categoryCounts);
  }, [products]);

  const handleCategoryClick = (item) => {
    // Redirect to product page
    dispatch({
      type: actionsTypes.SET_CURRENT_CATEGORY,
      payload: item,
    });
    Navigate("/categoryproducts");
  };
  return (
    <Swiper
      slidesPerView={1}
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
      {categories.map((item, i) => {
        return (
          <SwiperSlide key={i} className=" ">
            <div
              onClick={() => handleCategoryClick(item)}
              className="flex justify-start group cursor-pointer items-center p-4 border rounded-lg shadow-sm"
            >
              <div
                className={`w-12 h-12  text-xl 
        bg-blue-600 text-white transition-all duration-200  rounded flex items-center justify-center`}
              >
                {item[0].toUpperCase()}
              </div>
              <div className="ml-4">
                <div className="flex items-center gap-2">
                  <span className="font-medium uppercase text-black">
                    {item}
                  </span>
                  <span className="text-gray-500 ml-2">
                    ({countCategory[item]})
                  </span>
                </div>
                <div className="text-blue-500 cursor-pointer">Show All</div>
              </div>
            </div>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}

export default Categories;
