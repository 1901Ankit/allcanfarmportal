import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const EmpEdit = () => {
  const { empid } = useParams();

  const [empdata, empdatachange] = useState({});

  useEffect(() => {
    fetch(" " + empid)
      .then((res) => {
        return res.json();
      })
      .then((resp) => {
        idchange(resp.id);
        namechange(resp.name);
        emailchange(resp.email);
        phonechange(resp.phone);
        addresschange(resp.address);
        agechange(resp.age);
        genderchange(resp.gender);
        professionchange(resp.profession);
        addresschange(resp.address);
        activechange(resp.isactive);
      })
      .catch((err) => {
        // console.log(err.message);
      });
  }, []);

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

    fetch(" " + empid, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(empdata),
    })
      .then((res) => {
        alert("Saved successfully.");
        navigate("emplisting");
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
                  Farmer Edit
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
                    <Link to="emplisting" className="btn btn-danger mx-3">
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

export default EmpEdit;
