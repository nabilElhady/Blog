import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLogout } from "../state";

const NavBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.persistedReducer.user);

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-2xl font-bold font-serif">MyBlog</div>
        <div className="flex items-center space-x-4">
          {user == null ? (
            <Link
              to="/Auth"
              className="text-white font-bold font-serif cursor-pointer hover:text-gray-400 transition duration-300 ease-in-out"
            >
              Login
            </Link>
          ) : (
            <Link
              to="/Create-post"
              className="text-white font-bold font-serif cursor-pointer hover:text-gray-400 transition duration-300 ease-in-out"
            >
              Create Post
            </Link>
          )}

          <div className="text-white">/</div>
          {user == null ? (
            <Link
              to="/Auth"
              className="text-white font-bold font-serif cursor-pointer hover:text-gray-400 transition duration-300 ease-in-out"
            >
              Register
            </Link>
          ) : (
            <div
              onClick={() => {
                dispatch(setLogout());
                navigate("/");
              }}
              className="text-white font-bold font-serif cursor-pointer hover:text-gray-400 transition duration-300 ease-in-out"
            >
              log out
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
