import React, { useState, useEffect } from "react";
import axios from "axios";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import { motion } from "framer-motion";
import vi from 'date-fns/locale/vi'

const TrainnigCarSearch = ({
  onSubmitName,onSubmitStartDate,onSubmitEndDate
}) => {
  const [name, setName] = useState("");
  const [submitStartDate, setSubmitStartDate]=useState("");
  const [submitEndDate, setSubmitEndDate]=useState("");
  const [id, setId] = useState("");
  const [mainboard, setMainboard] = useState("");
  const [data, setData] = useState([]);
  const baseUrl = "https://jira.shlx.vn/v1/courses";

  const [selectedCourseOption, setSelectedCourseOption] = useState(null);
  const [selectedStatusOption, setSelectedStatusOption] = useState(null);
  const [selectedSyncOption, setSelectedSyncOption] = useState(null); // Thêm state cho select thứ ba

  const options = [
    { value: -1, label: "Tất cả" },
    { value: 1, label: "Đang hoạt động" },
    { value: 0, label: "Không hoạt động" },
  ];

  const handleChange = (selectedOption) => {
    setSelectedStatusOption(selectedOption);
  };

  const handleSubmit = () => {
    if (
      !name &&
      !submitEndDate &&
      !submitStartDate 
    ) {
      onSubmitName("");
    }
    if (name) {
      onSubmitName(name);
    }
    if (submitEndDate){
      onSubmitEndDate(submitEndDate);
    }
    if (submitStartDate){
      onSubmitStartDate(submitStartDate);
    }
  };
  const handleReset = () => {
    setName("");
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("userToken");
      const response = await axios.get(baseUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setData(response.data.items);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  // Calendar Picker
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  // const handleStartDateChange = (date) => {
  //   const dateObject = new Date(date);
  //   const isoDateStart = dateObject.toISOString();
  //   setStartDate(isoDateStart);
  //   console.log(isoDateStart); // In ra chuỗi ISO 8601
  // };
  const handleStartDateChange = (date) => {
    const dateObject = new Date(date);
    const isoDateStart = dateObject.toISOString();
    setStartDate(isoDateStart);
    setSubmitStartDate(isoDateStart); 
  };
  const handleEndDateChange = (date) => {
    const dateObject = new Date(date);
    const isoDateEnd =dateObject.toISOString();
    setEndDate(isoDateEnd);
    setSubmitEndDate(isoDateEnd);
  };
  useEffect(() => {
    console.log(submitStartDate,submitEndDate);
  }, [submitEndDate,submitStartDate]);
  

  useEffect(() => {
    const nextDay = new Date(startDate);
    nextDay.setDate(nextDay.getDate() + 1); // Tăng thêm một ngày
    setEndDate(nextDay);
  }, [startDate]);

  return (
    <div className="flex items-center space-x-2">
      <div className="my-6 px-1">
        <h1 className="text-base font-bold ">Biển số</h1>
        <input
          type="text"
          placeholder="Tên máy ..."
          className="py-2 border rounded-md focus:outline-none focus:border-blue-500"
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <button
        className="px-4 py-2 mt-6 bg-blue-500 text-white rounded-md cursor-pointer"
        onClick={handleSubmit}
      >
        Tìm kiếm
      </button>
      <button
        className="px-4 py-2 mt-6 bg-blue-500 text-white rounded-md cursor-pointer"
        // onClick={handleReset}
      >
        Thêm
      </button>
      <button
        className="px-4 py-2 mt-6 bg-blue-500 text-white rounded-md cursor-pointer"
        // onClick={handleReset}
      >
        Đồng bộ
      </button>
      <div className="my-6 px-1">
        <h1 className="text-base font-bold ">Từ ngày </h1>
        <motion.div>
          <DatePicker
            selected={startDate}
            onChange={handleStartDateChange}
            dateFormat="dd/MM/yyyy"
            className="block w-full py-2  border rounded-md focus:outline-none focus:border-blue-500"
            id="start"
            locale={vi}
          />
        </motion.div>
      </div>
      <div className="my-6 px-1">
        <h1 className="text-base font-bold ">Đến ngày </h1>
        <motion.div>
          <DatePicker
            selected={endDate}
            onChange={handleEndDateChange}
            dateFormat="dd/MM/yyyy"
            className="block w-full py-2  border rounded-md focus:outline-none focus:border-blue-500"
            id="start"
            locale={vi}
          />
        </motion.div>
      </div>
    </div>
  );
};
export default TrainnigCarSearch;
