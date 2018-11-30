import React, { Component } from 'react';
import axios from 'axios';
import Dropzone from "react-dropzone";

const zoneStyle = {
  width:"150px",
  height:"100px", 
  border: "1px solid white"
}
const proxyurl = "https://cors-anywhere.herokuapp.com/";
const cloudURL = "http://api.cloudinary.com/v1_1/blnicholson/upload";
class Upload extends Component {
   
    state = {
        fileUrl:""
    }

    handleDrop = files => {
        // Push all the axios request promise into a single array
        const uploaders = files.map(file => {
          // Initial FormData
          const formData = new FormData();
          formData.append("file", file);
          formData.append("upload_preset", "o2x3uzal"); 
          formData.append("api_key", "829388363351532"); 
          formData.append("timestamp", (Date.now() / 1000) | 0);
          
         
          return axios.post(proxyurl + cloudURL, formData, {
            headers: { "X-Requested-With": "XMLHttpRequest" },
          }).then(response => {
            const data = response.data;
            this.setState({fileUrl: data.secure_url})
            console.log(data);
            
          })
        });
      
        // Once all the files are uploaded 
        axios.all(uploaders).then(() => {
          console.log("file uploaded!")
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
         <p>Drop Files or Click to upload</p>
        </Dropzone>

           <a href = {this.state.fileUrl}>Download File</a>
        </div>
    );
  }
}

export default Upload;