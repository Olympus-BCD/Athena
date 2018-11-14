import React from "react";
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import AdminHeader from './AdminHeader';

class SideNav extends React.Component {
	
	state = {

	};
	
	render() {
		return(
			<div>
				<header className=''>
					{
						(this.props.user && this.props.organization) &&
						<AdminHeader
							user={this.props.user}
							organization={this.props.organization}
							logout={this.props.logout}
						/>
					}
				</header>
				<nav>
					{(localStorage.getItem('jwtToken') && this.props.user && this.props.user.role > 1) &&
						<ul>
							<li><Link to={`/${this.props.organization.name.replace(' ', '')}/dashboard`}>Dashboard</Link></li>
							<li><Link to={`/${this.props.organization.name.replace(' ', '')}/trainings`}>Trainings</Link></li>
							<li><Link to={`/${this.props.organization.name.replace(' ', '')}/employees`}>Employees</Link></li>
							<li><Link to={`/${this.props.organization.name.replace(' ', '')}/reports`}>Reports</Link></li>
							<li><Link to={`/${this.props.organization.name.replace(' ', '')}/network`}>Network</Link></li>
						</ul>
						
					}
					{(localStorage.getItem('jwtToken') && this.props.user && this.props.user.role > 0)
						?
							<ul>
								<li>Normal Links Go Here</li>
							</ul>
						:
		// 				Insert Loading Image Here if wanted (get rid of null value if you do)
						null
					}
				</nav>
			</div>
		);
	}

}

export default SideNav;
