// React Import
import React from "react";

// Materialize Imports
import { SideNav, SideNavItem } from 'react-materialize';

// CSS Imports
import "./MainNav.css";



class MainNav extends React.Component {
	
	render() {
		return (
			<div>
                <SideNav
                trigger={<div data-target="slide-out" className="sidenav-trigger"><i className="material-icons">menu</i></div>}
                fixed={true}
                // options={{

                // }}
                >
                    <SideNavItem userView id='userProfile'
                        user={{
                        background: 'black',
                        image: '',
                        name: 'John Doe',
                        email: 'jdandturk@gmail.com'
                        }}
                    />
                    <SideNavItem href='#!icon' icon='cloud'>First Link With Icon</SideNavItem>
                    <SideNavItem href='#!second'>Second Link</SideNavItem>
                    <SideNavItem divider />
                    <SideNavItem subheader>Subheader</SideNavItem>
                    <SideNavItem waves href='#!third'>Third Link With Waves</SideNavItem>
                </SideNav>
            </div>
		);
	}
}

export default MainNav;