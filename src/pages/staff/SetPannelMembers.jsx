import React, {useEffect, useState} from 'react';
import {Button, MenuItem, Select} from "@mui/material";
import axios from "axios";
import Swal from "sweetalert2";


const SetPanelMembers = () => {

    const [submissionDetails, setSubmissionDetails] = useState([]);


    useEffect(() => {
        fetch(`https://floating-meadow-01028.herokuapp.com/api/researchTopic/initial`)
            .then((response) => response.json())
            .then((responseData) => {
                setSubmissionDetails(responseData);
            });
        console.log(submissionDetails);
    }, []);


    let data = {
        researchPanelId:"PM004",
        status:"ready"
    }

    let updateStatus = async (e) => {
        e.preventDefault();
        try {
            let res = await axios.put(
                `https://floating-meadow-01028.herokuapp.com/api/researchTopic/${e.target.value}`,
                data
            );
            if (res) {

                console.log(data);
                await Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Status updated',
                    showConfirmButton: false,
                    timer: 1500
                })
                window.location.href = "/panelMember/setPanelMember";
            } else {
                alert("Some error occured");
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div>

            <div className="container">
                <br></br>
                <br></br>
                <table className="table">
                    <thead className="thead-dark">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">studentGroupId</th>
                        <th scope="col">title</th>
                        <th scope="col">Panel Member</th>
                        <th scope="col">Status</th>
                        <th scope="col">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {submissionDetails.map((item, index) => {
                        return (
                            <tr>
                                <td>{index + 1}</td>
                                <td>{item.studentGroupId}</td>
                                <td>{item.topic}</td>
                                <td> <Select

                                    variant={"filled"}
                                    // value={role}
                                    //
                                    // onChange={e=>{
                                    //     setRole(e.target.value)
                                    // }}
                                    label={"role"}
                                >
                                    <MenuItem value={"supervisor"}>Jagath Jayarathna</MenuItem>
                                    <MenuItem value={"coSupervisor"}>Chamara Silva</MenuItem>
                                    <MenuItem value={"panelMember"}>Danushka Ranasingher</MenuItem>
                                </Select></td>
                                <td>{item.status}</td>
                                <td>
                                    <button
                                        type="button"
                                        className="btn btn-primary"
                                        data-toggle="modal"
                                        data-target="#exampleModalCenter"
                                        value={item._id}
                                        onClick={updateStatus}
                                    >
                                        Set Panel Member
                                    </button>
                                </td>

                            </tr>
                        );
                    })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default SetPanelMembers;