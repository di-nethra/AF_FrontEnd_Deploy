import React from 'react';
import Grid from "@mui/material/Grid";
import sliitRPM from "../../assests/sllitRPM.svg"

const SignNav = () => {
    return (
        <div style={{marginTop:"10px"}}>
            <Grid container>
                <Grid item xs={12} style={{textAlign:"left"}}>
                    <img style={{height:"70px"}} src={sliitRPM} alt="60"/>
                </Grid>
            </Grid>
        </div>
    );
};

export default SignNav;