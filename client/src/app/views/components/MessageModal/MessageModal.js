import React from "react";
import "./MessageModal.css";

class MessageModal extends React.Component {
	
/*
	Copy this function into wherever you call this component (and then pass it into the props when calling the MessageModal)
	Ex// 
	
	<MessageModal message={this.state.message} closeMessageModal={this.closeMessageModal} />
	
	closeMessageModal = () => {
		this.setState({ message: '' })
	};
*/
	
	render() {
		return (
			<div className='message-modal-background'>
				<div className='message-modal-container'>
					<div className='message-modal-content'>
						<h3 className='message-modal-title'>Oops!</h3>
						<h4 className='message-modal-message'>{this.props.message}</h4>
						{/* <div id="" className='message-modal-button btn-small' onClick={this.props.closeMessageModal}>Close</div> */}
						<div id="modal-close-button" className="waves-effect waves-light white-text btn-flat" onClick={this.props.closeMessageModal}>Close</div>
					</div>
				</div>
			</div>
		);
	}
}

export default MessageModal;