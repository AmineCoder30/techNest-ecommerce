import React, { useState } from "react";
import { IoCartOutline, IoSearchOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import logo from "../assets/logo.svg";
import { Link } from "react-router-dom";
import * as actionTypes from "../constants/ActionsType";
import { useDispatch } from "react-redux";
function Header({ setCartOpen }) {
  const { authData } = useSelector((state) => state.auth);
  const [showAdminPannelBtn, setshowAdminPannelBtn] = useState(false);
  const dispatch = useDispatch();
  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.reload();
  };

  const handleChange = (e) => {
    if (e.target.value === "") {
      dispatch({ type: actionTypes.RESET });
    } else {
      dispatch({ type: actionTypes.SEARCH, payload: e.target.value });
    }
  };
  return (
    <header className="w-full border-b">
      <div className="flex items-center container mx-auto justify-between p-4 ">
        <div className="flex items-center">
          <Link to="/">
            <img src={logo} alt="logo" className="w-40 md:w-60 " />
          </Link>
        </div>
        <div className="flex w-full  items-center gap-2 ">
          <div className="relative mx-0 lg:mx-10 overflow-hidden rounded-md  bg-gray-50 flex-grow border border-gray-300">
            <input
              onChange={handleChange}
              type="text"
              placeholder='Search "Laptop, Headphone, iPhone"'
              className="pl-9 pr-4 w-full py-2 lg:py-3 bg-transparent   focus:outline-none"
            />
            <div className="absolute left-2 top-3">
              <IoSearchOutline size={20} />
            </div>
          </div>

          {authData.data ? (
            <div className=" ml-4 hidden lg:flex items-center gap-2 relative">
              <img
                className="w-10 h-10 rounded-full mr-4"
                src={authData?.data?.profilePic}
                alt={authData?.data?.authDataname + "is profile pic"}
                onClick={() => setshowAdminPannelBtn((prevState) => !prevState)}
              />
              {authData?.data?.role === "ADMIN" && (
                <Link
                  to="/admin"
                  className={`absolute left-0 bg-white ${
                    showAdminPannelBtn ? "opacity-100" : "opacity-0"
                  } z-20 -bottom-[67px] border-2 shadow-sm hover:bg-blue-600 capitalize transition-all duration-500 hover:border-blue-600 hover:text-white  font-medium border-gray-100 text-gray-900 px-4 py-3 rounded-md  `}
                  onClick={() => setshowAdminPannelBtn(false)}
                >
                  Admin pannel
                </Link>
              )}
              <button
                onClick={handleLogout}
                className=" border-2 shadow-sm hover:bg-blue-600 capitalize transition-all duration-500 hover:border-blue-600 hover:text-white  font-medium border-gray-100 text-gray-900 px-4 py-3 rounded-md "
              >
                log out
              </button>
            </div>
          ) : (
            <button className="ml-4 shadow-sm border-2 hover:bg-blue-600 capitalize transition-all duration-500 hover:border-blue-600 hover:text-white  font-medium border-gray-100 text-gray-900 px-4 py-3 rounded-md ">
              <Link to="/auth">register</Link>
            </button>
          )}
          <button
            onClick={() => setCartOpen(true)}
            className="ml-4 bg-blue-600 hover:text-gray-900 hover:bg-white text-white border transition-all duration-500 border-blue-600 hover:border-gray-200 px-3 lg:px-4 py-2 lg:py-3 rounded-md flex items-center"
          >
            <IoCartOutline size={24} />

            <span className="ml-2 hidden lg:block font-medium capitalize">
              check cart
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
