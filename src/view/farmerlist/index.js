import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const EmpList = () => {
  const [id, idchange] = useState("");
  const [name, namechange] = useState("");
  const [email, emailchange] = useState("");
  const [phone, phonechange] = useState("");
  const [address, addresschange] = useState("");
  const [age, agechange] = useState("");
  const [gender, genderchange] = useState("");
  const [profession, professionchange] = useState("");
  const [active, activechange] = useState(true);
  const [validation, valchange] = useState(false);

  const navigate = useNavigate();

  const handlesubmit = (e) => {
    e.preventDefault();
    const empdata = { id, name, email, phone, address, age, gender, profession, active };

    fetch("", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(empdata),
    })
      .then((res) => {
        alert("Saved successfully.");
        navigate("/");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <div className="container">
        <form className="" onSubmit={handlesubmit}>
          <div className="" style={{ textAlign: "left" }}>
            <div className="row ">
              <div className="col-sm-12">
                <h2 className="">
              Angel Farmer
                  </h2>
                </div>
            </div>
         
              <div className="row mt-3">
                <div className="col-sm-6 ">
                  <div className="form-group">
                    <label>ID</label>
                    <input
                      value={id}
                      disabled="disabled"
                      className="form-control mt-2"
                    ></input>
                  </div>
                </div>

                <div className="col-sm-6 ">
                  <div className="form-group">
                    <label>Name</label>
                    <input
                      required
                      value={name}
                      onMouseDown={(e) => valchange(true)}
                      onChange={(e) => namechange(e.target.value)}
                      className="form-control mt-2"
                    ></input>
                    {name.length == 0 && validation && (
                      <span className="text-danger">Enter the name</span>
                    )}
                  </div>
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-sm-6 ">
                  <div className="form-group">
                    <label>Email</label>
                    <input
                      value={email}
                      onChange={(e) => emailchange(e.target.value)}
                      className="form-control mt-2"
                    ></input>
                  </div>
                </div>

                <div className="col-sm-6 ">
                  <div className="form-group">
                    <label>Phone</label>
                    <input
                      value={phone}
                      onChange={(e) => phonechange(e.target.value)}
                      className="form-control mt-2"
                    ></input>
                  </div>
                </div>
              </div>

              <div className="row mt-3">
                <div className="col-sm-6 ">
                  <div className="form-group">
                    <label>Address</label>
                    <input
                      value={address}
                      onChange={(e) => addresschange(e.target.value)}
                      className="form-control mt-2"
                    ></input>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="form-group">
                    <label>Gender</label>
                    <input
                      value={gender}
                      onChange={(e) => genderchange(e.target.value)}
                      className="form-control mt-2"
                    ></input>
                  </div>
                </div>
              </div>

              <div className="row mt-3">
                <div className="col-sm-6 ">
                  <div className="form-group">
                    <label>Age</label>
                    <input
                      value={age}
                      onChange={(e) => agechange(e.target.value)}
                      className="form-control mt-2"
                    ></input>
                  </div>
                </div>
                <div className="col-sm-6 ">
                  <div className="form-group">
                    <label>Profession</label>
                    <input
                      value={profession}
                      onChange={(e) => professionchange(e.target.value)}
                      className="form-control mt-2"
                    ></input>
                  </div>
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-sm-12">
                <div className="form-check">
                    <input
                      checked={active}
                      onChange={(e) => activechange(e.target.checked)}
                      type="checkbox"
                      className="form-check-input"
                    ></input>
                    <label className="form-check-label">Is Active</label>
                  </div>
                </div>
              </div>

              <div className="row mt-3">
                
                <div className="col-sm-12 ">
                <div className="form-group">
                    <button className="btn btn-success" type="submit">
                      Save
                    </button>
                    <Link to="/" className="btn btn-danger mx-3">
                      Back
                    </Link>
                  </div>
                </div>
              </div>
           
          </div>
        </form>
      
    </div>
  );
};

export default EmpList;
