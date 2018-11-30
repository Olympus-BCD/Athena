// React Imports
import React, { Component } from "react";
import { Link } from "react-router-dom";

// Materialize Imports
import { Navbar } from "react-materialize";
import { NavItem } from "react-materialize";
import { Parallax } from "react-materialize";

// CSS & Local Imports
import Clouds from "./clouds_pink_hue.jpg";
import Sky from "./sky.jpg";
import Dawn from "./cold_dawn.jpg";
// import Background from "./Background";
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
      <div className="site-bg">
        <Navbar brand="Athena" className="athena-title white" right>
          <NavItem>
            <Link id="login-link" to="/login">
              Login
            </Link>
          </NavItem>
          <NavItem>
            <Link id="about-link" to="/about">
              About Us
            </Link>
          </NavItem>
        </Navbar>

        <div id="index-banner" class="parallax-container">
          <div class="section no-pad-bot">
            <div class="container">
              <br />
              <br />
              <h1 class="header center teal-text text-lighten-2">
                Athena
              </h1>
              <div class="row center">
                <h5 class="header col s12 light">
                 Training Management made easy...
                </h5>
              </div>
              <div class="row center">
                <Link to="/register">
                  <a href="!#"
                    id="download-button"
                    class="btn-large waves-effect waves-light teal lighten-1"
                  >
                    Try Athena out for free!
                  </a>
                </Link>
              </div>
              <br />
              <br />
            </div>
          </div>
          <Parallax
            imageSrc={ Clouds }
            alt="place"
          />
        </div>

        <div class="container">
          <div class="section">
            <div class="row">
              <div class="col s12 m4">
                <div class="icon-block">
                  <h2 class="center brown-text">
                    <i class="material-icons">flash_on</i>
                  </h2>
                  <h5 class="center">Speeds up development</h5>

                  <p class="light">
                    We did most of the heavy lifting for you to provide a
                    default stylings that incorporate our custom components.
                    Additionally, we refined animations and transitions to
                    provide a smoother experience for developers.
                  </p>
                </div>
              </div>

              <div class="col s12 m4">
                <div class="icon-block">
                  <h2 class="center brown-text">
                    <i class="material-icons">group</i>
                  </h2>
                  <h5 class="center">User Experience Focused</h5>

                  <p class="light">
                    By utilizing elements and principles of Material Design, we
                    were able to create a framework that incorporates components
                    and animations that provide more feedback to users.
                    Additionally, a single underlying responsive system across
                    all platforms allow for a more unified user experience.
                  </p>
                </div>
              </div>

              <div class="col s12 m4">
                <div class="icon-block">
                  <h2 class="center brown-text">
                    <i class="material-icons">settings</i>
                  </h2>
                  <h5 class="center">Easy to work with</h5>

                  <p class="light">
                    We have provided detailed documentation as well as specific
                    code examples to help new users get started. We are also
                    always open to feedback and can answer any questions a user
                    may have about Materialize.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="parallax-container valign-wrapper">
          <div class="section no-pad-bot">
            <div class="container">
              <div class="row center">
                <h5 class="header col s12 light">
                  A modern responsive front-end framework based on Material
                  Design
                </h5>
              </div>
            </div>
          </div>
          <Parallax
            imageSrc={Sky}
            alt="place"
          />
        </div>

        <div class="container">
          <div class="section">
            <div class="row">
              <div class="col s12 center">
                <h3>
                  <i class="mdi-content-send brown-text" />
                </h3>
                <h4>Contact Us</h4>
                <p class="left-align light">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Nullam scelerisque id nunc nec volutpat. Etiam pellentesque
                  tristique arcu, non consequat magna fermentum ac. Cras ut
                  ultricies eros. Maecenas eros justo, ullamcorper a sapien id,
                  viverra ultrices eros. Morbi sem neque, posuere et pretium
                  eget, bibendum sollicitudin lacus. Aliquam eleifend
                  sollicitudin diam, eu mattis nisl maximus sed. Nulla imperdiet
                  semper molestie. Morbi massa odio, condimentum sed ipsum ac,
                  gravida ultrices erat. Nullam eget dignissim mauris, non
                  tristique erat. Vestibulum ante ipsum primis in faucibus orci
                  luctus et ultrices posuere cubilia Curae;
                </p>
              </div>
            </div>
          </div>
        </div>

        <div class="parallax-container valign-wrapper">
          <div class="section no-pad-bot">
            <div class="container">
              <div class="row center">
                <h5 class="header col s12 light">
                  A modern responsive front-end framework based on Material
                  Design
                </h5>
              </div>
            </div>
          </div>
          <Parallax
            imageSrc={Dawn}
            alt="place"
          />
        </div>

        {/* <div>
          <Background />
        </div> */}

        <footer class="page-footer teal">
          <div class="container">
            <div class="row">
              <div class="col l6 s12">
                <h5 class="white-text">Company Bio</h5>
                <p class="grey-text text-lighten-4">
                  We are a team of college students working on this project like
                  it's our full time job. Any amount would help support and
                  continue development on this project and is greatly
                  appreciated.
                </p>
              </div>
              <div class="col l3 s12">
                <h5 class="white-text">Settings</h5>
                <ul>
                  <li>
                    <a class="white-text" href="#!">
                      Link 1
                    </a>
                  </li>
                  <li>
                    <a class="white-text" href="#!">
                      Link 2
                    </a>
                  </li>
                  <li>
                    <a class="white-text" href="#!">
                      Link 3
                    </a>
                  </li>
                  <li>
                    <a class="white-text" href="#!">
                      Link 4
                    </a>
                  </li>
                </ul>
              </div>
              <div class="col l3 s12">
                <h5 class="white-text">Connect</h5>
                <ul>
                  <li>
                    <a class="white-text" href="#!">
                      Link 1
                    </a>
                  </li>
                  <li>
                    <a class="white-text" href="#!">
                      Link 2
                    </a>
                  </li>
                  <li>
                    <a class="white-text" href="#!">
                      Link 3
                    </a>
                  </li>
                  <li>
                    <a class="white-text" href="#!">
                      Link 4
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="footer-copyright">
            <div class="container">
              Made by{" "}
              <a
                class="brown-text text-lighten-3"
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
