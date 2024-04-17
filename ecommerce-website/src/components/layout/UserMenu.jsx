import { NavLink } from "react-router-dom";

export const UserMenu = () => {
  return (
    <div>
      <h1 className="m-10 font-bold rounded-md p-5 bg-[#0E7490] text-white">
        User Panel
      </h1>
      <div className="user-links flex flex-col m-10">
        <NavLink
          className="p-3 border border-collapse font-semibold  hover:bg-gray-300 "
          to="/dashboard/user/profile"
        >
          Profile
        </NavLink>
        <NavLink
          className="p-3 border border-collapse font-semibold hover:bg-gray-300"
          to="/dashboard/user/orders"
        >
          Orders
        </NavLink>
      </div>
    </div>
  );
};
