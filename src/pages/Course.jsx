import React, { useState, useEffect } from "react";
import axios from "axios";
import { Navbar, Footer } from "../components";
import { Link } from "react-router-dom";
import { AiFillCaretRight, AiFillCaretLeft } from "react-icons/ai";

const Course = () => {
  const [data, setData] = useState([]);
  const [myVariable, setMyVariable] = useState(1);

  useEffect(() => {
    fetchData();
  }, [myVariable]);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("userToken");
      const response = await axios.get(
        `https://jira.shlx.vn/v1/courses`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setData(response.data.items);
      console.log(response);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleLinkClick = (id, ma_khoa_hoc) => {
    console.log(`Selected Course ID: ${id}, Code: ${ma_khoa_hoc}`);
  };

  const increaseVariable = () => {
    setMyVariable(myVariable + 1);
  };

  const decreaseVariable = () => {
    if (myVariable > 1) {
      setMyVariable(myVariable - 1);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex pl-72 flex-col min-h-screen">
        <div className="overflow-x-auto w-11/12 max-h-screen mt-4">
          <table className="border-collapse border w-full">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-1 py-3">
                  STT
                </th>
                <th scope="col" className="px-6 py-3">
                  Mã khoá học
                </th>
                <th scope="col" className="px-6 py-3">
                  Tên khoá học
                </th>
                <th scope="col" className="px-6 py-3">
                  Số học sinh
                </th>
                <th scope="col" className="px-6 py-3">
                  Tên cơ sở đào tạo
                </th>
                <th scope="col" className="px-6 py-3">
                  Tên sở GTVT
                </th>
                <th scope="col" className="px-6 py-3">
                  Thời gian đào tạo
                </th>
                <th scope="col" className="px-6 py-3">
                  ID
                </th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {data.map((element, index) => (
                <tr key={index}>
                  <td className="py-4 font-semibold text-gray-900 dark:text-white border border-black">
                    <ul className="flex items-center justify-center">
                      {index + 1}
                    </ul>
                  </td>
                  <td className="p-2 font-semibold text-gray-900 dark:text-white border border-black" key={element.id}>
                    <Link
                      className="text-blue-800 underline cursor-pointer"
                      to={`/coursedetail/${element.id}`}
                      onClick={() => handleLinkClick(element.id, element.ma_khoa_hoc)}
                    >
                      {element.ma_khoa_hoc}
                    </Link>
                  </td>
                  <td className="border p-2 border-black">
                    <ul>{element.ten_khoa_hoc}</ul>
                  </td>
                  <td className="border p-2 border-black">
                    <ul>{element.so_hoc_sinh}</ul>
                  </td>
                  <td className="border p-2 border-black">
                    <ul>{element.ten_csdt}</ul>
                  </td>
                  <td className="border p-2 border-black">
                    <ul>{element.ten_so_gtvt}</ul>
                  </td>
                  <td className="border p-2 border-black">
                    <ul>{element.thoi_gian_dt}</ul>
                  </td>
                  <td className="border p-2 border-black">
                    <ul>{element.id}</ul>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* <div className="mx-auto mb-4">
          <div className="flex items-center">
            <button className="text-blue-800 cursor-pointer" onClick={decreaseVariable} disabled={myVariable === 1}>
              <AiFillCaretLeft size={20} />
            </button>
            <span className="mx-4 text-xl text-blue-800 cursor-pointer"> {myVariable}</span>
            <button className="text-blue-800" onClick={increaseVariable}>
              <AiFillCaretRight size={20} />
            </button>
          </div>
        </div> */}
      </div>
      <Footer />
    </div>
  );
};

export default Course;
