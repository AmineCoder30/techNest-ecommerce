import React, { useState, useEffect } from "react";
import { RxCross2 } from "react-icons/rx";
import { useSelector, useDispatch } from "react-redux";
import { getCart, deleteCart, updateCart } from "../actions/cart";
import { MdDelete } from "react-icons/md";
import * as actionTypes from "../constants/ActionsType";
const Cart = ({ isCartOpen, setCartOpen }) => {
  const { allCarts } = useSelector((state) => state.cart);
  const { authData } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  // delete cart item
  const deleteCartItem = (id) => {
    console.clear();
    console.log(id);
    dispatch(deleteCart({ id }));
  };

  // Get cart items
  useEffect(() => {
    if (authData?.data?._id) {
      dispatch(getCart(authData?.data?._id));
    }
  }, [isCartOpen]);

  const handleIncreaseCount = (id, quantity) => {
    dispatch(updateCart({ _id: id, quantity: quantity + 1 }));
  };

  const handleDecreaseCount = (id, quantity) => {
    if (quantity > 1) {
      dispatch(updateCart({ _id: id, quantity: quantity - 1 }));
    }
  };

  //calculate total
  const calculateTotal = () => {
    if (allCarts) {
      return allCarts
        ?.reduce(
          (total, item) => total + item.productId.sellingPrice * item?.quantity,
          0
        )
        .toFixed(2);
    }
  };

  return (
    <div
      className={`absolute cart  inset-0 z-50 transition-all duration-300 ${
        isCartOpen ? "flex opacity-100" : "hidden opacity-0"
      }   bg-black/40`}
    >
      <div className="w-full h-full"></div>
      <div className=" min-h-screen flex flex-col   bg-white    ">
        <div className=" w-full bg-white shadow-md  flex  justify-between p-2 items-center ">
          <h1 className="text-xl font-bold"> Cart</h1>
          <button onClick={() => setCartOpen(false)}>
            <RxCross2 size={20} />
          </button>
        </div>
        <div className="flex-1 p-2 w-96 overflow-auto">
          {allCarts && allCarts?.length === 0 ? (
            <p className="text-gray-700">Your cart is empty.</p>
          ) : (
            <div className="bg-gray-50 group ">
              <div className=" w-full   bg-white   ">
                {allCarts?.map((item, index) => (
                  <div
                    key={index}
                    className="flex border border-gray-100 p-2 relative bg-gray-50 rounded-lg items-center mb-4"
                  >
                    <img
                      src={item?.productId?.productImage[0]}
                      alt={item?.productId?.productName}
                      className="w-16 h-16 object-cover rounded-md"
                    />

                    <div className="ml-4 flex-1">
                      <h2 className="text-md  ">
                        {item.productId.productName}
                      </h2>
                      <div className=" font-medium flex items-baseline gap-1 ">
                        <span className="text-gray-800 text-md">
                          ${item.productId.sellingPrice}
                        </span>
                        <span className="text-gray-300 text-xs line-through">
                          ${item.productId.price}
                        </span>
                      </div>
                      <div className="absolute right-2 top-10 flex gap-1">
                        <button
                          onClick={() =>
                            handleIncreaseCount(item._id, item.quantity)
                          } // Pass id and current quantity
                          className="text-xs text-blue-500 hover:bg-blue-500 hover:text-white bg-blue-500/10 p-2 rounded-md"
                        >
                          +
                        </button>
                        <div className="text-xs text-blue-500 bg-blue-500/10 p-2 rounded-md">
                          {item.quantity}
                        </div>
                        <button
                          onClick={() =>
                            handleDecreaseCount(item._id, item.quantity)
                          } // Pass id and current quantity
                          className="text-xs text-blue-500 hover:bg-blue-500 hover:text-white bg-blue-500/10 p-2 rounded-md"
                        >
                          -
                        </button>
                      </div>
                      <button
                        onClick={() => deleteCartItem(item._id)}
                        className="absolute right-0 top-0  transition-all duration-300 text-xs group-hover:opacity-100 opacity-0 text-blue-500 hover:bg-blue-500 hover:text-white bg-blue-500/10 p-2 rounded-mdd"
                      >
                        <MdDelete />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className=" bg-white p-2 w-full">
          <div className="text-right p-2 mb-2 bg-gray-900 text-white rounded-md mt-4 flex justify-between text-lg font-semibold ">
            <h2>Total:</h2>
            <h2> ${calculateTotal()}</h2>
          </div>
          <button className="text-center capitalize font-medium w-full text-white bg-green-700 p-2 rounded-md">
            continue to payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
