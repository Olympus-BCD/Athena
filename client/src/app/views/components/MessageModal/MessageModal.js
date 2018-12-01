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
						<h5 className='message-modal-title'>Oops!</h5>
						<div className='message-modal-message'>{this.props.message}</div>
						<div className='message-modal-button' onClick={this.props.closeMessageModal}>Close</div>
					</div>
				</div>
			</div>
		);
	}
}

export default MessageModal;