import React, { useState, useEffect } from "react";
import axios from "axios";
import { Navbar, TraineesSearch } from "../components";
import { Link } from "react-router-dom";
import { AiOutlineCloseCircle, AiOutlineCheckCircle } from "react-icons/ai";

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
    
      <div className="ml-48 bg-slate-100">
      <TraineesSearch/>
      <div>
          <div
            className={`overflow-x-auto  overflow-y-auto w-full h-[690px] mt-0 `}
          >
            <table className="border-collapse border w-full">
              <thead
                className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 
              justify-center items-center"
              >
                <tr>
                  <th scope="col" className="px-1 py-3"></th>
                  <th scope="col" className="px-6 py-3">
                    
                  </th>
                  <th scope="col" className="py-3">
                    Tên
                  </th>
                  <th scope="col" className="px-6 py-3">
                    NGÀY SINH
                  </th>
                  <th scope="col" className="px-6 py-3">
                    CMT
                  </th>
                  <th scope="col" className="px-6 py-3">
                    ĐỊA CHỈ
                  </th>
                  <th scope="col" className="px-6 py-3">
                    GPLX
                  </th>
                  <th scope="col" className="px-6 py-3">
                    GPĐT
                  </th>
                  <th scope="col" className="px-6 py-3">
                    TÊN THẺ
                  </th>
                  <th scope="col" className="px-6 py-3">
                    SỐ THẺ
                  </th>
                  <th scope="col" className="px-6 py-3">
                    ĐỒNG BỘ
                  </th>
                  <th scope="col" className="px-6 py-3">
                  </th>
                </tr>
              </thead>
              <tbody className="text-sm ">
                {data.map((element, index) => (
                  <tr key={index} className="">
                    <td className="py-4 px-4 font-semibold text-gray-900 dark:text-white">
                      <ul className="flex items-center justify-center">
                        {index + 1}
                      </ul>
                    </td>
                    <td className="px-4 font-semibold text-gray-900 dark:text-white border">
                      <Link className="text-blue-800 cursor-pointer ">
                      <img
                            src={element.image_path}
                            className="h-14 w-14 rounded-xl"
                            
                          />
                      </Link>
                    </td>
                    <td className="px-4 border  justify-center">
                      {element.name}
                    </td>
                    <td className="border px-4 ">{element.birthday}</td>
                    <td className="border px-4">{element.id_card}</td>
                    <td className="border px-4">{element.address}</td>
                    <td className="border px-4">{element.driving_license_no}</td>
                    <td className="border px-4">{element.teaching_license_no}</td>
                    <td className="border px-4">{element.rfid_card_name}</td>
                    <td className="border px-4">{element.rfid_card}</td>
                    <td className="border px-4">{element.synced ?
                     <AiOutlineCheckCircle className="text-green-500" /> : <AiOutlineCloseCircle className="text-red-500" />}</td>

                    <td className="border px-4">
                    </td>                    
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherList;
