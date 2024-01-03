import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white p-4  text-center">
      <div>
        <p>HỆ THỐNG QUÁN LÝ ĐÀO TẠO LÁI XE</p>
        <p>Giải pháp của Toàn Phương SHLX. 0904.666.329 - 0982.911.000. Email: shlx@toanphuong.com.vn</p>
      </div>
      <div className="mt-2">
        <a href="/privacy-policy" className="text-blue-400 hover:underline">
          Privacy Policy
        </a>{" "}
        |{" "}
        <a href="/terms-of-service" className="text-blue-400 hover:underline">
          Terms of Service
        </a>
      </div>
    </footer>
  );
};

export default Footer;
