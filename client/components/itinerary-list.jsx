import React from 'react';
import { Link } from 'react-router-dom';
import ListItineraryItem from './itinerary-item';
import ItineraryMap from './view-itineraries-in map';

export default class ItineraryList extends React.Component {
  constructor(props) {
    super(props);
    this.handleCompassClick = this.handleCompassClick.bind(this);
    this.handleEditClick = this.handleEditClick.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.state = {
      itineraryItems: [],
      mapIconIsClick: false,
      editIsClick: false
    };
    this.getSpecificDay = this.getSpecificDay.bind(this);
    this.getItineraryItems = this.getItineraryItems.bind(this);
  }

  componentDidMount() {
    this.getItineraryItems();
  }

  getItineraryItems() {
    fetch(`/api/itineraries/${this.props.location.state.destinationId}`)
      .then(res => res.json())
      .then(data => {
        this.setState({ itineraryItems: data });
      })
      .catch(err => console.error(err));
  }

  getSpecificDay(destinationDay) {
    const init = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    };
    fetch(`/api/itineraries/${this.props.location.state.destinationId}/${destinationDay}`, init)
      .then(res => res.json())
      .then(data => {
        this.setState({ itineraryItems: data });
      });
  }

  handleCompassClick() {
    this.setState({ mapIconIsClick: true });
  }

  handleDelete(itineraryId) {
    fetch(`/api/itineraries/${itineraryId}`, { method: 'delete' })
      .then(res => {
        if (res.status === 200) {
          const newItineraries = this.state.itineraryItems.filter(item => item.itineraryId !== itineraryId);
          this.setState({ itineraryItems: newItineraries });
        }
      })
      .catch(err => console.error(err));
  }

  handleEditClick() {
    if (!this.state.editIsClick) {
      this.setState({ editIsClick: true });
    } else {
      this.setState({ editIsClick: false }, this.getItineraryItems());
    }
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
      return (<ListItineraryItem key={currentItem.itineraryId} id={currentItem.itineraryId} editClick={this.state.editIsClick} itineraryName={currentItem.itineraryName}
        itineraryDay={currentItem.itineraryDay}
        totalDays={this.props.location.state.totalDays}
        itineraryNote={currentItem.itineraryNote}
        locationId={currentItem.locationId}
        handleDelete={this.handleDelete}
      />);
    });
    const dayButtons = [];
    for (let dayCounter = 0; dayCounter < this.props.location.state.totalDays; dayCounter++) {
      dayButtons.push(
        <button onClick={() => this.getSpecificDay(`Day ${dayCounter + 1}`)} key={dayCounter + 1} type="button" className={`mr-1 btn btn-sm ${bootstrapButtonClassNames[dayCounter]}`}>Day {dayCounter + 1}</button>
      );
    }
    return (
      <div className="container">
        {this.state.editIsClick ? <div onClick={this.handleEditClick} className="overlay-edit"></div> : null}
        <div className="mt-2 row">
          {
            (
              this.state.mapIconIsClick &&
              <>
                <div className="col-6">
                  <Link to={`/destinations/${this.props.location.state.destinationId}`}>
                    <i className="fas fa-times fa-2x text-dark"></i>
                  </Link>
                </div>
                <div className="col-6 d-flex justify-content-end">
                  <div>
                    <i onClick={(() => this.setState({ mapIconIsClick: false }))} className="fas fa-list fa-2x text-dark"></i>
                  </div>
                </div>
              </>
            ) ||
            (
              <>
                <div className="col-6">
                  <Link to={`/destinations/${this.props.location.state.destinationId}`}>
                    <i className="fas fa-times fa-2x fa-2x text-dark"></i>
                  </Link>
                </div>
                <div className="col-6 d-flex justify-content-end">
                  <i onClick={this.handleEditClick} className="fas ml-2 fa-pen fa-2x text-dark"></i>
                  <Link to={{
                    pathname: '/itineraries/create',
                    state: {
                      destinationId: this.props.location.state.destinationId
                    }
                  }}>
                    <i className="fas ml-2 fa-plus fa-2x text-dark"></i>
                  </Link>
                  <i onClick={this.handleCompassClick} className="far ml-2 fa-compass fa-2x text-dark"></i>
                </div>
              </>
            )
          }
        </div>
        <div className="mt-2 row">
          <div className="col">
            <h1>{this.props.location.state.destinationName}</h1>
          </div>
        </div>
        <div className="row justify-content-center">
          {/* todo: pass days via props to see how many tags to render */}
          <div className="scroll-menu col-9">
            <button onClick={this.getItineraryItems} type="button" className='mr-1 btn btn-sm btn-outline-info'>All</button>
            {/* buttons rendered */}
            {dayButtons}
          </div>
        </div>
        {/* map or list items below */}
        {
          (
            this.state.mapIconIsClick &&
            <div className="mt-5">
              <ItineraryMap destinationId={this.props.location.state.destinationId} itineraries={this.state.itineraryItems}></ItineraryMap>
            </div>
          ) ||
          (
            <div className="mt-2 row justify-content-center">
              {(this.state.itineraryItems.length === 0)
                ? <div className="mt-1 border border-secondary col-9">
                  <h3>No Itinerary Items Added</h3>
                </div>
                : reactItineraryItems}
            </div>
          )
        }
      </div>
    );
  }
}
