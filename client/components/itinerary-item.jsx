import React from 'react';

export default class ListItineraryItem extends React.Component {
  constructor(props) {
    super(props);
    this.handleClickShowModal = this.handleClickShowModal.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.state = {
      isClicked: false,
      showModal: false,
      itineraryDay: this.props.itineraryDay,
      itineraryName: this.props.itineraryName,
      itineraryNote: this.props.itineraryNote
    };

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

  handleClick() {
    this.setState({ isClicked: !this.state.isClicked });
  }

  handleClickShowModal(e) {
    this.setState({ showModal: !this.state.showModal }, this.putItinerary);
  }

  handleOnChange(e) {
    const nameOfStateProp = e.currentTarget.getAttribute('handler');
    this.setState({ [nameOfStateProp]: e.currentTarget.value });
  }

  putItinerary() {
    if (!this.state.showModal) {
      const fetchParam = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          itineraryName:
          this.state.itineraryName,
          itineraryDay: this.state.itineraryDay,
          itineraryNote: this.state.itineraryNote,
          locationId: this.props.locationId
        })
      };
      fetch(`/api/itineraries/${this.props.id}`, fetchParam)
        .then(res => res.json())
        .catch(err => console.error(err));
    }
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
    const itineraryId = this.props.id;
    this.props.handleDelete(itineraryId);
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
    let itineraryNote = this.props.itineraryNote;
    if (itineraryNote.length > 20) {
      itineraryNote = `${itineraryNote.slice(0, 20)}...`;
    }
    const optionTag = [];
    for (let i = 1; i <= this.props.totalDays; i++) {
      optionTag.push(<option key={i}>Day {i}</option>);
    }
    return (
      <>
        {this.props.editClick && this.state.showModal && (
          <div onClick={this.handleClickShowModal} className="modal" style={{ display: 'block' }}>
            <div className="modal-dialog modal-dialog-centered">
              <div onClick={e => e.stopPropagation()} className="modal-content">
                <div className="modal-header">
                  <textarea onChange={this.handleOnChange} className="modal-title h3 w-75 edit-input text-dark" handler="itineraryName" value={this.state.itineraryName} />
                </div>
                <div className="modal-body">
                  <select onChange={this.handleOnChange} className="text-secondary p edit-input w-75" handler="itineraryDay" value={this.state.itineraryDay}>
                    <option value="Day">Select A day</option>
                    {optionTag}
                  </select>
                  <textarea

                    onChange={this.handleOnChange}
                    className={'text-secondary edit-input w-75'}
                    handler="itineraryNote"
                    value={this.state.itineraryNote} />
                </div>
              </div>
            </div>
          </div>)
        }

        {this.props.editClick
          ? (
            <div onClick={this.handleClickShowModal} className="Itinerary-Item Itinerary-Item-edit mt-1 border border-secondary col-9 ">
              <h3 className="text-light">{this.state.itineraryName}</h3>
              <p className="text-secondary text-light">{this.state.itineraryDay}</p>
              <p className={'text-light'}>{itineraryNote}</p>
            </div>
          )
          : (
            <div className="position-relative w-100 pl-3 pr-3" ref={div => (this.wrapper = div)}>
              <div className="background-itinerary d-flex justify-content-end align-items-center pr-2 mx-auto mt-3" ref={div => (this.background = div)}>
                <h5 className="text-white"><strong>DELETE</strong></h5>
              </div>
              <div className="pr-3 pl-3">
                <div
                  ref={div => (this.list = div)}
                  onMouseDown={this.onDragStartMouse}
                  onTouchStart={this.onDragStartTouch}
                  onClick={this.handleClick.bind(this)}
                  data-toggle='collapse'
                  data-target={`#${this.props.id}`}
                  className="Itinerary-Item mt-3 p-4 mx-auto position-relative">
                  <h5>{this.props.itineraryName}</h5>
                  <p className="text-muted mb-1">{this.props.itineraryDay}</p>
                  <p className={`${(this.state.isClicked) ? 'd-none' : ''} text-muted mb-0`}>{itineraryNote}</p>
                  <p id={this.props.id} className={`${(this.state.isClicked) ? '' : 'd-none'} text-secondary itinerary-display`}>{this.props.itineraryNote}</p>
                  <div className="delete-arrow"><i className="fas fa-chevron-left fa-2x"></i></div>
                </div>
              </div>
            </div>
          )}
      </>
    );
  }
}
