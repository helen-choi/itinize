import React from 'react';

export default class AddDestinationDates extends React.Component {
  render() {
    let currentDate = new Date();
    currentDate = currentDate.toISOString().slice(0, 10);

    return (
      <div className="row">
        <div className="col">
          <div className="row">
            <div className="col">
              <h3 className="text-center pt-5">Select dates</h3>
              <p className="text-muted text-center">Enter dates for start and end of your trip.</p>
            </div>
          </div>
          <div className="row">
            <div className="col-5 justify-content-center mt-5">
              <label className="d-block text-center" htmlFor="tripStart">Trip Start</label>
              <input className="input-destination-date text-center p-2" type="date" name="tripStart" min={currentDate} onChange={this.props.handleChange} />
            </div>
            <div className="col-5 justify-content-center mt-5">
              <label className="d-block text-center" htmlFor="tripEnd">Trip End</label>
              <input className="input-destination-date text-center p-2" type="date" name="tripStart" min={currentDate} value={this.props.lodgingDates} onChange={this.props.handleChange} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
