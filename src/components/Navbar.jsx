import { AiOutlineSearch } from "react-icons/ai";
import React, { useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { Navigation } from "../components/Navigation";

const Navbar = () => {
  const location = useLocation();
  const removeSpace = location?.search?.slice(3)?.split("%20")?.join(" ");
  const [searchInput, setSearchInput] = useState(removeSpace || "");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchInput.trim() !== "") {
      navigate(`/search?q=${searchInput}`);
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full z-50">
      <div className="text-2xl p-5 flex items-center justify-between text-white">
        {/* left */}
        <nav className="flex items-center justify-center gap-8">
          <Link to="/">MovieDoc</Link>
          {Navigation.map((nav) => (
            <NavLink
              key={nav.href}
              to={nav.href}
              className="text-white hover:text-red-300 flex items-center gap-1"
            >
              {nav.label}
            </NavLink>
          ))}
        </nav>

        {/* right */}
        <div className="flex items-center justify-center gap-2">
          <form className="relative w-64" onSubmit={handleSubmit}>
            <input
              type="text"
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search movies..."
              value={searchInput}
              className="w-full bg-gray-800 text-white px-4 py-2 rounded-xl outline-none pr-12"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-violet-500 hover:bg-violet-600 p-2 rounded-md flex items-center justify-center"
            >
              <AiOutlineSearch className="text-white text-xl" />
            </button>
          </form>
          <button className="bg-violet-500 hover:bg-violet-600 px-4 py-1 rounded-r-md flex items-center justify-center">
            <p className="text-sm">Login</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
