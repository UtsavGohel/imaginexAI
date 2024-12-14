import { Link } from "react-router-dom";
import { assets } from "../assets/assets";
import { useState } from "react";

const NavBar = () => {
  const [user, setUser] = useState(null);

  return (
    <div className="flex items-center justify-between py-4">
      <Link to="/">
        <img src={assets.logo} alt="" className="w-28 sm:w-32 lg:w-40" />
      </Link>
      <div>
        {user ? (
          <div></div>
        ) : (
          <div>
            <p>Pricing</p>
            <button>Login</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
