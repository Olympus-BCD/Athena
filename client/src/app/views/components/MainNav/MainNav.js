// React Import
import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

// Materialize Imports
import { SideNav, SideNavItem } from "react-materialize";

// CSS Imports
import "./MainNav.css";
import AvatarPlaceholder from "./AvatarPlaceholder.png";

class MainNav extends React.Component {
	
	render() {
		return (
                <SideNav
	                trigger={<div data-target="slide-out" className="sidenav-trigger"><i className="material-icons">menu</i></div>}
	                fixed={true}
	                className="mainNav-bg"
                >
                	<div className='userprofile-organization-header'>{this.props.organization.name}</div>
                    <SideNavItem
                        userView 
                        id='userProfile'
                        user={{
	                        background: '',
	                        image: AvatarPlaceholder,
	                        name: <span className='blk'>
	                        	{this.props.user.fname
			                        ? this.props.user.fname.toUpperCase()
			                        : null}
			                    &nbsp;
		                        {this.props.user.lname
			                        ? this.props.user.lname.toUpperCase()
			                        : null}
			                    </span>,
	                        email: <span className='blk'>{this.props.user.username}</span>
                        }}
                    />
                    <div className="center-align" onClick={this.props.logout}>Logout</div>
                    
                    <SideNavItem divider />
                    
                    <SideNavItem subheader className="mainNav-header">Administration</SideNavItem>
                    
                    <Link className='no-padding' to={`/${this.props.organization.name.replace(' ', '')}/dashboard`}>
                    	<SideNavItem  component={Link} icon='developer_board'>Dashboard</SideNavItem>
                    </Link>
                    <Link className='no-padding' to={`/${this.props.organization.name.replace(' ', '')}/trainings`}>
                    	<SideNavItem icon='event'>Trainings</SideNavItem>
                    </Link>
					<Link className='no-padding' to={`/${this.props.organization.name.replace(' ', '')}/employees`}>
						<SideNavItem href='#!second' icon='face'>Employees</SideNavItem>
					</Link>
					<Link className='no-padding' to={`/${this.props.organization.name.replace(' ', '')}/reports`}>
						<SideNavItem href='#!second' icon='assessment'>Reports</SideNavItem>
					</Link>
					<Link className='no-padding' to={`/${this.props.organization.name.replace(' ', '')}/network`}>
						<SideNavItem href='#!second' icon='settings'>Network Setting</SideNavItem>
					</Link>
					
                    <SideNavItem divider />
                    <SideNavItem subheader className="mainNav-header">{this.props.user.username.toUpperCase()}</SideNavItem>
                    <SideNavItem href='#!icon' icon='dashboard'>My Dashboard</SideNavItem>
                    <SideNavItem href='#!second' icon='person'>My Profile</SideNavItem> 
                    <SideNavItem href='#!second' icon='event_note'>My Trainings</SideNavItem>
                    <SideNavItem href='#!second' icon='folder'>My Documents</SideNavItem>
                    <SideNavItem divider />
                    <SideNavItem copyrights= "Athena" id='side-nav-footer' className="mainNav-footer"><Link to='/' target='_blank' >Athena</Link></SideNavItem>
               </SideNav>
		);
	}
}

export default MainNav;
