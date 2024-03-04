import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Footer, Navbar, Pagination, TraineesSearch } from "../components";
import { CiEdit } from "react-icons/ci";

const Rfcard = () => {
  const [data, setData] = useState([]);
  const [totalPages, setTotalPages] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const baseUrl = "https://jira.shlx.vn/v1/rfcards?";
  const finalUrl = `${baseUrl}page=${currentPage}`;

  useEffect(() => {
    fetchData();
  }, [currentPage]);
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
      console.log(finalUrl);
      const totalCount = response.data.total;
      setTotalPages(Math.ceil(totalCount / 50));
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
    <div className="flex flex-col">
      <div className="bg-slate-100 pl-16 min-h-screen">
        <div className="ml-8 h-24 mt-6">
          <TraineesSearch />
        </div>

        <h1 className="text-4xl"> LỖI API SEARCH</h1>
        <div className="bg-white ml-8 mr-0 rounded-xl">
          <div className="overflow-y-auto w-full h-[690px] mt-0 rounded-xl p-5 mr-5">
            <table className="border-collapse border w-full">
              <thead className="text-xs text-gray-700 uppercase bg-white dark:bg-gray-700 dark:text-gray-400 justify-center items-center border border-black">
                <tr>
                  <th scope="col" className="px-1 py-3"></th>
                  <th scope="col" className="px-6 py-3 border border-black">
                    ID THẺ
                  </th>
                  <th scope="col" className="py-3 border border-black">
                    SỐ THẺ
                  </th>
                  <th scope="col" className="px-6 py-3 border border-black">
                    LOẠI THẺ
                  </th>
                  <th scope="col" className="px-6 py-3 border border-black">
                    TRẠNG THÁI
                  </th>
                  <th scope="col" className="px-6 py-3"></th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {data.map((element, index) => (
                  <tr key={index} className="border border-black">
                    <td className="py-4 px-4 font-semibold text-gray-900 dark:text-white">
                      <ul className="flex items-center justify-center">
                        {index + 1}
                      </ul>
                    </td>
                    <td className="px-4 font-semibold text-gray-900 dark:text-white border border-black">
                      <Link className="text-blue-800 cursor-pointer ">
                        {element.card_name}
                      </Link>
                    </td>
                    <td className="px-4 border justify-center border-black">
                      {element.card_num}
                    </td>
                    <td className="border px-4 border-black">{element.type}</td>
                    <td className="border px-4 border-black">
                      {element.status}
                    </td>
                    <td className="border px-4 border-black">
                      {element.config && parseConfig(element.config)}
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

export default Rfcard;
