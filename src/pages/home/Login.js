import React, {useState} from 'react';
import axios from "axios";
import {Button, Card, TextField, Typography} from "@mui/material";
import Swal from 'sweetalert2'

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    let handleSubmit = async (e) => {
        e.preventDefault();

        const StudentResponse= await axios.get("https://floating-meadow-01028.herokuapp.com/api/student/"+email);
        const StaffResponse=await axios.get("https://floating-meadow-01028.herokuapp.com/api/staff/"+email);
        console.log("res:"+ StudentResponse.data);
        console.log("staff res:"+ StaffResponse.data);
        if(StudentResponse.data!==null && email!==""){
            if (password === StudentResponse.data[0].password) {

               await Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Logged In Successfully',
                    showConfirmButton: false,
                    timer: 1500
                })
                localStorage.setItem("loggedInUser", JSON.stringify(StudentResponse.data));
                window.location.href = "/student/dashboard";
            } else {
                alert("Incorrect password");

            }
        }else if(StaffResponse.data!==null && email!==""){
            if (password === StaffResponse.data[0].password) {
              await Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Logged In Successfully',
                    showConfirmButton: false,
                    timer: 1500
                })
                localStorage.setItem("loggedInUser", JSON.stringify(StaffResponse.data));
                console.log(StaffResponse.data[0].role)
                window.location.href = `/${StaffResponse.data[0].role}/dashboard`;
            } else {
                alert("Incorrect password for staff");
            }
        }else{
            alert("please try again!");
        }

    };
    return (
        <div className="container">
            <Typography style={{marginTop:"40px",marginBottom:"40px"}} fontWeight={"bold"} variant={"h3"} className="text-center">RPM Login</Typography>
<Card style={{    paddingLeft: "50px",
    paddingRight: "50px",
    paddingTop:" 50px",
    backgroundColor:"whiteSmoke"
}}>
            <form className="form" >
                <div className="form-group">

                    <TextField
                        label="Email"
                        type="text"
                        fullWidth
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">

                    <TextField
                        label="password"
                        type="password"
                        fullWidth
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                <br></br>
                <Button type="submit" onClick={handleSubmit} variant={"contained"} fullWidth size={"large"} color={"primary"}>
                    Login
                </Button>

                <h5 style={{marginTop:"20px"}}>Not a member? <a href="/SignUpChoose">Create Account</a>< /h5>
            </form>
            <br></br>
</Card>
        </div>
    );
};

export default Login;