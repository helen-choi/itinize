import React from 'react';

export default class AddLodgingName extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: -1,
      lodgingName: ''
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange() {
    this.setState({
      lodgingName: event.target.value
    });
  }

  render() {
    return (
      <>
        <div className="page-controls d-flex flex-nowrap">
          <div className="col-4 mr-2 completed"></div>
          <div className="col-4 mr-2 not-completed"></div>
          <div className="col-4 not-completed"></div>
        </div>
        <div className="add-lodging-container p-3">
          <div className="form-controls d-flex justify-content-between">
            <i className="fas fa-times fa-2x"></i>
            <i className="fas fa-arrow-right fa-2x"></i>
          </div>
          <h3 className="text-center pt-5">Add Lodging Name</h3>
          <p className="text-muted text-center">Enter name of your lodge</p>
          <div className="input-container row justify-content-center mt-5">
            <input className="text-center p-2" type="text" name="lodgingName" placeholder="Lodge Name" value={this.state.lodgingName} onChange={this.handleChange} />
          </div>
        </div>
      </>
    );
  }
}
