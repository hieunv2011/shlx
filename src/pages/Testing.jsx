import React, { useState, useEffect } from "react";
import axios from "axios";
import { Footer, Navbar, TrainnesPopup, TraineesSearch, Sidebar } from "../components";
import { Link } from "react-router-dom";
import { AiFillCaretRight, AiFillCaretLeft } from "react-icons/ai";
import { useStateContext } from "../contexts/ContextProvider";
import SplitPane, { Pane } from "split-pane-react";
import "split-pane-react/esm/themes/default.css";
import { Split } from "uiw";


const Testing = ({ onSelect }) => {
  const [data, setData] = useState([]);
  const { activePopup, setActivePopup } = useStateContext();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [tableWidth, setTableWidth] = useState("w-11/12");
  const [myVariable, setMyVariable] = useState(1);
  const [selectedTrainee, setSelectedTrainee] = useState(null);
  const [sizes, setSizes] = useState([100, "30%", "auto"]);
  const baseUrl = "https://jira.shlx.vn/v1/trainees?course_id=0&page=";
  const finalUrl = `${baseUrl}${myVariable}`;
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const togglePopup = () => {
    setIsPopupOpen(isPopupOpen === 0 ? 1 : isPopupOpen === 1 ? 1 : 0);
  };
  const closePopup = () => {
    // Khi ấn vào nút đóng popup, chỉ đặt về 0 nếu đang ở trạng thái 1
    if (isPopupOpen === 1) {
      setIsPopupOpen(0);
    }

  };

  const increaseVariable = () => {
    setMyVariable(myVariable + 1);
  };

  const decreaseVariable = () => {
    setMyVariable(myVariable - 1);
  };



  // Lấy data
  useEffect(() => {
    fetchData();
  }, [myVariable]);

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


  return (
    <div className="flex flex-col">
      <Navbar />
      <div className="flex pl-0 flex-col">
        <div className="w-full">
        <div className="ml-48 h-32 bg-slate-100">
          <TraineesSearch onSearch={handleSearch}/>
        </div>

          <Split
            mode="horizontal"
            style={{
              borderRadius: 3,
            }}
            className="w-11/12  border border-inherit ml-48 "
          >
            <div className={tableWidth}>
            <div
              className={`overflow-x-auto w-full h-[690px] mt-0`}
            >
              <table className="border-collapse border w-full">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-1 py-3">
                      
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Tên liên lạc
                    </th>
                    <th scope="col" className="py-3">
                      Ảnh
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Mã đăng ký
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Ngày sinh
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Số CMT
                    </th>

                  </tr>
                </thead>
                <tbody className="text-sm">
                  {data.map((element, index) => (
                    <tr key={index}>
                      <td className="py-4 font-semibold text-gray-900 dark:text-white">
                        <ul className="flex items-center justify-center">
                          {index + 1}
                        </ul>
                      </td>
                      <td className="font-semibold text-gray-900 dark:text-white border">
                        <Link
                          className="text-blue-800 cursor-pointer "
                          onClick={() =>
                            handleLinkClick(element.id, element.ho_va_ten)
                          }
                        >
                          {element.ho_va_ten}
                        </Link>
                      </td>
                      <td className="border  justify-center">
                        <Link
                          className="text-blue-800 underline cursor-pointer "
                          onClick={() => console.log("Ấn ảnh")}
                        >
                          <img
                            src={element.anh_chan_dung}
                            className="h-14 w-14 rounded-xl"
                            alt={`Avatar ${element.ho_va_ten}`}
                          />
                        </Link>
                      </td>
                      <td className="border ">
                        {element.ma_dk}
                      </td>
                      <td className="border ">
                        {element.ngay_sinh}
                      </td>
                      <td className="border ">
                        {element.so_cmt}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            </div>                 
            <div className={`${isPopupOpen ? "block" : "hidden"}`}>
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
          </Split>
        </div>
        <div className="mx-auto mb-4">
          <div className="flex items-center">
            <button
              className="text-blue-800 cursor-pointer"
              onClick={decreaseVariable}
              disabled={myVariable === 1}
            >
              <AiFillCaretLeft size={20} />
            </button>
            <span className="mx-4 text-xl text-blue-800 cursor-pointer">
              {" "}
              {myVariable}
            </span>
            <button className="text-blue-800" onClick={increaseVariable}>
              <AiFillCaretRight size={20} />
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Testing;
