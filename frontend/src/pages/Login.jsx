import { useState } from "react";
import API from "../services/api";

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginUser = async (e) => {

    e.preventDefault();

    const res = await API.post("/auth/login", {
      email,
      password
    });

    localStorage.setItem("token", res.data.token);

    window.location.href = "/dashboard";

  };

  return (

    <div>

      <h2>Login</h2>

      <form onSubmit={loginUser}>

        <input
          placeholder="Email"
          onChange={(e)=>setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e)=>setPassword(e.target.value)}
        />

        <button>Login</button>
        <p>
          Don't have an account? 
          <a href="/register"> Register</a>
        </p>

      </form>

    </div>

  );
}

export default Login;