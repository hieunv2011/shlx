import React, { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";

const TraineesSearch = ({ onSubmitName, onSubmitId, onSelectStatus,onSubmitCourse,onSelectSynced }) => {
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [data, setData] = useState([]);
  const baseUrl = "https://jira.shlx.vn/v1/courses";

  const [selectedCourseOption, setSelectedCourseOption] = useState(null);
  const [selectedStatusOption, setSelectedStatusOption] = useState(null);
  const [selectedSyncOption, setSelectedSyncOption] = useState(null); // Thêm state cho select thứ ba

  const options = [
    { value: -1, label: "Tất cả" },
    { value: 0, label: "Lỗi" },
    { value: 1, label: "Thành công" },
  ];

  const stateOptions = [
    { value: -1, label: "Tất cả" },
    { value: 0, label: "Đang diễn ra" },
    { value: 1, label: "Kết thúc" },
  ];

  const handleChange = (selectedOption) => {
    setSelectedStatusOption(selectedOption);
  };

  const handleCourseChange = (selectedOption) => {
    setSelectedCourseOption(selectedOption);
  };

  const handleSyncChange = (selectedOption) => {
    setSelectedSyncOption(selectedOption);
  };

  const handleSubmit = () => {
    if (!name && !id && !selectedCourseOption && !selectedStatusOption && !selectedSyncOption) {
      console.log("ê");
      onSubmitCourse("");
      onSubmitName("");
      onSubmitId("")
      onSelectStatus("-1")
      onSelectSynced("-1");
    }
    if (name) {
      onSubmitName(name);
    }
    if (id) {
      onSubmitId(id);
    }
    if (selectedStatusOption) {
      onSelectStatus(selectedStatusOption);
    }
    if (selectedCourseOption) {
      onSubmitCourse(selectedCourseOption);
    }
    if (selectedSyncOption) {
      onSelectSynced(selectedSyncOption);
    }
  };
  const handleReset = () => {
    setName("");
    setId("");
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
    <div className="flex items-center space-x-2 w-full">
      <div className="my-3 px-1">
        <h1 className="text-base font-bold">Khoá học</h1>
        <Select
          placeholder="Không xác định"
          value={selectedCourseOption}
          onChange={handleCourseChange}
          options={[
            { value: 0, label: "Không xác định" },
            ...data.map((course) => ({
              value: course.id,
              label: course.ten_khoa_hoc,
            })),
          ]}
          className="w-50"
          styles={{
            control: (provided) => ({
              ...provided,
              width: "200px", 
            }),
          }}
        />
      </div>
      <div>
        <h1 className="text-base font-bold">Trạng thái</h1>
        <Select
          placeholder="Tất cả"
          value={selectedStatusOption}
          onChange={handleChange}
          options={stateOptions}
          className="w-40"
        />
      </div>
      <div>
        <h1 className="text-base font-bold ml-8">Họ tên / Mã ĐK / Số CMT</h1>
        <input
          type="text"
          placeholder="Tìm kiếm"
          className="px-1 py-2 mx-8 border rounded-md focus:outline-none focus:border-blue-500"
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <h1 className="text-base font-bold ml-8">ID thẻ</h1>
        <input
          type="text"
          placeholder="Tìm kiếm"
          className="px-1 py-2 mx-8 border rounded-md focus:outline-none focus:border-blue-500"
          onChange={(e) => setId(e.target.value)}
        />
      </div>
      <div>
        <h1 className="text-base font-bold ">Đồng bộ</h1>
        <Select
          placeholder="Tất cả"
          value={selectedSyncOption}
          onChange={handleSyncChange}
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
        Mặc định
      </button>
    </div>
  );
};

export default TraineesSearch;
