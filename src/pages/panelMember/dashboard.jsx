import React, { useState, useEffect } from "react";
import presentationIMG from "../../../public/images/presentations.webp";
import researchIMG from "../../../public/images/reseachs.webp";
import submissionsIMG from "../../../public/images/submission.webp";
import Chat from "./dashChat";

export default function dashboard() {
  const [submissionDetails, setSubmissionDetails] = useState([]);
  const [reseachGroupDetails, setResearchGroupDetails] = useState([]);
  const [loggedUser, setLoggedUser] = useState("");
  const [referenceDetails, setReferenceDetails] = useState([]);
  const [topicDetails, setTopicDetails] = useState([]);

  useEffect(() => {
    fetch(`https://floating-meadow-01028.herokuapp.com/api/reference`)
      .then((response) => response.json())
      .then((responseData) => {
        setReferenceDetails(responseData);
      });
    console.log(referenceDetails);
  }, []);

  const referenceCount = [];

  for (let i = 0; i < referenceDetails.length; i++) {
    if (referenceDetails[i].panelId === loggedUser) {
      referenceCount.push(referenceDetails[i]);
    }
  }

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

  const topicCount = [];

  for (let i = 0; i < topicDetails.length; i++) {
    if (topicDetails[i].researchPanelId === loggedUser) {
      topicCount.push(topicDetails[i]);
    }
  }

  useEffect(() => {
    fetch(`https://floating-meadow-01028.herokuapp.com/api/researchGroup`)
      .then((response) => response.json())
      .then((responseData) => {
        setResearchGroupDetails(responseData);
      });
    console.log(submissionDetails);
  }, []);

  const count = [];

  for (let i = 0; i < reseachGroupDetails.length; i++) {
    if (reseachGroupDetails[i].researchPanelId === loggedUser) {
      count.push(reseachGroupDetails[i]);
    }
  }

  return (
    <div class="container" style={{ marginTop: "20px" }}>
      <div class="row row-cols-1 row-cols-md-3 g-4">
        <div class="col">
          <div class="card h-100 shadow-lg p-3 mb-5 bg-white rounded border border-primary">
            <img src={presentationIMG} class="card-img-top" alt="..." />
            <div class="card-body">
              <h5 class="card-title">References</h5>
              <p class="card-text">
                All References - {referenceDetails.length}
              </p>
              <p class="card-text">My References - {referenceCount.length}</p>

              <button
                type="button"
                class="btn btn-primary"
                data-toggle="modal"
                data-target="#exampleModalCenter"
              >
                view references
              </button>

              <div
                class="modal fade"
                id="exampleModalCenter"
                tabindex="-1"
                role="dialog"
                aria-labelledby="exampleModalCenterTitle"
                aria-hidden="true"
              >
                <div class="modal-dialog modal-dialog-centered" role="document">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="exampleModalLongTitle">
                        Uploaded references
                      </h5>
                      <button
                        type="button"
                        class="close"
                        data-dismiss="modal"
                        aria-label="Close"
                      >
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div class="modal-body">
                      {referenceCount.map((item, index) => {
                        return (
                          <tr>
                            <td>
                              {index + 1}. {item.title}{" "}
                              <a href={item.description}>click here to view</a>
                            </td>
                          </tr>
                        );
                      })}
                    </div>
                    <div class="modal-footer">
                    <a
                        class="btn btn-secondary"
                        href="/panelMember/reference"
                      >
                        Go to page
                      </a>
                      <button
                        type="button"
                        class="btn btn-secondary"
                        data-dismiss="modal"
                      >
                        Close
                      </button>

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col">
          <div class="card h-100 shadow-lg p-3 mb-5 bg-white rounded border border-primary">
            <img src={researchIMG} class="card-img-top" alt="..." />
            <div class="card-body">
              <h5 class="card-title">Research groups</h5>
              <p class="card-text">
                Research groups - {reseachGroupDetails.length}
              </p>
              <p class="card-text">Assigned Research groups - {count.length}</p>

              <button
                type="button"
                class="btn btn-primary"
                data-toggle="modal"
                data-target="#exampleModalCenter1"
              >
                view Groups
              </button>

              <div
                class="modal fade"
                id="exampleModalCenter1"
                tabindex="-1"
                role="dialog"
                aria-labelledby="exampleModalCenterTitle"
                aria-hidden="true"
              >
                <div class="modal-dialog modal-dialog-centered" role="document">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="exampleModalLongTitle">
                        Assigned Research Groups
                      </h5>
                      <button
                        type="button"
                        class="close"
                        data-dismiss="modal"
                        aria-label="Close"
                      >
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div class="modal-body">
                      {count.map((item, index) => {
                        return (
                          <tr>
                            <td>
                              {index + 1}. {item.studentGroupId} (
                              <b>{item.status}</b>)
                            </td>
                          </tr>
                        );
                      })}
                    </div>
                    <div class="modal-footer">
                      
                      <button
                        type="button"
                        class="btn btn-secondary"
                        data-dismiss="modal"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="card h-100 shadow-lg p-3 mb-5 bg-white rounded border border-primary">
            <img src={submissionsIMG} class="card-img-top" alt="..." />
            <div class="card-body">
              <h5 class="card-title">Topic Requests</h5>
              <p class="card-text">
                No of all topic requests - {topicDetails.length}
              </p>
              <p class="card-text">
                No of my topic requests - {topicCount.length}
              </p>

              <button
                type="button"
                class="btn btn-primary"
                data-toggle="modal"
                data-target="#exampleModalCenter2"
              >
                view Topics
              </button>

              <div
                class="modal fade"
                id="exampleModalCenter2"
                tabindex="-1"
                role="dialog"
                aria-labelledby="exampleModalCenterTitle"
                aria-hidden="true"
              >
                <div class="modal-dialog modal-dialog-centered" role="document">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="exampleModalLongTitle">
                        Assigned topic requests
                      </h5>
                      <button
                        type="button"
                        class="close"
                        data-dismiss="modal"
                        aria-label="Close"
                      >
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div class="modal-body">
                      {topicCount.map((item, index) => {
                        return (
                          <tr>
                            <td>
                              {index + 1}. {item.studentGroupId} {item.topic} (
                              <b>{item.feedback}</b>)
                            </td>
                          </tr>
                        );
                      })}
                    </div>
                    <div class="modal-footer">
                    <a
                        class="btn btn-secondary"
                        href="/panelMember/topics"
                      >
                        Go to page
                      </a>
                      <button
                        type="button"
                        class="btn btn-secondary"
                        data-dismiss="modal"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Chat />
    </div>
  );
}
