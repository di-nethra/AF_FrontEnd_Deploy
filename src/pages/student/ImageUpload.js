import React, { useState, useEffect } from "react";
import axios from "axios";
import {storage} from "./Firebase";

import Button from "@material-ui/core/Button";
import Input from "@material-ui/core/Input";

const ImageUpload = ({title,submittedDate,studentId}) => {
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
                            .post("https://floating-meadow-01028.herokuapp.com/api/makeSubmission", {title:title,submittedDate:submittedDate,submittedStudent:studentId,imageUrl: res,evaluation:"pending" })
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
                            <Input
                                type="file"
                                id="upload"
                                className="form-control"
                                onChange={uploadSingleFile}
                                fullWidth
                            />
                        </label>
                    </div>
                </div>
                <Button onClick={uploadData} variant={"contained"} size={"medium"} color="primary" fullWidth style={{backgroundColor:"#005792", width:"60%"}}>Submit</Button>
            </form>
        </div>
    );
};

export default ImageUpload;