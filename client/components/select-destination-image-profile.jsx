import React from 'react';
export default class SelectDestinationImageProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // Change this back to empty during production for API call
      // Delete this test variable after the program
      // imageList: dummyImageArray,
      imageList: [],
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
    this.getPexelPictures();
    if (this.props.handleCheck) {
      this.setState({ editMode: true });
    }
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
    fetch(`/api/image/${this.props.imageParam}`)
      .then(res => res.json())
      .then(data => {
        this.setState({ imageList: data.imageList });
      }
      );
  }

  editHeader() {
    return (<header className="row">
      <div className="col d-flex justify-content-between p-3">
        <i onClick={() => this.props.handleExit()} className="fas fa-times fa-2x pl-3"></i>
        <i onClick={() => {
          if (this.state.isCheckVisible) {
            this.props.handleCheck(this.state.imageChoice);
          }
        }} className="fas fa-check fa-2x pr-3"></i>
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
    const loadGoal = this.state.imageList.length;
    const reactElementArray = this.state.imageList.map(currentImage => {
      return (
        <div onClick={() => {
          this.handleClick(currentImage.portraitSrc);
          if (this.props.handleImageClick) {
            this.props.handleImageClick(currentImage.portraitSrc);
          }
        }}
        key={currentImage.photoId}
        className={`${this.state.loadedImages === loadGoal ? 'destination-images-on' : 'destination-images-off'} col-4 w-100 cursor-pointer`}>
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
            <div className="col mt-3 pr-5 pl-5">
              <h3 className="text-center font-weight-bold">Select an image</h3>
              <p className="text-center text-muted">Pick an image that makes you feel something and is connected to your trip. (Photos provided by <a className="text-muted pexels" target="_blank" rel='noopener noreferrer' href="https://www.pexels.com/">Pexels</a>)</p>
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

// delete this after development

// eslint-disable-next-line no-unused-vars
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
  }
];
