import React, { useState, useEffect } from "react";
import axios from "axios";
import { Pagination, TeacherSearch } from "../components";
import { Link } from "react-router-dom";
import { AiOutlineCloseCircle, AiOutlineCheckCircle } from "react-icons/ai";
import DatePicker from "react-datepicker";
import vi from "date-fns/locale/vi";
import { format } from "date-fns";

const TeacherList = () => {
  const [data, setData] = useState([]);
  const [dataPopup, setDataPopup] = useState([]);
  const [name, setName] = useState("");
  const [cmt, setCmt] = useState("");
  const [gplx, setGplx] = useState("");
  const [gpdt, setGpdt] = useState("");
  const [totalPages, setTotalPages] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [submitStartDate, setSubmitStartDate]=useState("");
  const [submitEndDate, setSubmitEndDate]=useState("");
  const [selectedSyncOption, setSelectedSyncOption] = useState(-1);
  const [showNotification, setShowNotification] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [teacherId, setTeacherId] = useState("");
  const basePopupUrl =
    "https://jira.shlx.vn/v1/outdoor-sessions?course_id=0&trainee_id=0&vehicle_id=0&device_id=0&instructor_id=";
  const finalPopupUrl = `${basePopupUrl}${teacherId}&from_date=${submitStartDate}&to_date=${submitEndDate}`;
  const baseUrl = "https://jira.shlx.vn/v1/instructors?";
  const finalUrl = `${baseUrl}name=${name}&id_card=${cmt}&driving_license_no=${gplx}&teaching_license_no=${gpdt}&synced=${selectedSyncOption}&page=${currentPage}`;

  useEffect(() => {
    fetchData();
  }, [name, cmt, gplx, gpdt, selectedSyncOption, currentPage]);
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

  useEffect(() => {
    fetchPopupData();
  }, [teacherId, submitStartDate, submitEndDate]);
  const fetchPopupData = async () => {
    try {
      const token = localStorage.getItem("userToken"); // Replace with your actual token
      const responsePopup = await axios.get(finalPopupUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
          // Add other headers if needed
        },
      });
      setDataPopup(responsePopup.data);
      console.log(responsePopup);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleNameSubmit = (submittedName) => {
    setName(submittedName);
    console.log(submittedName);
    console.log(finalUrl);
  };

  const handleCmtSubmit = (submittedCmt) => {
    setCmt(submittedCmt);
  };

  const handleGpdtSubmit = (submittedGpdt) => {
    setGpdt(submittedGpdt);
  };

  const handleGplxSubmit = (submittedGplx) => {
    setGplx(submittedGplx);
  };

  const handleSelectSynced = (selectedOption) => {
    setSelectedSyncOption(selectedOption.value);
    console.log(selectedOption.value);
    console.log(finalUrl);
  };
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    console.log(newPage);
  };
  const handleTeacherClick = (element) => {
    setSelectedTeacher(element);
    setShowNotification(true); // Show notification when teacher is clicked
    setTeacherId(element.id);
  };
  const handleStartDateChange = (date) => {
    const dateObject = new Date(date);
    const isoDateStart = dateObject.toISOString();
    setSubmitStartDate(isoDateStart);
  };

  const handleEndDateChange = (date) => {
    const dateObject = new Date(date);
    const isoDateEnd = dateObject.toISOString();
    setSubmitEndDate(isoDateEnd);
  };

  // useEffect(() => {
  //   console.log(submitStartDate,submitEndDate);
  // }, [submitEndDate,submitStartDate]);

  useEffect(() => {
    const nextDay = new Date(startDate);
    nextDay.setDate(nextDay.getDate() + 1); // Tăng thêm một ngày
    setEndDate(nextDay);
  }, [startDate]);
  const handleReset = () => {
    setStartDate(null); // Reset startDate về null
    setEndDate(null); // Reset endDate về null
  };

  return (
    <div className="flex flex-col">
      <div className="bg-slate-100 pl-16 min-h-screen">
        <div className="ml-8 h-24 mt-6">
          <TeacherSearch
            onSubmitName={handleNameSubmit}
            onSubmitCmt={handleCmtSubmit}
            onSubmitGpdt={handleGpdtSubmit}
            onSubmitGplx={handleGplxSubmit}
            onSelectSynced={handleSelectSynced}
          />
        </div>
        <div className="bg-white ml-8 mr-0 rounded-xl">
          <div className="overflow-y-auto w-full h-[690px] mt-0 rounded-xl p-5 mr-5">
            <table className="border-collapse border w-full">
              <thead className="text-xs text-gray-700 uppercase bg-white dark:bg-gray-700 dark:text-gray-400 justify-center items-center border border-black">
                <tr>
                  <th
                    scope="col"
                    className="px-1 py-3 border border-black"
                  ></th>
                  <th
                    scope="col"
                    className="px-6 py-3 border border-black"
                  ></th>
                  <th scope="col" className="py-3 border border-black">
                    Tên
                  </th>
                  <th scope="col" className="px-6 py-3 border border-black">
                    NGÀY SINH
                  </th>
                  <th scope="col" className="px-6 py-3 border border-black">
                    CMT
                  </th>
                  <th scope="col" className="px-6 py-3 border border-black">
                    ĐỊA CHỈ
                  </th>
                  <th scope="col" className="px-6 py-3 border border-black">
                    GPLX
                  </th>
                  <th scope="col" className="px-6 py-3 border border-black">
                    GPĐT
                  </th>
                  <th scope="col" className="px-6 py-3 border border-black">
                    TÊN THẺ
                  </th>
                  <th scope="col" className="px-6 py-3 border border-black">
                    SỐ THẺ
                  </th>
                  <th scope="col" className="px-6 py-3 border border-black">
                    ĐỒNG BỘ
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 border border-black"
                  ></th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {data.map((element, index) => (
                  <tr key={index} className="border border-black">
                    <td className="py-4 px-4 font-semibold text-gray-900 dark:text-white border border-black">
                      <ul className="flex items-center justify-center">
                        {index + 1}
                      </ul>
                    </td>
                    <td className="px-4 font-semibold text-gray-900 dark:text-white border border-black">
                      <Link className="text-blue-800 cursor-pointer ">
                        <img
                          src={element.image_path}
                          className="h-14 w-14 rounded-xl"
                        />
                      </Link>
                    </td>
                    <td
                      className="px-4 border justify-center border-black"
                      onClick={() => handleTeacherClick(element)}
                    >
                      <Link className="text-blue-800 cursor-pointer ">
                        {element.name}
                      </Link>
                    </td>
                    <td className="border px-4 border-black ">
                      {element.birthday}
                    </td>
                    <td className="border px-4 border-black ">
                      {element.id_card}
                    </td>
                    <td className="border px-4 border-black ">
                      {element.address}
                    </td>
                    <td className="border px-4 border-black ">
                      {element.driving_license_no}
                    </td>
                    <td className="border px-4 border-black ">
                      {element.teaching_license_no}
                    </td>
                    <td className="border px-4 border-black ">
                      {element.rfid_card_name}
                    </td>
                    <td className="border px-4 border-black ">
                      {element.rfid_card}
                    </td>
                    <td className="border px-4 border-black ">
                      {element.synced ? (
                        <AiOutlineCheckCircle className="text-green-500" />
                      ) : (
                        <AiOutlineCloseCircle className="text-red-500" />
                      )}
                    </td>
                    <td className="border px-4 border-black"></td>
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
      {showNotification && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
          <div className="bg-white p-8 rounded-lg">
            <h2 className="text-lg font-semibold mb-4">
              Báo cáo theo giáo viên
            </h2>
            <div className="flex space-x-4">
              <div>
                <h2 className="font-bold">Họ và tên</h2>
                <h3 className="block w-full py-2 px-2 bg-slate-100 border rounded-md">
                  {selectedTeacher.name}
                </h3>
              </div>
              <div>
                <h2 className="font-bold">GPLX</h2>
                <h3 className="block w-full py-2 px-2 bg-slate-100 border rounded-md">
                  {selectedTeacher.driving_license_no}
                </h3>
              </div>
              <div>
                <h2 className="font-bold">GPTL</h2>
                <h3 className="block w-full py-2 px-2 bg-slate-100 border rounded-md">
                  {selectedTeacher.teaching_license_no}
                </h3>
              </div>
              <div>
                <h2 className="font-bold">Từ ngày</h2>
                <DatePicker
                  selected={startDate}
                  onChange={handleStartDateChange}
                  dateFormat="dd/MM/yyyy"
                  className="block w-full py-2 px-2 bg-slate-100  border rounded-md focus:outline-none focus:border-blue-500"
                  id="start"
                  locale={vi}
                />
              </div>
              <div>
                <h2 className="font-bold">Đến ngày</h2>
                <DatePicker
                  selected={endDate}
                  onChange={handleEndDateChange}
                  dateFormat="dd/MM/yyyy"
                  className="block w-full py-2 px-2 bg-slate-100 border rounded-md focus:outline-none focus:border-blue-500"
                  id="start"
                  locale={vi}
                />
              </div>
              <div>
              </div>
            </div>
            {/* <p className="text-sm">{selectedTeacher.id}</p> */}
            <div className="rounded-tl-2xl rounded-tr-2xl pt-4 overflow-x-auto overflow-y-auto h-[300px] w-[900px]">
              <table className="min-w-full divide-gray-200 ">
                <thead className="bg-slate-100">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Phiên
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Biển số
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Bắt đầu
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Kinh độ
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Vĩ độ
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Kết thúc
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Kinh độ
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Vĩ độ
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {dataPopup.map((elementpopup, index) => (
                    <tr className="bg-white">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {elementpopup.session_id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {elementpopup.vehicle_plate}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {format(
                          new Date(elementpopup.start_time),
                          "dd/MM/yyyy HH:mm:ss"
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {elementpopup.start_lat}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {elementpopup.start_lng}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {format(
                          new Date(elementpopup.end_time),
                          "dd/MM/yyyy HH:mm:ss"
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {elementpopup.end_lat}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {elementpopup.end_lng}
                      </td>
                    </tr>
                  ))}
                  {/* Thêm dữ liệu khác nếu cần */}
                </tbody>
              </table>
            </div>
            <button
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={() => setShowNotification(false)} // Close notification
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeacherList;
