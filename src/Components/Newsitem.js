import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Newsitem extends Component {
  
  render() {

    let {title,description,imageUrl,url} = this.props
    return (
    
      <div className="container">
      <div>
        <div className="card">
          <img src={imageUrl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">
              {description}
            </p>
            <Link to={url} target="_blank" rel="noreferrer" className="btn btn-dark">
              Read More
            </Link> 
          </div>
        </div>
      </div>
      </div>
    );
  }
}
