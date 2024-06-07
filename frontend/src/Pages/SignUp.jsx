import React, { useState } from "react";
import { CgProfile } from "react-icons/cg";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import imageTobase64 from "../Helper/ImgTo64";
import { toast } from "react-toastify";
import axios from "axios";

const SignUp = () => {
  const navigate = useNavigate();
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [image, setImage] = useState("");

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    const imagepic = await imageTobase64(file);
    setImage(imagepic);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      try {
        const res = await axios.post(
          "/api/auth/signup",
          {
            username,
            email,
            password,
            image,
          },
          {
            headers: {
              "content-type": "application/json",
            },
          }
        );
        console.log(res);

        if (res.status === 200) {
          toast.success(res.data.message);
          navigate("/login");
        }
      } catch (error) {
        console.error(error);
        toast.error(error.message);
      }
    } else {
      // Handle password mismatch (e.g., show toast notification)
      toast.error("Passwords do not match");
    }
  };

  return (
    <div className="mx-auto container p-4">
      <div className="bg-white p-5 w-full max-w-sm mx-auto">
        <div className="w-40 h-40 mx-auto relative overflow-hidden rounded-full items-center">
          <div>
            {image ? (
              <img
                src={image}
                alt="profile pic"
                className="w-30 h-40 mx-auto relative overflow-hidden rounded-full items-center"
              />
            ) : (
              <CgProfile className="text-9xl items-center ml-4" />
            )}
          </div>
          <form>
            <label>
              <div className="text-xs bg-opacity-80 bg-slate-200 pb-4 pt-2 cursor-pointer text-center absolute bottom-0 w-full">
                Upload Photo
              </div>
              <input type="file" className="hidden" onChange={handleUpload} />
            </label>
          </form>
        </div>
        <form className="pt-6 flex flex-col gap-2" onSubmit={handleSubmit}>
          <div className="grid">
            <label>Email*</label>
            <div className="bg-slate-100 p-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email"
                name="email"
                id="email"
                className="w-full h-full outline-none bg-transparent"
              />
            </div>
          </div>
          <div className="grid">
            <label>Name*</label>
            <div className="bg-slate-100 p-2">
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                type="text"
                placeholder="Enter name"
                name="name"
                id="name"
                className="w-full h-full outline-none bg-transparent"
              />
            </div>
          </div>
          <div className="grid">
            <label>Password*</label>
            <div className="bg-slate-100 p-2 flex">
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type={showPassword1 ? "text" : "password"}
                placeholder="************"
                name="password"
                id="password"
                className="w-full h-full outline-none bg-transparent"
              />
              <div
                className="cursor-pointer text-xl"
                onClick={() => setShowPassword1((prev) => !prev)}
              >
                {showPassword1 ? <FaEye /> : <FaEyeSlash />}
              </div>
            </div>
          </div>
          <div className="grid">
            <label>Confirm Password*</label>
            <div className="bg-slate-100 p-2 flex">
              <input
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                type={showPassword2 ? "text" : "password"}
                placeholder="************"
                name="confirmPassword"
                id="confirmPassword"
                className="w-full h-full outline-none bg-transparent"
              />
              <div
                className="cursor-pointer text-xl"
                onClick={() => setShowPassword2((prev) => !prev)}
              >
                {showPassword2 ? <FaEye /> : <FaEyeSlash />}
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="bg-black hover:bg-slate-700 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-3"
          >
            Signup
          </button>
        </form>
        <p className="my-5">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-black hover:text-slate-600 hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
