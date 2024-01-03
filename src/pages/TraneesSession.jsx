import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Navbar } from "../components";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { format, parseISO, differenceInSeconds } from "date-fns";
import { useReactToPrint } from "react-to-print";
const TraneesSession = () => {
  let totalDistance = 0;
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
  }, []);
  useEffect(() => {
    fetchUserData();
  }, []);
  useEffect(() => {
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
      console.log(response);
      // Chuyển đổi start_time từ ISO 8601 sang "dd/MM/yyyy HH:mm:ss"
        const formattedData = response.data.map((element) => {
        const startTime = parseISO(element.start_time);
        const endTime = parseISO(element.end_time);

        // Tính thời gian giữa start_time và end_time (đơn vị: giây)
        const durationInSeconds = differenceInSeconds(endTime, startTime);
        const hours = Math.floor(durationInSeconds / 3600);
        const minutes = Math.floor((durationInSeconds % 3600) / 60);
        const seconds = durationInSeconds % 60;
        const duration = `${String(hours).padStart(2, "0")}:${String(
          minutes
        ).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

        // Chuyển đổi thời gian thành "giờ:phút"
        //const duration = format(new Date(durationInSeconds * 1000), "HH:mm:ss");

        return {
          ...element,
          start_time: format(startTime, "dd/MM/yyyy HH:mm:ss"),
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
      const token = localStorage.getItem("userToken"); // Replace with your actual token
      const responseUser = await axios.get(finalUserurl, {
        headers: {
          Authorization: `Bearer ${token}`,
          // Add other headers if needed
        },
      });
      setUserdata(responseUser.data);
      console.log("User: ");
      console.log(responseUser);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchCourseData = async () => {
    try {
      const token = localStorage.getItem("userToken"); // Replace with your actual token
      const responseCourse = await axios.get(finalCourseurl, {
        headers: {
          Authorization: `Bearer ${token}`,
          // Add other headers if needed
        },
      });
      setCoursedata(responseCourse.data);
      console.log("Course: ");
      console.log(responseCourse);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleLinkClick = (id, ho_va_ten) => {
    console.log(`Selected Trainee ID: ${id}, Name: ${ho_va_ten}`);
    // You can perform additional actions here if needed
  };
  const generatePDF = useReactToPrint({
    content: () => componentPDF.current,
    documentTitle: `Báo cáo quá trình đào tạo của học viên -${userdata.ho_va_ten}`,
    onAfterPrint: () => {
      alert("Data saved in PDF");
    },
  });
  return (
    <div>
      <Navbar />
      <div ref={componentPDF} className="h-a4 w-a4  mt-4 ml-5 ">
        <div className="flex flex-row items-center w-full pt-10 justify-center">
          <div className="flex flex-col  w-1/2 pr-4 items-center justify-center">
            <h1 className="font-times font-bold text-xs">
              CTY CP CÔNG NGHỆ SÁT HẠCH TOÀN PHƯƠNG
            </h1>
            <h1 className="font-times font-bold text-xs">
              TRUNG TÂM ĐT VÀ SHLX VIỆT THANH{" "}
            </h1>
            <h1 className="font-times font-bold text-xs">***********</h1>
          </div>
          <div className="flex flex-col  w-1/2 pl-4 items-center justify-center">
            <h1 className="font-times font-bold text-xs">
              CỘNG HOÀ XÃ HỘI CHỦ NGHĨA VIỆT NAM
            </h1>
            <h1 className="font-times font-bold text-xs">
              Độc lập - Tự do - Hạnh phúc{" "}
            </h1>
            <h1 className="font-times font-bold text-xs">***********</h1>
          </div>
        </div>

        <div className="flex flex-row items-center w-full pt-10 justify-center">
          <div className="flex flex-col  w-1/2 pr-4 items-center justify-center">
            <h1 className="font-times font-bold text-xs">BÁO CÁO</h1>
            <h1 className="font-times font-bold text-xs">
              QUÁ TRÌNH ĐÀO TẠO CỦA HỌC VIÊN{" "}
            </h1>
            <h2 className="font-times font-bold text-xs">
              (Ngày báo cáo: ngày ... tháng ... năm ...)
            </h2>
            <h2 className="font-times font-bold text-xs">
              I. Thông tin học viên
            </h2>
          </div>
        </div>
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
        <div className="flex flex-row items-center w-full pt-4 justify-center">
          <div className="flex flex-col  w-1/2 pr-4 items-center justify-center">
            <h1 className="font-times font-bold text-xs">
              II. Thông tin quá trình đào tạo
            </h1>
          </div>
        </div>
        <div className="flex flex-row items-center ml-4 mr-4 mt-28 h-32">
          <table className="border-collapse border items-center border-black w-full ">
            <thead>
              <tr>
                <th className="border font-times border-black">STT</th>
                <th className="border font-times border-black">Phiên đào tạo</th>
                <th className="border font-times border-black">Biển số xe tập lái</th>
                <th className="border font-times border-black">Hạng xe tập lái</th>
                <th className="border font-times border-black">Bắt đầu</th>
                <th className="border font-times border-black">Kết thúc</th>
                <th className="border font-times border-black">Quãng đường</th>
                <th className="border font-times border-black">Thời gian</th>
                <th className="border font-times border-black">Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              {data.map((element, index) => {
                // Parse distance to a float
                const distance = parseFloat(element.distance);
                // Add the distance to the total
                totalDistance += distance;
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
                    <td className="border font-times border-black text-center">
                      <ul>{element.vehicle_hang}</ul>
                    </td>
                    <td className="border font-times border-black">
                      <ul>{element.start_time}</ul>
                    </td>
                    <td className="border font-times border-black">
                      <ul>{element.end_time}</ul>
                    </td>
                    <td className="border font-times border-black">
                      <ul>
                        {parseFloat(element.distance).toLocaleString("en-US")}
                      </ul>
                    </td>
                    <td className="border font-times border-black">
                      <ul>{element.duration}</ul>
                    </td>
                    <td className="border font-times border-black">
                      <ul>Đã kết thúc</ul>
                    </td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr>
                <td
                  colSpan="6"
                  className="border p-2 border-black text-right font-bold font-times"
                >
                  Tổng quãng đường:
                </td>
                <td className="border p-2 border-black font-times font-bold">
                  {totalDistance.toLocaleString("en-US", {})}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
        <div className="flex items-center w-full pt-28 justify-center">
          <div className="flex  w-1/2 pr-4 items-center justify-center">
            <h1 className="font-times font-bold text-xs">
              Tổng hợp kết quả: Quãng đường đào tạo:
            </h1>
            <h1 className="font-times font-bold text-xs">
              {totalDistance.toLocaleString("en-US", {})}
            </h1>
          </div>
        </div>
      </div>
      <div className="m-4 place-content-center">
        <button
          className="px-4 py-2 bg-blue-700 text-white hover:bg-blue-800"
          onClick={generatePDF}
        >
          Xuất file pdf
        </button>
      </div>
    </div>
  );
};


export default TraneesSession;
