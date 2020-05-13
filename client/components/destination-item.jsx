import React from 'react';
import { Link } from 'react-router-dom';
import DeleteModal from './delete-modal';

export default function DestinationItem(props) {
  const destination = props.destination;
  return (

    <div className="card destination-item h-50 mt-3" style={{ backgroundImage: `url(${destination.destinationImage})` }}>
      <div className="card-body text-white d-flex justify-content-center align-items-center">
        <Link to={`/destinations/${destination.destinationId}`}>
          <div className="overlay"></div>
          <h5 className="text-white text-center">{destination.destinationName}</h5>
        </Link>
      </div>
      <div className="row justify-content-center px-3">
        <Link to={{
          pathname: `/destinations/${destination.destinationId}`,
          state: 'This should make the DestinationInfo Component on edit mode'
        }}className="mt-2 circle circle-dest-list teal p-2 mr-1 d-flex justify-content-center w-25 text-dark">
          <img className="icon" src="./images/pencil.png" alt="" />
        </Link>
        <div className=" mt-2 circle circle-dest-list red p-2 ml-1 d-flex justify-content-center align-items-center w-25">
          <DeleteModal deleteHandle={props.handleClickDelete} id={props.destination.destinationId} destinationItem />
        </div>
      </div>
    </div>
  );
}
