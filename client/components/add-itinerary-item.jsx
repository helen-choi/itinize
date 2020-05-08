import React from 'react';
import { Link } from 'react-router-dom';
import Confirmation from './confirmation';

export default class AddItineraryItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      componentStage: -1,
      itineraryName: ''
    };
  }

  render() {
    let icons = null;
    const componentArray = ['AddItineraryDates', 'AddItineraryNote', 'Confirmation'];

    if (this.state.componentStage === -1) {
      icons = (
        <>
          <Link to="/">
            <i className="fas fa-times fa-2x"></i>
          </Link>
          <i className="fas fa-arrow-right fa-2x" onClick={this.handleNextClick}></i>
        </>);
    } else if (this.state.componentStage < 2) {
      icons = (
        <>
          <i className="fas fa-arrow-left fa-2x" onClick={this.handlePrevClick}></i>
          <i className="fas fa-arrow-right fa-2x" onClick={this.handleNextClick}></i>
        </>);
    } else { return null; }

    return (
      <div className="add-lodging-container">
        <header className="page-controls d-flex flex-nowrap">
          <div className="col-4 mr-2 completed"></div>
          <div className="col-4 mr-2 not-completed"></div>
          <div className="col-4 not-completed"></div>
        </header>

        {icons}
        {
          (this.state.componentStage === -1 &&
            <div>
              <h1>Add your itinerary</h1>
              <p className="text-muted"> Enter Address or name of place</p>
              <input type="text" value={this.state.itineraryName}/>
            </div>
          ) ||
          (
            this.state.componentStage < 2 && componentArray[this.state.componentStage]
          ) ||
          (
            !icons && this.state.componentStage === 2 && <Confirmation/>
          )
        }
      </div>

    );
  }
}
