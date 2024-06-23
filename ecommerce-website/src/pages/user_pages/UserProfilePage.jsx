import { UserMenu } from "../../components/layout/UserMenu";
import Layout from "../../components/layout/Layout";
import useAuth from "../../contexts/authContext";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import axios from "axios";

export default function UserProfilePage() {
  const [auth, setAuth] = useAuth();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [pass, setPass] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    const { email, name, address, phone } = auth?.user;
    setEmail(email);
    setName(name);
    setAddress(address);
    setPhone(phone);
  }, [auth?.user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_REACT_APP_API}/api/auth/update`,
        {
          name,
          email,
          pass,
          phone,
          address,
        }
      );
      if (res.data.success) {
        setAuth({ ...auth, user: res?.data?.user });
        let ls = localStorage.getItem("auth");
        ls = JSON.parse(ls);
        ls.user = res.data.user;
        localStorage.setItem("auth", JSON.stringify(ls));
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  return (
    <Layout title="User Profile">
      <div className="grid grid-cols-4 grid-rows-1 w-full min-h-screen">
        <div className="text-center border">
          <UserMenu />
        </div>
        <div className="col-span-3 text-center p-5 flex flex-col items-center">
          <h1 className="text-4xl m-10 font-bold rounded-md underline">
            User Profile
          </h1>
          <div className="border text-left p-4 space-y-2 text-xl">
            <form
              className="register-form flex flex-col space-y-4"
              onSubmit={handleSubmit}
            >
              <label htmlFor="name">Name</label>
              <input
                value={name}
                className="border"
                onChange={(e) => {
                  setName(e.target.value);
                }}
                id="name"
                name="name"
                placeholder="Full Name"
              ></input>
              <label htmlFor="email">Email</label>
              <input
                value={email}
                className="border"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                id="email"
                name="email"
                placeholder="youremail@gmail.com"
              ></input>
              <label htmlFor="password">Password</label>
              <input
                value={pass}
                className="border"
                onChange={(e) => {
                  setPass(e.target.value);
                }}
                type="password"
                id="password"
                name="password"
                placeholder="*******"
              ></input>
              <label htmlFor="phone">Phone No.</label>
              <input
                value={phone}
                className="border"
                onChange={(e) => {
                  setPhone(e.target.value);
                }}
                id="phone"
                name="phone"
                placeholder="Phone no."
              ></input>
              <label htmlFor="address">Address</label>
              <input
                value={address}
                className="border"
                onChange={(e) => {
                  setAddress(e.target.value);
                }}
                id="address"
                name="address"
                placeholder="Full Address"
              ></input>

              <button type="submit" className="border bg-blue-600 text-white">
                Update Profile
              </button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}
