import React from 'react';

export default class ListItineraryItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isClicked: false,
      itineraryName: null,
      itineraryDay: null,
      itineraryNote: null
    };
  }

  handleClick() {
    this.setState({ isClicked: !this.state.isClicked });
  }

  handleOnChange(e) {
    console.log(e.currentTarget);
    const nameOfStateProp = e.currentTarget.getAttribute('handler');
    this.setState({ [nameOfStateProp]: e.currentTarget.value });
  }

  render() {
    let itineraryNote = this.props.itineraryNote;
    if (itineraryNote.length > 20) {
      itineraryNote = `${itineraryNote.slice(0, 20)}...`;
    }
    return (
      this.props.editClick
        ? (
          <div className="Itinerary-Item mt-1 border border-secondary col-9 ">
            <i className="far fa-times-circle text-light"></i>
            <input onChange={this.handleOnChange} className="h3 w-75 edit-input" handler="itineraryName" value={this.props.itineraryName}/>
            <select onChange={this.handleOnChange} className="text-secondary p edit-input w-75" handler="itineraryDay" value={this.props.itineraryDay}>
              <option value="Day">Select A day</option>
              <option value="Day 1"> Day 1</option>
            </select>
            <textarea onChange={this.handleOnChange} className={`${(this.state.isClicked) ? 'd-none' : ''} text-secondary edit-input w-75`} handler="itineraryNote">{itineraryNote}</textarea>
          </div>
        )
        : (
          <div onClick={this.handleClick.bind(this)} data-toggle='collapse' data-target={`#${this.props.id}`} className="Itinerary-Item mt-1 border border-secondary col-9 ">
            <h3>{this.props.itineraryName}</h3>
            <p className="text-secondary">{this.props.itineraryDay}</p>
            <p className={`${(this.state.isClicked) ? 'd-none' : ''} text-secondary`}>{itineraryNote}</p>
            <p id={this.props.id} className={`${(this.state.isClicked) ? 'h-100' : 'd-none'} text-secondary itinerary-display`}>{this.props.itineraryNote}</p>
          </div>
        )
    );
  }
}
