// React Import
import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

// Materialize Imports
import { SideNav, SideNavItem } from "react-materialize";

// CSS Imports
import "./MainNav.css";
import AvatarPlaceholder from "./AvatarPlaceholder.png";
import UploadProfilePic from '../UploadProfilePic';

class MainNav extends React.Component {
	
	render() {
		return (
                <SideNav
	                trigger={<div data-target="slide-out" className="sidenav-trigger"><i className="material-icons">menu</i></div>}
					fixed={true}
	                className="mainNav-bg white-text"
                >
                	<div className='userprofile-organization-header white-text'>{this.props.organization.name}</div>
                	<UploadProfilePic organization={this.props.organization} isOrg={true} user={this.props.user} />
                    {/*<SideNavItem
                        userView 
                        id='userProfile'
                        user={{
	                        background: '',
	                        image: AvatarPlaceholder,
	                        name: <span className='wht'>
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
                    />*/}
					<span className="logout-wrapper">
                    	<div id="logout-button" className="btn-flat center white-text" onClick={this.props.logout}>Logout</div>
                    </span>
                    <SideNavItem divider />
                    
                    <SideNavItem subheader className="mainNav-header">Administration</SideNavItem>
                    
                    <Link className='no-padding mainNav-link' to={`/${this.props.organization.name.replace(' ', '')}/dashboard`}>
                    	<SideNavItem  component={Link} icon='developer_board' >Dashboard</SideNavItem>
                    </Link>
                    <Link className='no-padding mainNav-link' to={`/${this.props.organization.name.replace(' ', '')}/trainings`}>
                    	<SideNavItem icon='event'>Trainings</SideNavItem>
                    </Link>
					<Link className='no-padding mainNav-link' to={`/${this.props.organization.name.replace(' ', '')}/employees`}>
						<SideNavItem href='#!second' icon='face'>Employees</SideNavItem>
					</Link>
					<Link className='no-padding mainNav-link' to={`/${this.props.organization.name.replace(' ', '')}/reports`}>
						<SideNavItem href='#!second' icon='assessment'>Reports</SideNavItem>
					</Link>
					<Link className='no-padding mainNav-link' to={`/${this.props.organization.name.replace(' ', '')}/network`}>
						<SideNavItem href='#!second' icon='settings'>Network Setting</SideNavItem>
					</Link>
					
                    <SideNavItem divider />
                    <SideNavItem subheader className="mainNav-header">{this.props.user.fname}</SideNavItem>
                    {/*<Link className='no-padding mainNav-link' to={`/${this.props.organization.name.replace(' ', '')}/mydashboard`}>
                    	<SideNavItem icon='dashboard'>My Dashboard</SideNavItem>
                    </Link>*/}
                    <Link className='no-padding mainNav-link' to={`/${this.props.organization.name.replace(' ', '')}/myprofile`}>
                    	<SideNavItem icon='person'>My Profile</SideNavItem> 
                    </Link>
                    <SideNavItem href='#!second' icon='event_note'>My Trainings</SideNavItem>
                    <SideNavItem href='#!second' icon='folder'>My Documents</SideNavItem>
                    <SideNavItem copyrights= "Athena" id='side-nav-footer' className="mainNav-footer"><Link to='/' target='_blank' >Athena</Link></SideNavItem>
               </SideNav>
		);
	}
}

export default MainNav;
