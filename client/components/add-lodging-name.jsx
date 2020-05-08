import React from 'react';
import { Link } from 'react-router-dom';
import AddLodgingConfNum from './add-lodging-conf-num';
import Confirmation from './confirmation';

export default class AddLodgingName extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: -1,
      lodgingName: '',
      isSubmitted: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleNextClick = this.handleNextClick.bind(this);
    this.handlePrevClick = this.handlePrevClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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

  handlePrevClick() {
    let counter = this.state.counter;
    counter--;
    this.setState({
      counter: counter
    });
  }

  handleSubmit() {
    this.setState({
      isSubmitted: true
    });
  }

  render() {
    const { counter } = this.state;
    let stage = counter + 2;
    const pageArr = [
      <AddLodgingConfNum key={this.state.counter} />,
      'AddLodgingDates'
    ];
    const statusArr = [];
    let leftIcon;
    let rightIcon;

    for (let i = 0; i < 3; i++) {
      if (stage) {
        statusArr.push('completed');
        stage--;
      } else {
        statusArr.push('not-completed');
      }
    }

    switch (counter) {
      case -1:
        leftIcon = <Link to="/lodgings"><i className="fas fa-times fa-2x"></i></Link>;
        rightIcon = <i className="fas fa-arrow-right fa-2x" onClick={this.handleNextClick}></i>;
        break;
      case 0:
        leftIcon = <i className="fas fa-arrow-left fa-2x" onClick={this.handlePrevClick}></i>;
        rightIcon = <i className="fas fa-arrow-right fa-2x" onClick={this.handleNextClick}></i>;
        break;
      case 1:
        leftIcon = <i className="fas fa-arrow-left fa-2x" onClick={this.handlePrevClick}></i>;
        rightIcon = <i className="fas fa-check fa-2x" onClick={this.handleSubmit}></i>;
        break;
      case 2:
        break;
    }

    return (
      (this.state.isSubmitted && <Confirmation/>) ||
        <div className="add-lodging-container">
          <div className="page-controls d-flex flex-nowrap">
            <div className={`col-4 mr-2 ${statusArr[0]}`}></div>
            <div className={`col-4 mr-2 ${statusArr[1]}`}></div>
            <div className={`col-4 ${statusArr[2]}`}></div>
          </div>
          <div className="form-controls d-flex justify-content-between p-3">

            {leftIcon}
            {rightIcon}
          </div>
          {(this.state.counter === -1 &&
          <div className="add-lodging-name-container">
            <h3 className="text-center pt-5">Add Lodging Name</h3>
            <p className="text-muted text-center">Enter name of your lodge</p>
            <div className="input-container row justify-content-center mt-5">
              <input className="text-center p-2" type="text" name="lodgingName" placeholder="Lodge Name" value={this.state.lodgingName} onChange={this.handleChange} />
            </div>
          </div>
          ) || pageArr[counter]}
        </div>

    );
  }
}
