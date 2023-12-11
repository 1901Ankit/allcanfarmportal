import logo from './logo.svg';
import './App.css';
import Login from './view/login';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import EmpListing from "./view/farmerlisting";
import EmpCreate from "./view/farmercreate";
import EmpDetail from "./view/farmerdetail";
import EmpEdit from "./view/farmeredit";
import EmpList from "./view/farmerlist";
import Modal from './component/modal';
import { ToastContainer  } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
    <div className="App">
   <ToastContainer
                            position="top-right"
                            autoClose={1500}
                            hideProgressBar={false}
                            newestOnTop={false}
                            closeOnClick
                            rtl={false}
                            pauseOnFocusLoss
                            draggable
                            pauseOnHover
                            // theme=""
                        />

      <Modal/>
      {/* <Login/> */}
      <BrowserRouter>
        <Routes>
          
          <Route path="/" element={<Login />}></Route>
          <Route path="/emplisting" element={<EmpListing />}></Route>
          <Route path="/Farmer" element={<EmpCreate />}></Route>
          <Route path="/AngelFarmer" element={<EmpList />}></Route>
          {/* <Route path="/AngelFarmer" element={<EmpList />}></Route> */}

          <Route path="/Farmer/detail/:empid" element={<EmpDetail />}></Route>
          <Route path="/Farmer/edit/:empid" element={<EmpEdit />}></Route>
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;