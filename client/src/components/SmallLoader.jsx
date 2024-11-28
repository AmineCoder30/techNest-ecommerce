import React from "react";

function SmallLoader() {
  return (
    <div className="w-full bg-indigo-600  py-2 rounded-lg flex justify-center">
      <div className="w-6 h-6 border-4 border-t-white border-b-white rounded-full animate-spin"></div>
    </div>
  );
}

export default SmallLoader;
