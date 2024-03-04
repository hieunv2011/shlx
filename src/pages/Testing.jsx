import React, { useState, useEffect } from "react";
import axios from "axios";

import { FaCheckCircle } from "react-icons/fa";
import { IoIosCloseCircle } from "react-icons/io";
import { FaUserEdit } from "react-icons/fa";
import { TbFingerprintScan } from "react-icons/tb";
import { FaRegFaceGrinWide } from "react-icons/fa6";
import { format } from "date-fns";
import {
  Footer,
  Navbar,
  TrainnesPopup,
  TraineesSearch,
  Sidebar,
  Pagination,
} from "../components";
import { Link } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import SplitPane, { Pane } from "split-pane-react";
import "split-pane-react/esm/themes/default.css";

const Testing = ({ onSelect }) => {
  const [data, setData] = useState([]);
  const { activePopup, setActivePopup } = useStateContext();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [synced, setSynced] = useState(-1);
  const [state, setState] = useState(-1);
  const [course, setCourse] = useState("0");

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState("");

  const [selectedTrainee, setSelectedTrainee] = useState(null);
  const baseUrl = "https://jira.shlx.vn/v1/trainees?";
  const finalUrl = `${baseUrl}course_id=${course}&province_id=0&rf_card_name=${id}&synced=${synced}&status=${state}&page=${currentPage}&name=${name}`;
  // const finalUrl = `${baseUrl}course_id=${course}&province_id=0&rf_card_name=${id}&synced=${synced}&status=${state}&page=5&name=${name}`;
  const [searchTerm, setSearchTerm] = useState("");

  const togglePopup = () => {
    setIsPopupOpen(isPopupOpen === 0 ? 1 : isPopupOpen === 1 ? 1 : 0);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    console.log(newPage);
  };

  // Lấy data
  useEffect(() => {
    fetchData();
  }, [name, id, synced, course, currentPage]);

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
      //
      const totalCount = response.data.total;
      setTotalPages(Math.ceil(totalCount / 50));
      console.log(totalPages);
      //
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const handleLinkClick = (id, ho_va_ten) => {
    console.log(`Selected Trainee ID: ${id}, Name: ${ho_va_ten}`);
    setSelectedTrainee({ id, ho_va_ten });
    setActivePopup(true);
    if (onSelect) {
      onSelect({ id, ho_va_ten });
    }
    togglePopup();
  };
  const handleNameSubmit = (submittedName) => {
    setName(submittedName);
    console.log(name);
    console.log(finalUrl);
  };
  const handleIdSubmit = (submittedId) => {
    setId(submittedId);
    console.log(id);
    // console.log(finalUrl);
  };
  const handleSelectStatus = (selectedOption) => {
    //console.log(selectedOption.value);
    setState(
      selectedOption && selectedOption.value !== undefined
        ? selectedOption.value
        : -1
    );
  };
  const handleSelectSynced = (selectedOption) => {
    setSynced(
      selectedOption && selectedOption.value !== undefined
        ? selectedOption.value
        : -1
    );
    //console.log(selectedOption.value);
  };
  const handleSubmitCourse = (selectedOption) => {
    setCourse(
      selectedOption && selectedOption.value !== undefined
        ? selectedOption.value
        : 0
    );
    //console.log(selectedOption.value);
  };

  return (
    <div className="flex flex-col">
      <div className="flex pl-0 flex-col">
        <div className="bg-slate-100 pl-16 min-h-screen">
          <div className="ml-8 h-24 mt-6 ">
            <TraineesSearch
              onSubmitName={handleNameSubmit}
              onSubmitId={handleIdSubmit}
              onSelectStatus={handleSelectStatus}
              onSelectSynced={handleSelectSynced}
              onSubmitCourse={handleSubmitCourse}
            />
          </div>
          <div className="bg-white ml-8 mr-0 rounded-xl">
            {/* <Split
              mode="horizontal"
              style={{
                borderRadius: 3,
              }}
              className="w-[1327px] border border-inherit ml-8 "
            > */}
            <div className="w-full mb-10 rounded-xl">
              <div className="w-full mt-0 p-5 mr-5 overflow-y-auto">
                <table className="border border-black min-w-full">
                  <thead>
                    <tr>
                      <th className="w-12 text-slate-600"></th>
                      <th className="border border-black border-t-0 border-b-0 w-24 text-slate-600">
                        Họ và tên
                      </th>
                      <th className="border border-black border-t-0 border-b-0 w-24 text-slate-600">
                        Ảnh
                      </th>
                      <th className="border border-black border-t-0 border-b-0 w-24 text-slate-600">
                        Mã đăng ký
                      </th>
                      <th className="border border-black border-t-0 border-b-0 w-24 text-slate-600">
                        Hạng
                      </th>
                      <th className="border border-black border-t-0 border-b-0 w-24 text-slate-600">
                        Giới tính
                      </th>
                      <th className="border border-black border-t-0 border-b-0 w-24 text-slate-600">
                        Ngày sinh
                      </th>
                      <th className="border border-black border-t-0 border-b-0 w-24 text-slate-600">
                        Số CMT
                      </th>
                      <th className="border border-black border-t-0 border-b-0 w-24 text-slate-600">
                        ID thẻ
                      </th>
                      <th className="border border-black border-t-0 border-b-0 w-24 text-slate-600">
                        Số thẻ
                      </th>
                      <th className="text-slate-600" colSpan={5}>
                        Thực hành
                      </th>
                      <th
                        className="border border-black text-slate-600"
                        colSpan={2}
                      >
                        Đồng bộ phiên học
                      </th>
                      <th className="border border-black border-t-0 border-b-0 w-24 text-slate-600">
                        ĐỒNG BỘ
                      </th>
                    </tr>
                    <tr>
                      <th className="border border-black border-t-0 border-b-0 w-12 text-slate-600"></th>
                      <th className="border border-black border-t-0 border-b-0 w-24 text-slate-600"></th>
                      <th className="border border-black border-t-0 border-b-0 w-24 text-slate-600"></th>
                      <th className="border border-black border-t-0 border-b-0 w-24 text-slate-600"></th>
                      <th className="border border-black border-t-0 border-b-0 w-24 text-slate-600"></th>
                      <th className="border border-black border-t-0 border-b-0 w-24 text-slate-600"></th>
                      <th className="border border-black border-t-0 border-b-0 w-24 text-slate-600"></th>
                      <th className="border border-black border-t-0 border-b-0 w-24 text-slate-600"></th>
                      <th className="border border-black border-t-0 border-b-0 w-24 text-slate-600"></th>
                      <th className="border border-black border-t-0 border-b-0 w-24 text-slate-600"></th>
                      <th className="border border-black w-24 text-slate-600">
                        Giờ
                      </th>
                      <th className="border border-black w-24 text-slate-600">
                        KM
                      </th>
                      <th className="border border-black w-24 text-slate-600">
                        Thiếu
                      </th>
                      <th className="border border-black w-24 text-slate-600">
                        Giờ đêm
                      </th>
                      <th className="border border-black w-24 text-slate-600">
                        Giờ TĐ
                      </th>
                      <th className="border border-black border-t-0 border-b-0 w-24 text-slate-600">
                        Giờ
                      </th>
                      <th className="border border-black border-t-0 border-b-0 w-24 text-slate-600">
                        KM
                      </th>
                      <th className="border border-black border-t-0 border-b-0 w-24 text-slate-600"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((element, index) => (
                      <tr key={index}>
                        <td className="border border-black text-center w-12 px-2">
                          <ul>{index + 1}</ul>
                        </td>
                        <td className="border border-black text-center w-24">
                          <Link
                            onClick={() =>
                              handleLinkClick(element.id, element.ho_va_ten)
                            }
                          >
                            {element.ho_va_ten}
                          </Link>
                        </td>
                        <td className="border border-black w-24">
                          <Link
                            onClick={() => console.log("Ấn ảnh")}
                            className="flex items-center justify-center"
                          >
                            <img
                              src={element.anh_chan_dung}
                              alt={`Avatar ${element.ho_va_ten}`}
                              className="rounded-full w-14 h-14 object-cover"
                            />
                          </Link>
                        </td>
                        <td className="border border-black text-center w-24">
                          {element.ma_dk}
                        </td>
                        <td className="border border-black text-center w-24">
                          {element.hang_gplx}
                        </td>
                        <td className="border border-black text-center w-24 px-">
                          {element.gioi_tinh === "F" ? "Nữ" : "Nam"}
                        </td>
                        <td className="border border-black text-center w-24 px-5">
                          {format(new Date(element.ngay_sinh), "dd/MM/yyyy")}
                        </td>
                        <td className="border border-black text-center w-24">
                          {element.so_cmt}
                        </td>
                        <td className="border border-black text-center w-24">
                          {element.rfid_card_name}
                        </td>
                        <td className="border border-black text-center w-24">
                          {element.rfid_card}
                        </td>
                        <td className="border border-black text-center w-24">
                          {(element.outdoor_hour / 3600).toFixed(3)}
                        </td>
                        <td className="border border-black text-center w-24">
                          {(element.outdoor_distance / 1000).toFixed(3)}
                        </td>
                        <td className="border border-black text-center w-24">
                          {(
                            element.required_hour -
                            element.outdoor_hour / 3600
                          ).toFixed(3)}
                          /
                          {(
                            element.required_distance -
                            element.outdoor_distance / 1000
                          ).toFixed(3)}
                        </td>
                        <td className="border border-black text-center w-24">
                          {(element.night_duration / 3600).toFixed(3)}
                        </td>
                        <td className="border border-black text-center w-24">
                          {(element.auto_duration / 3600).toFixed(3)}
                        </td>
                        <td className="border border-black text-center w-24">
                          {(element.synced_outdoor_hours / 3600).toFixed(3)}
                        </td>
                        <td className="border border-black text-center w-24">
                          {(element.synced_outdoor_distance / 1000).toFixed(3)}
                        </td>
                        <td className="border border-black w-24">
                          <div className="flex items-center justify-center">
                            {element.synced ? (
                              <FaCheckCircle className="text-green-500" />
                            ) : (
                              <IoIosCloseCircle className="text-xl text-red-600" />
                            )}
                          </div>
                        </td>
                        <td className="border border-black w-24 ">
                          <div className="flex justify-between items-center space-x-3 text-xl">
                            <FaUserEdit className="text-blue-500" />
                            <TbFingerprintScan className="text-green-500" />
                            <FaRegFaceGrinWide className="text-red-500" />
                          </div>
                        </td>
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
            {/* <div className={`${isPopupOpen ? "block" : "hidden"}`}>
                {activePopup && selectedTrainee && (
                  <div className=" border border-inherit">
                    <TrainnesPopup
                      traineeId={selectedTrainee.id}
                      traineeName={selectedTrainee.ho_va_ten}
                      onClose={closePopup}
                    />
                  </div>
                )}
              </div>
            </Split> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testing;
