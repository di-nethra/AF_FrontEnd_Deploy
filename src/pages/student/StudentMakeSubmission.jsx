import React, {useEffect, useState} from 'react';
import ImageUpload from "./ImageUpload";
import axios from "axios";
import { Typography } from '@material-ui/core';


const StudentMakeSubmission = () => {

    const[title,setTitle]=useState("")
    const[startDate,setStartDate]=useState("");
    const[endDate,setEndDate]=useState("");
    const [submittedDate,setSubmittedDate]=useState("");
    const [studentId,setStudentId]=useState("");
    const [childData,setChildData]=useState("");
    const [dateRemaining,setDatesRemaining]=useState(0);


    console.log(startDate)
    console.log(endDate)
    let date1=new Date(startDate);
    let date2=new Date(endDate);

    let timeDiff=date2.getTime()-date1.getTime()
    let dateDiff=timeDiff/(1000*3600*24);



    // "@emotion/react": "^11.9.0",
    //     "@emotion/styled": "^11.8.1",
    //     "@mui/material": "^5.8.2",

    // "firebase": "^9.8.2",

    // setDatesRemaining(dateDiff);

    //setDatesRemaining(dateDiff)
    useEffect(()=>{

        axios.get("https://floating-meadow-01028.herokuapp.com/api/adminLatestSubmission").then(res=>{
            console.log(res.data[0].submittedStudent)
            setTitle(res.data[0].title)
            setStartDate(res.data[0].startDate)
            setEndDate(res.data[0].endDate)
            setStudentId("IT20233808")
            setSubmittedDate(new Date());

        }).catch(err=>{
            console.log(err)
        })

    },[])


    const childToParent=(data)=>{
        setChildData(data)
    }


    return (
        <div>

            <Typography variant='h4'>{title} Submission</Typography>
            <h5>Due Date: {endDate}</h5>
            <h5>Time Remaining: {dateDiff} Days</h5>
            <h1>{childData}</h1>
            <ImageUpload title={title} submittedDate={submittedDate} studentId={studentId} />
        </div>
    );
};

export default StudentMakeSubmission;