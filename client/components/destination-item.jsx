import React from 'react';
import { Link } from 'react-router-dom';

export default function DestinationItem(props) {
  const destination = props.destination;
  return (
    <div className="card h-50" style={{ backgroundImage: `url(${destination.destinationImage})` }}>
      <Link to="/destinations/:id">
        <div className="card-body text-white d-flex justify-content-center align-items-center">
          <h5>{destination.destinationName}</h5>
        </div>
      </Link>
      <div className="card-footer d-flex justify-content-center">
        <div className="circle-blue d-flex justify-content-center align-items-center">
          <img className="icon" src="./images/pencil.png" alt="" />
        </div>
        <div className="circle-red d-flex justify-content-center align-items-center">
          <img className="icon" src="./images/trash.png" alt="" />
        </div>
      </div>
    </div>
  );
}
