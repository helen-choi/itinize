import React from 'react';

export default class AddFlightConfirmation extends React.Component {

  render() {

    return (
      <div>
        <div className="row d-flex justify-content-center text-center mt-5">
          <h2>Enter your flight information</h2>
        </div>
        <div className="row d-flex justify-content-center text-center mt-3">
          <h6>Ex LAX</h6>
        </div>
        <div className="row d-flex justify-content-center text-center mt-3">
          <h6>Ex SW1110</h6>
        </div>
        <div className="row d-flex justify-content-center mt-4">
          <input type="text" name="airportDeparture" onChange={this.props.handleChange} className="text-center flight-number" placeholder={'Departure Airport Name'} value={this.props.airportDeparture} />
        </div>
        <div className="row d-flex justify-content-center mt-4">
          <input type="text" name="flightNumber" onChange={this.props.handleChange} className="text-center flight-number" placeholder={'Flight Number'} value={this.props.flightNumber} />
        </div>
      </div>
    );
  }
}
