import React, { Component } from "react";
import "./AboutClass.css";

class AboutClass extends Component {
  constructor(props) {
    super(props);
    //console.log(`${props.name} Constructor`);;
  }

  componentDidMount() {
    //console.log(this.props.name + " DidMount");
  }

  render() {
    const { name, Location, contact } = this.props;
    //console.log(name + " Render");
    return (
      <div className="user-card">
        <h2>Name: {name}</h2>
        <h2>Location: {Location}</h2>
        <h2>Contact: {contact}</h2>
      </div>
    );
  }
}

export default AboutClass;
