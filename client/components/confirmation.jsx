import React from 'react';

export default class Confirmation extends React.Component {

  componentDidMount() {
    const url = this.props.match.url;
    const history = this.props.history;

    setTimeout(() => {

      if (url.includes('/lodgings')) {
        history.push('/lodgings');
      } else if (url.includes('/destinations')) {
        history.push('/');
      } else if (url.includes('/flights')) {
        history.push('/flights');
      } else if (url.includes('/itineraries')) {
        history.go(-1);
      } else {
        history.push('/');
      }

    }, 1500);
  }

  render() {
    const newItem = this.props.newItem;
    return (
      <div className="confirmation-container p-3 row align-items-center">
        <div className="confirmation-content row justify-content-center">
          <h2 className="text-center font-weight-normal col-12">A new {newItem}<br/>was added!</h2>
          <div className="confirm-icon-container row justify-content-center align-items-center mt-4">
            <i className="confirm-icon fas fa-check fa-3x"></i>
          </div>
        </div>
      </div>
    );
  }
}
