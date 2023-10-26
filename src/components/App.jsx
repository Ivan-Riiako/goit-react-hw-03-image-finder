import React, { Component } from 'react';
import axios from 'axios';

import Searchbar from './Searchbar/Searchbar';
import Modal from './Modal';
import style from './App.module.css';
import ImageGallery from './ImageGallery';
import ImageGalleryItem from './ImageGalleryItem';
// import Button from './Button';
// import Loader from './Loader';

axios.defaults.baseURL =
  'https://hn.algolia.com/aphttps://pixabay.com/api/?key=33947023-c15fa4d03e325678c88d2d925';

// const ArticleList = ({ pictures }) => (
//   <ul>
//     {pictures.map(({ objectID, url, title }) => (
//       <li key={objectID}>
//         <a href={url} target="_blank" rel="noreferrer noopener">
//           {title}
//         </a>
//       </li>
//     ))}
//   </ul>
// );

// const ApiKey = '33947023-c15fa4d03e325678c88d2d925';

class App extends Component {
  state = {
    showModal: false,
    pictures: null,
    loading:true,
  };
  componentDidMount() {
    setTimeout(() => {
      fetch(
      'https://pixabay.com/api/?key=33947023-c15fa4d03e325678c88d2d925&q=flowers&image_type=photo'
    )
      .then(res => res.json)
        .then(pictures => this.setState({ pictures }))
        .then(console.log)
        .finally(() => this.setState({ loading: false }));
    }
      ,10000)
  
  
  }
  // componentDidUpdate() {
  
  // }


  toggleModal = () => {
    this.setState(({ showModal }) => ({
    showModal:!showModal,
    }))
  
  }
  render() {
    const { showModal,pictures } = this.state;
    const { toggleModal } = this;
    return (
      <div className={style.App}>
        <Searchbar />

        <ImageGallery>
          <div><p>efwefewfwefw</p></div>
          {pictures &&
            pictures.hits.map((picture, index) => {
              return (
                <ImageGalleryItem
                  key={index}
                  src={picture.previewURL}
                  alt={picture.tags}
                />
              );
            })
          }
        </ImageGallery>

        <button
          type="button"
          onClick={toggleModal}
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
        {showModal && (
          <Modal onClose={toggleModal}>
            <img src="" alt="" />
          </Modal>
        )}
      </div>
    );
  }
}

export default App;

  