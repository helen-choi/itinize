import React from 'react';

export default class AddFlightConfirmation extends React.Component {

  render() {
    return (
      <div>
        <div className="row d-flex justify-content-center text-center mt-5">
          <h2>Enter your flight information</h2>
        </div>

        <div className="row d-flex justify-content-center text-center mt-3 text-muted">
          <h6>Ex: LAX, SW1110</h6>

        </div>
        <div className="row d-flex justify-content-center mt-4">
          <input type="text" name="airportDeparture" onChange={this.props.handleUppercase} className="text-center flight-number p-2" placeholder="Departure Airport" value={this.props.airportDeparture} />
        </div>
        <div className="row d-flex justify-content-center mt-4">
          <input type="text" name="flightNumber" onChange={this.props.handleUppercase} className="text-center flight-number p-2" placeholder="Flight Number" value={this.props.flightNumber} />
        </div>
      </div>
    );
  }
}
