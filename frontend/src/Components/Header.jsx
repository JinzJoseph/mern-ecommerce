import React from "react";
import { Link } from "react-router-dom";
import { GrSearch } from "react-icons/gr";
import { IoCart } from "react-icons/io5";
import { FaRegCircleUser } from "react-icons/fa6";
const Header = () => {
  return (
    <header className="h-20 shadow-md bg-white fixed w-full z-50">
      <div className="h-full container mx-auto flex items-center px-4 justify-between">
        <div>
          <Link className="text-4xl font-bold">E-shop</Link>
        </div>
        <div className="lg:flex items-center flex justify-between mx-sm-sm border rounded-full focus-within:shadow pl-2">
          <input type="text" placeholder="Search product....." className="" />
          <div className="text-lg min-w-[50px] h-8 bg-black flex items-center justify-center rounded-r-full text-white">
            <GrSearch />
          </div>
        </div>
        <div className=" items-center flex gap-10 ">
          <div className="text-4xl cursor-pointer gap-3">
            <FaRegCircleUser />
          </div>
          <div className="text-4xl cursor-pointer relative">
            <IoCart />
            <div className="bg-black text-white w-5 h-5 rounded-full p-1 flex items-center justify-center absolute -top-2 -right-3">
              <p className="text-sm">0</p>
            </div>
          </div>
        </div>
        <div>
          <button className=" px-3 py-1 rounded-full text-white bg-black hover:bg-slate-600 ">
            Login
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
