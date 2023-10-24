import React, { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import Modal from './Modal';
import style from './App.module.css';

// const ApiKey = '33947023-c15fa4d03e325678c88d2d925';

class App extends Component {
  state = {
    showModal:false,
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
    showModal:!showModal,
    }))
  
  }
  render() {
    const { showModal } = this.state;
    return (
      <div className={style.App}>
        <Searchbar />
        <button
          type="button"
          onClick={this.toggleModal}
          style={{
            margin: 8,
            padding: '12px 16px',
            borderRadius: 4,
            backgroundColor: 'gray',
            color: 'white',
          }}
        >
          Modal
        </button>
        {showModal && <Modal>

          <img src="" alt="" />
        </Modal>}
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
