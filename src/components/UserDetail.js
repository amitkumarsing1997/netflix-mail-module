import React from "react";
import {useSelector } from "react-redux";

const UserDetail = () => {
  const { full_name, email, mob_no } = useSelector((store) => store.user);
  console.log(mob_no);
  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-2">User Details</h2>
      <div>
        <p>
          <span className="font-semibold">Full Name:</span>
        </p>
        <p>{full_name}</p>
        <p>
          <span className="font-semibold">Email:</span> {email}
        </p>
        <p>
          <span className="font-semibold">Mobile Number:</span> {mob_no}
        </p>
      </div>
    </div>
  );
};

export default UserDetail;
