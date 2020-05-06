import React from 'react';

export default function DestinationItem(props) {
  const destination = props.destination;
  return (
    <div className="card-group col-6"
      style={{ backgroundImage: `url(${destination.destinationImage})` }}>
      <div className="card">
        <img src={destination.destinationImage} alt={`picture of ${destination.destinationName}`}/>
        <h5>{props.destination.destinationName}</h5>
      </div>
    </div>
  );
}
