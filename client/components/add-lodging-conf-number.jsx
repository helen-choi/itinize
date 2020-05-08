import React from 'react';

export default class AddLodgingConfNumber extends React.Component {

  render() {
    return (
      <div className="add-lodging-number-container">
        <h3 className="text-center pt-5">Add Lodging<br/>Confirmation Number</h3>
        <div className="input-container row justify-content-center mt-5">
          <input className="text-center p-2" type="text" name="lodgingNumber" placeholder="Confirmation Number" value={this.props.value} onChange={this.props.handleChange} />
        </div>
      </div>
    );
  }
}
