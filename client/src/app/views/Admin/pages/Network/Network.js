// React Imports
import React from "react";

// Materialize Imports

// CSS & Local Component Import
import NetworkPageHeader from "./NetworkPageHeader";
import SettingIcon from "./setting-blue-opacity.png";
import "./Network.css";


class NetworkPage extends React.Component {
	
	render() {
		return (
		  <div>
			<NetworkPageHeader />
			<div className="wrapper">
			  <img id="icon" src={SettingIcon} />
			  <div className="coming-soon">Feature Coming Soon!</div>
			</div>
		  </div>
		);
	  }
	}

export default NetworkPage;