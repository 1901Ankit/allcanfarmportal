import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./index.css";
import logo from "../../assests/images/AllCanFarmLogo.svg";
import listingController from "../../api/listing";
import { useDispatch } from "react-redux";
import { hideModal, showModal } from "../../redux/reducer/modal";
import authControllers from "../../api/auth";
import { toast } from "react-toastify";
import { FaEdit } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { HiUserAdd } from "react-icons/hi";
import { FaEye } from "react-icons/fa";
import { RiFileAddFill } from "react-icons/ri";
import { FaStreetView } from "react-icons/fa";
// import { AiTwotoneDelete } from "react-icons/ai";
import { Table } from "react-bootstrap";

const EmpListing = () => {
  const datass = localStorage.getItem("access_token");
  // console.log("first ?>>>", datass);
  const [empdata, empdatachange] = useState(null);
  let [shows, setShows] = useState(false);
  let [data, setData] = useState([]);
  const navigate = useNavigate();
  const farmerList = () => {
    listingController
      .farmerlist("")
      .then((res) => {
        setData(res.data.response.message);
      })
      .catch((e) => {
        console.log(e);
      });
    fetch("")
      .then((res) => {
        return res.json();
      })
      .then((resp) => {
        empdatachange(resp);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  const LoadDetail = (id) => {
    navigate("/Farmer/detail/" + id);
  };
  const LoadEdit = (id) => {
    navigate("/Farmer/edit/" + id);
  };
  const Removefunction = (id) => {
    if (window.confirm("Do you want to remove?")) {
      fetch("" + id, {
        method: "DELETE",
      })
        .then((res) => {
          alert("Removed successfully.");
          window.location.reload();
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  };

  useEffect(() => {
    farmerList();
  }, []);

  useEffect(() => {
    shows
      ? listingController
          .angelfarmerlist("")
          .then((res) => {
            // console.log("res", res);
            toast.success("Welcome Angel farmer list");
            setData(res.data.response.message);
          })
          .catch((err) => {
            // console.log(e);
            toast.error("Error Angel farmer list");
            if (err.response.data.status === 401) {
              navigate("/");
            }
          })
      : listingController
          .farmerlist("")
          .then((res) => {
            toast.success("Welcome Farmer list");
            // console.log("res", res);
            setData(res.data.response.message);
          })
          .catch((e) => {
            toast.error(" Error Farmer list");
            // console.log(e);
          });
  }, [shows]);

  const HandleViewClicks = (val) => {
    const [viewFarms, setViewFarms] = useState([]);
    const viewFarm = (value) => {
      listingController
        .viewfarm(value)
        .then((res) => {
          setViewFarms(res.data.response.message);
        })
        .catch((error) => {
          console.log(error.message);
        });
    };

    useEffect(() => {
      viewFarm(val);
    }, []);

    return (
      <div className="frmsa">
        <h3 className="h3">View Farm</h3>
        <table className="table table-bordered mt-5">
          <thead className="">
            <tr>
              <td className="bst">Image</td>
              <td className="bst">Crop</td>
              <td className="bst">Harvest</td>
              <td className="bst">Sowing</td>
              <td className="bst">Produce</td>
              <td className="bst">Area</td>
              <td className="bst">Edit</td>
            </tr>
          </thead>

          {viewFarms.map((val, id) => {
            return (
              <tbody key={id}>
                <tr key={id}>
                  <td className="">
                    <img src={val.farm_pics[0].url} width="80px" />
                  </td>
                  <td className="">{val.crop ? val.crop : "-"}</td>
                  <td className="rlsa">
                    {val.harvest_month ? val.harvest_month : "-"}
                  </td>
                  <td className="rlsa">
                    {val.sowing_month ? val.sowing_month : "-"}
                  </td>
                  <td className="rlsa">
                    {val.produce_in_kg ? val.produce_in_kg : "-"}
                  </td>
                  <td className="">{val.farm_area ? val.farm_area : "-"}</td>
                  <td>
                    <a
                      className="icosn"
                      type="submit"
                      onClick={() => handleEditFarm(val)}
                    >
                      <FaEdit />
                      {/* Edit */}
                    </a>
                  </td>
                </tr>
              </tbody>
            );
          })}
        </table>

        {/* <div className="frmsa">
          {" "}
          <div className="">{val.name}</div>
          <table className="table table-bordered mt-5">
            <thead className="bg-dark text-white">
              <tr>
                <td className="bst">Image</td>
                <td className="bst">Produce</td>
                <td className="bst">Sowing</td>
                <td className="bst">Harvest</td>
                <td className="bst">Area</td>
                <td className="bst"></td>
              </tr>
            </thead>
            <tbody>
              {cropdata.map((v, id) => {
                return (
                  <tr key={id}>
                    <td className="">
                      <img src={v.farm_pics[0].url} width="100px" />
                    </td>
                    <td className="">{v.produce_in_kg}</td>
                    <td className="">{v.sowing_month}</td>
                    <td className="">{v.harvest_month}</td>
                    <td className="">{v.farm_area}</td>
                    <td>
                      <button
                        className="btn btn-success"
                        type="submit"
                        onClick={() => handleEditFarm(v)}
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div> */}
      </div>
    );
  };

  let dispatch = useDispatch();
  let handleClick = () => {
    dispatch(showModal(<AddAngelModal />));
  };
  let handleFamerClick = () => {
    dispatch(showModal(<AddFarmerModal />));
  };
  let handleEditClick = (val) => {
    dispatch(showModal(<AddEditModal value={val} />));
  };
  let handleEditFarm = (val) => {
    dispatch(showModal(<AddEditFarm value={val} />));
  };
  // let handleEditStory = (val) => {
  //   dispatch(showModal(<AddEditStory value={val} />));
  // };
  const addstoryModal = (val) => {
    dispatch(showModal(<AddStory value={val} />));
  };

  let HandleViewClick = (item) => {
    dispatch(showModal(<HandleViewClicks value={item.user_id} />));
  };
  const addFarmModal = (val) => {
    dispatch(showModal(<AddBasicFarm value={val} />));
  };

  const AddFarmerModal = () => {
    let [farmer, setFarmer] = useState({
      name: "",
      contact_no: "",
    });

    let handleChange = (e) => {
      let { id, value } = e.target;
      setFarmer({ ...farmer, [id]: value });
    };
    const addFarmer = () => {
      listingController
        .addFarmer(farmer)
        .then((res) => {
          toast.success("Successfully Add Farmer");
          dispatch(hideModal());
        })
        .catch((err) => {
          toast.error(err.response.data.response.message);
          console.log(err);
        });
    };

    return (
      <div className="container">
        <h3 className="h3">Add Farmer</h3>
        <div className="row mt-4">
          <label className="text-start">Name</label>
          <div className="col-sm-12 ">
            <div className="form-group">
              <input
                id="name"
                placeholder="Please enter your name"
                onChange={handleChange}
                value={farmer.name}
                className="form-control mt-2"
              ></input>
            </div>
          </div>
        </div>

        <div className="row mt-3">
          <label className="text-start">Phone number</label>
          <div className="col-sm-12 ">
            <div className="form-group">
              <input
                placeholder="Please enter your number"
                id="contact_no"
                onChange={handleChange}
                value={farmer.contact_no}
                className="form-control mt-2"
              ></input>
            </div>
          </div>
        </div>

        <div className="row mt-3">
          <div className="col-sm-12 ">
            <div className="form-group">
              <button
                className="btn btn-success"
                type="submit"
                onClick={addFarmer}
              >
                submit
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const AddAngelModal = () => {
    let [angelfarmer, setAngelFarmer] = useState({
      name: "",
      contact_no: "",
    });

    const addAngelFarmer = () => {
      listingController
        .addAngelFarmer(angelfarmer)
        .then((res) => {
          toast.success("Successfully Add Angel farmer");
          // console.log(res);
          dispatch(hideModal());
        })

        .catch((err) => {
          toast.error(err.response.data.response.message);
          // console.log(err.response.data.response.message);
        });
    };
    // console.log("hdfjdfdfjd");
    let handleChange = (e) => {
      let { id, value } = e.target;
      setAngelFarmer({ ...angelfarmer, [id]: value });
    };

    return (
      <div className="container">
        <h3 className="h3">Add Angel Farmer</h3>
        <div className="row mt-4">
          <label className="text-start">Name</label>
          <div className="col-sm-12 ">
            <div className="form-group">
              <input
                id="name"
                placeholder="Please enter your name"
                onChange={handleChange}
                value={angelfarmer.name}
                className="form-control mt-2"
              ></input>
            </div>
          </div>
        </div>
        <div className="row mt-3">
          <label className="text-start">Phone number</label>
          <div className="col-sm-12 ">
            <div className="form-group">
              <input
                id="contact_no"
                placeholder="Please enter your number"
                onChange={handleChange}
                value={angelfarmer.contact_no}
                className="form-control mt-2"
              ></input>
            </div>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-sm-12 ">
            <div className="form-group">
              <button
                className="btn btn-success"
                type="submit"
                onClick={addAngelFarmer}
              >
                submit
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const AddEditModal = (val) => {
    let [editProfile, setEditProfile] = useState({
      user_id: val.value.user_id,
      name: val.value.name,
      contact_no: val.value.contact_no,
      email: val.value.email,
      gender: val.value.gender,
      age: val.value.age,
      address: val.value.address,
      profession: val.value.profession,
    });

    let handleEditClick = (e) => {
      let { id, value } = e.target;
      setEditProfile({ ...editProfile, [id]: value });
    };

    const addeditProfile = () => {
      let body = {
        user_id: editProfile.user_id,
        name: editProfile.name,
        contact_no: editProfile.contact_no,
        email: editProfile.email,
        gender: editProfile.gender,
        age: editProfile.age,
        address: editProfile.address,
        profession: editProfile.profession,
      };

      listingController
        .editProfile(body)
        .then((res) => {
          toast.success("Successfully Edit profile");
          window.location.reload();
          dispatch(hideModal());
          farmerList();
        })
        .catch((err) => {
          toast.error(err.message);
          console.log(err);
        });
    };

    return (
      <div className="container">
        <h3 className="h3"> Edit Profile</h3>
        <div className="row mt-4">
          <div className="col-sm-6">
            <div className="form-group">
              <label className="d-flex align-items-center jusitfy-content-left">
                User_Id
              </label>
              <input
                id="user_id"
                placeholder="Please enter your user_id"
                onChange={handleEditClick}
                disabled="disabled"
                value={editProfile.user_id}
                className="form-control mt-2"
              ></input>
            </div>
          </div>

          <div className="col-sm-6 ">
            <div className="form-group">
              <label className="d-flex align-items-center jusitfy-content-left">
                Name
              </label>
              <input
                id="name"
                placeholder="Please enter your name"
                onChange={handleEditClick}
                value={editProfile.name}
                className="form-control mt-2"
              ></input>
            </div>
          </div>
        </div>

        <div className="row mt-3">
          <div className="col-sm-6 ">
            <div className="form-group">
              <label className="d-flex align-items-center jusitfy-content-left">
                Email
              </label>
              <input
                id="email"
                placeholder="Please enter your email"
                onChange={handleEditClick}
                value={editProfile.email}
                className="form-control mt-2"
              ></input>
            </div>
          </div>

          <div className="col-sm-6 ">
            <div className="form-group">
              <label className="d-flex align-items-center jusitfy-content-left">
                Gender
              </label>
              <select
                id="gender"
                onChange={handleEditClick}
                value={editProfile.gender}
                className="form-control mt-2"
              >
                <option value="M">Male</option>
                <option value="F">Female</option>
              </select>
            </div>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-sm-6 ">
            <div className="form-group">
              <label className="d-flex align-items-center jusitfy-content-left">
                Age
              </label>
              <input
                id="age"
                placeholder="Please enter your age"
                onChange={handleEditClick}
                value={editProfile.age}
                className="form-control mt-2"
              ></input>
            </div>
          </div>

          <div className="col-sm-6 ">
            <div className="form-group">
              <label className="d-flex align-items-center jusitfy-content-left">
                Address
              </label>
              <input
                id="address"
                placeholder="Please enter your address"
                onChange={handleEditClick}
                value={editProfile.address}
                className="form-control mt-2"
              ></input>
            </div>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-sm-6 ">
            <div className="form-group">
              <label className="d-flex align-items-center jusitfy-content-left">
                Phone Number
              </label>
              <input
                id="contact_no"
                placeholder="Please enter your number"
                onChange={handleEditClick}
                value={editProfile.contact_no}
                className="form-control mt-2"
              ></input>
            </div>
          </div>
          <div className="col-sm-6 ">
            <div className="form-group">
              <label className="d-flex align-items-center jusitfy-content-left">
                Profession
              </label>
              <input
                id="profession"
                placeholder="Please enter your profession"
                onChange={handleEditClick}
                value={editProfile.profession}
                className="form-control mt-2"
              ></input>
            </div>
          </div>
        </div>

        <div className="row mt-4">
          <div className="col-sm-12 ">
            <div className="form-group">
              <button
                className="btn btn-success"
                type="submit"
                onClick={addeditProfile}
              >
                submit
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const logout = () => {
    authControllers
      .logout()
      .then((res) => {
        toast.success("Successfully logout");

        dispatch(hideModal());
        localStorage.clear();
        navigate("/");
        // alert(res.data.response.message);
      })
      .catch((err) => {
        toast.error(err.message);
        localStorage.clear();
        navigate("/");
      });
  };

  const AddBasicFarm = ({ value }) => {
    const coverimageref = useRef();
    const [basicFarm, SetBasicFarm] = useState({
      user_id: value,
      crop: "",
      type: "",
      file: "",
    });
    let handlechane = (e) => {
      let { id, value } = e.target;
      SetBasicFarm({ ...basicFarm, [id]: value });
    };
    let handlefilechange = (e) => {
      const file = coverimageref.current.files[0];

      let { id, files } = e.target;
      SetBasicFarm({ ...basicFarm, [id]: file });
    };
    // console.log(basicFarm);
    let submitHandler = () => {
      listingController
        .addFarm(basicFarm)
        .then((res) => {
          toast.success("Successfully Added");
          dispatch(hideModal());
          listingController
            .farmerlist("")
            .then((res) => {
              setData(res.data.response.message);
            })
            .catch((e) => {
              console.log(e);
            });
          fetch("")
            .then((res) => {
              return res.json();
            })
            .then((resp) => {
              empdatachange(resp);
            })
            .catch((err) => {
              console.log(err.message);
            });
        })
        .catch((er) => {
          toast.error("Error Added ");
          console.log(er);
        });
    };
    return (
      <div className="container">
        <h3 className="h3">Add Basic Farm</h3>

        <div className="row mt-4">
          <label className="text-start">Crop Name</label>
          <div className="col-sm-12">
            <input
              id="crop"
              onChange={(e) => handlechane(e)}
              className="form-control mt-2"
              placeholder="Please enter crop"
            />
          </div>
        </div>
        <div className="row mt-3">
          <label className="text-start">Select Type</label>
          <div className="col-sm-12">
            <select
              id="type"
              onChange={(e) => handlechane(e)}
              className="form-control mt-2"
            >
              <option value="">--Please choose an option--</option>
              <option value="Crop">Crop</option>
              <option value="Tree">Tree</option>
            </select>
          </div>
        </div>
        <div className="row mt-3">
          <label className="text-start">Add Image</label>
          <div className="col-sm-6">
            <input
              type="file"
              ref={coverimageref}
              id="file"
              onChange={handlefilechange}
              className=" mt-2"
            />
          </div>
        </div>
        <div className="row mt-4">
          <div className="col-sm-12 ">
            <div className="form-group">
              <button
                className="btn btn-success"
                type="submit"
                onClick={submitHandler}
              >
                submit
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const AddEditFarm = (val) => {
    // console.log("dfgh", val);
    let [editfarm, setEditfarm] = useState({
      farm_id: val.value.farm_id,
      farm_area: val.value.farm_area,
      type: val.value.type,
      produce_in_kg: val.value.produce_in_kg,
      cost: val.value.cost,
      share: val.value.share,
      address: val.value.address,
      sowing_month: val.value.sowing_month,
      harvest_month: val.value.harvest_month,
      stay: val.value.stay,
      user_id: val.value.user_id,
    });

    let handleEditFarm = (e) => {
      let { id, value } = e.target;
      setEditfarm({ ...editfarm, [id]: value });
    };

    const Addeditfarm = () => {
      let body = {
        farm_id: editfarm.farm_id,
        farm_area: editfarm.farm_area,
        type: editfarm.type,
        produce: JSON.parse(editfarm.produce_in_kg),
        cost: editfarm.cost,
        share: editfarm.share,
        address: editfarm.address,
        sowing_month: editfarm.sowing_month,
        harvest_month: editfarm.harvest_month,
        stay: editfarm.stay,
        user_id: editfarm.user_id,
      };

      listingController
        .editfarm(body)
        .then((res) => {
          toast.success("Successful Edit farm");
          dispatch(hideModal());

          listingController
            .farmerlist("")
            .then((res) => {
              setData(res.data.response.message);
            })
            .catch((e) => {
              console.log(e);
            });
          fetch("")
            .then((res) => {
              return res.json();
            })
            .then((resp) => {
              empdatachange(resp);
            })
            .catch((err) => {
              console.log(err.message);
            });
        })
        .catch((err) => {
          toast.error(err.message);
          // console.log(err.response.message);
        });
    };

    return (
      <div className="container">
        <h3 className="h3"> Edit Farm</h3>
        <div className="row mt-4">
          <div className="col-sm-6">
            <div className="form-group">
              <label className="d-flex align-items-center jusitfy-content-left">
                Farm Id
              </label>
              <input
                id="farm_id"
                placeholder="Enter your farm_id"
                onChange={handleEditFarm}
                value={editfarm.farm_id}
                disabled="disabled"
                className="form-control mt-2"
              ></input>
            </div>
          </div>

          <div className="col-sm-6 ">
            <div className="form-group">
              <label className="d-flex align-items-center jusitfy-content-left">
                Farm Area
              </label>
              <input
                id="farm_area"
                // disabled="disabled"
                placeholder="Enter your farm_area"
                onChange={handleEditFarm}
                value={editfarm.farm_area}
                className="form-control mt-2"
              ></input>
            </div>
          </div>
        </div>

        <div className="row mt-3">
          <div className="col-sm-6 ">
            <div className="form-group">
              <label className="d-flex align-items-center jusitfy-content-left">
                Type
              </label>
              <input
                id="type"
                placeholder="Enter your type"
                onChange={handleEditFarm}
                value={editfarm.type}
                className="form-control mt-2"
              ></input>
            </div>
          </div>

          <div className="col-sm-6 ">
            <div className="form-group">
              <label className="d-flex align-items-center jusitfy-content-left">
                Produce
              </label>
              <input
                id="produce_in_kg"
                placeholder="Enter your produce"
                onChange={handleEditFarm}
                value={editfarm.produce_in_kg}
                className="form-control mt-2"
              ></input>
            </div>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-sm-6 ">
            <div className="form-group">
              <label className="d-flex align-items-center jusitfy-content-left">
                Platform fees
              </label>
              <input
                id="share"
                placeholder="Enter your Platform fees
                "
                onChange={handleEditFarm}
                value={editfarm.share}
                className="form-control mt-2"
              ></input>
            </div>
          </div>

          <div className="col-sm-6 ">
            <div className="form-group">
              <label className="d-flex align-items-center jusitfy-content-left">
                Address
              </label>
              <input
                id="address"
                placeholder="Enter your address"
                onChange={handleEditFarm}
                value={editfarm.address}
                className="form-control mt-2"
              ></input>
            </div>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-sm-6 ">
            <div className="form-group">
              <label className="d-flex align-items-center jusitfy-content-left">
                Sowing Month
              </label>
              <input
                type="date"
                id="sowing_month"
                placeholder="Enter your sowing_month"
                onChange={handleEditFarm}
                value={editfarm.sowing_month}
                className="form-control mt-2"
              ></input>
            </div>
          </div>
          <div className="col-sm-6 ">
            <div className="form-group">
              <label className="d-flex align-items-center jusitfy-content-left">
                Harvest Month
              </label>
              <input
                type="date"
                id="harvest_month"
                placeholder="Enter your harvest_month"
                onChange={handleEditFarm}
                value={editfarm.harvest_month}
                className="form-control mt-2"
              ></input>
            </div>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-sm-6 ">
            <div className="form-group">
              <label className="d-flex align-items-center jusitfy-content-left">
                Cost
              </label>
              <input
                id="cost"
                placeholder="Enter your cost"
                onChange={handleEditFarm}
                value={editfarm.cost}
                className="form-control mt-2"
              ></input>
            </div>
          </div>

          <div className="col-sm-6">
            <div className="form-group">
              <label className="d-flex align-items-center jusitfy-content-left">
                Stay
              </label>
              <select
                id="stay"
                onChange={handleEditFarm}
                value={editfarm.stay}
                className="form-control mt-2"
              >
                <option value="">-Please choose an option-</option>
                <option value="True">Yes</option>
                <option value="False">No</option>
              </select>
            </div>
          </div>
        </div>

        <div className="row mt-4">
          <div className="col-sm-12 ">
            <div className="form-group">
              <button
                className="btn btn-success"
                onClick={Addeditfarm}
                type="submit"
              >
                submit
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const AddStory = ({ value }) => {
    const coverimageref = useRef();
    const [addStory, SetAddStory] = useState({
      user_id: value,
      title: "",
      details: "",
      file: null,
    });

    const [formErrors, setFormErrors] = useState({
      title: "",
      details: "",
      file: "",
    });

    let handlestry = (e) => {
      let { id, value } = e.target;
      SetAddStory({ ...addStory, [id]: value });
      setFormErrors({ ...formErrors, [id]: "" });
    };

    let handlestorychange = (e) => {
      const file = e.target.files[0];
      SetAddStory({ ...addStory, file: file });
      setFormErrors({ ...formErrors, file: "" });
    };

    let subitHandler = (e) => {
      e.preventDefault();
      let fd = new FormData();
      if (!addStory.title) {
        setFormErrors({ ...formErrors, title: "Title is required" });
      } else if (!addStory.details) {
        setFormErrors({ ...formErrors, details: "Details are required" });
      } else if (!addStory.file) {
        setFormErrors({ ...formErrors, file: "Image is required" });
      } else {
        fd.append("user_id", addStory.user_id);
        fd.append("title", addStory.title);
        fd.append("details", addStory.details);
        fd.append("file", addStory.file);

        listingController
          .addstory(fd)
          .then((res) => {
            listingController
              .farmerlist("")
              .then((res) => {
                toast.success("Successful Post add");
                // console.log("first ////", res);
                // setData(res.data.response.message);
                dispatch(hideModal());
              })
              .catch((e) => {
                console.log(e);
              });
            fetch("")
              .then((res) => {
                return res.json();
              })
              .then((resp) => {
                empdatachange(resp);
              })
              .catch((err) => {
                console.log(err.message);
              });
          })
          .catch((er) => {
            toast.error("Error Added ");
            console.log(er);
          });
      }
    };

    return (
      <div className="container">
        <h3 className="h3">Add Post</h3>
        <div className="row mt-4">
          <label className="text-start">Title</label>
          <div className="col-sm-12">
            <input
              id="title"
              onChange={(e) => handlestry(e)}
              className="form-control mt-2"
              placeholder=""
            />
          </div>
        </div>
        <div className="row mt-3">
          <label className="text-start">Details</label>
          <div className="col-sm-12">
            <textarea
              id="details"
              onChange={(e) => handlestry(e)}
              className="form-control mt-2"
            />
          </div>
        </div>
        <div className="row mt-3">
          <label className="text-start">Add Image</label>
          <div className="col-sm-6">
            <input
              type="file"
              id="file"
              onChange={handlestorychange}
              className="mt-2"
            />
          </div>
        </div>
        <div className="row mt-4">
          <div className="col-sm-12 ">
            <div className="form-group">
              <button
                className="btn btn-success"
                type="submit"
                onClick={subitHandler}
              >
                submit
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  let HandleViewClik = (item) => {
    dispatch(showModal(<HandleViewCliks value={item.user_id} />));
  };
  const HandleViewCliks = (val) => {
    const [viewStory, setViewStory] = useState([]);
    const viewStorys = (value) => {
      listingController
        .viewstory(value)
        .then((res) => {
          setViewStory(res.data.response.message);
        })
        .catch((error) => {
          console.log(error.message);
        });
    };

    useEffect(() => {
      viewStorys(val);
    }, []);

    return (
      <div className="frmssa">
        <h3 className="h3">View Post</h3>
        <table className="table table-bordered mt-5">
          <thead className="bg-dark text-white">
            <tr>
              <td className="bst">Posted By</td>
              <td className="bst">Post</td>
              <td className="bst">Title</td>
              <td className="bst">Details</td>
            </tr>
          </thead>

          {viewStory.map((val, id) => {
            return (
              <tbody key={id}>
                <tr key={id}>
                  <td className="postby">
                    {val.posted_by ? val.posted_by : "-"}
                  </td>
                  <td className="">
                    <img src={val.url} className="rlssa" />
                  </td>
                  <td className="postby">{val.title ? val.title : "-"}</td>
                  <td className="rlsa">{val.details ? val.details : "-"}</td>
                  {/* <td>
                    <button
                      className="btn btn-success"
                      type="submit"
                      onClick={() => handleEditFarm(val)}
                    >
                      Edit
                    </button>
                  </td> */}
                </tr>
              </tbody>
            );
          })}
        </table>
      </div>
    );
  };

  return (
    <div className="">
      <div className="container">
        <div className="">
          <div className="col-sm-12">
            <div className="row">
              <div className="col-sm-4 "></div>
              <div className="col-sm-4 text-start text-sm-center">
                <img src={logo} className="mt-4" width={230} />
              </div>
              <div className="col-sm-4 text-center text-sm-end">
                {" "}
                <div className="">
                  <button
                    className="
                  btn btn-success heding mt-5"
                    type="submit"
                    onClick={() => logout()}
                  >
                    Log out
                    <FiLogOut className="mx-1" />
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="card-body">
            <div className="row mt-5">
              <div className="col-sm-6 d-flex align-items-center">
                <div className="">
                  <button
                    onClick={() => {
                      // alert("Welcome Farmer");
                      setShows(false);
                    }}
                    className={`btn btn-success heding  ${shows ? "" : "frms"}`}
                  >
                    Farmer
                  </button>
                  <button
                    onClick={() => {
                      // alert("Welcome Angel farmer");
                      setShows(true);
                    }}
                    className={`btn btn-success mx-3 heding ${
                      shows ? "frms" : ""
                    }`}
                  >
                    Angel Farmer
                  </button>
                </div>
              </div>
              <div className="col-sm-6 text-center text-sm-end">
                {shows ? (
                  <button
                    onClick={handleClick}
                    className="btn btn-success me-5 heding  text-center text-sm-end"
                  >
                    Angel Farmer (+)
                  </button>
                ) : (
                  <button
                    onClick={handleFamerClick}
                    className="btn btn-success me-5 heding text-center text-sm-end"
                  >
                    Farmer (+)
                  </button>
                )}
              </div>
            </div>
            <table className="table table-bordered mt-5">
              <thead className="bg-dark text-white">
                <tr>
                  <td className="bst">S.No </td>
                  <td className="bst">Name</td>

                  <td className="bst">Email</td>
                  <td className="bst">Address</td>
                  <td className="bst">Phone</td>
                  <td className="bst">Gender</td>
                  <td className="bst">Age</td>
                  <td className="bst">Profession</td>

                  <td className="bst">
                    Edit <span className="mx-2"></span>
                  </td>
                  {!shows && <td className="bst">Add Farm</td>}
                  {!shows && <td className=" bst">View Farm</td>}
                  {!shows && <td className="bst">Add Post</td>}
                  {!shows && <td className="bst">View Post</td>}
                  {/* <td className="bst">Delete</td> */}
                </tr>
              </thead>

              <tbody>
                {data &&
                  data.map((item, id) => (
                    <tr key={id}>
                      <td className="" style={{ fontSize: "14px" }}>
                        {id + 1}
                      </td>
                      <td className="col-sm-2" style={{ fontSize: "14px" }}>
                        {item.name}
                      </td>
                      <td className="col-sm-1" style={{ fontSize: "14px" }}>
                        {item.email == "" ||
                        item.email == null ||
                        item.email == "null"
                          ? "-"
                          : item.email}
                      </td>
                      <td className="col-sm-1" style={{ fontSize: "14px" }}>
                        {item.address ? item.address.slice(0, 15) : ""}
                      </td>
                      <td className="" style={{ fontSize: "14px" }}>
                        {item.contact_no}
                      </td>
                      <td className="" style={{ fontSize: "14px" }}>
                        {item.gender === "F" ? "Female" : "Male"}
                      </td>
                      <td className="" style={{ fontSize: "14px" }}>
                        {item.age == "" ||
                        item.age == null ||
                        item.age == "null"
                          ? "-"
                          : item.age}
                      </td>
                      <td className="" style={{ fontSize: "14px" }}>
                        {item.profession == "" ||
                        item.profession == null ||
                        item.profession == "null"
                          ? "-"
                          : item.profession}
                      </td>

                      <td className="" style={{ fontSize: "14px" }}>
                        <a
                          onClick={() => handleEditClick(item)}
                          className="icosn"
                        >
                          {/* Edit */}
                          <FaEdit className="" />
                        </a>
                      </td>
                      {!shows && (
                        <td className="">
                          {item.group_id == 3 ? (
                            <a
                              onClick={() => {
                                addFarmModal(item.user_id);
                              }}
                              className="icosn"
                            >
                              {/* Add Farm */}
                              <HiUserAdd className="" />
                            </a>
                          ) : (
                            ""
                          )}

                          {/* {item.group_id == 4 ? (
                        <button onClick={() => {}} className="btn remover ">
                          {" "}
                          Adopt Farm
                        </button>
                      ) : (
                        ""
                      )} */}
                        </td>
                      )}
                      {!shows && (
                        <td>
                          {item.group_id == 3 ? (
                            <a
                              onClick={() => HandleViewClick(item)}
                              className="icosn"
                            >
                              <FaEye className="" /> {/* View Farms */}
                            </a>
                          ) : (
                            ""
                          )}
                          {/* {item.group_id == 4 ? (
                        <button
                          onClick={() => {}}
                          className="btn btn-success mx-1"
                        >
                          View Farms
                        </button>
                      ) : (
                        "" 
                      )} */}
                        </td>
                      )}
                      {!shows && (
                        <td>
                          {item.group_id == 3 ? (
                            <a
                              onClick={() => {
                                addstoryModal(item.user_id);
                              }}
                              className="icosn"
                            >
                              <RiFileAddFill /> {/* Add Story */}
                            </a>
                          ) : (
                            ""
                          )}
                          {/* {item.group_id == 4 ? (
                        <button
                          onClick={() => {}}
                          className="btn btn-success mx-1"
                        >
                          View Farms
                        </button>
                      ) : (
                        ""
                      )} */}
                        </td>
                      )}
                      {!shows && (
                        <td>
                          {" "}
                          {item.group_id == 3 ? (
                            <a
                              onClick={() => HandleViewClik(item)}
                              className="icosn"
                            >
                              {" "}
                              <FaStreetView />
                              {/* View Story */}
                            </a>
                          ) : (
                            ""
                          )}
                          {/* {item.group_id == 4 ? (
                        <button
                          onClick={() => {}}
                          className="btn btn-success mx-1"
                        >
                          View Farms
                        </button>
                      ) : (
                        ""
                      )} */}
                        </td>
                      )}
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmpListing;
