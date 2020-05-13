import React from 'react';

export default class Welcome extends React.Component {
  componentDidMount() {

    setTimeout(() => {
      // eslint-disable-next-line no-console
      console.log('New Page');

    }, 2000);
  }

  render() {
    return (
      <div className="welcome-container">
        <h2>Welcome to Itinize!</h2>
      </div>
    );
  }
}
