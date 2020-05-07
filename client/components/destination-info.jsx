import React from 'react';
import { Link } from 'react-router-dom';

export default class DestinationInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      destinationInfo: null
    };
  }

  componentDidMount() {
    fetch(`/api/destinations/${this.props.match.params.destinationId}`)
      .then(res => res.json())
      .then(data => {
        this.setState({ destinationInfo: data });
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

        <div className="DestinationInfo container"
          style={{ backgroundImage: `url(${destinationInfo.destinationImage})` }}>
          <div className="overlay container"></div>

          <header className="row justify-content-between pt-2">
            <Link to="/" className="col-2">
              <i className="fas fa-arrow-left fa-2x"></i>
            </Link>
            <div className="col-2">
              <i className="fas fa-pen fa-2x"></i>
            </div>
          </header>

          <form className="row">
            <input className="display-3 pt-5 ml-4 col-12" readOnly value={destinationInfo.destinationName}/>
            <div className=" col-12 ml-4 d-flex">
              <input readOnly value={this.tripStart}/>
              <p> - </p>
              <input readOnly value={this.tripEnd}/>
            </div>
            <textarea readOnly className="col-10 ml-4 align-self-end" cols="40 shadow-p" rows="10" value={destinationInfo.description}></textarea>
          </form>
        </div>
    );
  }
}
