import React from 'react';
import { Link } from 'react-router-dom';
import DestinationList from './destination-list';

export default class DestinationInfo extends React.Component {
  constructor(props) {
    super(props);
    this.handleBodyClick = this.handleBodyClick.bind(this);
    this.handleEditClick = this.handleEditClick.bind(this);
    this.handlePictureClick = this.handlePictureClick.bind(this);
    this.handleNameOnChange = this.handleNameOnChange.bind(this);
    this.handleTripEndOnChange = this.handleTripEndOnChange.bind(this);
    this.handleTripStartOnChange = this.handleTripStartOnChange.bind(this);
    this.handleDescriptionOnChange = this.handleDescriptionOnChange.bind(this);
    this.state = {
      destinationInfo: null,
      destinationName: '',
      tripStart: '',
      tripEnd: '',
      description: '',
      editIconIsClicked: false,
      pictureIconIsClicked: false
    };
  }

  handleBodyClick() {
    this.setState({
      editIconIsClicked: false,
      pictureIconIsClicked: false
    });
    const data = {
      destinationName: this.state.destinationName,
      tripStart: this.state.tripStart,
      tripEnd: this.state.tripEnd,
      description: this.state.description
    };
    const fetchParameter = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    };
    fetch(`/api/destinations/${this.props.match.params.destinationId}`, fetchParameter)
      .then(res => res.json())
      .then(data => {
        this.setState({ destinationInfo: data });
      })
      .catch(err => console.error(err));
  }

  handleEditClick() {
    this.setState({ editIconIsClicked: true });
  }

  handlePictureClick() {
    this.setState({ pictureIconIsClicked: true });
  }

  handleNameOnChange(e) {
    this.setState({ destinationName: e.currentTarget.value });
  }

  handleTripStartOnChange(e) {
    this.setState({ tripStart: e.currentTarget.value });
  }

  handleTripEndOnChange(e) {
    this.setState({ tripEnd: e.currentTarget.value });

  }

  handleDescriptionOnChange(e) {
    this.setState({ description: e.currentTarget.value });
  }

  componentDidMount() {
    fetch(`/api/destinations/${this.props.match.params.destinationId}`)
      .then(res => res.json())
      .then(data => {
        this.setState({
          destinationInfo: data,
          destinationName: data.destinationName,
          tripStart: data.tripStart,
          tripEnd: data.tripEnd,
          description: data.description
        });
      })
      .catch(err => console.error(err));
  }

  render() {
    const destinationInfo = this.state.destinationInfo;
    if (this.state.destinationInfo) {
      this.tripStart = new Date(destinationInfo.tripStart).toDateString();
      this.tripEnd = new Date(destinationInfo.tripEnd).toDateString();
    }
    return (
      (!this.state.destinationInfo && <div className="loading-data">LOADING DATA</div>) ||
      (this.state.pictureIconIsClicked && <DestinationList/>) ||
      (<div className="DestinationInfo container"
        style={{ backgroundImage: `url(${destinationInfo.destinationImage})` }}>

        {(!this.state.editIconIsClicked &&
        <>
          <div className="overlay container"></div>
          <header className="row justify-content-between pt-2">
            <Link to="/" className="col-2 text-white">
              <i className="fas fa-arrow-left fa-2x"></i>
            </Link>
            <div className="col-2">
              <i onClick={this.handleEditClick} className="fas fa-pen fa-2x text-white"></i>
            </div>
          </header>

          <div className="form-element row">
            <input className="display-3 pt-5 ml-4 col-12" readOnly value={destinationInfo.destinationName}/>
            <div className=" col-12 ml-4 d-flex">
              <input readOnly value={this.tripStart}/>
              <p> - </p>
              <input readOnly value={this.tripEnd}/>
            </div>
            <textarea readOnly className="col-10 ml-4 align-self-end" cols="40 shadow-p" rows="10" value={destinationInfo.description}></textarea>

          </div>
          <footer>
            <Link to="/flights/create" className="col-2 flight-button">
              <i className="fas fa-plane fa-2x"></i>
            </Link>
          </footer>

        </>) ||

        (this.state.editIconIsClicked &&
          <>
            <div onClick={this.handleBodyClick} className="overlay-edit container"></div>
            <header className="row justify-content-between pt-2">
              <div className="text-dark">
                <i className="fas fa-arrow-left fa-2x"></i>
              </div>
              <div>
                <i onClick={this.handlePictureClick} className="fas fa-image fa-2x text-white mr-3"></i>
                <i className="fas fa-pen fa-2x text-dark"></i>
              </div>
            </header>

            <div className="form-element row">
              <input onChange={this.handleNameOnChange} className="display-3 pt-5 ml-4 col-11" value={this.state.destinationName} />
              <div className=" col-12 ml-4 d-flex">
                <input onChange={this.handleTripStartOnChange} type="date" value={this.state.tripStart.slice(0, 10)} />
                <p> - </p>
                <input onChange={this.handleTripEndOnChange} type="date" value={this.state.tripEnd.slice(0, 10)} />
              </div>
              <textarea onChange={this.handleDescriptionOnChange} className="col-10 ml-4 align-self-end" cols="40 shadow-p" rows="10" value={this.state.description}></textarea>
            </div>
          </>)}
      </div>

      )
    );
  }
}
