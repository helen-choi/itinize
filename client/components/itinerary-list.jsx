import React from 'react';

export default class ItineraryList extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-6">
            <i className="far fa-times-circle fa-2x"></i>
          </div>
          <div className="col-6 d-flex justify-content-end">
            <i className="fas ml-2 fa-pen fa-2x text-black"></i>
            <i className="fas ml-2 fa-plus fa-2x text-black"></i>
            <i className="far ml-2 fa-compass fa-2x text-black"></i>
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
