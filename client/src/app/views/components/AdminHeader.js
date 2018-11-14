import React from "react";
// import "./Admin.css";

class AdminHeader extends React.Component {
	
	state = {

	};
	
	render() {
		return(
			<div>
				<h3>Admin View</h3>
				<h1>{this.props.organization.name}</h1>
				<h2>Hello, {this.props.user.username}</h2>
				<span className='' onClick={this.props.logout} >Logout</span>
			</div>
		);
	}

}

export default AdminHeader;
