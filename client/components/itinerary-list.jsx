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

  render() {
    const reactItineraryItems = this.state.itineraryItems.map(currentItem => {
      return (<ListItineraryItem key={currentItem.itineraryId} itineraryName={currentItem.itineraryName}
        itineraryDay={currentItem.itineraryDay}
        itineraryNote={currentItem.itineraryNote}
      />);
    });

    return (
      <div className="container">
        <div className="mt-2 row">
          <div className="col-6">
            <Link to={`/destinations/${this.props.location.state.destinationId}`}>
              <i className="far fa-times-circle fa-2x text-dark"></i>
            </Link>
          </div>
          <div className="col-6 d-flex justify-content-end">
            <i className="fas ml-2 fa-pen fa-2x text-black"></i>
            <i className="fas ml-2 fa-plus fa-2x text-black"></i>
            <i className="far ml-2 fa-compass fa-2x text-black"></i>
          </div>
        </div>
        <div className="mt-2 row">
          <div className="col">
            <h1>{this.props.location.state.destinationName}</h1>
          </div>
        </div>
        <div className="row">
          {/* pass days via props to see how many tags to render */}
          <div className="col">
            <button type="button" className='mr-1 btn btn-sm btn-outline-primary'>All</button>
            <button type="button" className='mr-1 btn btn-sm btn-outline-secondary'>Day One</button>
            <button type="button" className='mr-1 btn btn-sm btn-outline-danger'>Day Two</button>
            <button type="button" className='mr-1 btn btn-sm btn-outline-success'>Day Three</button>
          </div>
        </div>
        {/* list items below */}
        <div className="mt-2 row justify-content-center">
          {reactItineraryItems}

          <div className="mt-1 border border-secondary col-9">
            <h3>Tiger Sugar</h3>
            <p className="text-secondary">Day 2</p>
            <p className="text-secondary">I want to do thissssssss</p>
          </div>
          <div className="mt-1 border border-secondary col-9">
            <h3>Tiger Sugar</h3>
            <p className="text-secondary">Day 2</p>
            <p className="text-secondary">I want to do thissssssss</p>
          </div>
          <div className="mt-1 border border-secondary col-9">
            <h3>Tiger Sugar</h3>
            <p className="text-secondary">Day 2</p>
            <p className="text-secondary">I want to do thissssssss</p>
          </div>
          <div className="mt-1 border border-secondary col-9">
            <h3>Tiger Sugar</h3>
            <p className="text-secondary">Day 2</p>
            <p className="text-secondary">I want to do thissssssss</p>
          </div>
          <div className="mt-1 border border-secondary col-9">
            <h3>Tiger Sugar</h3>
            <p className="text-secondary">Day 2</p>
            <p className="text-secondary">I want to do thissssssss</p>
          </div>
          <div className="mt-1 border border-secondary col-9">
            <h3>Tiger Sugar</h3>
            <p className="text-secondary">Day 2</p>
            <p className="text-secondary">I want to do thissssssss</p>
          </div>
        </div>
      </div>
    );
  }
}
