import React from 'react';
import { Link } from 'react-router-dom';
import SelectDestinationImageProfile from './select-destination-image-profile';
import DeleteModal from './delete-modal';

export default class DestinationInfo extends React.Component {
  constructor(props) {
    super(props);
    this.handleBodyClick = this.handleBodyClick.bind(this);
    this.handleEditClick = this.handleEditClick.bind(this);
    this.handleUserInputOnChange = this.handleUserInputOnChange.bind(this);
    this.handleExitEditImage = this.handleExitEditImage.bind(this);
    this.handleEditImage = this.handleEditImage.bind(this);
    this.handleClickDelete = this.handleClickDelete.bind(this);
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
    if (this.props.location.state && this.props.location.state.editMode) {
      this.setState({ editIconIsClicked: true });
    }
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
      this.tripStart = new Date(this.state.tripStart.replace(/-/g, '/').slice(0, 10)).toDateString();
      this.tripEnd = new Date(this.state.tripEnd.replace(/-/g, '/').slice(0, 10)).toDateString();
      const today = new Date();
      const todayMonth = today.getMonth() + 1;
      const todayDay = today.getDate();
      this.today = `${today.getFullYear()}-${todayMonth < 10 ? '0' + todayMonth : todayMonth}-${todayDay < 10 ? '0' + todayDay : todayDay}`;
    }

    return (
      (
        !this.state.destinationInfo && <div className="loading-data d-flex justify-content-center flex-wrap"><img src="https://media.giphy.com/media/UOdoMz3baCENO/giphy.gif" alt="Loading..." /><p className="text-muted">Loading...</p></div>
      ) ||
      (
        this.state.pictureIconIsClicked && <SelectDestinationImageProfile handleExit={this.handleExitEditImage} handleCheck={this.handleEditImage} imageParam={this.state.destinationName} />
      ) ||
      (
        <div className="DestinationInfo d-flex flex-wrap"
          style={{ backgroundImage: `url(${destinationInfo.destinationImage})` }}>
          {
            (!this.state.editIconIsClicked &&
              <>
                <div className="overlay overlay-destination-info"></div>
                <header className="d-flex justify-content-between p-3 w-100">
                  <Link to="/">
                    <i className="fas fa-arrow-left fa-2x text-white"></i>
                  </Link>
                  <div >
                    <i
                      onClick={this.handleEditClick}
                      handler="editIconIsClicked"
                      className="fas fa-pen fa-2x text-white">
                    </i>
                  </div>
                </header>

                <div className="form-element row ml-auto mr-auto">
                  {destinationInfo.destinationName.length < 9
                    ? <input className="edit-input display-3 ml-4 col-11" readOnly value={destinationInfo.destinationName} />
                    : <input className="edit-input h1 ml-4 col-11" readOnly value={destinationInfo.destinationName} />
                  }
                  <div className=" col-12 ml-4 d-flex text-light">
                    {this.tripStart} - {this.tripEnd}
                  </div>
                  <textarea
                    readOnly className="edit-input col-10 ml-4 align-self-end"
                    cols="40 shadow-p"
                    rows="10"
                    value={destinationInfo.description}>
                  </textarea>
                </div>

                <footer className="d-flex justify-content-between p-3 ml-auto mr-auto">
                  <div>
                    <Link to={{
                      pathname: '/flights',
                      state: { destinationId: destinationInfo.destinationId, destinationName: destinationInfo.destinationName }
                    }} className="circle text-light yellow m-auto d-flex justify-content-center align-items-center">
                      <i className="fas fa-plane fa-lg"></i>
                    </Link>
                  </div>
                  <div >
                    <Link to={{
                      pathname: '/lodgings',
                      state: {
                        destinationId: this.props.match.params.destinationId,
                        destinationName: this.state.destinationName
                      }
                    }} className="circle text-light dark-blue m-auto d-flex justify-content-center align-items-center">
                      <i className="fas fa-home fa-lg"></i>

                    </Link>
                  </div>
                  <div >
                    <Link to={{
                      pathname: '/itineraries',
                      state: {
                        destinationId: destinationId,
                        destinationName: this.state.destinationInfo.destinationName,
                        totalDays,
                        tripStart: this.state.tripStart,
                        tripEnd: this.state.tripEnd
                      }
                    }} className="circle text-light teal m-auto d-flex justify-content-center align-items-center">
                      <i className="fas fa-map-marker-alt fa-lg"></i>
                    </Link>
                  </div>
                  <div >
                    <DeleteModal destinationInfo id={destinationId} deleteHandle={this.handleClickDelete} />
                  </div>
                </footer>
              </>
            ) ||

            (this.state.editIconIsClicked &&
              <>
                <div onClick={this.handleBodyClick} handler="body" className="overlay-edit"></div>
                <header className="d-flex justify-content-between p-3 w-100">
                  <div>
                    <i className="fas fa-arrow-left fa-2x text-dark"></i>
                  </div>
                  <div className="d-flex justify-content-end">
                    <i onClick={this.handleEditClick} handler="pictureIconIsClicked" className="fas fa-image fa-2x text-white pr-3"></i>
                    <i className="fas fa-pen fa-2x text-dark"></i>
                  </div>
                </header>

                <div className="form-element row ml-auto mr-auto">
                  {destinationInfo.destinationName.length < 9
                    ? <input onChange={this.handleUserInputOnChange} handler="destinationName" className="edit-input display-3 ml-4 col-11" value={this.state.destinationName} />
                    : <input onChange={this.handleUserInputOnChange} handler="destinationName" className="edit-input display-4 ml-4 col-11" value={this.state.destinationName} />
                  }
                  <div className=" col-12 ml-4 d-flex">
                    <input onChange={this.handleUserInputOnChange} type="date" handler="tripStart" min={this.today} max={this.state.tripEnd.slice(0, 10)} className="edit-input date-input" value={this.state.tripStart.slice(0, 10)} />
                    <p className="my-auto text-center">  -  </p>
                    <input onChange={this.handleUserInputOnChange} type="date" handler="tripEnd" min={this.state.tripStart} className="edit-input date-input" value={this.state.tripEnd.slice(0, 10)} />
                  </div>
                  <textarea
                    onChange={this.handleUserInputOnChange}
                    className="edit-input col-10 ml-4 align-self-end"
                    handler="description"
                    cols="40 shadow-p"
                    rows="10"
                    value={this.state.description}>
                  </textarea>
                </div>

                <footer className="d-flex justify-content-between p-3 ml-auto mr-auto">
                  <div>
                    <Link to={{
                      pathname: '/flights',
                      state: { destinationId: destinationInfo.destinationId, destinationName: destinationInfo.destinationName }
                    }} className="circle text-light yellow m-auto d-flex justify-content-center align-items-center">
                      <i className="fas fa-plane fa-lg  text-light"></i>
                    </Link>
                  </div>
                  <div>
                    <Link to={{
                      pathname: '/lodgings',
                      state: {
                        destinationId: this.props.match.params.destinationId,
                        destinationName: this.state.destinationName
                      }
                    }} className="circle dark-blue m-auto d-flex justify-content-center align-items-center">
                      <i className="fas fa-home fa-lg  text-light"></i>

                    </Link>
                  </div>
                  <div>
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
                      <i className="fas fa-map-marker-alt fa-lg text-light"></i>
                    </Link>
                  </div>
                  <div>
                    <div className="circle red m-auto d-flex justify-content-center align-items-center">
                      <i onClick={() => this.handleClickDelete(destinationInfo.destinationId)} handler="delete" className="fas fa-trash-alt fa-lg text-light"></i>
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
