import React, { useState, useEffect } from "react";
import axios from "axios";
import { useStateContext } from "../contexts/ContextProvider";
import { IoIosCloseCircleOutline } from "react-icons/io";

const TrainnesPopup = ({ traineeId, traineeName,onClose }) => {
  const { setActivePopup } = useStateContext();
  const [data, setData] = useState([]);
  const baseUrl = "https://jira.shlx.vn/v1/outdoor-sessions?trainee_id=";
  const finalUrl = `${baseUrl}${traineeId}`;
  const handleClose = () => {
    onClose(); // Gọi hàm onClose từ Testing component
  };
  useEffect(() => {
    fetchData();
  }, [traineeId]);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("userToken");
      const response = await axios.get(finalUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response);
      const formattedData = response.data.map((element) => {
        const durationInSeconds = isNaN(parseInt(element.duration, 10)) ? 0 : parseInt(element.duration, 10);

        const hours = Math.floor(durationInSeconds / 3600);
        const minutes = Math.floor((durationInSeconds % 3600) / 60);
        const duration = `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
        return {
          ...element,
          duration: duration,
        };
      });
      setData(formattedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="mr-0">
      {/* <h1 className="text-2xl font-bold mb-4 ml-4 ">{traineeName}</h1> */}
      <div className="overflow-x-auto max-h-[680px]">
        <div className="flex items-center justify-between mb-4">
        <h1 className="font-semibold text-2xl pl-2">{traineeName}</h1>
        <IoIosCloseCircleOutline className="text-3xl cursor-pointer" onClick={handleClose}/>
        </div>

        <table className="border-collapse border w-full">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-1 py-3">
                STT
              </th>
              <th scope="col" className="px-6 py-3">
                Ngày, giờ
              </th>
              <th scope="col" className="px-6 py-3">
                Xe
              </th>
              <th scope="col" className="px-6 py-3">
                Quãng đường
              </th>
              <th scope="col" className="px-6 py-3">
                Thời gian
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
                <td
                  className="p-2 font-semibold text-gray-900 dark:text-white border border-black"
                  key={element.id}
                >
                  {element.start_time}
                </td>
                <td className="border p-2 border-black">
                  <ul>{element.vehicle_plate}</ul>
                </td>
                <td className="border p-2 border-black">
                  <ul>{element.ten_so_gtvt}</ul>
                </td>
                <td className="border p-2 border-black">
                  <ul>{element.duration}</ul>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TrainnesPopup;
