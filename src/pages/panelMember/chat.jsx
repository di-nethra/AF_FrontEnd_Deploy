import React, { useState, useEffect } from "react";
import axios from "axios";


function Chat() {
  const [chatData, setChatData] = useState([]);
  const [message, setMessage] = useState("");
  const [loggedUser, setLoggedUser] = useState("");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    if (user) {
      setLoggedUser(user[0].staffId);
    }
  }, []);

  useEffect(() => {
    fetch(`https://floating-meadow-01028.herokuapp.com/api/panelChat`)
      .then((response) => response.json())
      .then((responseData) => {
        setChatData(responseData);
      });
    console.log(chatData);
  }, []);

  let data = {
    userId: loggedUser,
    message: message,
    date: new Date(),
  };

  let submitMessage = async (e) => {
    e.preventDefault();
    try {
      let res = await axios.post("https://floating-meadow-01028.herokuapp.com/api/panelChat", data);
      if (res) {
        console.log(data);
        window.location.href = "/panelMember/chat";
      } else {
        alert("Some error occured");
      }
    } catch (err) {
      alert("Error occured in the process");
      console.log(err);
    }
  };

  return (
    <div>
      <br></br>
      <div class="container">
        <h4 class="text-center">Communicate with panel members</h4>
        <div class="input-group mb-3">
          <input
            type="text"
            class="form-control"
            placeholder="enter message"
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
            onChange={(e) => setMessage(e.target.value)}
          />
          <div class="input-group-append">
            <button
              class="btn btn-outline-secondary"
              type="button"
              onClick={submitMessage}
              style={{color:'blue'}}
            >
              Add message
            </button>
          </div>
        </div>
        <br></br>
        <div class="container">
          <div class="card shadow-lg p-3 mb-5 bg-white rounded border border-primary" style={{ height: "400px", overflow: 'scroll', width: "100%"}}>
            {chatData.map((item, index) => {
              return (
                <p class="card-body">
                  {index + 1} ( {item.userId} ) {item.message}
                </p>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;
