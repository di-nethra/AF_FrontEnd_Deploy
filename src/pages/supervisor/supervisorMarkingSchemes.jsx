import React, {useEffect, useState} from "react";
import axios from "axios";
import researchIMG from "../../../public/images/reseachs.webp";

export default function SupervisorMarkingSchemes() {
    const [submissionDetails, setSubmissionDetails] = useState([]);
    const [evaluate, setEvaluate] = useState("");
    const [id, setID] = useState("");

    const [sumbissionData, setPresentationData] = useState([]);

    useEffect(() => {
        fetch(`https://floating-meadow-01028.herokuapp.com/api/markingSchema`)
            .then((response) => response.json())
            .then((responseData) => {
                setSubmissionDetails(responseData);
            });
        console.log(submissionDetails);
    }, []);

    return (
        <div className="container">
            <br></br>
            <div class="card text-center">
  <div class="card-header">
  <h3><b>View Marking Schemas</b></h3>
  </div>
  <div class="card-body">
    <img class="card-img-top" src={researchIMG} alt="Card image cap" style={{width: '150px'}}/>
    <h6 class="card-title">Get marking schemas students submissions.</h6>
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
                    <th scope="col">Marking Scheme</th>
                </tr>
                </thead>
                <tbody>
                {submissionDetails.map((item, index) => {
                    return (
                        <tr>
                            <td>{index + 1}</td>
                            <td>{item.title}</td>
                            <td>{item.submittedDate}</td>
                            <td><a href={item.imageUrl} role="button">View Marking</a></td>
                        </tr>
                    );
                })}
                </tbody>
            </table>
        </div>
    );


}