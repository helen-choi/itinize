import React from 'react';
import { Link } from 'react-router-dom';

export default class AddLodgingName extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: -1,
      lodgingName: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleNextClick = this.handleNextClick.bind(this);
  }

  handleChange() {
    this.setState({
      lodgingName: event.target.value
    });
  }

  handleNextClick() {
    let counter = this.state.counter;
    counter++;
    this.setState({
      counter: counter
    });
  }

  render() {
    // const counter = this.state.counter;
    // let page;
    // if(counter === 0)
    return (
      <div className="add-lodging-container">
        <div className="page-controls d-flex flex-nowrap">
          <div className="col-4 mr-2 completed"></div>
          <div className="col-4 mr-2 not-completed"></div>
          <div className="col-4 not-completed"></div>
        </div>
        <div className="add-lodging-name-container p-3">
          <div className="form-controls d-flex justify-content-between">
            <Link to="/lodgings">
              <i className="fas fa-times fa-2x"></i>
            </Link>
            <i className="fas fa-arrow-right fa-2x" onClick={this.handleNextClick}></i>
          </div>
          <h3 className="text-center pt-5">Add Lodging Name</h3>
          <p className="text-muted text-center">Enter name of your lodge</p>
          <div className="input-container row justify-content-center mt-5">
            <input className="text-center p-2" type="text" name="lodgingName" placeholder="Lodge Name" value={this.state.lodgingName} onChange={this.handleChange} />
          </div>
        </div>
      </div>
    );
  }
}
