import React from 'react';

export default class SelectDestinationImageProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageList: [],
      imageChoice: null
    };
  }

  componentDidMount() {
    this.getPexelPictures();
  }

  getPexelPictures() {
    const params = {
      method: 'GET',
      headers: { Authorization: '563492ad6f9170000100000199ba9517fba74485b278a4b9796b71c3' }
    };
    fetch('https://api.pexels.com/v1/search?query=japan&per_page=15&page=1', params)
      .then(res => res.json())
      .then(data => {
        const photoArray = [];
        console.log(data);
        console.log(data.photos[0].src.portrait);
        for (let i = 0; i < data.photos.length; i++) {
          photoArray.push(data.photos[i].src.portrait);
        }
        this.setState({ imageList: photoArray });
      });
  }

  render() {
    return (
      <h1>test</h1>
    );
  }
}
