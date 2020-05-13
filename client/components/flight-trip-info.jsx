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
  }

  componentDidMount() {
    this.getFlightData(this.props.location.state.destinationId);
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

    const modalStyle = this.state.handleEditClick ? { display: 'block' } : { display: 'none' };
    const iconsHidden = this.state.flights[0] ? { display: 'inline-block' } : { display: 'none' };
    const { destinationName } = this.props.location.state;
    const { destinationId } = this.props.location.state;
    return (
      <div className="container">
        <header className="row justify-content-between pt-2 flex-fill mt-2">
          <Link to={`/destinations/${destinationId}`} className="col-2">
            <i className="fas fa-times fa-2x black"></i>
          </Link>

        </header>
        <div className="flight-edit-modal" style={modalStyle} onClick={this.handleEditClick}></div>
        <div className="row justify-content-center mt-4">
          <h1>{destinationName}</h1>
        </div>

        <div className="toggle row" style={iconsHidden}>
          <Link to={{
            pathname: '/lodgings',
            state: {
              destinationId: destinationId,
              destinationName: destinationName
            }
          }}>
            <div className="show-hidden" ></div>
          </Link>
          <div className="toggle-icon show-flights teal row justify-content-center align-items-center">
            <i className="fas fa-plane text-white"></i>
          </div>

          <div className="toggle-icon show-lodgings red row justify-content-center align-items-center">
            <i className="fas fa-home text-white"></i>
          </div>
        </div>

        <div className="pl-3 pr-3 mt-3">
          {
            this.state.flights.map(flight => {
              return <FlightTripInfoItem handleClickDelete={this.handleClickDelete} key={flight.flightId} flightData={flight} />;
            })
          }
        </div>
        <div className="pl-3 pr-3 mt-3">
          <div className="gray-box p-4 d-flex justify-content-center">
            <Link to={{
              pathname: '/flights/create',
              state: { destinationId: this.props.location.state.destinationId }
            }} className="m-auto d-flex justify-content-center align-items-center">
              <div className="add-lodging-item d-flex justify-content-center align-items-center">
                <i className="fas fa-plus fa-2x"></i>
              </div>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
