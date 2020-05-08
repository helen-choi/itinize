import React from 'react';

export default class SelectDestinationImageProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageList: [],
      imageChoice: 'yes'
    };
  }

  // this.props.clickFunction(this.props.params)
  // onClick={() => { this.props.handleClick(this.state.imageChoice); }}
  componentDidMount() {
    this.getPexelPictures();
  }

  getPexelPictures() {
    const params = {
      method: 'GET',
      headers: { Authorization: '563492ad6f9170000100000199ba9517fba74485b278a4b9796b71c3' }
    };
    fetch(`https://api.pexels.com/v1/search?query=${this.props.imageParam}&per_page=15&page=1`, params)
      .then(res => res.json())
      .then(data => {
        const photoArray = [];
        console.log(data);
        for (let i = 0; i < data.photos.length; i++) {
          photoArray.push(data.photos[i].src.portrait);
        }
        this.setState({ imageList: photoArray });
      });
  }

  render() {
    console.log(this.props.imageParam);
    const reactElementArray = this.state.imageList.map(currentImage => {
      return (<img className='col-3 w-100' key={currentImage} src={currentImage} alt="" />);
    });
    return (
      <div className="main-text-height row align-items-start">
        <div className="row">
          <div className="col">
            <h4 className="text-center font-weight-bold">Select an image</h4>
            <h6 className="text-center">Pick an image that makes you feel something and is connected to your trip.</h6>
          </div>
        </div>
        <div className="row flex-wrap no-gutters">
          {reactElementArray}
          {/* <img className='w-100' src="https://images.pexels.com/photos/590478/pexels-photo-590478.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800" alt=""/> */}
        </div>
      </div>
    );
  }
}
