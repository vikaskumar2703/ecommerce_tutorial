import { useState, useEffect } from "react";
import useAuth from "../contexts/authContext";
import axios from "axios";
import { Outlet } from "react-router-dom";
import { Spinner } from "../components/Spinner";

export default function PrivateRoutes() {
  const [ok, setOk] = useState(false);
  const [auth, setAuth] = useAuth();

  useEffect(() => {
    const authCheck = async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_REACT_APP_API}/api/auth/user-auth`
      );

      if (res.data.ok) {
        setOk(true);
      } else {
        setOk(false);
      }
    };
    if (auth?.token) authCheck();
  }, [auth?.token]);
  return ok ? <Outlet /> : <Spinner />;
}
