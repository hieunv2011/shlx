import React, { useState, useEffect } from "react";
import axios from "axios";
import { Navbar } from "../components";
const TeacherList = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const token = localStorage.getItem("userToken"); // Replace with your actual token
      const response = await axios.get(`https://jira.shlx.vn/v1/instructors`, {
        headers: {
          Authorization: `Bearer ${token}`,
          // Add other headers if needed
        },
      });
      setData(response.data.items);
      console.log(response);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  return (
    <div>
      <Navbar />
    </div>
  );
};

export default TeacherList;
