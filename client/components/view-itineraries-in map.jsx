import React from 'react';
import Script from 'react-load-script';

export default class ItineraryMap extends React.Component {
  constructor(props) {
    super(props);
    this.googleMapRef = React.createRef();
    this.handleLoad = this.handleLoad.bind(this);
  }

  handleLoad() {
    // eslint-disable-next-line no-undef
    const googleMap = new google.maps.Map(this.googleMapRef.current, {
      center: { lat: 33.98, lng: -117.90458 },
      zoom: 13
    });

    const itineraries = this.props.itineraries;
    for (let i = 0; i < itineraries.length; i++) {
      const label = !itineraries[i].itineraryDay[4] ? 'D' : itineraries.itineraryDay[4];
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

  render() {
    return (
      <>
        <div
          ref={this.googleMapRef}
          id="map"
          style={{ width: '100%', height: '300px' }}
        />
        <Script onLoad={this.handleLoad} url="https://maps.googleapis.com/maps/api/js?key=AIzaSyC9LE1lKj5Qhf161dfpRpA8mUQ17b-Oons&libraries=places"/>
      </>
    );
  }
}
