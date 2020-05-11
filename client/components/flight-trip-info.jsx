import React from 'react';
import { Link } from 'react-router-dom';
import FlightTripInfoItem from './flight-trip-info-item';

export default class TripInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      flights: []
    };
    this.handleClickDelete = this.handleClickDelete.bind(this);
    // this.handleClickDelete(this.props.location.state.destinationId);
  }

  componentDidMount() {
    this.getFlightData(this.props.location.state.destinationId);
  }

  getFlightData(flightDestinationId) {
    fetch(`/api/flights/${flightDestinationId}`)
      .then(res => res.json())
      .then(data => {
        console.log(data[0].flightId);
        this.setState({
          flights: data
        });
      })
      .catch(err => console.error(err));
  }

  handleClickDelete(flightId) {
    const newFlights = [];
    const fetchParams = { method: 'delete' };
    fetch(`/api/flights/${flightId}`, fetchParams)
      .then(res => {
        this.state.flights.map(flight => {
          if (flight.flightId !== flightId) {
            newFlights.push(flight);
          }
        });
        this.setState({ flights: newFlights });
      })
      .catch(err => console.error(err));
  }

  render() {
    return (
      <div className="container">
        <header className="row justify-content-between pt-2 flex-fill mt-2">
          <Link to={`/destinations/${this.props.location.state.destinationId}`} className="col-2">
            <i className="fas fa-arrow-left fa-2x text-black"></i>
          </Link>
          <div className="col-2">
            <i className="fas fa-trash fa-2x text-black"></i>
          </div>
        </header>
        <div className="row justify-content-center mt-4">
          <h2>{this.props.location.state.destinationName}</h2>
        </div>
        <div>
          {
            this.state.flights.map(flight => {
              return <FlightTripInfoItem handleClickDelete={this.handleClickDelete} key={flight.flightId} flightData={flight} />;
            })
          }
        </div>
        <div className="flight-create">
          <Link to={{
            pathname: '/flights/create',
            state: { destinationId: this.props.location.state.destinationId }
          }} className="m-auto d-flex justify-content-center align-items-center">
            <i className="fas fa-plus fa-4x pt-3 text-muted"></i>
          </Link>
        </div>
      </div>
    );
  }
}
