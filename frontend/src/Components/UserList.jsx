import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import moment from "moment";
import axios from "axios";
import { MdModeEdit } from "react-icons/md";
import EditProfile from "./EditProfile";

const UserList = () => {
  const [data, setData] = useState([]);
  const [openUpdateRole, setOpenUpdateRole] = useState(false);
  const [updateUserDetails, setUpdateUserDetails] = useState({
    email: "",
    username: "",
    role: "",
    _id: "",
  });

  const getUserList = async () => {
    try {
      const response = await axios.get("/api/user/getallusers");
      setData(response.data.data);
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getUserList();
  }, []);

  return (
    <div>
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold underline">User List</h1>
      </div>
      <div className="mt-10 ml-5">
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  SR
                </th>
                <th scope="col" className="px-6 py-3">
                  Username
                </th>
                <th scope="col" className="px-6 py-3">
                  Email
                </th>
                <th scope="col" className="px-6 py-3">
                  Role
                </th>
                <th scope="col" className="px-6 py-3">
                  Created Date
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr
                  key={index}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <td className="px-6 py-4">{index + 1}</td>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {item.username}
                  </th>
                  <td className="px-6 py-4">{item.email}</td>
                  <td className="px-6 py-4">
                    {item.isAdmin ? "Admin" : "User"}
                  </td>
                  <td className="px-6 py-4">
                    {moment(item.createdAt).format("LL")}
                  </td>
                  <td className="px-6 py-4">
                    <button
                      className=" bg-green-500 p-2 rounded-full cursor-pointer hover:bg-red-300 text-white"
                      onClick={() => {
                        setOpenUpdateRole(true);
                        setUpdateUserDetails(item);
                      }}
                    >
                      <MdModeEdit />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {
            openUpdateRole && (
              <EditProfile 
              onClose={()=>setOpenUpdateRole(false)} 
              username={updateUserDetails.username}
              email={updateUserDetails.email}
              role={updateUserDetails.role}
              userId={updateUserDetails._id}
              callFunc={getUserList}
              
              
              />
            )
          }
        </div>
      </div>
    </div>
  );
};

export default UserList;
