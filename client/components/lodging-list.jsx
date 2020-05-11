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
        // eslint-disable-next-line no-console
        console.log(lodgingData);
      })
      .catch(err => console.error(err));
  }

  render() {
    // const {
    //   destinationName,
    //   lodgingName,
    //   lodgingConfNum,
    //   locationId,
    //   checkInDateTime,
    //   checkOutDateTime
    // } = this.state.lodgings;

    return (
      <div className="lodging-list-container p-3">
        <h1 className="text-center mt-5">Japan</h1>
        <div className="lodgings">
          <div className="lodging p-3 mt-5">
            <h5>Hilton</h5>
            <p><strong>Confirmation: </strong>ASDF234</p>
            <p><strong>Check-In:</strong> asdf</p>
            <p><strong>Check-Out:</strong> asdf</p>
          </div>
        </div>
      </div>
    );
  }
}
