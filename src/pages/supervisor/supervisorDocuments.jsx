import React, {useEffect, useState} from "react";
import axios from "axios";
import researchIMG from "../../../public/images/reseachs.webp";

export default function SupervisorDocuments() {
    const [submissionDetails, setSubmissionDetails] = useState([]);
    const [evaluate, setEvaluate] = useState("");
    const [id, setID] = useState("");

    const [sumbissionData, setPresentationData] = useState([]);

    useEffect(() => {
        fetch(`https://floating-meadow-01028.herokuapp.com/api/makeSubmissionAll`)
            .then((response) => response.json())
            .then((responseData) => {
                setSubmissionDetails(responseData);
            });
        console.log(submissionDetails);
    }, []);

    useEffect(() => {
        fetch(`https://floating-meadow-01028.herokuapp.com/api/makeSubmission/${id}`)
            .then((response) => response.json())
            .then((responseData) => {
                setPresentationData(responseData);
            });
        console.log(sumbissionData);
    }, []);

    let data = {
        title: sumbissionData.title,
        submittedDate: sumbissionData.submittedDate,
        submittedStudent: sumbissionData.submittedStudent,
        imageUrl: sumbissionData.imageUrl,
        evaluation: evaluate
    }

    let submitFeedback = async (e) => {
        e.preventDefault();
        try {
            let res = await axios.put(
                `https://floating-meadow-01028.herokuapp.com/api/makeSubmission/${id}`,
                data
            );
            if (res) {
                console.log(data);
                alert("document submission marks added successfully");
                window.location.href = "/panelMember/presentation";
            } else {
                alert("Some error occured");
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="container">
            <br></br>
            <div class="card text-center">
  <div class="card-header">
  <h3><b>Document evaluation</b></h3>
  </div>
  <div class="card-body">
    <img class="card-img-top" src={researchIMG} alt="Card image cap" style={{width: '150px'}}/>
    <h6 class="card-title">Evaluate documents by adding marks for their submissions.</h6>
    {/* <a href="#" class="btn btn-primary">Go somewhere</a> */}
  </div>
</div>
            <br></br>
            <table class="table">
                <thead class="thead-dark">
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Title</th>
                    <th scope="col">submitted Date</th>
                    <th scope="col">submitted Student</th>
                    <th scope="col">Document</th>
                    <th scope="col">Marks</th>
                    <th scope="col">Action</th>
                </tr>
                </thead>
                <tbody>
                {submissionDetails.map((item, index) => {
                    return (
                        <tr>
                            <td>{index + 1}</td>
                            <td>{item.title}</td>
                            <td>{item.submittedDate}</td>
                            <td>{item.submittedStudent}</td>
                            <td><a href={item.imageUrl}>View</a></td>
                            <td>{item.evaluation}</td>
                            <td>
                                <button
                                    type="button"
                                    class="btn btn-primary"
                                    data-toggle="modal"
                                    data-target="#exampleModalCenter"
                                    onClick={() => setID(item._id)}
                                >
                                    Add Marks
                                </button>

                                <div
                                    class="modal fade"
                                    id="exampleModalCenter"
                                    tabindex="-1"
                                    role="dialog"
                                    aria-labelledby="exampleModalCenterTitle"
                                    aria-hidden="true"
                                >
                                    <div
                                        class="modal-dialog modal-dialog-centered"
                                        role="document"
                                    >
                                        <div class="modal-content">
                                            <div class="modal-header">
                                                <h5 class="modal-title" id="exampleModalLongTitle">
                                                    Marks for Submission
                                                </h5>
                                                <button
                                                    type="button"
                                                    class="close"
                                                    data-dismiss="modal"
                                                    aria-label="Close"
                                                    onClick={() => setID(item._id)}
                                                >
                                                    <span aria-hidden="true">&times;</span>
                                                </button>
                                            </div>
                                            <div class="modal-body">
                                                <label>Enter the Marks</label>
                                                <input
                                                    placeholder="enter your feedback"
                                                    type="text"
                                                    className="form-control"
                                                    id="roomType"
                                                    onChange={(e) => setEvaluate(e.target.value)}
                                                    required
                                                />
                                            </div>
                                            <div class="modal-footer">
                                                <button
                                                    type="button"
                                                    class="btn btn-secondary"
                                                    data-dismiss="modal"
                                                >
                                                    Close
                                                </button>
                                                <button
                                                    type="button"
                                                    class="btn btn-primary"
                                                    onClick={submitFeedback}
                                                >
                                                    Save changes
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
 }