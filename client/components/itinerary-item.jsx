import React from 'react';

export default class ListItineraryItem extends React.Component {
  constructor(props) {
    super(props);
    this.handleClickShowModal = this.handleClickShowModal.bind(this);
    this.state = {
      isClicked: false,
      showModal: false,
      itineraryDay: this.props.itineraryDay,
      itineraryName: this.props.itineraryName,
      itineraryNote: this.props.itineraryNote
    };
  }

  handleClick() {
    this.setState({ isClicked: !this.state.isClicked });
  }

  handleClickShowModal() {
    this.setState({ showModal: !this.state.showModal });
  }

  handleOnChange(e) {
    const nameOfStateProp = e.currentTarget.getAttribute('handler');
    this.setState({ [nameOfStateProp]: e.currentTarget.value });
  }

  render() {
    let itineraryNote = this.props.itineraryNote;
    if (itineraryNote.length > 20) {
      itineraryNote = `${itineraryNote.slice(0, 20)}...`;
    }
    return (
      <>
        {this.props.editClick && this.state.showModal &&
          <div className="modal">
            <div className="innerBody">
              <textarea onChange={this.handleOnChange} className="h3 w-75 edit-input" handler="itineraryName" value={this.state.itineraryName} />
              <select onChange={this.handleOnChange} className="text-secondary p edit-input w-75" handler="itineraryDay" value={this.state.itineraryDay}>
                <option value="Day">Select A day</option>
                <option value="Day 1"> Day 1</option>
              </select>
              <textarea
                onChange={this.handleOnChange}
                className={'text-secondary edit-input w-75'}
                handler="itineraryNote"
                value={this.state.itineraryNote} />
            </div>
          </div>
        }

        {this.props.editClick
          ? (
            <div onClick={this.handleClickShowModal} className="Itinerary-Item mt-1 border border-secondary col-9 ">
              <i onClick={() => this.props.handleDelete(this.props.id)} className="fas fa-times text-light"></i>
              <h3 className="text-light">{this.props.itineraryName}</h3>
              <p className="text-secondary text-light">{this.props.itineraryDay}</p>
              <p className={`${(this.state.isClicked) ? 'd-none' : ''} text-light`}>{itineraryNote}</p>
              <p id={this.props.id} className={`${(this.state.isClicked) ? '' : 'd-none'} text-light itinerary-display`}>{this.props.itineraryNote}</p>
            </div>
          )
          : (
            <div onClick={this.handleClick.bind(this)} data-toggle='collapse' data-target={`#${this.props.id}`} className="Itinerary-Item mt-1 border border-secondary col-9 ">
              <h3>{this.props.itineraryName}</h3>
              <p className="text-secondary">{this.props.itineraryDay}</p>
              <p className={`${(this.state.isClicked) ? 'd-none' : ''} text-secondary`}>{itineraryNote}</p>
              <p id={this.props.id} className={`${(this.state.isClicked) ? '' : 'd-none'} text-secondary itinerary-display`}>{this.props.itineraryNote}</p>
            </div>
          )}
      </>
    );
  }
}
