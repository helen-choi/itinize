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
      .then(lodgingData => {
        this.setState({
          lodgings: lodgingData
        });
      })
      .catch(err => console.error(err));
  }

  render() {
    return (
      <h1>Hello World!</h1>
    );
  }
}
