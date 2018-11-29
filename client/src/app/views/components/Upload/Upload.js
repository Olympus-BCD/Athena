import React, { Component } from 'react';
import axios from 'axios';
import Dropzone from "react-dropzone";

const zoneStyle = {
  width:"150px",
  height:"100px", 
  border: "1px solid white"
}
class Upload extends Component {
   
    handleDrop = files => {
        // Push all the axios request promise into a single array
        const uploaders = files.map(file => {
          // Initial FormData
          const formData = new FormData();
          formData.append("file", file);
          formData.append("tags", `codeinfuse, medium, gist`);
          formData.append("upload_preset", "o2x3uzal"); 
          formData.append("api_key", "829388363351532"); 
          formData.append("timestamp", (Date.now() / 1000) | 0);
          
         
          return axios.post("https://api.cloudinary.com/v1_1/blnicholson/upload", formData, {
            headers: { "X-Requested-With": "XMLHttpRequest" },
          }).then(response => {
            const data = response.data;
            const fileURL = data.secure_url // You should store this URL for future references in your app
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
         <p>Place Files here to upload</p>
        </Dropzone>
        </div>
    );
  }
}

export default Upload;