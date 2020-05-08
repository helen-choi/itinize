import React from 'react';
import { Link } from 'react-router-dom';

export default class AddFlightName extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      flightName: '',
      componentStage: -1
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClickForward = this.handleClickForward.bind(this);
    this.handleClickBackward = this.handleClickBackward.bind(this);
  }

  handleChange(event) {
    this.setState({
      flightName: event.target.value
    });
  }

  handleClickForward(event) {
    this.setState({
      componentStage: this.state.componentStage + 1
    });
  }

  handleClickBackward(event) {
    this.setState({
      componentStage: this.state.componentStage - 1
    });
  }

  flightPage() {
    if (this.state.componentStage === -1) {
      return (
        <div className="container">
          <header className="row mt-4 px-1">
            <div className="col d-flex justify-content-between">
              <Link to='/' className="text-red">
                <i className="fas fa-times fa-2x"></i>
              </Link>
              <i onClick={() => { this.handleClickForward(); }} className="fas fa-arrow-right fa-2x"></i>
            </div>
          </header>
          <div className="row d-flex justify-content-center mt-5">
            <h2>Name your flight</h2>
          </div>
          <div className="row d-flex justify-content-center mt-3">
            <h6>Ex Returningflight, Going back home!</h6>
          </div>
          <div className="row d-flex justify-content-center mt-5">
            <input type="text" onChange={this.handleChange} className="text-center flight-name" placeholder={'flight name'} value={this.state.flightName}/>
          </div>
        </div>
      );
    }
    // else if (this.state.componentStage === 0) {
    //   return (
    //     <div className="container">
    //       <header className="row mt-4 px-1">
    //         <div className="col d-flex justify-content-between">
    //           <i onClick={() => { this.handleClickBackward(); }} className="fas fa-arrow-left fa-2x"></i>
    //           <i onClick={() => { this.handleClickForward(); }} className="fas fa-arrow-right fa-2x"></i>
    //         </div>
    //       </header>
    //     </div>
    //   );
    // }
  }

  render() {
    return (
      <>
        { this.flightPage() }
      </>
    );
  }
}
