import React from 'react';
// import { Link } from 'react-router-dom';

export default class AddDestinationName extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      componentStage: -1,
      destinationName: ''
    };

  }

  render() {
    // use either a switch or a two conditional check if -1 for each component to render correctly
    if (this.state.componentStage === -1) {
      return (
        <h1>hello</h1>
      );
    } else {
      // either do a switch method or continue with this if-else statement
    }
  }
}
