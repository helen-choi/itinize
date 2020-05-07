import React from 'react';
import { Link } from 'react-router-dom';

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
        <div className="container">
          <div className="row progress mb-1">
            <div className="progress-bar w-25"></div>
          </div>
          <header className="row">
            <Link className=""to="/">
              <img className="icon-left" src="/./images/back.png" alt="back arrow"/>
            </Link>
            <div className="row">

            </div>
          </header>
          <div className="row">
            <h4>Add a destination</h4>
          </div>
        </div>
      );
    } else {
      // either do a switch method or continue with this if-else statement
    }
  }
}
