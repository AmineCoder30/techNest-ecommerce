import React, { useState, useEffect } from "react";
import { AllProducts, AllUsers, UploadProduct } from "../components";
import { useNavigate } from "react-router-dom";
import { Outlet, Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
function AdminPannel() {
  const location = useLocation();

  const [IsActive, setIsActive] = useState(location.pathname);
  const userInfo = JSON.parse(localStorage.getItem("profile"));
  const navigate = useNavigate();
  const LinkList = [
    { id: 1, name: "All Product", link: "/admin/products" },
    { id: 2, name: " All Users", link: "/admin/users" },
    { id: 3, name: "Upload Product", link: "/admin/upload" },
  ];

  useEffect(() => {
    if (userInfo && userInfo?.data?.role !== "ADMIN") {
      navigate("/");
    }
  }, []);

  return (
    <div className="py-5 min-h-screen">
      <div className="  container gap-2 mx-auto flex space-x-4 p-4 ">
        {LinkList.map((link) => {
          return (
            <Link
              to={link.link}
              key={link.id}
              onClick={() => setIsActive(link.link)}
              className={`border hover:bg-blue-600 capitalize transition-all duration-500 hover:border-blue-600 hover:text-white  font-medium border-gray-100 text-gray-900 px-4 py-3 rounded-md h-fit flex items-center cursor-pointer ${
                IsActive.slice(0, 10) === link.link.slice(0, 10)
                  ? "bg-blue-600 text-white"
                  : ""
              }`}
            >
              {link.name}
            </Link>
          );
        })}
      </div>
      <Outlet />
    </div>
  );
}

export default AdminPannel;
