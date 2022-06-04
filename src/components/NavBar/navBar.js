import React, { useEffect, useState } from "react";

function NavBar() {

  const [loggedUser, setLoggedUser] = useState("");
  const [loggedUserName, setLoggedUserName] = useState("");
  

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    if (user) {
      setLoggedUser(user[0].role);
      setLoggedUserName(user[0].userName);
    }
  }, []);

  
let handleLogout = () =>{
  localStorage.removeItem('loggedInUser');
    alert("Logged out successfuly!")
    window.location.href="/";
}

  return (
    <div data-testid="navbar">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark" >
        <div className="container-fluid">
          <a className="navbar-brand " href="/">
            RPM
          </a>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* panel member */}
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
          {(loggedUser == "panelMember") && (
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
             <li className="nav-item">
               <a className="nav-link" aria-current="page" href="/panelMember/dashboard">
                 Dashboard
               </a>
             </li>

             <li className="nav-item">
               <a className="nav-link" aria-current="page" href="/panelMember/chat">
                 Teams
               </a>
             </li>

             <li className="nav-item">
               <a className="nav-link" aria-current="page" href="/panelMember/topics">
                Topic Evaluation
               </a>
             </li>

             <li className="nav-item">
               <a className="nav-link" aria-current="page" href="/panelMember/presentation">
                 Presentation Evaluation
               </a>
             </li>

             <li className="nav-item">
               <a className="nav-link" aria-current="page" href="/panelMember/reference">
                 References
               </a>
             </li> 
             </ul>
             )}

            {/*  /!* {(loggedUser.role == "Admin") && (*/}
            {/*  <li className="nav-item">*/}
            {/*    <a className="nav-link" href="/admin">*/}
            {/*      Admin panel*/}
            {/*    </a>*/}
            {/*  </li>*/}
            {/*  )}*/}
            {/*  */}
             

            

            {/*supervisor*/}
            {(loggedUser == "supervisor") && (
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link" aria-current="page" href="/supervisor/dashboard">
                  Dashboard
                </a>
              </li>

              <li className="nav-item">
                <a className="nav-link" aria-current="page" href="/supervisor/teams">
                  Teams
                </a>
              </li>

              <li className="nav-item">
                <a className="nav-link" aria-current="page" href="/supervisor/topics">
                  Topic Confirmation
                </a>
              </li>

              <li className="nav-item">
                <a className="nav-link" aria-current="page" href="/supervisor/document">
                  Document Evaluation
                </a>
              </li>

              <li className="nav-item">
                <a className="nav-link" aria-current="page" href="/supervisor/markingSchemes">
                  Marking Schemes
                </a>
              </li>

            </ul>
            )}

            {/*Student*/}
            {(loggedUser == null) && (
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link" aria-current="page" href="/student/dashboard">
                  Dashboard
                </a>
              </li>

              <li className="nav-item">
                <a className="nav-link" aria-current="page" href="/student/studentGroup">
                  Student Group
                </a>
              </li>

              <li className="nav-item">
                <a className="nav-link" aria-current="page" href="/student/topicRequest">
                  Research Topic
                </a>
              </li>

              {/* <li className="nav-item">
                <a className="nav-link" aria-current="page" href="/student/researchProject">
                  Project Status
                </a>
              </li> */}

            </ul>
            )}
            {/*admin-student-staff*/}

            {(loggedUser == "admin") && (
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                    <a className="nav-link" aria-current="page" href="/admin/dashboard">
                      Dashboard
                    </a>
                  </li>

                  <li className="nav-item">
                    <a className="nav-link" aria-current="page" href="/admin/viewStudents">
                      Student Details
                    </a>
                  </li>

                  <li className="nav-item">
                    <a className="nav-link" aria-current="page" href="/admin/viewStaff">
                      Staff Details
                    </a>
                  </li>

                  <li className="nav-item">
                    <a className="nav-link" aria-current="page" href="/createSubmission">
                      Create Submissions
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" aria-current="page" href="/admin/setPanelMembers">
                      Add Panel Members
                    </a>
                  </li>

                  <li className="nav-item">
                    <a className="nav-link" aria-current="page" href="/admin/createSchema">
                      Create Marking Schemas
                    </a>
                  </li>
                </ul>
            )}

            
            <div className="dropdown">
              <button
                className="btn btn-secondary"
                type="button"
                id="dropdownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                {loggedUserName}
                <span className="nav-values"></span>
              </button>
              {/*<div className="dropdown-menu" aria-labelledby="dropdownMenuButton">*/}
              {/*  <a className="dropdown-item" href="/profile">*/}
              {/*    Profile*/}
              {/*  </a>*/}
              {/*  <a className="dropdown-item" href="/logout">*/}
              {/*    Logout*/}
              {/*  </a>*/}
              {/*</div>*/}
              
            </div>
            
          </div>
        </div>
        {(loggedUser == null) && (
            <li className="nav-item">
             <a className="nav-link" href="/">
             Login
            </a>
            </li>
             )} 

            {(loggedUser !== null) && (
            <li className="nav-item">
             <button className="nav-link btn btn-secondary" onClick={handleLogout}>
             Logout
            </button>
            </li>
             )}
      </nav>
    </div>
  );
}

export default NavBar;
