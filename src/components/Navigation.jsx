import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { AiOutlineUser } from "react-icons/ai";
import { MdMailOutline } from "react-icons/md";
import { GoBell } from "react-icons/go";

import { Sidebar } from "./Sidebar";
import { Link, useLocation } from "react-router-dom";

export const Navigation = () => {
  const location = useLocation();
  const currentScreen = location.pathname;
  const [data, setData] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("userToken"); // Replace with your actual token
      const response = await axios.get("https://jira.shlx.vn/v1/me", {
        headers: {
          Authorization: `Bearer ${token}`,
          // Add other headers if needed
        },
      });
      setData(response.data);
      console.log(response);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  return (
    <nav className="flex items-center justify-between px-5 py-3 bg-white shadow-lg">
      <div className="flex items-center gap-3 pl-20">
        <Sidebar />
        <p>
          {currentScreen === "/testing" && (
            <div className="text-xl text-black">Danh sách học viên</div>
          )}
          {currentScreen === "/course" && (
            <div className="text-xl text-black">Danh sách khoá học</div>
          )}
          {currentScreen === "/datdevice" && (
            <div className="text-xl text-black">Thiết bị DAT</div>
          )}
          {currentScreen === "/trainningcar" && (
            <div className="text-xl text-black">Xe tập lái</div>
          )}
          {currentScreen === "/teacherlist" && (
            <div className="text-xl text-black">Danh sách giáo viên</div>
          )}
        </p>
      </div>
      <a
        className="flex items-center gap-2 px-4 py-2 text-black bg-white rounded-xl space-x-1"
        href=""
      > 
        <GoBell className="text-2xl space-x-1"/>
        <MdMailOutline className="text-2xl"/>
        <AiOutlineUser className="text-2xl" />
        <h1 className="text-lg"> {data.name}</h1>
      </a>
    </nav>
  );
};
