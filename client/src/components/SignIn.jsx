import React, { useState } from "react";
import logo from "../assets/logo.svg";
import { useDispatch } from "react-redux";
import { signin } from "../actions/auth";
import { useNavigate } from "react-router-dom";
import SmallLoader from "./SmallLoader";
function SignIn({ setIsSignIn }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // State to store form data
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [laoding, setlaoding] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Dispatch the signin action with form data
    setlaoding(true);
    await dispatch(signin(formData, navigate));
    setlaoding(false);
    // Optionally reset the form or handle success/error
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="bg-white w-full max-w-md p-8 rounded-lg shadow-md">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <div className="">
            {/* Replace with actual logo if available */}
            <img src={logo} alt="Logo" className=" w-52" />
          </div>
        </div>

        {/* Title and Description */}
        <h2 className="text-2xl font-semibold text-center text-gray-800">
          Welcome Back
        </h2>
        <p className="text-center text-gray-500 text-sm mt-2 mb-8">
          "Explore top-quality laptops, electronics, and watches at unbeatable
          prices. Shop securely and enjoy reliable customer support for a
          seamless experience!"
        </p>

        {/* Form Fields */}
        <form onSubmit={handleSubmit}>
          {/* Email Field */}
          <label className="block mb-2 text-sm text-gray-600">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email address"
            className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:border-indigo-500"
          />

          {/* Password Field */}
          <label className="block mb-2 text-sm text-gray-600">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password (min. 8 characters)"
            className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:border-indigo-500"
          />

          {/* Submit Button */}
          {laoding ? (
            <SmallLoader />
          ) : (
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white font-semibold py-2 rounded-lg hover:bg-indigo-700 transition"
            >
              Sign in
            </button>
          )}
        </form>

        {/* Login Link */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Don't have an account?{" "}
          <span
            className="text-indigo-600 cursor-pointer"
            onClick={() => setIsSignIn(false)}
          >
            SignUp now
          </span>
        </p>
      </div>
    </div>
  );
}

export default SignIn;
