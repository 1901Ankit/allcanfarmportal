import React, { useState } from "react";
import "./index.css";
import authControllers from "../../api/auth";
import logo from "../../../src/assests/images/AllCanFarmLogo.svg";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";

const Login = () => {
  let [show, setShow] = useState(false);
  let [number, setNumber] = useState("");                                    
  let [otp, setOTP] = useState("");
  const [validation, setValidation] = useState(false);
  let navigate = useNavigate();
  let sendOTP = (data) => {
    // console.log("0", data);
   
      authControllers
        .sendOTP({ phone_number: data })
        .then((res) => {
          setShow(true);
          toast.success(res.data.response.message);
          // console.log("first >>>", res);
        })
        .catch((err) => {
          // console.log("first err", err);
          toast.error("Only admin can access");
        });
      // setShow(true);
  
  };

  //   authControllers
  //     .sendOTP({ phone_number: data })
  //     .then((res) => {
  //       console.log("first >>>", res);
  //     })
  //     .catch((err) => {
  //       console.log("first err", err);
  //     });
  // };
  // const isValidPhoneNumber = (phone) => {
  //   return /^\d{10}$/.test(phone);
  // };
  const isValidPhoneNumber = (phone) => {
    let abc =  /^[6-9]\d{9}$/.test(phone);
    // console.log(abc);
    // Use your custom regex pattern for validation
    // return /^[6-9]\d{9}$/.test(phone);
return abc;
  };
  const handlesChange = (event) => {
    let inputValue = event.target.value.replace(/\D/g, "");
    inputValue = inputValue.substring(0, 10);
    setNumber(inputValue);
  };
  const handleGetOTP = () => {
    if (!isValidPhoneNumber(number)) {
      setValidation(true);
    } else {
      sendOTP(number);
      // setShow(true);
    }
  };

  let verifyOTP = (data, data2) => {
    authControllers
      .login({ phone_number: data, otp: data2 })
      .then((res) => {
        // toast.success("OTP send in your number");
        // console.log("first <<<", res.data.response.message.login_token);
        localStorage.setItem(
          "access_token",
          res.data.response.message.login_token
        );
        localStorage.setItem("mobile_number", data);

        // localStorage.getItem("mobile_number")

        navigate("/emplisting");
        // console.log("first ???", data);
      })
      .catch((err) => {
        // toast.error("Error in OTP");
        console.log("first err", err);
      });
  };
  function handleChange(event) {
    // console.log(event.target.value);
    setNumber(event.target.value);
  }
  function otpHandler(event) {
    // console.log(event.target.value);
    setOTP(event.target.value);
  }
  const handlesubmit = (e) => {
    e.preventDefault();
  };
  // console.log(number);
  return (
    <div className="bg-pic">
      <div class="mt-4 pt-3">
        <div class="form">
          <form class="register-form" onSubmit={handlesubmit}>
            <img src={logo} className="mb-3" width={155} />
            <h6 className=" text-center mt-1 ">Welcome to AllCanFarm Portal</h6>

            <input
              className={`mt-3 inputs ${
                validation && number.length === 0 ? "is-invalid" : ""
              }`}
              onChange={handlesChange}
              value={number}
              placeholder="Please enter the phone number"
            />
            {validation && !isValidPhoneNumber(number) && (
              <span className="text-danger foneer">
                Please enter a valid 10-digit mobile number
              </span>
            )}
            <div className="jsa">
              <div className="mt-3">
                {show ? (
                  <a>
                    <h6 className="mt-5">
                      OTP has been sent to your mobile number
                    </h6>
                  </a>
                ) : (
                  <button
                    className="btn btn-success"
                    type="button"
                    onClick={handleGetOTP}
                  >
                    Get OTP
                  </button>
                )}
              </div>
              <div className="otp-input-wrapper ">
                {show ? (
                  <div>
                    <input
                      maxlength="4"
                      pattern="[0-9]*"
                      autocomplete="off"
                      className="mt-2"
                      value={otp}
                      onChange={otpHandler}
                    />
                    <svg viewBox="0 0 240 1" xmlns="http://www.w3.org/2000/svg">
                      <line
                        x1="0"
                        y1="0"
                        x2="240"
                        y2="0"
                        stroke="#3e3e3e"
                        stroke-width="2"
                        stroke-dasharray="44,22"
                      />
                    </svg>
                  </div>
                ) : (
                  ""
                )}
                {/* <svg viewBox="0 0 240 1" xmlns="http://www.w3.org/2000/svg">
                <line
                  x1="0"
                  y1="0"
                  x2="240"
                  y2="0"
                  stroke="#3e3e3e"
                  stroke-width="2"
                  stroke-dasharray="44,22"
                />
              </svg> */}
              </div>
              <div>
                {show ? (
                  <button
                    className="btn btn-success  mt-3"
                    onClick={() => {
                      verifyOTP(number, otp);
                      setShow(false);
                    }}
                  >
                    Verify OTP
                  </button>
                ) : (
                  ""
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
    // <div className="container-fluid">

    //   <div className="row">
    //     <div className="col-sm-12 ">
    //       <img src={logo} className="" width={500} />
    //     </div>
    //   </div>

    //   <div className="row">
    //     <div className="col-sm-12">
    //       <h3 className="mt-3">Welcome to AllCanFarm Portal</h3>
    //     </div>
    //   </div>

    //   <div className="row">
    //     <div className="col-sm-12">
    //       <input
    //         className="my-4"
    //         onChange={handleChange}
    //         value={number}
    //         placeholder="enter the phone number"
    //       ></input>
    //     </div>
    //   </div>
    //   <div>
    //     {show ? (
    //       <a>Resend OTP</a>
    //     ) : (
    //       <button
    //         className="btn btn-success me-5"
    //         onClick={() => {
    //           sendOTP(number);
    //           setShow(true);
    //         }}
    //       >
    //         Get OTP
    //       </button>
    //     )}
    //   </div>
    //   <div>
    //     {show ? (
    //       <input placeholder="enter OTP" value={otp} onChange={otpHandler} />
    //     ) : (
    //       ""
    //     )}
    //   </div>
    //   <div>
    //     {show ? (
    //       <button
    //         className="btn btn-success me-5 mt-3"
    //         onClick={() => {
    //           verifyOTP(number, otp);
    //           //   setShow(false);
    //         }}
    //       >
    //         Verify OTP
    //       </button>
    //     ) : (
    //       ""
    //     )}
    //   </div>

    //   {/* <form action="" className="mt-5">
    //           <input  className="otp" type="text" oninput='digitValidate(this)' onkeyup='tabChange(1)'maxlength=1/ >
    //           <input  className="otp" type="text" oninput='digitValidate(this)' onkeyup='tabChange(2)' maxlength=1/ >
    //           <input  className="otp" type="text" oninput='digitValidate(this)' onkeyup='tabChange(3)' maxlength=1/ >
    //           <input  className="otp" type="text" oninput='digitValidate(this)'onkeyup='tabChange(4)' maxlength=1/ >
    //         </form> */}
    // </div>
  );
};

export default Login;
