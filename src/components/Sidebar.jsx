import React, { useState } from "react";
import { SiLamborghini } from "react-icons/si";
import { useStateContext } from "../contexts/ContextProvider";
import { Link } from "react-router-dom";
import {
  AiFillHome,
  AiFillSetting,
  AiOutlineSetting,
  AiOutlineUser,
  AiFillCloseCircle,
} from "react-icons/ai";
const Sidebar = () => {
  const [dropdownStates, setDropdownStates] = useState({
    heThong: false,
    hocVien: false,
  });

  const toggleDropdown = (dropdownName) => {
    setDropdownStates((prevState) => ({
      ...prevState,
      [dropdownName]: !prevState[dropdownName],
    }));
  };
  const { activeMenu, setActiveMenu } = useStateContext();
  return (
    <div
      className="ml-3 h-screen 
    md:overflow-hidden overflow-auto
    md:hover:overflow-auto pb-10"
    >
      {activeMenu && (
        <>
          <div className="flex justify-between items-center">
            <Link
              to="/"
              onClick={() => {}}
              className="items-center gap-3 ml-3 mt-4
              flex text-xl font-times font-bold
              tracking-tight dark:text-white "
            >
              <SiLamborghini className="bg-white" />
              <span className="text-white">Sát hạch lái xe</span>
            </Link>
            <button
              type="button"
              onClick={() => setActiveMenu((prevActiveMenu) => !prevActiveMenu)}
              className="text-xl rounded-full p-3 hover:bg-gray-700 mt-4 block text-white"
            >
              <AiFillCloseCircle />
            </button>
          </div>
          {/*Trang chủ*/}
          <div className="mt-10">
            <div>
              <div
                className="flex items-center gap-3 ml-3 mt-4 p-2.5 
              cursor-pointer hover:bg-gray-700 text-white "
              >
                <AiFillHome />
                <span>Trang chủ</span>
              </div>
            </div>
          </div>

          {/*Hệ thống*/}
          <div className="mt-5">
            <div
              className={`${
                dropdownStates.heThong ? "text-gray-500" : "text-white"
              }`}
            >
              <div
                className="flex items-center gap-3 ml-3 mt-4 p-2.5 
                cursor-pointer hover:bg-gray-700 text-white "
                onClick={() => toggleDropdown("heThong")}
              >
                <AiFillSetting />
                <span>Hệ thống</span>
                <span
                  className={`transform ${
                    dropdownStates.heThong ? "rotate-0" : "rotate-180"
                  } mt-1`}
                >
                  {/* Chevron icon or arrow down/up icon */}
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                    <path d="M10 18a1 1 0 01-.7-.29l-8-8a1 1 0 011.4-1.42L10 15.59l7.3-7.3a1 1 0 111.4 1.42l-8 8a1 1 0 01-.7.3z" />
                  </svg>
                </span>
              </div>
              {dropdownStates.heThong && (
                <ul className="mt-2">
                  <li className="hover:bg-gray-700 py-1 px-12 cursor-pointer text-white">
                    Thiết bị DAT 1
                  </li>
                  <li className="hover:bg-gray-700 py-1 px-12 cursor-pointer text-white">
                    Xe tập lái
                  </li>
                  <li className="hover:bg-gray-700 py-1 px-12 cursor-pointer text-white">
                    Danh sách thẻ
                  </li>
                  <li className="hover:bg-gray-700 py-1 px-12 cursor-pointer text-white">
                    Danh sách giáo viên
                  </li>
                </ul>
              )}
            </div>
          </div>

          {/*Học viên*/}
          <div className="mt-5">
            <div
              className={`${
                dropdownStates.hocVien ? "text-gray-500" : "text-white"
              }`}
            >
              <div
                className="flex items-center gap-3 ml-3 mt-4 p-2.5 
                                cursor-pointer hover:bg-gray-700 text-white "
                onClick={() => toggleDropdown("hocVien")}
              >
                <AiOutlineUser />
                <span>Học viên</span>
                <span
                  className={`transform ${
                    dropdownStates.hocVien ? "rotate-0" : "rotate-180"
                  } ml-1 mt-1`}
                >
                  {/* Chevron icon or arrow down/up icon */}
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                    <path d="M10 18a1 1 0 01-.7-.29l-8-8a1 1 0 011.4-1.42L10 15.59l7.3-7.3a1 1 0 111.4 1.42l-8 8a1 1 0 01-.7.3z" />
                  </svg>
                </span>
              </div>
              {dropdownStates.hocVien && (
                <ul className="sidebar-menu">
                  <li className="hover:bg-gray-700 py-1 px-12 cursor-pointer text-white">
                    <Link to="/course">Danh sách khoá học</Link>
                  </li>
                  <li className="hover:bg-gray-700 py-1 px-12 cursor-pointer text-white">
                    <Link to="/testing">Danh sách học viên</Link>
                  </li>
                  <li className="hover:bg-gray-700 py-1 px-12 cursor-pointer text-white">
                    Danh sách phiên học
                  </li>
                  <li className="hover:bg-gray-700 py-1 px-12 cursor-pointer text-white">
                    Giám sát thực hành
                  </li>
                  <li className="hover:bg-gray-700 py-1 px-12 cursor-pointer text-white">
                    Xem dữ liệu
                  </li>
                </ul>
              )}
            </div>
          </div>

          {/*  */}
        </>
      )}
    </div>
  );
};

export default Sidebar;
