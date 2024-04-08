import Layout from "../components/layout/Layout";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [answer, setAnswer] = useState("");

  const [newPassword, setNewPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:8000/api/auth/forgot-password",
        {
          email,
          answer,
          newPassword,
        }
      );
      if (res && res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error("Wrong Email or Answer");
    }
  };
  return (
    <Layout title="Forgot Password">
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
          <label htmlFor="answer">What is your favourite sport?</label>
          <input
            className="border"
            value={answer}
            onChange={(e) => {
              setAnswer(e.target.value);
            }}
            id="answer"
            name="answer"
            placeholder="Your favourite sport"
          ></input>
          <label htmlFor="newPassword"> New Password</label>
          <input
            className="border"
            value={newPassword}
            onChange={(e) => {
              setNewPassword(e.target.value);
            }}
            type="password"
            id="newPassword"
            name="newPassword"
            placeholder="*******"
          ></input>

          <button type="submit" className="border bg-blue-600 text-white">
            Reset Password
          </button>
        </form>
      </div>
    </Layout>
  );
}
