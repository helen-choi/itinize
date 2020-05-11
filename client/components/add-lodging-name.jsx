import React from 'react';
import { Link } from 'react-router-dom';
import Script from 'react-load-script';
import AddLodgingConfNumber from './add-lodging-conf-number';
import AddLodgingDates from './add-lodging-dates';
import Confirmation from './confirmation';

export default class AddLodgingName extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: -1,
      lodgingName: '',
      lodgingNumber: '',
      checkInDateTime: '',
      checkOutDateTime: '',
      placeId: '',
      latitude: '',
      longitude: '',
      locationId: '',
      isSubmitted: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleNextClick = this.handleNextClick.bind(this);
    this.handlePrevClick = this.handlePrevClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCombine = this.handleCombine.bind(this);
    this.handleScriptLoad = this.handleScriptLoad.bind(this);
    this.handlePlaceSelect = this.handlePlaceSelect.bind(this);
  }

  handleChange() {
    this.setState({
      [event.target.name]: event.target.value
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
    const { destinationId } = this.props.location.state;
    const data = {
      lodgingName: this.state.lodgingName,
      lodgingConfNum: this.state.lodgingNumber,
      checkInDateTime: this.state.checkInDateTime,
      checkOutDateTime: this.state.checkOutDateTime,
      locationId: this.state.locationId,
      destinationId: parseInt(destinationId)
    };
    const params = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    };

    this.setState({
      isSubmitted: true
    });

    fetch('/api/lodgings', params)
      .then(res => res.json())
      .catch(err => console.error(err));
  }

  handleCombine(checkInDateTime, checkOutDateTime) {
    this.setState({
      checkInDateTime: checkInDateTime,
      checkOutDateTime: checkOutDateTime
    });
  }

  handleScriptLoad() {
    const options = { types: ['establishment'] };

    // eslint-disable-next-line no-undef
    this.autocomplete = new google.maps.places.Autocomplete(
      document.getElementById('lodgingName'), options);
    this.autocomplete.setFields(['address_components',
      'formatted_address', 'name', 'place_id', 'geometry']);
    this.autocomplete.addListener('place_changed', this.handlePlaceSelect);
  }

  handlePlaceSelect() {
    const addressObject = this.autocomplete.getPlace();

    if (addressObject) {
      const name = addressObject.name;
      const placeId = addressObject.place_id;
      const geoLat = addressObject.geometry.location.lat();
      const geoLng = addressObject.geometry.location.lng();

      this.setState({
        placeId: placeId,
        lodgingName: name,
        latitude: geoLat,
        longitude: geoLng
      });
    }
    this.getLocationId();
  }

  getLocationId() {
    const { placeId, latitude, longitude } = this.state;
    const data = {
      placeId: placeId,
      latitude: latitude,
      longitude: longitude
    };
    const params = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    };
    fetch('/api/locations', params)
      .then(res => res.json())
      .then(data => {
        const locationId = data[0].locationId;
        this.setState({
          locationId: locationId
        });
      })
      .catch(err => console.error(err));
  }

  render() {
    const { counter } = this.state;
    let stage = counter + 2;
    const pageArr = [

      <AddLodgingConfNumber key={this.state.counter} value={this.state.lodgingNumber} handleChange={this.handleChange} />,
      <AddLodgingDates key={this.state.counter} onComplete={this.handleCombine}/>

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
    }

    return (
      (this.state.isSubmitted && <Confirmation newItem="lodge" history={this.props.history} match={this.props.match}/>) ||
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
            <Script url="https://maps.googleapis.com/maps/api/js?key=AIzaSyC9LE1lKj5Qhf161dfpRpA8mUQ17b-Oons&libraries=places&sessiontoken=1"
              onLoad={this.handleScriptLoad}
            />
            <h3 className="text-center pt-5">Add Lodging Name</h3>
            <p className="text-muted text-center">Enter name of your lodge</p>
            <div className="input-container row justify-content-center mt-5">
              <input className="text-center p-2" id="lodgingName" type="text" name="lodgingName" placeholder="Lodge Name" value={this.state.lodgingName} onChange={this.handleChange} />
            </div>
          </div>
          ) || pageArr[counter]}
        </div>

    );
  }
}
