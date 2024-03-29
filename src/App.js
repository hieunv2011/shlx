import logo from "./logo.svg";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import {
  Signup,
  Login,
  Testing,
  Userprofile,
  Traineeprofile,
  Course,
  Session,
  Coursedetail,
  DatDevice,
  TrainningCar,
  Rfcard,
  TeacherList,
} from "./pages";
import { Footer, Navbar, AnimatedSwitch } from "./components";
import { Sidebar } from "./components";
import { useStateContext } from "./contexts/ContextProvider";
import { Navigation } from "./components/Navigation";
function App() {
  // const { activeMenu } = useStateContext();
  return (
    <div className="flex flex-col">
      <Router>
        {/* Navigation cố định ở đầu trang */}
        <div className="fixed top-0 z-10 w-full">
          <Navigation />
        </div>
        {/* Đặt padding-top cho container của Routes để tránh bị che khuất bởi Navigation */}
        <div className="pt-10 dark:bg-main-dark-bg w-full bg-slate-100">
          <Routes>
            {/* Pages */}
            <Route index element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/testing"
              element={
                <AnimatedSwitch>
                  <Testing />
                </AnimatedSwitch>
              }
            />
            <Route path="/userprofile" element={<Userprofile />} />
            <Route path="/session" element={<Session />} />
            <Route path="/traineeprofile/:id" element={<Traineeprofile />} />
            <Route
              path="/course"
              element={
                <AnimatedSwitch>
                  <Course />
                </AnimatedSwitch>
              }
            ></Route>
            <Route
              className="z-0"
              path="/session"
              element={<Session />}
            ></Route>
            <Route path="/datdevice" element={<DatDevice />}></Route>
            <Route path="/trainningcar" element={<TrainningCar />}></Route>
            <Route path="/rfcard" element={<Rfcard />}></Route>
            <Route path="/teacherlist" element={<TeacherList />}></Route>
            <Route path="/coursedetail/:id" element={<Coursedetail />}></Route>
          </Routes>
          <div className="fixed bottom-0 w-full z-0">
            <Footer />
          </div>
        </div>
      </Router>
    </div>
  );
}

export default App;
