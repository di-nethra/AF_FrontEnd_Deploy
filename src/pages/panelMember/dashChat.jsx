import React, { useState, useEffect } from "react";


function Chat() {
  const [chatData, setChatData] = useState([]);

  useEffect(() => {
    fetch(`https://floating-meadow-01028.herokuapp.com/api/panelChat`)
      .then((response) => response.json())
      .then((responseData) => {
        setChatData(responseData);
      });
    console.log(chatData);
  }, []);

  return (
    <div>
      <br></br>
      <div class="container">
        
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
