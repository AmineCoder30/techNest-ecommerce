import React, { useEffect, useState } from "react";
import * as actionsTypes from "../constants/ActionsType";
import {
  Categories,
  HomeBanner,
  SlideProductList,
  Loader,
} from "../components";
import { useDispatch, useSelector } from "react-redux";

import { getUniqueCategories } from "../helpers";

function Home({ loading }) {
  const dispatch = useDispatch();
  const { products, categories } = useSelector((state) => state.products);

  useEffect(() => {
    if (products && products.data) {
      const allCategories = getUniqueCategories(products.data);

      dispatch({
        type: actionsTypes.SET_CATEGORIES,
        payload: allCategories,
      });
    }
  }, [products, dispatch]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="container min-h-screen mx-auto">
      <HomeBanner />
      <Categories />
      <div>
        {categories &&
          categories.map((category, index) => (
            <SlideProductList key={index} title={category} />
          ))}
      </div>
    </div>
  );
}

export default Home;
