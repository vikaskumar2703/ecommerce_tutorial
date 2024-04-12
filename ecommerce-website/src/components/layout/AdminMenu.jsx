import { NavLink } from "react-router-dom";

export const AdminMenu = () => {
  return (
    <div>
      <h1 className="m-10 font-bold rounded-md p-5 bg-[#0E7490] text-white">
        Admin Panel
      </h1>
      <div className="admin-links flex flex-col m-10">
        <NavLink
          className="p-3 border border-collapse font-semibold  hover:bg-gray-300 "
          to="create-category"
        >
          Create Category
        </NavLink>
        <NavLink
          className="p-3 border border-collapse font-semibold hover:bg-gray-300"
          to="create-products"
        >
          Create Products
        </NavLink>
        <NavLink
          className="p-3 border border-collapse font-semibold hover:bg-gray-300"
          to="products"
        >
          Products
        </NavLink>
        <NavLink
          className="p-3 border border-collapse font-semibold hover:bg-gray-300"
          to="orders"
        >
          Orders
        </NavLink>
      </div>
    </div>
  );
};
