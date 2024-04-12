import { NavLink } from "react-router-dom";
import useAuth from "../../contexts/authContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import { Dropdown } from "flowbite-react";

export default function Header() {
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    setAuth({ ...auth, user: null, token: "" });
    localStorage.removeItem("auth");
    toast.success("Logout Successfully");
    navigate("/");
  };
  return (
    <header className="w-screen flex justify-around py-7 bg-slate-300 drop-shadow-md">
      <div className="border-black border">logo</div>
      <div className="search-box">
        <input
          type="text"
          className="rounded-2xl px-2 w-80 py-2"
          placeholder="Search"
          // onChange={(e) => setSearch(e.target.value)}
        />
        <button type="submit" />
      </div>
      <div className="navlinks">
        <ul className="flex space-x-10 items-center">
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/cart">Cart</NavLink>
          </li>
          <li>
            <NavLink to="/about">About</NavLink>
          </li>
          {!auth.user ? (
            <>
              <li>
                <NavLink to="/login">Login</NavLink>
              </li>
              <li>
                <NavLink to="/register">Register</NavLink>
              </li>
            </>
          ) : (
            <div className="">
              <Dropdown label={auth?.user?.name} dismissOnClick={false}>
                <Dropdown.Item>
                  <NavLink
                    to={`/dashboard/${
                      auth?.user?.role === 1 ? "admin" : "user"
                    }`}
                  >
                    Dashboard
                  </NavLink>
                </Dropdown.Item>
                <Dropdown.Item>
                  <NavLink onClick={handleLogout} to="/login">
                    Logout
                  </NavLink>
                </Dropdown.Item>
              </Dropdown>
            </div>
          )}
        </ul>
      </div>
    </header>
  );
}

// add search functionality or atleast get a understanding
