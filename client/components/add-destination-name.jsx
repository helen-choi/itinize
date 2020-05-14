import React from 'react';
import { Link } from 'react-router-dom';
import SelectDestinationImageProfile from './select-destination-image-profile';
import AddDestinationDates from './add-trip-start-end-dates-front-end';
import AddDestinationDescription from './add-description-to-destination';
import Confirmation from './confirmation';

export default class AddDestinationName extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      componentStage: -1,
      destinationName: '',
      destinationImage: '',
      tripStart: '',
      tripEnd: '',
      description: '',
      placeId: '',
      isSubmitted: false,
      coordinates: null,
      isClicked: false

    };
    this.googleMaps = this.googleMaps.bind(this);
    this.handleScriptLoad = this.handleScriptLoad.bind(this);
    this.handlePlaceSelect = this.handlePlaceSelect.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleRightArrowClick = this.handleRightArrowClick.bind(this);
    this.handleLeftArrowClick = this.handleLeftArrowClick.bind(this);
    this.handleSelectImage = this.handleSelectImage.bind(this);
    this.handleSelectTripStart = this.handleSelectTripStart.bind(this);
    this.handleSelectTripEnd = this.handleSelectTripEnd.bind(this);
    this.handleSelectDescription = this.handleSelectDescription.bind(this);
    this.handleSubmitDestinationInfo = this.handleSubmitDestinationInfo.bind(this);
  }

  googleMaps() {
    if (!document.getElementById('googleMaps')) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_MAP}&libraries=places`;
      script.defer = true;
      script.async = true;
      script.id = 'googleMaps';
      document.querySelector('body').appendChild(script);
      script.addEventListener('load', this.handleScriptLoad);
    } else {
      this.handleScriptLoad();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.componentStage !== prevState.componentStage) {
      this.setState({
        isClicked: false
      });
    }
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
    this.autocomplete.setFields(['address_components', 'formatted_address', 'place_id', 'geometry']);
    this.autocomplete.addListener('place_changed', this.handlePlaceSelect);
  }

  handlePlaceSelect() {
    const addressObj = this.autocomplete.getPlace();
    if (addressObj) {
      const geo = { lat: addressObj.geometry.location.lat(), lng: addressObj.geometry.location.lng() };
      const addressArray = addressObj.address_components;
      const country = addressArray[addressArray.length - 1].long_name;
      const placeId = addressObj.place_id;
      this.setState({ destinationName: country, placeId: placeId, coordinates: geo });
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

  handleSubmitDestinationInfo() {
    const destinationInfo = {
      destinationName: this.state.destinationName,
      destinationImage: this.state.destinationImage,
      tripStart: this.state.tripStart,
      tripEnd: this.state.tripEnd,
      description: this.state.description,
      placeId: this.state.placeId
    };
    const init = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(destinationInfo)
    };
    fetch('/api/destinations', init)
      .then(res => res.json())
      .then(data => {
        const latitude = this.state.coordinates.lat;
        const longitude = this.state.coordinates.lng;
        const locationInit = {
          method: 'post',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ placeId: this.state.placeId, latitude, longitude })
        };
        fetch('/api/locations', locationInit)
          .then(res => res.json());
      })
      .catch(err => console.error(err));

    this.setState({
      isSubmitted: true
    });
  }

  componentDidMount() {
    this.googleMaps();
  }

  render() {
    const componentsArray = [<SelectDestinationImageProfile
      currentImage={this.state.destinationImage}
      imageParam={this.state.destinationName}
      handleImageClick={this.handleSelectImage}
      country={this.state.destinationName}
      key={this.state.componentStage}/>,
    <AddDestinationDates
      tripStart={this.state.tripStart}
      handleSelectTripStart={this.handleSelectTripStart}
      handleSelectTripEnd={this.handleSelectTripEnd}
      key={this.state.componentStage}/>,
    <AddDestinationDescription
      handleSelectDestinationDescription={this.handleSelectDescription}
      key={this.state.componentStage} />];
    let leftIcon;
    let rightIcon;
    const addDestinationValidation = (
      <div className={`row justify-content-center ${(this.state.isClicked && !this.state.placeId) ? 'destination-validation-on' : 'destination-validation-off'}`}>
        <div className="col-6 text-center text-danger">Valid Country Needed</div>
      </div>
    );
    switch (this.state.componentStage) {
      case -1:
        leftIcon = (<Link className="text-dark" to="/">
          <i className="fas fa-times fa-2x"></i>
        </Link>);
        rightIcon = <i onClick={() => {
          this.setState({ isClicked: true });
          if (this.state.placeId) { this.handleRightArrowClick(); }
        }} className="fas fa-arrow-right fa-2x"></i>;
        break;
      case 0:
        leftIcon = <i onClick={this.handleLeftArrowClick} className="fas fa-arrow-left fa-2x"></i>;
        rightIcon = <i onClick={() => {
          if (this.state.destinationImage) {
            this.handleRightArrowClick();
          }
        }} className="fas fa-arrow-right fa-2x"></i>;
        break;
      case 1:
        leftIcon = <i onClick={this.handleLeftArrowClick} className="fas fa-arrow-left fa-2x"></i>;
        rightIcon = <i onClick={this.handleRightArrowClick} className="fas fa-arrow-right fa-2x"></i>;
        break;
      case 2:
        leftIcon = <i onClick={this.handleLeftArrowClick} className="fas fa-arrow-left fa-2x"></i>;
        rightIcon = <i onClick={() => {
          this.handleSubmitDestinationInfo();
          this.handleRightArrowClick();
        }} className="fas fa-check fa-2x"></i>;
        break;
      case 3:

        break;
      default:
        leftIcon = (<Link className="text-dark" to="/">
          <i className="far fa-times-circle fa-2x"></i>
        </Link>);
        rightIcon = <i onClick={this.handleRightArrowClick} className="fas fa-arrow-right fa-2x"></i>;
    }

    return (
      (this.state.isSubmitted && <Confirmation key={this.state.componentStage} newItem="destination" history={this.props.history} match={this.props.match} />) ||
      <div className="w-100">
        {this.state.componentStage !== 3 ? (<div className="row page-controls no-gutters mb-1">
          <div className={`col destination-progress-bar-margin ${(this.state.componentStage === -1) ? 'completed' : 'completed'}`}></div>
          <div className={`col destination-progress-bar-margin ${(this.state.componentStage >= 0) ? 'completed' : 'not-completed'}`}></div>
          <div className={`col destination-progress-bar-margin ${(this.state.componentStage >= 1) ? 'completed' : 'not-completed'}`}></div>
          <div className={`col ${(this.state.componentStage === 2) ? 'completed' : 'not-completed'}`}></div>
        </div>) : null }
        <header className="row p-3">
          <div className="col d-flex justify-content-between">
            {leftIcon}
            {rightIcon}
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

            <div className="justify-content-center mt-5">

              <input type="text" id="search" onChange={this.handleChange} onClick={this.handlePlaceSelect} className="p-2" placeholder="e.g. Japan" name="" />

            </div>
          </div>
          {addDestinationValidation}
        </div>
      </div>) || componentsArray[this.state.componentStage]}
      </div>
    );
  }
}
