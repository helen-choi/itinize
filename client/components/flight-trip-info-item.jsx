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
      arrivalTime: ''
    };
  }

  componentDidMount() {
    this.getFlightStatus();
    this.setState({
      flightNumber: this.props.flightData.flightNumber
    });
  }

  getFlightStatus() {
    fetch('http://api.aviationstack.com/v1/flights?access_key=a8f3f007b5b6084882a8e2c359e3e4d5&flight_iata=' + this.state.flightNumber)
      .then(res => res.json())
      .then(data => {
        console.log(data.data[0]);
        this.setState({
          flightStatus: data.data[0].flight_status,
          airportArrival: data.data[0].arrival.airport
        });
      })
      .catch(err => console.error(err));
  }

  render() {
    const flightData = this.props.flightData;
    return (
      <div key={flightData.flightId} className="flight-card pl-3">
        <div>
          <h5 className="d-flex justify-content-between">{flightData.flightName}
            <i className={this.props.toggle()} onClick={() => this.props.handleClickDelete(flightData.flightId)}></i>
          </h5>
          <p>{flightData.airportDeparture} - {this.state.airportArrival}</p>
          <p>Flight Number: {flightData.flightNumber}</p>
          <p>Departing Date: {flightData.flightDate.slice(0, 10)}</p>
          <p>Flight Status: {this.state.flightStatus}</p>
          <p>check: {this.state.flightNumber}</p>
        </div>
      </div>
    );
  }

}

// function FlightTripInfoItem(props) {
//   const flightData = props.flightData;
//   return (
//     <div key={flightData.flightId} className="flight-card pl-3">
//       <div>
//         <h5 className="d-flex justify-content-between">{flightData.flightName}
//           <i className={props.toggle()} onClick={() => props.handleClickDelete(flightData.flightId)}></i>
//         </h5>
//         <p>{flightData.airportDeparture}</p>
//         <p>Flight Number: {flightData.flightNumber}</p>
//         <p>Departing Date: {flightData.flightDate.slice(0, 10)}</p>
//         <p>Flight Status: pending</p>
//       </div>
//     </div>
//   );
// }

// export default FlightTripInfoItem;
