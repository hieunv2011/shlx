import React, { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";

const DatDeviceSearch = ({ onSubmitName, onSubmitId, onSubmitMainboard, onSelectStatus,}) => {
  const [name, setName] = useState("");
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
    if (!name && !id && !mainboard &&!selectedCourseOption && !selectedStatusOption && !selectedSyncOption) {
      console.log("ê");

      onSubmitName("");
      onSubmitMainboard("");
      onSubmitId("")
      onSelectStatus("-1")
    }
    if (name) {
      onSubmitName(name);
    }
    if (id) {
      onSubmitId(id);
    }
    if(mainboard){
        onSubmitMainboard(mainboard);
    }
    if (selectedStatusOption) {
      onSelectStatus(selectedStatusOption);
    }
  };
  const handleReset = () => {
    setName("");
    setId("");
    setMainboard("");
    setSelectedCourseOption(0);
    setSelectedStatusOption(-1);
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
    <div className="flex items-center space-x-2">
      <div className="my-6 px-1">
        <h1 className="text-base font-bold ">Tên máy</h1>
        <input
          type="text"
          placeholder="Tên máy ..."
          className="py-2 border rounded-md focus:outline-none focus:border-blue-500"
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <h1 className="text-base font-bold">Số Serial</h1>
        <input
          type="text"
          placeholder="Số serial ..."
          className="py-2 border rounded-md focus:outline-none focus:border-blue-500"
          onChange={(e) => setId(e.target.value)}
        />
      </div>
      <div>
        <h1 className="text-base font-bold ml-8">Mainboard</h1>
        <input
          type="text"
          placeholder="Mainboard ..."
          className="px-1 py-2 mx-8 border rounded-md focus:outline-none focus:border-blue-500"
          onChange={(e) => setMainboard(e.target.value)}
        />
      </div>
      <div>
        <h1 className="text-base font-bold ">Trạng thái</h1>
        <Select
          placeholder="Tất cả"
          value={selectedStatusOption}
          onChange={handleChange}
          options={options}
          className="w-40"
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
        Thêm
      </button>
    </div>
  );
};

export default DatDeviceSearch;
