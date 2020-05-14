import React from 'react';

export default class Welcome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fadeOut: false
    };
  }

  componentDidMount() {

    setTimeout(() => {
      this.props.handleWelcome();

    }, 2000);
    setTimeout(() => {
      this.setState({
        fadeOut: true
      });
    }, 1700);
  }

  render() {
    const welcomeStyle = this.state.fadeOut
      ? 'welcome-container fadeout d-flex justify-content-center align-items-center'
      : 'welcome-container d-flex justify-content-center align-items-center';
    return (
      <div className={welcomeStyle}>
        <img src="./images/itinize-welcome.png" alt=""/>
      </div>
    );
  }
}
