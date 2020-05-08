import React from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import DestinationList from './destination-list';
import DestinationInfo from './destination-info';
import AddLodgingName from './add-lodging-name';

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
        <Route path="/destinations/:destinationId" component={DestinationInfo}>
        </Route>
        <Route path="/flights">
          ViewFlights component
        </Route>
        <Route path="/flights/create">
          AddFlightName component
        </Route>
        <Route path="/lodgings">
        </Route>
        <Route path="/lodgings/create" component={AddLodgingName} />
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
