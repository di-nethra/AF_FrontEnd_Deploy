import React, {useEffect, useState} from 'react';
import axios from "axios";
import researchIMG from "../../../public/images/reseachs.webp";

const DisplayStudentsView = () => {
    const [referenceDetails, setReferenceDetails] = useState([]);
    const [id, setID] = useState("");
    const [studentId, setStudentId] = useState("");
    const [email, setEmail] = useState("");
    const [userName, setUserName] = useState("");
    const [contactNumber, setContactNumber] = useState("");
    const [referenceData, setReferenceData] = useState([]);

    useEffect(() => {
        fetch(`https://floating-meadow-01028.herokuapp.com/api/student`)
            .then((response) => response.json())
            .then((responseData) => {
                setReferenceDetails(responseData);
            });
        console.log(referenceDetails);
    }, []);

    useEffect(() => {
        fetch(`https://floating-meadow-01028.herokuapp.com/api/student/${id}`)
            .then((response) => response.json())
            .then((responseData) => {
                setReferenceData(responseData);
            });
        console.log(referenceData);
    }, []);

    let data = {
        studentId:studentId,
        email:email,
        userName:userName,
        contactNumber:contactNumber,
    };

    let submitReference = async (e) => {
        e.preventDefault();
        try {
            let res = await axios.put(
                `https://floating-meadow-01028.herokuapp.com/api/student/${id}`,
                data
            );
            if (res) {
                console.log(data);
                alert("student updated successfully");
                window.location.href = "/admin/viewStudents";
            } else {
                alert("Some error occured");
            }
        } catch (err) {
            console.log(err);
        }
    };

    const deleteReference = () => {
        if (window.confirm("Do you want to delete record")) {
            axios
                .delete(`https://floating-meadow-01028.herokuapp.com/api/student/${id}`)
                .then((res) => {
                    alert("Deleted successfuly");
                    window.location.href = "/admin/viewStudents";
                });
        } else {
            alert("Record not deleted");
        }
    };

    return (

        <div className="container">
            <br></br>

            <div className="card text-center">
                <div className="card-header">
                    <h3><b>Student Details</b></h3>
                </div>
                <div className="card-body">
                    <img className="card-img-top" src={researchIMG} alt="Card image cap" style={{width: '150px'}}/>
                    <h6 className="card-title">Manage Student users who are logged in to the RPM System.</h6>
                    {/* <a href="#" class="btn btn-primary">Go somewhere</a> */}
                </div>
            </div>
            <br></br>
            <table className="table">
                <thead className="thead-dark">
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Student Id</th>
                    <th scope="col">Email</th>
                    <th scope="col">User Name</th>
                    <th scope="col">Contact Number</th>
                    <th scope="col">Action</th>
                </tr>
                </thead>
                <tbody>
                {referenceDetails.map((item, index) => {
                    return (
                        <tr>
                            <td>{index + 1}</td>
                            <td>{item.studentId}</td>
                            <td>{item.email}</td>
                            <td>{item.userName}</td>
                            <td>{item.contactNumber}</td>
                            <td>
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    data-toggle="modal"
                                    data-target="#exampleModalCenter"
                                    onClick={() => setID(item._id)}
                                >
                                    View
                                </button>

                                <div
                                    className="modal fade"
                                    id="exampleModalCenter"
                                    tabIndex="-1"
                                    role="dialog"
                                    aria-labelledby="exampleModalCenterTitle"
                                    aria-hidden="true"
                                >
                                    <div
                                        className="modal-dialog modal-dialog-centered"
                                        role="document"
                                    >
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h5 className="modal-title" id="exampleModalLongTitle">
                                                    Update Student
                                                </h5>
                                                <button
                                                    type="button"
                                                    className="close"
                                                    data-dismiss="modal"
                                                    aria-label="Close"
                                                    onClick={() => setID(item._id)}
                                                >
                                                    <span aria-hidden="true">&times;</span>
                                                </button>
                                            </div>
                                            <div className="modal-body">
                                                <label>Enter Student ID</label>
                                                <input
                                                    placeholder="Student ID"
                                                    type="text"
                                                    className="form-control"
                                                    id="roomType"
                                                    onChange={(e) => setStudentId(e.target.value)}
                                                    required
                                                />
                                            </div>

                                            <div className="modal-body">
                                                <label>Enter Email</label>
                                                <input
                                                    placeholder="Email"
                                                    type="text"
                                                    className="form-control"
                                                    id="roomType"
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    required
                                                />
                                            </div>

                                            <div className="modal-body">
                                                <label>Enter User Name</label>
                                                <input
                                                    placeholder="User Name"
                                                    type="text"
                                                    className="form-control"
                                                    id="roomType"
                                                    onChange={(e) => setUserName(e.target.value)}
                                                    required
                                                />
                                            </div>
                                            <div className="modal-body">
                                                <label>Enter Contact Number</label>
                                                <input
                                                    placeholder="Contact Number"
                                                    type="text"
                                                    className="form-control"
                                                    id="roomType"
                                                    onChange={(e) => setContactNumber(e.target.value)}
                                                    required
                                                />
                                            </div>

                                            <div className="modal-footer">
                                                <button
                                                    type="button"
                                                    className="btn btn-secondary"
                                                    data-dismiss="modal"
                                                >
                                                    Close
                                                </button>
                                                <button
                                                    type="button"
                                                    className="btn btn-primary"
                                                    onClick={submitReference}
                                                >
                                                    Save changes
                                                </button>

                                                <button
                                                    type="button"
                                                    className="btn btn-primary"
                                                    onClick={deleteReference}
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    );
                })}
                </tbody>
            </table>
        </div>
    );
};

export default DisplayStudentsView;