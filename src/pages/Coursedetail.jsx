import React, { useState, useEffect } from "react";
import axios from "axios";
import { Navbar, Footer } from "../components";
import { Link, useParams } from "react-router-dom";
import { AiFillCaretRight, AiFillCaretLeft } from "react-icons/ai";

const Coursedetail = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [myVariable, setMyVariable] = useState(1);
  const baseUrl = `https://jira.shlx.vn/v1/trainees?course_id=${id}&page=`;
  const finalUrl = `${baseUrl}${myVariable}`;

  const [printFunction, setPrintFunction] = useState(null);

  const handlePrint = (generatePDF) => {
    setPrintFunction(() => generatePDF);
  };

  const handlePrintClick = () => {
    if (printFunction) {
      printFunction();
    }
  };

  useEffect(() => {
    fetchData();
  }, [myVariable]);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("userToken");
      const response = await axios.get(finalUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setData(response.data.items);
      console.log(response);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleLinkClick = (id, course_id, ma_dk) => {
    console.log(`Selected Trainee ID: ${id}, Course ID: ${course_id}, Name: ${ma_dk}`);
  };

  const increaseVariable = () => {
    setMyVariable(myVariable + 1);
  };

  const decreaseVariable = () => {
    if (myVariable > 1) {
      setMyVariable(myVariable - 1);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex pl-72 flex-col min-h-screen">
        <div className="overflow-x-auto w-11/12 max-h-screen mt-4">
          <table className="border-collapse border w-full">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-1 py-3">
                  STT
                </th>
                <th scope="col" className="px-6 py-3">
                  Họ và tên
                </th>
                <th scope="col" className="px-6 py-3">
                  Ngày sinh
                </th>
                <th scope="col" className="px-6 py-3">
                  Số chứng minh thư
                </th>
                <th scope="col" className="px-6 py-3">
                  Hạng đào tạo
                </th>
                <th scope="col" className="px-6 py-3">
                  ID
                </th>
                <th scope="col" className="px-6 py-3">
                  Mã đăng ký
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
                    <ul className="flex items-center justify-center">{index + 1}</ul>
                  </td>
                  <td className="p-2 font-semibold text-gray-900 dark:text-white border border-black" key={index}>
                    <Link
                      className="text-blue-800 underline cursor-pointer"
                      to={`/traineessession/${element.course_id}/${element.id}/${element.ma_dk}`}
                      onClick={() => handleLinkClick(element.id, element.course_id, element.ma_dk)}
                    >
                      {element.ho_va_ten}
                    </Link>
                  </td>
                  <td className="border p-2 border-black">
                    <ul>{element.ngay_sinh}</ul>
                  </td>
                  <td className="border p-2 border-black">
                    <ul>{element.so_cmt}</ul>
                  </td>
                  <td className="border p-2 border-black">
                    <ul>{element.hang_daotao}</ul>
                  </td>
                  <td className="border p-2 border-black">
                    <ul>{element.course_id}</ul>
                  </td>
                  <td className="border p-2 border-black">
                    <ul>{element.ma_dk}</ul>
                  </td>
                  <td className="border p-2 border-black justify-center">
                    <img src={element.anh_chan_dung} className="w-16 mx-auto" alt={`Avatar ${element.ho_va_ten}`} />
                  </td>
                  <td className="border p-2 border-black">
                    <ul><button onClick={handlePrintClick}>In PDF</button></ul>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mx-auto mb-4">
          <div className="flex items-center">
            <button className="text-blue-800 cursor-pointer" onClick={decreaseVariable} disabled={myVariable === 1}>
              <AiFillCaretLeft size={20} />
            </button>
            <span className="mx-4 text-xl text-blue-800 cursor-pointer"> {myVariable}</span>
            <button className="text-blue-800" onClick={increaseVariable}>
              <AiFillCaretRight size={20} />
            </button>
          </div>
        </div>
      </div>
      {/* <Footer /> Uncomment this line if you want the Footer to be fixed at the bottom */}
    </div>
  );
};

export default Coursedetail;
