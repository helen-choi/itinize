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
            <div className="col-8 col-offset-4 mt-5 d-flex justify-content-center">
              <textarea className="" placeholder="e.g. I want to..." onChange={() => this.props.handleSelectDestinationDescription(event.target.value)} name="destinationDescription" id="destinationDescription" cols="30" rows="10"></textarea>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
