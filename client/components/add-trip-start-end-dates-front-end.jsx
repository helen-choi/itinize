import React from 'react';

export default class AddDestinationDates extends React.Component {
  render() {
    let currentDate = new Date();
    console.log(currentDate);
    currentDate = currentDate.toISOString().slice(0, 10);
    console.log(currentDate, typeof currentDate);

    return (
      <div className="row">
        <div className="col">
          <h3 className="text-center pt-5">Select dates</h3>
          <p className="text-muted text-center">Enter dates for start and end of your trip.</p>
          <div className="input-container row justify-content-center mt-5">
            <label htmlFor="tripStart"></label>
            <input className="text-center p-2" type="date" name="tripStart" value={this.props.lodgingDates} onChange={this.props.handleChange} />
          </div>
        </div>
      </div>
    );
  }
}
