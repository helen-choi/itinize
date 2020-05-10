import React from 'react';
import { Link } from 'react-router-dom';
import FlightTripInfoItem from './flight-trip-info-item';

export default class TripInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      flights: []
    };

  }

  componentDidMount() {
    this.getFlightData(this.props.location.state.destinationId);
  }

  getFlightData(flightDestinationId) {
    fetch(`/api/flights/${flightDestinationId}`)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        this.setState({
          flights: data
        });
      })
      .catch(err => console.error(err));
  }

  render() {
    return (
      <div className="container">
        <header className="row justify-content-between pt-2 flex-fill mt-2">
          <Link to="/" className="col-2">
            <i className="fas fa-arrow-left fa-2x text-black"></i>
          </Link>
          <div className="col-2">
            <i className="fas fa-pen fa-2x text-black"></i>
          </div>
        </header>
        <div className="row justify-content-center mt-4">
          <h2>{this.props.location.state.destinationName}</h2>
        </div>
        <div>
          {
            this.state.flights.map(flight => {
              return <FlightTripInfoItem key={flight.flightId} flightData={flight} />;
            })
          }
        </div>

        {/* <div className="mt-5 row">
          <Link to={{
            pathname: '/flights/create',
            state: { destinationId: this.props.location.state.destinationId }
          }} className="m-auto d-flex justify-content-center align-items-center">
            <i className="fas fa-plus fa-lg"></i>
          </Link>
        </div>
        <div className="col-3">
          <Link to={{
            pathname: '/flights/create',
            state: { destinationId: this.props.location.state.destinationId }
          }} className="circle yellow m-auto d-flex justify-content-center align-items-center">
            <i className="fas fa-plane fa-lg"></i>
          </Link>
        </div> */}
      </div>
    );
  }
}
