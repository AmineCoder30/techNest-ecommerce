import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../actions/auth";
import RolesCard from "./RolesCard";
function AllUsers() {
  const dispatch = useDispatch();
  const [showRolesCard, setShowRolesCard] = useState(false);
  const [userInfo, setuserInfo] = useState({});
  const [currentRole, setCurrentRole] = useState("GENERAL");
  const { users } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const handleEditRole = (user) => {
    setShowRolesCard(true);
    setuserInfo(user);
    setCurrentRole(user.role);
    console.log(user);
  };

  return (
    <div className="flex justify-center px-3 mt-4 relative items-center border border-gray-200 rounded-lg container mx-auto ">
      <RolesCard
        showRolesCard={showRolesCard}
        setShowRolesCard={setShowRolesCard}
        userInfo={userInfo}
        setuserInfo={setuserInfo}
        currentRole={currentRole}
        setCurrentRole={setCurrentRole}
      />
      <ul className="w-full ">
        {users?.data?.map((member, index) => (
          <li
            key={member._id}
            className="flex justify-between last:border-none items-center py-4 border-b border-gray-200"
          >
            <div className="flex items-center">
              <img
                src={member.profilePic}
                alt={`Profile picture of ${member.username}`}
                className="w-10 h-10 rounded-full mr-3"
              />
              <div>
                <div className="flex items-center">
                  <span className="text-sm font-semibold">
                    {member.username}
                  </span>
                </div>
                <p className="text-sm text-gray-500">{member.email}</p>
              </div>
            </div>

            <button
              onClick={() => handleEditRole(member)}
              className="text-blue-600 font-medium"
            >
              Edit
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AllUsers;

//end{code}
