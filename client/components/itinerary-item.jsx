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

  render() {
    let itineraryNote = this.props.itineraryNote;
    if (itineraryNote.length > 20) {
      itineraryNote = `${itineraryNote.slice(0, 20)}...`;
    }
    const optionTag = [];
    for (let i = 1; i <= this.props.totalDays; i++) {
      optionTag.push(<option key={i}>Days {i}</option>);
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
            <div onClick={this.handleClickShowModal} className="Itinerary-Item mt-1 border border-secondary col-9 ">
              <i onClick={() => this.props.handleDelete(this.props.id)} className="fas fa-times text-light"></i>
              <h3 className="text-light">{this.state.itineraryName}</h3>
              <p className="text-secondary text-light">{this.state.itineraryDay}</p>
              <p className={'text-light'}>{itineraryNote}</p>
              <p id={this.props.id} className={`${(this.state.isClicked) ? '' : 'd-none'} text-light itinerary-display`}>{this.state.itineraryNote}</p>
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
