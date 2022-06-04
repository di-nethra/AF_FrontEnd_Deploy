import React from 'react';
import Grid from "@mui/material/Grid";
import staffRegistration from "../../assests/staffChoose.svg"
import studentRegistration from "../../assests/studentChoose.svg"
import "../student/CSS/index.css"
import {Card, Typography} from "@mui/material";
import {Link} from "react-router-dom";
const SignUpChoose = () => {
    return (
        <div>

            <Card style={{backgroundColor:"whitesmoke",marginTop:"50px", marginLeft:"100px",marginRight:"100px",paddingBottom:"50px"}}>
                <Typography variant={"h4"} fontWeight={"bold"} marginTop={"10px"} textAlign={"center"} color={"#00007B"}>Select Registration Type</Typography>
            <Grid container justifyContent={"center"} className="logo">
                <Grid item xs={12} md={6} className="optionImageOne" textAlign={"center"}>
                <Link to={"/registerStudent"}>
                        <img
                            src={studentRegistration}
                            alt="60"
                            className="option"
                            //onClick={() => history.push("/payments/mobileqr")}
                        />
                </Link>
                    <Typography variant={"h5"} fontWeight={"bold"} style={{marginTop:"20px"}} textAlign={'center'}>Student Registration</Typography>

                </Grid>
                <Grid item xs={12} md={6} className="optionImageTwo" textAlign={"center"}>

                    <Link to={"/registerStaff"}>
                    <img
                        src={staffRegistration}
                        alt="60"
                        className="option"
                        //onClick={() => history.push("/payments/mobileqr")}

                    />
                    </Link>
                    <Typography variant={"h5"} style={{marginTop:"20px"}} fontWeight={"bold"} textAlign={"center"}>Staff Registration</Typography>

                </Grid>

            </Grid>
            </Card>
        </div>
    );
};

export default SignUpChoose;