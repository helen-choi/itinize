import React from 'react';
import { Link } from 'react-router-dom';
import ListItineraryItem from './itinerary-item';

export default class ItineraryList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      itineraryItems: []
    };
  }

  componentDidMount() {
    this.getItineraryItems();
  }

  getItineraryItems() {
    fetch(`/api/itineraries/${this.props.location.state.destinationId}`)
      .then(res => res.json())
      .then(res => {
        this.setState({ itineraryItems: res });
      })
      .catch(err => console.error(err));
  }

  getSpecificDay() {
    fetch('/api/itineraries/:destinationId/:day');
  }

  render() {
    const bootstrapButtonClassNames = [
      'btn-outline-danger',
      'btn-outline-warning',
      'btn-outline-success',
      'btn-outline-dark',
      'btn-outline-primary',
      'btn-outline-secondary'
    ];
    const reactItineraryItems = this.state.itineraryItems.map(currentItem => {
      return (<ListItineraryItem key={currentItem.itineraryId} id={currentItem.itineraryId} itineraryName={currentItem.itineraryName}
        itineraryDay={currentItem.itineraryDay}
        itineraryNote={currentItem.itineraryNote}
      />);
    });
    const dayButtons = [];
    for (let dayCounter = 0; dayCounter < this.props.location.state.totalDays; dayCounter++) {

      dayButtons.push(
        <button type="button" className={`mr-1 btn btn-sm ${bootstrapButtonClassNames[dayCounter]}`}>Day {dayCounter + 1}</button>
      );
    }

    return (
      <div className="container">
        <div className="mt-2 row">
          <div className="col-6">
            <Link to={`/destinations/${this.props.location.state.destinationId}`}>
              <i className="far fa-times-circle fa-2x text-dark"></i>
            </Link>
          </div>
          <div className="col-6 d-flex justify-content-end">
            <i className="fas ml-2 fa-pen fa-2x text-dark"></i>
            <Link to={{
              pathname: '/itineraries/create',
              state: {
                destinationId: this.props.location.state.destinationId
              }
            }}>
              <i className="fas ml-2 fa-plus fa-2x text-dark"></i>
            </Link>
            <i className="far ml-2 fa-compass fa-2x text-dark"></i>
          </div>
        </div>
        <div className="mt-2 row">
          <div className="col">
            <h1>{this.props.location.state.destinationName}</h1>
          </div>
        </div>
        <div className="row justify-content-center">
          {/* todo: pass days via props to see how many tags to render */}
          <div className="scroll-menu col-9">
            <button type="button" className='mr-1 btn btn-sm btn-outline-info'>All</button>
            {/* buttons rendered */}
            {dayButtons}
          </div>
        </div>
        {/* list items below */}
        <div className="mt-2 row justify-content-center">
          {(this.state.itineraryItems.length === 0)
            ? <div className="mt-1 border border-secondary col-9">
              <h3>No Itinerary Items Added</h3>
            </div>
            : reactItineraryItems}

        </div>
      </div>
    );
  }
}
