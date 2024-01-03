import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { useParams } from "react-router-dom";
const TraineeProfile = () => {
  const { id } = useParams();
  const { ho_va_ten } = useParams();
  console.log(id);
  // Giả sử bạn có dữ liệu người học lái xe
  const traineeData = {
    name: "Nguyen Van A",
    dob: "01/01/1990",
    idCard: "123456789",
    gender: "Nam", // Hoặc "Nữ"
    profileImage: "path/to/profile-image.jpg",
  };

  return (
    <div className="flex">
      {/* Ảnh hồ sơ (ở bên trái) */}
      <div className="mr-4">
        <FaUserCircle
          className="w-32 h-32 object-cover rounded-full text-black"
        />
      </div>

      {/* Thông tin người học lái xe (ở bên phải) */}
      <div>
        <h1 className="text-2xl font-bold mb-2">{traineeData.name}</h1>
        <p className="mb-1">
          <span className="font-bold">Ngày sinh:</span> {traineeData.dob}
        </p>
        <p className="mb-1">
          <span className="font-bold">Số CMND:</span> {traineeData.idCard}
        </p>
        <p className="mb-1">
          <span className="font-bold">Giới tính:</span> {traineeData.gender}
        </p>
      </div>
    </div>
  );
};

export default TraineeProfile;
