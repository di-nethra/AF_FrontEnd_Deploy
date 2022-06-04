import React, {useState} from 'react';
import {Button, Card, FormGroup, TextField} from "@mui/material";
import MarkingSchemaUpload from "./MarkingSchemaUpload";
import presentationIMG from "../../../public/images/presentations.webp";

const CreateMarkingSchemas = () => {
    const[title,setTitle]=useState("")
    return (
        <div >
            <br></br>

            <div className="card text-center container"  >
                <div className="card-header">
                    <h3><b>Create Marking Schemes</b></h3>
                </div>
                <div className="card-body">
                    <img className="card-img-top" src={presentationIMG} alt="Card image cap" style={{width: '150px'}}/>
                    <h6 className="card-title">Upload Marking schemes in the RPM System.</h6>
                    {/* <a href="#" class="btn btn-primary">Go somewhere</a> */}
                </div>
            </div>
            <br></br>
            <FormGroup style={{marginLeft:"200px",marginRight:"200px",marginTop:"50px"}}>
                <Card>

                <TextField
                    onChange={(e)=>{
                        setTitle(e.target.value);
                    }}
                    style={{marginLeft:"30px"}}
                    variant="outlined"
                    margin="normal"
                    required
                    label={"marking scheme Title"}
                    name="markingSchemaTitle" />
                <br />

                <br />
           <MarkingSchemaUpload title={title}  />
                </Card>
            </FormGroup>
        </div>
    );
};

export default CreateMarkingSchemas;