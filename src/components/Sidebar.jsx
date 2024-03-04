import { useRef, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { AnimatePresence, motion } from "framer-motion";
import { useClickAway } from "react-use";
import { AiFillAccountBook, AiOutlineRollback } from "react-icons/ai";
import { Link } from "react-router-dom";
import { FaMapLocation, FaCar, FaIdCard } from "react-icons/fa6";
import { FaUserCircle } from "react-icons/fa";

import { PiUserListFill } from "react-icons/pi";
import {
  AiFillSetting,
  AiOutlineOrderedList,
  AiOutlineUser,
  AiFillCloseCircle,
} from "react-icons/ai";

export const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const [systemOpen, setSystemOpen] = useState(false);
  const [traineeOpen, setTraineeOpen] = useState(false);
  const ref = useRef(null);
  useClickAway(ref, () => setOpen(false));
  const toggleSidebar = () => setOpen((prev) => !prev);
  const toggleSystem = () => setSystemOpen((prev) => !prev);
  const toggleTrainee = () => setTraineeOpen((prev) => !prev);

  const resetStates = () => {
    setSystemOpen(false);
    setTraineeOpen(false);
  };
  return (
    <>
      <button
        onClick={toggleSidebar}
        className="p-3 hover:bg-gray-200 hover:border-gray-400"
        aria-label="toggle sidebar"
      >
        <GiHamburgerMenu className="text-black" />
      </button>
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              {...framerSidebarBackground}
              aria-hidden="true"
              className="fixed bottom-0 left-0 right-0 top-0 z-40 bg-[rgba(0,0,0,0.1)] backdrop-blur-sm"
            ></motion.div>
            <motion.div
              {...framerSidebarPanel}
              className="fixed top-0 bottom-0 left-0 z-50 w-full h-screen max-w-xs border-r-2
                border-zinc-800 bg-zinc-900 custom-scrollbar"
              ref={ref}
              aria-label="Sidebar"
              style={{ overflowY: "scroll" }}
            >
              <div className="flex items-center justify-between p-5 border-b-2 border-zinc-800">
                <span className="text-white text-2xl font-bold">
                  Sát hạch lái xe
                </span>
                <button
                  onClick={() => {
                    toggleSidebar();
                    resetStates();
                  }}
                  className="p-3 border-2 border-zinc-800 rounded-xl text-white 
                   hover:bg-gray-200 hover:border-gray-400 hover:text-black"
                  aria-label="close sidebar"
                >
                  <AiOutlineRollback />
                </button>
              </div>
              <ul>
                <li>
                  <a
                    onClick={toggleSystem}
                    href="#"
                    className="flex items-center justify-between gap-5 p-5 transition-all border-b-2 text-white
                     hover:bg-gray-200 hover:border-gray-400 border-zinc-800 hover:text-black"
                  >
                    <motion.span {...framerText(0)}>
                      <div className="">Hệ thống</div>
                    </motion.span>
                    <motion.div {...framerIcon}>
                      <AiFillSetting className="text-2xl " />
                    </motion.div>
                  </a>
                  <AnimatePresence>
                    {systemOpen && (
                      <motion.ul {...framerSubMenu} className="pl-8">
                        <Link to="/datdevice">
                          <motion.li
                            {...framerItem}
                            className="flex items-center justify-between gap-5 p-5 transition-all border-b-2 text-white hover:bg-gray-200 hover:border-gray-400 border-zinc-800 hover:text-black"
                          >
                            <motion.span {...framerText(0)}>
                              <div className="">Thiết bị DAT</div>
                            </motion.span>
                            <motion.div {...framerItem}>
                              <FaMapLocation className="text-2xl" />
                            </motion.div>
                          </motion.li>
                        </Link>

                        <Link to="/trainningcar">
                          <motion.li
                            {...framerItem}
                            className="flex items-center justify-between gap-5 p-5 transition-all border-b-2 text-white hover:bg-gray-200 hover:border-gray-400 border-zinc-800 hover:text-black"
                          >
                            <motion.span {...framerText(0)}>
                              <div className="text-white">Xe tập lái</div>
                            </motion.span>
                            <motion.div {...framerItem}>
                              <FaCar className="text-2xl" />
                            </motion.div>
                          </motion.li>
                        </Link>

                        <Link to="/rfcard">
                          <motion.li
                            {...framerItem}
                            className="flex items-center justify-between gap-5 p-5 transition-all border-b-2 text-white hover:bg-gray-200 hover:border-gray-400 border-zinc-800 hover:text-black"
                          >
                            <motion.span {...framerText(0)}>
                              <div className="text-white">Danh sách thẻ</div>
                            </motion.span>
                            <motion.div {...framerItem}>
                              <FaIdCard className="text-2xl" />
                            </motion.div>
                          </motion.li>
                        </Link>

                        <Link to="/teacherlist">
                          <motion.li
                            {...framerItem}
                            className="flex items-center justify-between gap-5 p-5 transition-all border-b-2 text-white hover:bg-gray-200 hover:border-gray-400 border-zinc-800 hover:text-black"
                          >
                            <motion.span {...framerText(0)}>
                              <div className="text-white">
                                Danh sách giáo viên
                              </div>
                            </motion.span>
                            <motion.div {...framerItem}>
                              <FaUserCircle className="text-2xl" />
                            </motion.div>
                          </motion.li>
                        </Link>
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </li>
                <li>
                  <a
                    onClick={toggleTrainee}
                    href="#"
                    className="flex items-center justify-between gap-5 p-5 transition-all border-b-2 text-white
                    hover:bg-gray-200 hover:border-gray-400 hover:text-black border-zinc-800"
                  >
                    <motion.span {...framerText(1)}>
                      <div className="">Học viên</div>
                    </motion.span>
                    <motion.div {...framerIcon}>
                      <AiOutlineUser className="text-2xl" />
                    </motion.div>
                  </a>
                  <AnimatePresence>
                    {traineeOpen && (
                      <motion.ul {...framerSubMenu} className="pl-8">
                        <Link to="/course">
                          <motion.li
                            {...framerItem}
                            className="flex items-center justify-between gap-5 p-5 transition-all border-b-2 border-zinc-800 hover:bg-gray-200 hover:border-gray-400 hover:text-black text-white"
                          >
                            <motion.span {...framerText(0)}>
                              <div>Danh sách khoá học</div>
                            </motion.span>
                            <motion.div {...framerItem}>
                              <AiOutlineOrderedList className="text-2xl" />
                            </motion.div>
                          </motion.li>
                        </Link>

                        <Link to="/testing">
                          <motion.li
                            {...framerItem}
                            className="flex items-center justify-between gap-5 p-5 transition-all border-b-2 border-zinc-800 hover:bg-gray-200 hover:border-gray-400 hover:text-black text-white"
                          >
                            <motion.span {...framerText(0)}>
                              <div>Danh sách học viên</div>
                            </motion.span>
                            <motion.div {...framerItem}>
                              <AiFillAccountBook className="text-2xl" />
                            </motion.div>
                          </motion.li>
                        </Link>

                        <Link to="">
                          <motion.li
                            {...framerItem}
                            className="flex items-center justify-between gap-5 p-5 transiti border-zinc-800 hover:bg-gray-200 hover:border-gray-400 hover:text-black text-white"
                          >
                            <motion.span {...framerText(0)}>
                              <div>Danh sách phiên học</div>
                            </motion.span>
                            <motion.div {...framerItem}>
                              <FaIdCard className="text-2xl" />
                            </motion.div>
                          </motion.li>
                        </Link>
                        <Link to="/session">
                          <motion.li
                            {...framerItem}
                            className="flex items-center justify-between gap-5 p-5 transition-all border-b-2 hover-bg-zinc-900 border-zinc-800 hover:bg-gray-200 hover:border-gray-400 hover:text-black text-white"
                          >
                            <motion.span {...framerText(0)}>
                              <div>Giám sát thực hành</div>
                            </motion.span>
                            <motion.div {...framerItem}>
                              <FaUserCircle className="text-2xl" />
                            </motion.div>
                          </motion.li>
                        </Link>
                        <motion.li
                          {...framerItem}
                          className="flex items-center justify-between gap-5 p-5 transiti border-zinc-800 hover:bg-gray-200 hover:border-gray-400 hover:text-black text-white"
                        >
                          <motion.span {...framerText(0)}>
                            <div>Xem dữ liệu</div>
                          </motion.span>
                          <motion.div {...framerItem}>
                            <FaUserCircle className="text-2xl" />
                          </motion.div>
                        </motion.li>
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </li>
              </ul>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

const framerSubMenu = {
  initial: { height: 0 },
  animate: { height: "auto" },
  exit: { height: 0 },
  transition: { duration: 0.3 },
};

const framerItem = {
  initial: { opacity: 0, y: -20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.3 },
};

const framerSidebarBackground = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0, transition: { delay: 0.2 } },
  transition: { duration: 0.3 },
};

const framerSidebarPanel = {
  initial: { x: "-100%" },
  animate: { x: 0 },
  exit: { x: "-100%" },
  transition: { duration: 0.3 },
};

const framerText = (delay) => {
  return {
    initial: { opacity: 0, x: -50 },
    animate: { opacity: 1, x: 0 },
    transition: {
      delay: 0.5 + delay / 10,
    },
  };
};
const framerIcon = {
  initial: { scale: 0 },
  animate: { scale: 1 },
  transition: {
    type: "spring",
    stiffness: 260,
    damping: 20,
    delay: 1,
  },
};
