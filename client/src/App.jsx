import { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { Header, Footer, Cart } from "./components";
import { getProducts } from "./actions/products";
import { getUserDetails } from "./actions/auth";
import {
  Home,
  AdminPannel,
  Auth,
  ProductDetails,
  CategoryProducts,
} from "./pages";
import { AllProducts, AllUsers, UploadProduct } from "./components";
import { useDispatch } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
function App() {
  return (
    <div className="relative px-3 ">
      <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <ToastContainer />
        <MainContent />
      </Router>
    </div>
  );
}

function MainContent() {
  const location = useLocation();
  const isAuth = location.pathname === "/auth";
  const [isCartOpen, setCartOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const tm = new Date().getTime();
  const tokenExpireTime = 60 * 60 * 8 * 1000;
  const profile = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;
  useEffect(() => {
    const fetchProducts = async () => {
      await dispatch(getProducts());
      setLoading(false);
    };

    fetchProducts();
  }, [dispatch]);

  useEffect(() => {
    if (profile) {
      if (tm - profile?.currentTime > tokenExpireTime) {
        localStorage.removeItem("user");
      }
      dispatch(getUserDetails(profile.data._id));
    }
  }, [dispatch, profile]);

  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = "hidden"; // Disable body scroll
    } else {
      document.body.style.overflow = "auto"; // Enable body scroll
    }

    return () => {
      document.body.style.overflow = "auto"; // Cleanup on unmount
    };
  }, [isCartOpen]);

  return (
    <>
      {!isAuth && <Header setCartOpen={setCartOpen} />}
      {!isAuth && <Cart isCartOpen={isCartOpen} setCartOpen={setCartOpen} />}

      <Routes>
        <Route path="/" element={<Home loading={loading} />} />
        <Route path="/admin" element={<AdminPannel />}>
          <Route path="products" element={<AllProducts />} />
          <Route path="users" element={<AllUsers />} />
          <Route path="upload/:edit?" element={<UploadProduct />} />
        </Route>
        <Route path="/auth" element={<Auth />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/categoryproducts" element={<CategoryProducts />} />
      </Routes>
      {!isAuth && <Footer />}
    </>
  );
}

export default App;
