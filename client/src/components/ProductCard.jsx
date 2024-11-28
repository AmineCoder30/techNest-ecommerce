import { useState } from "react";
import { AiOutlineHeart, AiFillStar } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as actionsTypes from "../constants/ActionsType";
import options from "../constants/toastOptions";
import { toast } from "react-toastify";
import { addToCart } from "../actions/cart";
import SmallLoader from "./SmallLoader";
import { MdEdit } from "react-icons/md";
function ProductCard({ product }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { authData } = useSelector((state) => state.auth);
  const [laoding, setLoading] = useState(false);

  // Add to Cart
  const handleAddToCart = async (product) => {
    setLoading(true);
    if (!authData?.data) {
      toast.error("Please Login to add to cart", options);
    } else {
      await dispatch(addToCart({ ...product, userId: authData?.data?._id }));
    }
    setLoading(false);
  };

  // Set Current Product
  const setCurrentProduct = () => {
    dispatch({ type: actionsTypes.SET_PRODUCT, payload: product });
    navigate(`/product/${product._id}`);
  };

  //handle edit function
  const handleEdit = () => {
    dispatch({ type: actionsTypes.GET_PRODUCT, payload: product });
    navigate(`/admin/upload/true`);
  };

  return (
    <div className="w-full p-4 border overflow-hidden cursor-pointer rounded-lg group shadow-sm hover:shadow-md transition-shadow relative">
      {/* Favorite Icon */}
      {authData.data && authData.data.role === "ADMIN" ? (
        <button
          onClick={handleEdit}
          className="absolute top-1 right-1 p-2 bg-green-300/30 transition-all duration-200 text-green-800 rounded-md hover:text-white hover:bg-green-500"
        >
          <MdEdit size={20} />
        </button>
      ) : null}

      {/* Product Image */}
      <div onClick={setCurrentProduct} className="flex justify-center mb-4">
        <img
          src={product?.productImage[0]} // Replace with actual image URL
          alt={product?.description}
          className="h-auto max-h-60 w-full"
        />
      </div>

      {/* Brand Name */}
      <div className="text-xs text-gray-500 font-semibold mb-1">
        {product.productName.slice(0, 20) + "..."}
      </div>

      {/* Product Title */}
      <div className="text-sm font-medium text-gray-00 mb-2">
        <p>{product.description.slice(0, 30)}</p>
        <p> {product.description.slice(30, 40) + "..."}</p>
      </div>

      {/* Rating and Reviews */}
      <div className="flex items-center text-yellow-400 mb-2">
        <AiFillStar size={16} />
        <AiFillStar size={16} />
        <AiFillStar size={16} />
        <AiFillStar size={16} />
        <AiFillStar size={16} />
        <span className="text-gray-500 text-xs ml-2">
          ({Math.floor(Math.random() * 200) + 1})
        </span>
      </div>

      {/* Price */}
      <div className=" font-medium flex items-end gap-1 ">
        <span className="text-gray-800 text-lg">${product.sellingPrice}</span>
        {product.sellingPrice < product.price && (
          <span className="text-gray-400 text-md line-through">
            ${product.price}
          </span>
        )}
      </div>

      {/* Add to Cart Button */}
      {laoding ? (
        <SmallLoader />
      ) : (
        <button
          onClick={() => handleAddToCart(product)}
          className="w-full absolute bottom-0 left-0 group-hover:translate-y-0 transition-all duration-300 translate-y-full py-2 text-white bg-blue-600 hover:bg-blue-500  mt-4"
        >
          add to cart
        </button>
      )}
    </div>
  );
}

export default ProductCard;
