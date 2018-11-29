// React Imports
import React, { Component } from "react";
import { Link } from "react-router-dom";

// Materialize Imports
import { Navbar } from "react-materialize";
import { NavItem } from "react-materialize";

// CSS & Local Imports
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
        <Navbar brand="logo" right>
			<NavItem>
			<Link to="/login">
				Login
			</Link>
			</NavItem>
          <NavItem href="components.html">About Us</NavItem>

        </Navbar>

        <div className="">
          <h1 className="athena-title">
            <Link to="/">Athena</Link>
          </h1>
          <h2>Welcome to Athena</h2>
          <p>Training management made easy...</p>
          <p>
            <Link to="/register">Try Athena out for free!</Link> or{" "}
            <Link to="/login">Login to your account</Link>
          </p>
        </div>
      </div>
    );
  }
}

export default Site;
