import React from 'react';

export default class AddDestinationDescription extends React.Component {
  render() {

    return (
      <div className="row">
        <div className="col">
          <div className="row">
            <div className="col">
              <h3 className="text-center pt-5">Add description (optional)</h3>
              <p className="text-muted text-center">Enter the country of your destination.</p>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-8 justify-content-center mt-5">
              <input type="text" id="destinationDescription" onChange={() => this.props.handleSelectDestinationDescription(event.target.value)} onClick={this.handlePlaceSelect} className="form-control" placeholder="e.g. I want to..." name="" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
