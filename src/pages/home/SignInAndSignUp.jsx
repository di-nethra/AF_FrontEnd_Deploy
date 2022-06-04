import React, {useState} from 'react';
import "./CSS/style.css";
import axios from "axios";
const SignInAndSignUp = () => {

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
                alert("Logged In Successfully");
                localStorage.setItem("loggedInUser", JSON.stringify(StudentResponse.data));
                window.location.href = "/student/dashboard";
            } else {
                alert("Incorrect password");

            }
        }else if(StaffResponse.data!==null && email!==""){
            if (password === StaffResponse.data[0].password) {
                alert("Logged In Successfully");
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
        <div className={"loginForm"}>
        <div id="login-form-wrap">

            <form id="login-form">
                <h2 className={"text"}>Login</h2>
           <p className={"para"}>
               <input type="text" placeholder={"email"} className={"validation"} onChange={(e) => setEmail(e.target.value)} />
           </p>
            <p className={"para"}>
                <input type="text" className={"validation"} placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
            </p>
            <p className={"para"}>
                <input type="submit" onClick={handleSubmit} id="login" value="Login" />
            </p>
            </form>
            <div id="create-account-wrap">
                <p>Not a member? <a href="/SignUpChoose">Create Account</a>< /p>
            </div>
        </div>
        </div>
    );
};

export default SignInAndSignUp;


