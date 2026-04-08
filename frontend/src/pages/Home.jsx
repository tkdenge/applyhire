import { Link, Links } from "react-router-dom";
import logo from "../../public/Artboard 1.svg"
import "../pages/Home.css"
import bg from "../../public/bg.svg"

const Home = () => {
  return (
      <div className="homepage">
        <div className="text-container">
          <div>
            <a href="/">
              <img src={logo} alt="" />
            </a>
          </div>

          <h1>Think, plan and track all in one place</h1>

          <p>Track and manage your applications easily.</p>
        
          <div>
            <Link to="/login">
              <button className="btn-login">Login</button>
            </Link>
            <Link to="/signup">
            <button className="btn-signup">Sign up</button>
            </Link>
          </div>
        </div>
        
        <div className="image-container">
          <img src={bg} alt="Career illustration" />
        </div>
      </div>
  );
}

export default Home;