// React Imports
import React, { Component } from "react";
import { Link } from "react-router-dom";

// Materialize Imports
import { Navbar } from "react-materialize";
import { NavItem } from "react-materialize";

// CSS & Local Imports
import Dustin from "./dustin.jpg";
import Brandy from "./me2.jpg";
import Dawn from "./cold_dawn.jpg";
import "./Site.css";

class Site extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    //	Uncomment this code to redirect to app if user is already logged in
    /*
		const jwtToken = localStorage.getItem('jwtToken');
		if(jwtToken) {
// 			this.props.history.push('/app');
			window.location.href='/app';
		}
*/
  }

  render() {
    return (
      <div>
      <div className=" container site-bg">
       <div className="section">
        <Navbar id="siteNav"  brand="Athena" className="athena-title transparent z-depth-0" right>
          <NavItem>
            <Link id="login-link" to="/login">
              Login
            </Link>
          </NavItem>
          {/* <NavItem>
            <Link id="about-link" to="/about">
              About Us
            </Link>
          </NavItem> */}
        </Navbar>
        
            <div className = "container-siteLogo">
            <h1 id="siteLogo" className = "header center white-text athena-title">
             Athena
            </h1>
            <div className="row center">
              <h5 className="header col s12 light white-text">
                 Training Management made easy...
              </h5>
              </div>
              <div className="row center">
                <Link to="/register">
                  <a href="!#"
                    id="register-button"
                    className="btn-large waves-effect waves-light lighten-1"
                  >
                    Try Athena out for free!
                  </a>
                </Link>
              </div>
              </div>
          </div>
          </div>
          
        <div className="containerAthenaInfo">
          <div className="section">
            <div className="row">
              <div className="col s12 m4">
                <div className="icon-block">
                  <h2 className="center brown-text">
                    <i className="material-icons siteIcons">flash_on</i>
                  </h2>
                  <h5 className="center">Track Trainings Effectively</h5>

                  <p className="light">
                    Tracks employee trainings effectively and efficiently.  Allows administrators the 
                    ability to track trainings that employees have completed and need to complete.
                    Administrators can easily add and remove trainings from the training portal.
                    
                  </p>
                </div>
              </div>
          
              <div className="col s12 m4">
                <div className="icon-block">
                  <h2 className="center brown-text">
                    <i className="material-icons siteIcons">group</i>
                  </h2>
                  <h5 className="center">Manage Employees</h5>

                  <p className="light">
                    With the employee portal, managing employee information is easy. Employers can 
                    view all employees information at a quick glance, as well as have the ability
                    to easily change employee information in one spot. 
                  </p>
                </div>
              </div>

              <div className="col s12 m4">
                <div className="icon-block">
                  <h2 className="center brown-text">
                    <i  className="material-icons siteIcons">settings</i>
                  </h2>
                  <h5 className="center">Easy to work with</h5>

                  <p className="light">
                   Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam congue gravida magna, non venenatis ligula interdum in. Duis ut libero lorem. Duis id pulvinar quam, id auctor ex. Cras ut urna non lorem scelerisque congue. Cras quis ex lacus.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
  
        <div className="containerAbout">
          <div className="section">
            <div className="row">
              <div className="col s12 center">
                <h3>
                  <i className="mdi-content-send brown-text" />
                </h3>
                <h4>About Us</h4>

                {/* // Dustin */}
                <div className = "container-portfolios">
                <div className="row">
                  <div className="col s12 m4">
                <a href = "https://github.com/DustinMcGilvray" target="_blank" rel="noopener noreferrer">
                  <div className="card aboutCards">
                    <div className="card-image">
                       <img id = "dustinImage"  src = {Dustin} alt="Dustin"/>
                    </div>
                       <div id="dustinTitle" className = "card-title profileTitle"><strong>Dustin McGilvray</strong></div>
                    <div className = "card-content">
                      <p className = "aboutText"><strong>
                      Full Stack Web Developer with a background in Fine Arts, Management, and Entrepreneurship. 
                      I have a passion for Front-end design focused on UI and UX.
                    </strong></p>
                    </div>
                    
                </div>
                </a>
              </div>
              
                {/*Cody*/}
                 <div className="col s12 m4">
                 <a href = "https://github.com/cdt12988" target="_blank" rel="noopener noreferrer">
                  <div className="card aboutCards">
                    <div id = "codyImage" className="card-image">
                       {/* <img className = "aboutPics" src = {Dustin} alt="Dustin"/> */}
                    </div>
                       <div id="codyTitle" className = "card-title"><strong>Cody Thompson</strong></div>
                    <div className = "card-content">
                      <p className = "aboutText"><strong>
                      I’m an accountant turned developer. I have a passion for learning, problem-solving and 
                      creating, which has served me very well on my journey to become a dev!
                     </strong></p>
                    </div>
                   
                </div>
                </a>
              </div>

              {/* Brandy */}
              <div className="col s12 m4">
                  <a href = "https://github.com/blnicholson" target="_blank" rel="noopener noreferrer">
                  <div className="card aboutCards">
                    <div id= "brandyImage" className="card-image">
                       {/* <img className = "aboutPics" src = {Brandy} alt="Dustin"/> */}
                    </div>
                       <div id="brandyTitle" className = "card-title"><strong>Brandy Nicholson</strong></div>
                    <div className = "card-content">
                      <p className = "aboutText"><strong>
                     I am a Full Stack Web Developer/Software Engineer with a background in Java.  I enjoy all 
                     aspects of web development, with a passion for server side code. 
                     </strong></p>
                    </div>
                   
                </div>
                  </a>
              </div>

              </div>
                </div>

              </div>
            </div>
          </div>
        </div>
        

        <footer className="page-footer transparent">
          <div className="container companyBio">
            <div className="row">
              <div className="col l6 s12">
                <h5 className="white-text">Company Bio</h5>
                <p className="grey-text text-lighten-4">
                  We are a team of college students working on this project like
                  it's our full time job.
                </p>
              </div>
            </div>
          </div>
          <div className="footer-copyright olympusHub">
            <div className="container ">
              Made by{" "}
              <a
                className="brown-text text-lighten-3"
                href="https://github.com/Olympus-BCD"
              >
                Olympus-BCD
              </a>
            </div>
          </div>
        </footer>

        {/* <div className="">
          <h1 className="athena-title">
            <Link to="/">Athena</Link>
          </h1>
          <h2>Welcome to Athena</h2>
          <p>Training management made easy...</p>
          <p>
            <Link to="/register">Try Athena out for free!</Link> or{" "}
            <Link to="/login">Login to your account</Link>
          </p>
        </div> */}
      
      </div>
    );
  }
}

export default Site;
