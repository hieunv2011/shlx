import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Footer, Navbar, DatDeviceSearch } from "../components";
import { CiEdit } from "react-icons/ci";

const DatDevice = () => {
  const [data, setData] = useState([]);
  const [name, setName] = useState("");
  const [id, setId]= useState("");
  const [mainboard,setMainboard]=useState("");
  const [state, setState] = useState(-1);
  const [currentPage, setCurrentPage] = useState(1);
  const baseUrl = "https://jira.shlx.vn/v1/tracking_devices?";
  const finalUrl = `${baseUrl}name=${name}&status=${state}&serial_no=${id}&board_serial=${mainboard}`;
  
  useEffect(() => {
    fetchData();
  }, [name,state,id,mainboard]);
  const fetchData = async () => {
    try {
      const token = localStorage.getItem("userToken"); // Replace with your actual token
      const response = await axios.get(finalUrl,
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
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handlePageClick = (change) => {
    const newPage = currentPage + change;
    if (newPage >= 1) {
      setCurrentPage(newPage);
    }
  };
  const handleNameSubmit = (submittedName) => {
    setName(submittedName);
  };
  const handleIdSubmit =(submittedId) =>{
    setId(submittedId);
  };
  const handleMainboardSubmit=(submittedMainboard) =>{
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
  
  return (
    <div>
      <div className="ml-8">
        <DatDeviceSearch
        onSubmitName={handleNameSubmit}
        onSubmitId={handleIdSubmit}
        onSubmitMainboard={handleMainboardSubmit}
        onSelectStatus={handleSelectStatus}
         />
        <div>
          <div
            className="overflow-y-auto w-full h-[690px] mt-0"
          >
            <table className="border-collapse border w-full">
              <thead
                className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 
              justify-center items-center"
              >
                <tr>
                  <th scope="col" className="px-6 py-3"></th>
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
                    <td className="py-4 px-1 font-semibold text-gray-900 dark:text-white">
                      <ul className="flex items-center justify-center">
                        {index + 1}
                      </ul>
                    </td>
                    <td className="px-1 font-semibold text-gray-900 dark:text-white border">
                      <Link className="text-blue-800 cursor-pointer ">
                        {element.name}
                      </Link>
                    </td>
                    <td className="px-1 border  justify-center">
                      {element.serial_no}
                    </td>
                    <td className="border px-1 ">{element.board_serial}</td>
                    <td className="border px-1">{element.firmware}</td>
                    <td className="border px-1">
                      {element.config && parseConfig(element.config)}
                    </td>
                    <td className="px-1 border">{element.vehicle_plate}</td>
                    <td className="px-1 border">{element.vehicle_model}</td>
                    <td className="px-1 border">{element.vehicle_hang}</td>
                    <td className="px-1 border">{element.sim}</td>
                    <td className="border">
                      <div
                        className={`text-white font-semibold border m-2 ${
                          element.status ? "bg-green-500" : "bg-orange-500"
                        }`}
                      >
                        {element.status ? "Đang hoạt động" : "Không hoạt động"}
                      </div>
                    </td>
                    <td className="px-1 border">
                      <button
                        type="button"
                        className="text-xl rounded-full p-3 hover:bg-gray-200 mt-4 block text-blue-800"
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
        {/* <div>
          <nav className="ml-[800px]">
            <ul class="flex items-center -space-x-px h-10 text-base">
              <li>
                <a
                  onClick={() => handlePageClick(-1)}
                  href="#"
                  class="flex items-center justify-center px-1 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  <span class="sr-only">Previous</span>
                  <svg
                    class="w-3 h-3 rtl:rotate-180"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 6 10"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M5 1 1 5l4 4"
                    />
                  </svg>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  class="flex items-center justify-center px-1 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  1
                </a>
              </li>
              <li>
                <a
                  href="#"
                  class="flex items-center justify-center px-1 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  2
                </a>
              </li>
              <li>
                <a
                  href="#"
                  aria-current="page"
                  class="z-10 flex items-center justify-center px-1 h-10 leading-tight text-blue-600 border border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                >
                  3
                </a>
              </li>
              <li>
                <a
                  href="#"
                  class="flex items-center justify-center px-1 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  4
                </a>
              </li>
              <li>
                <a
                  href="#"
                  class="flex items-center justify-center px-1 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  5
                </a>
              </li>
              <li>
                <a
                  href="#"
                  onClick={() => handlePageChange(+1)}
                  class="flex items-center justify-center px-1 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  <span class="sr-only">Next</span>
                  <svg
                    class="w-3 h-3 rtl:rotate-180"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 6 10"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m1 9 4-4-4-4"
                    />
                  </svg>
                </a>
              </li>
            </ul>
          </nav>
        </div> */}
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
