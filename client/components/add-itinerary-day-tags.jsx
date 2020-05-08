import React from 'react';

export default class AddItineraryDates extends React.Component {
  constructor(props) {
    super(props);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.state = {
      selectValue: '',
      tripStart: '',
      tripEnd: '',
      days: []
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
            const total = (endMinutes - startMinutes) / (1000 * 24 * 3600);
            const days = [];
            for (let i = 1; i <= total; i++) {
              days.push(<option key={i} value={'Day ' + i}>Day {i}</option>);
            }
            return { tripStart: data.tripStart, tripEnd: data.tripEnd, days };
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
      return <div>Hello from AddItineraryDates</div>;
    } else {
      return (
        <div className="add-lodging-name-container">
          <h1 className="text-center pt-2">Which day of travel are you planning to visit?</h1>
          <h3 className="text-center pt-2">(optional)</h3>
          <p className="text-muted text-center">You can also add later if you dont know yet</p>
          <label className="input-container row justify-content-center mt-5">
            <select className="p-2" value={this.state.selectValue} onChange={this.handleOnChange}>
              Please Pick A day
              <option className={this.addClass} value="">Select A Day</option>
              {this.state.days}
            </select>
          </label>
        </div>
      );
    }
  }
}
