import React from 'react';

export default class AddFlightDate extends React.Component {
  render() {
    return (
      <div className="add-flight-date-container">
        <div className="d-flex justify-content-center mt-5">
          <h2>Enter Departure Date</h2>
        </div>
        <div className="d-flex justify-content-center mt-5">

          <input className="p-2" type="date" name="flightDate" onChange={this.props.handleChange} value={this.props.flightDate.slice(0, 10)}/>

        </div>
      </div>
    );
  }
}
