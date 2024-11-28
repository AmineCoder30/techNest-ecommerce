import React, { useEffect, useState } from "react";
import { CategoriesSidebar, ProductCard } from "../components";
import { filterProductsByCategory } from "../helpers";
import { useSelector } from "react-redux";

function CategoryProducts() {
  const { fullProducts, currentCategory } = useSelector(
    (state) => state.products
  );
  const [filteredProducts, setFilteredProducts] = useState([]);
  useEffect(() => {
    const Products = filterProductsByCategory(
      fullProducts.data,
      currentCategory
    );
    setFilteredProducts(Products);
  }, [currentCategory, fullProducts]);
  return (
    <div className="w-full relative flex gap-2 p-4">
      <aside className=" sticky top-0 left-0 border-r h-fit">
        <CategoriesSidebar />
      </aside>
      <main className="min-h-screen">
        {" "}
        <div className="w-full  mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredProducts.map((product) => (
            <ProductCard product={product} />
          ))}
        </div>
      </main>
    </div>
  );
}

export default CategoryProducts;
