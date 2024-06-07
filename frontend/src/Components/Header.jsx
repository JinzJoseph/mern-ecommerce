import React, { useState } from "react";
import { Link } from "react-router-dom";
import { GrSearch } from "react-icons/gr";
import { IoCart } from "react-icons/io5";
import { FaRegCircleUser } from "react-icons/fa6";
import { useSelector, useDispatch } from "react-redux";
import { signoutSuccess } from "../redux/User/UserSlice";
import axios from "axios"; // Add this import

const Header = () => {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [menuOpen, SetMenuOpen] = useState(false);
  const handleLogout = async () => {
    try {
      const res = await axios.post(
        "/api/auth/signout",
        {},
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (res.status === 200) {
        dispatch(signoutSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <header className="h-20 shadow-md bg-white fixed w-full z-50">
      <div className="h-full container mx-auto flex items-center px-4 justify-between">
        <div>
          <Link to="/" className="text-4xl font-bold">
            E-shop
          </Link>
        </div>
        <div className="lg:flex items-center flex justify-between mx-sm-sm border rounded-full focus-within:shadow pl-2">
          <input type="text" placeholder="Search product....." className="" />
          <div className="text-lg min-w-[50px] h-8 bg-black flex items-center justify-center rounded-r-full text-white">
            <GrSearch />
          </div>
        </div>
        <div className="items-center flex gap-10">
          <div className="text-4xl cursor-pointer gap-3 relative">
            {currentUser ? (
              <img
                src={currentUser.profilePic}
                alt="profilepic"
                className=" w-10 h-10 rounded-full overflow-hidden items-center"
                onClick={() => SetMenuOpen(!menuOpen)}
              />
            ) : (
              <FaRegCircleUser />
            )}
            {menuOpen && (
              <div className="absolute bg-white bottom-0 top-11 h-fit p-2 shadow-lg rounded">
                <nav>
                  {currentUser?.isAdmin ===true && (
                    <Link
                      to={"/admin"}
                      className="whitespace-nowrap hidden md:block hover:bg-slate-100 p-2 text-2xl"
                      onClick={() => SetMenuOpen(!menuOpen)}
                    >
                      Admin Panel
                    </Link>
                  )}
                </nav>
              </div>
            )}
          </div>
          <div className="text-4xl cursor-pointer relative">
            <IoCart />
            <div className="bg-black text-white w-5 h-5 rounded-full p-1 flex items-center justify-center absolute -top-2 -right-3">
              <p className="text-sm">0</p>
            </div>
          </div>
        </div>
        <div>
          {currentUser ? (
            <>
              <Link
                onClick={handleLogout}
                className="px-3 py-1 rounded-full items-center text-white bg-black hover:bg-slate-600"
              >
                Logout
              </Link>
            </>
          ) : (
            <Link
              to="/login"
              className="px-3 py-1 rounded-full items-center text-white bg-black hover:bg-slate-600"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
