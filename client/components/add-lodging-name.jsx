import React from 'react';

export default class AddLodgingName extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: -1,
      lodgingName: ''
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange() {
    this.setState({
      lodgingName: event.target.value
    });
  }

  render() {
    return (
      <div className="container">
        <input type="text" name="lodgingName" value={this.state.lodgingName} onChange={this.handleChange}/>
      </div>
    );
  }
}
