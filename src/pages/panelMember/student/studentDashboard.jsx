import React, { useState, useEffect }  from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import StudentMakeSubmission from '../../student/StudentMakeSubmission';
import studentRegistration from "../../../assests/p1.svg";

const useStyles = makeStyles({
  root: {
    marginTop: '20px',
    marginLeft: '100px',
    marginRight: '100px'
  },
  root1: {
    marginTop: '20px',
    marginLeft: '180px',
    marginRight: '180px',
    textAlign: 'center'
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 28,
  },
  pos: {
    marginBottom: 12,
  },
});

 function StudentDashboard() {
  const classes = useStyles();
  const [references, setReferences] = useState([]);

  useEffect(() => {
    fetch(`https://floating-meadow-01028.herokuapp.com/api/reference`)
      .then((response) => response.json())
      .then((responseData) => {
        setReferences(responseData);
      });
    console.log(references);
  }, []);

  return (
      <div>
      <div style={{ backgroundColor:"LightGray", width:'100%', padding:'5px', marginTop:'20px', borderColor:'#00007b'}}>
    <h4 style={{ marginLeft:'20px'}}>Document Submissions</h4>
    </div>
    <img  className="image" src={studentRegistration} alt="60" style={{width:'600px', marginTop:'20px', marginLeft:'450px'}}/>
    <Card className={classes.root1}>
      <CardContent>

        <StudentMakeSubmission />
        
      </CardContent>
    </Card>
    <br></br>
    
    <div style={{ backgroundColor:"LightGray", width:'100%', padding:'5px'}}>
    <h4 style={{ marginLeft:'20px'}}>References List</h4>
    </div>
    <br></br>
    <div style={{ height: "400px", overflow: 'scroll', width: "90%", marginLeft: '100px', marginRight: '100px'}}> 
    {references.map((references) => {
            return (
    <div className="card"  >
    
      <div className="card-body">
      <h5><b>Type: </b> {references.type}</h5>
          <h5><b>Title: </b> {references.title}</h5>
          {/* <h5><b>Description: </b>{references.description}</h5> */}
        <a href={references.description} class="card-link">View</a>
    </div>
  
</div>
);
          })}

    </div>
    </div>
  );
}

export default StudentDashboard;