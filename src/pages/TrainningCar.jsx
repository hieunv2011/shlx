import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Footer, Navbar, TraineesSearch } from "../components";
import { format, parseISO, differenceInSeconds } from "date-fns";
import { FaOtter } from "react-icons/fa";
const TrainningCar = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const token = localStorage.getItem("userToken"); // Replace with your actual token
      const response = await axios.get(`https://jira.shlx.vn/v1/vehicles`, {
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
    <div className=" flex flex-col min-h-screen">
      <Navbar />
      <div className="ml-48  bg-slate-100 flex-1 ">
        <TraineesSearch />
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
                  BIỂN SỐ
                </th>
                <th scope="col" className="py-3">
                  MODEL
                </th>
                <th scope="col" className="px-6 py-3">
                  HẠNG
                </th>
                <th scope="col" className="px-6 py-3">
                  GPTL
                </th>
                <th scope="col" className="px-6 py-3">
                  NĂM SX
                </th>
                <th scope="col" className="px-6 py-3">
                  MÔ TẢ
                </th>
                <th scope="col" className="px-6 py-3">
                  THIẾT BỊ
                </th>
                <th scope="col" className="px-6 py-3">
                  SERIAL
                </th>
                <th scope="col" className="px-6 py-3">
                  SIM
                </th>
                <th scope="col" className="px-6 py-3">
                  CẬP NHẬT
                </th>
                <th scope="col" className="px-6 py-3">
                  ĐỒNG BỘ
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
                      {element.plate}
                    </Link>
                  </td>
                  <td className="px-4 border  justify-center">
                    {element.model}
                  </td>
                  <td className="border px-4 ">{element.hang}</td>
                  <td className="border px-4">{element.gptl}</td>
                  <td className="border px-4">{element.manufacture_year}</td>
                  <td className="px-4 border">{element.notes}</td>
                  <td className="px-4 border">{element.device_name}</td>
                  <td className="px-4 border">{element.device_serial}</td>
                  <td className="px-4 border"></td>
                  <td className="border">
                    {(() => {
                      try {
                        return element.last_updated
                          ? format(
                              parseISO(element.last_updated),
                              "dd/MM/yyyy HH:mm:ss"
                            )
                          : "N/A";
                      } catch (error) {
                        console.error("Lỗi phân tích ngày:", error);
                        return "Ngày không hợp lệ";
                      }
                    })()}
                  </td>
                  <td className="px-4 border"></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="mt-auoto">
        <Footer />
      </div>
    </div>
  );
};

export default TrainningCar;
