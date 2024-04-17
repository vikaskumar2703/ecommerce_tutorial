import Layout from "../components/layout/Layout";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import useAuth from "../contexts/authContext";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(import.meta.env.VITE_REACT_APP_API);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_REACT_APP_API}/api/auth/login`,
        {
          email,
          password,
        }
      );
      if (res && res.data.success) {
        toast.success(res.data.message);
        setAuth({ ...auth, user: res.data.user, token: res.data.token });
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate(location.state || "/");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  return (
    <Layout title="Login">
      <div className="auth-form-container border-black border-2 flex flex-col justify-around p-8 w-1/3 max-h-96">
        <h1 className="text-center font-bold">Login</h1>
        <form
          className="login-form flex flex-col space-y-4"
          onSubmit={handleSubmit}
        >
          <label htmlFor="email">Email</label>
          <input
            className="border"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            id="email"
            name="email"
            placeholder="youremail@gmail.com"
          ></input>
          <label htmlFor="password">Password</label>
          <input
            className="border"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            type="password"
            id="password"
            name="password"
            placeholder="*******"
          ></input>

          <button type="submit" className="border bg-blue-600 text-white">
            Log In
          </button>
        </form>
        <NavLink to="/forgot-password">
          <button className="link-btn mt-4 underline">Forgot Password</button>
        </NavLink>
        <NavLink to="/register">
          <button className="link-btn mt-4 underline">
            Don't have an account ? Register Here
          </button>
        </NavLink>
      </div>{" "}
    </Layout>
  );
}
