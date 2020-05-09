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
    });
    if (this.state.checkinDate !== '' &&
      this.state.checkinTime !== '' &&
      this.state.checkoutDate !== '' &&
      this.state.checkoutTime !== '') { this.handleCombine(); }
  }

  handleCombine() {
    const checkInDateTime = `${this.state.checkinDate} ${this.state.checkinTime}`;
    const checkOutDateTime = `${this.state.checkoutDate} ${this.state.checkoutTime}`;
    this.props.onComplete(checkInDateTime, checkOutDateTime);
  }

  render() {
    // Getting today's date in yyyy-mm-dd format
    const today = new Date();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    const yyyy = today.getFullYear();
    const todayFormated = `${yyyy}-${mm}-${dd}`;

    return (
      <div className="add-lodging-number-container">
        <h3 className="text-center pt-5">Add Check-In/Out</h3>
        <p className="text-muted text-center">Save check-in and check-out<br />times to be notified</p>
        <div className="checkin row justify-content-center mt-5">
          <label className="col-6" htmlFor="checkinDate">Checkin Date</label>
          <label className="col-6" htmlFor="checkinTime">Time</label>
          <input type="date" name="checkinDate" min={todayFormated} value={this.state.checkinDate} onChange={this.handleChange}/>
          <input type="time" name="checkinTime" value={this.state.checkinTime} onChange={this.handleChange}/>
        </div>
        <div className="checkout row justify-content-center mt-5">
          <label htmlFor="checkout-date"></label>
          <input type="date" name="checkoutDate" min={todayFormated} value={this.state.checkoutDate} onChange={this.handleChange} />
          <input type="time" name="checkoutTime" value={this.state.checkoutTime} onChange={this.handleChange} />
        </div>
      </div>
    );
  }
}
