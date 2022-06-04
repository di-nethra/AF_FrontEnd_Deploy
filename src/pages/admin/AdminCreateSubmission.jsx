import React, {useState} from 'react';
import {TextField, Typography, Button, Card, FormGroup} from "@mui/material";
import axios from "axios";
import presentationIMG from "../../../public/images/presentations.webp";
import Swal from "sweetalert2";
const AdminCreateSubmission = () => {

    const [title,setTitle]=new useState("");
    const [startDate,setStartDate]=useState(null);
    const [endDate,setEndDate]=useState(null);
    // const [value, setValue] = React.useState(new Date('2014-08-18T21:11:54'));

    // const handleChange = (newValue) => {
    //     setValue(newValue);
    // };




    const postAdminSubmission=()=>{
        axios.post("https://floating-meadow-01028.herokuapp.com/api/adminSubmission",{
            title,
            startDate,
            endDate
        }).then( async res=>{
            console.log(res)
            await Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Submission Added',
                showConfirmButton: false,
                timer: 1500
            })
        }).catch(err=>{
            console.log(err)
        })

    }
    return (
        <div>
            <br></br>

            <div className="card text-center container">
                <div className="card-header">
                    <h3><b>Create Submissions</b></h3>
                </div>
                <div className="card-body">
                    <img className="card-img-top" src={presentationIMG} alt="Card image cap" style={{width: '150px'}}/>
                    <h6 className="card-title">Admin can create submissions for students who are logged in to the RPM System.</h6>
                    {/* <a href="#" class="btn btn-primary">Go somewhere</a> */}
                </div>
            </div>
            <br></br>
            <FormGroup style={{marginLeft:"200px",marginRight:"200px",marginTop:"10px"}}>
            <TextField
                onChange={(e)=>{
                    setTitle(e.target.value);
                }}
                variant="outlined"
                margin="normal"
                required
                label={"Submission Title"}
                name="submissionTitle" />
            <br />
            {/*<DateTimePicker*/}
            {/*    label="Date&Time picker"*/}
            {/*    value={value}*/}
            {/*    onChange={handleChange}*/}
            {/*    renderInput={(params) => <TextField {...params} />}*/}
            {/*/>*/}
            <TextField
                onChange={(e)=>{
                    setStartDate(e.target.value);
                }}
                variant="outlined"
                margin="normal"
                required
                label={"Start Date"}
                name="startDate" />
            <br />
            <TextField
                onChange={(e)=>{
                    setEndDate(e.target.value);
                }}
                variant="outlined"
                margin="normal"
                required
                label={"End Date"}
                name="endDate" />
            <br />
            <Button onClick={postAdminSubmission} variant={"contained"} size={"large"}  color="primary" style={{backgroundColor:"#005792"}} >Create Submission</Button>
            </FormGroup>
        </div>
    );
};

export default AdminCreateSubmission;