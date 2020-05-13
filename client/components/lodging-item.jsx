import React from 'react';

export default class LodgingItem extends React.Component {
  constructor(props) {
    super(props);
    this.list = null;
    this.wrapper = null;
    this.background = null;
    this.dragStartX = 0;
    this.left = 0;
    this.dragged = false;

    this.onDragStartMouse = this.onDragStartMouse.bind(this);
    this.onDragStart = this.onDragStart.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    // this.onDragEndMouse = this.onDragEndMouse.bind(this);
    // this.onDragEnd = this.onDragEnd.bind(this);
    // this.onSwiped = this.onSwiped.bind(this);
    this.updatePosition = this.updatePosition.bind(this);

    this.handleDelete = this.handleDelete.bind(this);
  }

  handleDelete() {
    const lodgingId = this.props.lodging.lodgingId;
    this.props.handleDelete(lodgingId);
  }

  onDragStartMouse(event) {
    this.onDragStart(event.clientX);
    window.addEventListener('mousemove', this.onMouseMove);
  }

  onDragStart(clientX) {
    this.dragged = true;
    this.dragStartX = clientX;
    window.requestAnimationFrame(this.updatePosition);
  }

  updatePosition() {
    if (this.dragged) requestAnimationFrame(this.updatePosition);

    this.list.style.transform = `translateX(${this.left}px)`;

    const opacity = (Math.abs(this.left) / 100).toFixed(2);
    if (opacity < 1 && opacity.toString() !== this.background.style.opacity) {
      this.background.style.opacity = opacity.toString();
    }
    if (opacity >= 1) {
      this.background.style.opacity = '1';
    }

  }

  onMouseMove(event) {
    const left = event.clientX - this.dragStartX;
    if (left < 0) {
      this.left = left;
    }
  }

  render() {
    const modalStyle = this.props.editModeOn ? { display: 'block', color: 'white' } : { display: 'none' };
    const lodging = this.props.lodging;
    return (
      <div className="wrapper" ref={div => (this.wrapper = div)}>
        <div className="background" ref={div => (this.background = div)}></div>
        <div className="lodging p-4 mt-3 position-relative"
          ref={div => (this.list = div)}
          onMouseDown={this.onDragStartMouse}>
          <div className="delete-control text-right position-absolute" style={modalStyle} >
            <i className="fas fa-times" onClick={this.handleDelete}></i>
          </div>
          <h5>{lodging.lodgingName}</h5>
          <p><strong>Confirmation: </strong>{lodging.lodgingConfNum}</p>
          <p><strong>Check-In:</strong> {lodging.checkInDateTime}</p>
          <p><strong>Check-Out:</strong> {lodging.checkOutDateTime}</p>
        </div>
      </div>
    );
  }
}
