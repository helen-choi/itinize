import React from 'react';
import { Link } from 'react-router-dom';
import ListItineraryItem from './itinerary-item';
import ItineraryMap from './view-itineraries-in map';

export default class ItineraryList extends React.Component {
  constructor(props) {
    super(props);
    this.handleCompassClick = this.handleCompassClick.bind(this);
    this.state = {
      itineraryItems: [],
      mapIconIsClick: false
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

  handleCompassClick() {
    this.setState({ mapIconIsClick: true });
  }

  render() {
    const reactItineraryItems = this.state.itineraryItems.map(currentItem => {
      return (<ListItineraryItem key={currentItem.itineraryId} id={currentItem.itineraryId} itineraryName={currentItem.itineraryName}
        itineraryDay={currentItem.itineraryDay}
        itineraryNote={currentItem.itineraryNote}
      />);
    });

    return (
      (this.state.itineraryItems.length === 0 && <div>Loading</div>) ||
      <div className="container">
        <div className="mt-2 row">
          {
            (
              this.state.mapIconIsClick &&
              <>
                <div className="col-6">
                  <div>
                    <i onClick={(() => this.setState({ mapIconIsClick: false }))} className="fas fa-arrow-left fa-2x"></i>
                  </div>
                </div>
                <div className="col-6 d-flex justify-content-end">
                  <Link to="/">
                    <i className="fas fa-bars fa-2x text-dark"></i>
                  </Link>
                </div>
              </>
            ) ||
            (
              <>
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
                      destinationId: this.props.location.state.destinationId,
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
        <div className="row">
          {/* todo: pass days via props to see how many tags to render */}
          <div className="col">
            <button type="button" className='mr-1 btn btn-sm btn-outline-primary'>All</button>
            <button type="button" className='mr-1 btn btn-sm btn-outline-secondary'>Day One</button>
            <button type="button" className='mr-1 btn btn-sm btn-outline-danger'>Day Two</button>
            <button type="button" className='mr-1 btn btn-sm btn-outline-success'>Day Three</button>
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
