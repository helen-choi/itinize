import React from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import DestinationList from './destination-list';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: null,
      isLoading: true
    };
  }

  render() {
    return (
      <Router>
        <Route exact path="/">
          <DestinationList/>
        </Route>
        <Route path="/destinations/create">
          AddDestinationName component
        </Route>
        <Route path="/destinations/:DestinationId">
          DestinationInfo component
        </Route>
        <Route path="/flights">
          ViewFlights component
        </Route>
        <Route path="/flights/create">
          AddFlightName component
        </Route>
        <Route path="/lodgings">
          ViewLodgings component
        </Route>
        <Route path='/itineraries'>
          viewItineraries
        </Route>
        <Route path="/itineraries/create">
          AddItinerariesName
        </Route>
      </Router>
    );
  }
}
