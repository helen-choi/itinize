import React from 'react';
import { Link } from 'react-router-dom';
import LodgingItem from './lodging-item';

export default class LodgingList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lodgings: []
    };
  }

  componentDidMount() {
    this.getLodgingList();
  }

  getLodgingList() {
    const { destinationId } = this.props.location.state;
    fetch(`/api/lodgings/${destinationId}`)
      .then(res => res.json())
      .then(lodgingData => {
        this.setState({
          lodgings: lodgingData
        });
      })
      .catch(err => console.error(err));
  }

  render() {
    const { destinationName } = this.props.location.state;
    return (
      <div className="lodging-list-container p-3">
        <div className="edit-control text-right">
          <i className="fas fa-pen fa-2x"></i>
        </div>
        <div className="lodging-edit-modal"></div>
        <h1 className="text-center mt-5 mb-4">{destinationName}</h1>
        <div className="toggle row">
          <Link to={{
            pathname: '/flights',
            state: {
              destinationId: this.props.location.state.destinationId,
              destinationName: destinationName
            }
          }}>
            <div className="toggle-hidden"></div>
          </Link>
          <div className="toggle-icon toggle-flights teal row justify-content-center align-items-center">
            <i className="fas fa-plane text-white"></i>
          </div>

          <div className="toggle-icon toggle-lodgings red row justify-content-center align-items-center">
            <i className="fas fa-home text-white"></i>
          </div>
        </div>
        <div className="lodgings pl-3 pr-3 mt-4">
          {this.state.lodgings.map(lodging => {
            return <LodgingItem key={lodging.lodgingId} lodging={lodging} />;
          })}
        </div>
      </div>
    );
  }
}
