import React, { Component } from 'react';
import axios from 'axios';
import Dropzone from "react-dropzone";
import API from '../../../../utils/API';
// import { url } from 'inspector';
import FileIcon from "./fileIcon.png";
import "./Upload";

const zoneStyle = {
  width:"150px",
  height:"150px", 
  border:'hide' 
}
const proxyurl = "https://cors-anywhere.herokuapp.com/";
const cloudURL = "http://api.cloudinary.com/v1_1/blnicholson/upload";
class Upload extends Component {
   
    state = {
        fileUrl:"",
        message: ''
    }

    handleDrop = files => {
        // Push all the axios request promise into a single array
        const uploaders = files.map(file => {
          // Initial FormData
          const formData = new FormData();
          formData.append("file", file);
          formData.append("upload_preset", "prknzege"); 
          formData.append("api_key", "829388363351532"); 
          formData.append("timestamp", (Date.now() / 1000) | 0);
          
         
          return axios.post(proxyurl + cloudURL, formData, {
            headers: { "X-Requested-With": "XMLHttpRequest" },
          }).then(response => {
            const data = response.data;
            this.setState({fileUrl: data.secure_url})
            console.log('Return data:', data);
            
          }).catch(err => {
	          console.log('Error uploading file to cloud', err);
          })
        });
		
		// Once all the files are uploaded 
		axios.all(uploaders).then(() => {
			const { training } = this.props;
			
			API.trainings.addDocument(this.state.fileUrl).then(res => {
				if(res.data.success) {
					console.log('API Response:', res.data);
					console.log('File saved to DB:', res.data.training);
					this.props.getTraining();
				} else {
					console.log('Error saving document.', res.data.error);
					this.setState({ message: res.data.msg });
				}
			}).catch(err => {
				console.log('Error saving document to database:', err);
				this.setState({ message: 'Uh Oh! Something went wrong!' });
			});
		});
      }
    
  render() {
    return (
      <div>
        
        <Dropzone
           onDrop={this.handleDrop}
           multiple
           style={zoneStyle}
           >
         <p>Drop Files or Click to</p>
         <p id ="dropzoneText"> upload</p>
         <img src = {FileIcon} />
        </Dropzone>
           
        </div>
    );
  }
}

export default Upload;