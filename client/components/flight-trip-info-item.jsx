import React from 'react';

export default class FlightTripInfoItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      flightStatus: '',
      airportArrival: '',
      departTime: '',
      arrivalTime: '',
      arrivalDay: '',
      departureTerminal: '',
      arrivingTerminal: '',
      departingDate: null
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

  componentDidMount() {
    const date = this.props.flightData.flightDate.slice(0, 10);
    const iata = this.props.flightData.flightNumber;
    const departureIata = this.props.flightData.airportDeparture;
    this.checkDate(date, iata, departureIata);
    window.addEventListener('mouseup', this.onDragEndMouse);
    window.addEventListener('touchend', this.onDragEndTouch);
  }

  checkDate(date, iata, departureIata) {
    const userYear = date.slice(0, 4);
    const userMonth = date.slice(5, 7);
    const userDay = date.slice(8, 10);
    const userDate = new Date(userYear, userMonth - 1, userDay);
    const currentDate = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
    if (currentDate.toString() === userDate.toString()) {
      this.getFlightStatus(iata, departureIata);
    } else {
      this.setState({
        departingDate: false
      });
    }
  }

  getFlightStatus(iata, departure) {
    const flightIata = iata;
    const departureIata = departure;

    fetch(`/api/aviationStack/${flightIata}/${departureIata}`)
      .then(res => res.json())
      .then(flightDatas => {
        if (typeof flightDatas === 'object') {
          this.setState({
            flightStatus: flightDatas.flightStatus,
            airportArrival: flightDatas.airportArrival,
            departTime: flightDatas.departTime,
            arrivalTime: flightDatas.arrivalTime,
            arrivalDay: flightDatas.arrivalDay,
            departureTerminal: flightDatas.departureTerminal,
            arrivingTerminal: flightDatas.arrivingTerminal,
            departingDate: true
          });
        }
      })
      .catch(err => console.error(err));
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
    const { flightId } = this.props.flightData;
    this.props.handleClickDelete(flightId);
  }

  componentWillUnmount() {
    window.removeEventListener('mouseup', this.onDragEndMouse);
    window.removeEventListener('touchend', this.onDragEndTouch);
  }

  render() {
    const flightData = this.props.flightData;

    const flightStatus = (this.state.departingDate) ? this.state.flightStatus : 'pending';
    const airportArrival = (this.state.departingDate) ? this.state.airportArrival : 'pending';
    const departTime = (this.state.departingDate) ? this.state.departTime : 'TBA';
    const arrivalTime = (this.state.departingDate) ? this.state.arrivalTime : null;
    const arrivalDay = (this.state.departingDate) ? this.state.arrivalDay : 'pending';
    const departureTerminal = (this.state.departingDate) ? this.state.departureTerminal : 'pending';
    const arrivingTerminal = (this.state.departingDate) ? this.state.arrivingTerminal : 'pending';
    return (
      <div className="wrapper">
        <div className="background d-flex justify-content-end align-items-center pr-4" ref={div => (this.background = div)}>
          <h4 className="text-white"><strong>DELETE</strong></h4>
        </div>
        <div className="flight-card pl-3 p-4 mt-3 position-relative"
          ref={div => (this.list = div)}
          onMouseDown={this.onDragStartMouse}
          onTouchStart={this.onDragStartTouch}>
          <div>
            <div className="delete-arrow"><i className="fas fa-chevron-left fa-2x"></i></div>
            <h5 className="d-flex justify-content-between">{flightData.flightName}</h5>
            <p> {flightData.airportDeparture} &#8594; {airportArrival}</p>
            <p><strong>Flight Number:</strong> {flightData.flightNumber}</p>
            <p><strong>Departing Date:</strong> {flightData.flightDate.slice(0, 10)} {departTime}</p>
            <p><strong>Departure Terminal:</strong> {departureTerminal} </p>
            <p><strong>Arrival Date:</strong> {arrivalDay} {arrivalTime}</p>
            <p><strong>Arriving Terminal:</strong> {arrivingTerminal} </p>
            <p><strong>Flight Status:</strong> {flightStatus}</p>
          </div>
        </div>
      </div>
    );
  }
}
