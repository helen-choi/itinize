import React from 'react';

export default class Welcome extends React.Component {

  componentDidMount() {

    setTimeout(() => {
      this.props.handleWelcome();

    }, 2000);
  }

  render() {
    return (
      <div className="welcome-container d-flex justify-content-center align-items-center" style={{ transition: 'all 1s ease' }}>
        <img src="./images/itinize-welcome.png" alt=""/>
      </div>
    );
  }
}
