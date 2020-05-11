import React from 'react';
// import AddFlightDate from './flight-date';

function FlightTripInfoItem(props) {
  const flightData = props.flightData;
  return (
    <div key={flightData.flightId} className="flight-card pl-3">
      <div>
        <h5 className="d-flex justify-content-between">{flightData.flightName}
          <i onClick={() => props.handleClickDelete(flightData.flightId)} className="fas fa-times fa-lg pt-2 pr-3"></i>
        </h5>
        <p>{flightData.airportDeparture}</p>
        <p>Flight Number: {flightData.flightNumber}</p>
        <p>Departing Date: {flightData.flightDate.slice(0, 10)}</p>
        <p>Flight Status: pending</p>
      </div>
    </div>
  );
}

export default FlightTripInfoItem;
