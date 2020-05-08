import React from 'react';

export default class SelectDestinationImageProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageList: [],
      imageChoice: ''
    };
  }

  componentDidMount() {
    // Enable this method after an hour and check to make sure you don't make
    // too many GET requests. We're limited to 200 per hour
    this.getPexelPictures();
  }

  getPexelPictures() {
    const params = {
      method: 'GET',
      headers: { Authorization: '563492ad6f9170000100000199ba9517fba74485b278a4b9796b71c3' }
    };
    fetch(`https://api.pexels.com/v1/search?query=${this.props.imageParam}&per_page=3&page=1`, params)
      .then(res => res.json())
      .then(data => {
        const photoArray = [];
        console.log(data);
        for (let i = 0; i < data.photos.length; i++) {
          photoArray.push({
            portraitSrc: data.photos[i].src.portrait,
            photographer: data.photos[i].photographer,
            photoId: data.photos[i].id
          });
        }
        this.setState({ imageList: photoArray });
      });
  }

  render() {
    console.log(this.props.imageParam);
    const reactElementArray = this.state.imageList.map(currentImage => {
      return (
        <>
          <div className="col-3 w-100">
            <span className="position-absolute">text</span>
            <img className='w-100' key={currentImage} src={currentImage.portraitSrc} alt="" />
          </div>
        </>
      );
    });
    return (
      <div className="main-text-height row align-items-start">
        <div className="row">
          <div className="col">
            <h4 className="text-center font-weight-bold">Select an image</h4>
            <h6 className="text-center">Pick an image that makes you feel something and is connected to your trip. (Photos provided by <a target="_blank" rel='noopener noreferrer' href="https://www.pexels.com/">Pexels</a>)</h6>
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

// 'https://images.pexels.com/photos/402028/pexels-photo-402028.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800',
//   'https://images.pexels.com/photos/1440476/pexels-photo-1440476.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800',
//   'https://images.pexels.com/photos/1134166/pexels-photo-1134166.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800',
//   'https://images.pexels.com/photos/46253/mt-fuji-sea-of-clouds-sunrise-46253.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800',
//   'https://images.pexels.com/photos/301614/pexels-photo-301614.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800',
//   'https://images.pexels.com/photos/590478/pexels-photo-590478.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800',
//   'https://images.pexels.com/photos/2187605/pexels-photo-2187605.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800',
//   'https://images.pexels.com/photos/1822605/pexels-photo-1822605.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800',
//   'https://images.pexels.com/photos/1108701/pexels-photo-1108701.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800',
//   'https://images.pexels.com/photos/1798631/pexels-photo-1798631.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800',
//   'https://images.pexels.com/photos/1654748/pexels-photo-1654748.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800',
//   'https://images.pexels.com/photos/1829980/pexels-photo-1829980.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800',
//   'https://images.pexels.com/photos/315191/pexels-photo-315191.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800',
//   'https://images.pexels.com/photos/1510595/pexels-photo-1510595.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800',
//   'https://images.pexels.com/photos/1310788/pexels-photo-1310788.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800'
