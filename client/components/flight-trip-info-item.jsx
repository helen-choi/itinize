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
      departureDate: '',
      departingDate: false
    };
  }

  componentDidMount() {
    this.setState({
      flightNumber: this.props.flightData.flightNumber
    });
    this.checkDate(this.props.flightData.flightDate.slice(0, 10));
  }

  checkDate(date) {
    console.log(date);
    const userYear = date.toString().slice(0, 4);
    const userMonth = date.toString().slice(5, 7);
    const userDay = date.toString().slice(8, 10);
    const currentDate = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());

    console.log(userYear);
    console.log(userMonth);
    console.log(userDay);
    console.log(currentDate);

    // if (userDate === currentDate) {
    //   console.log('hello its me');
    // } else {
    //   console.log('this is not me');

    // }
  }

  // if the date is correct should call the getFlightStatus method
  // if not, then put pending

  //  () => this.getFlightStatus()

  // getFlightStatus() {
  //   // const key = 'a75149fdc4b4fb2bc75f00a6c9659e91';
  //   const flightIata = this.state.flightNumber;
  //   const departureIata = this.props.flightData.airportDeparture;
  //   fetch(`http://api.aviationstack.com/v1/flights?access_key=${key}&flight_iata=${flightIata}&dep_iata=${departureIata}`)
  //     .then(res => res.json())
  //     .then(data => {
  //       if (data.data.length !== 0) {
  //         const flightUpdate = data.data.length - 1;
  //         this.setState({
  //           flightStatus: data.data[flightUpdate].flight_status,
  //           airportArrival: data.data[flightUpdate].arrival.iata,
  //           departTime: data.data[flightUpdate].departure.scheduled.slice(11, 16),
  //           arrivalTime: data.data[flightUpdate].arrival.scheduled.slice(11, 16),
  //           arrivalDay: data.data[flightUpdate].arrival.scheduled.slice(0, 10),
  //           departingDate: true
  //         });
  //       }
  //     })
  //     .catch(err => console.error(err));
  // }

  render() {
    const flightData = this.props.flightData;

    // const userInput = new Date(2020, 4, 12);
    // const a = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
    // console.log(a);
    // if (userInput.toString() === a.toString()) {
    //   console.log('it worked');
    // } else {
    //   console.log('didnt work');
    // }

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
