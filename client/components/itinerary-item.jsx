import React from 'react';

export default function ListItineraryItem(props) {
  let itineraryNote = props.itineraryNote;
  if (itineraryNote.length > 20) {
    itineraryNote = `${itineraryNote.slice(0, 20)}...`;
  }
  return (
    <div className="mt-1 border border-secondary col-9">
      <h3>{props.itineraryName}</h3>
      <p className="text-secondary">{props.itineraryDay}</p>
      <p className="text-secondary">{itineraryNote}</p>
    </div>
  );
}
