import React from 'react';
import { Link } from 'react-router-dom';
import Script from 'react-load-script';
import Confirmation from './confirmation';
import AddItineraryNote from './add-itinerary-notes';

export default class AddItineraryItem extends React.Component {
  constructor(props) {
    super(props);
    this.handleNextClick = this.handleNextClick.bind(this);
    this.handlePrevClick = this.handlePrevClick.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleScriptLoad = this.handleScriptLoad.bind(this);
    this.handlePlaceSelect = this.handlePlaceSelect.bind(this);
    this.state = {
      componentStage: -1,
      itineraryName: '',
      place_id: '',
      latitude: '',
      longitude: ''
    };
  }

  handleScriptLoad() {
    // eslint-disable-next-line no-undef
    this.autocomplete = new google.maps.places.Autocomplete(
      document.getElementById('search'));
    this.autocomplete.setFields(['address_components', 'formatted_address', 'place_id', 'name', 'geometry']);
    this.autocomplete.addListener('place_changed', this.handlePlaceSelect);
  }

  handlePlaceSelect() {
    const addressObj = this.autocomplete.getPlace();
    if (addressObj) {
      const geo = { lat: addressObj.geometry.location.lat(), lng: addressObj.geometry.location.lng() };
      const placeId = addressObj.place_id;
      this.setState({
        itineraryName: addressObj.name,
        place_id: placeId,
        latitude: geo.lat,
        longitude: geo.lng
      });
    }
  }

  handleNextClick() {
    const newStage = this.state.componentStage + 1;
    this.setState({ componentStage: newStage });
  }

  handlePrevClick() {
    const previousStage = this.state.componentStage - 1;
    this.setState({ componentStage: previousStage });
  }

  handleOnChange(e) {
    this.setState({ itineraryName: e.currentTarget.value });
  }

  render() {
    let icons = null;
    const componentArray = ['AddItineraryDates', <AddItineraryNote state={this.state} key={this.state.componentStage}/>,
      <Confirmation key={this.state.componentStage} newItem="Itinerary"
        history={this.props.history} match={this.props.match}/>];
    let headerClassCompleted2 = 'not-completed';
    let headerClassCompleted3 = 'not-completed';
    if (this.state.componentStage === -1) {
      icons = (
        <>
          <Link to="/">
            <i className="fas fa-times fa-2x"></i>
          </Link>
          <i className="fas fa-arrow-right fa-2x" onClick={this.handleNextClick}></i>
        </>);
    } else if (this.state.componentStage < 2) {
      headerClassCompleted2 = 'completed';
      if (this.state.componentStage === 1) headerClassCompleted3 = 'completed';
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
          <div className={`col-4 mr-2 ${headerClassCompleted2}`}></div>
          <div className={`col-4 ${headerClassCompleted3}`}></div>
        </header>

        <div className="form-controls d-flex justify-content-between p-3">
          {icons}
        </div>
        {
          (this.state.componentStage === -1 &&
            <div className="add-lodging-name-container">
              <h3 className="text-center pt-5">Add your itinerary</h3>
              <p className="text-muted text-center"> Enter Address or name of place</p>
              <div className="input-container row justify-content-center mt-5">
                <Script url={'https://maps.googleapis.com/maps/api/js?key=AIzaSyC9LE1lKj5Qhf161dfpRpA8mUQ17b-Oons&libraries=places'}
                  onLoad={this.handleScriptLoad} />

                <input value={this.state.itineraryName} id="search" className="text-center p-2"
                  placeholder="Itinerary Name" onChange={this.handleOnChange} onClick={this.handlePlaceSelect}/>
              </div>
            </div>
          ) ||
          (
            this.state.componentStage <= 2 && componentArray[this.state.componentStage]
          )
        }
      </div>

    );
  }
}
