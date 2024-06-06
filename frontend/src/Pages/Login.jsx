import React, { useState } from "react";
import { CgProfile } from "react-icons/cg";
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";
const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <section>
      <div className="mx-auto container p-4">
        <div className="bg-white p-4 w-full max-w-sm mx-auto">
          <div className="w-20 h-20 mx-auto justify-center">
            <CgProfile className="text-9xl items-center -ml-2" />
          </div>
          <form className="pt-20 flex flex-col gap-5">
            <div className="grid gap-5">
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
            <div className="grid gap-5">
              <labal>Password*</labal>
              <div className="bg-slate-100 p-2 flex ">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="************"
                  name="password"
                  // value={data.email}
                  // onChange={handleOnChange}
                  className="w-full h-full outline-none bg-transparent"
                />
                <div
                  className="cursor-pointer text-xl "
                  onClick={() => setShowPassword((preve) => !preve)}
                >
                  <span>{showPassword ? <FaEye /> : <FaEyeSlash />}</span>
                </div>
              </div>
              <Link
                to={"/forgot-password"}
                className="block w-fit ml-auto hover:underline hover:text-black"
              >
                Forgot password ?
              </Link>
            </div>
            <button className="bg-black hover:bg-slate-700 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-3">
              Login
            </button>
          </form>
          <p className='my-5'>Don't have account ? <Link to={"/signup"} className=' text-black hover:text-slate-600 hover:underline'>Sign up</Link></p>
        </div>
      
      </div>
    </section>
  );
};

export default Login;
