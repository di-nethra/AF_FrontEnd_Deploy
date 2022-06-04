import React, {useState} from 'react';
import Grid from '@mui/material/Grid';
import {TextField, Typography, Button, Card, Select, MenuItem, InputLabel} from "@mui/material";
import staffRegistration from "../../assests/staffRegistration.svg"
import "../student/CSS/index.css"
import SignNav from "../student/SignNav";
import axios from "axios";
import Swal from "sweetalert2";
// import PasswordField from "material-ui-password-field";

const StaffSignUp = () => {


    const [staffId,setStaffId]=useState("");
    const [userName,setUserName]=useState("");
    const [email,setEmail]=useState("");
    const [contactNumber,setContactNumber]=useState("");
    const [password,setPassword]=useState("");
    const [confPassword,setConfPassword]=useState("");
    const [role,setRole]=useState("");
    const [specializedArea,setSpecializedArea]=useState("");


    const postStaffUser=()=>{
        axios.post("https://floating-meadow-01028.herokuapp.com/api/staff",{
            staffId,
            userName,
            email,
            contactNumber,
            password,
            role,
            specializedArea

        }).then(async res=>{
            await Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'User Registered Successfully',
                showConfirmButton: false,
                timer: 1500
            })
            console.log(res)
            window.location.href="/"
        }).catch(err=>{
            console.log(err)
        })
    }


    return (

        <div>

            <Card style={{backgroundColor:"whitesmoke",marginTop:"50px", marginLeft:"100px",marginRight:"100px",paddingBottom:"50px"}}>
            <Grid container justifyContent="space-around">
                <Grid item xs={4}>
                    <img className="image" src={staffRegistration} alt="60" />
                </Grid>
                <Grid item xs={4} style={{marginTop:"20px"}}>
                    <div className="paper">
                        <Typography  component="h1" variant="h4" style={{textAlign:"left",color:"#00007B",fontWeight:"bold"}}>
                           Staff Sign up
                        </Typography>
                        <form className="form" noValidate>
                            <TextField
                                className="textField"
                                variant="filled"
                                margin="normal"
                                required
                                fullWidth
                                value={staffId}
                                onChange={e=>{
                                    setStaffId(e.target.value)
                                }}
                                name="staffId"
                                label="Staff ID"
                            />
                            <TextField
                                className="textField"
                                variant="filled"
                                margin="normal"
                                required
                                fullWidth
                                value={userName}
                                onChange={e=>{
                                    setUserName(e.target.value)
                                }}
                                name="userName"
                                label="User Name"
                            />
                            <TextField
                                style={{color:"red"}}
                                className="textField"
                                variant="filled"
                                margin="normal"
                                required
                                fullWidth
                                value={email}
                                onChange={e=>{
                                    setEmail(e.target.value)
                                }}
                                label="Email"
                                name="email"
                                autoFocus
                            />

                            <TextField
                                className="textField"
                                variant="filled"
                                margin="normal"
                                required
                                fullWidth
                                value={contactNumber}
                                onChange={e=>{
                                    setContactNumber(e.target.value)
                                }}
                                name="contactNumber"
                                label="Contact Number"
                            />
                            <TextField
                                className="textField"
                                variant="filled"
                                margin="normal"
                                required
                                fullWidth
                                type="password"
                                value={password}
                                onChange={e=>{
                                    setPassword(e.target.value)
                                }}
                                name="password"
                                label="Password"
                            />
                            <TextField
                                className="textField"
                                variant="filled"
                                margin="normal"
                                required
                                fullWidth
                                type="password"
                                value={confPassword}
                                onChange={e=>{
                                    setConfPassword(e.target.value)
                                }}
                                name="confirmPassword"
                                label="Confirm Password"
                            />
                            <InputLabel id="demo-simple-select-filled-label">Role</InputLabel>
                            <Select

                                variant={"filled"}
                                value={role}

                                onChange={e=>{
                                    setRole(e.target.value)
                                }}
                                label={"role"}
                            >
                                <MenuItem value={"supervisor"}>Supervisor</MenuItem>
                                <MenuItem value={"coSupervisor"}>Co-Supervisor</MenuItem>
                                <MenuItem value={"panelMember"}>Panel Member</MenuItem>
                            </Select>

                            <TextField
                                className="textField"
                                variant="filled"
                                margin="normal"
                                required
                                fullWidth

                                value={specializedArea}
                                onChange={e=>{
                                    setSpecializedArea(e.target.value)
                                }}
                                name="specializationField"
                                label="Specialization Field"
                            />



                            <Button
                                style={{backgroundColor:"#00007B",marginTop:"15px"}}
                                fullWidth
                                variant="contained"
                                size={"large"}
                                color="primary"
                                className="submit"
                                onClick={postStaffUser}
                            >
                                Register
                            </Button>

                        </form>
                    </div>

                </Grid>
            </Grid>
            </Card>
        </div>
    );
};

export default StaffSignUp;