import React from "react";

const TraineesSearch = ({ onSearch }) => {
  return (
    <div className="flex items-center space-x-2 ">
      <div className="my-6">
        <h1 className="text-xl font-bold ml-8">Khoá học</h1>
        <input
          type="text"
          placeholder="Search..."
          className="px-3 py-2  mx-8 border rounded-md focus:outline-none focus:border-blue-500"
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>
      <div>
        <h1 className="text-xl font-bold ml-8">Trạng thái</h1>
        <input
          type="text"
          placeholder="Search..."
          className="px-3 py-2  mx-8 border rounded-md focus:outline-none focus:border-blue-500"
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>
      <div>
        <h1 className="text-xl font-bold ml-8">Họ tên / Mã ĐK / Số CMT</h1>
        <input
          type="text"
          placeholder="Search..."
          className="px-3 py-2  mx-8 border rounded-md focus:outline-none focus:border-blue-500"
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>
      <div>
        <h1 className="text-xl font-bold ml-8">ID thẻ</h1>
        <input
          type="text"
          placeholder="Search..."
          className="px-3 py-2  mx-8 border rounded-md focus:outline-none focus:border-blue-500"
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded-md"
        onClick={() => onSearch("")}
      >
        Clear
      </button>
    </div>
  );
};

export default TraineesSearch;
