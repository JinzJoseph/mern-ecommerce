import React, { useState } from "react";
import { CgProfile } from "react-icons/cg";
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";
const SignUp = () => {
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  return (
    <div className="mx-auto container p-4">
      <div className="bg-white p-5 w-full max-w-sm mx-auto">
        <div className="w-40 h-40 mx-auto relative overflow-hidden rounded-full items-center">
          <div>{<CgProfile className="text-9xl items-center ml-4" />}</div>
          <form>
            <label>
              <div className="text-xs bg-opacity-80 bg-slate-200 pb-4 pt-2 cursor-pointer text-center absolute bottom-0 w-full">
                Upload Photo
              </div>
              <input type="file" className="hidden" />
            </label>
          </form>
        </div>
        <form className="pt-6 flex flex-col gap-2 ">
          <div className="grid ">
            <labal>Email*</labal>
            <div className="bg-slate-100 p-2">
              <input
                type="email"
                placeholder="enter email"
                name="email"
                // value={data.email}
                // onChange={handleOnChange}
                className="w-full h-full outline-none bg-transparent"
              />
            </div>
          </div>
          <div className="grid ">
            <labal>Name*</labal>
            <div className="bg-slate-100 p-2">
              <input
                type="text"
                placeholder="Enter Name.."
                name="name"
                // value={data.email}
                // onChange={handleOnChange}
                className="w-full h-full outline-none bg-transparent"
              />
            </div>
          </div>
          <div className="grid ">
            <labal>Password*</labal>
            <div className="bg-slate-100 p-2 flex ">
                <input
                  type={showPassword1 ? "text" : "password"}
                  placeholder="************"
                  name="password"
                  // value={data.email}
                  // onChange={handleOnChange}
                  className="w-full h-full outline-none bg-transparent"
                />
                <div
                  className="cursor-pointer text-xl "
                  onClick={() => setShowPassword1((preve) => !preve)}
                >
                  <span>{showPassword1? <FaEye /> : <FaEyeSlash />}</span>
                </div>
              </div>
          </div>
          <div className="grid ">
            <labal> Confirm Password*</labal>
            <div className="bg-slate-100 p-2 flex ">
                <input
                  type={showPassword2 ? "text" : "password"}
                  placeholder="************"
                  name="password"
                  // value={data.email}
                  // onChange={handleOnChange}
                  className="w-full h-full outline-none bg-transparent"
                />
                <div
                  className="cursor-pointer text-xl "
                  onClick={() => setShowPassword2((preve) => !preve)}
                >
                  <span>{showPassword2 ? <FaEye /> : <FaEyeSlash />}</span>
                </div>
              </div>
          </div>
          <button className="bg-black hover:bg-slate-700 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-3">
              Signup
            </button>
        </form>
        <p className='my-5'>Already have account ? <Link to={"/login"} className=' text-black hover:text-slate-600 hover:underline'>Login</Link></p>
      </div>
    </div>
  );
};

export default SignUp;
