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
          <div className="list-controls col-12 d-flex justify-content-end">
            <Link to="destinations/create">
              <i className="fas fa-plus icon-add fa-2x text-dark"></i>
            </Link>
          </div>
          <div className="col-12">
            <h1 className="text-center destinationTitle">My Travels</h1>
          </div>
        </header>
        <div className="row destinations-container justify-content-between">
          {this.state.destinations ? this.state.destinations.map(destination => {
            return (
              <div className="col-6" key={destination.destinationId}>
                <DestinationItem handleClickDelete={this.handleClickDelete} destination={destination}/>
              </div>
            );

          }) : (<div className="loading-data d-flex justify-content-center align-items-start flex-wrap"><img src="https://media.giphy.com/media/UOdoMz3baCENO/giphy.gif" alt="Loading..." /><p className="text-muted">Loading...</p></div>)}
        </div>
      </div>
    );
  }
}
