import React from 'react';
import presentationIMG from "../../../public/images/presentations.webp";
import researchIMG from "../../../public/images/reseachs.webp";
import submissionsIMG from "../../../public/images/submission.webp";
import {Link} from "react-router-dom";

const AdminDashboard = () => {
    return (
        <div>
            <div className="card-deck" style={{marginTop:"50px",marginLeft:"20px",marginRight:"20px"}}>
                <div className="card">
                    <img className="card-img-top" src={presentationIMG} style={{marginTop:"50px"}} alt="Card image cap" />
                        <div className="card-body" style={{textAlign:'center'}}>
                            <h3  className="card-title">Staff Details</h3>
                            <Link to={"/admin/viewStaff"}>
                                <button  type="button" className="btn btn-primary">View Task</button>
                            </Link>

                        </div>
                </div>
                <div className="card">
                    <img className="card-img-top" src={researchIMG} alt="Card image cap" style={{marginTop:"50px"}} />
                        <div className="card-body" style={{textAlign:'center'}}>
                            <h3 className="card-title">Student Details</h3>
                            <Link to={"/admin/viewStudents"}>
                            <button  type="button" className="btn btn-primary">View Task</button>
                            </Link>
                        </div>
                </div>
                <div className="card">
                    <img className="card-img-top" style={{marginTop:"50px",marginLeft:"20px",marginRight:"20px"}} src={submissionsIMG} alt="Card image cap" />
                        <div className="card-body" style={{textAlign:'center'}}>
                            <h3 style={{textAlign:'center'}} className="card-title">Upload Marking Schemes</h3>
                            <Link to={"/admin/createSchema"}>
                            <button  type="button" className="btn btn-primary">View Task</button>
                            </Link>
                        </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;