import React, { Component } from "react";
import AboutClass from "../AboutClass/AboutClass";

class About extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // Lifecycle method
  }

  render() {
    return (
      <div className="about bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 min-h-screen flex items-center justify-center">
        <div className="bg-white shadow-lg rounded-lg p-8 max-w-sm text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">About Me</h1>
          <p className="text-sm text-gray-600 mb-6">
            Front End Developer
          </p>
          <AboutClass
            name={"Kristipati Gopi"}
            Location={"Hyderabad"}
            contact={"gopikristipati@gmail.com"}
          />
        </div>
      </div>
    );
  }
}

export default About;
