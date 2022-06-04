import React, { useState, useEffect } from "react";
import axios from "axios";
import submissionsIMG from "../../../public/images/submission.webp";

export default function TopicsConfirmation() {

    const [topicDetails, setTopicDetails] = useState([]);
    const [topicData, setTopicData] = useState([]);
    const [status, setStatus] = useState("");
    const [id, setID] = useState("");

    let user = "SP001"
    useEffect(() => {
        fetch(`https://floating-meadow-01028.herokuapp.com/api/researchTopic/feedbackGiven/${user}`)
            .then((response) => response.json())
            .then((responseData) => {
                setTopicDetails(responseData);
            });
        console.log(topicDetails);
    }, []);

    useEffect(() => {
        fetch(`https://floating-meadow-01028.herokuapp.com/api/researchTopic/${id}`)
            .then((response) => response.json())
            .then((responseData) => {
                setTopicData(responseData);
            });
        console.log(topicData);
    }, []);

    let data = {
        studentGroupId: topicData.studentGroupId,
        topic: topicData.topic,
        researchPanelId: topicData.researchPanelId,
        supervisor: topicData.supervisor,
        coSupervisor: topicData.coSupervisor,
        feedback: topicData.feedback,
        status: status,
    }

    let accept = async (e) =>{
        e.preventDefault();
        data.status = 'accepted';
        try {
            let res = await axios.put(
                `https://floating-meadow-01028.herokuapp.com/api/researchTopic/${id}`,
                data
            );
            if (res) {
                console.log(data);
                alert("Topic accepted successfully");
                alert("Research group created successfully");
                window.location.href = "/supervisor/topics";
            } else {
                alert("Some error occured");
            }
        } catch (err) {
            console.log(err);
        }

    }
    let reject = async (e) =>{
        e.preventDefault();
        data.status = 'rejected';
        try {
            let res = await axios.put(
                `https://floating-meadow-01028.herokuapp.com/api/researchTopic/${id}`,
                data
            );
            if (res) {
                console.log(data);
                alert("Topic rejected successfully");
                window.location.href = "/supervisor/topics";
            } else {
                alert("Some error occured");
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="container">
            <br></br>
            <div class="card text-center">
  <div class="card-header">
  <h3><b>Topic confirmation</b></h3>
  </div>
  <div class="card-body">
    <img class="card-img-top" src={submissionsIMG} alt="Card image cap" style={{width: '150px'}}/>
    <h6 class="card-title">Manage students research topic requests as a supervisor.</h6>
    {/* <a href="#" class="btn btn-primary">Go somewhere</a> */}
  </div>
</div>
            <br></br>
            <table class="table">
                <thead class="thead-dark">
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Student Group ID</th>
                    <th scope="col">Topic</th>
                    <th scope="col">Research Panel ID</th>
                    <th scope="col">Co-Supervisor ID</th>
                    <th scope="col">Feedback</th>
                    <th scope="col">Status</th>
                    <th scope="col">Actions</th>
                </tr>
                </thead>
                <tbody>
                {topicDetails.map((item, index) => {
                    return (
                        <tr>
                            <td>{index + 1}</td>
                            <td>{item.studentGroupId}</td>
                            <td>{item.topic}</td>
                            <td>{item.researchPanelId}</td>
                            <td>{item.coSupervisor}</td>
                            <td>{item.feedback}</td>
                            <td>{item.status}</td>
                            <td>
                                <button
                                    type="button"
                                    class="btn btn-primary"
                                    data-toggle="modal"
                                    data-target="#newModalCenter"
                                    onClick={() => setID(item._id)}
                                >
                                    Confirmation
                                </button>

                                <div
                                    className="modal fade"
                                    id="newModalCenter"
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
                                                    Select the Confirmation
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
                                                <div className="col text-center">
                                                    <button
                                                        type="button"
                                                        className="btn btn-primary"
                                                        data-toggle="modal"
                                                        data-target="#newModalCenter"
                                                        onClick={accept}
                                                    >
                                                        Accept
                                                    </button>
                                                </div>
                                                    <br/>
                                                <div className="col text-center">
                                                    <button
                                                        type="button"
                                                        className="btn btn-danger"
                                                        data-toggle="modal"
                                                        data-target="#newModalCenter"
                                                        onClick={reject}
                                                    >
                                                        Reject
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="modal-footer">
                                                <button
                                                    type="button"
                                                    className="btn btn-secondary"
                                                    data-dismiss="modal"
                                                >
                                                    Close
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