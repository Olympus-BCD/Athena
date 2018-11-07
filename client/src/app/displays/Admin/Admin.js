import React from "react";
import "./Admin.css";

class AdminDisplay extends React.Component {
	
	render() {
		return (
			<div className=''>
				<header className=''>
					<h3>Admin Display</h3>
					{
						(this.props.user && this.props.organization) &&
						<div>
							<h1>{this.props.organization.name}</h1>
							<h2>Hello, {this.props.user.username}</h2>
						</div>
					}
						<span className='' onClick={this.props.logout}>Logout</span>
				</header>
			</div>
		);
	}
}

export default AdminDisplay;

/*
				<header className=''>
					{
						(this.state.user && this.state.user.__organization) &&
						<div>
							<h1>{this.state.user.__organization.name}</h1>
							<h2>Hello, {this.state.user.username}</h2>
						</div>
					}
						<div className='' onClick={this.logout}>Logout</div>
					<h3>Trainings &nbsp;</h3>
				</header>
				<div className=''>
					<table className=''>
						<thead>
							<tr>
								<th>Training</th>
							</tr>
						</thead>
						<tbody>
							{this.state.trainings.map(training =>
								<tr key={training._id}>
									<td><Link 
											to={`/trainings/${training._id}`}
										>{training.name}
										</Link>
									</td>
								</tr>
							)}
						</tbody>
					</table>
				</div>
*/