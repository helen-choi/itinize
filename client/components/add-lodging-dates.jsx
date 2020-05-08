import React from 'react';

export default class AddLodgingDates extends React.Component {
  render() {
    return (
      <div className="add-lodging-dates-container">
        <h3 className="text-center pt-5">Add check-in/out</h3>
        <p className="text-muted text-center">Save check-in and check-out times<br/>to be notified</p>
        <div className="input-container row justify-content-center mt-5">
          <input className="text-center p-2" type="text" name="lodgingDates" placeholder="Lodge Name" value={this.props.lodgingDates} onChange={this.props.handleChange} />
        </div>
      </div>
    );
  }
}
