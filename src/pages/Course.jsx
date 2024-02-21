import React, { useState, useEffect } from "react";
import axios from "axios";
import { Navbar, Footer, TraineesSearch, CourseSearch } from "../components";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";
const Course = () => {
  const [data, setData] = useState([]);
  const [myVariable, setMyVariable] = useState(1);
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [synced, setSynced] = useState(-1);

  const baseUrl = "https://jira.shlx.vn/v1/courses?";
  const finalUrl = `${baseUrl}&name=${name}&status=${synced}&ma=${id}`;

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
    console.log("Tên")
    console.log(submittedName);
  };
  const handleIdSubmit = (submittedId) => {
    setId(submittedId);
    console.log(id);
    console.log(finalUrl);
  };
  const handleSelectSynced = (selectedOption) => {
    setSynced(selectedOption && selectedOption.value !== undefined ? selectedOption.value : -1);
    console.log(selectedOption.value);
  };

  return (
    <div>
      <div className="ml-12">
        <CourseSearch
          onSubmitName={handleNameSubmit}
          onSubmitId={handleIdSubmit}
          onSelectSynced={handleSelectSynced}
        />
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
                    MÃ KHOÁ HỌC
                  </th>
                  <th scope="col" className="px-6 py-3">
                    TÊN KHOÁ HỌC
                  </th>
                  <th scope="col" className="px-6 py-3">
                    HẠNG
                  </th>
                  <th scope="col" className="px-6 py-3">
                    HẠNG GP
                  </th>
                  <th scope="col" className="px-6 py-3">
                    SỐ BCI
                  </th>
                  <th scope="col" className="px-6 py-3">
                    NGÀY BCI
                  </th>
                  <th scope="col" className="px-6 py-3">
                    KHAI GIẢNG
                  </th>
                  <th scope="col" className="px-6 py-3 border">
                    BẾ GIẢNG
                  </th>
                  <th scope="col" className="px-6 py-3 border">
                    SỐ HS
                  </th>
                  <th scope="col" className="px-6 py-3 border">
                    QĐKG
                  </th>
                  <th scope="col" className="px-6 py-3 border">
                    THỜI GIAN
                  </th>
                  <th scope="col" className="px-6 py-3 border">
                    TRẠNG THÁI
                  </th>
                  <th scope="col" className="px-6 py-3 border">
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
                    <td className="px-4 border  justify-center">
                      <Link
                        className="text-blue-800 underline cursor-pointer"
                        to={`/coursedetail/${element.id}`}
                        onClick={() =>
                          handleLinkClick(element.id, element.ma_khoa_hoc)
                        }
                      >
                        {element.ma_khoa_hoc}
                      </Link>
                    </td>
                    <td className="border px-4 ">{element.ten_khoa_hoc}</td>
                    <td className="border px-4">{element.ma_hang_dao_tao}</td>
                    <td className="border px-4">{element.hang_gplx}</td>
                    <td className="border px-4">{element.so_bci}</td>
                    <td className="border px-4">
                      {format(new Date(element.ngay_bci), "dd/MM/yyyy")}
                    </td>
                    <td className="border px-4">
                      {format(new Date(element.ngay_khai_giang), "dd/MM/yyyy")}
                    </td>
                    <td className="border px-4">
                      {format(new Date(element.ngay_be_giang), "dd/MM/yyyy")}
                    </td>
                    <td className="border px-4">{element.so_hoc_sinh}</td>
                    <td className="border px-4">{element.so_qd_kg}</td>
                    <td className="border px-4">{element.thoi_gian_dt}</td>
                    <td className="border px-4">
                      {element.status === 3 && "Kết thúc"}
                      {element.status === 2 && "Học thực hành"}
                      {element.status === 1 && "Chưa diễn ra"}
                    </td>
                    <td className="border">
                      <div className=" flex justify-center items-center">
                        {element.synced ? (
                          <AiOutlineCheck className="text-green-500" />
                        ) : (
                          <AiOutlineClose className="text-red-500" />
                        )}
                      </div>
                    </td>
                    <td className="border px-4">Icons</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Course;
