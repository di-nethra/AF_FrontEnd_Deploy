import React, {useState} from 'react';
import "./featuredInfo.css";
import image from "../../assests/research.png"

import {useEffect} from "react";

export default function SupervisorDashboard() {
    const [team, setTeams] = useState([]);
    useEffect(() => {
        fetch(`https://floating-meadow-01028.herokuapp.com/api/researchGroup/`)
            .then((response) => response.json())
            .then((responseData) => {
                setTeams(responseData);
            });
    }, []);
    const teamCount = team.length;

    const [topic, setTopics] = useState([]);
    let user = "SP001"
    useEffect(() => {
        fetch(`https://floating-meadow-01028.herokuapp.com/api/researchTopic/feedbackGiven/${user}`)
            .then((response) => response.json())
            .then((responseData) => {
                setTopics(responseData);
            });
    }, []);
    const topicCount = topic.length;

    const [submission, setSubmissions] = useState([]);
    useEffect(() => {
        fetch(`https://floating-meadow-01028.herokuapp.com/api/makeSubmissionAll`)
            .then((response) => response.json())
            .then((responseData) => {
                setSubmissions(responseData);
            });
    }, []);
    const submissionCount = submission.length;

    return (
        <div className="featured">
            <div className="featuredItem">

                    <span className="featuredTitle">Assigned Teams Count</span>
                    <div className="featuredMoneyContainer">
                        <span className="featuredMoney">{teamCount}</span>
                        <span className="featuredMoneyRate">
              {/*<ArrowUpwardOutlinedIcon className="featuredIcon" />*/}
            </span>
                    </div>
                    <span className="featuredSub">Total team count for assigned Supervisor</span>

            </div>
            <div className="featuredItem">

                    <span className="featuredTitle">Assigned Topic Requests to Approve</span>
                    <div className="featuredMoneyContainer">
                        <span className="featuredMoney">{topicCount}</span>
                        <span className="featuredMoneyRate">
              {/*<TransformOutlinedIcon className="featuredIcon" />*/}
            </span>
                    </div>
                    <span className="featuredSub">Total topic requests count to consider</span>

            </div>
            <div className="featuredItem">

                    <span className="featuredTitle">Assigned Student Submissions to Consider</span>
                    <div className="featuredMoneyContainer">
                        <span className="featuredMoney">{submissionCount}</span>
                        <span className="featuredMoneyRate">
              {/*<DoneOutlinedIcon className="featuredIcon" />*/}
            </span>
                    </div>
                    <span className="featuredSub">Total student submissions to consider </span>
            </div>
            <div>
                <img src={image} alt="supervisor image"/>
            </div>
        </div>

    );
}
