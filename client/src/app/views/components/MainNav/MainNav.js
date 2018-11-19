// React Import
import React from "react";
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

// Materialize Imports
import { SideNav, SideNavItem, Footer } from 'react-materialize';

// React Icons Imports
import { GoMarkGithub } from "react-icons/go";

// CSS Imports
import "./MainNav.css";

class MainNav extends React.Component {
	
	render() {
		return (
			<div className='codytest'>
                <SideNav
                trigger={<div data-target="slide-out" className="sidenav-trigger"><i className="material-icons">menu</i></div>}
                fixed={true}
                className="mainNav-bg"
                >
                    <SideNavItem 
                        userView 
                        id='userProfile'
                        className="black-text"
                        user={{
                        backgroundColor: '',
                        image: '',
                        name: <span className='blk'>John Doe</span>,
                        email: <span className='blk'>jdandturk@gmail.com</span>
                        }}
                    />
                    <SideNavItem divider />
                    <SideNavItem subheader className="mainNav-header">Administration</SideNavItem>
                    <SideNavItem href='#!icon' icon='developer_board'>Dashboard</SideNavItem>
                    <SideNavItem href='#!second' icon='event'>Trainings</SideNavItem>
                    <SideNavItem href='#!second' icon='face'>Employees</SideNavItem>
                    <SideNavItem href='#!second' icon='network_cell'>Network</SideNavItem>
                    <SideNavItem divider />
                    <SideNavItem subheader className="mainNav-header">User</SideNavItem>
                    <SideNavItem href='#!icon' icon='dashboard'>My Dashboard</SideNavItem>
                    <SideNavItem href='#!second' icon='event_note'>My Trainings</SideNavItem>
                    <SideNavItem href='#!second' icon='folder'>My Documents</SideNavItem>
                    <SideNavItem href='#!second' icon='people'>Contacts</SideNavItem> 
                    <SideNavItem divider />
                    <Footer
                    copyrights= "Athena"
                    className="mainNav-footer">Athena <GoMarkGithub /> </Footer>
               </SideNav>
            </div>
		);
	}
}

export default MainNav;