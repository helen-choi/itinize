import React from 'react';

export default class LodgingItem extends React.Component {
  constructor(props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleDelete() {
    const lodgingId = this.props.lodging.lodgingId;
    this.props.handleDelete(lodgingId);
  }

  render() {
    const modalStyle = this.props.editModeOn ? { display: 'block', color: 'white' } : { display: 'none' };
    const lodging = this.props.lodging;
    return (
      <div className="lodging p-4 mt-3 position-relative" onMouseDown={this.props.onMouseDown}>
        <div className="delete-control text-right position-absolute" style={modalStyle} >
          <i className="fas fa-times" onClick={this.handleDelete}></i>
        </div>
        <h5>{lodging.lodgingName}</h5>
        <p><strong>Confirmation: </strong>{lodging.lodgingConfNum}</p>
        <p><strong>Check-In:</strong> {lodging.checkInDateTime}</p>
        <p><strong>Check-Out:</strong> {lodging.checkOutDateTime}</p>
      </div>
    );
  }
}
