import Layout from "../components/layout/Layout";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [answer, setAnswer] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8000/api/auth/register", {
        name,
        email,
        pass,
        phone,
        address,
        answer,
      });
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  return (
    <Layout title="Register">
      <div className="auth-form-container border-black border-2 flex flex-col justify-around p-8 w-1/3 ">
        <h1 className="text-center font-bold">Register</h1>
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
          <label htmlFor="answer">What is your favourite sport? </label>
          <input
            value={answer}
            className="border"
            onChange={(e) => {
              setAnswer(e.target.value);
            }}
            id="answer"
            name="answer"
            placeholder="mention your favourite sport"
          ></input>
          <button type="submit" className="border bg-blue-600 text-white">
            Register
          </button>
        </form>
        <NavLink to="/login">
          <button className="link-btn underline">
            Already have an account? Login Here
          </button>
        </NavLink>
      </div>
    </Layout>
  );
}
