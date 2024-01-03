import React, { useState, useEffect } from "react";
import SplitPane, { Pane } from "split-pane-react";
import "split-pane-react/esm/themes/default.css";
import { Footer, Navbar, Sidebar, TrainnesPopup } from "../components";
import axios from "axios";
import { Link } from "react-router-dom";
import { IoIosCloseCircle } from "react-icons/io";

function Basic() {
  const [showPane2, setShowPane2] = useState(false);
  const [sizes, setSizes] = useState([100, 0, "auto"]);

  const [data, setData] = useState([]);
  const [myVariable, setMyVariable] = useState(1);
  const [selectedTrainee, setSelectedTrainee] = useState(null);
  const baseUrl = "https://jira.shlx.vn/v1/trainees?course_id=0&page=";
  const finalUrl = `${baseUrl}${myVariable}`;

  const handleClick = (id, ho_va_ten) => {
    setShowPane2(true);
    setSizes([70, 30, "auto"]);
    console.log(`Selected Trainee ID: ${id}, Name: ${ho_va_ten}`);
    setSelectedTrainee({ id, ho_va_ten });
  };
  const handleCloseClick = (id, ho_va_ten) => {
    setShowPane2(false);
    setSizes([100, 0, "auto"]);
    console.log(`Selected Trainee ID: ${id}, Name: ${ho_va_ten}`);
    setSelectedTrainee({ id, ho_va_ten });
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

  return (
    <div className="h-screen relative">
      <Navbar className="" />

      <SplitPane
        split="vertical"
        sizes={sizes}
        onChange={setSizes}
        className="relative"
      >
        <div className="overflow-x-auto max-h-screen">
          <table className="border-collapse border w-full">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-1 py-3">
                  STT
                </th>
                <th scope="col" className="px-6 py-3">
                  Tên liên lạc
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
                <th scope="col" className="px-6 py-3">
                  Ảnh
                </th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {data.map((element, index) => (
                <tr key={index}>
                  <td className="py-4 font-semibold text-gray-900 dark:text-white border border-black">
                    <ul className="flex items-center justify-center">
                      {index + 1}
                    </ul>
                  </td>
                  <td className="p-2 font-semibold text-gray-900 dark:text-white border border-black">
                    <Link
                      className="text-blue-800 underline cursor-pointer "
                      onClick={() => handleClick(element.id, element.ho_va_ten)}
                    >
                      {element.ho_va_ten}
                    </Link>
                  </td>
                  <td className="border p-2 border-black">{element.ma_dk}</td>
                  <td className="border p-2 border-black">
                    {element.ngay_sinh}
                  </td>
                  <td className="border p-2 border-black">{element.so_cmt}</td>
                  <td className="border p-2 border-black justify-center">
                    <Link
                      className="text-blue-800 underline cursor-pointer "
                      onClick={() => console.log("Ấn ảnh")}
                    >
                      <img
                        src={element.anh_chan_dung}
                        className="h-8 w-8"
                        alt={`Avatar ${element.ho_va_ten}`}
                      />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Pane minSize="30%" maxSize="100%" className="flex flex-col relative">
          {showPane2 && (
            <div className="flex items-center justify-between bg-gray-300 p-4">
              <h1 className="text-left text-2xl font-bold ml-4">
                {selectedTrainee
                  ? `${selectedTrainee.ho_va_ten} (ID: ${selectedTrainee.id})`
                  : "Default Heading"}
              </h1>
              <div className="flex items-center">
                <IoIosCloseCircle
                  className="cursor-pointer text-4xl"
                  onClick={handleCloseClick}
                />
              </div>
            </div>
          )}
          {selectedTrainee ? (
            <TrainnesPopup
              traineeId={selectedTrainee.id}
              traineeName={selectedTrainee.ho_va_ten}
            />
          ) : (
            <div className="flex-grow">
              {/* Default content when selectedTrainee is not chosen */}
              <p className="text-center text-gray-500">
                Select a trainee to display details.
              </p>
            </div>
          )}
        </Pane>
      </SplitPane>

      <Footer />
    </div>
  );
}

export default Basic;

