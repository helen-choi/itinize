import React from 'react';

export default class ListItineraryItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isClicked: false
    };
  }

  render() {
    let itineraryNote = this.props.itineraryNote;
    if (itineraryNote.length > 20) {
      itineraryNote = `${itineraryNote.slice(0, 20)}...`;
    }
    return (
      <div data-toggle='collapse' data-target={`#${this.props.id}`} className="mt-1 border border-secondary col-9 ">
        <h3>{this.props.itineraryName}</h3>
        <p className="text-secondary">{this.props.itineraryDay}</p>
        <p className="text-secondary">{itineraryNote}</p>
        <p id={this.props.id} className="collapse text-secondary">{this.props.itineraryNote}</p>
        <p id={this.props.id} className="d-none text-secondary">{this.props.itineraryNote}</p>
      </div>
    );
  }
}
