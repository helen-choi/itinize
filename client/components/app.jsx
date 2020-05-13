import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
// import DestinationList from './destination-list';
import AddDestinationName from './add-destination-name';
import DestinationInfo from './destination-info';
import AddLodgingName from './add-lodging-name';
import AddFlightName from './flight-name';
import AddItineraryItem from './add-itinerary-item';
import TripInfo from './flight-trip-info';
import LodgingList from './lodging-list';
import ItineraryList from './itinerary-list';
import Welcome from './welcome';

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
        <Switch>
          <Route exact path="/">
            <Welcome/>
          </Route>
          <Route path="/destinations/create" component={AddDestinationName}>
            {/* <AddDestinationName /> */}
            {/* if you want props and render method both, use a render method */}
          </Route>

          <Route path="/destinations/:destinationId" component={DestinationInfo}/>

          <Route exact path="/flights" component={TripInfo}>
            {/* ViewFlights component */}
          </Route>

          <Route path="/flights/create" component={AddFlightName} />

          <Route exact path="/lodgings" component={LodgingList}>
          </Route>
          <Route path="/lodgings/create" component={AddLodgingName} />
          <Route exact path='/itineraries' component={ItineraryList}>
          </Route>
          <Route path="/itineraries/create" component={AddItineraryItem}>
            {/* AddItinerariesName */}
          </Route>
        </Switch>
      </Router>
    );
  }
}
