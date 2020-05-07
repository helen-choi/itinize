import React from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import DestinationList from './destination-list';
import AddDestinationName from './add-destination-name';

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
        <Route path="/destinations/create" component={AddDestinationName}>
          {/* <AddDestinationName /> */}
          {/* if both, use a render method */}
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
