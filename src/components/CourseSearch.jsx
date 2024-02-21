import React, { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";

const CourseSearch = ({ onSubmitName, onSubmitId, onSelectStatus,onSubmitCourse,onSelectSynced }) => {
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [data, setData] = useState([]);
  const baseUrl = "https://jira.shlx.vn/v1/courses";
  const [selectedSyncOption, setSelectedSyncOption] = useState(null); // Thêm state cho select thứ ba

  const options = [
    { value: -1, label: "Tất cả" },
    { value: 0, label: "Chưa diễn ra" },
    { value: 1, label: "Học lý thuyết" },
    { value: 2, label: "Học thực hành" },
    { value: 3, label: "Kết thúc" }
  ];
  const handleSyncChange = (selectedOption) => {
    setSelectedSyncOption(selectedOption);
  };

  const handleSubmit = () => {
    if (!name && !id&& !selectedSyncOption) {
        onSubmitName("");
        onSubmitId("")
        onSelectSynced("-1");
      }
    if (name) {
      onSubmitName(name);
    }
    if (id) {
      onSubmitId(id);
    }
    if (selectedSyncOption) {
      onSelectSynced(selectedSyncOption);
    }
  };
  const handleReset = () => {
    setName("");
    setId("");
    setSelectedSyncOption(-1);
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

  return (
    <div className="flex items-center space-x-2 py-6">
      <div className="flex items-center">
        <h1 className="text-xl font-bold ml-8">Mã khoá học</h1>
        <input
          type="text"
          placeholder="Tìm kiếm"
          className="px-1 py-2 mx-8 border rounded-md focus:outline-none focus:border-blue-500"
          onChange={(e) => setId(e.target.value)}
        />
      </div>
      <div className="flex items-center">
        <h1 className="text-xl font-bold ml-8">Tên khoá học</h1>
        <input
          type="text"
          placeholder="Tìm kiếm"
          className="px-1 py-2 mx-8 border rounded-md focus:outline-none focus:border-blue-500"
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="flex items-center">
        <h1 className="text-xl font-bold ">Trạng thái</h1>
        <Select
          placeholder="Tất cả"
          value={selectedSyncOption}
          onChange={handleSyncChange}
          options={options}
          className="w-40 px-1 py-2 mx-8 rounded-md focus:outline-none focus:border-blue-500"
        />
      </div>
      <button
        className="px-4 py-2 mt-7 bg-blue-500 text-white rounded-md cursor-pointer"
        onClick={handleSubmit}
      >
        Tìm kiếm
      </button>
      <button
        className="px-4 py-2 mt-7 bg-blue-500 text-white rounded-md cursor-pointer"
        onClick={handleReset}
      >
        Mặc định
      </button>
    </div>
  );
};

export default CourseSearch;
