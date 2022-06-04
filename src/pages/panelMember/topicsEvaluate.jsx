import React, { useState, useEffect } from "react";
import axios from "axios";
import submissionsIMG from "../../../public/images/submission.webp";

function TopicsEvaluate() {
  const [topicDetails, setTopicDetails] = useState([]);
  const [feedback, setFeedback] = useState("");
  const [id, setID] = useState("");
  const [loggedUser, setLoggedUser] = useState("");

  const [topicData, setTopicData] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    if (user) {
      setLoggedUser(user[0].staffId);
    }
  }, []);

  useEffect(() => {
    fetch(`https://floating-meadow-01028.herokuapp.com/api/researchTopic`)
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
    feedback: feedback,
    status: topicData.status
  }

  let submitFeedback = async (e) => {
    e.preventDefault();
    try {
      let res = await axios.put(
        `https://floating-meadow-01028.herokuapp.com/api/researchTopic/${id}`,
        data
      );
      if (res) {
        console.log(data);
        alert("Topic feedback added successfully");
        window.location.href = "/panelMember/topics";
      } else {
        alert("Some error occured");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const topicRequets = [];

  for (let i = 0; i < topicDetails.length; i++) {
    if (topicDetails[i].researchPanelId === loggedUser) {
      topicRequets.push(topicDetails[i]);
    }
  }

  return (
    <div className="container">
      <br></br>
      <div class="card text-center">
  <div class="card-header">
  <h3><b>Topic evaluation</b></h3>
  </div>
  <div class="card-body">
    <img class="card-img-top" src={submissionsIMG} alt="Card image cap" style={{width: '150px'}}/>
    <h6 class="card-title">Manage Topics by evaluating all the topic details added to a specific panel.</h6>
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
            <th scope="col">Supervisor</th>
            <th scope="col">Co-Superviso</th>
            <th scope="col">Feedback</th>
            <th scope="col">Status</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {topicRequets.map((item, index) => {
            return (
              <tr>
                <td>{index + 1}</td>
                <td>{item.studentGroupId}</td>
                <td>{item.topic}</td>
                <td>{item.researchPanelId}</td>
                <td>{item.supervisor}</td>
                <td>{item.coSupervisor}</td>
                <td>{item.feedback}</td>
                <td>{item.status}</td>
                <td>
                  <button
                    type="button"
                    class="btn btn-primary"
                    data-toggle="modal"
                    data-target="#exampleModalCenter"
                    onClick={() => setID(item._id)}
                  >
                    Add topic evaluation
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
                            Evaluate Topic Selection
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
                          <label>Enter the Feedback</label>
                          <input
                            placeholder="enter your feedback"
                            type="text"
                            className="form-control"
                            id="roomType"
                            onChange={(e) => setFeedback(e.target.value)}
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

export default TopicsEvaluate;
