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
      <div className="container Destination-List">
        <header className="row">
          <Link to="destination/create" className="d-flex justify-content-end">
            <img className="col-2" src="./images/plus.png" alt="plus sign"/>
          </Link>
        </header>
        <h1 className="row flex-column">
          <span>My</span>
          <span>Travels</span>
        </h1>
        <div className="row">
          {this.state.destinations ? this.state.destinations.map(destination => {
            return (
              <div className="col-6" to="/destinations/:destinationId" key={destination.destinationId}>
                <DestinationItem destination={destination}/>
              </div>
            );
          }) : (<div className="loading-data"> LOADING DESTINATIONS)</div>)}
        </div>
      </div>
    );
  }
}
