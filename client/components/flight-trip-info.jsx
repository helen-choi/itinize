import React from 'react';
import { Link } from 'react-router-dom';
import FlightTripInfoItem from './flight-trip-info-item';

export default class TripInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      flights: [],
      deleteIconEdit: false
    };
    this.handleClickDelete = this.handleClickDelete.bind(this);
    this.deleteIconEdit = this.deleteIconEdit.bind(this);
    this.toggleDeleteEdit = this.toggleDeleteEdit.bind(this);
  }

  componentDidMount() {
    this.getFlightData(this.props.location.state.destinationId);
    // this.getFlightStatus();
  }

  getFlightData(flightDestinationId) {
    fetch(`/api/flights/${flightDestinationId}`)
      .then(res => res.json())
      .then(data => {
        this.setState({
          flights: data
        });
      })
      .catch(err => console.error(err));
  }

  // getFlightStatus() {
  //   fetch('http://api.aviationstack.com/v1/flights?access_key=a8f3f007b5b6084882a8e2c359e3e4d5&flight_iata=UA2765')
  //     .then(res => res.json())
  //     .then(data => {
  //       console.log(data.data[0].flight_status);
  //     })
  //     .catch(err => console.error(err));
  // }

  deleteIconEdit() {
    this.setState({ deleteIconEdit: !this.state.deleteIconEdit });
  }

  toggleDeleteEdit() {
    const mode = this.state.deleteIconEdit;
    if (mode === false) {
      return 'fas fa-times fa-lg pt-2 pr-3 off';
    } else {
      return 'fas fa-times fa-lg pt-2 pr-3';
    }
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
          <div onClick={this.deleteIconEdit} className="col-2">
            <i className="fas fa-trash fa-2x text-black"></i>
          </div>
        </header>
        <div className="row justify-content-center mt-4">
          <h2>{this.props.location.state.destinationName}</h2>
        </div>
        <div>
          {
            this.state.flights.map(flight => {
              return <FlightTripInfoItem toggle={this.toggleDeleteEdit} handleClickDelete={this.handleClickDelete} key={flight.flightId} flightData={flight} />;
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
