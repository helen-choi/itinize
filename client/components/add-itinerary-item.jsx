import React from 'react';
import Confirmation from './confirmation';
import AddItineraryNote from './add-itinerary-notes';
import AddItineraryDates from './add-itinerary-day-tags';

export default class AddItineraryItem extends React.Component {
  constructor(props) {
    super(props);
    this.getInputs = this.getInputs.bind(this);
    this.googleMaps = this.googleMaps.bind(this);
    this.handleNextClick = this.handleNextClick.bind(this);
    this.handlePrevClick = this.handlePrevClick.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleScriptLoad = this.handleScriptLoad.bind(this);
    this.handlePlaceSelect = this.handlePlaceSelect.bind(this);
    this.handleCheckClick = this.handleCheckClick.bind(this);
    this.state = {
      componentStage: -1,
      itineraryName: '',
      place_id: '',
      latitude: '',
      longitude: '',
      itineraryDay: 'Day',
      itineraryNote: 'At this location, I will'
    };
  }

  googleMaps() {
    if (!document.getElementById('googleMaps')) {
      const script = document.createElement('script');
      script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyC9LE1lKj5Qhf161dfpRpA8mUQ17b-Oons&libraries=places';
      script.defer = true;
      script.async = true;
      script.id = 'googleMaps';
      document.querySelector('body').appendChild(script);
      script.addEventListener('load', this.handleScriptLoad);
    } else {
      this.handleScriptLoad();
    }
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
    if (this.state.place_id) {
      const newStage = this.state.componentStage + 1;
      this.setState({ componentStage: newStage });
    }
  }

  handlePrevClick() {
    const previousStage = this.state.componentStage - 1;
    this.setState({ componentStage: previousStage });
  }

  handleOnChange(e) {
    this.setState({ itineraryName: e.currentTarget.value });
  }

  handleCheckClick() {
    const state = this.state;
    const locationParam = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        latitude: state.latitude,
        longitude: state.longitude,
        placeId: state.place_id
      })
    };
    fetch('/api/locations', locationParam)
      .then(res => res.json())
      .then(data => {
        const itineraryParam = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            locationId: data[0].locationId,
            itineraryName: state.itineraryName,
            itineraryDay: state.itineraryDay,
            itineraryNote: state.itineraryNote,
            destinationId: this.props.location.state.destinationId
          })
        };
        fetch('/api/itineraries', itineraryParam)
          .then(res => res.json())
          .then(data => this.setState({ componentStage: 2 }));
      })
      .catch(err => console.error(err));
  }

  getInputs(inputVal) {
    const pageInput = this.state.componentStage;
    if (pageInput === 0) {
      this.setState({ itineraryDay: inputVal });
    } else if (pageInput === 1) {
      this.setState({ itineraryNote: inputVal });
    } else if (pageInput === 2) {
      this.setState({ itineraryNote: inputVal });
    }
  }

  componentDidMount() {
    this.googleMaps();
  }

  render() {
    let icons = null;
    const componentArray = [
      <AddItineraryDates
        key={this.state.componentStage}
        getInputs={this.getInputs}
        destinationId={this.props.location.state.destinationId}/>,
      <AddItineraryNote
        state={this.state}
        key={this.state.componentStage}
        getInputs={this.getInputs}/>,
      <Confirmation
        key={this.state.componentStage}
        newItem="Itinerary"
        history={this.props.history}
        match={this.props.match}/>
    ];

    let headerClassCompleted2 = 'not-completed';
    let headerClassCompleted3 = 'not-completed';
    if (this.state.componentStage === -1) {
      icons = (
        <>
          <i onClick={() => history.go(-1)}className="fas fa-times fa-2x"></i>
          <i className="fas fa-arrow-right fa-2x" onClick={this.handleNextClick}></i>
        </>);
    } else if (this.state.componentStage < 2) {
      headerClassCompleted2 = 'completed';
      if (this.state.componentStage === 1) headerClassCompleted3 = 'completed';

      icons = (
        <>
          <i className="fas fa-arrow-left fa-2x" onClick={this.handlePrevClick}></i>
          {this.state.componentStage === 1
            ? <i onClick={this.handleCheckClick}
              className="confirm-icon fas fa-check fa-2x"></i>
            : <i className="fas fa-arrow-right fa-2x"
              onClick={this.handleNextClick}></i>
          }
        </>
      );
    }

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
