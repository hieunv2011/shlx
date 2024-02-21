import React, { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";

const TraineesSearch = ({ onSubmitName,onSubmitCmt,onSubmitGpdt,onSubmitGplx,onSelectSynced }) => {
  const [name, setName] = useState("");
  const [cmt,setCmt] =useState("");
  const [gplx,setGplx]=useState("");
  const [gpdt,setGpdt]=useState("");

  const [selectedSyncOption, setSelectedSyncOption] = useState(null);

  const options = [
    { value: -1, label: "Tất cả" },
    { value: 0, label: "Lỗi" },
    { value: 1, label: "Thành công" },
  ];

  const handleSyncChange = (selectedOption) => {
    setSelectedSyncOption(selectedOption);
  };

  const handleSubmit = () => {
    if (!name && !cmt && !gplx && !gpdt && !selectedSyncOption) {
      onSubmitName("");
      onSubmitGplx("");
      onSubmitGpdt("");
      onSubmitCmt("");
      onSelectSynced("-1");
    }
    if (name) {
      onSubmitName(name);
    }
    if(cmt){
      onSubmitCmt(cmt);
    }
    if(gplx){
      onSubmitGplx(gplx);
    }
    if(gpdt){
      onSubmitGpdt(gpdt);
    }
    if (selectedSyncOption) {
      onSelectSynced(selectedSyncOption);
    }
  };
  const handleReset = () => {
    setName("");
    setSelectedSyncOption(-1);
  };

  return (
    <div className="flex items-center space-x-2 ml-12">
      <div className="my-6 px-1">
        <h1 className="text-base font-bold">Họ tên </h1>
        <input
          type="text"
          placeholder="Tìm kiếm"
          className="px-1 py-2  border rounded-md focus:outline-none focus:border-blue-500"
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <h1 className="text-base font-bold">CMT</h1>
        <input
          type="text"
          placeholder="Tìm kiếm"
          className="px-1 py-2  border rounded-md focus:outline-none focus:border-blue-500"
          onChange={(e) => setCmt(e.target.value)}
        />
      </div>
      <div>
        <h1 className="text-base font-bold ml-8">GPLX</h1>
        <input
          type="text"
          placeholder="Tìm kiếm"
          className="px-1 py-2 mx-8 border rounded-md focus:outline-none focus:border-blue-500"
          onChange={(e) => setGplx(e.target.value)}
        />
      </div>
      <div>
        <h1 className="text-base font-bold ml-8">GPĐT</h1>
        <input
          type="text"
          placeholder="Tìm kiếm"
          className="px-1 py-2 mx-8 border rounded-md focus:outline-none focus:border-blue-500"
          onChange={(e) => setGpdt(e.target.value)}
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
        // onClick={handleReset}
      >
        Mặc định
      </button>
    </div>
  );
};

export default TraineesSearch;
