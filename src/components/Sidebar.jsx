import React, { useState } from "react";
import { useStateContext } from "../contexts/ContextProvider";
import { Link } from "react-router-dom";
import { FaMapLocation, FaCar, FaIdCard } from "react-icons/fa6";
import { FaUserCircle } from "react-icons/fa";

import { PiUserListFill } from "react-icons/pi";
import {
  AiFillHome,
  AiFillSetting,
  AiOutlineSetting,
  AiOutlineUser,
  AiFillCloseCircle,
} from "react-icons/ai";
import { FaHome } from "react-icons/fa";
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
            <button
              type="button"
              onClick={() => setActiveMenu((prevActiveMenu) => !prevActiveMenu)}
              className="text-xl rounded-full p-3 hover:bg-gray-700 mt-4 block text-white"
            >
              <AiFillCloseCircle />
            </button>

            <Link
              to="/"
              onClick={() => {}}
              className="items-center gap-3 ml-3 mt-4
              flex text-xl font-times font-bold
              tracking-tight dark:text-white "
            >
              <span className="text-white">Sát hạch lái xe</span>
            </Link>
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
                    <button>
                    <Link to="/datdevice">Thiết bị DAT </Link>
                    </button>
                  </li>
                  <li className="hover:bg-gray-700 py-1 px-12 cursor-pointer text-white">
                    <button>
                    <Link to="/trainningcar">Xe tập lái </Link>
                    </button>
                  </li>
                  <li className="hover:bg-gray-700 py-1 px-12 cursor-pointer text-white">
                    <button>
                    <Link to="/rfcard">Danh sách thẻ</Link>
                    </button>
                  </li>
                  <li className="hover:bg-gray-700 py-1 px-12 cursor-pointer text-white">
                  <button>
                    <Link to="/teacherlist">Danh sách giáo viên</Link>
                    </button>
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

        // <>
        //   <aside
        //     id="separator-sidebar"
        //     class="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
        //     aria-label="Sidebar"
        //   >
        //     <div class="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
        //       <button
        //         type="button"
        //         onClick={() =>
        //           setActiveMenu((prevActiveMenu) => !prevActiveMenu)
        //         }
        //         className="text-xl rounded-full p-3 hover:bg-gray-700 mt-4 block text-black"
        //       >
        //         <AiFillCloseCircle />
        //       </button>
        //       <ul class="space-y-2 font-medium">
        //         <li>
        //           <a
        //             href="#"
        //             class="flex text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
        //           >
        //             <svg class="w-10 h-10 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white">
        //               <AiFillHome className="text-3xl" />
        //             </svg>
        //             <span class="ms-3 text-lg">Trang chủ</span>
        //           </a>
        //         </li>

        //         {/* Hệ thống */}
        //         <li>
        //           <a
        //             href="#"
        //             className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ${
        //               dropdownStates.heThong ? "text-gray-500" : "tẽ"
        //             }`}
        //             onClick={() => toggleDropdown("heThong")}
        //           >
        //             <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white">
        //               <AiFillSetting />
        //             </svg>
        //             <span className="flex-1 ms-3 whitespace-nowrap">
        //               Hệ thống
        //             </span>
        //             <span
        //               className={`transform ${
        //                 dropdownStates.heThong ? "rotate-0" : "rotate-180"
        //               } mt-1`}
        //             >
        //               {/* Chevron icon or arrow down/up icon */}
        //               <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
        //                 <path d="M10 18a1 1 0 01-.7-.29l-8-8a1 1 0 011.4-1.42L10 15.59l7.3-7.3a1 1 0 111.4 1.42l-8 8a1 1 0 01-.7.3z" />
        //               </svg>
        //             </span>
        //           </a>
        //           {dropdownStates.heThong && (
        //             <ul className="mt-2">
        //               <li className="hover:bg-gray-700 py-1 ms-3 cursor-pointer text-black">
        //                 <div className="flex items-center">
        //                   <span className="mr-2">
        //                     <FaMapLocation />
        //                   </span>
        //                   <span>Thiết bị DAT </span>
        //                 </div>
        //               </li>
        //               <li className="hover:bg-gray-700 py-1 ms-3 cursor-pointer text-black">
        //                 <div className="flex items-center">
        //                   <span className="mr-2">
        //                     <FaCar />
        //                   </span>
        //                   <span>Xe tập lái</span>
        //                 </div>
        //               </li>
        //               <li className="hover:bg-gray-700 py-1 ms-3 cursor-pointer text-black">
        //                 <div className="flex items-center">
        //                   <span className="mr-2">
        //                     <FaIdCard />
        //                   </span>
        //                   <span>Danh sách thẻ</span>
        //                 </div>
        //               </li>
        //               <li className="hover:bg-gray-700 py-1 ms-3 cursor-pointer text-black">
        //                 <div className="flex items-center">
        //                   <span className="mr-2">
        //                     <PiUserListFill />
        //                   </span>
        //                   <span>Danh sách giáo viên</span>
        //                 </div>
        //               </li>
        //             </ul>
        //           )}
        //         </li>

        //         {/* Học viên */}

        //         <li>
        //           <a
        //             href="#"
        //             class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
        //           >
        //             <svg class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white">
        //               <FaUserCircle />
        //             </svg>
        //             <span class="flex-1 ms-3 whitespace-nowrap">Học viên</span>
        //           </a>
        //         </li>
        //       </ul>
        //     </div>
        //   </aside>
        // </>
      )}
    </div>
  );
};

export default Sidebar;
