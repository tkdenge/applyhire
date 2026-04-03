import { Link, Links } from "react-router-dom";

const Home = () => {
  return (
    <>
      <div>
         <h1>ApplyHire</h1>
         <p>Track and manage your applications easily.</p>

         <Link to="/login">Login</Link>
         <Link to="/signup">Signup</Link>


      </div>
    </>
  );
}

export default Home;