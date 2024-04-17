import { NavLink } from "react-router-dom";

export const AdminMenu = () => {
  return (
    <div>
      <h1 className="m-10 font-bold rounded-md p-5 bg-[#0E7490] text-white">
        <NavLink to="/dashboard/admin">Admin Panel</NavLink>
      </h1>
      <div className="admin-links flex flex-col m-10">
        <NavLink
          className="p-3 border border-collapse font-semibold  hover:bg-gray-300 "
          to="/dashboard/admin/create-category"
        >
          Create Category
        </NavLink>
        <NavLink
          className="p-3 border border-collapse font-semibold hover:bg-gray-300"
          to="/dashboard/admin/create-products"
        >
          Create Products
        </NavLink>
        <NavLink
          className="p-3 border border-collapse font-semibold hover:bg-gray-300"
          to="/dashboard/admin/products"
        >
          Products
        </NavLink>
        <NavLink
          className="p-3 border border-collapse font-semibold hover:bg-gray-300"
          to="/dashboard/admin/orders"
        >
          Orders
        </NavLink>
      </div>
    </div>
  );
};
