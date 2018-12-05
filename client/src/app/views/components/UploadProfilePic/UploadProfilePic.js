import React, { Component } from 'react';
import axios from 'axios';
import Dropzone from "react-dropzone";
import API from '../../../../utils/API';
import FileIcon from "./fileIcon.png";
import "./UploadProfilePic.css";
import ProfilePic from "./AvatarPlaceholder.png";
import loadingImage from './loading-image.gif';

import { SideNavItem } from "react-materialize";

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
        message: '',
        uploading: false
    }
    
/*
    componentDidMount() {
	    this.setState({ uploading: false });
    }
*/
    
    upload = files => {
	    this.setState({ uploading: true });
	    this.handleDrop(files);
    };

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
            this.setState({fileUrl: data.secure_url, uploading: false})
            console.log('Return data:', data);
            
          }).catch(err => {
	          console.log('Error uploading file to cloud', err);
          })
        });
		
		// Once all the files are uploaded 
		if(this.props.isOrg) {
			axios.all(uploaders).then(() => {
				const { organization } = this.props;
				organization.imageURL = this.state.fileUrl;
				API.organization.update(organization).then(res => {
					if(res.data.success) {
						console.log('SUCCESS!!', res.data.organization);
	// 					this.props.history.push(this.props.redirectURL);
						window.location.reload();
					} else {
						console.log('Error updating organization.');
						console.log(res.data.msg, res.data.error);
						window.location.reload();
					}
				}).catch(err => {
					console.log('Error updating organization:', err);
					window.location.reload();
				});
			});
		} else {
			axios.all(uploaders).then(() => {
				const { employee } = this.props;
				employee.imageURL = this.state.fileUrl;
				API.auth.update(employee).then(res => {
					if(res.data.success) {
	// 					this.props.history.push(this.props.redirectURL);
						this.props.getEmployee();
					} else {
						console.log('Error updating user.');
						console.log(res.data.msg, res.data.error);
					}
				}).catch(err => {
					console.log('Error updating user:', err);
				});
			
				// API.trainings.addDocument(this.state.fileUrl).then(res => {
				// 	if(res.data.success) {
				// 		console.log('API Response:', res.data);
				// 		console.log('File saved to DB:', res.data.training);
				// 		this.props.getTraining();
				// 	} else {
				// 		console.log('Error saving document.', res.data.error);
				// 		this.setState({ message: res.data.msg });
				// 	}
				// }).catch(err => {
				// 	console.log('Error saving document to database:', err);
				// 	this.setState({ message: 'Uh Oh! Something went wrong!' });
				// });
			});
		}
    }
    
  render() {
	
	const { user, employee, organization, isOrg } = this.props;
	
	const style = {
		height: '100%',
		width: '100%',
		backgroundPosition: 'center',
		backgroundSize: 'cover',
		borderRadius: '50%'
	};
	
	if(isOrg) {
		style.backgroundImage = `url(${organization.imageURL})`;
	} else {
		style.backgroundImage = `url(${employee.imageURL})`;
	}
	
    return (
      <div className='profile-img-container'>
      	{ this.state.uploading &&
	      	<div id='loading-img'>
	      		<img src={loadingImage} alt='loading image' />
	      	</div>
      	}
        
        <Dropzone
           onDrop={this.upload}
           multiple
           style={zoneStyle}
           >
           { isOrg
	           ? (
		           <SideNavItem
                        userView 
                        id='userProfile'
                        user={{
	                        background: '',
	                        image: organization.imageURL,
	                        name: <span className='wht'>
	                        	{ user.fname
			                        ? user.fname.toUpperCase()
			                        : null}
			                    &nbsp;
		                        { user.lname
			                        ? user.lname.toUpperCase()
			                        : null}
			                    </span>,
	                        email: <span className='blk'>{user.username}</span>
                        }}
                    />
	           ) : (
		           <div id='profile-img' style={style}></div>
	           )
           }
          
         {/* <p>Set Profile </p>
         <p id ="dropzoneText"> upload</p> */}
         {/* <img src = {ProfilePic} alt="file" /> */}
        </Dropzone>
           
        </div>
    );
  }
}

//https://res.cloudinary.com/blnicholson/image/upload/v1543546473/qbswekpy1p0y1cknkkpe.png (default Avatar)
/*
	Loading Images:
	https://www.twotreesny.com/images/loader.gif	// thin circle
	https://media.giphy.com/media/3o7TKtnuHOHHUjR38Y/source.gif		// generic circle
	https://i.gifer.com/embedded/download/DEh.gif	//	party stickers
	https://gifimage.net/wp-content/uploads/2018/04/loading-animated-gif-transparent-background-4.gif	// twister
	http://sfdcmonkey.com/wp-content/uploads/2016/12/slds_spinner_brand.gif	// bouncing balls
*/
export default Upload;