import React from 'react';
import { Link } from 'react-router-dom';
import Script from 'react-load-script';
import SelectDestinationImageProfile from './select-destination-image-profile';
import AddDestinationDates from './add-trip-start-end-dates-front-end';
import AddDestinationDescription from './add-description-to-destination';

export default class AddDestinationName extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      componentStage: 2,
      destinationName: 'Japan',
      destinationImage: 'https://images.pexels.com/photos/1440476/pexels-photo-1440476.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800',
      place_id: 'ChIJLxl_1w9OZzQRRFJmfNR1QvU',
      tripStart: '2020-06-05',
      tripEnd: '2020-06-12',
      description: 'I want to eat some yummy ラメン'
    };
    this.handleScriptLoad = this.handleScriptLoad.bind(this);
    this.handlePlaceSelect = this.handlePlaceSelect.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleRightArrowClick = this.handleRightArrowClick.bind(this);
    this.handleLeftArrowClick = this.handleLeftArrowClick.bind(this);
    this.handleSelectImage = this.handleSelectImage.bind(this);
    this.handleSelectTripStart = this.handleSelectTripStart.bind(this);
    this.handleSelectTripEnd = this.handleSelectTripEnd.bind(this);
    this.handleSelectDescription = this.handleSelectDescription.bind(this);

  }

  handleRightArrowClick() {
    let newComponentStage = this.state.componentStage;
    newComponentStage = newComponentStage + 1;
    this.setState({ componentStage: newComponentStage });
  }

  handleLeftArrowClick() {
    let newComponentStage = this.state.componentStage;
    newComponentStage = newComponentStage - 1;
    this.setState({ componentStage: newComponentStage });
  }

  handleChange() {
    this.setState({ destinationName: event.target.value });
  }

  handleScriptLoad() {
    const options = { types: ['(regions)'] };
    // eslint-disable-next-line no-undef
    this.autocomplete = new google.maps.places.Autocomplete(
      document.getElementById('search'), options);
    this.autocomplete.setFields(['address_components', 'formatted_address', 'place_id']);
    this.autocomplete.addListener('place_changed', this.handlePlaceSelect);
  }

  handlePlaceSelect() {
    const addressObj = this.autocomplete.getPlace();

    if (addressObj) {
      const addressArray = addressObj.address_components;
      const country = addressArray[addressArray.length - 1].long_name;
      const placeId = addressObj.place_id;
      this.setState({ destinationName: country, place_id: placeId });
    }
  }

  handleSelectImage(imageString) {
    this.setState({ destinationImage: imageString });
  }

  handleSelectTripStart(tripStartDate) {
    this.setState({ tripStart: tripStartDate });
  }

  handleSelectTripEnd(tripEndDate) {
    this.setState({ tripEnd: tripEndDate });
  }

  handleSelectDescription(destinationDescription) {
    this.setState({ description: destinationDescription });
  }

  render() {
    const sessionToken = Math.random() * 100 + Math.random() * 1000 + Math.random() * 10;
    // use either a switch or a two conditional check if -1 for each component to render correctly
    const componentsArray = [<SelectDestinationImageProfile currentImage={this.state.destinationImage} imageParam={this.state.destinationName} handleImageClick={this.handleSelectImage} country={this.state.destinationName} key={this.state.componentStage}/>,
      <AddDestinationDates tripStart={this.state.tripStart} handleSelectTripStart={this.handleSelectTripStart}
        handleSelectTripEnd={this.handleSelectTripEnd}
        key={this.state.componentStage}/>,
      <AddDestinationDescription handleSelectDestinationDescription={this.handleSelectDescription}
        key={this.state.componentStage} />,
      <h1 key={this.state.componentStage}>User Can confirm added destination</h1>];
    let leftIcon;
    let rightIcon;
    switch (this.state.componentStage) {
      case -1:
        leftIcon = (<Link className="text-dark" to="/">
          <i className="far fa-times-circle fa-2x"></i>
        </Link>);
        rightIcon = <i onClick={this.handleRightArrowClick} className="fas fa-arrow-right fa-2x"></i>;
        break;
      case 0:
        leftIcon = <i onClick={this.handleLeftArrowClick} className="fas fa-arrow-left fa-2x"></i>;
        rightIcon = <i onClick={this.handleRightArrowClick} className="fas fa-arrow-right fa-2x"></i>;
        break;
      case 1:
        leftIcon = <i onClick={this.handleLeftArrowClick} className="fas fa-arrow-left fa-2x"></i>;
        rightIcon = <i onClick={this.handleRightArrowClick} className="fas fa-arrow-right fa-2x"></i>;
        break;
      case 2:
        leftIcon = <i onClick={this.handleLeftArrowClick} className="fas fa-arrow-left fa-2x"></i>;
        rightIcon = <i onClick={this.handleRightArrowClick} className="fas fa-check fa-2x"></i>;
        break;
      case 3:
        leftIcon = <i onClick={this.handleLeftArrowClick} className="fas fa-arrow-left fa-2x"></i>;
        rightIcon = <i onClick={this.handleRightArrowClick} className="fas fa-check fa-2x"></i>;
        break;
      default:
        leftIcon = (<Link className="text-dark" to="/">
          <i className="far fa-times-circle fa-2x"></i>
        </Link>);
        rightIcon = <i onClick={this.handleRightArrowClick} className="fas fa-arrow-right fa-2x"></i>;
    }

    return (
      <div className="container h-100">
        <div className="row page-controls no-gutters mb-1">
          <div className={`col destination-progress-bar-margin ${(this.state.componentStage === -1) ? 'completed' : 'completed'}`}></div>
          <div className={`col destination-progress-bar-margin ${(this.state.componentStage >= 0) ? 'completed' : 'not-completed'}`}></div>
          <div className={`col destination-progress-bar-margin ${(this.state.componentStage >= 1) ? 'completed' : 'not-completed'}`}></div>
          <div className={`col ${(this.state.componentStage === 2) ? 'completed' : 'not-completed'}`}></div>
        </div>
        <header className="row">
          <div className="col d-flex justify-content-between">
            {leftIcon}
            {rightIcon}
            {/* history prop will be used at the end of the multi-page form */}
          </div>
        </header>
        {(this.state.componentStage === -1 &&
      <div className="row">
        <div className="col">
          <div className="row">
            <div className="col">
              <h3 className="text-center pt-5">Add a Destination</h3>
              <p className="text-muted text-center">Enter the country of your destination.</p>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-8 justify-content-center mt-5">
              <Script url={`https://maps.googleapis.com/maps/api/js?key=AIzaSyC9LE1lKj5Qhf161dfpRpA8mUQ17b-Oons&libraries=places&sessiontoken=${sessionToken}`} onLoad={this.handleScriptLoad} />
              <input type="text" id="search" onChange={this.handleChange} onClick={this.handlePlaceSelect} className="form-control" placeholder="e.g. Japan" name="" />
            </div>
          </div>
        </div>
      </div>) || componentsArray[this.state.componentStage]}
      </div>
    );

    // either do a switch method or continue with this if-else statement

  }
}
