import React from 'react';
import { Link } from 'react-router-dom';

export default function DestinationItem(props) {
  const destination = props.destination;

  return (

    <div className="card destination-item h-50 mt-3" style={{ backgroundImage: `url(${destination.destinationImage})` }}>
      <div className="card-body text-white d-flex justify-content-center align-items-center">
        <Link to={`/destinations/${destination.destinationId}`}>
          <div className="overlay"></div>
          <h5 className="text-white">{destination.destinationName}</h5>
        </Link>
      </div>
      <div className="row justify-content-center px-3">
        <div className="mt-2 circle teal p-2 mr-1 d-flex justify-content-center w-25">
          <img className="icon" src="./images/pencil.png" alt="" />
        </div>
        <div className=" mt-2 circle red p-2 ml-1 d-flex justify-content-center align-items-center w-25">
          <img onClick={() => props.handleClickDelete(destination.destinationId)} className="icon" src="./images/trash.png" alt="" />
        </div>
      </div>
    </div>
  );
}
