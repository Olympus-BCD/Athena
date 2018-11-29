import React, { Component } from "react";
import { Link } from "react-router-dom";

import "./Register.css";

import API from "../../utils/API";

class Register extends Component {
	
	constructor() {
		super();
		this.state = {
			organization: "",
			owner: {
				username: '',
				password: '',
				confirmPassword: '',
				fname: '',
				lname: ''
			},
			username: "",
			password: "",
			message: "",
			validationErrors: []
		};
	}

	onChange = e => {
		const state = this.state;
		state[e.target.name] = e.target.value;
		this.setState(state);
	};
  
	changeOwner = e => {
		const { owner } = this.state;
		owner[e.target.name] = e.target.value;
		this.setState({ owner: owner });  
	};

	onSubmit = e => {
		e.preventDefault();
		const { organization, owner } = this.state;
		//	TODO:	Create an API call that just performs validations for all 3, so that an organization does not get created if a user doesn't and vice versa
		//	e.g.,	API.organization.checkValidations(organization, username, password) or two separate calls API.organization.validations() and API.auth.validations()
		console.log('Performing validations.');
		API.organization
	    	.validate(organization, owner)
	    	.then(res => {
		    	if(res.data.success) {
			    	API.organization
			    		.register(organization)
			    		.then(res => {
				    		if(res.data.success) {
					    		owner.role = 3;
					    		owner.__organization = res.data.organization._id;
					    		const newOrganization = res.data.organization;
					    		API.auth
					    			.register(owner)
					    			.then(res => {
						    			if(res.data.success) {
							    			const newUser = res.data.user;
							    			API.organization
						    					.addOwner(newOrganization, newUser)
						    					.then(res => {
							    					if(res.data.success) {
								    					API.auth
								    						.login(owner.username, owner.password)
								    						.then(res => {
									    						if(res.data.success) {
										    						localStorage.setItem("jwtToken", res.data.token);
										    						const newsfeedItem = {
											    						activityType: 'newOrganization',
											    						__organization: newOrganization._id,
											    						__user: newUser._id,
											    						userFirstName: newUser.fname,
											    						userLastName: newUser.lname,
											    						organizationName: organization
										    						};
										    						console.log('Creating newsfeed item:', newsfeedItem);
										    						API.newsfeed
										    							.create(newsfeedItem)
										    							.then(res => {
											    							if(res.data.success) {
// 												    							localStorage.setItem("jwtToken", res.data.token);
// 													                            this.setState({ message: '' });
													                            this.props.history.push(`/${organization.replace(/\s/g, '')}`);
//																				window.location.href = `/${res.data.organization.name.replace(/\s/g, '')}}`;
											    							} else {
												    							console.log('Error creating newsfeed item.', res.data.msg);
												    							this.props.history.push(`/${organization.replace(/\s/g, '')}`);
											    							}
										    							})
										    							.catch(err => {
											    							console.log('Error creating newsfeed item.', err);
											    							this.props.history.push(`/${organization.replace(/\s/g, '')}`);
										    							});
									    						} else {
										    						this.setState({ message: res.data.msg });
									    						}
								    						})
								    						.catch(err => {
									    						console.log('Error logging in user.');
									    						console.log(err);
									    						this.setState({ message: 'Uh Oh! Something went wrong!' });
								    						});
							    					} else {
								    					this.setState({ message: res.data.msg });
							    					}
						    					})
						    					.catch(err => {
							    					console.log('Error adding owner to organization.');
							    					console.log(err);
							    					this.setState({ message: 'Uh Oh! Something went wrong!' });
						    					});
						    			} else {
							    			this.setState({ message: res.data.msg });
						    			}
					    			})
					    			.catch(err => {
						    			console.log('Error registering new user.');
						    			console.log(err);
						    			this.setState({ message: 'Uh Oh! Something went wrong!' });
					    			});
				    		} else {
					    		this.setState({ message: res.data.msg });
				    		}
			    		})
			    		.catch(err => {
				    		console.log('Error registering new organization.');
				    		console.log(err);
				    		this.setState({ message: 'Uh Oh! Something went wrong!' });
			    		});
		    	} else {
			    	this.setState({ message: res.data.msg, validationErrors: res.data.validationErrors });
		    	}
	    	})
	    	.catch(err => {
		    	console.log('Error performing server-side validations.');
		    	console.log(err);
		    	this.setState({ message: 'Uh Oh! Something went wrong!' });
	    	});
	    //
	}
    
    
/*
    API.organization
      .register(organization)
      .then(res => {
        if (res.data.success) {
          const user = {
            username: username,
            password: password,
            role: 3,
            __organization: res.data.organization._id
          };
          const newOrganization = res.data.organization;
          API.auth
            .register(user)
            .then(result => {
              if (result.data.success) {
                const newUser = result.data.user;
                API.organization
                  .addOwner(newOrganization, newUser)
                  .then(result => {
                    if (result.data.success) {
                      API.auth
                        .login(username, password)
                        .then(result => {
                          if (result.data.success) {
                            localStorage.setItem("jwtToken", result.data.token);
                            this.setState({ message: "" });
                            // 														this.props.history.push('/app')
                            window.location.href = `/${res.data.organization.name.replace(
                              " ",
                              ""
                            )}}`;
                          } else {
                            this.setState({ message: result.data.msg });
                          }
                        })
                        .catch(err => {
                          if (err) console.log(err);
                          if (err.response.status === 401) {
                            this.setState({
                              message: "Error logging in user."
                            });
                            // 														this.setState({ message: 'Registration failed.' });
                          }
                        });
                      //
                    } else {
                      this.setState({ message: result.data.msg });
                    }
                  })
                  .catch(err => {
                    if (err)
                      console.log(
                        "Error adding owner to organization POST",
                        err
                      );
                  });
                //
              } else {
                this.setState({ message: result.data.msg });
              }
            })
            .catch(err => {
              if (err) console.log("Error registering new user POST", err);
            });
          //
        } else {
          this.setState({ message: res.data.msg });
        }
      })
      .catch(err => {
        if (err) console.log("Error registering new organization POST", err);
      });
    //
  };
*/

	render() {
		
		const { organization, owner, message, validationErrors } = this.state;
		
		return (
			<div className="register-bg">
				<h1 className="athena-header center">
					<Link id="athena-link"to="/">Athena</Link>
				</h1>
				<div className="row center">
					<div className="col s12">
						<div className="container center">
							<div className="col s12">
								<div id="login-card" className="card z-depth-5">
									<form className="" onSubmit={this.onSubmit}>
										{ message !== "" && (
											<div role='alert'>
												<div>{message}</div>
												{ validationErrors.length > 0 &&
													validationErrors.map(errorMsg => <div key={errorMsg} >{errorMsg}</div>)
												}
											</div>
										)}
										<h5 className="">Register</h5>
										<div className="input-field col s12">
											<label htmlFor="inputOrganization" className="">Name of Organization</label>
											<input type="text" name="organization" value={organization} onChange={this.onChange} required />
										</div>
										<div className="input-field col s6">
											<label htmlFor="fname" className="">First Name</label>
											<input type="text" name="fname" value={owner.fname} onChange={this.changeOwner} required />
										</div>
										<div className="input-field col s6">
											<label htmlFor="lname" className="">Last Name</label>
											<input type="text" name="lname" value={owner.lname} onChange={this.changeOwner} required />
										</div>
										<div className="input-field col s6">
											<label htmlFor="inputUsername" className="">Username</label>
											<input type="text" name="username" value={owner.username} onChange={this.changeOwner} required />
										</div>
										<div className="input-field col s6">
											<label htmlFor="inputPassword" className="">Password</label>
											<input type="password" name="password" value={owner.password} onChange={this.changeOwner} required />
										</div>
										<button id="register-button" className="btn waves-effect waves-light" type="submit" name="action" >Create My Organization</button>
									</form>
									<p>Already a member? <Link to="/login">Login here</Link></p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
	    );
	}
}

export default Register;
