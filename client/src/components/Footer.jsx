import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaGithub } from "react-icons/fa";
import logo from "../assets/logo.svg";
function Footer() {
  return (
    <footer className="bg-gray-50/40 text-gray-800 py-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-sm">
          {/* Column 1 */}
          <div>
            <h3 className="text-black-900 font-semibold mb-3">Company</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-gray-900">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-900">
                  Features
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-900">
                  Works
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-900">
                  Career
                </a>
              </li>
            </ul>
          </div>

          {/* Column 2 */}
          <div>
            <h3 className="text-black-900 font-semibold mb-3">Help</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-gray-900">
                  Customer Support
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-900">
                  Delivery Details
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-900">
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-900">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h3 className="text-black-900 font-semibold mb-3">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-gray-900">
                  Free eBooks
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-900">
                  Development Tutorial
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-900">
                  How to - Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-900">
                  YouTube Playlist
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4 */}
          <div>
            <h3 className="text-black-900 font-semibold mb-3">Extra Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-gray-900">
                  Customer Support
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-900">
                  Delivery Details
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-900">
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-900">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 my-8"></div>

        {/* Footer Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between text-sm">
          {/* Logo and Copyright */}
          <div className="flex items-center mb-4 md:mb-0">
            <img
              src={logo} // Replace with actual logo URL
              alt="Logo"
              className=" w-40 mr-2"
            />
          </div>
          <p className="text-black-900 text-center md:text-left">
            © Copyright 2021, All Rights Reserved by TechNest
          </p>

          {/* Social Icons */}
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="text-black-900 hover:text-gray-900">
              <FaFacebookF />
            </a>
            <a href="#" className="text-black-900 hover:text-gray-900">
              <FaTwitter />
            </a>
            <a href="#" className="text-black-900 hover:text-gray-900">
              <FaInstagram />
            </a>
            <a href="#" className="text-black-900 hover:text-gray-900">
              <FaGithub />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
