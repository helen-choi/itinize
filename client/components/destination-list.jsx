import React from 'react';
import DestinationItem from './destination-item';
import { Link } from 'react-router-dom';

export default class DestinationList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      destinations: null
    };
  }

  componentDidMount() {
    fetch('/api/destinations')
      .then(res => res.json())
      .then(data => {
        this.setState({ destinations: data });
      })
      .catch(err => console.error(err));
  }

  render() {
    return (
      <>
        <h1>My Travels</h1>
        {this.state.destinations ? this.state.destinations.map(destination => {
          return (
            <Link to="/destinations/:destinationId" key={destination.destinationId}>
              <DestinationItem destination={destination}/>;
            </Link>
          );
        }) : (<div> NO DESTINATIONS CURRENTLY AVAILABLE</div>)}
      </>
    );
  }
}
