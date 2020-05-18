import React from 'react';
import { Link } from 'react-router-dom';
import LodgingItem from './lodging-item';

export default class LodgingList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lodgings: [],
      editModeOn: false
    };
    this.handleEditClick = this.handleEditClick.bind(this);
    this.handleExitClick = this.handleExitClick.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
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

  handleEditClick() {
    this.setState({
      editModeOn: true
    });
  }

  handleExitClick() {
    this.setState({
      editModeOn: false
    });
  }

  handleDelete(lodgingId) {
    const params = {
      method: 'DELETE'
    };
    fetch(`/api/lodgings/${lodgingId}`, params)
      .then(res => {
        res.text();
        this.getLodgingList();
      })
      .catch(err => console.error(err));
  }

  render() {
    const modalStyle = this.state.editModeOn ? { display: 'block' } : { display: 'none' };
    const extraMargin = this.state.lodgings[0] ? { marginTop: '25px' } : { marginTop: '60px' };
    const { destinationName } = this.props.location.state;
    const { destinationId } = this.props.location.state;
    return (
      <div className="lodging-list-container p-3">
        <div className="edit-control d-flex justify-content-between">
          <Link to={{
            pathname: `/destinations/${destinationId}`,
            state: {
              destinationId: destinationId,
              destinationName: destinationName
            }
          }}>
            <i className="fas fa-times fa-2x text-dark"></i>
          </Link>
        </div>
        <div className="lodging-edit-modal" style={modalStyle} onClick={this.handleExitClick}></div>
        <h1 className="text-center mt-4 mb-4">{destinationName}</h1>
        <div className="toggle row">
          <div className="toggle-container">
            <Link to={{
              pathname: '/flights',
              state: {
                destinationId: destinationId,
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
        </div>
        <div className="lodgings pl-3 pr-3">
          {this.state.lodgings.map(lodging => {
            return <LodgingItem key={lodging.lodgingId} lodgingId={lodging.lodgingId} lodging={lodging} editModeOn={this.state.editModeOn} handleDelete={this.handleDelete}/>;
          })}
        </div>
        <div className="pl-3 pr-3" style={extraMargin}>
          <div className="gray-box p-4 d-flex justify-content-center">
            <Link to={{
              pathname: '/lodgings/create',
              state: {
                destinationId: destinationId,
                destinationName: destinationName
              }
            }}>
              <div className="add-lodging-item d-flex justify-content-center align-items-center">
                <i className="fas fa-plus fa-2x"></i>
              </div>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
