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
          <header className="row">
            <div className="row">
              <div className="progress">
                {/* <div className="progress-bar" role="progressbar" style="width: 25%" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div> */}
              </div>
            </div>
            <div className="row">
              <Link className=""to="/">
                <img className="" src="/./images/back.png" alt="back arrow"/>
              </Link>
            </div>
            <div className="row">

            </div>
          </header>
          <div className="row">
            <h1>hello</h1>
          </div>
        </div>
      );
    } else {
      // either do a switch method or continue with this if-else statement
    }
  }
}
