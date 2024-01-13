import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Navbar, TraineesSearch } from "../components";
import { CiEdit } from "react-icons/ci";

const DatDevice = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("userToken"); // Replace with your actual token
      const response = await axios.get(
        "https://jira.shlx.vn/v1/tracking_devices",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            // Add other headers if needed
          },
        }
      );
      setData(response.data.items);
      console.log(response);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="ml-48 bg-slate-100 border border-black">
        <TraineesSearch />
        <div>
          <div className={`overflow-x-auto w-full h-[690px] mt-0 `}>
            <table className="border-collapse border w-full">
              <thead
                className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 
              justify-center items-center"
              >
                <tr>
                  <th scope="col" className="px-1 py-3"></th>
                  <th scope="col" className="px-6 py-3">
                    TÊN
                  </th>
                  <th scope="col" className="py-3">
                    SERIAL
                  </th>
                  <th scope="col" className="px-6 py-3">
                    BOARD
                  </th>
                  <th scope="col" className="px-6 py-3">
                    VERSION
                  </th>
                  <th scope="col" className="px-6 py-3">
                    NEW VERSION
                  </th>
                  <th scope="col" className="px-6 py-3">
                    XE
                  </th>
                  <th scope="col" className="px-6 py-3">
                    MODEL
                  </th>
                  <th scope="col" className="px-6 py-3">
                    HẠNG
                  </th>
                  <th scope="col" className="px-6 py-3">
                    SIM
                  </th>
                  <th scope="col" className="px-6 py-3">
                    TRẠNG THÁI
                  </th>
                  <th scope="col" className="px-6 py-3">
                    CHỈNH SỬA
                  </th>
                </tr>
              </thead>
              <tbody className="text-sm ">
                {data.map((element, index) => (
                  <tr key={index} className="">
                    <td className="py-4 font-semibold text-gray-900 dark:text-white">
                      <ul className="flex items-center justify-center">
                        {index + 1}
                      </ul>
                    </td>
                    <td className="font-semibold text-gray-900 dark:text-white border">
                      <Link className="text-blue-800 cursor-pointer ">
                        {element.name}
                      </Link>
                    </td>
                    <td className="border  justify-center">
                      {element.serial_no}
                    </td>
                    <td className="border ">{element.board_serial}</td>
                    <td className="border ">{element.firmware}</td>
                    <td className="border ">
                        {element.config &&parseConfig(element.config)}
                    </td>
                    <td>2</td>
                    <td>3</td>
                    <td>4</td>
                    <td>5</td>
                    <td>6</td>
                    <td>
                      <button
                        type="button"
                        className="text-xl rounded-full p-3 hover:bg-gray-700 mt-4 block text-black"
                      >
                        <CiEdit />
                      </button>
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

  function parseConfig(config) {
    try {
      const parsedConfig = JSON.parse(config);
      return parsedConfig.newVersion || "N/A";
    } catch (error) {
      console.error("Error parsing JSON:", error);
      return "Invalid JSON";
    }
  }


};

export default DatDevice;
