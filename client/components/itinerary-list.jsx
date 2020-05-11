import React from 'react';

export default class ItineraryList extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-6">
            x icon
          </div>
          <div className="col-6">
            pencil
            +
            gps
          </div>
        </div>
        <div className="row">
          <div className="col">
            title
          </div>
        </div>
        <div className="row">
          {/* pass days via props to see how many tags to render */}
          <div className="col">tags</div>
        </div>
        {/* list items mockup below */}
        <div className="row">

          <div className="row"></div>
          <div className="row"></div>
          <div className="row"></div>
          <div className="row"></div>
        </div>
      </div>
    );
  }
}
