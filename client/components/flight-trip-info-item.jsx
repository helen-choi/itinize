import React from 'react';

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
      departureDate: '',
      airportDeparture: '',
      departingDate: false
    };
  }

  componentDidMount() {
    this.setState({
      flightNumber: this.props.flightData.flightNumber,
      airportDeparture: this.props.flightData.airportDeparture
    });
    this.checkDate(this.props.flightData.flightDate.slice(0, 10), this.props.flightData.flightNumber, this.props.flightData.airportDeparture);
  }

  checkDate(date, iata, departure) {
    const userYear = date.slice(0, 4);
    const userMonth = date.slice(5, 7);
    const userDay = date.slice(8, 10);
    const userDate = new Date(userYear, userMonth - 1, userDay);
    const currentDate = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());

    if (currentDate.toString() === userDate.toString()) {
      this.getFlightStatus(iata, departure);
    }
  }

  getFlightStatus(iata, departure) {
    const key = 'a75149fdc4b4fb2bc75f00a6c9659e91';
    const flightIata = iata;
    const departureIata = departure;
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
    const departTime = (this.state.departingDate) ? this.state.departTime : 'TBA';
    const arrivalTime = (this.state.departingDate) ? this.state.arrivalTime : null;
    const arrivalDay = (this.state.departingDate) ? this.state.arrivalDay : 'pending';
    return (
      <div key={flightData.flightId} className="flight-card pl-3 p-4 mt-3 position-relative">
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
