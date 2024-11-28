import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateUser } from "../actions/auth";
function RolesCard({
  showRolesCard,
  setShowRolesCard,
  userInfo,
  setuserInfo,
  currentRole,
  setCurrentRole,
}) {
  const dispatch = useDispatch();
  const handleRoleChange = (role) => {
    setCurrentRole(role);
  };

  const handleCancel = () => {
    setShowRolesCard(false);
    setuserInfo({});
  };

  const handleSave = () => {
    dispatch(updateUser({ ...userInfo, role: currentRole }));
    setuserInfo({});
    setShowRolesCard(false);
  };

  return (
    <div
      className={`absolute inset-0 z-50 ${
        showRolesCard ? "opacity-100 grid" : "opacity-0 hidden "
      }   place-items-center`}
    >
      <div className="bg-white px-5 py-2 w-80 rounded shadow-lg">
        <h2 className="text-lg text-gray-600  mb-4">Select Role :</h2>

        <div className="flex flex-col gap-2">
          <div
            onClick={() => handleRoleChange("ADMIN")}
            className={`px-4 py-1 rounded cursor-pointer  border-4 bg-gray-100 border-transparent  ${
              currentRole === "ADMIN"
                ? "  border-l-blue-500 text-blue-500 "
                : ""
            }`}
          >
            Admin
          </div>
          <div
            onClick={() => handleRoleChange("GENERAL")}
            className={`px-4 py-1 rounded cursor-pointer  border-4 bg-gray-100 border-transparent  ${
              currentRole === "GENERAL"
                ? "  border-l-blue-500 text-blue-500  "
                : ""
            }`}
          >
            General
          </div>
        </div>
        <div className="mt-4 w-full flex gap-2 justify-end">
          <button
            onClick={handleCancel}
            className=" px-2 py-1 border-2 border-transparent bg-gray-100 text-gray-900 rounded-md"
          >
            Close
          </button>
          <button
            onClick={handleSave}
            className=" px-2 py-1 border-2 border-transparent bg-blue-500 text-white rounded-md"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default RolesCard;
