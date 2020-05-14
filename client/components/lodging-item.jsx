import React from 'react';
// eslint-disable-next-line no-unused-vars
import DeleteModal from './delete-modal';

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
    this.onDragEndMouse = this.onDragEndMouse.bind(this);
    this.onDragEnd = this.onDragEnd.bind(this);
    this.onSwiped = this.onSwiped.bind(this);
    this.updatePosition = this.updatePosition.bind(this);
    this.onDragStartTouch = this.onDragStartTouch.bind(this);
    this.onTouchMove = this.onTouchMove.bind(this);
    this.onDragEndTouch = this.onDragEndTouch.bind(this);
  }

  onDragStartMouse(event) {
    this.onDragStart(event.clientX);
    window.addEventListener('mousemove', this.onMouseMove);
  }

  onDragStartTouch(evt) {
    const touch = evt.targetTouches[0];
    this.onDragStart(touch.clientX);
    window.addEventListener('touchmove', this.onTouchMove);
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

  onTouchMove(evt) {
    const touch = evt.targetTouches[0];
    const left = touch.clientX - this.dragStartX;
    if (left < 0) {
      this.left = left;
    }
  }

  onDragEndMouse(event) {
    window.removeEventListener('mousemove', this.onMouseMove);
    this.onDragEnd();
  }

  onDragEndTouch(evt) {
    window.removeEventListener('touchmove', this.onTouchMove);
    this.onDragEnd();
  }

  onDragEnd() {
    if (this.dragged) {
      this.dragged = false;

      const threshold = 0.3;
      if (this.left < this.list.offsetWidth * threshold * -1) {
        this.left = -this.list.offsetWidth * 2;
        this.onSwiped();
      } else {
        this.left = 0;
      }
    }
  }

  onSwiped() {
    const lodgingId = this.props.lodging.lodgingId;
    this.props.handleDelete(lodgingId);
  }

  componentDidMount() {
    window.addEventListener('mouseup', this.onDragEndMouse);
    window.addEventListener('touchend', this.onDragEndTouch);
  }

  componentWillUnmount() {
    window.removeEventListener('mouseup', this.onDragEndMouse);
    window.removeEventListener('touchend', this.onDragEndTouch);
  }

  render() {
    const lodging = this.props.lodging;
    return (
      <div className="wrapper" ref={div => (this.wrapper = div)}>
        <div className="background d-flex justify-content-end align-items-center pr-4" ref={div => (this.background = div)}>
          <h4 className="text-white"><strong>DELETE</strong></h4>
        </div>
        <div className="lodging p-4 mt-3 position-relative"
          ref={div => (this.list = div)}
          onMouseDown={this.onDragStartMouse}
          onTouchStart={this.onDragStartTouch}>
          <div className="delete-arrow"><i className="fas fa-chevron-left fa-2x"></i></div>
          <h5>{lodging.lodgingName}</h5>
          <p><strong>Confirmation: </strong>{lodging.lodgingConfNum}</p>
          <p><strong>Check-In:</strong> {lodging.checkInDateTime}</p>
          <p><strong>Check-Out:</strong> {lodging.checkOutDateTime}</p>
        </div>
      </div>
    );
  }
}
