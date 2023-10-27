import React, { Component } from 'react';
import axios from 'axios';

import style from './App.module.css';

import Searchbar from './Searchbar/Searchbar';
import Modal from './Modal';
// import ImageGallery from './ImageGallery';
// import ImageGalleryItem from './ImageGalleryItem';
// import Button from './Button';
// import Loader from './Loader';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '33947023-c15fa4d03e325678c88d2d925';
const instance = axios.create({
  baseURL: BASE_URL,
  params: {
    key: API_KEY,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 20,
  },
});
// Запрос на сервер
    async function fetchhPhoto(name, page = 1) {
      return await instance({ params: { q: `${name}`, page: `${page}` } })
        .then(function (response) {
          console.log(response);
          return response;
        })
        .catch(function (error) {
          // handle error
          if (error.response) {
            // Запрос был сделан, и сервер ответил кодом состояния, который
            // выходит за пределы 2xx
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          }
          console.log(error);
        }
        );
}
    


class App extends Component {
  state = {
    showModal: false,
    dataSearch: '',
    pictures: null,
    loading: true,
  };

  componentDidMount() {

    
  }

  componentDidUpdate(_, prevState) {
    const {  dataSearch } = this.state;
    if (
      prevState.dataSearch !== dataSearch &&
      prevState.pictures !== this.state.pictures
    ) {
      
    setTimeout(() => {
      const pictures = fetchhPhoto(dataSearch);
      this.setState({ pictures });
    }, 1000);
    }
  }

  handleSubmit = data => {
    const { value } = data;
    // if (contacts.some(contact => contact.name === name)) {
    //   alert(`${name} is already in contacrs`);
    //   return;
    // }

    this.setState({ dataSearch: value });
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };
  render() {
    const { showModal } = this.state;
    const { toggleModal, handleSubmit } = this;
    return (
      <div className={style.App}>
        <Searchbar onSubmit={handleSubmit} />
        {/* <ImageGallery>
        </ImageGallery> */}
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

  