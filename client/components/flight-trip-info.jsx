import React from 'react';
import FlightTripInfoItem from './flight-trip-info-item';

export default class TripInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      flights: [],
      destinationId: null
    };

  }

  componentDidMount() {
    this.getFlightData();
    this.setState({
      destinationId: this.props.location.state.destinationId
    });
  }

  getFlightData() {
    fetch('/api/flights')
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
        <div className="row d-flex justify-content-center mt-5">
          <h2>Switzerland</h2>
          {
            this.state.flights.map(flight => {
              return <FlightTripInfoItem key={flight.flightId} flightData={flight}/>;
            })
          }
        </div>
      </div>
    );
  }
}
