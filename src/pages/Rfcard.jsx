import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Footer, Navbar, Pagination, TraineesSearch } from "../components";
import { CiEdit } from "react-icons/ci";

const Rfcard = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState("");
  const baseUrl="https://jira.shlx.vn/v1/rfcards?";
  const finalUrl = `${baseUrl}page=${currentPage}`;

  useEffect(() => {
    fetchData();
  }, [currentPage]);
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
      console.log(finalUrl);
      const totalCount = response.data.total;
      setTotalPages( Math.ceil(totalCount/ 50));
      console.log(totalPages);
    } catch (error) {
      console.error("Error fetching data:", error);
    }

  };
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    console.log(newPage);
  };



  return (
    <div>
      <div className="ml-48 bg-slate-100">
        <TraineesSearch />
        <h1 className="text-4xl"> LỖI API SEARCH</h1>
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
                    ID THẺ
                  </th>
                  <th scope="col" className="py-3">
                    SỐ THẺ
                  </th>
                  <th scope="col" className="px-6 py-3">
                    LOẠI THẺ
                  </th>
                  <th scope="col" className="px-6 py-3">
                    TRẠNG THÁI
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
                        {element.card_name}
                      </Link>
                    </td>
                    <td className="px-4 border  justify-center">
                      {element.card_num}
                    </td>
                    <td className="border px-4 ">{element.type}</td>
                    <td className="border px-4">{element.status}</td>
                    <td className="border px-4">
                      {element.config && parseConfig(element.config)}
                    </td>                    
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <Pagination totalPages={totalPages} onPageChange={handlePageChange} />
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

export default Rfcard;
