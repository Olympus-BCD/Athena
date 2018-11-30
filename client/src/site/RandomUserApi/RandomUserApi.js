// React Imports
import  React from 'react';
import { Component } from 'react';

// CSS & Local Imports
import "./RandomUserApi.css";

class RandomUserApi extends Component {
    constructor() {
        super();
        this.state = {
            pictures: [],
        };
    }

componentDidMount() {
    fetch('https://randomuser.me/api/?results=25')
    .then(results =>{
        return results.json();
    }).then(data => {
        let pictures = data.results.map((pic) => {
            return(
                <div key={pic.results}>
                    <img src={pic.picture.medium} alt="pics" />

                </div>
            )
        })

        this.setState({pictures: pictures});
        console.log("state", this.state.pictures);
    })
}

render() {
    return (
       
            <div className="container">
            {this.state.pictures}
            </div>
     
    );
}

}
export default RandomUserApi;