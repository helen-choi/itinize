import React from 'react';

export default class AddItineraryNotes extends React.Component {
  constructor(props) {
    super(props);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.state = {
      locations: null,
      notes: ''
    };
  }

  handleOnChange(e) {
    this.setState({ notes: e.currentTarget.value });
    this.props.getInputs(e.currentTarget.value);
  }

  render() {
    return (
      <div className="add-lodging-name-container">
        <h1 className="text-center pt-5">Add note</h1>
        <h3 className="text-center pt-1">(optional)</h3>
        <p className="text-muted text-center px-5 pt-2">Write notes about this itinerary. You can also add it later.</p>
        <div className="input-container row justify-content-center mt-3">
          <textarea onChange={this.handleOnChange} className="p-2" placeholder="At this location, I will ..." cols="30" rows="10" value={this.state.notes}></textarea>
        </div>
      </div>
    );
  }
}
