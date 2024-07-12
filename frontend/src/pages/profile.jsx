import React from "react";
import { useSelector } from "react-redux";

function Profile() {
  const { user } = useSelector((state) => state.user);
0
  
  // console.log(user);
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Profile Details</h2>
        <ul className="divide-y divide-gray-200">
          <li className="py-3">
            <span className="font-medium">Name:</span> {user?.name}
          </li>
          <li className="py-3">
            <span className="font-medium">Email:</span> {user?.email}
          </li>
          {user?.speciality && (
            <li className="py-3">
              <span className="font-medium">Speciality:</span>{" "}
              {user?.speciality}
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Profile;
