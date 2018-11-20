// React Imports
import React from "react";
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import queryString from 'query-string';

// Materialize Imports

// CSS & Local Component Import
import "./Trainings.css";
import PageHeader from "../../../components/PageHeader";
import { ViewTrainings, AddTraining, ViewTraining } from './displays';

class TrainingsPage extends React.Component {
	
	parseQueryString = () => {
		const id = queryString.parse(this.props.location.search).id;
		if(id) {
			return <Route exact path='/:org/trainings' render={props => <ViewTraining {...props} organization={this.props.organization} user={this.props.user} id={id} />} />
		} else {
			return <Route exact path='/:org/trainings' render={props => <ViewTrainings {...props} organization={this.props.organization} user={this.props.user} />} />
		}
	};
	
	render() {
		return (
			<div>
				<PageHeader />
				<ul>
					<li><Link to={`/${this.props.organization.name.replace(/\s/g, '')}/trainings/add`}>Add Training</Link></li>
				</ul>
				<Switch>
					{this.parseQueryString()}
					<Route exact path='/:org/trainings/add' render={props => <AddTraining {...props} organization={this.props.organization} user={this.props.user} />} />
					<Route render={props => <ViewTrainings {...props} organization={this.props.organization} user={this.props.user} />} />
				</Switch>
			</div>
		);
	}
}

export default TrainingsPage;