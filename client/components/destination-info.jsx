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

        <div className="DestinationInfo" style={{ backgroundImage: `url(${destinationInfo.destinationImage})` }}>
          <div className="row justify-content-between">
            <Link to="/" className="col-2">
              <img className="icon" src="/images/back.png" alt="back arrow"/>
            </Link>
            <img className="icon col-2" src="/images/pencil.png" alt="edit button"/>
          </div>
          <form className="row">
            <input className="h1 col-12 shadow-p" readOnly value={destinationInfo.destinationName}/>
            <input className="p shadow-p" readOnly value={this.tripStart}/>
            <p> - </p>
            <input className="p shadow-p" readOnly value={this.tripEnd}/>
            <textarea readOnly className="col-10" cols="40 shadow-p" rows="10" value={destinationInfo.description}></textarea>
          </form>
        </div>
    );
  }
}
