import React from "react";

function Loader() {
  return (
    <div className="text-center w-full min-h-screen flex flex-col justify-center items-center">
      {/* <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-blue-500 mx-auto"></div>
       */}
      <div className="w-16 h-16 border-4 border-t-blue-500 border-gray-300 rounded-full animate-spin"></div>
      <h2 className="text-zinc-900 font-medium text-lg mt-4">Loading...</h2>
      <p className="text-zinc-600 dark:text-zinc-400">
        We are fetching the data for you. <br /> Please wait a moment.
      </p>
    </div>
  );
}

export default Loader;
