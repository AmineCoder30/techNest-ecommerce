import React, { useState } from "react";
import UploadImages from "./UploadImages";
import * as actionTypes from "../constants/ActionsType";
import { useDispatch, useSelector } from "react-redux";
import { addProduct, updateProduct } from "../actions/products";
import { categories } from "../constants/categoriesList";
import { useParams } from "react-router-dom";
import SmallLoader from "./SmallLoader";
function UploadProduct() {
  const dispatch = useDispatch();
  const { productDetails } = useSelector((state) => state.products);
  const { authData } = useSelector((state) => state.auth);
  const { edit } = useParams();
  const [loading, setloading] = useState(false);
  const initilizeForm = {
    productName: "",
    brandName: "",
    description: "",
    price: "",
    sellingPrice: "",
    category: "",
    productImage: [],
  };

  const [formState, setFormState] = useState(
    edit ? productDetails : initilizeForm
  );
  const [images, setImages] = useState([]);

  const handleInputChange = (e) => {
    console.log(edit);
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages((prevImages) => [
      ...prevImages,
      ...files.map((file) => URL.createObjectURL(file)),
    ]);
    setFormState((prevState) => ({
      ...prevState,
      productImage: [...prevState.productImage, ...files],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setloading(true);
    console.log({ ...formState, userId: authData?.data?._id });
    edit
      ? dispatch(updateProduct({ ...formState, userId: authData?.data?._id }))
      : dispatch(addProduct(formState));
    setFormState(initilizeForm);
    setloading(false);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Upload New Product</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700">Product Name</label>
          <input
            type="text"
            name="productName"
            value={formState.productName}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Brand Name</label>
          <input
            type="text"
            name="brandName"
            value={formState.brandName}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Description</label>
          <textarea
            name="description"
            value={formState.description}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Price</label>
          <input
            type="number"
            name="price"
            value={formState.price}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Selling Price</label>
          <input
            type="number"
            name="sellingPrice"
            value={formState.sellingPrice}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Category</label>

          <select
            name="category"
            value={formState.category}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-2 border rounded-md"
          >
            {categories.map((category) => (
              <option key={category.id} value={category.value}>
                {category.label}
              </option>
            ))}
          </select>
        </div>
        <UploadImages onChange={handleImageChange} />

        <div className="flex gap-1 mt-4">
          {edit &&
            productDetails?.productImage?.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`product image ${index}`}
                className="w-16 h-16 shadow-sm shadow-blue-200 object-cover rounded-md"
              />
            ))}
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`product image ${index}`}
              className="w-16 h-16 shadow-sm shadow-blue-200 object-cover rounded-md"
            />
          ))}
        </div>
        {loading ? (
          <SmallLoader />
        ) : (
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Upload Product
          </button>
        )}
      </form>
    </div>
  );
}

export default UploadProduct;
