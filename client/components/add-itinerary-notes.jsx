import React from 'react';

export default class AddItineraryNotes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      locations: null,
      notes: 'Some stuff in locations'
    };
  }

  componentDidMount() {
    fetch('/api/locations', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        latitude: this.props.state.latitude, longitude: this.props.state.longitude, placeId: this.state.notes
      })
    })
      .then(res => res.json())
      .then(data => this.setState({ locations: data }));
  }

  render() {
    return <div>HELLO FROM LOCATIONS</div>;
  }
}
