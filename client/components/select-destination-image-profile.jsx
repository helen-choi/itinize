import React from 'react';
export default class SelectDestinationImageProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // Change this back to empty during production for API call
      imageList: dummyImageArray,
      // imageList: [],
      imageChoice: '',
      isCheckVisible: false,
      editMode: false,
      loadedImages: null,
      imageLoadError: false
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleImageLoaded = this.handleImageLoaded.bind(this);
  }

  componentDidMount() {
  // Enable this method after an hour and check to make sure you don't make
  // too many GET requests. We're limited to 200 per hour
  // Stretch future would be to use componentDidUpdate to disable multiple requests from happening
    // this.getPexelPictures();
    if (this.props.handleCheck) {
      this.setState({ editMode: true });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    // Typical usage (don't forget to compare props):

  }

  handleImageLoaded() {
    let loadCounter = this.state.loadedImages;
    loadCounter = loadCounter + 1;
    this.setState({ loadedImages: loadCounter });
  }

  handleImageError() {
    this.setState({ imageLoadError: true });
  }

  getPexelPictures() {
    const params = {
      method: 'GET',
      headers: { Authorization: '563492ad6f9170000100000199ba9517fba74485b278a4b9796b71c3' }
    };
    fetch(`https://api.pexels.com/v1/search?query=${this.props.imageParam}&per_page=5&page=1`, params)
      .then(res => res.json())
      .then(data => {
        const photoArray = [];
        for (let i = 0; i < data.photos.length; i++) {
          photoArray.push({
            portraitSrc: data.photos[i].src.portrait,
            photographer: data.photos[i].photographer,
            photoId: data.photos[i].id,
            photoURL: data.photos[i].url
          });
        }
        this.setState({ imageList: photoArray });
      });
  }

  editHeader() {
    return (<header className="row">
      <div className="col d-flex justify-content-between">
        <i onClick={() => this.props.handleExit()} className="far fa-times-circle fa-2x"></i>
        <i onClick={() => {
          if (this.state.isCheckVisible) {
            this.props.handleCheck(this.state.imageChoice);
          }
        }} className="fas fa-check fa-2x"></i>
      </div>
    </header>
    );
  }

  handleClick(imageSrc) {
    this.setState({
      imageChoice: imageSrc,
      isCheckVisible: true
    });
  }

  render() {
    const loadGoal = 16;
    const reactElementArray = this.state.imageList.map(currentImage => {
      return (
        <div onClick={() => {
          this.handleClick(currentImage.portraitSrc);
          if (this.props.handleImageClick) {
            this.props.handleImageClick(currentImage.portraitSrc);
          }
        }}
        key={currentImage.photoId}
        className={`${this.state.loadedImages === loadGoal ? 'destination-images-on' : 'destination-images-off'} col-3 w-100 cursor-pointer`}>
          <p className="position-absolute pexels-photo-text"><em><a target="_blank" rel='noopener noreferrer' href={currentImage.photoURL}>Photo</a> by {currentImage.photographer}</em></p>
          <img onError={this.handleImageError} onLoad={this.handleImageLoaded} className='w-100 pexels-photo' src={currentImage.portraitSrc} alt="" />
          <div className={`${(this.state.imageChoice === currentImage.portraitSrc) ? 'd-flex justify-content-center align-items-center ' : 'd-none '}h-100 w-100 position-absolute destination-image-modal-check`}>
            <i className="text-white confirm-icon fas fa-check fa-2x"></i>
          </div>
        </div>
      );
    });
    return (
      <>
        { this.state.editMode ? this.editHeader() : null }
        <div className="row align-items-start justify-content-center">
          <div className="row justify-content-center">
            <div className="col">
              <h4 className="text-center font-weight-bold">Select an image</h4>
              <h6 className="text-center">Pick an image that makes you feel something and is connected to your trip. (Photos provided by <a target="_blank" rel='noopener noreferrer' href="https://www.pexels.com/">Pexels</a>)</h6>
            </div>
          </div>
          <div className="row flex-wrap no-gutters justify-content-center">
            {(!this.state.imageLoadError && reactElementArray) ||
            <div className="text-center text-danger col-6">Error: image search limit exceeded. Please try again in an hour</div>
            }

          </div>
        </div>
      </>
    );
  }
}

// delete this after development and presentation
const dummyImageArray = [
  {
    portraitSrc: 'https://images.pexels.com/photos/402028/pexels-photo-402028.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800',
    photographer: 'Belle Co',
    photoId: 402028,
    photoURL: 'https://www.pexels.com/photo/red-and-black-temple-surrounded-by-trees-photo-402028/'
  },
  {
    portraitSrc: 'https://images.pexels.com/photos/1440476/pexels-photo-1440476.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800',
    photographer: 'Bagus Pangestu',
    photoId: 1440476,
    photoURL: 'https://www.pexels.com/photo/close-up-photography-of-cherry-blossom-tree-1440476/'
  },
  {
    portraitSrc: 'https://images.pexels.com/photos/1134166/pexels-photo-1134166.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800',
    photographer: 'Aleksandar Pasaric',
    photoId: 1134166,
    photoURL: 'https://www.pexels.com/photo/woman-walking-in-the-street-during-night-time-1134166/'
  },
  {
    portraitSrc: 'https://images.pexels.com/photos/46253/mt-fuji-sea-of-clouds-sunrise-46253.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800',
    photographer: 'Pixabay',
    photoId: 46253,
    photoURL: 'https://www.pexels.com/photo/black-and-white-mountain-over-yellow-white-and-blue-sky-46253/'
  },
  {
    portraitSrc: 'https://images.pexels.com/photos/301614/pexels-photo-301614.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800',
    photographer: 'Pixabay',
    photoId: 301614,
    photoURL: 'https://www.pexels.com/photo/ancient-architecture-asia-bench-301614/'
  },
  {
    portraitSrc: 'https://images.pexels.com/photos/590478/pexels-photo-590478.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800',
    photographer: 'Janko Ferlic',
    photoId: 590478,
    photoURL: 'https://www.pexels.com/photo/asia-japan-japanese-japanese-culture-590478/'
  },
  {
    portraitSrc: 'https://images.pexels.com/photos/2187605/pexels-photo-2187605.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800',
    photographer: 'Evgeny Tchebotarev',
    photoId: 2187605,
    photoURL: 'https://www.pexels.com/photo/photo-of-houses-2187605/'
  },
  {
    portraitSrc: 'https://images.pexels.com/photos/1822605/pexels-photo-1822605.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800',
    photographer: 'DSD',
    photoId: 1822605,
    photoURL: 'https://www.pexels.com/photo/man-holding-an-umbrella-1822605/'
  },
  {
    portraitSrc: 'https://images.pexels.com/photos/1108701/pexels-photo-1108701.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800',
    photographer: 'Liger Pham',
    photoId: 1108701,
    photoURL: 'https://www.pexels.com/photo/mt-fuji-japan-1108701/'
  },
  {
    portraitSrc: 'https://images.pexels.com/photos/1798631/pexels-photo-1798631.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800',
    photographer: 'Haugenzhays Zhang',
    photoId: 1798631,
    photoURL: 'https://www.pexels.com/photo/neon-signs-1798631/'
  },
  {
    portraitSrc: 'https://images.pexels.com/photos/1654748/pexels-photo-1654748.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800',
    photographer: 'Nien Tran Dinh',
    photoId: 1654748,
    photoURL: 'https://www.pexels.com/photo/photo-of-himeji-castle-behind-white-cherry-blossoms-1654748/'
  },
  {
    portraitSrc: 'https://images.pexels.com/photos/1829980/pexels-photo-1829980.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800',
    photographer: 'DSD',
    photoId: 1829980,
    photoURL: 'https://www.pexels.com/photo/pagoda-temple-near-lake-under-cloudy-sky-1829980/'
  },
  {
    portraitSrc: 'https://images.pexels.com/photos/315191/pexels-photo-315191.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800',
    photographer: 'Pixabay',
    photoId: 315191,
    photoURL: 'https://www.pexels.com/photo/side-view-of-woman-in-illuminated-city-at-night-315191/'
  },
  {
    portraitSrc: 'https://images.pexels.com/photos/1510595/pexels-photo-1510595.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800',
    photographer: 'Aleksandar Pasaric',
    photoId: 1510595,
    photoURL: 'https://www.pexels.com/photo/people-walking-on-the-streets-surrounded-by-buildings-1510595/'
  },
  {
    portraitSrc: 'https://images.pexels.com/photos/1310788/pexels-photo-1310788.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800',
    photographer: 'Vincent M.A. Janssen',
    photoId: 1310788,
    photoURL: 'https://www.pexels.com/photo/gray-concrete-pathway-between-red-and-black-pillars-1310788/'
  },
  {
    portraitSrc: 'https://images.pexels.com/photos/1829980/pexels-photo-1829980.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800',
    photographer: 'DSD',
    photoId: 1829940,
    photoURL: 'https://www.pexels.com/photo/pagoda-temple-near-lake-under-cloudy-sky-1829980/'
  }
];
