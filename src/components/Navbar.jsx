import { AiOutlineSearch } from "react-icons/ai";
import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="fixed top-0 left-0 w-full bg-gray-900/50 z-50 backdrop-blur-md">
      <div className="text-2xl p-5 flex justify-between text-white">
        {/* left */}
        <nav className="flex items-center gap-11">
          <Link to="/">MovieDoc</Link>
          <Link to="/detail">Movies</Link>
          <Link to="/explore">TV Shows</Link>
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
