import React from "react";
import { IoMdImages } from "react-icons/io";
function UploadImages({ onChange }) {
  return (
    <div className="w-full mx-auto rounded-lg overflow-hidden ">
      <div className="md:flex">
        <div className="w-full ">
          <div className="relative h-48 rounded-lg border-2 border-dashed border-blue-500 bg-gray-50 flex justify-center items-center shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
            <div className="absolute flex flex-col items-center">
              <IoMdImages size={40} color="#718096" className="mb-3" />
              <span className="block text-gray-500 font-semibold">
                Drag &amp; drop your files here
              </span>
              <span className="block text-gray-400 font-normal mt-1">
                or click to upload
              </span>
            </div>

            <input
              onChange={onChange}
              multiple
              name=""
              className="h-full w-full opacity-0 cursor-pointer"
              type="file"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default UploadImages;
