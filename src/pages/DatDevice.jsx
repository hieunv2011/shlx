import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Footer, Navbar, DatDeviceSearch,Pagination } from "../components";
import { CiEdit } from "react-icons/ci";

const DatDevice = () => {
  const [data, setData] = useState([]);
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [mainboard, setMainboard] = useState("");
  const [state, setState] = useState(-1);
  const [totalPages, setTotalPages] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const baseUrl = "https://jira.shlx.vn/v1/tracking_devices?";
  const finalUrl = `${baseUrl}name=${name}&status=${state}&serial_no=${id}&board_serial=${mainboard}&page=${currentPage}`;

  useEffect(() => {
    fetchData();
  }, [name, state, id, mainboard,currentPage]);
  const fetchData = async () => {
    try {
      const token = localStorage.getItem("userToken"); // Replace with your actual token
      const response = await axios.get(finalUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
          // Add other headers if needed
        },
      });
      setData(response.data.items);
      console.log(response);
      const totalCount = response.data.total;
      setTotalPages(Math.ceil(totalCount / 50));
      console.log(totalPages);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const handleNameSubmit = (submittedName) => {
    setName(submittedName);
  };
  const handleIdSubmit = (submittedId) => {
    setId(submittedId);
  };
  const handleMainboardSubmit = (submittedMainboard) => {
    setMainboard(submittedMainboard);
    console.log(finalUrl);
  };
  const handleSelectStatus = (selectedOption) => {
    setState(
      selectedOption && selectedOption.value !== undefined
        ? selectedOption.value
        : -1
    );
  };
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    console.log(newPage);
  };
  

  return (
    <div className="flex flex-col">
      <div className="bg-slate-100 pl-16 min-h-screen">
        <div className="ml-8 h-24 mt-6 ">
          <DatDeviceSearch
            onSubmitName={handleNameSubmit}
            onSubmitId={handleIdSubmit}
            onSubmitMainboard={handleMainboardSubmit}
            onSelectStatus={handleSelectStatus}
          />
        </div>

        <div div className="bg-white ml-8 mr-0 rounded-xl">
          <div className="overflow-y-auto w-full h-[690px] mt-0 rounded-xl p-5 mr-5">
            <table className="border-collapse border w-full">
              <thead
                className="text-xs text-gray-700 uppercase first-letter dark:bg-gray-700 dark:text-gray-400 
              justify-center items-center"
              >
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 border border-black"
                  ></th>
                  <th scope="col" className="px-6 py-3 border border-black">
                    TÊN
                  </th>
                  <th scope="col" className="py-3 border border-black">
                    SERIAL
                  </th>
                  <th scope="col" className="px-6 py-3 border border-black">
                    BOARD
                  </th>
                  <th scope="col" className="px-6 py-3 border border-black">
                    VERSION
                  </th>
                  <th scope="col" className="px-6 py-3 border border-black">
                    NEW VERSION
                  </th>
                  <th scope="col" className="px-6 py-3 border border-black">
                    XE
                  </th>
                  <th scope="col" className="px-6 py-3 border border-black">
                    MODEL
                  </th>
                  <th scope="col" className="px-6 py-3 border border-black">
                    HẠNG
                  </th>
                  <th scope="col" className="px-6 py-3 border border-black">
                    SIM
                  </th>
                  <th scope="col" className="px-6 py-3 border border-black">
                    TRẠNG THÁI
                  </th>
                  <th scope="col" className="px-6 py-3 border border-black">
                    CHỈNH SỬA
                  </th>
                </tr>
              </thead>
              <tbody className="text-sm ">
                {data.map((element, index) => (
                  <tr key={index} className="">
                    <td className="py-4 px-1 font-semibold text-gray-900 dark:text-white border border-black">
                      <ul className="flex items-center justify-center">
                        {index + 1}
                      </ul>
                    </td>
                    <td className="px-1 font-semibold text-gray-900 dark:text-white border border-black">
                      <Link className="text-blue-800 cursor-pointer ">
                        {element.name}
                      </Link>
                    </td>
                    <td className="px-1 border border-black justify-center">
                      {element.serial_no}
                    </td>
                    <td className="border px-1 border-black ">
                      {element.board_serial}
                    </td>
                    <td className="border px-1 border-black ">
                      {element.firmware}
                    </td>
                    <td className="border px-1 border-black ">
                      {element.config && parseConfig(element.config)}
                    </td>
                    <td className="px-1 border border-black ">
                      {element.vehicle_plate}
                    </td>
                    <td className="px-1 border border-black ">
                      {element.vehicle_model}
                    </td>
                    <td className="px-1 border border-black ">
                      {element.vehicle_hang}
                    </td>
                    <td className="px-1 border border-black ">{element.sim}</td>
                    <td className="border border-black px-4">
                      <div
                        className={`rounded-lg text-white text-xs flex items-center justify-center font-bold ${
                          element.status ? "bg-green-500" : "bg-orange-600"
                        }`}
                      >
                        {element.status ? "Đang hoạt động" : "Không hoạt động"}
                      </div>
                    </td>
                    <td className="px-1 border border-black ">
                      <button
                        type="button"
                        className="flex justify-center items-center text-xl rounded-full p-3 hover:bg-gray-200 mt-4 text-blue-800"
                      >
                        <CiEdit />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex items-center justify-center mb-10">
                <Pagination
                  className=""
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
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
      //   console.error("Error parsing JSON:", error);
      //   return "Invalid JSON";
    }
  }
};

export default DatDevice;
