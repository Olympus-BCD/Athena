import React from "react";
import { Link } from 'react-router-dom';
import "./ViewEmployees.css";
import API from '../../../../../../../utils/API';
import AvatarPlaceholder from "./AvatarPlaceholder.png";
import EmployeeListItem from './EmployeeListItem';

class ViewEmployees extends React.Component {
	
	state = {
		message: '',
		employees: []
	};
	
	componentDidMount() {
		this.getEmployees();
	}

	getEmployees = () => {
		const query = {
			__organization: this.props.organization._id
		};
		API.auth.getUsers(query).then(res => {
			if(res.data.success) {
				this.setState({ employees: res.data.users });
			} else {
				this.setState({ message: res.data.msg });
			}
		}).catch(err => {
			console.log(err);
			this.setState({ message: 'Uh Oh! Something went wrong!' });
		});
	};
	
	render() {
		return (
			<div>
			
				{
					this.state.message !== '' &&
					<div>{this.state.message}</div>
				}
				
				<div className="row">
					<div className="col s12 m12">
						<div className="card-panel teal z-depth-5">
							<div className="">
								<ul className="collection z-depth-3">
									{this.state.employees.map(employee =>
										<EmployeeListItem employee={employee} organization={this.props.organization} />
									)}
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default ViewEmployees;