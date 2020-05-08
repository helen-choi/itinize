import React from 'react';
import DestinationItem from './destination-item';
import { Link } from 'react-router-dom';

export default class DestinationList extends React.Component {
  constructor(props) {
    super(props);
    this.handleClickDelete = this.handleClickDelete.bind(this);
    this.state = {
      destinations: null
    };
  }

  handleClickDelete(destinationId) {
    const newDestinations = [];
    const fetchParams = { method: 'delete' };
    fetch(`/api/destinations/${destinationId}`, fetchParams)
      .then(res => {
        this.state.destinations.map(destination => {
          if (destination.destinationId !== destinationId) {
            newDestinations.push(destination);
          }
        });
        this.setState({ destinations: newDestinations });
      })
      .catch(err => console.error(err));
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
      <div className="container Destination-List p-4">
        <header className="row pl-4">
          <div className="list-controls col-12">
            <Link to="destinations/create" className="d-flex justify-content-end">
              <img className="icon-add" src="./images/plus.png" alt="plus sign" />
            </Link>
          </div>
          <h1 className="row flex-column">My<br />Travels</h1>
        </header>
        <div className="row destinations-container">
          {this.state.destinations ? this.state.destinations.map(destination => {
            return (
              <div className="col-6" to="/destinations/:destinationId" key={destination.destinationId}>
                <DestinationItem handleClickDelete={this.handleClickDelete} destination={destination}/>
              </div>
            );

          }) : (<div className="loading-data"> LOADING DESTINATIONS</div>)}
        </div>
      </div>
    );
  }
}
