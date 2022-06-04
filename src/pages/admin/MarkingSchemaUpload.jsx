import React, {useState} from 'react';
import {storage} from "../student/Firebase";
import axios from "axios";
import Button from "@material-ui/core/Button";
import {FormGroup} from "@mui/material";

const MarkingSchemaUpload = ({title}) => {
    const [fileObj, setFileObj] = useState([]);
    const [imageUrl, setImageUrl] = useState("");

    const uploadData = () => {
        console.log("working");
        const uploadTask = storage.ref(`eshop/${fileObj.name}`).put(fileObj);
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progressPercentage = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                console.log(progressPercentage);
            },
            (err) => {
                console.log(err.message);
            },
            // title:String,
            // submittedDate:String,
            // submittedStudent:String,
            // imageUrl
            () => {
                storage
                    .ref(`eshop/${fileObj.name}`)
                    .getDownloadURL()
                    .then((res) => {
                        console.log("imageUrl", res);
                        axios
                            .post("https://floating-meadow-01028.herokuapp.com/api/markingSchema", {title:title,submittedDate:new Date(),imageUrl:res})
                            .then((response) => {
                                console.log("Response", response.data);
                                childToParent(res)

                            })
                            .catch((error) => {
                                console.log("Error", error.response);
                            });
                    })
                    .catch((err) => {
                        console.log("Error", err);
                    });
                // console.log("Completed");
            }
        );
    };

    const uploadSingleFile = (e) => {
        if (e && e.target.files && e.target.files[0]) {
            setFileObj(e.target.files[0]);
            setImageUrl(URL.createObjectURL(e.target.files[0]));
        }
    };
    return (
        <div>

            <div className="AddProduct">
                <form>
                    <div className="AddProduct__left">
                        <div className="AddProduct__imageContainer mb-2">
                            {imageUrl && (
                                <img
                                    src={imageUrl}
                                    alt="ProductImage"
                                    className="AddProduct__image img-thumbnail"
                                />
                            )}
                        </div>

                        <div className="form-group">
                            <label htmlFor="upload" className="AddProduct__file">
                                <input
                                    type="file"
                                    id="upload"
                                    className="form-control"
                                    onChange={uploadSingleFile}
                                    style={{marginLeft:"30px"}}
                                />
                            </label>
                        </div>
                    </div>
                    {/*<input*/}
                    {/*    type="button"*/}
                    {/*    value="submit"*/}
                    {/*    onClick={uploadData}*/}
                    {/*/>*/}
                    <Button onClick={uploadData} variant={"contained"} size={"large"} color="primary" fullWidth style={{backgroundColor:"#005792"}}>Submit</Button>
                </form>
            </div>

        </div>
    );
};

export default MarkingSchemaUpload;