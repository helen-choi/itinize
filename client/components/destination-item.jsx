import React from 'react';
import { Link } from 'react-router-dom';

export default function DestinationItem(props) {
  const destination = props.destination;
  return (
    <div className="card destination-item h-50" style={{ backgroundImage: `url(${destination.destinationImage})` }}>
      <Link to="/destinations/:id">
        <div className="overlay"></div>
        <div className="card-body text-white d-flex justify-content-center align-items-center">
          <h5>{destination.destinationName}</h5>
        </div>
      </Link>
      <div className="row justify-content-around pl-5 pr-5">
        <div className="card-control circle-blue p-2 mt-3 d-flex justify-content-center align-items-center">
          <img className="icon" src="./images/pencil.png" alt="" />
        </div>
        <div className="circle-red mt-3 p-2 d-flex justify-content-center align-items-center">
          <img className="icon" src="./images/trash.png" alt="" />
        </div>
      </div>
    </div>
  );
}
