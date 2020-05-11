import React from 'react';
import AddFlightDate from './flight-date';

function FlightTripInfoItem(props) {
  const flightData = props.flightData;
  return (

    <div className="col" >
      <div key={flightData.flightId} className="card">
        <div className="card-body">
          <h5 className="card-title">{flightData.airportDeparture}</h5>
          <p className="card-departure">{flightData.flightNumber}</p>
          <p className="card-text">{flightData.flightDate.slice(0, 10)}</p>
        </div>
      </div>
    </div>

  );
}

export default FlightTripInfoItem;
