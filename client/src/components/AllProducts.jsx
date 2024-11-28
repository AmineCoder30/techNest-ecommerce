import React from "react";
import ProductCard from "./ProductCard";
import { useSelector } from "react-redux";
function AllProducts() {
  const { fullProducts } = useSelector((state) => state.products);

  return (
    <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {fullProducts?.data?.map((product) => (
        <ProductCard product={product} />
      ))}
    </div>
  );
}

export default AllProducts;
