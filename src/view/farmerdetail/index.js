import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";


const EmpDetail = () => {
    const { empid } = useParams();

    const [empdata, empdatachange] = useState({});

    useEffect(() => {
        fetch("" + empid).then((res) => {
            return res.json();
        }).then((resp) => {
            empdatachange(resp);
        }).catch((err) => {
            console.log(err.message);
        })
    }, []);
    return (
        <div>
            {/* <div className="row">
                <div className="offset-lg-3 col-lg-6"> */}

               <div className="container">
                
            <div className=" row" style={{ "textAlign": "left" }}>
                <div className="col-sm-12">
                    <h2>Farmer</h2>
                </div>
                {/* <div className="card-body"></div> */}

                {empdata &&
                 
                    <div className="">
                        <h5 className="mt-2"> Farmer name is : {empdata.name}</h5>
                        <h5 className="mt-2">Address is:  {empdata.address}</h5>
                        <h5 className="mt-2">Email is : {empdata.email}</h5>
                        <h5 className="mt-2">Phone is : {empdata.phone}</h5>
                        <h5 className="mt-2">Gender is : {empdata.gender}</h5>
                        <h5 className="mt-2">Age is : {empdata.age}</h5>
                        <h5 className="mt-2">Profession is : {empdata.profession}</h5>
                        <Link className="btn btn-danger mt-2" to="/">Back to Listing</Link>
                    </div>
                }
                
            </div>
            </div>
            {/* </div>
            </div> */}
        </div >
    );
}

export default EmpDetail;