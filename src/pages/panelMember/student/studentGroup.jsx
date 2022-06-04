import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from "axios";
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import studentRegistration from "../../../assests/studentGroup.svg";

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '50ch',
      marginLeft: '90px',
    marginTop: '20px',
    },
  },
  button: {
    '& > *': {
      margin: theme.spacing(1),
      backgroundcolor: '#00007b',
    },
  },
  maingrid: {
    width: "90%",
    marginLeft: '10px',
    marginTop: '20px'
  },
}));


function StudentGroup() {
  const classes = useStyles();

    const [groupId, setGroupId] = useState("")
    const [groupName, setGroupName] = useState("")
    const [std1, setStd1] = useState("")
    const [std2, setStd2] = useState("")
    const [std3, setStd3] = useState("")
    const [std4, setStd4] = useState("")
    const [studentGroup, setStudentGroup] = useState([])

let data = {
    groupId: groupId,
    groupName: groupName,
    std1: std1,
    std2: std2,
    std3: std3,
    std4: std4,
}
// useEffect(() => {
//     axios.get("http://localhost:5000/api/studentGroup").then(res => {
//         console.log(res.data)
//         setStudentGroup(res.data)
//     }).catch(err => {
//         console.log(err);
//     })
// }, [])

let handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await axios.post("https://floating-meadow-01028.herokuapp.com/api/studentGroup", data);
      if (res) {
        console.log(data);
        alert("Group Created Successfully");
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
    <h2 style={{color:"#00007b"}}>Create Student Group</h2>
      <TextField 
      id="groupId" 
      label="Group ID" 
      variant="outlined" 
      onChange={(e) => setGroupId(e.target.value)}
      required
      />
      <br></br>
      <TextField 
      id="groupName" 
      label="Group Name" 
      variant="outlined" 
      onChange={(e) => setGroupName(e.target.value)}
      required
      />
      <br></br>
      <TextField 
      id="std1" 
      label="Student 1" 
      variant="outlined" 
      onChange={(e) => setStd1(e.target.value)}
      required
      />
      <br></br>
      <TextField 
      id="std2" 
      label="Student 2" 
      variant="outlined" 
      onChange={(e) => setStd2(e.target.value)}
      required

      />
      <br></br>
      <TextField 
      id="std3" 
      label="Student 3" 
      variant="outlined" 
      onChange={(e) => setStd3(e.target.value)}
      required
      />
      <br></br>
      <TextField 
      id="std4" 
      label="Student 4" 
      variant="outlined" 
      onChange={(e) => setStd4(e.target.value)}
      required
      />
      <br></br>
      <div className={classes.button}>
      <Button variant="contained" color="primary" style={{backgroundColor:"#00007b"}} type='submit'>
      Create
      </Button>
      </div>
    </form>
    </Grid>
    <Grid item xs={4}>

    <img  className="image" src={studentRegistration} alt="60" />
    </Grid>
   </Grid>
  </Card>
  </div>
  
    
)}

export default StudentGroup;