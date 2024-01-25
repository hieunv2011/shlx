import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { format, parseISO, differenceInSeconds } from "date-fns";
import { useReactToPrint } from "react-to-print";
import { Navbar } from "../components";

const TraneesSession = ({ onPrint }) => {
  let totalDistance = 0;
  let totalDuration = 0;
  const componentPDF = useRef();

  const { id, course_id, ma_dk } = useParams();
  const [data, setData] = useState([]);
  const [userdata, setUserdata] = useState([]);
  const [coursedata, setCoursedata] = useState([]);

  const baseUrl = "https://jira.shlx.vn/v1/outdoor-sessions?course_id=";
  const finalUrl = `${baseUrl}${course_id}&ho_va_ten=${ma_dk}`;

  const baseUserurl = "https://jira.shlx.vn/v1/trainees/";
  const finalUserurl = `${baseUserurl}${id}`;

  const baseCourseurl = "https://jira.shlx.vn/v1/courses/";
  const finalCourseurl = `${baseCourseurl}${course_id}`;

  //Lấy data
  useEffect(() => {
    fetchData();
    fetchUserData();
    fetchCourseData();
  }, []);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("userToken");
      const response = await axios.get(finalUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const formattedData = response.data.map((element) => {
        const startTime = parseISO(element.start_time);
        const endTime = parseISO(element.end_time);

        const durationInSeconds = differenceInSeconds(endTime, startTime);
        const hours = Math.floor(durationInSeconds / 3600);
        const minutes = Math.floor((durationInSeconds % 3600) / 60);
        const seconds = durationInSeconds % 60;
        const duration = `${String(hours).padStart(2, "0")}:${String(
          minutes
        ).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

        return {
          ...element,
          start_time: format(startTime, "dd/MM/yyyy"),
          end_time: format(endTime, "dd/MM/yyyy HH:mm:ss"),
          duration: duration,
        };
      });
      setData(formattedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem("userToken");
      const responseUser = await axios.get(finalUserurl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUserdata(responseUser.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchCourseData = async () => {
    try {
      const token = localStorage.getItem("userToken");
      const responseCourse = await axios.get(finalCourseurl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCoursedata(responseCourse.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const generatePDF = useReactToPrint({
    content: () => componentPDF.current,
    documentTitle: `Báo cáo quá trình đào tạo của học viên -${userdata.ho_va_ten}`,
    onAfterPrint: () => {
      alert("Data saved in PDF");
    },
  });

  //Tổng thời gian
  let totalDurationInSeconds = 0;
  data.forEach((element) => {
    const [hoursStr, minutesStr, secondsStr] = element.duration.split(":");
    totalDurationInSeconds +=
      parseInt(hoursStr) * 3600 +
      parseInt(minutesStr) * 60 +
      parseInt(secondsStr);
  });

  const totalHours = Math.floor(totalDurationInSeconds / 3600);
  const totalMinutes = Math.floor((totalDurationInSeconds % 3600) / 60);
  const totalSeconds = totalDurationInSeconds % 60;

  useEffect(() => {
    if (onPrint) {
      onPrint(generatePDF);
    }
  }, [onPrint, generatePDF]);

  return (
    <div>
      <Navbar/>
      <button
        className="px-4 py-2 bg-blue-700 text-white hover:bg-blue-800"
        onClick={generatePDF}
      >
        Xuất file pdf
      </button>
      <div
        ref={componentPDF}
        className="h-a4 w-a4 mt-4 ml-8 border border-black pl-24 pr-10"
      >
        <div className="flex flex-row items-center w-full pt-28 justify-center">
          <div className="flex flex-col  w-1/2 pr-4 items-center justify-center">
            <h1 className="font-times font-bold text-xs">
              BÁO CÁO QUÁ TRÌNH ĐÀO TẠO CỦA HỌC VIÊN
            </h1>
            <h2 className="font-times font-bold text-xs">
              (Ngày báo cáo: ngày ... tháng ... năm ...)
            </h2>
          </div>
        </div>
        <h1 className="font-times font-bold text-xs ml-4">
          I. Thông tin học viên
        </h1>
        <div className="flex flex-row items-center ml-4 mr-4 border border-black h-32">
          <div className="flex flex-col ml-4 mt-0 ">
            <h1 className="text-sm font-times">Họ và tên: </h1>
            <h1 className="text-sm font-times">Mã học viên: </h1>
            <h1 className="text-sm font-times">Ngày sinh: </h1>
            <h1 className="text-sm font-times">Hạng đào tạo: </h1>
            <h1 className="text-sm font-times">Khoá học: </h1>
            <h1 className="text-sm font-times">Cơ sở đào tạo: </h1>
          </div>
          <div className="flex flex-col ml-4 mt-0 ">
            <h1 className="text-sm font-times">{userdata.ho_va_ten}</h1>
            <h1 className="text-sm font-times">{userdata.ma_dk}</h1>
            <h1 className="text-sm font-times">{userdata.ngay_sinh}</h1>
            <h1 className="text-sm font-times">{userdata.hang_daotao}</h1>
            <h1 className="text-sm font-times">{coursedata.ma_khoa_hoc}</h1>
            <h1 className="text-sm font-times">{coursedata.ten_csdt}</h1>
          </div>
          <img
            src={userdata.anh_chan_dung}
            alt="Ảnh của bạn"
            className="pl-10 h-28"
          />
        </div>
        <h1 className="font-times font-bold text-xs ml-4">
          II. Thông tin quá trình đào tạo
        </h1>
        <div className="flex flex-row items-center ml-4 mr-4 mt-24 h-32">
          <table className="border-collapse border items-center border-black w-full ">
            <thead>
              <tr>
                <th className="border font-times border-black">STT</th>
                <th className="border font-times border-black">
                  Phiên đào tạo
                </th>
                <th className="border font-times border-black">
                  Biển số xe tập lái
                </th>
                <th className="border font-times border-black">Ngày đào tạo</th>
                <th className="border font-times border-black">Thời gian</th>
                <th className="border font-times border-black">Quãng đường</th>
              </tr>
            </thead>
            <tbody>
              {data.map((element, index) => {
                const distance = parseFloat(element.distance);
                const duration = parseFloat(element.duration);
                totalDistance += distance;
                totalDuration += duration;
                return (
                  <tr key={index}>
                    <td className="border font-times border-black ">
                      <ul>{index + 1}</ul>
                    </td>
                    <td className="border font-times border-black ">
                      <ul>{element.session_id}</ul>
                    </td>
                    <td className="border font-times border-black">
                      <ul>{element.vehicle_plate}</ul>
                    </td>
                    <td className="border font-times border-black">
                      <ul>{element.start_time}</ul>
                    </td>
                    <td className="border font-times border-black">
                      <ul>{element.duration}</ul>
                    </td>
                    <td className="border font-times border-black">
                      <ul>
                        {parseFloat(element.distance).toLocaleString("en-US")}
                      </ul>
                    </td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr>
                <td
                  colSpan="4"
                  className="border p-2 border-black text-right font-bold font-times"
                >
                  Tổng quãng đường:
                </td>
                <td className="border p-2 border-black font-times font-bold">
                  {totalHours}:{totalMinutes < 10 ? '0' + totalMinutes : totalMinutes}:{totalSeconds < 10 ? '0' + totalSeconds : totalSeconds}
                </td>
                <td className="border p-2 border-black font-times font-bold">
                  {totalDistance.toLocaleString("en-US", {})}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TraneesSession;
