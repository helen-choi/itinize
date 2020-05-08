import React from 'react';
import { Link } from 'react-router-dom';
import Script from 'react-load-script';
import SelectDestinationImageProfile from './select-destination-image-profile';

export default class AddDestinationName extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      componentStage: 0,
      destinationName: '',
      destinationImage: '',
      place_id: ''
    };
    this.handleScriptLoad = this.handleScriptLoad.bind(this);
    this.handlePlaceSelect = this.handlePlaceSelect.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleRightArrowClick = this.handleRightArrowClick.bind(this);
    this.handleLeftArrowClick = this.handleLeftArrowClick.bind(this);
    this.handleSelectImage = this.handleSelectImage.bind(this);
  }

  handleChange() {
    this.setState({ destinationName: event.target.value });
  }

  handleSelectImage(imageString) {
    this.setState({ destinationImage: imageString });
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

  render() {
    // use either a switch or a two conditional check if -1 for each component to render correctly
    const componentsArray = [<SelectDestinationImageProfile imageParam={this.state.destinationName} handleClick={this.handleSelectImage} country={this.state.destinationName} key={this.state.componentStage}/>,
      <h1 key={this.state.componentStage}>Add depature/arrival dates</h1>,
      <h1 key={this.state.componentStage}>Add description to destination </h1>,
      <h1 key={this.state.componentStage}>User Can confirm added destination</h1>];
    const progressBarComplete = 'progress-bar-complete';
    const progressBarIncomplete = 'progress-bar-incomplete';
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
        rightIcon = <i onClick={this.handleRightArrowClick} className="fas fa-arrow-right fa-2x"></i>;
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
        <div className="row mb-1">
          <div className={`col-3 ${(this.state.componentStage === -1) ? progressBarComplete : progressBarComplete}`}></div>
          <div className={`col-3 ${(this.state.componentStage === 0) ? progressBarComplete : progressBarIncomplete}`}></div>
          <div className={`col-3 ${(this.state.componentStage === 1) ? progressBarComplete : progressBarIncomplete}`}></div>
          <div className={`col-3 ${(this.state.componentStage === 2) ? progressBarComplete : progressBarIncomplete}`}></div>
        </div>
        <header className="row">
          <div className="col d-flex justify-content-between">
            {leftIcon}
            {rightIcon}
            {/* history prop will be used at the end of the multi-page form */}
          </div>
        </header>
        {(this.state.componentStage === -1 &&
          <div className="main-text-height row align-items-center justify-content-center">
            <div className="col">
              <div className="row">
                <div className="col">
                  <h4 className="text-center font-weight-bold">Add a destination</h4>
                  <h6 className="text-center">Enter the country of your destination</h6>
                </div>
              </div>
              <div className="col input-group justify-content-center">
                <Script url="https://maps.googleapis.com/maps/api/js?key=AIzaSyC9LE1lKj5Qhf161dfpRpA8mUQ17b-Oons&libraries=places&sessiontoken=1" onLoad={this.handleScriptLoad} />
                <input type="text" id="search" onChange={this.handleChange} onClick={this.handlePlaceSelect} className="form-control" placeholder="e.g. Japan" name="" />
              </div>
            </div>
          </div>) || componentsArray[this.state.componentStage]}
      </div>
    );

    // either do a switch method or continue with this if-else statement

  }
}
