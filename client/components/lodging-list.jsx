import React from 'react';

export default class LodgingList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lodgings: []
    };
  }

  componentDidMount() {
    this.getLodgingList();
  }

  getLodgingList() {
    const { destinationId } = this.props.location.state;
    fetch(`/api/lodgings/${destinationId}`)
      .then(res => res.json())
      // eslint-disable-next-line no-console
      .then(data => console.log(data))
      .catch(err => console.error(err));
  }

  render() {
    return (
      <h1>Hello World!</h1>
    );
  }
}
