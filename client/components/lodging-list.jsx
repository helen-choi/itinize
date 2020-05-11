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
    // eslint-disable-next-line no-console
    console.log('hello');
  }

  render() {
    return (
      <h1>Hello World!</h1>
    );
  }
}
