import { useState } from "react";
import { signupUser } from "../utils/api";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../../public/Artboard 1.svg"
import "./Signup.css";

const Signup = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  useEffect(() => {

    const token = localStorage.getItem("token");

    if(token) navigate("/dashboard");
  }, [navigate])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await signupUser(form);
      localStorage.setItem("token", data.token);
      navigate("/dashboard");
    } catch (err) {
      console.log(err);
      alert(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-card">
        <div>
          <a href="/">
            <img src={logo} width="150px" alt="" />
          </a>
        </div>
        <h2>Sign up</h2>
        <form onSubmit={handleSubmit} className="signup-form">
          <label for="name">First name</label>
          <input name="name" type="name" placeholder="Enter your first name" id="name" onChange={handleChange} required />
          <label for="email">Email</label>
          <input name="email" type="email" id="email" placeholder="Enter your email" onChange={handleChange} required />
          <label for="password">Password</label>
          <input name="password" type="password" id="password" placeholder="Enter your password" onChange={handleChange} required />
          <button type="submit">Sign up</button>
        </form>

        <div className="signup-footer">
          <p>Already have an account? <Link to="/login">Login</Link> </p>
        </div>  
      </div>
    </div>
  );
};

export default Signup;