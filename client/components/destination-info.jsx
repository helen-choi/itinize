import React from 'react';
import { Link } from 'react-router-dom';
import SelectDestinationImageProfile from './select-destination-image-profile';

export default class DestinationInfo extends React.Component {
  constructor(props) {
    super(props);
    this.handleBodyClick = this.handleBodyClick.bind(this);
    this.handleEditClick = this.handleEditClick.bind(this);
    this.handleUserInputOnChange = this.handleUserInputOnChange.bind(this);
    this.handleExitEditImage = this.handleExitEditImage.bind(this);
    this.handleEditImage = this.handleEditImage.bind(this);
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

  // add a componentDidUpdate to check when the picture info is changed
  // componentDidUpdate

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

  handleExitEditImage() {
    this.setState({ pictureIconIsClicked: false });
  }

  handleEditImage(changedSrc) {
    const data = { destinationImage: changedSrc };
    const init = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    };
    fetch(`/api/destinations/image/${this.state.destinationInfo.destinationId}`, init)
      .then(res => res.json())
      .then(res => {
        const copiedDestinationInfo = { ...this.state.destinationInfo };
        copiedDestinationInfo.destinationImage = changedSrc;
        this.setState({ destinationInfo: copiedDestinationInfo });
        setTimeout(() => {
          this.setState({ pictureIconIsClicked: false });
        }, 500);
      })
      .catch(err => console.error(err));
  }

  handleEditClick(e) {
    const editIcon = e.currentTarget.getAttribute('handler');
    this.setState(state => {
      state[editIcon] = true;
      return state[editIcon];
    });
  }

  handleUserInputOnChange(e) {
    const inputTag = e.currentTarget.getAttribute('handler');
    this.setState({ [inputTag]: e.currentTarget.value });
  }

  handleClickDelete(destinationId) {
    const fetchParams = { method: 'delete' };
    fetch(`/api/destinations/${destinationId}`, fetchParams)
      .then(res => this.props.history.push('/'))
      .catch(err => console.error(err));
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
    const destinationId = this.props.match.params.destinationId;
    const splitDateStart = this.state.tripStart.slice(0, 10).split('-');
    const splitDateEnd = this.state.tripEnd.slice(0, 10).split('-');
    const startMinutes = new Date(splitDateStart[0], splitDateStart[1], splitDateStart[2]).setMinutes(59);
    const endMinutes = new Date(splitDateEnd[0], splitDateEnd[1], splitDateEnd[2]).setMinutes(59);
    const totalDays = (endMinutes - startMinutes) / (1000 * 24 * 3600);

    if (this.state.destinationInfo) {
      this.tripStart = new Date(destinationInfo.tripStart).toDateString();
      this.tripEnd = new Date(destinationInfo.tripEnd).toDateString();
    }

    return (
      (
        !this.state.destinationInfo && <div className="loading-data">LOADING DATA</div>
      ) ||
      (
        this.state.pictureIconIsClicked && <SelectDestinationImageProfile handleExit={this.handleExitEditImage} handleCheck={this.handleEditImage} imageParam={this.state.destinationName}/>
      ) ||
      (
        <div className="DestinationInfo container d-flex flex-wrap"
          style={{ backgroundImage: `url(${destinationInfo.destinationImage})` }}>
          {
            (!this.state.editIconIsClicked &&
            <>
              <div className="overlay container"></div>
              <header className="row justify-content-between pt-2 flex-fill">
                <Link to="/" className="col-2 text-white">
                  <i className="fas fa-arrow-left fa-2x"></i>
                </Link>
                <div className="col-2">
                  <i
                    onClick={this.handleEditClick}
                    handler="editIconIsClicked"
                    className="fas fa-pen fa-2x text-white">
                  </i>
                </div>
              </header>

              <div className="form-element row">
                {destinationInfo.destinationName.length < 9
                  ? <input className="display-3 ml-4 col-12" readOnly value={destinationInfo.destinationName}/>
                  : <input className="display-4 ml-4 col-12" readOnly value={destinationInfo.destinationName}/>
                }
                <div className=" col-12 ml-4 d-flex">
                  <input readOnly value={this.tripStart}/>
                  <p className="my-auto"> - </p>
                  <input readOnly value={this.tripEnd}/>
                </div>
                <textarea
                  readOnly className="col-10 ml-4 align-self-end"
                  cols="40 shadow-p"
                  rows="10"
                  value={destinationInfo.description}>
                </textarea>
              </div>

              <footer className="row flex-fill">
                <div className="col-3">
                  <Link to={{
                    pathname: '/flights',
                    state: { destinationId: destinationInfo.destinationId, destinationName: destinationInfo.destinationName }
                  }} className="circle text-dark yellow m-auto d-flex justify-content-center align-items-center">
                    <i className="fas fa-plane fa-lg"></i>
                  </Link>
                </div>
                <div className="col-3">
                  <Link to={{
                    pathname: '/lodgings',
                    state: {
                      destinationId: this.props.match.params.destinationId,
                      destinationName: this.state.destinationName
                    }
                  }} className="col-2 flight-button">
                    <i className="fas fa-home fa-2x"></i>

                  </Link>
                </div>
                <div className="col-3">
                  {/* prepare to pass destinationName via the state property in the Link component! */}
                  <Link to={{
                    pathname: '/itineraries',
                    state: {
                      destinationId: destinationId,
                      destinationName: this.state.destinationInfo.destinationName,
                      totalDays,
                      tripStart: this.state.tripStart,
                      tripEnd: this.state.tripEnd
                    }
                  }} className="circle teal m-auto d-flex justify-content-center align-items-center">
                    <i className="fas fa-map-marker-alt fa-lg"></i>
                  </Link>
                </div>
                <div className="col-3">
                  <div className="circle red m-auto d-flex justify-content-center align-items-center">
                    <i onClick={() => this.handleClickDelete(destinationInfo.destinationId)} handler="delete" className="fas fa-trash-alt fa-lg"></i>
                  </div>
                </div>
              </footer>
            </>
            ) ||

            (this.state.editIconIsClicked &&
              <>
                <div onClick={this.handleBodyClick} handler="body" className="overlay-edit container"></div>
                <header className="row justify-content-between pt-2 flex-fill align-items-start">
                  <div className="col-3 text-dark">
                    <i className="fas fa-arrow-left fa-2x"></i>
                  </div>
                  <div className="col-4 d-flex justify-content-end">
                    <i onClick={this.handleEditClick} handler="pictureIconIsClicked" className="fas fa-image fa-2x text-white pr-3"></i>
                    <i className="fas fa-pen fa-2x text-dark"></i>
                  </div>
                </header>

                <div className="form-element row">
                  <input onChange={this.handleUserInputOnChange}
                    handler="destinationName"
                    className="display-3 ml-4 col-11"
                    value={this.state.destinationName} />
                  <div className=" col-12 ml-4 d-flex align-items-center">
                    <input
                      onChange={this.handleUserInputOnChange}
                      handler="tripStart"
                      type="date"
                      value={this.state.tripStart.slice(0, 10)} />
                    <p className="my-auto"> - </p>
                    <input
                      onChange={this.handleUserInputOnChange}
                      handler="tripEnd"
                      type="date"
                      value={this.state.tripEnd.slice(0, 10)} />
                  </div>
                  <textarea
                    onChange={this.handleUserInputOnChange}
                    handler="description"
                    className="col-10 ml-4 align-self-end"
                    cols="40 shadow-p"
                    rows="10"
                    value={this.state.description}></textarea>
                </div>

                <footer className="row flex-fill">
                  <div className="col-3 ">
                    <Link to="/flights/create" className="circle teal m-auto d-flex justify-content-center align-items-center">
                      <i className="fas fa-plane fa-lg"></i>
                    </Link>
                  </div>
                  <div className="col-3">
                    <Link to="/lodgings/create" className="circle dark-blue m-auto d-flex justify-content-center align-items-center">
                      <i className="fas fa-hotel fa-lg"></i>
                    </Link>
                  </div>
                  <div className="col-3">
                    <Link to={
                      {
                        pathname: '/itineraries/create',
                        state: { destinationId: destinationId }
                      }
                    } className="circle yellow m-auto d-flex justify-content-center align-items-center">
                      <i className="fas fa-map-marker-alt fa-lg"></i>
                    </Link>
                  </div>
                  <div className="col-3">
                    <div className="circle red m-auto d-flex justify-content-center align-items-center">
                      <i onClick={() => this.handleClickDelete(destinationInfo.destinationId)} handler="delete" className="fas fa-trash-alt fa-lg"></i>
                    </div>
                  </div>
                </footer>
              </>
            )
          }
        </div>
      )
    );
  }
}
