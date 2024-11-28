import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { countCategoryOccurrences } from "../helpers";
import * as actionsTypes from "../constants/ActionsType";
import Loader from "./Loader";
function CategoriesSidebar() {
  const dispatch = useDispatch();
  const [countCategory, setcountCategory] = useState({});
  const { categories, products, currentCategory } = useSelector(
    (state) => state.products
  );
  useEffect(() => {
    if (products.success) {
      const categoryCounts = countCategoryOccurrences(products.data);
      setcountCategory(categoryCounts);
    }
  }, [products]);

  const handleCategoryClick = (item) => {
    dispatch({
      type: actionsTypes.SET_CURRENT_CATEGORY,
      payload: item,
    });
  };
  return (
    <>
      {!products.success ? (
        <Loader />
      ) : (
        <div className="w-60 last:border-none">
          {categories?.map((item, i) => {
            return (
              <div
                key={i}
                onClick={() => handleCategoryClick(item)}
                className={`flex  cursor-pointer  group justify-start items-center p-4 border-b `}
              >
                <div
                  className={`w-12 h-12  text-xl ${
                    item === currentCategory
                      ? "bg-blue-500 text-white"
                      : "text-blue-500 bg-blue-300/30"
                  } group-hover:bg-blue-500 group-hover:text-white transition-all duration-200  rounded flex items-center justify-center`}
                >
                  {item[0].toUpperCase()}
                </div>
                <div className="ml-4">
                  <div className="font-medium uppercase text-black">{item}</div>

                  <div className="text-gray-300 cursor-pointer">
                    {" "}
                    ({countCategory[item]})
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}

export default CategoriesSidebar;
