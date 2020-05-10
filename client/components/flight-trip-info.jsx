import React from 'react';
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
        <div className="row ">
          <h2>{this.props.location.state.destinationName}</h2>
        </div>
        <div className="row">
          {
            this.state.flights.map(flight => {
              return <FlightTripInfoItem key={flight.flightId} flightData={flight} />;
            })
          }
        </div>
      </div>
    );
  }
}
