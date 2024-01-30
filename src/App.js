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
  TraneesSession,
  Basic,
  DatDevice,
  TrainningCar,
  Rfcard,
  TeacherList,
} from "./pages";
import { Footer, Navbar } from "./components";
import { Sidebar } from "./components";
import { useStateContext } from "./contexts/ContextProvider";

function App() {
  const { activeMenu } = useStateContext();
  return (
    <div>
      <Router>
        <div className="dark:bg-main-dark-bg ">
          {/* Sideabar */}
          {activeMenu ? (
            <div
              className="w-fit h-full fixed sidebar dark:bg-secondary-dark-bg
             bg-black"
            >
              <Sidebar />
            </div>
          ) : (
            <div className="w-0  dark:bg-secondary-dark-bg"></div>
          )}
          {/*  */}
          <div>
            <Routes>
              {/* Pages */}
              <Route index element={<Login />} />
              <Route path="/login" element={<Login />} />
              <Route path="/testing" element={<Testing />} />
              <Route path="/userprofile" element={<Userprofile />} />
              <Route path="/traineeprofile/:id" element={<Traineeprofile />} />
              <Route path="/course" element={<Course />}></Route>
              <Route path="/session" element={<Session />}></Route>
              <Route path="/datdevice" element={<DatDevice />}></Route>
              <Route path="/trainningcar" element={<TrainningCar />}></Route>
              <Route path="/rfcard" element={<Rfcard />}></Route>
              <Route path="/teacherlist" element={<TeacherList />}></Route>
              <Route
                path="/coursedetail/:id"
                element={<Coursedetail />}
              ></Route>
              <Route
                path="/traineessession/:course_id/:id/:ma_dk"
                element={<TraneesSession />}
              ></Route>
            </Routes>
          </div>
          {/* <div className="fixed bottom-0 w-full">
            <Footer />
          </div> */}
        </div>
      </Router>
    </div>
  );
}

export default App;
