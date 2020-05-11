import React from 'react';

export default function LodgingItem(props) {
  const lodging = props.lodging;

  return (
    <div className="lodging p-4 mt-3">
      <h5>{lodging.lodgingName}</h5>
      <p><strong>Confirmation: </strong>{lodging.lodgingConfNum}</p>
      <p><strong>Check-In:</strong> {lodging.checkInDateTime}</p>
      <p><strong>Check-Out:</strong> {lodging.checkOutDateTime}</p>
    </div>
  );
}
