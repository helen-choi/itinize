import React from 'react';

export default class AddItineraryDates extends React.Component {
  constructor(props) {
    super(props);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.state = {
      selectValue: '',
      tripStart: '',
      tripEnd: '',
      totalDays: 0
    };
  }

  componentDidMount() {
    if (this.props.destinationId) {
      fetch(`/api/destinations/${this.props.destinationId}`)
        .then(res => res.json())
        .then(data => {
          this.setState(state => {
            const splitDateStart = data.tripStart.slice(0, 10).split('-');
            const splitDateEnd = data.tripEnd.slice(0, 10).split('-');
            const startMinutes = new Date(splitDateStart[0], splitDateStart[1], splitDateStart[2]).setMinutes(59);
            const endMinutes = new Date(splitDateEnd[0], splitDateEnd[1], splitDateEnd[2]).setMinutes(59);
            const totalDays = (endMinutes - startMinutes) / (1000 * 24 * 3600);
            return { tripStart: data.tripStart, tripEnd: data.tripEnd, totalDays };
          });
        })
        .catch(err => console.error(err));
    }
  }

  handleOnChange(e) {
    this.setState({ selectValue: e.currentTarget.value });
    this.props.getInputs(e.currentTarget.value);
  }

  render() {
    if (!this.state.tripStart) {
      return <div className="loading-data">Loading Itineraries...</div>;
    } else {

      const daysArray = [];
      if (this.state.totalDays) {
        for (let i = 1; i <= this.state.totalDays; i++) {
          daysArray.push(<option key={i} value={'Day ' + i}>Day {i}</option>);
        }
      } else {
        daysArray.push(null);
      }

      return (
        <div className="add-lodging-name-container">
          <h1 className="text-center pt-2">Which day of travel are you planning to visit?</h1>
          <h3 className="text-center pt-2">(optional)</h3>
          <p className="text-muted text-center">You can also add later if you dont know yet</p>
          <label className="input-container row justify-content-center mt-5">
            <select className="p-2" value={this.state.selectValue} onChange={this.handleOnChange}>
              Please Pick A day
              <option className={this.addClass} value="">Select A Day</option>
              {daysArray}
            </select>
          </label>
        </div>
      );
    }
  }
}
