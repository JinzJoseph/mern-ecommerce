import React from "react";
import { FaRegCircleUser } from "react-icons/fa6";
import { useSelector } from "react-redux";
import {Link, Outlet} from "react-router-dom"
const AdminPanel = () => {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className="min-h-[calc(100vh-120px)] md:flex hidden">
      <div className="bg-white min-h-full w-full max-w-80 customShadow">
        <div className=" h-32 flex justify-center items-center flex-col mb-10">
          <div className="text-5xl cursor-pointer relative flex justify-center mt-14">
            {currentUser ? (
              <img
                src={currentUser.profilePic}
                alt="profilepic"
                className=" w-18 h-18 rounded-full p-14"
              />
            ) : (
              <FaRegCircleUser />
            )}
          </div>
          <p className="capitalize text-lg font-bold">{currentUser.username}</p>
          <p className="capitalize text-lg font-bold">
            {currentUser.isAdmin ? "Admin" : ""}
          </p>
        </div>
        
          <div className="grid py-20 mx-8 px-10  justify-center gap-1 ">
            <Link to={"/admin/all-users"} className="px-2 py-2 hover:bg-slate-100">All Users</Link>
            <Link to={"/admin/all-products"} className="px-2 py-2 hover:bg-slate-100">All Products</Link>
          </div>
        
      </div>
      <main className='w-full h-full p-2'>
            <Outlet/>
        </main>
    </div>
  );
};

export default AdminPanel;
