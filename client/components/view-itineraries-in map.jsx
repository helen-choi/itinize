import React from 'react';

export default class ItineraryMap extends React.Component {
  constructor(props) {
    super(props);
    this.googleMapRef = React.createRef();
    this.googleMaps = this.googleMaps.bind(this);
    this.handleLoad = this.handleLoad.bind(this);
    this.state = {
      itineraries: props.itineraries,
      lat: null,
      lng: null
    };
  }

  googleMaps() {
    const script = document.createElement('script');
    script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyC9LE1lKj5Qhf161dfpRpA8mUQ17b-Oons&libraries=places';
    script.defer = true;
    script.async = true;
    document.querySelector('body').appendChild(script);
    script.addEventListener('load', this.handleLoad);
  }

  handleLoad() {
    // eslint-disable-next-line no-undef
    const googleMap = new google.maps.Map(this.googleMapRef.current, {
      center: { lat: this.state.lat, lng: this.state.lng },
      zoom: 5
    });

    const itineraries = this.state.itineraries;
    for (let i = 0; i < itineraries.length; i++) {
      const label = !itineraries[i].itineraryDay[4] ? 'D' : itineraries[i].itineraryDay[4];
      // eslint-disable-next-line no-undef
      const marker = new google.maps.Marker({
        position: { lat: itineraries[i].coordinates.x, lng: itineraries[i].coordinates.y },
        label: label,
        map: googleMap,
        title: itineraries[i].itineraryName
      });
      const contentString = `
      <div id="content">
        <div id="siteNotice"></div>
        <h4 id="firstHeading" class="firstHeading">${itineraries[i].itineraryName}</h4>
        <div id="bodyContent">
          <p>You are planning to go on this trip on ${itineraries[i].itineraryDay}</p>
          <p>Here are your notes: <br> ${itineraries[i].itineraryNote}</p>
        </div>
      </div>
      `;
      // eslint-disable-next-line no-undef
      const infowindow = new google.maps.InfoWindow({
        content: contentString
      });
      marker.addListener('click', function () {
        infowindow.open(googleMap, marker);
      });
    }
  }

  componentDidMount() {
    fetch(`/api/locations/${this.props.destinationId}`)
      .then(res => res.json())
      .then(data => this.setState({ lat: data[0].coordinates.x, lng: data[0].coordinates.y }, this.googleMaps))
      .catch(err => console.error(err));
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.itineraries === this.props.itineraries) {
      return null;
    } else {
      this.setState({ itineraries: this.props.itineraries }, this.handleLoad);
    }
  }

  render() {
    return (
      <>
        <div
          ref={this.googleMapRef}
          id="map"
          style={{ width: '100%', height: '300px' }}
        />
      </>
    );
  }
}
