import React from 'react';
import { Link } from 'react-router-dom';

export default class AddFlightName extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      flightName: '',
      counter: -1
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(event) {
    this.setState({
      flightName: event.target.value
    });
  }

  handleClick() {
    this.setState({
      counter: +1
    });
  }

  render() {
    if (this.state.counter === -1) {
      return (
        <div className="container">
          <header className="row mt-4 px-1">
            <div className="col d-flex justify-content-between">
              <Link to="/destinations/3" className="text-red">
                <i className="fas fa-times fa-2x"></i>
              </Link>
              <i onClick={this.handleClick()} className="fas fa-arrow-right fa-2x"></i>
            </div>
          </header>
          <div className="row d-flex justify-content-center mt-5">
            <h2>Name your flight</h2>
          </div>
          <div className="row d-flex justify-content-center mt-3">
            <h6>Ex Returningflight, Going back home!</h6>
          </div>
          <div className="row d-flex justify-content-center mt-5">
            <input type="text" onChange={this.handleChange} className="text-center flight-name" placeholder="Flight Name" />
          </div>
        </div>
      );
    }
  }
}
