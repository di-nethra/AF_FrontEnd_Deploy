import React, {useEffect, useState} from "react";
import axios from "axios";
import presentationIMG from "../../../public/images/presentations.webp";

export default function SupervisorTeams() {

    const [topicDetails, setTopicDetails] = useState([]);
    const [topicData, setTopicData] = useState([]);
    const [status, setStatus] = useState("");
    const [id, setID] = useState("");
    const [chatData, setChatData] = useState([]);
    const [message, setMessage] = useState("");

    let user = "SP001"
    useEffect(() => {
        fetch(`https://floating-meadow-01028.herokuapp.com/api/researchGroup/`)
            .then((response) => response.json())
            .then((responseData) => {
                setTopicDetails(responseData);
            });
        console.log(topicDetails);
    }, []);

    useEffect(() => {
        fetch(`https://floating-meadow-01028.herokuapp.com/api/chatData`)
            .then((response) => response.json())
            .then((responseData) => {
                setChatData(responseData);
            });
        console.log(chatData);
    }, []);

    let datanew = {
        researchTeamId: "RESE11",
        userName: "Sanath",
        message: message,
        date: new Date(),
    };

    useEffect(() => {
        fetch(`https://floating-meadow-01028.herokuapp.com/api/researchGroup/${id}`)
            .then((response) => response.json())
            .then((responseData) => {
                setTopicData(responseData);
            });
        console.log(topicData);
    }, []);

    let data = {
        studentGroupId: topicData.studentGroupId,
        topicID: topicData.topicID,
        researchPanelId: topicData.researchPanelId,
        supervisor: topicData.supervisor,
        coSupervisor: topicData.coSupervisor,
        chatID: topicData.chatID,
        status: topicData.status,
    }

    let submitMessage = async (e) => {
        e.preventDefault();
        try {
            let res = await axios.post("https://floating-meadow-01028.herokuapp.com/api/chatData", datanew);
            if (res) {
                console.log(data);
                window.location.href = "/supervisor/teams";
            } else {
                alert("Some error occured");
            }
        } catch (err) {
            alert("Error occured in the process");
            console.log(err);
        }
    };

    return (
        <div className="container">
            <br></br>
            <div class="card text-center">
  <div class="card-header">
  <h3><b>Superevisor teams chat</b></h3>
  </div>
  <div class="card-body">
    <img class="card-img-top" src={presentationIMG} alt="Card image cap" style={{width: '150px'}}/>
    <h6 class="card-title">Communicate with team members and increase collaboration.</h6>
    {/* <a href="#" class="btn btn-primary">Go somewhere</a> */}
  </div>
</div>
            <br></br>
            <table class="table">
                <thead class="thead-dark">
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Student Group ID</th>
                    <th scope="col">Research Panel ID</th>
                    <th scope="col">Co-Supervisor ID</th>
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
                            <td>{item.researchPanelId}</td>
                            <td>{item.coSupervisor}</td>
                            <td>{item.status}</td>
                            <td>
                                <button
                                    type="button"
                                    class="btn btn-primary"
                                    data-toggle="modal"
                                    data-target="#newModalCenter"
                                    onClick={() => setID(item._id)}
                                >
                                    Chat
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
                                                    Chat With Team
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
                                                <div className="container">
                                                    <div className="input-group mb-3">
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            placeholder="enter message"
                                                            aria-label="Recipient's username"
                                                            aria-describedby="basic-addon2"
                                                            onChange={(e) => setMessage(e.target.value)}
                                                        />
                                                        <div className="input-group-append">
                                                            <button
                                                                className="btn btn-outline-secondary"
                                                                type="button"
                                                                onClick={submitMessage}
                                                            >
                                                                Add message
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <br></br>
                                                    <div className="container">
                                                        <div className="card" style={{maxHeight: "1500px"}}>
                                                            {chatData.map((item, index) => {
                                                                return (
                                                                    <p className="card-body">
                                                                        {index + 1} ( {item.userName} ) {item.message}
                                                                    </p>
                                                                );
                                                            })}
                                                        </div>
                                                    </div>
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