import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Login.css";

import API from "../../utils/API";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      message: ""
    };
  }

  onChange = e => {
    const state = this.state;
    state[e.target.name] = e.target.value;
    this.setState(state);
  };

  onSubmit = e => {
    e.preventDefault();

    const { username, password } = this.state;

    /*
			Uses the /api/auth/login to attempt to find the username/password combo.
			If successful, sets the JWT Token for the user (retrieved from the back-end) inside of Local Storage.
			This token will be checked each time the user tries to visit a restricted page
		*/
    API.auth
      .login(username, password)
      .then(result => {
        if (result.data.success) {
          localStorage.setItem("jwtToken", result.data.token);
          this.setState({ message: "" });
          console.log(result.data);
          // 				this.props.history.push('/app')
          window.location.href = `/${result.data.user.__organization.name.replace(
            " ",
            ""
          )}`;
        } else {
          this.setState({ message: result.data.msg });
        }
      })
      .catch(err => {
        if (err) console.log(err);
        if (err.response && err.response.status === 401) {
          console.log(err.response.msg);
          this.setState({
            message: "Login failed. Username or password do not match."
          });
        }
      });
  };

  render() {
    const { username, password, message } = this.state;
    return (
      <div className="row center">
        <div className="col s12">
          <h1 className="athena-header">
            <Link id="athena-link" to="/">Athena</Link>
          </h1>
          <div className="row center">
            <div className="col s12">
              <div className="container center">
                <div className="col s12">
                  <div id="login-card" className="card z-depth-3">
                    <div className="container center">
                      <form className="" onSubmit={this.onSubmit}>
                        {message !== "" && (
                          <div className="" role="alert">
                            {message}
                          </div>
                        )}
                        <h5 className="">Login</h5>
                        <div className="input-field">
                          <label htmlFor="inputUsername" className="">
                            Username
                          </label>
                          <input
                            type="text"
                            className=""
                            name="username"
                            value={username}
                            onChange={this.onChange}
                            required
                          />
                        </div>
                        <div className="input-field">
                          <label htmlFor="inputPassword" className="">
                            Password
                          </label>
                          <input
                            type="password"
                            className=""
                            name="password"
                            value={password}
                            onChange={this.onChange}
                            required
                          />
                        </div>
                        <button
                          class="btn waves-effect waves-light"
                          type="submit"
                          name="action"
                        >
                          Login
                        </button>
                        <p>
                          Not a member?{" "}
                          <Link to="/register">Register here</Link>
                        </p>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
