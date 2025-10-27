import { AiOutlineSearch } from "react-icons/ai";
import React from "react";
import { Link, NavLink } from "react-router-dom";
import { Navigation } from "../components/Navigation";
const Navbar = () => {
  return (
    <div className="fixed top-0 left-0 w-full z-50">
      <div className="text-2xl p-5 flex items-center justify-between text-white">
        {/* left */}

        <nav className="flex items-center justify-center gap-8">
        <Link to="/">MovieDoc</Link>
          {Navigation.map((nav) => {
            return (
              <NavLink
                key={nav.href}
                to={nav.href}
                className="text-white hover:text-red-300 flex items-center gap-1"
              >
                {nav.label}
              </NavLink>
            );
          })}
        </nav>

        {/* right */}
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Search movies..."
            className="bg-transparent px-4 py-1 outline-none border-none hidden lg:block text-white"
          />
          <button className="bg-violet-500 hover:bg-violet-600 px-4 py-1 rounded-r-md flex items-center justify-center">
            <AiOutlineSearch className="text-white text-xl" />
          </button>
          <button className="bg-violet-500 hover:bg-violet-600 px-4 py-1 rounded-r-md flex items-center justify-center">
            <p className="text-sm">Login</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
