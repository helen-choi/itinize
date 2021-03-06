import React from 'react';

export default class AddDestinationDates extends React.Component {
  render() {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear().toString();
    let currentMonth = (currentDate.getMonth() + 1).toString();
    if (currentMonth.length === 1) {
      currentMonth = '0' + currentMonth;
    }
    let currentDay = currentDate.getDate().toString();
    if (currentDay.length === 1) {
      currentDay = '0' + currentDay;
    }
    const formattedDate = `${currentYear}-${currentMonth}-${currentDay}`;

    return (
      <div className="d-flex">
        <div className="col">
          <div className="row">
            <div className="col">
              <h3 className="text-center pt-5">Select dates</h3>
              <p className="text-muted text-center">Enter dates for start and end of your trip.</p>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="justify-content-center mt-5 mr-2">
              <label className="d-block text-center" htmlFor="tripStart">Trip Start</label>
              <input className="input-destination-date text-center p-2" type="date" name="tripStart" min={formattedDate} onChange={() => this.props.handleSelectTripStart(event.target.value)} />
            </div>
            <div className="justify-content-center mt-5 ml-2">
              <label className="d-block text-center" htmlFor="tripEnd">Trip End</label>
              <input className="input-destination-date text-center p-2" type="date" name="tripEnd" min={this.props.tripStart} onChange={() => this.props.handleSelectTripEnd(event.target.value)} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
