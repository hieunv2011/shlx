import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Navbar,
  Footer,
  TraineesSearch,
  CourseSearch,
  Pagination,
} from "../components";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { FaCheckCircle } from "react-icons/fa";
import { IoIosCloseCircle } from "react-icons/io";
const Course = () => {
  const [data, setData] = useState([]);
  const [myVariable, setMyVariable] = useState(1);
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [totalPages, setTotalPages] = useState("");
  const [synced, setSynced] = useState(-1);
  const [currentPage, setCurrentPage] = useState(1);

  const baseUrl = "https://jira.shlx.vn/v1/courses?";
  const finalUrl = `${baseUrl}&name=${name}&status=${synced}&ma=${id}`;
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    console.log(newPage);
  };

  // Lấy data
  useEffect(() => {
    fetchData();
  }, [myVariable, name, id, synced]);

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
  const handleNameSubmit = (submittedName) => {
    setName(submittedName);
    console.log("Tên");
    console.log(submittedName);
  };
  const handleIdSubmit = (submittedId) => {
    setId(submittedId);
    console.log(id);
    console.log(finalUrl);
  };
  const handleSelectSynced = (selectedOption) => {
    setSynced(
      selectedOption && selectedOption.value !== undefined
        ? selectedOption.value
        : -1
    );
    console.log(selectedOption.value);
  };

  return (
    <div>
      <div className="pl-16 bg-slate-100 min-h-screen">
        {/* Course Search */}
        <div className="h-24 mt-6 ">
          <CourseSearch
            onSubmitName={handleNameSubmit}
            onSubmitId={handleIdSubmit}
            onSelectSynced={handleSelectSynced}
          />
        </div>

        <div className="bg-white ml-8 mr-0 rounded-xl">
          <div className="w-full mt-0 p-5 mr-5 overflow-y-auto">
            <table className="border border-black min-w-full">
              <thead
                className="text-xs text-gray-700 uppercase dark:bg-gray-700 dark:text-gray-400 justify-center items-center"
              >
                <tr>
                  <th
                    scope="col"
                    className="px-1 py-3 border border-black"
                  ></th>
                  <th scope="col" className="px-6 py-3 border border-black">
                    MÃ KHOÁ HỌC
                  </th>
                  <th scope="col" className="px-6 py-3 border border-black">
                    TÊN KHOÁ HỌC
                  </th>
                  <th scope="col" className="px-6 py-3 border border-black">
                    HẠNG
                  </th>
                  <th scope="col" className="px-6 py-3 border border-black">
                    HẠNG GP
                  </th>
                  <th scope="col" className="px-6 py-3 border border-black">
                    SỐ BCI
                  </th>
                  <th scope="col" className="px-6 py-3 border border-black">
                    NGÀY BCI
                  </th>
                  <th scope="col" className="px-6 py-3 border border-black">
                    KHAI GIẢNG
                  </th>
                  <th scope="col" className="px-6 py-3 border border-black">
                    BẾ GIẢNG
                  </th>
                  <th scope="col" className="px-6 py-3 border border-black">
                    SỐ HS
                  </th>
                  <th scope="col" className="px-6 py-3 border border-black">
                    QĐKG
                  </th>
                  <th scope="col" className="px-6 py-3 border border-black">
                    THỜI GIAN
                  </th>
                  <th scope="col" className="px-6 py-3 border border-black w-48">
                    TRẠNG THÁI
                  </th>
                  <th scope="col" className="px-6 py-3 border border-black">
                    ĐỒNG BỘ
                  </th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {data.map((element, index) => (
                  <tr key={index} className="">
                    <td className="py-4 px-4 font-semibold text-gray-900 dark:text-white border border-black">
                      <ul className="flex items-center justify-center">
                        {index + 1}
                      </ul>
                    </td>
                    <td className="px-4 border border-black justify-center">
                      <Link
                        className="text-blue-800 cursor-pointer"
                        to={`/coursedetail/${element.id}`}
                        onClick={() =>
                          handleLinkClick(element.id, element.ma_khoa_hoc)
                        }
                      >
                        {element.ma_khoa_hoc}
                      </Link>
                    </td>
                    <td className="border border-black px-4">
                      {element.ten_khoa_hoc}
                    </td>
                    <td className="border border-black px-4">
                      {element.ma_hang_dao_tao}
                    </td>
                    <td className="border border-black px-4">
                      {element.hang_gplx}
                    </td>
                    <td className="border border-black px-4">
                      {element.so_bci}
                    </td>
                    <td className="border border-black px-4">
                      {format(new Date(element.ngay_bci), "dd/MM/yyyy")}
                    </td>
                    <td className="border border-black px-4">
                      {format(new Date(element.ngay_khai_giang), "dd/MM/yyyy")}
                    </td>
                    <td className="border border-black px-4">
                      {format(new Date(element.ngay_be_giang), "dd/MM/yyyy")}
                    </td>
                    <td className="border border-black px-4">
                      {element.so_hoc_sinh}
                    </td>
                    <td className="border border-black px-4">
                      {element.so_qd_kg}
                    </td>
                    <td className="border border-black px-4">
                      {element.thoi_gian_dt}
                    </td>
                    <td className="border border-black px-4 ">
                      {element.status === 3 && <h2 className="bg-green-500 rounded-lg text-white text-xs flex items-center justify-center font-bold">Kết thúc</h2>}
                      {element.status === 2 && <h2 className="bg-blue-500 rounded-lg text-white text-xs flex items-center justify-center font-bold">Học thực hành</h2>}
                      {element.status === 0 && <h2 className="bg-slate-500 rounded-lg text-white text-xs flex items-center justify-center font-bold">Chưa diễn ra</h2>}
                    </td>
                    <td className="border border-black">
                      <div className=" flex justify-center items-center">
                        {element.synced ? (
                          <FaCheckCircle className="text-green-500" />
                        ) : (
                          <IoIosCloseCircle className="text-xl text-red-500" />
                        )}
                      </div>
                    </td>
                    <td className="border border-black px-4">Icons</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex items-center justify-center">
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
};

export default Course;
