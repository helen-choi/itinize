import React from 'react';
import { Link } from 'react-router-dom';
import AddFlightConfirmation from './flight-confirmation';
import AddFlightDate from './flight-date';
import Confirmation from './confirmation';

export default class AddFlightName extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      flightName: '',
      airportDeparture: '',
      flightNumber: '',
      flightDate: '',
      componentStage: -1,
      isSubmitted: false,
      destinationId: null
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleNextClick = this.handleNextClick.bind(this);
    this.handlePrevClick = this.handlePrevClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUppercase = this.handleUppercase.bind(this);
  }

  componentDidMount() {
    this.setState({
      destinationId: this.props.location.state.destinationId
    });
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleNextClick(event) {
    this.setState({
      componentStage: this.state.componentStage + 1
    });
  }

  handlePrevClick(event) {
    this.setState({
      componentStage: this.state.componentStage - 1
    });
  }

  handleSubmit() {
    this.setState({
      isSubmitted: true
    });
    this.postInformation();
  }

  handleUppercase(event) {
    this.setState({
      [event.target.name]: event.target.value.toUpperCase()
    });
  }

  postInformation() {
    const { destinationId } = this.props.location.state;
    const newFlightData = {
      flightName: this.state.flightName,
      airportDeparture: this.state.airportDeparture,
      flightNumber: this.state.flightNumber,
      flightDate: this.state.flightDate,
      destinationId: parseInt(destinationId)
    };
    const parameter = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newFlightData)
    };
    fetch('/api/flights', parameter)
      .then(res => res.json())
      .catch(err => console.error(err));
  }

  render() {
    const { componentStage } = this.state;
    const { destinationId } = this.props.location.state;
    let stage = componentStage + 2;
    const pageArr = [
      <AddFlightConfirmation key={this.state.componentStage} flightNumber={this.state.flightNumber} airportDeparture={this.state.airportDeparture} handleUppercase={this.handleUppercase} />,
      <AddFlightDate key={this.state.componentStage} flightDate={this.state.flightDate} handleChange={this.handleChange}/>
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

    switch (componentStage) {
      case -1:
        leftIcon = <Link to={`/destinations/${destinationId}`}><i className="fas fa-times fa-2x text-dark"></i></Link>;
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
    }

    return (
      (this.state.isSubmitted && <Confirmation newItem="flight" history={this.props.history} match={this.props.match}/>) ||
      <div className="add-flight-container">
        <div className="page-controls row flex-nowrap w-100">
          <div className={`col-4 mr-2 ${statusArr[0]}`}></div>
          <div className={`col-4 mr-2 ${statusArr[1]}`}></div>
          <div className={`col-4 ${statusArr[2]}`}></div>
        </div>
        <div className="form-controls d-flex justify-content-between p-3">

          {leftIcon}
          {rightIcon}
        </div>
        {(this.state.componentStage === -1 &&
          <div className="add-flight-name-container">
            <div className="d-flex justify-content-center mt-5">
              <h2>Name your flight</h2>
            </div>

            <div className="d-flex justify-content-center mt-3 text-muted">
              <h6>Ex: Returningflight, Going back home!</h6>

            </div>
            <div className="d-flex justify-content-center mt-5">
              <input type="text" name="flightName" onChange={this.handleChange} className="text-center flight-name p-2" placeholder="Flight Name" value={this.state.flightName} />
            </div>
          </div>
        ) || pageArr[componentStage]}
      </div>
    );
  }
}
