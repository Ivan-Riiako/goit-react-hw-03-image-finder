import React, { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import style from './App.module.css';

// const ApiKey = '33947023-c15fa4d03e325678c88d2d925';

class App extends Component {
  state = {
    showModal:false,
  };

  render() {
    return (
      <div className={style.App}>
        <Searchbar />
      </div>
    );
  }
}

export default App;

  /* <ImageGallery>
          <ImageGalleryItem>
            <Loader></Loader>
            <Button></Button>
            <Modal></Modal>
          </ImageGalleryItem>
        </ImageGallery> */
