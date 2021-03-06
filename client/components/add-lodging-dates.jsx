import React from 'react';

export default class AddLodgingDates extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checkinDate: '',
      checkinTime: '',
      checkoutDate: '',
      checkoutTime: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleCombine = this.handleCombine.bind(this);
  }

  handleChange() {
    this.setState({
      [event.target.name]: event.target.value
    }, () => {
      if (this.state.checkinDate &&
        this.state.checkinTime &&
        this.state.checkoutDate &&
        this.state.checkoutTime) {
        this.handleCombine();
      }
    });
  }

  handleCombine() {
    if (this.state.checkinDate && this.state.checkinTime && this.state.checkoutDate && this.state.checkoutTime) {
      const checkInDateTime = `${this.state.checkinDate} ${this.state.checkinTime}`;
      const checkOutDateTime = `${this.state.checkoutDate} ${this.state.checkoutTime}`;
      this.props.onComplete(checkInDateTime, checkOutDateTime);
    }
  }

  render() {
    // Getting today's date in yyyy-mm-dd format
    const today = new Date();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    const yyyy = today.getFullYear();
    const todayFormatted = `${yyyy}-${mm}-${dd}`;
    const checkOutMin = this.state.checkinDate ? this.state.checkinDate : todayFormatted;

    return (
      <div className="add-lodging-number-container">
        <h3 className="text-center pt-5">Add Check-In/Out</h3>
        <p className="text-muted text-center">Save check-in and check-out<br />times to be notified</p>
        <div className="checkin d-flex justify-content-center mt-5">
          <div className="d-flex flex-column mr-2">
            <label className="" htmlFor="checkinDate">Check-In Date</label>
            <input className="p-2" type="date" id="checkinDate" name="checkinDate" min={todayFormatted} onChange={this.handleChange}/>
          </div>
          <div className="d-flex flex-column">
            <label className="mr-2" htmlFor="checkinTime">Time</label>
            <input className="p-2" type="time" id="checkinTime" name="checkinTime" onChange={this.handleChange}/>
          </div>
        </div>
        <div className="checkout d-flex justify-content-center mt-5">
          <div className="d-flex flex-column mr-2">
            <label className="mr-2" htmlFor="checkoutDate">Check-Out Date</label>
            <input className="p-2" type="date" id="checkoutDate" name="checkoutDate" min={checkOutMin} onChange={this.handleChange}/>
          </div>
          <div className="d-flex flex-column">
            <label htmlFor="checkoutTime">Time</label>
            <input className="p-2" type="time" id="checkoutTime" name="checkoutTime" onChange={this.handleChange}/>
          </div>

        </div>
      </div>
    );
  }
}
