import React, { useState } from "react";
import Layout from "../../components/Layout";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth";

const Login = () => {
  const [auth, setAuth] = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/v1/auth/login", {
        email,
        password,
      });

      if (res && res.data.success) {
        toast.success(res && res.data.message);
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        //save logged in user to localstorage . sothat after refresh user stay logged in.
        localStorage.setItem("auth", JSON.stringify(res.data));

        navigate(location.state || "/");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something wrong");
    }
  };

  return (
    <Layout title="Register - Ecommer App">
      <div className="form-container " style={{ minHeight: "90vh" }}>
        <form onSubmit={handleSubmit}>
          <h4 className="title">LOGIN FORM</h4>

          <div className="mb-3">
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              autoFocus
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Enter Your Email "
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Enter Your Password"
              required
            />
          </div>
          <div className="mb-3">
            <button type="button" className="btn btn-primary">
              Forgot Password
            </button>
          </div>

          <button type="submit" className="btn btn-primary">
            LOGIN
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Login;
