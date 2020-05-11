import React from 'react';
import LodgingItem from './lodging-item';

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
        // eslint-disable-next-line no-console
        console.log(lodgingData);
      })
      .catch(err => console.error(err));
  }

  render() {

    return (
      <div className="lodging-list-container p-3">
        <h1 className="text-center mt-5">Japan</h1>
        <div className="lodgings pl-3 pr-3">
          {this.state.lodgings.map(lodging => {
            return <LodgingItem key={lodging.lodgingId} lodging={lodging} />;
          })}
        </div>
      </div>
    );
  }
}
