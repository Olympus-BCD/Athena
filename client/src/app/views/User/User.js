import React from "react";
import "./User.css";

class UserView extends React.Component {
	
	logout = () => {
		localStorage.removeItem('jwtToken');
		window.location.href='/login';
	};
	
	render() {
		return (
			<div>
				<div onClick={this.logout}>Logout</div>
				<h3>User View</h3>
			</div>
		);
	}
}

export default UserView;