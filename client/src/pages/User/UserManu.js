import React from "react";
import { NavLink } from "react-router-dom";

const UserManu = () => {
  return (
    <>
      <div className="text-center p-2 mb-2 bg-info ">
        <div className="list-group text-start dashboard-menu ">
          <h4 className="text-center text-white"> User Dashboard</h4>
          <NavLink
            to="/dashboard/user/profile"
            className="list-group-item list-group-item-action "
          >
            Profile
          </NavLink>
          <NavLink
            to="/dashboard/user/orders"
            className="list-group-item list-group-item-action"
          >
            Orders
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default UserManu;
