import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from "axios";
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import studentRegistration from "../../../assests/researchTopic.svg";

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '50ch',
      marginLeft: '75px',
    marginTop: '20px',
    },
  },
  button: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  maingrid: {
    width: '80%',
    marginLeft: '190px',
    marginTop: '20px'
  },
}));


function ResearchTopic() {
  const classes = useStyles();

    
    const [topic, setTopic] = useState("")
    const [researchPanelId, setResearchPanelId] = useState(" ")
    const [supervisor, setSupervisor] = useState("")
    const [coSupervisor, setCoSupervisor] = useState("")
    const [feedback, setFeedback] = useState(" ")
    const [status, setStatus] = useState("initial")
    const [studentGroupId, setStudentGroupId] = useState([])

    const [staffs, setStaffs] = useState([])

// let data1 = {
//     staffId: staffId,
//     name: name,
//     role: role
// }

const cosup = staffs.filter(staffs => 
    staffs.role == "supervisor" || staffs.role == "coSupervisor");

let data = {
    studentGroupId: studentGroupId,
    topic: topic,
    researchPanelId: researchPanelId,
    supervisor: supervisor,
    coSupervisor: coSupervisor,
    feedback: feedback,
    status: status
}

useEffect(() => {
    fetch(`https://floating-meadow-01028.herokuapp.com/api/staff`)
      .then((response) => response.json())
      .then((responseData) => {
        setStaffs(responseData);
      });
    console.log(staffs);
  }, []);

let handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await axios.post("https://floating-meadow-01028.herokuapp.com/api/researchTopic", data);
      if (res) {
        console.log(data);
        alert("Topic Request send Successfully");
        window.location.href="/student/dashboard"
      } else {
        alert("Some error occured");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
    <Card className={classes.maingrid}>
    <Grid container justifyContent="space-around">


<Grid item xs={4} style={{marginTop:"20px"}}>
    <form className={classes.root} onSubmit={handleSubmit} >
    <h2 style={{color:"#00007b"}} >Research Topic Request</h2>
      <TextField 
      id="studentGroup" 
      label="Student Group" 
      variant="outlined" 
      onChange={(e) => setStudentGroupId(e.target.value)}
      />
      <br></br>
      <TextField 
      id="topic" 
      label="Topic" 
      variant="outlined" 
      onChange={(e) => setTopic(e.target.value)}
      required
      />
      
      <br></br>
      <TextField 
      id="supervisor" 
      label="Supervisor" 
      variant="outlined" 
      onChange={(e) => setSupervisor(e.target.value)}
      required

      />
      <br></br>
      <TextField 
      id="coSupervisor" 
      label="Co-Supervisor" 
      variant="outlined" 
      onChange={(e) => setCoSupervisor(e.target.value)}
      required
      />
      <br></br>
      <div className={classes.button}>
      <Button variant="contained" color="primary" type='submit' style={{backgroundColor:"#00007b"}}>
      Send
      </Button>
      </div>
    </form>
    </Grid>
    <Grid item xs={4}>

    <img  className="image" src={studentRegistration} alt="60" />
    </Grid>
   </Grid>
    </Card>
    <div className="container">
      <br></br>
      <br></br>
      <table class="table">
        <thead  style={{backgroundColor:"#00007b", color:'white', marginRight:'20px'}}>
          <tr>
            
            <th scope="col">#</th>
            <th scope="col">Staff ID</th>
            <th scope="col">User Name</th>
            <th scope="col">Role</th>
            <th scope="col">Specialized Area</th>
          </tr>
        </thead>
        <tbody>
          {cosup.map((cosup, index) => {
            return (
              <tr>
              <td>{index + 1}</td>
                <td>{cosup.staffId}</td>
                <td>{cosup.userName}</td>
                <td>{cosup.role}</td>
                <td>{cosup.specializedArea}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
    </div>
  
    
)}

export default ResearchTopic;