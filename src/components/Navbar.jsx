import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link,useLocation } from "react-router-dom";
import { FaRegUserCircle } from "react-icons/fa";
import { RxHamburgerMenu } from "react-icons/rx";
import { useStateContext } from "../contexts/ContextProvider";
const Navbar = () => {
  const location = useLocation();
  const currentScreen = location.pathname;
  const { activeMenu,setActiveMenu } = useStateContext();
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
    <nav className="bg-blue-800 p-4 w-full ">
      <div className=" mx-auto flex items-center justify-between">
        <button 
          onClick={()=> setActiveMenu((prevActiveMenu)=>!prevActiveMenu)}
          className="text-white ml-0 p-2">
          <RxHamburgerMenu className="w-6 h-6" />
        </button>
        <div> 
          {currentScreen === "/testing" && <div className="text-2xl text-white">Danh sách học viên</div>}
          {currentScreen === "/course" && <div className="text-2xl text-white">Danh sách khoá học</div>}
        </div>
        <div  className="text-white text-2xl ml-auto flex flex-row">
          <Link to="/userprofile">
            {data.name}
          </Link>
        </div>
        <FaRegUserCircle className="mr-2 ml-2 text-2xl text-white"/>
      </div>
    </nav>
  );
};

export default Navbar;
