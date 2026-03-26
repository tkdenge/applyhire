import { useState } from "react";
import API from "../services/api";

function Register() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const registerUser = async (e) => {
    e.preventDefault();

    await API.post("/auth/register", {
      name,
      email,
      password
    });

    alert("User registered. Please login.");
  };

  return (
    <div>

      <h2>Register</h2>

      <form onSubmit={registerUser}>

        <input
          placeholder="Name"
          onChange={(e)=>setName(e.target.value)}
        />

        <input
          placeholder="Email"
          onChange={(e)=>setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e)=>setPassword(e.target.value)}
        />

        <button>Register</button>
        <p>
          Already have an account? 
          <a href="/"> Login</a>
        </p>


      </form>

    </div>
  );
}

export default Register;