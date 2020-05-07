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
        <div className="container h-100">
          <div className="row progress mb-1">
            <div className="progress-bar w-25"></div>
          </div>
          <header className="row">
            <div className="col">
              <Link className="text-dark" to="/">
                <i className="fas fa-arrow-left fa-2x"></i>
              </Link>
            </div>
          </header>
          <div className="main-text-height row align-items-center">
            <div className="col-12">
              <h4 className="text-center font-weight-bold">Add a destination</h4>
              <h6 className="text-center">Enter the country of your destination</h6>
            </div>
          </div>
        </div>
      );
    } else {
      // either do a switch method or continue with this if-else statement
    }
  }
}
