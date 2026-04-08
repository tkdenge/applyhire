import { useEffect, useState } from "react";
import { loginUser } from "../utils/api";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import logo from "../../public/Artboard 1.svg"
import './Login.css';

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if(token) navigate("/dashboard");

  }, [navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await loginUser(form);
      localStorage.setItem("token", data.token);
      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div>
          <a href="/">
            <img src={logo} alt="" />
          </a>
        </div>
        <h2>Login</h2>

        <form onSubmit={handleSubmit} className="login-form">
          <label htmlFor="email">Email</label>
          <input name="email" type="email" id="email" placeholder="Enter your email" onChange={handleChange} required />
          <label htmlFor="password">Password</label>
          <input name="password" type="password" id="password" placeholder="Enter your password" onChange={handleChange} required />
          <button type="submit">Login</button>
        </form>

        <div className="login-footer">
          <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
        </div>  
      </div>
    </div>
  );
};

export default Login;