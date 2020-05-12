import React from 'react';
// import AddFlightDate from './flight-date';

export default class FlightTripInfoItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      flightNumber: '',
      flightStatus: '',
      airportArrival: '',
      departTime: '',
      arrivalTime: '',
      arrivalDay: '',
      departingDate: false
    };
  }

  componentDidMount() {
    this.setState({
      flightNumber: this.props.flightData.flightNumber
    }, () => this.getFlightStatus());
  }

  getFlightStatus() {
    const key = 'a75149fdc4b4fb2bc75f00a6c9659e91';
    const flightIata = this.state.flightNumber;
    const departureIata = this.props.flightData.airportDeparture;
    fetch(`http://api.aviationstack.com/v1/flights?access_key=${key}&flight_iata=${flightIata}&dep_iata=${departureIata}`)
      .then(res => res.json())
      .then(data => {
        if (data.data.length !== 0) {
          const flightUpdate = data.data.length - 1;
          this.setState({
            flightStatus: data.data[flightUpdate].flight_status,
            airportArrival: data.data[flightUpdate].arrival.iata,
            departTime: data.data[flightUpdate].departure.scheduled.slice(11, 16),
            arrivalTime: data.data[flightUpdate].arrival.scheduled.slice(11, 16),
            arrivalDay: data.data[flightUpdate].arrival.scheduled.slice(0, 10),
            departingDate: true
          });
        }
      })
      .catch(err => console.error(err));
  }

  render() {
    const flightData = this.props.flightData;

    const flightStatus = (this.state.departingDate) ? this.state.flightStatus : 'pending';
    const airportArrival = (this.state.departingDate) ? this.state.airportArrival : 'pending';
    const departTime = (this.state.departingDate) ? this.state.departTime : 'pending';
    const arrivalTime = (this.state.departingDate) ? this.state.arrivalTime : 'pending';
    const arrivalDay = (this.state.departingDate) ? this.state.arrivalDay : 'pending';
    return (
      <div key={flightData.flightId} className="flight-card pl-3 p-4 position-relative">
        <div>
          <h5 className="d-flex justify-content-between">{flightData.flightName}
            <i className={this.props.toggle()} onClick={() => this.props.handleClickDelete(flightData.flightId)}></i>
          </h5>
          <p> {flightData.airportDeparture} &#8594; {airportArrival}</p>
          <p><strong>Flight Number:</strong> {flightData.flightNumber}</p>
          <p><strong>Departing Date:</strong> {flightData.flightDate.slice(0, 10)} {departTime}</p>
          <p><strong>Arrival Date</strong> {arrivalDay} {arrivalTime}</p>
          <p><strong>Flight Status:</strong> {flightStatus}</p>
        </div>
      </div>
    );
  }
}
